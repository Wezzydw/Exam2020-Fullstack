

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

  constructor(public certificate: Certificate) {}
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

export class NextPage {
static readonly type = '[Certificates] NextPage';

constructor() {}
}

export class PreviousPage {
  static readonly type = '[Certificates] PreviousPage';

  constructor() {}
}

export class LoadPage {
  static readonly type = '[Certificates] LoadPage';

  constructor() {}
}
