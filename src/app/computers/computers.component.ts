import { Component } from '@angular/core';
import { Computer } from '../model/computer.model';
import { ComputerService } from '../services/computer.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css'],
})
export class ComputersComponent {
  computers = new MatTableDataSource<Computer>();
  displayedColumns = ['id', 'brand', 'model', 'actions'];
  constructor(private computerSvc: ComputerService) {
    this.loadData();
  }

  loadData() {
    this.computerSvc.getComputers().subscribe({
      next: (list) => {
        this.computers.data = list;
      },
      error: (err) => {
        alert('Lo sentimos, ocurrió un error');
      },
    });
  }

  deleteComputer(item: Computer) {
    this.computerSvc.deleteComputer(item.id).subscribe({
      next: () => {
        this.loadData();
      },
      error: () => {
        alert('Lo sentimos, ocurrió un error');
      },
    });
  }
}
