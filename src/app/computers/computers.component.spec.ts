import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComputerService } from '../services/computer.service';

import { ComputersComponent } from './computers.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Computer } from '../model/computer.model';

describe('ComputersComponent', () => {
  let component: ComputersComponent;
  let fixture: ComponentFixture<ComputersComponent>;

  let computerSvcSpy = jasmine.createSpyObj<ComputerService>(
    'ComputerService',
    ['getComputers', 'deleteComputer']
  );

  computerSvcSpy.getComputers.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComputersComponent],
      imports: [
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        RouterTestingModule,
      ],
      providers: [{ provide: ComputerService, useValue: computerSvcSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ComputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    const mockResponse: Computer[] = [
      {
        id: 1,
        brand: 'HP',
        model: 'Pavilion',
      },
    ];
    computerSvcSpy.getComputers.and.returnValue(of(mockResponse));
    component.loadData();
    expect(component.computers.data).toEqual(mockResponse);
  });

  it('should load data with error', () => {
    computerSvcSpy.getComputers.and.returnValue(
      throwError(() => 'Lo sentimos, ocurrió un error')
    );
    spyOn(window, 'alert');
    component.loadData();
    expect(window.alert).toHaveBeenCalledWith('Lo sentimos, ocurrió un error');
  });

  it('should call deleteComputer', () => {
    const mockResponse: Computer = {
      id: 1,
      brand: 'Dell',
      model: 'Inspiron',
    };
    computerSvcSpy.deleteComputer.and.returnValue(of(mockResponse));

    component.deleteComputer(mockResponse);

    expect(computerSvcSpy.deleteComputer).toHaveBeenCalledWith(mockResponse.id);
  });

  it('should call deleteComputer with error', () => {
    const mockResponse: Computer = {
      id: 1,
      brand: 'Dell',
      model: 'Inspiron',
    };
    computerSvcSpy.deleteComputer.and.returnValue(
      throwError(() => 'An error occurred')
    );
    spyOn(window, 'alert');

    component.deleteComputer(mockResponse);

    expect(computerSvcSpy.deleteComputer).toHaveBeenCalledWith(mockResponse.id);
    expect(window.alert).toHaveBeenCalledWith('Lo sentimos, ocurrió un error');
  });
});
