// Modulos de Angular
import { Component, OnInit } from '@angular/core';

// Modulos de terceros
import Swal from 'sweetalert2';

// Services
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';



@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styles: [
  ]
})

export class ModalImgComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( public mImgServ: ModalImagenService, public fUS:FileUploadService) { } // end constructor()
  

  ngOnInit(): void {
  } // end ngOnInit()


  cerrarModal() {
    this.imgTemp = null;
    this.mImgServ.cerrarModal();
  } // end cerrarModal()


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

    const id =  this.mImgServ.id;
    const tipo = this.mImgServ.tipo;

    this.fUS.actualizarFoto(this.imagenSubir, tipo, id)
    .then(img => {
      Swal.fire('Guardado', 'La imagen se actualizo', 'success');

      this.mImgServ.nuevaImg.emit(img);

      this.cerrarModal();
    }, (err) =>{
      console.log(err);
      Swal.fire('Error', 'No se pudo actualizar la imagen', 'error');
    });

  } // subirImg

} // end class
