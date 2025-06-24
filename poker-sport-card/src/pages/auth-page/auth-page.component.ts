import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

interface AuthForm {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  private authService = inject(AuthService);

  readonly isLoginMode = signal<boolean>(true);
  readonly authForm = signal<AuthForm>({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: ''
  });
  readonly errorMessage = signal<string>('');

  switchMode(loginMode: boolean): void {
    this.isLoginMode.set(loginMode);
    this.resetForm();
    this.errorMessage.set('');
  }

  onSubmit(): void {
    this.errorMessage.set('');
    const formValue = this.authForm();
    const isLoginMode = this.isLoginMode();

    if (isLoginMode) {
      if (!formValue.username || !formValue.password) {
        this.errorMessage.set('Имя пользователя и пароль обязательны');
        return;
      }

      this.authService.loginUser(formValue.username, formValue.password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
        },
        error: (err: HttpErrorResponse) => {
          this.handleError(err, 'Ошибка входа');
        }
      });
    } else {
      if (!formValue.username || !formValue.password || !formValue.email ||
        !formValue.firstName || !formValue.lastName) {
        this.errorMessage.set('Все поля обязательны для заполнения');
        return;
      }

      this.authService.registerUser(
        formValue.username,
        formValue.password,
        formValue.email,
        formValue.firstName,
        formValue.lastName
      ).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.isLoginMode.set(true);
        },
        error: (err: HttpErrorResponse) => {
          this.handleError(err, 'Ошибка регистрации');
        }
      });
    }
  }

  private handleError(err: HttpErrorResponse, defaultMessage: string): void {
    console.error('Error details:', err);
    const serverMessage = err.error?.message || err.error?.error;
    this.errorMessage.set(serverMessage || defaultMessage);
  }

  updateFormField<K extends keyof AuthForm>(field: K, value: AuthForm[K]): void {
    this.authForm.update(current => ({
      ...current,
      [field]: value
    }));
  }

  private resetForm(): void {
    this.authForm.set({
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: ''
    });
  }
}
