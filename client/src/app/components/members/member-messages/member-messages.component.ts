import { Component, inject, Input, input, OnInit, output, ViewChild } from '@angular/core';
import { MessageService } from '../../../_services/message.service';
import { Message } from '../../../_models/message';
import { TimeagoModule, TimeagoPipe } from 'ngx-timeago';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-memeber-messages',
  imports: [TimeagoModule, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent {
  @ViewChild('messageForm') messageForm?: NgForm
  private messageServ = inject(MessageService)
  username = input.required<string>();
  messages = input.required<Message[]>();
  messageContent = '';
  updateMessages = output<Message>()

  sendMessage() {
    this.messageServ.sendMessage(this.username(), this.messageContent).subscribe({
      next: message => {
        this.updateMessages.emit(message);
        this.messageForm?.reset()
      }
    })
  }
}
