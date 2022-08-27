import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatserviceService } from '../../service/chatservice.service';
import { AuthService } from '../../service/auth.service';
import { IUser,IContacto } from 'src/app/interfaces/models';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

interface IMensajes{
  remitente:string,
  destino:string,
  mensaje:string,
  createdAt?:string,
}
interface IListMensaje{
  mensajes:IMensajes[],
  contacto:IContacto
}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,OnDestroy {
   public user:IUser={tel:"",uid:""};
   public idContacto:IContacto=null!
   public isChat:boolean=false;
   public listMensajes:IListMensaje[]=[];
   public selectConversacion:IListMensaje={mensajes:[],contacto:{uid:"",tel:"",online:false}};
   isSelectChat:boolean=false;
   public subscribeNewMensaje:Subscription=null!;
   constructor(private chatService:ChatserviceService,private authS:AuthService) { }

   ngOnInit(): void {

     const token=localStorage.getItem('x-token')
     const user=JSON.parse(localStorage.getItem('user')??"")
     if (token) {
       this.user=user
       this.chatService.sendToken(token)
       this.authS.setUser(user)
      }
      this.subscribeNewMensaje=this.chatService.listen('mensaje').subscribe(data=>{

        this.selectConversacion.mensajes.push(data as any)
      })

    }
    ngOnDestroy(): void {
      this.subscribeNewMensaje.unsubscribe()
    }
  openChat(){
    this.isChat=!this.isChat
  }
  getMensajes(contacto:IContacto){

    const exist=this.listMensajes.find(e=>e.contacto.uid===contacto.uid)
    this.selectConversacion.contacto=contacto
    if(exist){
      this.selectConversacion={mensajes:exist.mensajes,contacto}
      this.isChat=true
      return
    }
    this.isChat=false


      this.chatService.getMensaje(contacto.uid).subscribe(data=>{
        if (data.ok) {
          this.listMensajes.push({contacto:contacto,mensajes:data.mensajes})
          this.selectConversacion.mensajes=data.mensajes
          console.log(data);
        }
      })
      this.isChat=true

  }
  sendMensage(form2:NgForm){
    const mensaje=form2.value.mensage
    const data:IMensajes={destino:this.selectConversacion.contacto.uid,remitente:this.user.uid,mensaje}
    this.chatService.sendMensaje(data)
    this.selectConversacion.mensajes.push(data)
  }
  selectChat(){
    console.log('hola');
    this.isChat=!this.isChat
   }

}
