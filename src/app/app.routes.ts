import { Routes } from '@angular/router';
import { StacksComponent } from './stacks/stacks.component';
import { QueuesComponent } from './queues/queues.component';
import { DoublyLinkedListComponent } from './doubly-linked-list/doubly-linked-list.component';
import { BinarySearchComponent } from './binary-search/binary-search.component';
import { GraphComponent } from './graph/graph.component';

export const routes: Routes = [
    {path:'',redirectTo:'stacks',pathMatch:'full'},
    {path:'stacks', component: StacksComponent},
    {path:'queues', component: QueuesComponent},
    {path:'dll', component: DoublyLinkedListComponent},
    {path:'bsearch', component: BinarySearchComponent},
    {path:'graph', component: GraphComponent}
];
