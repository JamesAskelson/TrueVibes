import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MembersService } from '../../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../_models/member';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs'
import { LightgalleryModule } from 'lightgallery/angular';
import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { DatePipe } from '@angular/common';
import { MemberMessagesComponent } from "../member-messages/member-messages.component";
import { Message } from '../../../_models/message';
import { MessageService } from '../../../_services/message.service';
@Component({
    selector: 'app-member-detail',
    imports: [TabsModule, LightgalleryModule, GalleryModule, TimeagoModule, DatePipe, MemberMessagesComponent],
    templateUrl: './member-detail.component.html',
    styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit{
  //staic + resolver + code in init allows for routing from membercard message button
  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
  private memberServ = inject(MembersService);
  private messageServ = inject(MessageService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  member: Member = {} as Member;
  images: GalleryItem[] = [];
  activeTab?: TabDirective;
  messages: Message[] = [];

  ngOnInit(): void {
    // OLD CODE
    // this.loadMember()
    this.route.data.subscribe({
      next: data => {
        this.member = data['member'];
        this.member && this.member.photo.map(p => {
          this.images.push(new ImageItem({src: p.url, thumb: p.url}))
        })
        this.cdr.markForCheck()
      }
    })
    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })
  }

  onUpdateMessages(event: Message) {
    this.messages.push(event);
  }

  selectTab(heading: string) {
    if(this.memberTabs) {
      const messageTab = this.memberTabs.tabs.find(x => x.heading === heading)
      if(messageTab) {
        messageTab.active = true;
        this.onTabActivated(messageTab);
      }
    }
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages' && this.messages.length === 0 && this.member) {
      this.messageServ.getMessageThread(this.member.username).subscribe({
        next: messages => {
          this.messages = messages,
          this.cdr.markForCheck()
        }
      })
    }
  }

// OLD CODE
  // loadMember() {
  //   const username = this.route.snapshot.paramMap.get('username');
  //   if (!username) return;
  //   this.memberServ.getMemberByName(username).subscribe({
  //     next: member => {
  //       this.member = member;
  //       member.photo.map(p => {
  //         this.images.push(new ImageItem({src: p.url, thumb: p.url}))
  //       })
  //       this.cdr.markForCheck()
  //     }
  //   })
  // }
}
