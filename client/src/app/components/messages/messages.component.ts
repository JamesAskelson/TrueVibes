import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from '../../_services/message.service';
import { FormsModule, NgForm } from '@angular/forms';
import { TimeagoModule, TimeagoPipe } from 'ngx-timeago';
import { Message } from '../../_models/message';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
    selector: 'app-messages',
    imports: [ButtonsModule, FormsModule, TimeagoModule, RouterLink, PaginationModule],
    templateUrl: './messages.component.html',
    styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
    messageServ = inject(MessageService)
    container = "Inbox";
    pageNumber = 1;
    pageSize = 5;

    ngOnInit(): void {
        this.loadMessages()
    }

    loadMessages() {
        console.log(this.container)
        this.messageServ.getMessages(this.pageNumber, this.pageSize, this.container)
    }

    getRoute(message: Message) {
        if(this.container ==='Outbox') {
            return `/members/${message.recipientUsername}`
        } else {
            return `/members/${message.senderUsername}`
        }
    }

    pageChanged(event: any) {
        if(this.pageNumber !== event.page) {
            this.pageNumber = event.page;
            this.loadMessages();
        }
    }
}
