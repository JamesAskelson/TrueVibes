import { Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit{
  @Input() appHasRole: string[] = [];
  private accServ = inject(AccountService);
  private viewContainerRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef);

  ngOnInit(): void {
    if(this.accServ.roles()?.some((r: string) => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear()
    }
  }
}
