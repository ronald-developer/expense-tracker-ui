import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_API_URL_CFG, TOKEN_STORAGE_CFG } from './core/injection-tokens/injection-token-configurations';
import { TokenModel } from './core/services/api/account/models/token-model';
import { AuthInterceptor } from './core/services/interceptors/auth.interceptor';
import { provideServiceWorker } from '@angular/service-worker';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		provideServiceWorker('ngsw-worker.js', {
			enabled: environment.production,
			registrationStrategy: 'registerImmediately'
		}),
		provideHttpClient(withInterceptorsFromDi()),
		{
			provide: APP_API_URL_CFG, useValue: {
				composeUrl: (urlPath: string) => `${environment.apiUrl}/api/${urlPath}`
			}
		},
		{
			provide: TOKEN_STORAGE_CFG, useValue: {
				retrieve: async () => {
					const store = await Preferences.get({ key: 'tokenValue' });
					if (store.value) {
						const value: TokenModel = JSON.parse(store.value);
						return value
					}
					return null;
				},
				store: async (tokenValue: TokenModel) => {
					await Preferences.set({
						key: 'tokenValue',
						value: JSON.stringify(tokenValue)
					});
				}
			}
		}
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
