// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//
// THIS IS FROM THE MAIN REPOs `src/types.ts` DO NOT EDIT HERE!
//
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
export type Optional<T> = {
  [K in keyof T]?: T[K];
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ChartOptions = {
  // min: number;
	/**
	 * Defaults to `300`
	 */
  height: number;
	/**
	 * Defaults to `300`
	 */
  width: number;
};

export type LinearGradientDirection =
  | 'left-to-right'
  | 'right-to-left'
  | 'top-to-bottom'
  | 'bottom-to-top'
  | `${number}`;

export type LinearGradientType = 'individual' | 'continuous';

export type BarChartClasses = {
  groupClass: string;
  parentClass: string;
  barClass: string;
  textClass: string;
  barGroupClass: string;
  textGroupClass: string;
};

export type BarChartOptionsBase = {
  /**
   * Defaults to `"bottom"` if not supplied
   */
  placement: 'top' | 'right' | 'bottom' | 'left';
  /**
   * Currently unused
   */
  responsive: boolean;
  /**
   * When not supplied this is calculated automatically using the following formula:
   * ```
   * barWidth = surfaceLength / numBars / 2
   * ```
   * Which results in an even width for each bar, based on the available space for the surface the bars are being attached to.
   */
  barWidth: number;
  /**
   * When not supplied, defaults to `10` greater than the largest datapoint in the supplied `data` array.
   */
  max: number;
  /**
   * When not supplied this is calculated automatically using the following formula:
   * ```
   * gap = surfaceLength / numBars / 4
   * ```
   * Which results in even spacing between all bars based on the available space for the surface the bars are being attached to.
   */
  gap: number;
  /**
   * Defaults to `#ffffff` when no color array is provided.
   */
  colors: string[];
  gradientColors: string[];
  /**
   * Defaults to `"individual"` when `gradientColors` is supplied but no `gradientMode` is given.
   */
  gradientMode: LinearGradientType;
  /**
   * Defaults to `"left-to-right"` when `gradientColors` is supplied but no `gradientDirection` is given.
   */
  gradientDirection: LinearGradientDirection;
} & BarChartClasses &
  ChartOptions;

// type BarChartData = BarChartOptionsBase["type"] extends "numerical"
// 	? number[]
// 	: number[][];

export type BarChartLabels = string[];

export type BarChartNumericalOpts = Optional<BarChartOptionsBase> & {
  // type?: "numerical";
  readonly data: number[];
	/**
	 * Defaults to `[]` which is a chart with no labels
	 */
  readonly labels?: BarChartLabels;
};

export type BarChartStackedOpts = Optional<BarChartOptionsBase> & {
  // type?: "stacked";
  readonly data: number[][];
	/**
	 * Defaults to `[]` which is a chart with no labels
	 */
  readonly labels?: BarChartLabels;
};

export type BarChartOptions = BarChartNumericalOpts | BarChartStackedOpts;

// There's probably a better way than type predicates but going to go with this for now instead of getting hung up on type narrowing/inference/asserting.
export const isNumericalArray = (
  arr: number[] | number[][]
): arr is number[] => {
  return typeof arr[0] === 'number';
};
export const is2DNumericalArray = (
  arr: number[] | number[][]
): arr is number[][] => {
  return Array.isArray(arr[0]);
};
export const isNumericalOptions = (
  opts: BarChartOptions
): opts is BarChartNumericalOpts => {
  return 'type' in opts && opts.type === 'numerical';
};
export const isStackedOptions = (
  opts: BarChartOptions
): opts is BarChartStackedOpts => {
  return 'type' in opts && opts.type === 'stacked';
};

// type BarChartOptions = Optional<BarChartOptionsBase> & {
// 	readonly data: BarChartData;
// 	readonly labels: BarChartLabels;
// };
