import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItems } from '@shared/utils/menuItems';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  /** Variables globales */
  items = inject(MenuItems);
}
