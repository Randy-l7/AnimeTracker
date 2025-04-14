import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '../../services/anime.service';
import { CommonModule } from '@angular/common';
import { ModalVideoComponent } from '../../components/modal-video/modal-video.component';

@Component({
  selector: 'app-anime-detail',
  imports: [CommonModule,ModalVideoComponent],
  templateUrl: './anime-detail.component.html',
  styleUrl: './anime-detail.component.scss'
})
export class AnimeDetailComponent implements OnInit {
  showModal: boolean = false;  
  videoUrl: string = 'https://www.youtube-nocookie.com/embed/y98Yh5SSpH8?si=LUeVVnetQ1ocziRV';
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
