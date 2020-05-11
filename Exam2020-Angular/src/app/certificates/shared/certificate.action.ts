import {Certificate} from './certificate';


export class CertificateReadAll {
  static readonly type = '[Certificates] CertificateReadAll';

  constructor(public userUid: string) {}
}

export class SetSelectedCertificate {
  static readonly type = '[Certificates] SetSelectedCertificate';

  constructor(public certificate: Certificate) {}
}

export class UpdateCertificate {
  static readonly type = '[Certificates] UpdateCertificate';

  constructor(public certificate: Certificate) {}
}
