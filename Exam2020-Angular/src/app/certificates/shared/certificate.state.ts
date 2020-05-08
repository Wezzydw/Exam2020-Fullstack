import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {CertificateService} from './certificate.service';
import {Certificate} from './certificate';
import {AuthUser} from '../../auth/shared/authUser';
import {AuthService} from '../../auth/shared/auth.service';
import {UserService} from '../../users/shared/user.service';
import {CertificateReadAll, SetSelectedCertificate} from './certificate.action';
import {first, tap} from 'rxjs/operators';
import {Navigate} from '@ngxs/router-plugin';

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

  @Action(SetSelectedCertificate)
  setSelectedCertificate(ctx: StateContext<CertificateStateModel>, action: SetSelectedCertificate) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      selectedCertificate: action.certificate
    });
    ctx.dispatch(new Navigate(['cert/detail']));
  }
}
