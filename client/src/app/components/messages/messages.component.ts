import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
    private cdr = inject(ChangeDetectorRef)
    messageServ = inject(MessageService)
    container = "Inbox";
    pageNumber = 1;
    pageSize = 5;
    isOutbox = this.container === 'Outbox';

    ngOnInit(): void {
        this.loadMessages()
    }

    loadMessages() {
        console.log(this.container)
        this.messageServ.getMessages(this.pageNumber, this.pageSize, this.container)
    }

    deleteMessage(id: number) {
        this.messageServ.deleteMessage(id).subscribe({
            next: _ => {
                this.messageServ.paginatedResult.update(prev => {
                    if(prev && prev.items) {
                        prev.items.splice(prev.items.findIndex(item => item.id === id), 1);
                        return prev;
                    }
                    return prev;
                })
                this.cdr.markForCheck()
            }
        })
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
