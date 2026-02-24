import { Component, signal } from '@angular/core';
import { Router, RouterModule  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})



export class App {
  protected readonly title = signal('task-management-ui');
  
  constructor(
    public authService: Auth,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); 
  }

  goToTasks() {
    this.router.navigate(['/tasks']);
  }
  
}
