import { Injectable } from '@angular/core';

@Injectable()

export class Globals{

    //SERVER = '192.168.1.142';
    SERVER = 'localhost';
    PORT = '8080';
    URL = 'http://'+this.SERVER+':'+this.PORT;

    ISLOGGED = false;

}