import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { preventDiscardedChangesGuard } from './_guards/prevent-discarded-changes.guard';
import { memberDetailedResolver } from './_resolver/member-detailed.resolver';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', component: MemberListComponent, canActivate: [authGuard] },
            { path: 'members/:username', component: MemberDetailComponent,
                resolve: { member: memberDetailedResolver } },
            { path: 'member/edit', component: MemberEditComponent, canDeactivate: [preventDiscardedChangesGuard] },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
        ]
    },
    { path: "errors", component: TestErrorsComponent},
    { path: "server-error", component: ServerErrorComponent },
    { path: "not-found", component: NotFoundComponent},
    { path: '**', component: HomepageComponent, pathMatch: "full" }
];
