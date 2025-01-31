import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../../_services/members.service';
import { Member } from '../../../_models/member';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
    selector: 'app-member-list',
    imports: [AsyncPipe, MemberCardComponent],
    templateUrl: './member-list.component.html',
    styleUrl: './member-list.component.css'
})
export class MemberListComponent {
  memberService = inject(MembersService);

  ngOnInit(): void {
    if (this.memberService.members().length === 0) this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers()
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
