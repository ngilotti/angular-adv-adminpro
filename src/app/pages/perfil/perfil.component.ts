// Modulos de angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Componentes de terceros
import Swal from 'sweetalert2';

// Servicios
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

// Modelos
import { Usuario } from '../../models/usuario.model';




@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public usuario: Usuario;
  public perfilForm: FormGroup;
  public imagenSubir: File;
  public imgTemp: any = null;



  constructor(private uServ: UsuarioService,
              private fb: FormBuilder,
              private fUS: FileUploadService) {
    this.usuario = uServ.usuario;

   }



  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre:   [this.usuario.nombre, [Validators.required, Validators.minLength(3)] ],
      apellido: [this.usuario.apellido, [Validators.required, Validators.minLength(3)] ],
      email:    [this.usuario.email, [Validators.required, Validators.email] ],
      dni:      [this.usuario.dni, [Validators.required, Validators.minLength(7), Validators.pattern("^[0-9]*$")] ],
      role:     [this.usuario.role]
    });

  } // end ngOnInit



  actualizarPerfil() {

    this.uServ.actualizarPerfil(this.perfilForm.value).subscribe(() => {
      const {nombre, apellido, email, dni, role} = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.apellido = apellido;
      this.usuario.email = email;
      this.usuario.dni = dni;
      this.usuario.role = role;

      Swal.fire('Guardado', 'Se guardaron los cambios', 'success');
    }, (err) => {
      Swal.fire('Error aqui', err.error.msg, 'error');
    });

  } // end actualizarPerfil



  cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if (!file) {
       return this.imgTemp = null;
    } // end if

    const reader = new FileReader();
    reader.readAsDataURL( file );


    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };


  } // end cambiarImagen



  subirImg() {

    this.fUS.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
    .then(img => {
      this.usuario.img = img
      Swal.fire('Guardado', 'La imagen se actualizo', 'success');
    }, (err) =>{
      console.log(err);
      Swal.fire('Error', 'No se pudo actualizar la imagen', 'error');
    });

  } // subirImg



}// end class
