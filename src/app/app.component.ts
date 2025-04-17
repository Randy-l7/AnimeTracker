import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ModalVideoComponent } from "./components/modal-video/modal-video.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template:``,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'anime-tracker';
}
