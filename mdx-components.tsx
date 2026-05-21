import * as Twoslash from 'fumadocs-twoslash/ui';
import { createGenerator } from 'fumadocs-typescript';
import { AutoTypeTable } from 'fumadocs-typescript/ui';
import defaultComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import Link from './components/link';
import { LiveChart } from './components/livechart';
import { SideBySide } from './components/sidebyside';
import { StaticChart } from './components/staticchart';

const generator = createGenerator();

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    AutoTypeTable: (props) => (
      <AutoTypeTable {...props} generator={generator} />
    ),
    ...Twoslash,
    ...components,
    Link,
    LiveChart: (props) => <LiveChart {...props} />,
    SideBySide: (props) => <SideBySide {...props} />,
    StaticChart: (props) => <StaticChart {...props} />,
  };
}
