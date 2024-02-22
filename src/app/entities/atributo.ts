export class Atributo {
    id: number;
    nombre: string;
    categoria: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;


costructor (    id: number,
    nombre: string,
    categoria: number,
    created_at: string,
    updated_at: string,
    deleted_at: string | null)
{
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria,
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
}


}