import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Computer } from 'src/app/model/computer.model';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.css'],
})
export class EditComputerComponent {
  computerId: number = 0;
  formComputer?: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private computerSvc: ComputerService,
    private router: Router
  ) {
    this.formComputer = this.fb.group({
      brand: ['', [Validators.required, Validators.minLength(1)]],
      model: ['', Validators.required],
    });

    this.route.params.subscribe({
      next: (params) => {
        this.computerId = params['id'];
        this.loadData();
      },
    });
  }
  loadData() {
    this.computerSvc.getComputerById(this.computerId).subscribe({
      next: (data) => {
        this.formComputer?.patchValue(data);
      },
      error: () => {
        alert('Lo sentimos, ocurrio un error');
      },
    });
  }

  updateComputer() {
    let data = this.formComputer?.value as Computer;
    data.id = this.computerId;
    this.computerSvc.updateComputer(data).subscribe({
      next: () => {
        this.router.navigate(['/computers']);
      },
      error: () => alert('Lo sentimos, hubo un error'),
    });
  }
}
