import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './board-admin/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { UsersComponent } from './users/users.component';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { BoardClientComponent } from './board-client/board-client.component';
import { TesteComponent } from './teste/teste.component';
import { BoardEmployeeComponent } from './board-employee/board-employee.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { DisableEmployeeComponent } from './disable-employee/disable-employee.component';
import { SolariosComponent } from './solarios/solarios.component';
import { CabeleireirosComponent } from './cabeleireiros/cabeleireiros.component';
import { BarbeirosComponent } from './barbeiros/barbeiros.component';
import { EsteticistasComponent } from './esteticistas/esteticistas.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { ExemploestabelecimentoComponent } from './estabelecimentosespecificos/exemploestabelecimento/exemploestabelecimento.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    UsersComponent,
    BoardClientComponent,
    TesteComponent,
    BoardEmployeeComponent,
    RegisterEmployeeComponent,
    ReservationsComponent,
    DisableEmployeeComponent,
    SolariosComponent,
    CabeleireirosComponent,
    BarbeirosComponent,
    EsteticistasComponent,
    ExemploestabelecimentoComponent,
    FavoritosComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    SocialLoginModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCardModule

  ],
  providers: [authInterceptorProviders, {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('122519574160-f45pa7mcbvr2ofbpn7sb2t1addjks9uu.apps.googleusercontent.com') // your client id
        }
      ]
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
