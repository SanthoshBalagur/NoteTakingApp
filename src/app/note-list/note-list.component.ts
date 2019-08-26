import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { REMOVE_NOTE } from '../actions';
import { INote } from '../note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  @select() notes;
  @select() lastUpdate;

  stateForLocalStorage: Array<any> = [];
  Noteid :Array<any> =[];
  
  public showdetails: boolean = false;
  model: INote = {
    id: 0,
    title:" ", 
    description: ""
  };
  selectednote: INote;
  constructor(private ngRedux: NgRedux<IAppState>) { }
  
  ngOnInit() { 
    window.onresize = () => this.showdetails = window.innerWidth <= 768;
}


// updates different sections according to actions performed on other sections

onSelect(note:INote ): void {
    this.selectednote = note
    console.log(this.selectednote);
  }

 
// Delete functionality
  removeNote(note) {
    this.ngRedux.dispatch({type: REMOVE_NOTE, id: note.id});
    if (this.selectednote === note) {
      this.selectednote= null;
    }
  }

  // toggle the hamburger for mobile view

  toggle() {
    this.showdetails = !this.showdetails;

}


}
