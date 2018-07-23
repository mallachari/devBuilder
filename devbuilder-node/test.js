const cleanObject = function (obj) {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      for(let it of obj) {
        cleanObject(it);
      }
    } else {
      if (obj._id) {
        delete obj._id;
      }
      if (obj['__v']) {
        delete obj['__v'];
      }
      for(let key in obj) {
        if(typeof obj[key] === 'object') {
          cleanObject(obj[key]);
        }
      }
    }
  }
  return obj;
}


const str = `[
  {
      "_id": "5b33767850bf43e85c99ffec",
      "user": {
          "_id": "5b1ccbc331490a25e9d227d0",
          "firstName": "Taco",
          "lastName": "Burrito",
          "email": "taco@burrito.com"
      },
      "skills": [
          {
              "_id": "5b33767850bf43e85c99ffed",
              "type": {
                  "_id": "5b323c51c3511ad770844362",
                  "name": "javascript",
                  "fullName": "JavaScript",
                  "__v": 0
              },
              "description": "Basic JS",
              "value": 7
          },
          {
              "_id": "5b33767850bf43e85c99ffee",
              "type": {
                  "_id": "5b33522ba3a4b8d8f8370f6d",
                  "name": "typescript",
                  "fullName": "TypeScript",
                  "__v": 0
              },
              "description": "Basic TS",
              "value": 6
          }
      ],
      "__v": 0
  }
]`;

const obj = JSON.parse(str);
console.log(cleanObject(obj));