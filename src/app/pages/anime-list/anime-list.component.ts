import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { Anime, Pagination } from '../../models/anime';
import { CommonModule } from '@angular/common';
import { debounceTime } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-anime-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './anime-list.component.html',
  styleUrl: './anime-list.component.scss'
})
export class AnimeListComponent implements OnInit {

searchTerm: string = ''; 
currentPage = 1;
totalPages = 1;
isLoading: boolean = false;
isSearching: boolean = false;

anime: Anime[] = [];

constructor(
  private router: Router,
  public animeService: AnimeService
) {}

ngOnInit(): void {
  this.animeService.loadAnimes(this.currentPage);
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



goToPage(page: number) {
  this.currentPage = page;
  !this.isSearching
     ? this.animeService.loadAnimes(page)
     : this.animeService.loadSearchAnimes(this.searchTerm, page)

}

onSearch() {
  if (this.searchTerm.trim() !== '') {
    this.isLoading = true;
    debounceTime(1000);
    this.currentPage = 1
    this.isSearching = true
    this.animeService.loadSearchAnimes(this.searchTerm,this.currentPage);


    }
  }



loadMore() {
  this.currentPage++;
  this.animeService.loadMoreAnimes(this.currentPage);
}




}
