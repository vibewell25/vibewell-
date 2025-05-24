// Define the NavItem type to match the NavigationBar component
interface NavItem {
  key: string;
  label: string;
  icon?: string; // We'll use string icons in this case
  route: string;
}

const navItems: NavItem[] = [
  {
    key: 'home',
    label: 'Home',
    route: '/home',
    icon: 'home',
  },
  {
    key: 'services',
    label: 'Services',
    route: '/services',
    icon: 'spa',
  },
  {
    key: 'bookings',
    label: 'Bookings',
    route: '/bookings',
    icon: 'calendar',
  },
  {
    key: 'profile',
    label: 'Profile',
    route: '/profile',
    icon: 'user',
  },
];

export default navItems; 