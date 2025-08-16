import type { ComponentPropsWithoutRef } from 'react';

export default function Link(
  props: ComponentPropsWithoutRef<'a'> & { to?: string }
) {
  const {
    href,
    to,
    children,
    target = '_blank',
    rel = 'noopener noreferrer',
    ...rest
  } = props;
  const dest = href ?? to ?? '#';
  return (
    <a
      href={dest}
      target={target}
      rel={rel}
      {...rest}
      className="text-cyan-500 decoration-cyan-500">
      {children}
    </a>
  );
}
