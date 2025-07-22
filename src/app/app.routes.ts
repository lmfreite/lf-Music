import { Routes } from '@angular/router';
import { introGuard } from './guards/intro.guard';

export const routes: Routes = [
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then( m => m.IntroPage)
  },
  {
    path: '',
    loadComponent: () => import('./components/tabs/tabs.component').then(m => m.TabsComponent),
    canActivate: [introGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/layout/layout.component').then(m => m.LayoutComponent),
        children: [
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
          },
          {
            path: 'home',
            loadComponent: () => import('./home/home.page').then(m => m.HomePage),
          },
          {
            path: 'play',
            loadComponent: () => import('./components/listen-now/listen-now.component').then(m => m.ListenNowComponent),
          },
          {
            path: 'genres',
            loadComponent: () => import('./components/genres/genres.component').then(m => m.GenresComponent),
          },
          {
            path: 'search',
            loadComponent: () => import('./components/search/search.component').then(m => m.SearchComponent),
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
