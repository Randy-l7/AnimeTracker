import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '../../services/anime.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anime-detail',
  imports: [CommonModule],
  templateUrl: './anime-detail.component.html',
  styleUrl: './anime-detail.component.scss'
})
export class AnimeDetailComponent implements OnInit {
  animeId!: number;
  anime: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService
  ) {}

  ngOnInit() {
    this.animeId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchAnime();
  }

  fetchAnime() {
    this.animeService.getAnimeById(this.animeId).subscribe((response) => {
      console.log('anime data:', response);
      this.anime = response.data;
      this.isLoading = false;
    });
}

}
