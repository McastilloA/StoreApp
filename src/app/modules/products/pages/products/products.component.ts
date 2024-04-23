import { Component, OnInit, inject } from '@angular/core';
import { takeUntil } from 'rxjs';

import { TableComponent } from '@modules/products/components/table/table.component';
import { CardComponent } from '@modules/products/components/card/card.component';
import { TitleComponent } from '@shared/components/title/title.component';

import { ProductsService } from '@core/services/products.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { Breakpoint } from '@shared/utils/breakpoint';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TableComponent, CardComponent, TitleComponent, LoadingComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  /** Variables globales */
  service = inject(ProductsService);
  breakpoint = inject(Breakpoint);

  ngOnInit(): void {
    this.getListProducts();
  }

  /**
   * Obtiene una lista de productos del servicio y actualiza el estado del componente.
   */
  getListProducts(): void {
    this.service
      .getAllProducts()
      .pipe(takeUntil(this.service.unSubscribe$))
      .subscribe({
        next: (res) => this.service.successAll(res),
        error: (err) => this.service.handleError(err),
      });
  }

  /**
   * Actualiza la lista de productos llamando al método `getListProducts`.
   */
  refreshList(): void {
    this.getListProducts();
  }
}
