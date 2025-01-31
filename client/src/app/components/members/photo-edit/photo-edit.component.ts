import { ChangeDetectorRef, Component, inject, input, output } from '@angular/core';
import { Member } from '../../../_models/member';
import { CommonModule, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AccountService } from '../../../_services/account.service';
import { environment } from '../../../../environments/environment';
import { MembersService } from '../../../_services/members.service';
import { Photo } from '../../../_models/photo';

@Component({
  selector: 'app-photo-edit',
  imports: [NgIf, NgFor, NgStyle, NgClass, FileUploadModule, CommonModule],
  templateUrl: './photo-edit.component.html',
  styleUrl: './photo-edit.component.css'
})
export class PhotoEditComponent {
  private accServ = inject(AccountService);
  private memServe = inject(MembersService);
  member = input.required<Member>();
  uploader?: FileUploader;
  baseURL = environment.base;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  memberChange = output<Member>();

  constructor (){
    this.uploader = new FileUploader({
      url: this.baseURL + 'users/add-photo',
      authToken: `Bearer ` + this.accServ.currUser()?.token,
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      const photo = JSON.parse(response);
      const updatedMember = {...this.member()}
      updatedMember.photo.push(photo);
      this.memberChange.emit(updatedMember);
    }
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  setToMain(photo: Photo){
    this.memServe.setMainPhoto(photo).subscribe({
      next: _ => {
        const user = this.accServ.currUser();
        if(user) {
          user.photoUrl = photo.url;
          this.accServ.setCurrentUser(user);
        }
        const updatedMember = {...this.member()}
        updatedMember.photoUrl = photo.url;
        updatedMember.photo.forEach(p => {
          if(p.isMain) p.isMain = false;
          if(p.id === photo.id) p.isMain = true;
        })
        this.memberChange.emit(updatedMember);
      }
    })
  }

  deletePhoto(photo: Photo){
    this.memServe.deletePhoto(photo).subscribe({
      next: _ => {
        const updatedMember = {...this.member()}
        updatedMember.photo = updatedMember.photo.filter(x => x.id !== photo.id)
        this.memberChange.emit(updatedMember)
      }
    })
  }
}
