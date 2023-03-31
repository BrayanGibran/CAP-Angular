import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from '../services/util.service';
import { LoginService } from '../services/login.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginResponse } from '../model/login.model';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let utilSvcSpy = jasmine.createSpyObj<UtilService>('UtilService', [
    'saveToken',
  ]);

  let loginSvcSpy = jasmine.createSpyObj<LoginService>('LoginService', [
    'login',
  ]);

  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            redirectTo: '',
          },
        ]),
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: LoginService, useValue: loginSvcSpy },
        { provide: UtilService, useValue: utilSvcSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.formLogin).toBeTruthy();
  });

  it('should do login', () => {
    const mockResponse = {
      token: 'token1234',
    } as LoginResponse;
    loginSvcSpy.login.and.returnValue(of(mockResponse));

    component.formLogin?.patchValue({
      email: 'correo@ejemplo.com',
      password: '1234',
    });
    component.LoginClick();
    expect(utilSvcSpy.saveToken).toHaveBeenCalledWith('token1234');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should do login with error', () => {
    loginSvcSpy.login.and.returnValue(throwError(() => 'user not found'));
    component.LoginClick();
    expect(component.isLoading).toBeFalse();
  });
});
