import { Component } from '@angular/core';
import { CommingSongComponent } from '@shared/components/comming-song/comming-song.component';
import { TitleComponent } from '@shared/components/title/title.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommingSongComponent, TitleComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {}
