const SkillType = require('../models/skillType');

const skillsList = [
  {
     fullName: 'JavaScript',
     name: 'javascript'
  },
  {
     fullName: 'TypeScript',
     name: 'typescript'
  },
  {
     fullName: 'Noje.js',
     name: 'nodejs'
  },
  {
     fullName: 'React',
     name: 'react'
  },
  {
     fullName: 'Angular',
     name: 'angular'
  },
  {
     fullName: 'Vue',
     name: 'vue'
  },
  {
     fullName: 'Redux',
     name: 'redux'
  },
  {
     fullName: 'ReactNative',
     name: 'reactnative'
  },
  {
     fullName: 'Ionic',
     name: 'ionic'
  },
  {
     fullName: 'Webpack',
     name: 'webpack'
  },
  {
     fullName: 'Parcel',
     name: 'parcel'
  },
  {
     fullName: 'Gulp',
     name: 'gulp'
  },
  {
     fullName: 'CSS',
     name: 'css'
  },
  {
     fullName: 'Bootstrap',
     name: 'bootstrap'
  },
  {
     fullName: 'Git',
     name: 'git'
  },
  {
     fullName: 'Jest',
     name: 'jest'
  },
  {
     fullName: 'Moca',
     name: 'moca'
  },
  {
     fullName: 'Jasmine',
     name: 'jasmine'
  }
];

const reset = () => {
  SkillType.remove({})
    .then(() => {
      SkillType.insertMany(skillsList);
    })
}

const initialize = () => {
  SkillType.find({})
    .then(skills => {
      if(!skills || skills.length == 0) {
        SkillType.insertMany(skillsList);
      }
    });
}

module.exports =  { initialize, reset };
