import { Dashboard } from './pages/dashboard.page';

interface RouteItem {
  title: string;
  path: string;
  element: React.FC;
}

export const routes: RouteItem[] = [
  {
    title: 'Dashboard',
    path: '/',
    element: Dashboard,
  },
];
