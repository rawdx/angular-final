import { Injectable, signal } from '@angular/core';
import { TaskInterface } from '../models/task.interface';
import { FilterEnum } from '../models/filter.enum';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskSig = signal<TaskInterface[]>([]);
  filterSig = signal<FilterEnum>(FilterEnum.all);

  changeFilter(filterName: FilterEnum): void {
    this.filterSig.set(filterName);
  }

  addTask(content: string, id: string): void {
    const newTask: TaskInterface = {
      content,
      isCompleted: false,
      id,
    };
    this.taskSig.update((tasks) => [...tasks, newTask]);
  }

  changeTask(id: string, content: string): void {
    this.taskSig.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, content } : task))
    );
  }

  removeTask(id: string): void {
    this.taskSig.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  toggleTask(id: string): void {
    this.taskSig.update((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }

  toggleAll(isCompleted: boolean): void {
    this.taskSig.update((tasks) =>
    tasks.map((task) => ({ ...task, isCompleted }))
    );
  }
}
