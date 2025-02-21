export default [
  {
    path: '',
    loadComponent: () =>
      import('./pages/taks-page/taks-page.component').then(
        (m) => m.TaksPageComponent
      ),
  },
];
