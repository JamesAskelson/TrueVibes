import { ChangeDetectorRef, Component, HostListener, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Member } from '../../../_models/member';
import { AccountService } from '../../../_services/account.service';
import { MembersService } from '../../../_services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PhotoEditComponent } from "../photo-edit/photo-edit.component";
import { TimeagoModule } from 'ngx-timeago';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-member-edit',
  imports: [TabsModule, FormsModule, PhotoEditComponent, TimeagoModule, DatePipe],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }
  member?: Member;
  private accountServ = inject(AccountService);
  private memberServ = inject(MembersService);
  private toastr = inject(ToastrService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadMember()

  }

  loadMember() {
    const user = this.accountServ.currUser();
    if (!user) return;
    this.memberServ.getMemberByName(user.userName).subscribe({
      next: member =>
        {
          this.member = member;
          this.cdr.markForCheck();
        }

    })
  }

  updateMember() {
    this.memberServ.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.member);
      }
    })
  }

  onMemberChange(event: Member){
    this.member = event;
  }
}
