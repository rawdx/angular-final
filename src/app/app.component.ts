import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { TasksComponent } from './components/tasks/tasks.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, LoginComponent, RegisterComponent, RouterLink, TasksComponent, NavigationComponent]
})
export class AppComponent {
  title = 'task-manager';

  http = inject(HttpClient);

  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if(user){
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig())
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
