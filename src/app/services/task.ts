import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task.model';
import { environment } from '../../environments/environment';
import { Auth } from './auth'; 

@Injectable({
  providedIn: 'root',
})


export class Task {
  private apiUrl = `${environment.apiUrl}/Tasks`;

  constructor(private http: HttpClient, private auth: Auth) { }

  getTasks(): Observable<TaskModel[]> {
  const headers = this.auth.getAuthHeaders(); // now has correct username:password
  return this.http.get<TaskModel[]>(this.apiUrl, { headers });
}

  getTask(id: number): Observable<TaskModel> {
    return this.http.get<TaskModel>(`${this.apiUrl}/${id}`, { headers: this.auth.getAuthHeaders() });
  }

  addTask(task: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(this.apiUrl, task, { headers: this.auth.getAuthHeaders() });
  }

  updateTask(id: number, task: TaskModel): Observable<TaskModel> {
    return this.http.put<TaskModel>(`${this.apiUrl}/${id}`, task, { headers: this.auth.getAuthHeaders() });
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.auth.getAuthHeaders() });
  }
}