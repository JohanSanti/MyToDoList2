import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: false,
})
export class TasksPage implements OnInit {

  tasks: any[] = [];

  constructor(private taskService: TaskService, private http: HttpClient) {}

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
        console.log("Tasks cargadas:", data);
      },
      (error) => {
        console.error("Error al obtener tasks", error);
      }
    );
  }

}
