import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';

import {CertificateAdd, CertificateDelete, LoadPage, NextPage, PreviousPage} from './certificate.action';
import {AuthState, AuthStateModel} from '../../auth/shared/auth.state';

import {CertificateService} from './certificate.service';
import {Certificate} from './certificate';
import {AuthUser} from '../../auth/shared/authUser';
import {AuthService} from '../../auth/shared/auth.service';
import {UserService} from '../../users/shared/user.service';
import {CertificateReadAll, SetSelectedCertificate, UpdateCertificate} from './certificate.action';
import {first, tap} from 'rxjs/operators';
import {Navigate} from '@ngxs/router-plugin';
import {merge} from 'rxjs';

export class CertificateStateModel {
  certificates: Certificate[];
  selectedCertificate: Certificate;
}
@State<CertificateStateModel>({
  name: 'certificate',
  defaults: {
    certificates: [],
    selectedCertificate: undefined
  }

})
@Injectable()
export class CertificateState {
  constructor(private certService: CertificateService) { }


  @Selector()
  static certificates(state: CertificateStateModel) {
    return state.certificates;
  }
  @Selector()
  static selectedCertificate(state: CertificateStateModel) {
    return state.selectedCertificate;
  }


  @Action(CertificateAdd)
  certificateAdd(ctx: StateContext<CertificateStateModel>, {certificate, image, useruid}: CertificateAdd) {
    const state = ctx.getState();

    return this.certService.certificateAdd(certificate).then(value => {
      value.set({mUId: value.id}, {merge: true}).then(() => {
      });
      certificate.mUId = value.id;
      this.certService.certificateImageUpload('images/' + certificate.mUserUid + '/certificates/' + certificate.mUId, image).then(r => {
        this.certService.getImageForCertificate(certificate).then(result => {
          certificate.mPhoto = result;
          ctx.setState({
            ...state,
            certificates: [...state.certificates, certificate]
          });
          this.certService.updateCertificate(certificate);
        });
      });
    });
  }

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

  @Action(SetSelectedCertificate)
  setSelectedCertificate(ctx: StateContext<CertificateStateModel>, action: SetSelectedCertificate) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      selectedCertificate: action.certificate
    });
    ctx.dispatch(new Navigate(['cert/detail']));
  }
  @Action(UpdateCertificate)
  updateCertificate(ctx: StateContext<CertificateStateModel>, action: UpdateCertificate) {
    const state = ctx.getState();
    const cert = ctx.getState().certificates;
    let temp = -1;
    this.certService.certificateImageUpload('images/' + action.certificate.mUserUid + '/certificates/' + action.certificate.mUId, action.image).then(() => {
      this.certService.getImageForCertificate(action.certificate).then(value1 => {
        action.certificate.mPhoto = value1;
        this.certService.updateCertificate(action.certificate).then(() => {
          cert.forEach((value, index) => { if ( value.mUId === action.certificate.mUId) {
            temp = index;
          }});
          cert[temp] = action.certificate;
          ctx.patchState({
            certificates: cert
          });
        });
      });
    });
  }

  @Action(CertificateDelete)
  certificateDelete(ctx: StateContext<CertificateStateModel>, action: CertificateDelete) {
    const state = ctx.getState();
    const cert = ctx.getState().certificates;
    let temp = -1;
    this.certService.deleteCertificate(action.certificate.mUId).then(() => {
      cert.forEach((value, index) => { if ( value.mUId === action.certificate.mUId) {
        temp = index;
      }});
      if (temp !== -1) {
        cert.splice(temp, 1);
        ctx.setState({
          ...state,
          certificates: cert
        });
      }
    });
    ctx.dispatch(new Navigate(['cert']));
  }

}
