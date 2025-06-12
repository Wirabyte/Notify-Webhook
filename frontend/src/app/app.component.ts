import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { LayoutModule } from './layout/layout.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ButtonModule, LayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Webhook Notification Manager';
}
