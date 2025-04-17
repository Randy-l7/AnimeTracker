import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anime, Pagination } from '../models/anime';
import { inject } from '@angular/core';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  animes = signal<Anime[]>([]);
  isLoading = signal<boolean>(false);
  pagination = signal<Pagination | null>(null);
  baseUrl = 'https://api.jikan.moe/v4';
  
  private http = inject(HttpClient);

  searchAnimes(query: string,page: number,orderBy: string,sort: string): Observable<{ data: Anime[],pagination: Pagination | null }> {
    const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&order_by=${orderBy}&sort=${sort}&limit=21&page=${page}&sfw=true`; 
    return this.http.get<{ data: Anime[],pagination: Pagination }>(url).pipe(
      tap(response => console.log('Résultats de la recherche:', response)
    ),
      catchError(error => {
        console.error('Erreur lors de la recherche d\'animes:', error);
        return of({ data: [], pagination: null }); // Retourne une liste vide en cas d'erreur
      })
    );
  }

  getAnimeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/anime/${id}`);
  }

  
  fetchAnimes(page: number = 1,orderBY: string,sort: string ): Observable<{ data: Anime[], pagination: any }> {
    const url = `https://api.jikan.moe/v4/anime?page=${page}&limit=21&order_by=${orderBY}&sort=${sort}&sfw=true`;
    console.log(`Fetching page ${page} from ${url}`);
    
    return this.http.get<{ data: Anime[], pagination: any }>(url).pipe(
      tap(response => console.log(`Page ${page} response:`, response)),
      catchError(error => {
        console.error(`Error fetching page ${page}:`, error);
        return of({ data: [], pagination: null });
      })
    );
  }
  
  loadAnimes(page: number = 1,orderBY: string,sort: string ) {
    this.isLoading.set(true);
    this.animes.set([]);

    
    // Commençons par charger seulement la première page
    this.fetchAnimes(page,orderBY,sort).subscribe({
      next: (response) => {
        // Vérifions ce que l'API nous renvoie
        console.log('Première page pagination:', response.pagination);
        const currentAnimes = [...response.data];
        this.animes.set(currentAnimes);
        this.pagination.set(response.pagination);
        console.log(`Chargé ${currentAnimes.length} animes`);

        this.isLoading.set(false);
        
        // Si vous voulez charger la page suivante, décommentez cette section
        // Si une pagination existe et qu'il y a une page suivante
        if (response.pagination && response.pagination.has_next_page) {
          console.log('Page suivante disponible');
          // Implémentez ici la logique pour charger plus d'animes
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des animes:', error);
        this.isLoading.set(false);
      }
    });
  }

  loadSearchAnimes(query: string,page: number,orderBy : string,sort: string) {
    this.isLoading.set(true);
    this.animes.set([]); // Vider les animes avant de charger les résultats de recherche
    
    // Charger les résultats de la recherche
    this.searchAnimes(query,page,orderBy,sort).subscribe({
      next: (response) => {
        console.log('Résultats de la recherche:', response);
        const currentAnimes = [...response.data];
        this.animes.set(currentAnimes);
        this.pagination.set(response.pagination);
        console.log("WOW REGARDE C IMPORT C LA PAGINATION",this.pagination)
        console.log(`Chargé ${currentAnimes.length} animes`);
        this.isLoading.set(false)
      },
      error: (error) => {
        console.error('Erreur lors du chargement des résultats de recherche:', error);
        this.isLoading.set(false);
      }
    });
  }
  

  // Fonction pour charger plus d'animes (à appeler explicitement)
  // loadMoreAnimes(page: number) {
  //   if (!this.isLoading()) {
  //     this.isLoading.set(true);
      
  //     this.fetchAnimes(page,).subscribe({
  //       next: (response) => {
  //         const currentAnimes = [...this.animes()];
  //         const updatedAnimes = [...currentAnimes, ...response.data];
  //         this.animes.set(updatedAnimes);
  //         console.log(`Chargé ${updatedAnimes.length} animes au total`);
  //         this.isLoading.set(false);
  //       },
  //       error: (error) => {
  //         console.error('Erreur lors du chargement de plus d\'animes:', error);
  //         this.isLoading.set(false);
  //       }
  //     });
  //   }
  // }
}
// import { Injectable, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Anime } from '../models/anime';
// import { inject } from '@angular/core';
// import { delay } from 'rxjs/operators';


// @Injectable({
//   providedIn: 'root'
// })


// export class AnimeService {

//   animes = signal<Anime[]>([]);


//   private http = inject(HttpClient);


//   fetchAnimes(page: number = 1){
//     const url = `https://api.jikan.moe/v4/anime?page=${page}`;
//     return this.http.get<{ data: Anime[] }>(url).pipe(
      
//     );
//   }


//   loadAnimes() {
//     let page = 1;
//     const allAnimes: Anime[] = [];

//     const loadNextPage = () => {
//       this.fetchAnimes(page).pipe(
//         delay(300)
//       ).subscribe((response) => {
//         if (response.data.length > 0) {
//           allAnimes.push(...response.data); 
//           page++; 
//           loadNextPage(); 
//         } else {
//           this.animes.set(allAnimes);  /
//         }
//       });
//     };

//     loadNextPage();  
//   }
// }