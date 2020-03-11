import { Component, OnInit } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { SocialUser } from "angularx-social-login";
import { AuthorizationService } from "../shared/services/authorization.service";
import { Subscription } from "rxjs";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {
  user: SocialUser;
  userSub$: Subscription;
  events;
  baseUrl = "https://www.googleapis.com/calendar/v3/calendars/";

  constructor(
    private authService: AuthorizationService,
    private http: HttpClient
  ) {
    this.userSub$ = this.authService.authStatus$.subscribe(user => {
      this.user = user;
      console.log(this.user?.email);
    });
  }

  ngOnInit(): void {}

  getCalendar() {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.user.authToken
    });
    this.http
      .get<any>(
        `${this.baseUrl}${this.converEmail(this.user.email)}/events?key=${
          environment.ApiKey
        }`,
        { headers }
      )
      .subscribe(res => {
        this.events = res.items;
      });
  }

  converEmail(email) {
    return email.replace(/@/, "%40");
  }

  ngOnDestroy() {
    if (this.userSub$) {
      this.userSub$.unsubscribe();
    }
  }
}
