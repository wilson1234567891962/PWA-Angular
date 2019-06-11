import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {NotesService} from './services/notes.service';
import {AuthService} from './services/auth.service';
import {MessagingService} from "./services/messaging.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  note: any = {};
  notes: any = [];
  message: any = null;

  constructor(
    private authService: AuthService,
    private swUpdate: SwUpdate, public snackBar: MatSnackBar, public notesService: NotesService,
    private  pessagingService: MessagingService, private msgService: MessagingService) {
    this.notesService.getNotes().valueChanges()
      .subscribe((response) => {
        console.log(response);
        this.notes = response;
      });
  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((v) => {
        if (confirm('Actualización disponible, deseas obtenerla?')) {
          window.location.reload();
        }
      });
    }
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch((err) => {
      console.log('Service worker registration failed, error:', err);
    });
  }

  saveNote(): void {
    if (!this.note.id) {
      this.note.id = Date.now();
    }
    this.notesService.createNote(this.note).then(() => {
      this.note = {};
      this.openSnackBar('Nota Guardada con éxito', null);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  selectNote(note): void {
    this.note = JSON.parse(JSON.stringify(note));
  }

  eliminarNota(nota) {
    const rsp = confirm('Confirme la eliminación de ' + nota.title);
    if (rsp) {
      this.notesService.deleteNote(nota)
        .then(() => {
          this.limpiarNota();
          this.snackBar.open('Nota eliminada.', null, {
            duration: 2000
          });
        });
    }
  }

  limpiarNota() {
    this.note = {};
  }

  login() {
    this.authService.loginWithFacebook();
  }
}
