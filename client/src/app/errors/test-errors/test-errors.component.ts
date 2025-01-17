import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-test-errors',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './test-errors.component.html',
    styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
  base = environment.base;
  private http = inject(HttpClient);
  validationErrors: string[] = [];

  constructor(private ref: ChangeDetectorRef){

  }

  get400Error(){
    this.http.get(this.base + "buggy/bad-request").subscribe({
      next: res => console.log(res),
      error: error => console.log(error)
    })
  }

  get401Error(){
    this.http.get(this.base + "buggy/auth").subscribe({
      next: res => console.log(res),
      error: error => console.log(error)
    })
  }

  get404Error(){
    this.http.get(this.base + "buggy/not-found").subscribe({
      next: res => console.log(res),
      error: error => console.log(error)
    })
  }

  get500Error(){
    this.http.get(this.base + "buggy/server-error").subscribe({
      next: res => console.log(res),
      error: error => console.log(error)
    })
  }

  get400ValidationError(){
    this.http.post(this.base + "account/register", {}).subscribe({
      next: res => console.log(res),
      error: error => {
        console.log(error);
        this.validationErrors = error;
        this.ref.detectChanges();
      }
    })
  }

}
