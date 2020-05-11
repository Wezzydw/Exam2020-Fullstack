import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';

import {CertificateAdd} from './certificate.action';
import {AuthState, AuthStateModel} from '../../auth/shared/auth.state';

import {CertificateService} from './certificate.service';
import {Certificate} from './certificate';
import {AuthUser} from '../../auth/shared/authUser';
import {AuthService} from '../../auth/shared/auth.service';
import {UserService} from '../../users/shared/user.service';
import {CertificateReadAll} from './certificate.action';
import {first, tap} from 'rxjs/operators';
import {merge} from 'rxjs';

export class CertificateStateModel {
  certificates: Certificate[];
}
@State<CertificateStateModel>({
  name: 'certificate',
  defaults: {
    certificates: []
  }

})
@Injectable()
export class CertificateState {
  constructor(private certService: CertificateService) { }


  @Selector()
  static certificates(state: CertificateStateModel) {
    return state.certificates;
  }

  @Action(CertificateAdd)
  certificateAdd(ctx: StateContext<CertificateStateModel>, {certificate, image, useruid}: CertificateAdd) {
    const state = ctx.getState();

    return this.certService.certificateAdd(certificate).then(value => {
      value.set({mUId: value.id}, {merge: true}).then(() => {
        console.log('id has been set');
      });
      console.log('value', value.id);
      certificate.mUId = value.id;
      console.log('mUID FOR CERT', certificate.mUId);
      this.certService.certificateImageUpload('images/' + certificate.mUserUid + '/certificates/' + certificate.mUId, image).then(r => {
        console.log('return ', r);
        this.certService.getImageForCertificate(certificate).then(result => {
          certificate.mPhoto = result;
          certificate.mExpirationDate = 'testerLigeStateHer';
          console.log('ctx', certificate);
          ctx.setState({
            ...state,
            certificates: [...state.certificates, certificate]
          });
        });
      });
    });
  }


  // @Action(CertificateAdd)
  // certificateAdd(ctx: StateContext<CertificateStateModel>, action: CertificateAdd) {
  //   const state = ctx.getState();
  //   return this.certService.certificateAdd(action.certificate).then(value => {
  //     ctx.setState({
  //       ...state,
  //       certificate: [...state.certificate, action.certificate]
  //     });
  //   });
  // }
  @Action(CertificateReadAll)
  certificateReadAll(ctx: StateContext<CertificateStateModel>, action: CertificateReadAll) {
    const state = ctx.getState();
    return this.certService.certificateReadAll(action.userUid).pipe(
      first(),
      tap(x => {
        x.forEach(y => {
          this.certService.getImageForCertificate(y).then(value => {
            y.mPhoto = value;
          });
        });
        ctx.setState({
          ...state,
          certificates: x
        });
      })
    );
  }
}
