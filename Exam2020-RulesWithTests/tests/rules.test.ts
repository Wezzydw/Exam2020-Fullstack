import * as firebase from '@firebase/testing';
import {
  COLLECTIONS,
  documentPath,
  generateId,
  generateMockDocument,
  generateUserId,
} from './helpers/constants';
import {afterEach, beforeEach, describe, test} from '@jest/globals';
import {
  Firestore,
  getAdminApp,
  getAppNoAuth,
  setup,
  teardown
} from './helpers/firestore-helpers';

interface Certificate {
  mName: string;
  mExpirationDate: string;
  mPhoto: string;
  mUId: string;
  mUserUid: string;
}
interface AuthUser {
  mEmail: string;
  mImageUrl: string;
  mName: string;
  mPhone: string;
  mUId: string;
  mUserName: string;
  administrator: boolean;
}

describe('certificate.create', () => {
  const COLLECTION = COLLECTIONS.CERTIFICATES;
  const DOC_ID = generateId();
  const USER_ID = generateUserId();
  const mockCert: Certificate  = { mUserUid: USER_ID, mUId: DOC_ID, mName: 'cert1', mExpirationDate: '11-22-33', mPhoto: 'https://firebasestorage.googleapis.com/v0/b/certificate-project-fbc50.appspot.com/o/images%2FSluEwNNVe6gjGmZD1Z3STvLelOa2%2Fcertificates%2FUBTMC64Y9XgnkZX5RN3Q?alt=media&token=1e606ee5-64a5-4ed7-96b1-2bd92aaf6729' };
  const mockUserAdmin: AuthUser = { mImageUrl: '', mUId: USER_ID, mEmail: '', mName: '', mUserName: '', mPhone: '', administrator: true };
  const mockUserUser: AuthUser = { mImageUrl: '', mUId: USER_ID, mEmail: '', mName: '', mUserName: '', mPhone: '', administrator: false };
  let db: Firestore;
  afterEach(() => {
    teardown();
  });

  beforeEach(async () => {
    db = await setup(USER_ID, {
      [documentPath(COLLECTIONS.USERS, USER_ID)]: generateMockDocument(),
    });

    const adminDb = getAdminApp();
    await adminDb
      .collection(COLLECTIONS.USERS)
      .doc(USER_ID)
      .set(mockUserAdmin);
  });

  test('Cannot created Certificate if you are not logged in', async () => {
    const appNoAuth = getAppNoAuth();
    const document = appNoAuth.collection(COLLECTION).doc(DOC_ID);
    await firebase.assertFails(
      document.set(mockCert)
    );
  });

  test('Can create Certificate if you are logged in, but not admin', async () => {
    const adminDb = getAdminApp();
    await adminDb
      .collection(COLLECTIONS.USERS)
      .doc(USER_ID)
      .set(mockUserUser);
    const document = db.collection(COLLECTION).doc(DOC_ID);
    await firebase.assertSucceeds(
      document.set(mockCert)
    );
  });

  test('Can create Certificate if you are an admin', async () => {
    const document = db.collection(COLLECTION).doc(DOC_ID);
    await firebase.assertSucceeds(
      document.set(mockCert)
    );
  });
});
describe('certificate.update', () => {
  const COLLECTION = COLLECTIONS.CERTIFICATES;
  const DOC_ID = generateId();
  const USER_ID = generateUserId();
  const mockCert: Certificate  = { mUserUid: USER_ID, mUId: DOC_ID, mName: 'cert1', mExpirationDate: '11-22-33', mPhoto: 'https://firebasestorage.googleapis.com/v0/b/certificate-project-fbc50.appspot.com/o/images%2FSluEwNNVe6gjGmZD1Z3STvLelOa2%2Fcertificates%2FUBTMC64Y9XgnkZX5RN3Q?alt=media&token=1e606ee5-64a5-4ed7-96b1-2bd92aaf6729' };
  const mockCert2: Certificate  = { mUserUid: 'USER_ID', mUId: DOC_ID, mName: 'cert1', mExpirationDate: '11-22-33', mPhoto: 'https://firebasestorage.googleapis.com/v0/b/certificate-project-fbc50.appspot.com/o/images%2FSluEwNNVe6gjGmZD1Z3STvLelOa2%2Fcertificates%2FUBTMC64Y9XgnkZX5RN3Q?alt=media&token=1e606ee5-64a5-4ed7-96b1-2bd92aaf6729' };
  const mockUserAdmin: AuthUser = { mImageUrl: '', mUId: USER_ID, mEmail: '', mName: '', mUserName: '', mPhone: '', administrator: true };
  const mockUserUser: AuthUser = { mImageUrl: '', mUId: USER_ID, mEmail: '', mName: '', mUserName: '', mPhone: '', administrator: false };
  let db: Firestore;
  afterEach(() => {
    teardown();
  });

  beforeEach(async () => {
    db = await setup(USER_ID, {
      [documentPath(COLLECTIONS.USERS, USER_ID)]: generateMockDocument(),
    });

    const adminDb = getAdminApp();
    await adminDb
        .collection(COLLECTIONS.USERS)
        .doc(USER_ID)
        .set(mockUserAdmin);
  });

  test('Cannot update Certificate if you are not logged in', async () => {
    const appNoAuth = getAppNoAuth();
    await db.collection(COLLECTION).add(mockCert);
    const document = appNoAuth.collection(COLLECTION).doc(DOC_ID);
    await firebase.assertFails(
        document.update(mockCert)
    );
  });

  test('Can not update Certificate if you are logged in as another user, but not admin', async () => {
    const adminDb = getAdminApp();
    await db.collection(COLLECTION).doc(DOC_ID).set(mockCert2);
    await adminDb
        .collection(COLLECTIONS.USERS)
        .doc(USER_ID)
        .set(mockUserUser);
    const document = db.collection(COLLECTION).doc(DOC_ID);
    await firebase.assertFails(
        document.update(mockCert)
    );
  });

  test('Can update Certificate if you are logged in as another user, but not admin', async () => {
    const adminDb = getAdminApp();
    await db.collection(COLLECTION).doc(DOC_ID).set(mockCert);
    await adminDb
        .collection(COLLECTIONS.USERS)
        .doc(USER_ID)
        .set(mockUserUser);
    const document = db.collection(COLLECTION).doc(DOC_ID);
    await firebase.assertSucceeds(
        document.update(mockCert)
    );
  });

  test('Can update Certificate if you are an admin', async () => {
    const document = db.collection(COLLECTION).doc(DOC_ID);
    await document.set(mockCert);
    await firebase.assertSucceeds(
        document.update(mockCert)
    );
  });
});
describe('users.create', () => {
  const COLLECTION = COLLECTIONS.USERS;
  const USER_ID = generateUserId();
  const mockUserAdmin: AuthUser = {
    mImageUrl: '',
    mUId: USER_ID,
    mEmail: '',
    mName: '',
    mUserName: '',
    mPhone: '',
    administrator: true
  };
  const mockUserUser: AuthUser = { mImageUrl: '', mUId: USER_ID, mEmail: '', mName: '', mUserName: '', mPhone: '', administrator: false };
  let db: Firestore;
  afterEach(() => {
    teardown();
  });

  beforeEach(async () => {
    db = await setup(USER_ID, {
      [documentPath(COLLECTIONS.USERS, USER_ID)]: generateMockDocument(),
    });

    const adminDb = getAdminApp();
    await adminDb
        .collection(COLLECTIONS.USERS)
        .doc(USER_ID)
        .set(mockUserAdmin);
  });

  test('Can create user if you are not an admin and logged in', async () => {
    const adminDb = getAdminApp();
    await adminDb
        .collection(COLLECTIONS.USERS)
        .doc(USER_ID)
        .set(mockUserUser);
    await firebase.assertSucceeds(
        db.collection(COLLECTION).add(mockUserAdmin)
    );
  });
  test('Can create user if you are an admin', async () => {
    await firebase.assertSucceeds(
        db.collection(COLLECTION).add(mockUserAdmin)
    );
  });
  test('Can create user if you are not logged in', async () => {
    const appNoAuth = getAppNoAuth();
    await firebase.assertSucceeds(
        appNoAuth.collection(COLLECTION).add(mockUserUser)
    );
  });
});
describe('users.update', () => {
  const COLLECTION = COLLECTIONS.USERS;
  const USER_ID = generateUserId();
  const mockUserAdmin: AuthUser = {
    mImageUrl: '',
    mUId: USER_ID,
    mEmail: '',
    mName: '',
    mUserName: '',
    mPhone: '',
    administrator: true
  };
  const mockUserUser: AuthUser = { mImageUrl: '', mUId: USER_ID, mEmail: '', mName: '', mUserName: '', mPhone: '', administrator: false };
  let db: Firestore;
  afterEach(() => {
    teardown();
  });

  beforeEach(async () => {
    db = await setup(USER_ID, {
      [documentPath(COLLECTIONS.USERS, USER_ID)]: generateMockDocument(),
    });

    const adminDb = getAdminApp();
    await adminDb
        .collection(COLLECTIONS.USERS)
        .doc(USER_ID)
        .set(mockUserAdmin);
  });

  test('Can not update user if you are not an admin and logged in as the another user', async () => {
    const adminDb = getAdminApp();
    db.collection(COLLECTION).doc('seed').set(mockUserUser);
    await adminDb
        .collection(COLLECTIONS.USERS)
        .doc(USER_ID)
        .set(mockUserUser);
    await firebase.assertFails(
        db.collection(COLLECTION).doc('seed').update(mockUserUser)
    );
  });
  test('Can update user if you are not an admin and logged in as the user', async () => {
    const adminDb = getAdminApp();
    db.collection(COLLECTION).doc('seed').set(mockUserUser);
    await adminDb
        .collection(COLLECTIONS.USERS)
        .doc('seed')
        .set(mockUserUser);
    await firebase.assertSucceeds(
        db.collection(COLLECTION).doc('seed').update(mockUserUser)
    );
  });
  test('Can update user if you are an admin', async () => {
    await firebase.assertSucceeds(
        db.collection(COLLECTION).doc(USER_ID).update(mockUserAdmin)
    );
  });
  test('Can not update user if you are not logged in', async () => {
    const appNoAuth = getAppNoAuth();
    await firebase.assertFails(
        appNoAuth.collection(COLLECTION).doc(USER_ID).update(mockUserUser)
    );
  });
});
