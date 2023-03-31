import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';

import { EditComputerComponent } from './edit-computer.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComputerService } from 'src/app/services/computer.service';
import { ActivatedRoute } from '@angular/router';
import { NEVER, of, throwError } from 'rxjs';
import { Computer } from 'src/app/model/computer.model';
import { Router } from '@angular/router';

describe('EditComputerComponent', () => {
  let component: EditComputerComponent;
  let fixture: ComponentFixture<EditComputerComponent>;

  let computerSvcSpy = jasmine.createSpyObj<ComputerService>(
    'ComputerService',
    ['updateComputer', 'getComputerById']
  );

  let activatedRouteSpy = jasmine.createSpyObj<ActivatedRoute>(
    'ActivatedRoute',
    ['params']
  );

  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  activatedRouteSpy.params = NEVER;
  beforeEach(async () => {
    activatedRouteSpy.params = of({ id: 1 });
    await TestBed.configureTestingModule({
      declarations: [EditComputerComponent],
      imports: [
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ComputerService, useValue: computerSvcSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    const mockResponse = {
      brand: 'HP',
      model: 'Pavilion',
    } as Computer;

    computerSvcSpy.getComputerById.and.returnValue(of(mockResponse));
    component.loadData();
    expect(computerSvcSpy.getComputerById).toHaveBeenCalledWith(1);
    expect(component.formComputer?.get('brand')?.value).toEqual('HP');
    expect(component.formComputer?.get('model')?.value).toEqual('Pavilion');
  });

  it('should load data with error', () => {
    const mockResponse = {
      brand: 'HP',
      model: 'Pavilion',
    } as Computer;

    computerSvcSpy.getComputerById.and.returnValue(
      throwError(() => {
        'computer not found';
      })
    );
    spyOn(window, 'alert');
    component.loadData();
    expect(window.alert).toHaveBeenCalledWith('Lo sentimos, ocurrio un error');
  });

  it('should update data', () => {
    const mockResponse = {
      id: 1,
      brand: 'HP',
      model: 'Pavilion',
    } as Computer;
    computerSvcSpy.updateComputer.and.returnValue(of(mockResponse));
    component.formComputer?.patchValue({
      brand: 'HP',
      model: 'Pavilion',
    });
    component.updateComputer();
    expect(computerSvcSpy.updateComputer).toHaveBeenCalledWith(mockResponse);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/computers']);
  });

  it('should update data with error', () => {
    computerSvcSpy.updateComputer.and.returnValue(
      throwError(() => {
        'computer not found';
      })
    );
    spyOn(window, 'alert');
    component.updateComputer();

    expect(window.alert).toHaveBeenCalledWith('Lo sentimos, hubo un error');
  });
});
