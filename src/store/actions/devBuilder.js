import * as actionTypes from './actionTypes';
import { skillsList } from '../../tmp/Data';

export const addSkill = (name, value, description) => {
   return {
      type: actionTypes.ADD_SKILL,
      payload: {
         name: name,
         value: value,
         description: description
      }
   }
};

export const removeSkill = (name) => {
   return {
      type: actionTypes.REMOVE_SKILL,
      name: name
   }
};

const setSkills = (skills) => {
   return {
      type: actionTypes.SET_SKILLS,
      skillsList: skills
   }
};

/** Will fetch data from db in the future */
export const initSkills = () => {
   return dispatch => {
      dispatch(setSkills(skillsList));
   }
};

export const setCurrentSkill = (name) => {
   return {
      type: actionTypes.SET_CURRENT,
      name: name
   }
}