export interface IRoute {
  path: string;
  element: () => JSX.Element;
}
export interface ChartPropsSchema {
  labels: string[];
  data: number[];
}
export interface SelectedDate {
  start: Date;
  end: Date;
}
export interface IRole {
  title: string;
  start_date: string;
  end_date: string;
  buy_from: number;
  buy_to: number;
  discount: number;
}
export interface IProduct {
  [key: string]: unknown;
  id: number;
  title: string;
  image: string;
  lastUpdate: string;
  rules: IRole[];
  status: number;
}
