import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-server-error',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './server-error.component.html',
    styleUrl: './server-error.component.css'
})
export class ServerErrorComponent {
  error: any;

  constructor(private router: Router) {
    const nav = this.router?.getCurrentNavigation();
    this.error = nav?.extras?.state?.['error'];
    console.log('fdasfasdf', nav)
  }
}
