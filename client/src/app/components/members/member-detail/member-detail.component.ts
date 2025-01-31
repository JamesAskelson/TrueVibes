import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../_models/member';
import { Observable, of, scheduled } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs'
import { LightgalleryModule } from 'lightgallery/angular';
import { GalleryItem } from 'lightgallery/lg-utils';

@Component({
    selector: 'app-member-detail',
    imports: [AsyncPipe, TabsModule, LightgalleryModule],
    templateUrl: './member-detail.component.html',
    styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit{
  private memberServ = inject(MembersService);
  private route = inject(ActivatedRoute);
  member$: Observable<Member | null> = of(null);
  images: GalleryItem[] = [];

  constructor() {
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;

    this.member$ = this.memberServ.getMemberByName(username);
  }

  ngOnInit(): void {
    this.member$.subscribe(member => {
      if (member) {
        this.images = member.photo.map(photo => ({
          src: photo.url,
          thumb: photo.url,
        }));
      }
    });
  }
}
