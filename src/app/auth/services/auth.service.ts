import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);

  login(email: string, password: string) {
    const url = environment.url_users + '/login';
    return this._http.post<any>(url, { email, password }).pipe(
      map((res) => {
        sessionStorage.setItem('token', res.token);
        return res;
      })
    );
  }

  register(user: User) {
    const url = environment.url_users + '/register';
    return this._http.post<any>(url, user);
  }

  isAuthenticated() {
    return !!sessionStorage.getItem('token');
  }
}
