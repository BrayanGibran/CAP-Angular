import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComputerComponent } from './new-computer.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ComputerService } from '../../services/computer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Computer } from 'src/app/model/computer.model';

describe('NewComputerComponent', () => {
  let component: NewComputerComponent;
  let fixture: ComponentFixture<NewComputerComponent>;

  let computerSvcSpy = jasmine.createSpyObj<ComputerService>(
    'ComputerService',
    ['saveComputer']
  );

  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewComputerComponent],
      imports: [
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ComputerService, useValue: computerSvcSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save computer', () => {
    const mockResponse = {
      brand: 'HP',
      model: 'Pavilion',
    } as Computer;
    computerSvcSpy.saveComputer.and.returnValue(of(mockResponse));
    component.formComputer?.patchValue({
      brand: 'HP',
      model: 'Pavilion',
    });
    component.saveComputer();
    expect(computerSvcSpy.saveComputer).toHaveBeenCalledWith(mockResponse);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/computers']);
  });

  it('should save computer with error', () => {
    computerSvcSpy.saveComputer.and.returnValue(
      throwError(() => 'computer not found')
    );
    spyOn(window, 'alert');
    component.saveComputer();
    expect(window.alert).toHaveBeenCalledWith('Lo sentimos, ocurrió un error');
  });
});
