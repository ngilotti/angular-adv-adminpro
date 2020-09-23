// Librerias de angular
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Librerias de terceros
import Swal from 'sweetalert2';

// Servicios
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css'
  ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    dni: ['', [Validators.required, Validators.minLength(7), Validators.pattern("^[0-9]*$")]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    password2: ['', [Validators.required, Validators.minLength(3)]],
    // terminos: [false, [Validators.required]]
  }, {
  Validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder, private router: Router, private uServ: UsuarioService) { }

  crearUsuario() {

    this.formSubmitted = true;
    // console.log(this.registerForm.value);

    // Valido si el formulario es valido
    if (this.registerForm.invalid) {
      return false;
    } //  end if

    // Realizar registro
    this.uServ.crearUsuario(this.registerForm.value)
        .subscribe( resp => {

           // Navergar al Dashboard
           this.router.navigateByUrl('/');

        }, (err) => {
          // Si ocurre un error
          Swal.fire({
            title: 'Error',
            text: err.error.msg,
            icon: 'error'
          });
        }
      );

      this.router.navigateByUrl('/login');

  }// end crearUsuario

  campoNoValido(campo: string): boolean {

    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }// end campoNoValido


  passNoValido() {
    const  pass1 = this.registerForm.get('password').value;
    const  pass2 = this.registerForm.get('password2').value;

    if ( pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    } // end if

  } // end passNoValido()

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  } // end aceptaTerminos


  passwordsIguales(pass1Name: string, pass2Name:string) {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({noEsIgual: true});
      } // end if
    }

  } // end passwordsIguales

}
