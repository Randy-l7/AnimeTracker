import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { Anime, Pagination } from '../../models/anime';
import { CommonModule } from '@angular/common';
import { debounceTime } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { FilterComponent } from "../../components/filter/filter.component";



@Component({
  selector: 'app-anime-list',
  imports: [CommonModule, FormsModule, FilterComponent],
  templateUrl: './anime-list.component.html',
  styleUrl: './anime-list.component.scss',
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0 }), 
        animate('400ms 0ms', style({ opacity: 1 }))
      ])
    ])
  ]

  
})
export class AnimeListComponent implements OnInit {



searchTerm: string = ''; 
currentPage = 1;
totalPages = 1;
isLoading: boolean = false;
isSearching: boolean = false;
selectedOrderBy: string = 'scored_by';
selectedSort: string = 'desc';

anime: Anime[] = [];

filter: FilterComponent = new FilterComponent();

constructor(
  private router: Router,
  public animeService: AnimeService
  
) {}

ngOnInit(): void {
  this.animeService.loadAnimes(this.currentPage,this.selectedOrderBy);
  // console.log("VOITURE VROOM VROOM",this.animeService.pagination().last_visible_page)
  // setInterval(() => this.loadMore(), 500);
}

get animesList(): Anime[] {
  return this.animeService.animes();
}

get pagination(): Pagination | null {
  const pag = this.animeService.pagination();
  return pag; 
}

goToAnime(id: number): void {
  this.router.navigate(['/anime', id]);
}

handleFilterChange(event: { orderBy: string, sort: string }) {
    this.selectedOrderBy = event.orderBy;
    this.selectedSort = event.sort;

  !this.isSearching 
  ?  this.animeService.loadAnimes(1,this.selectedOrderBy)
  : this.animeService.loadSearchAnimes(this.searchTerm, 1,this.selectedOrderBy)
}



goToPage(page: number) {
  this.currentPage = page;
  !this.isSearching
     ? this.animeService.loadAnimes(page,this.selectedOrderBy)
     : this.animeService.loadSearchAnimes(this.searchTerm, page,this.selectedOrderBy)

}

onSearch() {
  console.log("CHERCHE");
  if (this.searchTerm.trim() !== '') {
    this.isLoading = true;
    debounceTime(1000);
    this.currentPage = 1
    this.isSearching = true
    this.animeService.loadSearchAnimes(this.searchTerm,this.currentPage,this.selectedOrderBy);


    }
    else {
      this.animeService.loadAnimes(1,this.selectedOrderBy)
    }
  }



// loadMore() {
//   this.currentPage++;
//   this.animeService.loadMoreAnimes(this.currentPage);
// }




}
