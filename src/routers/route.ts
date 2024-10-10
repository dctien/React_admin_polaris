import Path from '../utils/path';
import { IRoute } from '../utils/type';
import { Dashboard } from '../pages/DashboardPage';
import ProductsPage from '../pages/ProductsPage';
import SettingsPage from '../pages/SettingsPage';

const routeMap: IRoute[] = [
  { path: Path.DASHBOARD, element: Dashboard },
  { path: Path.PRODUCTS, element: ProductsPage },
  { path: Path.SETTINGS, element: SettingsPage },
];

export default routeMap;
