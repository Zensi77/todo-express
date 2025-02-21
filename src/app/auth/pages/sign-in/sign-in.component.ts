import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { message } from '../../utils/validators';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styles: ``,
})
export default class SignInComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  error(field: string) {
    return message(field)(this.loginForm);
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.get('email')?.value as string;
    const password = this.loginForm.get('password')?.value as string;

    this._authService.login(email, password).subscribe(
      (res) => {
        sessionStorage.setItem('token', res.token);

        this._router.navigate(['/home']);
      },
      (error) => {
        error.status === 401 ||
          (error.status === 404 &&
            Swal.fire('', 'Nombre o contraseña incorrectos', 'error'));

        error.status === 500 && Swal.fire('', 'Error en el servidor', 'error');
      }
    );
  }
}
