import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
  standalone: false,
})
export class EditTaskPage implements OnInit {

  task: any = {};

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTask(id);
  }

  loadTask(id: number) {
    this.taskService.getTask(id).subscribe(
      data => {
        this.task = data;
      },
      error => console.error("Error cargando task", error)
    );
  }

  saveTask() {
    this.taskService.updateTask(this.task.id, this.task).subscribe(
      () => {
        this.navCtrl.navigateBack(`/task-detail/${this.task.id}`);
      },
      err => console.error("Error actualizando task", err)
    );
  }

}
