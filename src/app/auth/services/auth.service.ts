import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, Observable, of, tap } from 'rxjs';

import { AuthResponse, Usuario } from '../interfaces/auth.interfaces';

import { environment } from 'src/environments/environment';

@Injectable({

  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;

  private _usuario!: Usuario;

  get usuario(): Usuario {

    return { ...this._usuario }
  };

  constructor(private http: HttpClient) {};

  registro(name: string, email: string, password: string): Observable<boolean>  {

    const url: string = `${this.baseUrl}/auth/new`;

    const body = { name, email, password };

    return this.http.post<AuthResponse>(url, body)
    .pipe(

      tap( resp => {

        if(resp.ok) {

          localStorage.setItem('token', resp.token!);
        };
      }),

      map( resp => resp.ok ),

      catchError( error => of( false ) ),
    );
  };

  login(email: string, password: string): Observable<boolean> {

    const url: string = `${this.baseUrl}/auth`;

    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
    .pipe(

      tap( resp => {

        if(resp.ok) {

          localStorage.setItem('token', resp.token!);
        };
      }),

      map( resp => resp.ok),

      catchError( error => of(false) ),
    );
  };

  validarToken(): Observable<boolean> {

    const url: string = `${this.baseUrl}/auth/renew`;

    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '');
    
    return this.http.get<AuthResponse>(url, { headers } )
    .pipe(

      map( resp => {

        localStorage.setItem('token', resp.token!);

        this._usuario = {

          uid: resp.uid!,
          name: resp.name!,
          email: resp.email!,
        };

        return resp.ok;
      }),

      catchError( error => of(false) ),
    );
  };

  logout(): void {

    localStorage.clear();
  };
};
