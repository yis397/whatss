import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {
  public ischatSelect:boolean=false;
  private baseurl=environment.baseUrl
  private headers=new HttpHeaders()
  .set('x-token',localStorage.getItem('x-token')||"np")
  constructor(private socket: Socket,
    private htpp:HttpClient) {
    this.socket.disconnect()

  }
   addContacto(telefono:string){
    const url=this.baseurl+'/auth/addContacto'
  return  this.htpp.post(url,{telefono},{headers:this.headers})

  .pipe(
    tap(({ok,user}:any)=>{

    }),map(resp=>resp),
    catchError(err=>of(err.error))
  )
  }
  async sendToken(token:string){
    this.socket.ioSocket.io.opts.query={'x-token':token}
    await this.socket.connect()
  }
  async desconectar(){

    await this.socket.disconnect()
  }
  listen(evento:string){
    return this.socket.fromEvent(evento)
  }
  selectChat(uid:string){
    this.ischatSelect=!this.ischatSelect
  }
   getMensaje(contacto:string){
    const url=this.baseurl+'/mensajes/getMensaje/'+contacto
    return  this.htpp.get(url,{headers:this.headers})

    .pipe(
      tap(({ok,user}:any)=>{

      }),map(resp=>resp),
      catchError(err=>of(err.error))
    )
  }
  sendMensaje(data:any,callback?: Function){

    this.socket.emit('mensaje',data,callback)
  }
}
