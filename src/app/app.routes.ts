import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./pages/home/home.component').then((m) => m.HomeComponent )
        },
    },
    {
        path: 'anime',
        
        loadComponent: () => {
            return import('./pages/anime-list/anime-list.component').then((m) => m.AnimeListComponent )
        },
    },
    {
        path: 'anime/:id',
        loadComponent: () => {
          return import('./pages/anime-detail/anime-detail.component').then((m) => m.AnimeDetailComponent);
        },
      },
      {
        path: 'search',
        loadComponent: () => {
          return import('./pages/search-page/search-page.component').then((m) => m.SearchPageComponent);
        },
      }
      
    
  ];
  
