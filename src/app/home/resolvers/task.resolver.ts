import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';
import { HomeService } from '../services/home.service';

@Injectable({ providedIn: 'root' })
export class TasksResolver implements Resolve<Task[]> {
  private readonly _homeService = inject(HomeService);

  resolve(): Observable<Task[]> {
    return this._homeService.getTasksObservable();
  }
}
