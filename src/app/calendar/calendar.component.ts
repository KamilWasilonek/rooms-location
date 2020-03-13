import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { SocialUser } from 'angularx-social-login';
import { AuthorizationService } from '../shared/services/authorization.service';
import { Subscription, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { rooms } from './rooms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  user: SocialUser;
  userSub$: Subscription;
  rooms = [];
  baseUrl = 'https://www.googleapis.com/calendar/v3/calendars/';

  constructor(private authService: AuthorizationService, private http: HttpClient) {
    this.userSub$ = this.authService.authStatus$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {}

  getCalendar() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.user.authToken,
    });

    let params = new HttpParams();
    params = params.append('key', environment.ApiKey);
    params = params.append('maxResults', '20');
    params = params.append('sanitizeHtml', 'true');
    // params = params.append("timeMin", "2020-03-13T12:00:00.000Z");
    // params = params.append("timeMax", "2020-03-13T15:00:00.000Z");
    // params = params.append("orderBy", "startTime");
    // params = params.append("singleEvents", "true");

    const requests = [];
    Object.keys(rooms).forEach(key => {
      const req = this.http.get(`${this.baseUrl}${rooms[key]}/events`, {
        headers,
        params,
      });
      requests.push(req);
    });

    forkJoin(requests).subscribe(result => {
      this.rooms = result;
    });
  }

  converEmail(email) {
    return email.replace(/@/, '%40');
  }

  ngOnDestroy() {
    if (this.userSub$) {
      this.userSub$.unsubscribe();
    }
  }
}
