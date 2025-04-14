import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-video',
  imports: [],
  templateUrl: './modal-video.component.html',
  styleUrl: './modal-video.component.scss'
})
export class ModalVideoComponent {
  @Input() set videoUrl(url: string) {
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  @Output() close = new EventEmitter<void>();  

  closeModal() {
    this.close.emit();
  }

  safeVideoUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  onExteriorClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }
}
