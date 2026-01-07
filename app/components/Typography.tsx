import { twMerge } from "tailwind-merge";

export const Typography = ({
  children,
  className,
  element: Element = "p",
}: React.PropsWithChildren<{
  element?: React.ElementType;
  className?: string;
}>) => {
  return (
    <Element
      className={twMerge(`text-neutral-900 dark:text-zinc-300 ${className}`)}
    >
      {children}
    </Element>
  );
};
