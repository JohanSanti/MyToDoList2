import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskDetailPage } from './task-detail.page';

const routes: Routes = [
  {
    path: ':id',
    component: TaskDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskDetailPageRoutingModule {}
