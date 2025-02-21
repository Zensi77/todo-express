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
  styles: `
  @keyframes fadeInHighlight {
  from {
    background-color: rgba(255, 193, 7, 0.4); /* Amarillo suave */
  }
  to {
    background-color: transparent;
  }
}

.animated-row {
  animation: fadeInHighlight 0.7s ease-out;
}

  `,
})
export class TaksPageComponent {
  private readonly _homeService = inject(HomeService);
  tasks = computed(() => this._homeService.tasks());
  taskDialog = false;
  isEdit = false;
  selectedTask: Task = this.getEmptyTask();

  constructor() {
    this._homeService.getTasks();
  }

  // Abre el modal para crear una nueva tarea
  openModal() {
    this.selectedTask = this.getEmptyTask();
    this.isEdit = false;
    this.taskDialog = true;
  }

  // Abre el modal para editar una tarea
  editTask(task: Task) {
    this.selectedTask = { ...task };
    this.isEdit = true;
    this.taskDialog = true;
  }

  // Guarda la tarea, ya sea creando o editando
  saveTask() {
    if (this.isEdit) {
      this._homeService.updateTask(this.selectedTask);
    } else {
      this._homeService.addTask(this.selectedTask);
    }
    this.taskDialog = false;
  }

  // Elimina una tarea
  deleteTask(task: Task) {
    this._homeService.deleteTask(task);
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

  trackById(index: number, task: Task) {
    return task ? task.title : index;
  }

  ngAfterViewInit() {
    const tableBody = document.querySelector('p-table tbody') as HTMLElement;

    if (tableBody) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement && node.tagName === 'TR') {
              node.classList.add('animated-row');

              setTimeout(() => {
                node.classList.remove('animated-row');
              }, 700);
            }
          });
        });
      });

      observer.observe(tableBody, { childList: true });
    }
  }
}
