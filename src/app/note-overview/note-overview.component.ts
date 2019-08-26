import { Component, OnInit } from '@angular/core';

// import redux, store and actions
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { SEARCH_NOTE,ADD_NOTE} from '../actions';

// import for search from rxjs
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { INote } from '../note';

@Component({
  selector: 'app-note-overview',
  templateUrl: './note-overview.component.html',
  styleUrls: ['./note-overview.component.css']
})

export class NoteOverviewComponent implements OnInit {
  @select() notes;
  @select() lastUpdate;
  stateForLocalStorage: Array<any> = [];
  private searchTerms = new Subject<string>();

  model: INote = {
    id: 0,
    title:" ", 
    description:" "
  };

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit(): void {
    
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged()
    ).subscribe((text: string) => this.ngRedux.dispatch({
      type: SEARCH_NOTE,
      payload: {
          text: text
      }
    }));
    
  }
  onSubmit() {
    let data: Object = this.ngRedux.dispatch({type: ADD_NOTE, notes: this.model});
  let stored = JSON.parse(localStorage.getItem("store"));
   this.stateForLocalStorage.push(data);
      // save data to localstorage to retrieve later
 localStorage.setItem('state', JSON.stringify(this.stateForLocalStorage));
     if (stored !== null) {
      stored.push(data);
      // save data to localstorage to retrieve later
      localStorage.setItem('state', JSON.stringify(stored));
    }
       
  }

  // Push a search term into the observable stream.
  searchNote(term: string): void { 
    this.searchTerms.next(term);
  }

}
