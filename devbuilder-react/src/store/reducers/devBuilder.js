import * as actionTypes from '../actions/actionTypes';

const initialState = {
   skills: null,
   skillsList: null,
   current: 'javascript'
};

const reducer = (state = initialState, action) => {
   switch(action.type) {
      case actionTypes.ADD_SKILL:
         return {
            ...state,
            skills: {
               ...state.skills,
               [action.payload.name]: action.payload
            }
         }
      case actionTypes.REMOVE_SKILL:
         const skills = { ...state.skills };
         delete skills[action.name];
         return {
            ...state,
            skills: {
               ...skills
            }
         }
      case actionTypes.RESET_SKILLS:
         return {
           ...state,
           skills: null
         }
      case actionTypes.SET_SKILLS:
         return {
            ...state,
            skillsList: {
               ...state.skillsList,
               ...action.skillsList
            }
         }
      case actionTypes.SET_CURRENT:
         return {
            ...state,
            current: action.name
         }
      default: return state;
   } 
};

export default reducer;