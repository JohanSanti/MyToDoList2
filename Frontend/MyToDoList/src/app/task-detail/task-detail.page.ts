import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
  standalone: false,
})
export class TaskDetailPage implements OnInit {

  task: any = {};

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTask(id);
  }

  ionViewWillEnter() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTask(id);
  }

  loadTask(id: number) {
    this.taskService.getTask(id).subscribe(
      data => {
        this.task = data;
      },
      error => {
        console.error("Error cargando task", error);
      }
    );
  }

  async deleteTask() {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Seguro que quieres eliminar esta tarea?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.taskService.deleteTask(this.task.id).subscribe(
              () => {
                this.navCtrl.navigateBack('/tasks');
              },
              error => console.error("Error eliminando task", error)
            );
          }
        }
      ]
    });

    await alert.present();
  }

  editTask() {
    this.navCtrl.navigateForward(`/edit-task/${this.task.id}`);
  }

}
