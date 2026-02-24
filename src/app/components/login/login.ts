import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

login() {
  this.authService.login(this.username, this.password).subscribe({
    next: (success) => {
      if (success) {
        this.router.navigate(['/tasks']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    },
    error: () => {
      this.errorMessage = 'Server error. Please try again later.';
    }
  });
}
}
