import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authFormGroup !: FormGroup;
  errorMessage!: any;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.initAuthForm();
  }

  initAuthForm() {
    this.authFormGroup = this.fb.group({
      username : this.fb.control("kc@gmail.com"),
      password : this.fb.control("1234")
    })
  }

  onLogin() {
    let username = this.authFormGroup.value.username;
    let password = this.authFormGroup.value.password;
    this.authService.login(username, password).subscribe({
      next: (data: any)=> {
        this.authService.setToken(data.access_token);
        this.router.navigateByUrl("/customer")
      },
      error: (error: any)=> {
        this.errorMessage = 'Login failed';
        console.error(error);
      }
    
    })
  }
}
