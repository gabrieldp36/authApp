import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';

import { Usuario } from '../../auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      .font-white {

        color:white;
      }
    `
  ]
})
export class DashboardComponent {

  get usuario(): Usuario {

    return this.authService.usuario;
  };

  constructor(
    
    private router: Router,

    private authService: AuthService,
    
  ) {};

  logout(): void {

    this.authService.logout();

    this.router.navigateByUrl('/auth');
  };
};
