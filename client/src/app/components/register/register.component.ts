import { ChangeDetectorRef, Component, inject, OnInit, output } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { TextInputComponent } from "../../_forms/text-input/text-input.component";
import { DatePickerComponent } from "../../_forms/date-picker/date-picker.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule, TextInputComponent, DatePickerComponent],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef)
  private router = inject(Router);
  accServ = inject(AccountService);
  cancelRegister = output<boolean>();
  model: any = {};
  registerForm: FormGroup = new FormGroup({})
  maxDate = new Date();
  validationErrors: string[] | undefined

  ngOnInit(): void {
    this.initializeForm()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      gender: new FormControl('male'),
      Username: new FormControl('', Validators.required),
      KnownAs: new FormControl('', Validators.required),
      DateOfBirth: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required),
      Country: new FormControl('', Validators.required),
      Password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('Password')])
    })
    this.registerForm.controls['Password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassowrd'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }
  }


  register(){
    const dob = this.getDateOnly(this.registerForm.get('DateOfBirth')?.value);
    this.registerForm.patchValue({DateOfBirth: dob})
    this.accServ.register(this.registerForm.value).subscribe({
      next: _ => this.router.navigateByUrl('/members'),
      error: error => {
        this.validationErrors = error,
        this.cdr.markForCheck()
      }
    })
  }


  cancel(){
    this.cancelRegister.emit(false)
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    return new Date(dob).toISOString().slice(0, 10);
  }
}
