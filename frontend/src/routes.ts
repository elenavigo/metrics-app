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
  {
    title: 'CTR',
    path: '/ctr',
    element: Dashboard,
    // element: CTR,
  },
  {
    title: 'Traffic',
    path: '/traffic',
    element: Dashboard,
    // element: Traffic,
  },
  {
    title: 'Bounce rate',
    path: '/bounce',
    element: Dashboard,
    // element: BounceRate,
  },
  {
    title: 'Conversion',
    path: '/conversion',
    element: Dashboard,
    // element: ConversionMetric,
  },
];
