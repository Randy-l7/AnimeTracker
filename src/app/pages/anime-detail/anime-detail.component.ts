import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '../../services/anime.service';
import { CommonModule } from '@angular/common';
import { ModalVideoComponent } from '../../components/modal-video/modal-video.component';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anime-detail',
  imports: [CommonModule,ModalVideoComponent,FormsModule],
  templateUrl: './anime-detail.component.html',
  styleUrl: './anime-detail.component.scss'
})
export class AnimeDetailComponent implements OnInit {
  showModal: boolean = false;  
  videoUrl: string = 'https://www.youtube-nocookie.com/embed/y98Yh5SSpH8?si=LUeVVnetQ1ocziRV';
  animeId!: number;
  anime: any;
  isLoading = true;
  genres: any[] = [];

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
      this.genres = this.anime.genres.map((genre: any) => genre.name);
      console.log(this.genres);
      this.isLoading = false;
    });

}



}
