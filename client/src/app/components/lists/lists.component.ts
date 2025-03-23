import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LikesService } from '../../_services/likes.service';
import { Member } from '../../_models/member';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from "../members/member-card/member-card.component";
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
    selector: 'app-lists',
    imports: [ButtonsModule, FormsModule, MemberCardComponent, PaginationModule],
    templateUrl: './lists.component.html',
    styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit, OnDestroy {
    likesServ = inject(LikesService);
    predicate = 'liked';
    pageSize = 10;
    pageNumber = 1;
    constructor(private cdr: ChangeDetectorRef) {}

    ngOnDestroy(): void {
        this.likesServ.paginatedResult.set(null);
    }

    ngOnInit(): void {
        this.loadLikes();
    }

    getTitle() {
        switch(this.predicate){
            case "liked": return "Members you liked"
            case "likedBy": return "Members that like you"
            default: return "Mutuals"
        }
    }

    loadLikes() {
        this.likesServ.getLikes(this.predicate, this.pageNumber, this.pageSize)
    }

    pageChanged(event: any) {
        if(this.pageNumber !== event.page){
            this.pageNumber = event.page;
            this.loadLikes()
        }
    }
}
