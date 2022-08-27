import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { IUser, IContacto } from '../../interfaces/models';
import { ChatserviceService } from '../../service/chatservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy {
  public ismodal:boolean=false
  public isErrorContacto:boolean=false
  public msgContacto:string=""
  public contactoSub:Subscription=null!;
  @Input() usuario:IUser={tel:"2",uid:""}
  @Output() getMensajes:EventEmitter<IContacto>=new EventEmitter()
  contactos:IContacto[]=[]
  constructor(private chatService:ChatserviceService) { }

  ngOnInit(): void {
    this.contactoSub=this.chatService.listen('contactos').subscribe(data=>{

        this.contactos=data as any



    })
  }

  ngOnDestroy(): void {
    this.contactoSub.unsubscribe()
  }
  openModal(){
    this.ismodal=!this.ismodal
  }
  addContacto(form1:NgForm){
    const tel=form1.value.newcontacto.toString()
    if (tel.length>=7) {
      this.chatService.addContacto(tel)
      .subscribe(data=>{
        if (data.ok) {
          this.ismodal=false
          this.contactos.push(data.user)
          return
        }
        this.resteErro(data.msg)
        form1.reset()

      })
    }else{
      this.resteErro('error en numero')
    }

  }
  resteErro(msg:string){
    this.isErrorContacto=true
    this.msgContacto=msg
    setTimeout(() => {
      this.isErrorContacto=false
      this.msgContacto="msg"
      }, 2500);
  }
  selectChat(id:IContacto){
   this.getMensajes.emit(id)
  }
}
