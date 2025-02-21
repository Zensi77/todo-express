export default [
  {
    path: '',
    loadComponent: () =>
      import('./pages/taks-page/taks-page.component').then(
        (m) => m.TaksPageComponent
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/user-page/user-page.component').then(
        (m) => m.UserPageComponent
      ),
  },
];
