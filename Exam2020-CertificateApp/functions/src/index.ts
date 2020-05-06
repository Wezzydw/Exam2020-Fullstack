import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const buubu = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.profileImageAdded = functions.storage.object().onFinalize((object) => {
  return new Promise((resolve, reject) => {
    if (object && object.metadata && object.name) {
      if (object.name.includes('profilePic')){
        const nameForDoc = object.name.split('/')[2];
        const userId = object.name.split('/')[1];
        admin.firestore().collection('users')
          .doc(userId).update('mImage', nameForDoc).then(value => resolve(value)).catch(err => reject(err));
        resolve('happy');
      } else {
        //do nothing
        console.log('nothing');
      }
    }
  })
});
