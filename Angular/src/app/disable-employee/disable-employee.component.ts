import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-disable-employee',
  templateUrl: './disable-employee.component.html',
  styleUrls: ['./disable-employee.component.css']
})
export class DisableEmployeeComponent {
  userEmail: string | null;

  constructor(private userService: AuthService) {
    this.userEmail = this.userService.getUserEmail();
}
 isDeleted: boolean = false;

confirmDelete(confirm: boolean) {
  if (confirm && this.userEmail !== null) {
    console.log(this.userEmail)
    this.userService.inactive(this.userEmail);
    this.isDeleted = true;
  }
}
}