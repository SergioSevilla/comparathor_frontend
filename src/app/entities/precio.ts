export class Precio {
    id: number;
    valor: number;
    url: string;
    origen: number;
    producto: number;
    estado: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;


costructor (    id: number,
    valor: number,
    url: string,
    origen: number,
    producto: number,
    estado: number,
    created_at: string,
    updated_at: string,
    deleted_at: string | null)
{
    this.id = id;
    this.valor = valor;
    this.url = url;
    this.origen = origen;
    this.estado = estado;
    this.producto = producto;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
}


}