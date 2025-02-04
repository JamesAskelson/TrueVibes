import { Component, inject, OnInit, output } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe, NgIf } from '@angular/common';
import { TextInputComponent } from "../../_forms/text-input/text-input.component";
import { DatePickerComponent } from "../../_forms/date-picker/date-picker.component";

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule, TextInputComponent, DatePickerComponent],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  accServ = inject(AccountService);
  cancelRegister = output<boolean>();
  model: any = {};
  registerForm: FormGroup = new FormGroup({})
  maxDate = new Date();

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
    console.log(this.registerForm.value)
    // this.accServ.register(this.model).subscribe({
    //   next: response => {
    //     console.log(response);
    //     this.cancel();
    //   },
    //   error: error => this.toastr.error(error.error)
    // })
  }


  cancel(){
    this.cancelRegister.emit(false)
  }
}
