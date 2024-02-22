export class Puntuacion {
    id: number;
    valor: number;
    usuario: number;
    producto: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;


costructor (    id: number,
    valor: number,
    usuario: number,
    producto: number,
    created_at: string,
    updated_at: string,
    deleted_at: string | null)
{
    this.id = id;
    this.valor = valor;
    this.usuario = usuario,
    this.producto = producto,
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
}


}