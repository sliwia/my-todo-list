import * as actionTypes from './actions';

let myToDoListStr = localStorage.getItem("myToDoList");
let myToDoListStrArray;
if (myToDoListStr===null || myToDoListStr===undefined || myToDoListStr==='') {
  myToDoListStrArray=[];
  // localStorage.setItem('myToDoList', '{}');
} else {
  myToDoListStrArray = JSON.parse(myToDoListStr);
};

const initialState = {
  mainToDoList: myToDoListStrArray
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NEW_TICKET:
      const newTicket = {
        id: action.newId,
        number: action.currentNumber,
        title: action.currentTitle,
        description: action.currentDescription,
        status: action.curentStatus,
        estimation: action.currentEstimation
      };

      const newList = [...state.mainToDoList, newTicket]
      localStorage.setItem('myToDoList', JSON.stringify(newList));

      return {
        ...state,
        mainToDoList: newList
      };

    case actionTypes.EDIT_TICKET:
      const newListBeforeUpdatedElement = state.mainToDoList.filter( (element) => element.id !== action.newId);
      const newUpdatedTicketTicket = {
        id: action.newId,
        number: action.currentNumber,
        title: action.currentTitle,
        description: action.currentDescription,
        status: action.curentStatus,
        estimation: action.currentEstimation
      };
      const newListWithUpdatedTicket = [...newListBeforeUpdatedElement, newUpdatedTicketTicket]
      localStorage.setItem('myToDoList', JSON.stringify(newListWithUpdatedTicket));

      return {
        ...state,
        mainToDoList: newListWithUpdatedTicket
      };

    case actionTypes.DELETE_TICKET:
      const newListWithDeletedElement = state.mainToDoList.filter( (element) => element.id !== action.idToDelete);
      localStorage.setItem('myToDoList', JSON.stringify(newListWithDeletedElement));

      return {
        ...state,
        mainToDoList: newListWithDeletedElement
      };



    default:
      console.log("not found action.type: " + action.type)
  }
  return state;
}

export default reducer;
