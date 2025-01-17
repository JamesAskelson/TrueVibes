import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../_models/member';
import { Observable, of, scheduled } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs'
@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [AsyncPipe, TabsModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent {
  private memberServ = inject(MembersService);
  private route = inject(ActivatedRoute);
  member$: Observable<Member | null> = of(null);

  constructor() {
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;

    this.member$ = this.memberServ.getMemberByName(username);
  }
}
