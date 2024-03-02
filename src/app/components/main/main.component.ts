import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FilterEnum } from '../../models/filter.enum';
import { TaskComponent } from '../task/task.component';
import { forkJoin } from 'rxjs';
import { TaskFirebaseService } from '../../services/task.firebase.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  taskService = inject(TaskService);
  taskFirebaseService = inject(TaskFirebaseService);
  editingId: string | null = null;

  visibleTasks = computed(() => {
    const tasks = this.taskService.taskSig();
    const filter = this.taskService.filterSig();

    if (filter === FilterEnum.active) {
      return tasks.filter((task) => !task.isCompleted);
    } else if (filter === FilterEnum.completed) {
      return tasks.filter((task) => task.isCompleted);
    }
    return tasks;
  });
  
  isAllTasksSelected = computed(() =>
    this.taskService.taskSig().every((task) => task.isCompleted)
  );
  noTasksClass = computed(() => this.taskService.taskSig().length === 0);

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }

  toggleAllTasks(event: Event): void {
    const target = event.target as HTMLInputElement;
    const requests$ = this.taskService.taskSig().map((task) => {
      return this.taskFirebaseService.updateTask(task.id, {
        content: task.content,
        isCompleted: target.checked,
      });
    });
    forkJoin(requests$).subscribe(() => {
      this.taskService.toggleAll(target.checked);
    });
  }
}