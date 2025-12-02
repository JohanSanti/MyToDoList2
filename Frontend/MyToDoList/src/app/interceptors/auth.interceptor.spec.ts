import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpRequest,
} from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: authInterceptor,
          multi: true,
        },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe agregar el header Authorization si existe el token', () => {
    const fakeToken = '123456';

    // Simulamos que el token está en localStorage
    spyOn(localStorage, 'getItem').and.returnValue(fakeToken);

    http.get('/test').subscribe();

    const req = httpMock.expectOne('/test');

    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${fakeToken}`);

    req.flush({});
  });

  it('no debe agregar Authorization si no existe token', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    http.get('/test2').subscribe();

    const req = httpMock.expectOne('/test2');

    expect(req.request.headers.has('Authorization')).toBeFalse();

    req.flush({});
  });
});
