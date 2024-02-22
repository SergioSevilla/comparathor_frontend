export class Comentario {
    id: number;
    texto: string;
    usuario: number;
    producto: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;


costructor (    id: number,
    texto: string,
    usuario: number,
    producto: number,
    created_at: string,
    updated_at: string,
    deleted_at: string | null)
{
    this.id = id;
    this.texto = texto;
    this.usuario = usuario,
    this.producto = producto,
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
}


}