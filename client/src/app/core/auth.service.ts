import { JwtService } from './jwt.service';
import { RequesterService } from './reqester.service';
import { UserModel } from './../models/userModel';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service';


@Injectable()
export class AuthService {
  private readonly isLoggedInSubject$ = new BehaviorSubject<boolean>(
    this.hasToken()
  );

  private readonly isAdminInSubject$ = new BehaviorSubject<boolean>(
    this.isAdmin()
  );

  public constructor(
    private readonly storageService: StorageService,
    private readonly requester: RequesterService,
    private readonly jwt: JwtService
  ) {}


  public get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject$.asObservable();
  }

  public get isAdmin$(): Observable<boolean> {
    return this.isAdminInSubject$.asObservable();
  }

  public registerUser(user: UserModel): Observable<any> {
    if ( this.hasToken() ) {
      return this.requester.post(
        'http://localhost:3000/users',
        JSON.stringify(user)
      );
    } else {
      return this.requester.post(
        'http://localhost:3000/register',
        JSON.stringify(user)
      );
    }
  }

  public loginUser(user: UserModel): Observable<any> {
    return this.requester
      .post('http://localhost:3000/login', JSON.stringify(user))
      .pipe(
        tap(response => {
          this.storageService.setItem('token', (<any>response));
          this.isLoggedInSubject$.next(true);
          this.isAdmin ? this.isAdminInSubject$.next(true) : this.isAdminInSubject$.next(false);
        })
      );
  }

  public logoutUser() {
    this.storageService.removeItem('token');
    return this.setLoggedOutStatus();
  }

  private setLoggedOutStatus () {
    this.isLoggedInSubject$.next(false);
    this.isAdminInSubject$.next(false);
  }
  public getUsername(): string {
    const token = this.decodeToken();
    return token.email;
  }

  public isAdmin(): boolean {
 if (this.isLoggedInSubject$.value === true ) {
        const token = this.decodeToken();
        return token.isAdmin;
      }
      return false;
  }
  private hasToken(): boolean {
    return !!this.storageService.getItem('token');
  }

  private decodeToken() {
    return this.hasToken ? this.jwt.decodeToken(this.storageService.getItem('token'))
    : null;
  }
}
