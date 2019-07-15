import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

export enum KEY_CODE {
  ESCAPE = 27
}

export interface ZoomImage {
  title: string;
  src: string;
}

@Component({
  selector: 'sv-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.scss'],
})
export class ImageZoomComponent {

  @Input() zoomImage: ZoomImage;

  @Output() close: EventEmitter<void> = new EventEmitter();

  closeZoom($event) {
    $event.preventDefault();
    this.close.emit();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.closeZoom(event);
    }
  }


}
