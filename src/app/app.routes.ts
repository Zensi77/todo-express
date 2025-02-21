import { Routes } from '@angular/router';
import { isNonAuthenticatedGuard } from './auth/guards/is-nonAuthenticated.guard';
import { isAuthenticatedGuard } from './auth/guards/is-Authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canActivate: [isNonAuthenticatedGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes'),
    canActivate: [isAuthenticatedGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent
      ),
  },
];
