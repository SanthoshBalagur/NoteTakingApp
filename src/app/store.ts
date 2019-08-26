import { INote } from './note';
import { ADD_NOTE, REMOVE_NOTE,SEARCH_NOTE } from './actions';

export interface IAppState {
    notes: INote[];
    lastUpdate: Date;
}

export const INITIAL_STATE: IAppState = {
   notes: [],
   lastUpdate: null
}

export function rootReducer(state:IAppState,action):IAppState {

    switch (action.type) {
        case ADD_NOTE:
            debugger
            
         action.notes.id = state.notes.length + 1;
         return Object.assign({}, state, {
            notes: state.notes.concat(Object.assign({}, action.notes)),

            lastUpdate: new Date()  

          });
          case REMOVE_NOTE: 
          return Object.assign({}, state, {
            notes: state.notes.filter(t => t.id !== action.id),
           
            lastUpdate: new Date()
          });
          case SEARCH_NOTE:
        
              if(action.payload.text === "") {
                 var getState = JSON.parse(localStorage.getItem("state"));
                console.log("test", getState);
                return Object.assign({}, state);
            } 
            else{
              return Object.assign({}, state, 
                {
                
                notes: state.notes.filter(t => t.description.toLowerCase().includes(action.payload.text.toLowerCase()) ||
                t.title.toLowerCase().includes(action.payload.text.toLowerCase())),
                lastUpdate: new Date()
            });
          } 

        }
        

  return state;

}