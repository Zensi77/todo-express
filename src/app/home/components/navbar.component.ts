import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menubar } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, Menubar, ButtonModule],
  template: `
    <p-menubar class="custom-menubar">
      <ng-template pTemplate="end">
        <button
          pButton
          label="Logout"
          icon="pi pi-sign-out"
          class="p-button-text"
          (click)="logout()"
        ></button>
      </ng-template>
    </p-menubar>
  `,
  styles: [
    `
      .custom-menubar .pi {
        color: #ff0000;
      }
      .custom-menubar .p-menubar-button {
        display: none !important;
      }
    `,
  ],
})
export class NavbarComponent {
  constructor(private router: Router) {}
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/auth/sign-in']);
  }
}
