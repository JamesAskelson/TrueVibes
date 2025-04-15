import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../_services/admin.service';
import { User } from '../../../_models/user';
import { RolesModalComponent } from '../../modals/roles-modal/roles-modal.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  private adminServ = inject(AdminService);
  private modalServ = inject(BsModalService);
  private cdr = inject(ChangeDetectorRef);
  users: User[] = []
  bsModalRef: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();

  ngOnInit(): void {
    this.getUsersWithRoles();
    console.log(this.users)
  }

  openRolesModal() {
    const initialState: ModalOptions = {
      class: "modal-lg",
      initialState: {
        title: 'User roles',
        list: ['Admin', 'Moderator', 'Member']
      }
    }
    this.bsModalRef = this.modalServ.show(RolesModalComponent, initialState)
  }

  getUsersWithRoles() {
    this.adminServ.getUserWithRoles().subscribe({
      next: users => {
        this.users = users,
        this.cdr.markForCheck(),
        console.log(this.users)
      }
    })
  }
}
