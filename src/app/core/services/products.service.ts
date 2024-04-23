import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { environment } from '@env/environment.prod';
import { Products } from '@core/interface/products';
import { Message } from '@shared/utils/message';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  /** Variables globales */
  unSubscribe$ = new Subject<void>();
  products = signal<Products[]>([]);
  #http = inject(HttpClient);
  #message = inject(Message);

  /**
   * Recupera todos los productos del punto final de la API.
   * @returns Un observable de tipo Products[], que representa una matriz de objetos de productos.
   */
  getAllProducts(): Observable<Products[]> {
    const url = `${environment.API_URL}/api/v1/products`;
    return this.#http.get<Products[]>(url);
  }

  /**
   * Envía una solicitud POST al punto final de la API para crear un nuevo producto.
   * @param body Un objeto que contiene los detalles del producto a crear.
   * Debe tener las propiedades `id`, `name`, `lastName`, `position`, y `dateBirth`.
   * @returns Un Observable que emite la respuesta de la llamada a la API.
   */
  createProduct(body: Products): Observable<Products> {
    const url = `${environment.API_URL}/api/v1/products`;
    return this.#http.post<Products>(url, body);
  }

  /**
   * Envía una solicitud PUT al punto final de la API para actualizar un nuevo producto.
   * @param body Un objeto que contiene los detalles del producto a actualizar.
   * Debe tener las propiedades `id`, `name`, `lastName`, `position`, y `dateBirth`.
   * @returns Un Observable que emite la respuesta de la llamada a la API.
   */
  updateProductById(body: Products): Observable<Products> {
    const url = `${environment.API_URL}/api/v1/products/${body.id}`;
    return this.#http.put<Products>(url, body);
  }

  /**
   * Borra un producto enviando una solicitud DELETE al punto final de la API.
   * @param id - El ID del producto a eliminar.
   * @returns Un Observable que emite la respuesta de la API, indicando si el producto fue eliminado con éxito o no.
   */
  deleteProductById(id: string): Observable<Products> {
    const url = `${environment.API_URL}/api/v1/products/${id}`;
    return this.#http.delete<Products>(url);
  }

  /**
   * Actualiza el estado del componente después de obtener correctamente una lista de productos del servicio.
   * @param data - La lista de productos recibida del servicio.
   */
  successAll(data: Products[]): void {
    this.products.set(data);
  }

  /**
   * Actualiza el estado del componente después de obtener correctamente la lista de posiciones del servicio.
   * @param data - La lista de posiciones recibida del servicio.
   * Muestra mensaje con descripción satisfactoria.
   */
  successCreate(data: Products): void {
    this.#message.popupWindow(
      'successfully created',
      `${data.name} was successfully created!`,
      'success'
    );
  }

  /**
   * Actualiza el estado del componente después de obtener correctamente la lista de posiciones del servicio.
   * @param data - La lista de posiciones recibida del servicio.
   * Muestra mensaje temporal con descripción satisfactoria.
   */
  successById(data: Products, action: string): void {
    this.#message.infoToast(`${data.name} - successfully ${action}!`);
  }

  /**
   * Maneja los errores que se producen durante la petición de la lista de productos del servicio.
   * @param err - El objeto de error que se pasa al método.
   * Muestra mensaje con descripción del error.
   */
  handleError(err: Error): void {
    this.#message.popupWindow(
      'Oops...',
      `Unexpected error, please contact the technical team, error: ${err.message}`,
      'error'
    );
    console.error('Error handling in service:', err.message);
  }
}
