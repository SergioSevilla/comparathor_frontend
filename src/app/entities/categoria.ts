export class Categoria {
    id: number;
    nombre: string;
    parentId: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;


costructor (    id: number,
    nombre: string,
    parentId: number,
    created_at: string,
    updated_at: string,
    deleted_at: string | null)
{
    this.id = id;
    this.nombre = nombre;
    this.parentId = parentId,
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
}


}