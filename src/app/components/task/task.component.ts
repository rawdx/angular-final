import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { TaskInterface } from '../../models/task.interface';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskFirebaseService } from '../../services/task.firebase.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit, OnChanges {
  @Input({ required: true }) task!: TaskInterface;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();

  @ViewChild('textInput') textInput?: ElementRef;
  
  taskService = inject(TaskService);
  taskFirebaseService = inject(TaskFirebaseService);
  editingContent: string = '';

  ngOnInit(): void {
    this.editingContent = this.task.content;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      }, 0);
    }
  }

  changeContent(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.editingContent = value;
  }

  changeTask(): void {
    const dataToUpdate = {
      content: this.editingContent,
      isCompleted: this.task.isCompleted,
    };

    this.taskFirebaseService
      .updateTask(this.task.id, dataToUpdate)
      .subscribe(() => {
        this.taskService.changeTask(this.task.id, this.editingContent);
      });

    this.setEditingId.emit(null);
  }

  setTaskInEditMode(): void {
    this.setEditingId.emit(this.task.id);
  }

  removeTask(): void {
    this.taskFirebaseService.removeTask(this.task.id).subscribe(() => {
      this.taskService.removeTask(this.task.id);
    });
  }

  toggleTask(): void {
    const dataToUpdate = {
      content: this.task.content,
      isCompleted: !this.task.isCompleted,
    };
    this.taskFirebaseService
      .updateTask(this.task.id, dataToUpdate)
      .subscribe(() => {
        this.taskService.toggleTask(this.task.id);
      });
  }
}