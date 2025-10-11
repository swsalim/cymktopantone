import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

import { pantoneCategories } from '../config/pantoneCategories';
import { findMatchingPMSColors } from '../lib/colors';

interface RelatedColor {
  name: string;
  slug: string;
  hex: string;
}

async function getRelatedColors(hex: string, pantone: string): Promise<RelatedColor[]> {
  // Remove the # from hex if present
  const cleanHex = hex.replace('#', '');
  const matches = await findMatchingPMSColors(cleanHex, 32);

  // Filter out the main color and limit to 4 results
  return matches
    .filter(({ pantone: matchPantone }) => matchPantone !== pantone)
    .slice(0, 4)
    .map(({ pantone, hex }) => ({
      name: pantone,
      slug: pantone.toLowerCase().replace(/\s+/g, '-'),
      hex: `#${hex}`,
    }));
}

async function precomputeRelatedColors() {
  console.log('Starting pre-computation of related colors...');

  const relatedColorsMap: Record<string, RelatedColor[]> = {};

  for (const category of pantoneCategories) {
    console.log(`Processing ${category.name}...`);
    relatedColorsMap[category.slug] = await getRelatedColors(category.hex, category.pantone);
  }

  // Write the pre-computed data to a JSON file
  const outputPath = join(process.cwd(), 'data', 'related-colors.json');
  writeFileSync(outputPath, JSON.stringify(relatedColorsMap, null, 2));

  // Convert JSON to TypeScript format
  console.log('Converting JSON to TypeScript...');
  const tsOutputPath = join(process.cwd(), 'data', 'related-colors.ts');
  const conversionCommand = `npx tsx -e "const data = require('./data/related-colors.json'); console.log('export default', JSON.stringify(data, null, 2));"`;

  try {
    const tsContent = execSync(conversionCommand, { encoding: 'utf8' });
    writeFileSync(tsOutputPath, tsContent);
    console.log(`TypeScript file generated: ${tsOutputPath}`);
  } catch (error) {
    console.error('Error converting to TypeScript:', error);
  }

  console.log(`Pre-computation complete! Data written to ${outputPath}`);
  console.log(`Processed ${Object.keys(relatedColorsMap).length} categories`);
}

precomputeRelatedColors().catch(console.error);
