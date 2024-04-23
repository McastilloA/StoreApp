import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '@shared/components/header/header.component';
import { Breakpoint } from '@shared/utils/breakpoint';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    @defer (when breakpoint.mobileSignal()) {
    <app-header />
    }
    <router-outlet />
  `,
})
export class AppComponent {
  /** Variables globales */
  breakpoint = inject(Breakpoint);
}
