import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './model/task';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:9003/';
 
  public getTask(): Observable<Task[]> {   
    return this.http.get<Task[]>(this.url + 'get-tareas');
  }

  public putTask(body: Task): Observable<Task>{
    return this.http.put<Task>(this.url + 'put-tareas', body);
  }

  public postTask(body: Task): Observable<Task>{
    return this.http.post<Task>(this.url + 'post-tareas', body);
  }
}
