import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: false,
})
export class RegisterPage {

  name = "";
  email = "";
  password = "";

  constructor(private http: HttpClient, private router: Router) { }

  register() {
    this.http.post("http://localhost:3000/register", {
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe(
      (resp: any) => {
        console.log("RESPUESTA:", resp);

        localStorage.setItem("userId", resp.id);


        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
        alert("Error al registrar usuario");
      }
    );
  }
}
