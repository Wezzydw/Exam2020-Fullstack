import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {AuthUser} from "./AuthUser";
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.onUserDelete = functions.auth.user().onDelete(user => {
  admin.firestore().collection('users').doc(user.uid).delete().then().catch();
  admin.firestore().collection('certificates').where('mUserUid','==',user.uid).get().then(value => {
    value.forEach(result => {
      admin.firestore().collection('certificates').doc(result.data().mUId).delete().then().catch();
    })
  }).catch();
  const bucket = admin.storage().bucket();
  bucket.deleteFiles({prefix: 'images/'+user.uid+'/'},
    function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log(`All the Firebase Storage files in  have been deleted`);
    }
    })
});
exports.onCertificateDelete = functions.firestore.document('certificates/{uid}').onDelete((snapshot, context) => {
  return new Promise(async (resolve, reject) => {
    const deletedValue = snapshot.data();
    if (deletedValue) {
      try {
        const resultFromStorage = await admin.storage().bucket().file('images/' + deletedValue.mUserUid + '/certificates/' + deletedValue.mUId).delete().then();
        resolve(resultFromStorage);
      } catch (e) {
        reject(e);
      }
    }
  });
});
exports.onUserCreated = functions.firestore.document('users/{uid}').onCreate((snapshot, context) => {
  return new Promise( async (resolve, reject) => {
    const user = snapshot.data() as AuthUser;
    if (user) {
      user.administrator = false;
      await admin.firestore().doc('users/' + user.mUId).update('administrator', false);
      resolve(user);
    }
  });
});
