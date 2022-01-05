import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  public emailPatron: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  miFormulario: FormGroup = this.formBuilder.group({

    email: [ '', [ Validators.required, Validators.pattern(this.emailPatron) ] ],

    password: ['', [ Validators.required, Validators.minLength(6) ] ],
  });

  constructor(

    private formBuilder: FormBuilder,

    private router: Router,

    private authService: AuthService,

  ) {};

  validarCampos(miFormulario: FormGroup, campo: string, error: string): boolean {

    return (miFormulario.get(campo)?.errors?.[error] 
        && miFormulario.get(campo)?.touched )
          ?  true : false;
  };

  login(): void {

    if (this.miFormulario.invalid) {

      this.miFormulario.markAllAsTouched();

      return
    };

    const {email, password} = this.miFormulario.value;

    this.authService.login(email, password)
    .subscribe( ok => {

      if( ok ) {

        this.router.navigateByUrl('/dashboard');

      } else {

        Swal.fire( 'Error' , 'Email / Password incorrectos', 'error');
      };
    });
  };
};
