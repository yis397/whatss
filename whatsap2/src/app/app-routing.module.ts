import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { ChatComponent } from './pages/chat/chat.component';
import { RegisterComponent } from './pages/auth/register/register.component';

const routes: Routes = [
  {path:'auth',children:[
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
  ]},
  {path:'chat',component:ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
