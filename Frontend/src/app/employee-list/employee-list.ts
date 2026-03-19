import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList {

  employees: any[] = [];

  // ✅ Removed ID (DB will handle it)
  newEmployee: any = {
    name: '',
    role: '',
    salary: 0
  };

  isEditing = false;

apiUrl = 'http://localhost:5069/api/employee';
  constructor(private http: HttpClient) {
    this.getEmployees();
  }

  // ✅ GET
  getEmployees() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.employees = data;
    });
  }

  // ✅ ADD
  addEmployee() {
    const emp = {
      name: this.newEmployee.name,
      role: this.newEmployee.role,
      salary: Number(this.newEmployee.salary)
    };

    this.http.post(this.apiUrl, emp).subscribe(() => {
      this.getEmployees();
      this.newEmployee = { name: '', role: '', salary: '' };
      this.isEditing = false;
    });
  }

  // ✅ DELETE
  deleteEmployee(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.getEmployees();
    });
  }

  // ✅ EDIT
  editEmployee(emp: any) {
    this.newEmployee = {
      id: emp.id,
      name: emp.name,
      role: emp.role,
      salary: emp.salary
    }; // includes id
    this.isEditing = true;
  }

  // ✅ UPDATE
  updateEmployee() {
    this.http.put(`${this.apiUrl}/${this.newEmployee.id}`, this.newEmployee)
      .subscribe(() => {
        this.getEmployees();
        this.isEditing = false;
        this.newEmployee = { name: '', role: '', salary: '' };
      });
  }
}