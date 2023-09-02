import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-template',
  templateUrl: './customer-template.component.html',
  styleUrls: ['./customer-template.component.css']
})
export class CustomerTemplateComponent implements OnInit {
  firstName : string | undefined;
  lastName: string | undefined;

  constructor(private authService: AuthenticationService, private route: Router) { }

  ngOnInit(): void {
    //debugger
    this.authService.getAuthenticatedUser().subscribe({
      next: (data)=> {
        this.firstName = data.firstname,
        this.lastName = data.lastname
        //debugger
      },
      error: (err)=> alert('error')
    })

   // debugger

  }

  public handleLogout() {
    this.authService.logout().subscribe({
      next: ()=>{
        this.route.navigateByUrl("/login");
      }
    })
    
  }

}
