import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../shared/services/auth.service';

interface AuthForm {
  name: string;
  email: string;
  password: string;
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
  private authService = inject(AuthService)
  // Явное объявление сигналов с типами
  readonly isLoginMode = signal<boolean>(true);

  // Реактивная форма через сигналы
  readonly authForm = signal<AuthForm>({
    name: '',
    email: '',
    password: ''
  });

  // Явное переключение режима с set()
  switchMode(loginMode: boolean): void {
    this.isLoginMode.set(loginMode);
    this.resetForm();
  }

  // Обработчик сабмита формы
  onSubmit(): void {
    const { email, password, name } = this.authForm();
    const isLoginMode = this.isLoginMode();

    if (!email || !password || (!isLoginMode && !name)) {
      console.error('Form validation failed');
      return;
    }

    const authObservable = isLoginMode
      ? this.authService.loginUser(email, password)
      : this.authService.registerUser(name!, email, password);

    authObservable.subscribe({
      next: (response) => {
        console.log(`${isLoginMode ? 'Login' : 'Registration'} successful`, response);
        // Здесь можно добавить перенаправление или другие действия после успеха
      },
      error: (err) => {
        console.error(`${isLoginMode ? 'Login' : 'Registration'} failed`, err);
        // Здесь можно добавить обработку ошибок для пользователя
      }
    });
  }

  // Обновление полей формы через update()
  updateFormField<K extends keyof AuthForm>(field: K, value: AuthForm[K]): void {
    this.authForm.update(current => ({
      ...current,
      [field]: value
    }));
  }

  // Сброс формы
  private resetForm(): void {
    this.authForm.set({
      name: '',
      email: '',
      password: ''
    });
  }
}
