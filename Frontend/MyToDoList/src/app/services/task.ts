import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000/tasks';
  private apiUrl2 = 'http://localhost:3000/tasksAll';

  constructor(private http: HttpClient) { }

  getTasks() {
    const userId = localStorage.getItem("userId");
    console.log('---------'+`${this.apiUrl2}/${userId}`) 

    return this.http.get<any[]>(`${this.apiUrl2}/${userId}`);
  }

  createTask(task: any) {
    return this.http.post(this.apiUrl, task);
  }

  getTask(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTask(id: number, task: any) {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

}
