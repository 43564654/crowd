import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/CreateCampaign',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/PurchasedModels',
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/UserStatisticsPage',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
  },
];
