import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { TaskList } from './components/task-list/task-list';
import { TaskForm } from './components/task-form/task-form';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'tasks', component: TaskList },
  { path: 'tasks/add', component: TaskForm },
  { path: 'tasks/edit/:id', component: TaskForm },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
