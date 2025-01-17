import { Component, inject, input, Input, output } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    imports: [CommonModule, FormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: any = {};
  accServ = inject(AccountService);
  private toastr = inject(ToastrService);
  cancelRegister = output<boolean>();

  register(){
    this.accServ.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => this.toastr.error(error.error)
    })
  }


  cancel(){
    this.cancelRegister.emit(false)
  }
}
