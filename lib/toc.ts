import { readFileSync } from 'fs';
import { join } from 'path';
import { remark } from 'remark';
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

const textTypes = ['text', 'emphasis', 'strong', 'inlineCode'];

interface TextNode extends Node {
  type: string;
  value: string;
}

interface HeadingNode extends Node {
  type: 'heading';
  depth: number;
  children: Node[];
}

function flattenNode(node: Node): string {
  const p: string[] = [];
  visit(node, (node: Node) => {
    const textNode = node as TextNode;
    if (!textTypes.includes(textNode.type)) return;
    p.push(textNode.value);
  });
  return p.join(``);
}

interface Item {
  title: string;
  url: string;
  items?: Item[];
}

interface Items {
  items?: Item[];
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractHeadings(node: Node): Item[] {
  const headings: Item[] = [];
  const stack: (Item & { depth: number })[] = [];

  visit(node, (node: Node) => {
    const headingNode = node as HeadingNode;
    if (headingNode.type === 'heading' && headingNode.depth >= 2 && headingNode.depth <= 6) {
      const title = flattenNode(headingNode);
      const slug = generateSlug(title);

      const heading: Item = {
        title,
        url: `#${slug}`,
        items: [],
      };

      // Adjust stack based on heading depth
      while (stack.length > 0 && stack[stack.length - 1].depth >= headingNode.depth) {
        stack.pop();
      }

      if (stack.length === 0) {
        // Top-level heading
        headings.push(heading);
      } else {
        // Nested heading - add to parent's items
        const parent = stack[stack.length - 1];
        if (!parent.items) {
          parent.items = [];
        }
        parent.items.push(heading);
      }

      // Add current heading to stack for potential children
      stack.push({ ...heading, depth: headingNode.depth });
    }
  });

  return headings;
}

export type TableOfContents = Items;

export async function getTableOfContents(slug: string): Promise<TableOfContents> {
  try {
    // Read the raw markdown file
    const filePath = join(process.cwd(), 'posts', `${slug}.mdx`);
    const rawContent = readFileSync(filePath, 'utf-8');

    // Remove frontmatter
    const contentWithoutFrontmatter = rawContent.replace(/^---\n[\s\S]*?\n---\n/, '');

    const ast = remark().parse(contentWithoutFrontmatter);
    const headings = extractHeadings(ast);

    return {
      items: headings,
    };
  } catch (error) {
    console.error('Error processing TOC:', error);
    return { items: [] };
  }
}
