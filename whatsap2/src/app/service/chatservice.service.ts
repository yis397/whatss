import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {

  constructor(private socket: Socket) { 
    this.socket.disconnect()   
  
  }
  async sendToken(token:string){
    console.log(token);
    this.socket.ioSocket.io.opts.query={'token':token}
    await this.socket.connect()
  }
  async desconectar(){
    
    await this.socket.disconnect()
  }
}
