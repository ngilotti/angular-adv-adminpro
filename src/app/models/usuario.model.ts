import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

export class Usuario {
    constructor(
        public nombre: string,
        public apellido: string,
        public dni: number,
        public email: string,
        public pasword?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string
    ){    }

   get imgUrl() {

    if (!this.img) {
        return `${base_url}/upload/usuarios/no-image`;
    } else if (this.img.includes('https')) {
        return this.img;
    } else if (this.img) {
        return `${base_url}/upload/usuarios/${this.img}`;
    }else{
        return `${base_url}/upload/usuarios/no-image`;
    } // end if

   } // end get ImgUrl

} // end class Usuario
