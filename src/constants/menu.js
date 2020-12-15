import { adminRoot, providerRoot } from './defaultValues';
// import { UserRole } from "../helpers/authHelper"

export const adminMenuItems = [
  {
    id: 'home',
    icon: 'simple-icon-home',
    label: 'menu.home',
    to: `${adminRoot}/home`,
  },
  {
    id: 'resource-providers',
    icon: 'iconsminds-business-mens',
    label: 'menu.resource-providers',
    to: `${adminRoot}/resource-providers`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.companies',
        to: `${adminRoot}/resource-providers/companies`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.authors',
        to: `${adminRoot}/resource-providers/authors`,
      },
    ],
  },

  {
    id: 'menu.materials',
    icon: 'iconsminds-books',
    label: 'menu.materials',
    to: `${adminRoot}/materials`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.books',
        to: `${adminRoot}/materials/books`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.magazines',
        to: `${adminRoot}/materials/magazines`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.newspaper',
        to: `${adminRoot}/materials/newspapers`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.add-material',
        to: `${adminRoot}/materials/add-material`,
      },
    ],
  },

  {
    id: 'menu.requests',
    icon: 'iconsminds-letter-close',
    label: 'menu.requests',
    to: `${adminRoot}/requests`,
    countVariable: 'pendingRequestsCount',
    // roles: [UserRole.Admin, UserRole.Editor],
  },
];

export const providerMenuItems = [
  {
    id: 'menu.materials',
    icon: 'iconsminds-books',
    label: 'menu.materials',
    to: `${providerRoot}/materials`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  {
    id: 'menu.requests',
    icon: 'iconsminds-letter-close',
    label: 'menu.requests',
    to: `${providerRoot}/requests`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  {
    id: 'menu.reports',
    icon: 'iconsminds-line-chart-1',
    label: 'menu.reports',
    to: `${providerRoot}/reports`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-briefcase',
        label: 'menu.earning_by_material',
        to: `${providerRoot}/reports/earning_by_material`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-pie-chart',
        label: 'menu.my_reports',
        to: `${providerRoot}/reports/my-reports`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-doc',
        label: 'menu.transactions',
        to: `${providerRoot}/reports/transactions`,
        // roles: [UserRole.Editor],
      },
    ],
  },
];
