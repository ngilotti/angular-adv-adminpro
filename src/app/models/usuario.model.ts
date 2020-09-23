
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
        public u_id?: string
    ){    }
} // end class Usuario
