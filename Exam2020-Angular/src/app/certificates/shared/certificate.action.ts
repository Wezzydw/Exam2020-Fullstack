import {Certificate} from './certificate';

import {Certificate} from './certificate';

export class CertificateAdd {
  static readonly type = '[Certificates] CertificateAdd';

  constructor(public certificate: Certificate, public image: File, public useruid: string) {}
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

  constructor(public userUid: string) {}

}

export class SetSelectedCertificate {
  static readonly type = '[Certificates] SetSelectedCertificate';

  constructor(public certificate: Certificate) {}
}

export class UpdateCertificate {
  static readonly type = '[Certificates] UpdateCertificate';

  constructor(public certificate: Certificate, public image: File) {}
}
