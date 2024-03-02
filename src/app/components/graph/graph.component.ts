import { Component, OnChanges, OnInit, SimpleChanges, computed, inject } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { TaskFirebaseService } from '../../services/task.firebase.service';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent implements OnInit, OnChanges {
  taskService = inject(TaskService);
  authService = inject(AuthService);
  taskFirebaseService = inject(TaskFirebaseService);
  
  allCount: number = 0;
  activeCount: number = 0;
  completedCount: number = 0;

  data: ChartData<'bar'> = {
    labels: ['All', 'Active', 'Completed'],
    datasets: [
      {
        data: [null, null, null], // Placeholder data
        backgroundColor: ['#f5f5f5', '#3f51b5', '#ff6384'], // Background colors
        hoverBackgroundColor: ['#e2e2e2', '#2f409e', '#e34762'], // Hover background 
        borderColor: ['#000000'], // Darker border colors for contrast
        borderWidth: 0.2,
      },
    ],
  };

  ngOnInit(): void {
    this.taskFirebaseService.getTasks().subscribe((tasks) => {
      this.allCount = tasks.length;
      this.activeCount = tasks.filter((task) => !task.isCompleted).length;
      this.completedCount = tasks.filter((task) => task.isCompleted).length;
      console.log('Active count:', this.activeCount);
      this.updateChartData();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeCount']) {
      this.updateChartData();
    }
  }

  updateChartData(): void {
    this.data = {
      ...this.data,
      datasets: [
        {
          ...this.data.datasets[0],
          data: [this.allCount, this.activeCount, this.completedCount],
        },
      ],
    };
  }
}