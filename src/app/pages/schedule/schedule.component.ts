import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService } from '../../services/anime.service';
import { Anime,Pagination } from '../../models/anime';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule',
  imports: [FormsModule,CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent implements OnInit {

  constructor(
    private router: Router,
    public animeService: AnimeService
    
  ) {}

  isLoading: boolean = false;
  anime: Anime[] = [];
  currentPage: number = 1;
  

  ngOnInit(): void {
    this.animeService.loadSearchScheduleAnimes(this.currentPage)
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
  
  

}
