import { Injectable } from '@angular/core';

import { AuthService, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  user: SocialUser = null
  authStatusSubject$: BehaviorSubject<SocialUser>
  authStatus$: Observable<SocialUser>

  constructor(private authService: AuthService) {
    this.authStatusSubject$ = new BehaviorSubject(this.user);
    this.authStatus$ = this.authStatusSubject$.asObservable()

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.authStatusSubject$.next(this.user);
    })
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
