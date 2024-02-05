export class User {
    id: number;
    nombre: string;
    email: string;
    password: string;
    direccion: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    roles: string;
  
    constructor(
        id: number,
        nombre: string,
        email: string,
        password: string,
        direccion: string,
        created_at: string,
        updated_at: string,
        deleted_at: string | null,
        roles: string
      ) { 
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password= password;
        this.direccion= direccion;
        this.created_at= created_at;
        this.updated_at= updated_at;
        this.deleted_at= deleted_at;
        this.roles= roles;
      }

      getNombre () : string {
        return this.nombre;
      }

}


