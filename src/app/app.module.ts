import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Media } from '@awesome-cordova-plugins/media/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';
import { MediaCapture } from '@awesome-cordova-plugins/media-capture/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { environment } from '@/environments/environment';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

//store
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { userInfoReducer } from '@/app/store/userinfo/userInfo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '@/app/store/userinfo/userInfo.effects';

//interceptors
import { httpInterceptorProviders } from '@/app/http-interceptors';

//auto size
import { AutosizeModule } from 'ngx-autosize';

//ngrx-store-localstorage
const reducers = {
  userInfo: userInfoReducer,
};
function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['userInfo', 'count'], rehydrate: true })(
    reducer
  );
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

//fontawesome
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Angular
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true,
    }),
    EffectsModule.forRoot([UserEffects]),
    FontAwesomeModule,
    AutosizeModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File,
    Media,
    AndroidPermissions,
    HTTP,
    SplashScreen,
    StatusBar,
    Deeplinks,
    SpeechRecognition,
    MediaCapture,
    ImagePicker,
    StreamingMedia,
    httpInterceptorProviders,
    Deploy,
    FCM,
    LocalNotifications,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab, far);
  }
}
