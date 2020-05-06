import {Certificate} from './certificate';

export class CertificateAdd {
  static readonly type = '[Certificates] CertificateAdd';

  constructor(public certificate: Certificate) {}
}

export class CertificateEdit {
  static readonly type = '[Certificates] CertificateEdit';

  constructor(public certificate: Certificate) {}
}

export class CertificateDelete {
  static readonly type = '[Certificates] CertificateDelete';

  constructor(public certificateUid: string) {}
}

export class CertificateReadAll {
  static readonly type = '[Certificates] CertificateReadAll';
}
