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
  private memberServ = inject(MembersService)
  members$: Observable<Member[]> = this.memberServ.getMembers();

  constructor(private ref: ChangeDetectorRef) {}

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
