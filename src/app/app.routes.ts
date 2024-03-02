import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { GraphComponent } from './components/graph/graph.component';

export const routes: Routes = [
    {
      path: 'register',
      component: RegisterComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },

    {
      path: 'tasks',
      component: TasksComponent,
    },
    {
      path: 'overview',
      component: GraphComponent,
    },
  ];