import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './board-admin/register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { GetUsersComponent } from './board-admin/get-users/get-users.component';
import { BoardClientComponent } from './board-client/board-client.component';
import { TesteComponent } from './teste/teste.component';
import { BoardEmployeeComponent } from './board-employee/board-employee.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { DisableEmployeeComponent } from './disable-employee/disable-employee.component';
const routes: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'users', component: GetUsersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'board-client', component: BoardClientComponent},
  { path: 'teste', component: TesteComponent},
  { path: 'board-employee', component: BoardEmployeeComponent},
  { path: 'register-employee', component: RegisterEmployeeComponent},
  { path: 'reservations', component: ReservationsComponent},
  { path: 'disable-employee', component: DisableEmployeeComponent}
  //{ path: 'login/callback', component: OktaCallbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
