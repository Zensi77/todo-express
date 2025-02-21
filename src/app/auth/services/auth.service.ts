import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);

  login(nombre: string, password: string) {
    const url = environment.url_users + '/login';
    return this._http.post<any>(url, { nombre, password });
  }

  register(user: User) {
    const url = environment.url_users + '/register';
    return this._http.post<any>(url, user);
  }
}
