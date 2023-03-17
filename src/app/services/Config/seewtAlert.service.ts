import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

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
            title: 'El ' + mensaje + ' se guardo con exito',
            customClass: {
               
                title: 'title-gym-progress',
       
            },
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
            title:  mensaje,
            customClass: {
               
                title: 'title-gym-progress',
       
            },
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
            title: 'El ' + mensaje + ' se actualizo con exito.',
            customClass: {
               
                title: 'title-gym-progress',
       
            },
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
            title: 'El ' + mensaje + ' se elimino con exito.',
            customClass: {
               
                title: 'title-gym-progress',
       
            },
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
            title: mensaje,
            customClass: {
               
                title: 'title-gym-progress',
       
            },
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
            title: mensaje,
            customClass: {
               
                title: 'title-gym-progress',
       
            },
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
            title: mensaje,
            customClass: {
               
                title: 'title-gym-progress',
       
            },
        });
    }

    confirmation(text: string, textSub: string, textBtnConfirm: string, textBtnCancel: string): Promise<boolean> {
       var algo = Swal.fire({
            title: text,
            text: textSub,
            icon: 'warning',
            showCancelButton: true,
            iconColor: '#144959',
            cancelButtonText: textBtnCancel,
            confirmButtonText: textBtnConfirm,
            customClass: {
                popup : 'my-popup-class', 
                title: 'title-gym-progress',
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

    confirmationNotBtnConfirm(text: string, textSub: string, textBtnCancel: string): Promise<boolean> {
        var algo = Swal.fire({
             title: text,
             text: textSub,
             icon: 'warning',
             showCancelButton: true,
             iconColor: '#144959',
             confirmButtonText: textBtnCancel,
             showConfirmButton: true,
             customClass: {
                 popup : 'my-popup-class', 
                 title: 'title-gym-progress',
                 confirmButton: 'btn-gym-progress',
                 cancelButton: 'btn-gym-dark '
               }
           }).then((result) => {
             if (result.isConfirmed) {
                 return true;
             } else {
             return false;
             }
           });
           return algo;
    }

    confirmationNotBtnCancel(text: string, textSub: string, textBtnConfirm: string,): Promise<boolean> {
        var algo = Swal.fire({
             title: text,
             text: textSub,
             icon: 'warning',
             showCancelButton: true,
             iconColor: '#144959',
             showCloseButton: false,
             confirmButtonText: textBtnConfirm,
             customClass: {
                 popup : 'my-popup-class', 
                 title: 'title-gym-progress',
                 confirmButton: 'btn-gym-progress',
                 cancelButton: 'btn-gym-dark '
               }
           }).then((result) => {
             if (result.isConfirmed) {
                 return true;
             } else {
              return false;
             }
           });
           return algo;
    }
}