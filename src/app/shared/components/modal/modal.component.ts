import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { Dialog } from '@core/interface/products';
import { ProductsService } from '@core/services/products.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  /** Varibales globales */
  showSpinner = false;
  formGroup!: FormGroup;
  #dialogRef: MatDialogRef<ModalComponent> = inject(MatDialogRef);
  #fb: FormBuilder = inject(FormBuilder);
  #service = inject(ProductsService);

  constructor(@Inject(MAT_DIALOG_DATA) public infoProduct: Dialog) {}

  ngOnInit(): void {
    this.initForm();
    this.validateForm(this.infoProduct);
  }

  /**
   * Inicializa el formulario con los controles y validadores necesarios.
   */
  initForm(): void {
    this.formGroup = this.#fb.group({
      id: [null],
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required],
    });
  }

  /**
   * Rellena los campos del formulario con los datos del objeto producto si la propiedad action es verdadera.
   * @param product - Un objeto que contiene los datos del producto y una bandera de acción.
   */
  validateForm(product: Dialog): void {
    if (product.action) {
      this.formGroup.patchValue(product.data);
    }
  }

  /**
   * Determina si se crea o edita un producto en función del valor del parámetro `action`.
   * @param action - Un parámetro que determina si crear o editar un producto. Un valor de 0
   * indica crear un producto, mientras que un valor de 1 indica editar un producto.
   */
  onClickProduct(action: number) {
    action === 0 ? this.onCreateProduct() : this.onEditProduct();
  }

  /**
   * Crea un nuevo producto enviando un request al servidor con los datos del producto del formulario.
   * Maneja las respuestas de éxito y error del servidor.
   */
  onCreateProduct() {
    if (this.formGroup.valid) {
      this.showSpinner = true;
      this.#service
        .createProduct(this.formGroup.value)
        .pipe(takeUntil(this.#service.unSubscribe$))
        .subscribe({
          next: (res) => {
            this.#service.successCreate(res);
            this.onClose();
          },
          error: (err) => {
            this.showSpinner = false;
            this.#service.handleError(err);
          },
          complete: () => (this.showSpinner = false),
        });
    }
  }

  /**
   * Actualiza la información de un producto haciendo una petición HTTP al servidor.
   * Comprueba si el formulario es válido, establece la variable `showSpinner` a true para mostrar un spinner de carga,
   * y llama al método `updateProduct` del `ProductsService` para enviar los datos actualizados del producto al servidor.
   * A continuación, se suscribe a la respuesta y maneja los casos de éxito y error en consecuencia.
   */
  onEditProduct() {
    if (this.formGroup.valid) {
      this.showSpinner = true;
      this.#service
        .updateProductById(this.formGroup.value)
        .pipe(takeUntil(this.#service.unSubscribe$))
        .subscribe({
          next: (res) => {
            this.#service.successById(res, 'modified');
            this.onClose();
          },
          error: (err) => {
            this.showSpinner = false;
            this.#service.handleError(err);
          },
          complete: () => (this.showSpinner = false),
        });
    }
  }

  /**
   * Cierra un cuadro de diálogo modal.
   */
  onClose(): void {
    this.#dialogRef.close();
  }
}
