import { Component, OnInit } from '@angular/core';
import { ExpenseType } from '../models/ExpenseType.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { ExpenseTypeService } from '../services/expense-type.service';
import { AppUser } from '../models/user.model';
import { error } from 'console';

@Component({
  selector: 'app-expense-type',
  templateUrl: './expense-type.component.html',
  styleUrls: ['./expense-type.component.css']
})
export class ExpenseTypeComponent implements OnInit {
  expenseTypes!: ExpenseType[] ;
  currentExpenseType!: ExpenseType;
  addExpenseTypeForm!: FormGroup;
  updateExpenseTypeForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthenticationService, 
    private expenseTypeService: ExpenseTypeService) { }

  ngOnInit(): void {
    //this.expenseTypes = [{id: 1, description: "Expense 1"}, {id: 2, description: "Expense 2"}]
    this.authService.getAuthenticatedUser().subscribe({
      next: (appUser: AppUser) => this.expenseTypeService.findAllExpenseTypes(appUser.id).subscribe({
        next: (expenseTypes : ExpenseType[])=> {
          this.expenseTypes = expenseTypes;
        },
        error: (err)=> {
          console.log('Erreur : '+err)
        }
      }),
      error: (err)=> {
        console.log(err);
      }
    })
 
    this.addExpenseTypeForm = this.fb.group({
      description : this.fb.control(''),
    })

    this.updateExpenseTypeForm = this.fb.group({
      description : this.fb.control(''),
    })
  }

  addExpenseType() {
    this.authService.getAuthenticatedUser().subscribe({
      next: (appUser: AppUser) => {
        let expenseType : ExpenseType= {
          userId: appUser.id,
          ...this.addExpenseTypeForm.value
        }

        this.expenseTypeService.addExpenseType(expenseType).subscribe({
          next: (expenseType: ExpenseType)=> this.expenseTypes.push(expenseType),
          error: (err)=>{
            console.log('Error : '+ err)
          }
        })
      },

      error: (err)=> {
          console.log('Erreur : '+err)
        }
      })
  }

  showExpenseType(expenseType: ExpenseType) {
    this.currentExpenseType = expenseType
    this.updateExpenseTypeForm.patchValue({
      description: this.currentExpenseType.description
    })
  }

  deleteExpenseType() {
    //debugger
    this.expenseTypeService.deleteExpenseType(this.currentExpenseType.id).subscribe({
      next: ()=> {
       // debugger
        window.location.reload()
      },
      error: (err)=> {
        console.log('Erreur : '+ err)
      }
    })
  }

  updateExpenseType() {
    this.currentExpenseType = {
      id: this.currentExpenseType.id,
      userId: this.currentExpenseType.userId,
      description: this.updateExpenseTypeForm.value.description
    } 

    this.expenseTypeService.updateExpenseType(this.currentExpenseType).subscribe({
      next: (expenseType: ExpenseType)=> {
        window.location.reload()
      },
      error: (err)=> {
        console.log('Erreur : '+ err)
      }
    })
   
  }

}
