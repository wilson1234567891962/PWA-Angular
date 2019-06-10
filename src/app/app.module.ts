import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule, MatListModule,
  MatOptionModule, MatSelectModule, MatSnackBarModule,
  MatToolbarModule
} from "@angular/material";
import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NotesService} from "./services/notes.service";

const fireBase: any = {
  apiKey: "AIzaSyDuKeOxLD3kAIJYqHVeYDwlhvlul4y0gjM",
  authDomain: "platzi-notas-f2c57.firebaseapp.com",
  databaseURL: "https://platzi-notas-f2c57.firebaseio.com",
  projectId: "platzi-notas-f2c57",
  storageBucket: "platzi-notas-f2c57.appspot.com",
  messagingSenderId: "839043297893"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(fireBase),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    BrowserModule,
    MatOptionModule,
    MatSelectModule,
    MatListModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    BrowserAnimationsModule, MatToolbarModule, MatExpansionModule, MatFormFieldModule, MatInputModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [NotesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
