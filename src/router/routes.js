const routes = [
  {
    path: '/',
    redirect: '/portal',
  },
  {
    path: '/login',
    component: () => import('@/containers/Login'),
  },
  {
    path: '/portal',
    meta: { requiresAuth: true },
    component: () => import('@/containers/Layout/BaseLayout'),
    children: [
      {
        path: '/',
        redirect: 'shop/list',
      },
      {
        path: 'shop/list',
        component: () => import('@/containers/ShopList/ShopList'),
      },
      {
        path: ':shopId',
        component: () => import('@/containers/Layout/MainLayout'),
        children: [
          {
            path: '/',
            redirect: 'dashboard',
          },
          {
            path: 'dashboard',
            component: () => import('@/containers/Dashboard'),
          },
          {
            path: 'products',
            component: () => import('@/containers/Products'),
          },
          {
            path: 'orders',
            component: () => import('@/containers/Orders'),
          },
          {
            path: 'customers',
            component: () => import('@/containers/Customers'),
          },
          {
            path: 'setting',
            component: () => import('@/containers/Setting/SettingWrapper'),
            children: [
              {
                path: '/',
                redirect: 'shop',
              },
              {
                path: 'shop',
                component: () => import('@/containers/Setting/ShopSetting'),
              },
              {
                path: 'shopify',
                component: () => import('@/containers/Setting/ShopifySetting'),
              },
              {
                path: 'easystore',
                component: () => import('@/containers/Setting/EasyStoreSetting'),
              },
              {
                path: 'woocommerce',
                component: () => import('@/containers/Setting/WooCommerceSetting'),
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
