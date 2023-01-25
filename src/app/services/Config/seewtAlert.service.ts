import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';

@Injectable()
export class NotificacionesService {

    constructor() {

    }

    Exitoso(mensaje: string): any {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon: 'success',
            title: 'El ' + mensaje + ' se guardo con exito'
        });
    }

    ExitosoGeneral(mensaje: string): any {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon: 'success',
            title:  mensaje
        });
    }

    ExitosoActualizar(mensaje: string): any {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon: 'success',
            title: 'El ' + mensaje + ' se actualizo con exito.'
        });
    }

    ExitosoEliminar(mensaje: string): any {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon: 'success',
            title: 'El ' + mensaje + ' se elimino con exito.'
        });
    }

    Error(mensaje: string): any {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon: 'error',
            title: mensaje
        });
    }

    Advertencia(mensaje: string): any {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon: 'warning',
            title: mensaje
        });
    }

    Informativo(mensaje: string): any {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon: 'info',
            title: mensaje
        });
    }

    confirmation(text: string, textBtnConfirm: string, textBtnCancel: string): Promise<boolean> {
       var algo = Swal.fire({
            text: text,
            icon: 'question',
            showCancelButton: true,
            iconColor: '#144959',
            cancelButtonText: textBtnCancel,
            confirmButtonText: textBtnConfirm,
            customClass: {
                popup : 'my-popup-class', 
                confirmButton: 'btn-gym-progress',
                cancelButton: 'btn-gym-dark '
              }
          }).then((result) => {
            if (result.isConfirmed) {
                return true;
            }
            return false;
          });
          return algo;
    }

}