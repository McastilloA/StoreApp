import { Component } from '@angular/core';
import { CommingSongComponent } from '@shared/components/comming-song/comming-song.component';
import { TitleComponent } from '@shared/components/title/title.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommingSongComponent, TitleComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
