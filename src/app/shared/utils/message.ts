import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class Message {
  /**
   * Muestra una ventana emergente con el título, la descripción, el texto del botón y el icono especificados.
   * @param title - Título de la ventana emergente.
   * @param text - La descripción de la ventana emergente.
   * @param icon - El icono que se mostrará en la ventana emergente. Puede ser uno de los siguientes valores 'error', 'success', 'warning', 'info', o 'question'.
   */
  popupWindow(
    title: string,
    text: string,
    icon: 'error' | 'success' | 'warning' | 'info' | 'question'
  ) {
    Swal.fire({
      icon,
      title,
      text,
      confirmButtonColor: '#2563EB',
    });
  }

  /**
   * Muestra una notificación tipo Toast con el título especificado.
   * @param title - El título de la notificación del Toast.
   */
  infoToast(title: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: title,
    });
  }

  confirmPopupWindow() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563EB',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your product has been deleted.',
          icon: 'success',
        });
      }
    });
  }
}
