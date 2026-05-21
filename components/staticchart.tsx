import {
  barchart,
  barchartStacked,
  donutchart,
  linechart,
  piechart,
} from '@jgmc/vanilla';

type FlatDataOptions = { data: number[] } & Record<string, any>;
type NestedDataOptions = { data: number[][] } & Record<string, any>;
type LineDataOptions = { data: number[] | number[][] } & Record<string, any>;

type ChartOutputProps =
  | { type: 'barchart' | 'donutchart' | 'piechart'; options: FlatDataOptions }
  | { type: 'barchartStacked'; options: NestedDataOptions }
  | { type: 'linechart'; options: LineDataOptions };

const availableCharts = {
  barchart,
  barchartStacked,
  donutchart,
  linechart,
  piechart,
};

export function StaticChart(props: ChartOutputProps) {
  const { type, options } = props;
  let svgString = '';

  if (type === 'barchart' || type === 'donutchart' || type === 'piechart') {
    svgString = availableCharts[type](options);
  } else if (type === 'barchartStacked') {
    svgString = availableCharts[type](options);
  } else if (type === 'linechart') {
    svgString = availableCharts[type](options);
  }

  return (
    <div
      className="p-4 [&_svg]:border [&_svg]:border-gray-700 [&_svg]:rounded-md bg-black text-white flex justify-center w-full overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
}
