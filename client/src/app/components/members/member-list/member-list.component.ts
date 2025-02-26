import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../../_services/members.service';
import { Member } from '../../../_models/member';
import { Observable } from 'rxjs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MemberCardComponent } from "../member-card/member-card.component";
import { UserParams } from '../../../_models/userParams';
import { AccountService } from '../../../_services/account.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-member-list',
    imports: [MemberCardComponent, PaginationModule, FormsModule],
    templateUrl: './member-list.component.html',
    styleUrl: './member-list.component.css'
})
export class MemberListComponent {
  private accountServ = inject(AccountService);
  memberService = inject(MembersService);
  userParams = new UserParams(this.accountServ.currUser())
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}]

  ngOnInit(): void {
    if (!this.memberService.paginatedResult()) this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.userParams)
  }

  resetFilters() {
    this.userParams = new UserParams(this.accountServ.currUser())
    this.loadMembers();
  }

  pageChanged(event: any) {
    if (this.userParams.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
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
