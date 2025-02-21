import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, Menubar],
  template: '<p-menubar [model]="items" class="custom-menubar"></p-menubar>',
  styles: `
  .custom-menubar .pi {
      color: #ff0000; /* Cambia este color al que desees */
    }
  `,
})
export class NavbarComponent {
  items = [
    { label: 'Inicio', icon: 'pi pi-home', routerLink: '/home' },
    { label: 'Usuarios', icon: 'pi pi-users', routerLink: '/users' },
  ];
}
