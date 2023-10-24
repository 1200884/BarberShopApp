import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent implements OnInit {
  form: any = {
    firstName: null,
    phoneNumber: null,
    lastName: null,
    email: null,
    role: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isRegistrationFormVisible=false;
  showRegistration=false;
  registrationAttempted = false; 
  
  constructor(private authService: AuthService,private location: Location,private router: Router) { }

  ngOnInit(): void {
    console.log("register component ngoninit")
  }

  onSubmitEmployee(): void {
    this.registrationAttempted = true; 
    const { firstName, phoneNumber, lastName, email, role } = this.form;
    this.form.role= "employee"
    console.log("employee registado role é " +this.form.role)
    console.log()
    let user : User;
    user = this.form;
    this.errorMessage='';
    this.authService.register(user).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.errorMessage = "Utilizador criado com sucesso.";
 
      },
      (err) => {
        if (err.status === 402) {
          this.errorMessage = 'O e-mail ou o número de telemóvel já estão associados a uma conta existente.';
        } else {
          this.errorMessage = 'Ocorreu um erro durante o registo. Tente novamente mais tarde.';
        }
  
        this.isSignUpFailed = true;
      }
    );
  }
  goBack() {
    this.location.back();

  }
  hideRegistrationForm() {
    this.showRegistration = false;
  }
}
