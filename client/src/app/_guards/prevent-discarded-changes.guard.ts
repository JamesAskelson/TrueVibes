import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../components/members/member-edit/member-edit.component';

export const preventDiscardedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  if(!component.editForm?.dirty){
    console.log('are we here')
    return confirm("Are you sure you want to continue? Any unsaved changes WILL be lost.")
  } else {
    console.log('true')
    return true;
  }

};
