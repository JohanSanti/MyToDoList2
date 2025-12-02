import { Component } from '@angular/core';
import { TaskService } from '../services/task';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
  standalone: false,
})
export class NewTaskPage {

  task = {
    userId: localStorage.getItem("userId"),
    title: '',
    description: '',
    isCompleted: 0,
    createdAt: new Date().toISOString()
  };

  constructor(
    private taskService: TaskService,
    private navCtrl: NavController
  ) {}

  saveTask() {
    this.taskService.createTask(this.task).subscribe(
      res => {
        console.log("Task creada", res);
        this.navCtrl.navigateBack('/tasks'); // regresar a la lista
      },
      err => {
        console.error("Error creando task", err);
      }
    );
  }
}
