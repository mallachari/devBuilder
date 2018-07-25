import axios from 'axios';

import * as actionTypes from './actionTypes';
// import {
//   skillsList
// } from '../../tmp/Data';

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

export const resetSkills = () => {
  return {
    type: actionTypes.RESET_SKILLS
  }
}

const setSkills = (skills) => {
  return {
    type: actionTypes.SET_SKILLS,
    skillsList: skills
  }
};

/** Fetches data from backend */
export const initSkills = () => {
  return dispatch => {
    axios.get('http://localhost:3000/skill')
      .then(response => {
        const skillsList = response.data.reduce((obj, skill) => {
          obj[skill.name] = {
            name: skill.name,
            fullName: skill.fullName
          }
          return obj;
        }, {});
        dispatch(setSkills(skillsList));
      })
      .catch(error => {
        console.log('error during fetching skills', error);
      })
  }
};

export const setCurrentSkill = (name) => {
  return {
    type: actionTypes.SET_CURRENT,
    name: name
  }
}