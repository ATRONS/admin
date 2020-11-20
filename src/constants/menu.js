import { adminRoot } from './defaultValues';
// import { UserRole } from "../helpers/authHelper"

const data = [
  {
    id: 'gogo',
    icon: 'iconsminds-air-balloon-1',
    label: 'menu.home',
    to: `${adminRoot}/gogo`,
  },
  {
    id: 'resource-providers',
    icon: 'iconsminds-three-arrow-fork',
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
    icon: 'iconsminds-three-arrow-fork',
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
];
export default data;
