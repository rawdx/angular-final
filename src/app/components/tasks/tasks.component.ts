import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MainComponent } from '../main/main.component';
import { TaskService } from '../../services/task.service';
import { TaskFirebaseService } from '../../services/task.firebase.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MainComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  taskService = inject(TaskService);
  taskFirebaseService = inject(TaskFirebaseService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.taskFirebaseService.getTasks().subscribe((tasks) => {
      this.taskService.taskSig.set(tasks);
    });
  }
}
