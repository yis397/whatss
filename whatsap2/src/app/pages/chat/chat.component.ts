import { Component, OnInit } from '@angular/core';
import { ChatserviceService } from '../../service/chatservice.service';
import { AuthService } from '../../service/auth.service';

interface IUser{
  username?:string
  tel:string
}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
   public user:IUser={tel:""};
  constructor(private chatService:ChatserviceService,private authS:AuthService) { }

  ngOnInit(): void {
    const token=localStorage.getItem('x-token')
    const user=JSON.parse(localStorage.getItem('user')??"")
    if (token) {
      this.user=user
      this.chatService.sendToken(token)
      this.authS.setUser(user)
    }
  }

}
