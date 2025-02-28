import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.user.email, this.user.password).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        alert('Login successful!');
        this.router.navigate(['/product']);
      } else {
        alert('Invalid email or password. Please try again.');
      }
    });
  }

  createAccount(): void {
    this.router.navigate(['/register']);
  }
}
