import { AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.oAuthKey, {
      scope: environment.googleCalendarScopes,
    }),
  },
]);

export function provideConfig() {
  return config;
}
