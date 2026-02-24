import {  Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,NgForm } from '@angular/forms';
import { TaskModel } from '../../models/task.model';
import { ActivatedRoute, Router  } from '@angular/router';
import { Task } from '../../services/task';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {

task: TaskModel = {
  title: '',
  description: '',
  isCompleted: false,
  id: 0,
  createdAt: '',
  updatedAt: ''
};

  isEditMode: boolean = false;
  loading: boolean = false;

  constructor(
    private taskService: Task,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.loading = true;

      this.taskService.getTask(+id).subscribe({
        next: (data) => {
          this.task = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  saveTask(form: NgForm) {

  if (form.invalid) {
    form.control.markAllAsTouched();
    return;
  }

  this.loading = true;

  if (this.isEditMode && this.task.id) {
    this.taskService.updateTask(this.task.id, this.task).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.loading = false;
      }
    });
  } else {
    this.taskService.addTask(this.task).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}

}
