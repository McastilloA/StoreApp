import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comming-song',
  standalone: true,
  templateUrl: './comming-song.component.html',
})
export class CommingSongComponent {
  /** Variables globales*/
  @Input() text!: string;
}
