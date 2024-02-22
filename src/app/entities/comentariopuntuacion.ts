export class ComentarioPuntuacion {
    idcomentario: number;
    idusuario: number;
    puntuacion: number;
    comentario: string;
    usuario: string;



costructor (    idcomentario: number,
    idusuario: number,
    puntuacion: number,
    comentario: string,
    usuario: string)
{
    this.idcomentario = idcomentario;
    this.idusuario = idusuario;
    this.puntuacion = puntuacion;
    this.comentario = comentario;
    this.usuario = usuario;
}


}