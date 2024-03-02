import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FilterEnum } from '../../models/filter.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  taskService = inject(TaskService);
  filterSig = this.taskService.filterSig;
  filterEnum = FilterEnum;
  activeCount = computed(() => {
    return this.taskService.taskSig().filter((task) => !task.isCompleted)
      .length;
  });
  noTaskClass = computed(() => this.taskService.taskSig().length === 0);
  itemsLeftContent = computed(
    () => `task${this.activeCount() !== 1 ? 's' : ''} left`
  );

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.taskService.changeFilter(filterName);
    console.log('after changeFilter', this.taskService.filterSig());
  }
}
