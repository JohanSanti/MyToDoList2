import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: false,
})
export class LoginPage {

  email = "";
  password = "";

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post('http://localhost:3000/login', {
      email: this.email,
      password: this.password
    }).subscribe((resp: any) => {

      localStorage.setItem("token", resp.token);
      localStorage.setItem("userId", resp.user.id); // MUY IMPORTANTE

      const userId = localStorage.getItem("userId");
      console.log('userrrrrrrrrrrrrrrrr  '+ userId)

      this.router.navigate(['/tasks']);
    }, err => {
      console.error(err);
      alert("Credenciales incorrectas");
    });
  }
}
