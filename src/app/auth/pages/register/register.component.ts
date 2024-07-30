import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  public nombreApellidoPatron: RegExp = /^(?:[\u00c0-\u01ffa-zA-Z'-]){2,}(?:\s[\u00c0-\u01ffa-zA-Z'-]{2,})+$/i;

  public emailPatron: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public cargando: boolean = false;

  miFormulario: FormGroup = this.formBuilder.group({

    name: [ '', [Validators.required, Validators.pattern(this.nombreApellidoPatron) ] ],

    email: [ '', [ Validators.required, Validators.pattern(this.emailPatron) ] ],

    password: ['', [ Validators.required, Validators.minLength(6) ] ],
  });

  constructor(
    
    private formBuilder: FormBuilder,

    private authService: AuthService,

    private router: Router,
    
  ) {};
  
  validarCampos(miFormulario: FormGroup, campo: string, error: string): boolean {

    return (miFormulario.get(campo)?.errors?.[error] 
        && miFormulario.get(campo)?.touched )
          ?  true : false;
  };

  registro(): void {

    if (this.miFormulario.invalid) {

      this.miFormulario.markAllAsTouched();

      return;
    };

    this.cargando = true;
    const {name, email, password} = this.miFormulario.value;

    this.authService.registro(name, email, password)
    .subscribe( resp => {

      this.cargando = false;

      if( resp ) {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario registrado con éxito',
          showConfirmButton: false,
          timer: 1700
        })

        this.router.navigateByUrl('/dashboard');

      } else {

        Swal.fire( 'Error' , `Ya existe un usuario registrado con el correo: ${email}`, 'error');
      };
    });
  };
};
