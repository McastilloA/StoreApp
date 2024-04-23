import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Breakpoint {
  /** Variables globales */
  #breakpointObserver$ = inject(BreakpointObserver);
  #mobileObservable$ = this.#breakpointObserver$
    .observe(Breakpoints.Handset)
    .pipe(map((res) => res.matches));
  mobileSignal = toSignal(this.#mobileObservable$, { initialValue: true });
}
