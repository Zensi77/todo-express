import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { environment } from '../../../environments/environment.development';
import { User } from '../../auth/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _http = inject(HttpClient);

  readonly tasks = signal<Task[]>([]); // Signal para tareas

  // Obtiene las tareas desde el backend
  getTasksObservable() {
    const url = environment.url_tasks;
    return this._http.get<Task[]>(url);
  }

  // Obtiene las tareas y las guarda en el signal
  getTasks() {
    const url = environment.url_tasks;
    this._http.get<Task[]>(url).subscribe((tasks) => {
      this.tasks.set(tasks); // Actualiza el signal con las tareas obtenidas
    });
  }

  // Método para agregar una nueva tarea
  addTask(task: Task) {
    const url = environment.url_tasks;
    this._http.post<Task>(url, task).subscribe(() => {
      this.getTasks(); // Actualiza la lista de tareas
    });
  }

  // Método para actualizar una tarea existente
  updateTask(task: Task) {
    const url = `${environment.url_tasks}/${task.id}`;
    this._http.put<Task>(url, task).subscribe(() => {
      this.getTasks(); // Actualiza la lista de tareas
    });
  }

  // Método para eliminar una tarea
  deleteTask(task: Task) {
    const url = `${environment.url_tasks}/${task.id}`;
    this._http.delete(url).subscribe(() => {
      this.getTasks(); // Actualiza la lista de tareas
    });
  }

  constructor() {}
}
