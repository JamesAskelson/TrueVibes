import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../../_services/members.service';
import { Member } from '../../../_models/member';
import { Observable } from 'rxjs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
    selector: 'app-member-list',
    imports: [MemberCardComponent, PaginationModule],
    templateUrl: './member-list.component.html',
    styleUrl: './member-list.component.css'
})
export class MemberListComponent {
  memberService = inject(MembersService);
  pageNumber = 1;
  pageSize = 5;

  ngOnInit(): void {
    if (!this.memberService.paginatedResult()) this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.pageNumber, this.pageSize)
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
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
