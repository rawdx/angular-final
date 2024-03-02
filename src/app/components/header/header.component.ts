import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskFirebaseService } from '../../services/task.firebase.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  taskService = inject(TaskService);
  taskFirebaseService = inject(TaskFirebaseService);
  content: string = '';

  changeContent(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.content = target.value;
  }

  addTask(): void {
    this.taskFirebaseService.addTask(this.content).subscribe((addedTaskId) => {
      this.taskService.addTask(this.content, addedTaskId);
      this.content = '';
    });
  }
}
