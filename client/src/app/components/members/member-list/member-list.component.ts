import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../../_services/members.service';
import { Member } from '../../../_models/member';
import { Observable } from 'rxjs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MemberCardComponent } from "../member-card/member-card.component";
import { UserParams } from '../../../_models/userParams';
import { AccountService } from '../../../_services/account.service';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
    selector: 'app-member-list',
    imports: [MemberCardComponent, PaginationModule, FormsModule, ButtonsModule],
    templateUrl: './member-list.component.html',
    styleUrl: './member-list.component.css'
})
export class MemberListComponent {
  memberService = inject(MembersService);
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}]

  ngOnInit(): void {
    if (!this.memberService.paginatedResult()) this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers()
  }

  resetFilters() {
    this.memberService.resetParams()
    this.loadMembers();
  }

  pageChanged(event: any) {
    if (this.memberService.userParams().pageNumber !== event.page) {
      this.memberService.userParams().pageNumber = event.page;
      this.loadMembers()
    }
  }

  // ngOnInit(): void {
  //   this.loadMembers()
  // }

  // loadMembers() {
  //   this.memberServ.getMembers().subscribe({
  //     next: members => {
  //       this.members = members;
  //       console.log('in func', members)
  //     }
  //   })
  // }

}
