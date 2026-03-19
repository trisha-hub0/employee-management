import { Component } from '@angular/core';
import { EmployeeList } from './employee-list/employee-list';
import { provideHttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmployeeList],   // 🔥 THIS LINE IS IMPORTANT
  templateUrl: './app.html',
  styleUrl: './app.css'
  
})
export class App {
}