import { NgModule } from '@angular/core';
import { RemoteDevToolsProxy } from './remote-devtools-proxy';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Media } from '@ionic-native/media/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { StoreModule } from '@ngrx/store';
import { ngrxReducer } from './store/ngrx/ngrx.reducer';
import { messagesReducer } from './store/messages/messages.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

// if (!window['devToolsExtension'] && !window['__REDUX_DEVTOOLS_EXTENSION__']) {
//   let remoteDevToolsProxy = new RemoteDevToolsProxy({
//     connectTimeout: 300000, // extend for pauses during debugging
//     ackTimeout: 120000, // extend for pauses during debugging
//     secure: false // dev only
//   });

//   window['devToolsExtension'] = remoteDevToolsProxy;
//   window['__REDUX_DEVTOOLS_EXTENSION__'] = remoteDevToolsProxy;
// }

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            HttpClientModule,
            StoreModule.forRoot({ ngrxs: ngrxReducer, messages: messagesReducer }),
            StoreDevtoolsModule.instrument({
              maxAge: 25, // Retains last 25 states
              logOnly: environment.production, // Restrict extension to log-only mode
              autoPause: true, 
            }),
            
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, File, Media, AndroidPermissions, HTTP, SplashScreen, StatusBar, Deeplinks, SpeechRecognition, MediaCapture, ImagePicker
             , StreamingMedia],
  bootstrap: [AppComponent],
})
export class AppModule {}