import { uniqueId } from 'lodash';

import {
  IconPoint,
  IconAppWindow,
  IconDashboard,
  IconTransfer,
  IconReport,
  IconCreditCard,
  IconCashBanknote,
} from '@tabler/icons-react';

const Menuitems = [
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconDashboard,
    href: '/dashboards/main',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Transaksi',
    icon: IconTransfer,
    href: '/',
  },
  {
    id: uniqueId(),
    title: 'Laporan',
    icon: IconReport,
    href: '/',
  },
  {
    id: uniqueId(),
    title: 'Hutang',
    icon: IconCreditCard,
    href: '/',
  },
  {
    id: uniqueId(),
    title: 'Rekening',
    icon: IconCashBanknote,
    href: '/',
  },
  {
    id: uniqueId(),
    title: 'Master Data',
    icon: IconAppWindow,
    href: '/',
    children: [
      {
        id: uniqueId(),
        title: 'Kategori Rekening',
        icon: IconPoint,
        href: '/',
      },
      {
        id: uniqueId(),
        title: 'Kategori Transaksi',
        icon: IconPoint,
        href: '/',
      },
    ],
  },
];

export default Menuitems;
