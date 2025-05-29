import { Routes } from '@angular/router';
import { StacksComponent } from './stacks/stacks.component';
import { QueuesComponent } from './queues/queues.component';

export const routes: Routes = [
    {path:'stacks', component: StacksComponent},
    {path:'queues', component: QueuesComponent},
];
