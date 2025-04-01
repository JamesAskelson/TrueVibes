import { Component, inject, input, OnInit } from '@angular/core';
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
  messages: Message[] = []

  ngOnInit(): void {
    this.loadMessages()
  }

  loadMessages() {
    this.messageServ.getMessageThread(this.username()).subscribe({
      next: messages => this.messages = messages
    })
  }
}
