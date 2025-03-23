import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { LikesService } from '../../_services/likes.service';
import { Member } from '../../_models/member';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from "../members/member-card/member-card.component";

@Component({
    selector: 'app-lists',
    imports: [ButtonsModule, FormsModule, MemberCardComponent],
    templateUrl: './lists.component.html',
    styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit {
    private likesServ = inject(LikesService);
    members: Member[] = [];
    predicate = 'liked';
    constructor(private cdr: ChangeDetectorRef) {}

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
        this.likesServ.getLikes(this.predicate).subscribe({
            next: members => {
                this.members = members,
                this.cdr.detectChanges()
            }
        })
    }
}
