import { Component, OnInit } from '@angular/core';

import { SocialUser } from "angularx-social-login";

import { Subscription, Observable } from 'rxjs';

import { AuthorizationService } from '../shared/services/authorization.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  user: SocialUser;
  authSub: Subscription

  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
    this.authSub = this.authService.authStatus$.subscribe(user => {
      this.user = user
    })
  }

  signInWithGoogle(): void {
    this.authService.signInWithGoogle()
  }

  signOut(): void {
    this.authService.signOut()
  }

  ngOnDestroy() {
    if(this.authSub) {
      this.authSub.unsubscribe()
    }
  }
}
