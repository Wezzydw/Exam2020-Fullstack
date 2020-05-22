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

