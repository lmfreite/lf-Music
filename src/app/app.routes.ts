import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';
import { introGuard } from './guards/intro.guard';
import { publicGuard } from './guards/public.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
    canActivate: [publicGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
    canActivate: [publicGuard],
  },
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then((m) => m.IntroPage),
    canActivate: [loginGuard],
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./components/layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    canActivate: [loginGuard, introGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'play',
        loadComponent: () =>
          import('./components/listen-now/listen-now.component').then(
            (m) => m.ListenNowComponent
          ),
      },
      {
        path: 'albums',
        loadComponent: () =>
          import('./components/genres/genres.component').then(
            (m) => m.GenresComponent
          ),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./components/search/search.component').then(
            (m) => m.SearchComponent
          ),
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
