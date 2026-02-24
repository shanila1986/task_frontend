import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskModel } from '../../models/task.model';
import { Router } from '@angular/router';
import { Task } from '../../services/task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})

export class TaskList implements OnInit {
  tasks: TaskModel[] = [];
  filteredTasks: TaskModel[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  // Sorting
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Filtering
  filterText: string = '';

  constructor(private taskService: Task, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
  this.loading = true;
  this.errorMessage = '';

  this.taskService.getTasks().subscribe({
  next: (data) => {
    this.tasks = data ?? [];
    this.applyFilterAndSort();
  },
  error: (error) => {
    console.error('Error loading tasks:', error);
    this.errorMessage = 'Failed to load tasks. Please login first or check server.';
  },
  complete: () => {
    this.loading = false;
  }
});
}

applyFilterAndSort() {
    // Filter
    this.filteredTasks = this.tasks.filter(t =>
      t.title.toLowerCase().includes(this.filterText.toLowerCase()) ||
      t.description?.toLowerCase().includes(this.filterText.toLowerCase())
    );

    // Sort
    if (this.sortColumn) {
      this.filteredTasks.sort((a, b) => {
        const valA = (a as any)[this.sortColumn];
        const valB = (b as any)[this.sortColumn];

        if (valA == null) return 1;
        if (valB == null) return -1;

        let comparison = 0;
        if (typeof valA === 'string') {
          comparison = valA.localeCompare(valB);
        } else {
          comparison = valA > valB ? 1 : valA < valB ? -1 : 0;
        }

        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }
  }

  setSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilterAndSort();
  }

  onFilterChange() {
    this.applyFilterAndSort();
  }

  addTask() {
    this.router.navigate([`/tasks/add`]);
  }

  editTask(id: number) {
    console.log('Editing task with ID:', id);
    this.router.navigate([`/tasks/edit/${id}`]);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  toggleComplete(task: TaskModel) {
    task.isCompleted = !task.isCompleted;
    this.taskService.updateTask(task.id!, task).subscribe();
  }
}
