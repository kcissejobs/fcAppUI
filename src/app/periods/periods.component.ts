import { Component, OnInit } from '@angular/core';
import { PeriodService } from '../services/period.service';
import { Period } from '../models/Period.model';
import { AuthenticationService } from '../services/authentication.service';
import { AppUser } from '../models/user.model';
import { ChunckService } from '../utils/chunck.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.css']
})
export class PeriodsComponent implements OnInit {
  periods: Period[] = [] ;
  currentPeriod: Period | undefined;
  errorMessage!: string;

  //The forms
  addPeriodFormGroup!: FormGroup;
  updatePeriodFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private periodService: PeriodService, 
    private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.getPeriods();
    this.initAddPeriodForm();
    this.initUpdatePeriodForm();
  }

  initUpdatePeriodForm() {
    this.updatePeriodFormGroup= this.fb.group({
      startDate : this.fb.control(new Date()),
      endDate : this.fb.control(new Date()),
      status: this.fb.control(this.currentPeriod?.status)
    })
  }

  initAddPeriodForm() {
    this.addPeriodFormGroup = this.fb.group({
      startDate : this.fb.control(new Date()),
      endDate : this.fb.control(new Date()),
      status: this.fb.control("OPEN")
    })
  }

  getPeriods() {
    this.auth.getAuthenticatedUser().subscribe({
      next: (appUser: AppUser)=> {
        this.periodService.findUserPeriods(appUser.id).subscribe({
          next: (periods: Period[])=> {
            this.periods = periods;
          },
    
          error: (err)=> {
            this.errorMessage = err;
          }
        })

      },
      error: (err)=> {
        this.errorMessage = err;
      }
    })
  }

  onAddPeriod() {
    this.auth.getAuthenticatedUser().subscribe({
      next: (appUser: AppUser)=> {
        let period: Period = {
          userId: appUser.id,
          ...this.addPeriodFormGroup.value
        }
        this.periodService.addPeriod(period).subscribe({
          next:(period: Period)=> {
            window.location.reload();
          },
          error:(err)=> {
            console.log()
          }
        })
      }
    })
  }

  showPeriod(idPeriod: string) {
    this.currentPeriod = this.periods.find(p=> p.id== idPeriod);
    this.updatePeriodFormGroup.patchValue({
      startDate: this.currentPeriod?.startDate,
      endDate: this.currentPeriod?.endDate,
      status: this.currentPeriod?.status
    })
  }

  onUpdatePeriod() {
    this.auth.getAuthenticatedUser().subscribe({
      next: (appUser: AppUser)=> {
        let period: Period = {
          id: this.currentPeriod?.id,
          userId: this.currentPeriod?.userId,
          ...this.updatePeriodFormGroup.value
        }
        this.periodService.updatePeriod(period).subscribe({
          next:(period: Period)=> {
            window.location.reload();
          },
          error:(err)=> {
            console.log()
          }
        })
      }
    })
  }

  onDeletePeriod() {
    if(!this.currentPeriod) return;
    this.periodService.deletePeriod(this.currentPeriod.id).subscribe({
      next:()=> {
        window.location.reload();
      },
      error:(err)=> {
        console.log()
      }
    })
  }

}
