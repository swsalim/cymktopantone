import { ImageDownIcon, ImagesIcon, ScaleIcon, SquareMousePointerIcon } from 'lucide-react';

const features = [
  {
    id: 2,
    name: 'Support Multiple Image Formats',
    description:
      'Works with multiple formats like JPG and PNG, ensuring it works seamlessly with your preferred image type.',
    icon: ImagesIcon,
  },
  {
    id: 3,
    name: 'Drag and Drop',
    description:
      'Drag and drop your image into the tool effortlessly—no complex steps or uploads needed.',
    icon: SquareMousePointerIcon,
  },
  {
    id: 4,
    name: 'Intuitive User Experience',
    description:
      'Intuitive and beginner-friendly interface makes flipping a picture a smooth and stress-free experience.',
    icon: ScaleIcon,
  },
  {
    id: 5,
    name: 'Free to download',
    description:
      'Completely free to use—no payments, no downloads, no sign-ups required. Access it directly in your browser from any device, anywhere in the world.',
    icon: ImageDownIcon,
  },
];

export default function Features() {
  return (
    <>
      <div className="mx-auto max-w-2xl lg:text-center">
        <p className="text-base/7 font-medium text-violet-600 dark:text-violet-400">
          Simple to use
        </p>
        <h2 className="mt-0 text-pretty text-4xl font-bold !leading-tight tracking-tight text-gray-900 sm:mt-2 sm:text-5xl lg:text-balance dark:text-gray-100">
          Features of Flip Image
        </h2>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.id} className="relative flex flex-col">
              <dt className="flex flex-row gap-2 font-semibold text-gray-900 dark:text-gray-50">
                <feature.icon aria-hidden="true" className="size-5 text-violet-600" />
                {feature.name}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-500 dark:text-gray-300">
                <p className="flex-auto">{feature.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
