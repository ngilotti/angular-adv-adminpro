// Modulos de angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

// Modulos de terceros
import Swal from 'sweetalert2';

// Servicios
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';

// Modelos
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public anterior: boolean = false;
  public arrUsuarios: Usuario[] = [];
  public arrUsuariosTemp: Usuario[] = [];
  public cargando: boolean = true;
  public desde: number = 0;
  public imgSubs: Subscription;
  public modalForm: FormGroup;
  public siguiente: boolean = true;
  public totalUsuarios: number = 0;



  constructor(
              private busqServ: BusquedasService,
              private fb: FormBuilder,
              private mImgServ: ModalImagenService,
              private uServ: UsuarioService,
              ) {

              }


  ngOnInit(): void {
    this.cargarUsuario();

    this.imgSubs = this.mImgServ.nuevaImg
      .pipe( delay(500) )
      .subscribe(img => this.cargarUsuario() );
    
  } //  end ngOnInit

  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  } // end ngOnDestroy


  cargarUsuario() {
    this.cargando = true;

    this.uServ.cargarUsuario(this.desde)
      .subscribe( ({total, usuarios}) => {
        this.totalUsuarios   = total;
        this.arrUsuarios     = usuarios;
        this.arrUsuariosTemp = usuarios;
        this.cargando        = false;
      });
  } // end cargarUsuario



  actualizarUsuarios(user: Usuario) {
    // console.log(user);
    this.modalForm = this.fb.group({
      nombre:   [user.nombre, [Validators.required, Validators.minLength(3)] ],
      apellido: [user.apellido, [Validators.required, Validators.minLength(3)] ],
      email:    [user.email, [Validators.required, Validators.email] ],
      role:     [user.role]
    });
  } // end actualizarUsuarios



  cambiarPagina(valor: number) {
    this.desde += valor;
    this.anterior = true;
    this.siguiente = true;


    if (this.desde < 0){
      this.desde = 0;
      this.anterior = false;
    } else if (this.desde >= this.totalUsuarios){
      this.desde -= valor;
      this.siguiente = false;
    }  // end if

    this.cargarUsuario();
  } // end cambiarPagina



  buscar(termino: string) {

    if (termino.length < 2) {
      return this.arrUsuarios = this.arrUsuariosTemp;
    }

    this.busqServ.buscar('usuarios', termino)
        .subscribe( resultados => {
          this.arrUsuarios = resultados;
        });

  } // buscar



  eliminarUsuario( usuario: Usuario) {

    if ( usuario.uid === this.uServ.uid) {
      return Swal.fire('Error', 'No puede borrar su propio usuario');
    } else {

      Swal.fire({
        title: 'Borrar usuario?',
        text: `Esta por borrar al usuario ${usuario.email}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.uServ.eliminarUsuario(usuario)
              .subscribe((resp) => {

                this.cargarUsuario();
                Swal.fire(
                  'Eliminado!',
                  `El usuario ${usuario.email} se elimino correctamente.`,
                  'success'
                );

              });
        } // end if
      });

    } // end if

  } // end eliminarUsuario


  cambiarRole(usuario: Usuario) {
    this.uServ.guardarUsuario( usuario )
    .subscribe(resp => {
      console.log(resp);
    });
  } // end cambiarRole


  abrirModal(usuario: Usuario) {
    this.mImgServ.abrirModal('usuarios', usuario.uid, usuario.img);
    console.log(usuario);
  }

} // end class
