import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItems } from '@shared/utils/menuItems';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidemenu.component.html',
})
export class SidemenuComponent {
  /** Variables globales */
  items = inject(MenuItems);
}
