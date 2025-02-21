import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { HomeService } from '../../services/home.service';
import { NavbarComponent } from '../../components/navbar.component';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'; // Importar el Dialog de PrimeNG

@Component({
  imports: [
    NavbarComponent,
    CheckboxModule,
    TableModule,
    FormsModule,
    ButtonModule,
    DialogModule, // Asegurarse de importar el módulo del Dialog
  ],
  templateUrl: './taks-page.component.html',
  styles: [],
})
export class TaksPageComponent implements OnInit {
  private readonly _homeService = inject(HomeService);
  tasks = computed(() => this._homeService.tasks());
  taskDialog = false; // Controla la visibilidad del modal
  isEdit = false; // Determina si estamos editando o creando una tarea
  selectedTask: Task = this.getEmptyTask(); // Inicializa la tarea seleccionada

  constructor() {
    this._homeService.getTasks();
  }

  ngOnInit(): void {}

  // Abre el modal para crear una nueva tarea
  openModal() {
    this.selectedTask = this.getEmptyTask(); // Resetea la tarea
    this.isEdit = false; // Establece el modo como creación
    this.taskDialog = true; // Muestra el modal
  }

  // Abre el modal para editar una tarea
  editTask(task: Task) {
    this.selectedTask = { ...task }; // Carga los datos de la tarea a editar
    this.isEdit = true; // Establece el modo como edición
    this.taskDialog = true; // Muestra el modal
  }

  // Guarda la tarea, ya sea creando o editando
  saveTask() {
    if (this.isEdit) {
      this._homeService.updateTask(this.selectedTask); // Edita la tarea
    } else {
      this._homeService.addTask(this.selectedTask); // Crea una nueva tarea
    }
    this.taskDialog = false; // Cierra el modal
  }

  // Elimina una tarea
  deleteTask(task: Task) {
    this._homeService.deleteTask(task); // Llama al servicio para eliminar
  }

  // Devuelve una tarea vacía para la creación
  getEmptyTask(): Task {
    return {
      title: '',
      description: '',
      completed: false,
      user: { nombre: '', email: '' },
    };
  }
}
