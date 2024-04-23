import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidemenuComponent } from '@shared/components/sidemenu/sidemenu.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { Breakpoint } from '@shared/utils/breakpoint';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidemenuComponent,
    LoadingComponent
  ],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
  /** Variables globales */
  breakpoint = inject(Breakpoint);

}
