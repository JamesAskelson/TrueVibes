import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../_models/member';
import { TabsModule } from 'ngx-bootstrap/tabs'
import { LightgalleryModule } from 'lightgallery/angular';
import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { DatePipe } from '@angular/common';
import { MemberMessagesComponent } from "../member-messages/member-messages.component";
@Component({
    selector: 'app-member-detail',
    imports: [TabsModule, LightgalleryModule, GalleryModule, TimeagoModule, DatePipe, MemberMessagesComponent],
    templateUrl: './member-detail.component.html',
    styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit{
  private memberServ = inject(MembersService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef)
  member?: Member;
  images: GalleryItem[] = [];

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.memberServ.getMemberByName(username).subscribe({
      next: member => {
        this.member = member;
        member.photo.map(p => {
          this.images.push(new ImageItem({src: p.url, thumb: p.url}))
        })
        this.cdr.markForCheck()
      }
    })
  }
}
