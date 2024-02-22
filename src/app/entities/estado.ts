export class Estado {
    id: number;
    nombre: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;

    constructor(id: number,
        nombre: string,
        created_at: string,
        updated_at: string,
        deleted_at: string | null)
        {
            this.id = id;
            this.nombre = nombre;
            this.created_at = created_at;
            this.updated_at = updated_at;
            this.deleted_at = deleted_at;
        }


}   
