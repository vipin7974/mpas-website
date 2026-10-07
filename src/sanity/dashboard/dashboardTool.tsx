import { HomeIcon } from '@sanity/icons/Home';
import type { Tool } from 'sanity';
import { Dashboard } from './Dashboard';

export const dashboardTool = (): Tool => ({
  name: 'dashboard',
  title: 'Dashboard',
  icon: HomeIcon,
  component: Dashboard,
});
