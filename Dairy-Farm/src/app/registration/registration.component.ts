import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  user = {
    username: '',
    password: '',
    email: ''
  };
  confirmPassword = '';
  passwordsNotMatch = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(): void {
    if (this.user.password !== this.confirmPassword) {
      this.passwordsNotMatch = true;
      this.user.password = '';
      this.confirmPassword = '';
      alert('Passwords do not match. Please enter matching passwords.');
      return;
    }
    this.passwordsNotMatch = false;
    this.authService.register(this.user).subscribe(response => {
      alert('User registered successfully');
      this.router.navigate(['/']);
    });
  }
}
