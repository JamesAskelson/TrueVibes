import { Component, inject, Input, input, OnInit } from '@angular/core';
import { MessageService } from '../../../_services/message.service';
import { Message } from '../../../_models/message';
import { TimeagoModule, TimeagoPipe } from 'ngx-timeago';

@Component({
  selector: 'app-memeber-messages',
  imports: [TimeagoModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit {
  private messageServ = inject(MessageService)
  username = input.required<string>();
  messages = input.required<Message[]>();


  ngOnInit(): void {
    this.loadMessages()

  }

  loadMessages() {
    console.log(this.messages())
    console.log(this.username())
  }
}
