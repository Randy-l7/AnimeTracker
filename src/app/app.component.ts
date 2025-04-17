import { Component,Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ModalVideoComponent } from "./components/modal-video/modal-video.component";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template:``,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'anime-tracker';

  constructor(private router: Router, private renderer: Renderer2) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url.includes('/anime')) {
          this.renderer.setStyle(document.body, 'overflow-y', 'scroll');
        } else {
          this.renderer.removeStyle(document.body, 'overflow-y');
        }
      });
  }




}
