import { TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { UtilService } from './services/util.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'login',
  template: '<span> Login </span>',
})
class MockLoginComponent {}

describe('AppComponent', () => {
  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
  let utilSvcSpy = jasmine.createSpyObj<UtilService>('UtilService', [
    'getToken',
    'deleteToken',
    'isLogged',
  ]);
  utilSvcSpy.isLogged = new Subject<boolean>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            redirectTo: '',
          },
        ]),
        MatToolbarModule,
      ],
      declarations: [AppComponent],
      providers: [
        { provide: UtilService, useValue: utilSvcSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-2023'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-2023');
  });

  it(`should create app with user logged in`, () => {
    utilSvcSpy.getToken.and.returnValue('token');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLogged).toBeTrue();
  });

  it(`should create app with user is not logged in`, () => {
    utilSvcSpy.getToken.and.returnValue(null);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLogged).toBeFalse();
  });

  it(`should receive isLogged from utilSvc true`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    utilSvcSpy.isLogged.next(true);
    expect(app.isLogged).toBeTrue();
  });

  it(`should receive isLogged from utilSvc false`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    utilSvcSpy.isLogged.next(false);
    expect(app.isLogged).toBeFalse();
  });

  it(`should logout`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.logout();
    expect(utilSvcSpy.deleteToken).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  });
});
