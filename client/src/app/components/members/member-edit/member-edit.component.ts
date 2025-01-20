import { ChangeDetectorRef, Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../../_models/member';
import { AccountService } from '../../../_services/account.service';
import { MembersService } from '../../../_services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-edit',
  imports: [TabsModule, FormsModule, AsyncPipe],
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

  private accountServ = inject(AccountService);
  private memberServ = inject(MembersService);
  private toastr = inject(ToastrService);
  member$: Observable<Member> | undefined;

    constructor(private ref: ChangeDetectorRef) {
    }

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember(){
    const user = this.accountServ.currUser();
    if(!user) return;
    this.member$ = this.memberServ.getMemberByName(user.userName);
  }

  updateMember() {
    this.memberServ.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success("You updated your profile.")
      }
    })

  }
}
