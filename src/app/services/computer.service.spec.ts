import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { ComputerService } from './computer.service';
import { Observable } from 'rxjs';
import { Computer } from '../model/computer.model';

describe('ComputerService', () => {
  let service: ComputerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ComputerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should http get ok computers', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.getComputers();

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
          expect(val.length).toBe(1);
          const first = val[0];
          expect(first.id).toBe(1);
          expect(first.brand).toBe('HP');
          expect(first.model).toBe('Pavilion');
        },
      });

      const request = httpMock.expectOne('http://localhost:3000/computers');
      expect(request.request.method).toBe('GET');

      request.flush([
        {
          id: 1,
          brand: 'HP',
          model: 'Pavilion',
        },
      ]);
    }
  ));

  it('should http get error computers', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.getComputers();

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('computers not find');
        },
      });

      const request = httpMock.expectOne('http://localhost:3000/computers');
      expect(request.request.method).toBe('GET');

      request.error(new ErrorEvent('computers not find'));
    }
  ));

  it('should http post computer save', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp = {
        brand: 'HP',
        model: 'Pavilion',
      } as Computer;
      const obs = service.saveComputer(comp);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
        },
      });

      const request = httpMock.expectOne('http://localhost:3000/computers');
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(comp);

      request.flush({});
    }
  ));

  it('should http post computer save witch error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp = {
        brand: 'HP',
        model: 'Pavilion',
      } as Computer;
      const obs = service.saveComputer(comp);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('error saving computer');
        },
      });

      const request = httpMock.expectOne('http://localhost:3000/computers');
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(comp);

      request.error(new ErrorEvent('error saving computer'));
    }
  ));

  it('should http patch computer update', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp = {
        id: 1,
        brand: 'Huawei',
        model: 'RT-1234',
      } as Computer;
      const obs = service.updateComputer(comp);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
        },
      });

      const request = httpMock.expectOne('http://localhost:3000/computers/1');
      expect(request.request.method).toBe('PATCH');
      expect(request.request.body).toEqual(comp);

      request.flush({});
    }
  ));

  it('should http patch computer update with error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp = {
        id: 1,
        brand: 'Huawei',
        model: 'RT-1234',
      } as Computer;
      const obs = service.updateComputer(comp);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('Error updating computer');
        },
      });

      const request = httpMock.expectOne('http://localhost:3000/computers/1');
      expect(request.request.method).toBe('PATCH');
      expect(request.request.body).toEqual(comp);

      request.error(new ErrorEvent('Error updating computer'));
    }
  ));

  it('should http get a computer by id', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const id = 1;
      const obs = service.getComputerById(id);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
          expect(val.id).toBe(id);
          expect(val.brand).toBe('HP');
          expect(val.model).toBe('Pavilion');
        },
      });

      const request = httpMock.expectOne(
        `http://localhost:3000/computers/${id}`
      );
      expect(request.request.method).toBe('GET');

      request.flush({
        id: id,
        brand: 'HP',
        model: 'Pavilion',
      });
    }
  ));

  it('should http get a computer by id with error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const id = 1;
      const obs = service.getComputerById(id);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('computers not find');
        },
      });

      const request = httpMock.expectOne(
        `http://localhost:3000/computers/${id}`
      );
      expect(request.request.method).toBe('GET');

      request.error(new ErrorEvent('computers not find'));
    }
  ));

  it('should http delete a computer', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const id = 1;
      const obs = service.deleteComputer(id);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
        },
      });

      const request = httpMock.expectOne(
        `http://localhost:3000/computers/${id}`
      );
      expect(request.request.method).toBe('DELETE');

      request.flush({});
    }
  ));

  it('should http delete a computer with error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const id = 1;
      const obs = service.deleteComputer(id);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('computers not find to delete');
        },
      });

      const request = httpMock.expectOne(
        `http://localhost:3000/computers/${id}`
      );
      expect(request.request.method).toBe('DELETE');

      request.error(new ErrorEvent('computers not find to delete'));
    }
  ));
});
