import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Computer } from '../model/computer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComputerService {
  constructor(private http: HttpClient) {}

  getComputers(): Observable<Computer[]> {
    return this.http.get<Computer[]>('http://localhost:3000/computers');
  }

  saveComputer(data: Computer) {
    return this.http.post('http://localhost:3000/computers', data);
  }

  deleteComputer(id: number) {
    return this.http.delete('http://localhost:3000/computers/' + id);
  }

  updateComputer(data: Computer) {
    return this.http.patch(`http://localhost:3000/computers/${data.id}`, data);
  }

  getComputerById(id: number): Observable<Computer> {
    return this.http.get<Computer>('http://localhost:3000/computers/' + id);
  }
}
