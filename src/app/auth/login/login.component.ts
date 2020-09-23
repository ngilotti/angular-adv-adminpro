// Librerias de angular
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

// Librerias de terceros
import Swal from 'sweetalert2';

// Servicios
import { UsuarioService } from '../../services/usuario.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'
  ]
})
export class LoginComponent implements OnInit {
  
  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({

    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    remember: [localStorage.getItem('remember') || false]

  });


  constructor(private router: Router,
              private fb: FormBuilder,
              private uServ: UsuarioService,
              private ngZ: NgZone) { }


  ngOnInit(): void {
   this.renderButton();
  } // ngOnInit


  login() {

    this.uServ.login(this.loginForm.value)
    .subscribe( resp => {

      if (this.loginForm.get('remember').value) {
        localStorage.setItem('email', this.loginForm.get('email').value);
        localStorage.setItem('remember', this.loginForm.get('remember').value);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('remember');
      } // end if


      // Navergar al Dashboard
      this.router.navigateByUrl('/');

    }, (err) => {
      // Si ocurre un error
      Swal.fire({
        title: 'Error',
        text: err.error.msg,
        icon: 'error'
      });
    });

  } // end login

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();

  }


  async startApp() {

    gapi.load('auth2', () => {

      this.uServ.googleInit();
      this.auth2 = this.uServ.auth2;

      this.attachSignin(document.getElementById('my-signin2'));
    });
  } // end startApp


  attachSignin(element) {

    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          // console.log(id_token);
          this.uServ.loginGoogle(id_token).subscribe(resp => {

            // recupera el control de angular en la libreria de google
            this.ngZ.run(() => {
              // Navergar al Dashboard
              this.router.navigateByUrl('/');
            });

          });


        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  } // end attachSignin

}
