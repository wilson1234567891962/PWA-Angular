import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(public angularFireDatabase: AngularFireDatabase) {
  }

  note = [];

  public getNotes() {
    return this.angularFireDatabase.list('/notes/');
  }

  public getNote(id) {
    return this.angularFireDatabase.object('/notes/' + id);
  }

  public createNote(note) {
    return this.angularFireDatabase.database.ref('/notes/' + note.id).set(note);
  }

  public editNote(note) {
    return this.angularFireDatabase.database.ref('/notes/' + note.id).set(note);
  }

  public deleteNote(note) {
    console.log(note.id);
    return this.angularFireDatabase.database.ref('/notes/' + note.id).remove();
  }
}
