// At the top of test/index.test.js
import * as admin from 'firebase-admin';

const test = require('firebase-functions-test')({
  databaseURL: 'https://certificate-project-fbc50.firebaseio.com/',
  storageBucket: 'certificate-project-fbc50.appspot.com',
  projectId: 'certificate-project-fbc50',
}, 'functions/certificate-functions-test.json');

const myFunctions = require('../src/index.js'); // relative path to functions code
const wrapped = test.wrap(myFunctions.profileImageAdded);
let data = require('C:/Users/mpoul/Pictures/launcher.jpg');
let data1 = require('C:/Users/mpoul/Pictures/profile.jpg');

const beforeSnap = test.firestore.makeDocumentSnapshot(data, 'images/SluEwNNVe6gjGmZD1Z3STvLelOa2/profilePicture');
const afterSnap = test.firestore.makeDocumentSnapshot(data1, 'images/SluEwNNVe6gjGmZD1Z3STvLelOa2/profilePicture');
const change = test.makeChange(beforeSnap, afterSnap);
return wrapped(change).then(() => {
return admin.database().ref('images/SluEwNNVe6gjGmZD1Z3STvLelOa2/profilePicture').once('value').then((createdSnap) => {
  assert.equal(createdSnap.val(), data1);
  });
});

