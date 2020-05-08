import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {CertificateAdd} from './certificate.action';
import {CertificateService} from './certificate.service';
import {Certificate} from './certificate';
import {AuthState, AuthStateModel} from '../../auth/shared/auth.state';

export class CertificateStateModel {
  certificate: Certificate[];
}
@State<CertificateStateModel>({
  name: 'certificate',
  defaults: {certificate: []}
})
@Injectable()
export class CertificateState {
  constructor(private certService: CertificateService) { }

  @Selector()
  static certificate(state: CertificateStateModel){
    return state.certificate;
  }

  @Action(CertificateAdd)
  certificateAdd(ctx: StateContext<CertificateStateModel>, {certificate, image, useruid}: CertificateAdd) {
    const state = ctx.getState();
    return this.certService.certificateAdd(certificate).then(value => {
      console.log('value', value.id);
      this.certService.certificateImageUpload('images/' + useruid + '/certificates/' + value.id, image).then(r => {
        console.log(r);
      });
      ctx.setState({
        ...state,
        certificate: [...state.certificate, certificate]
      });
    });
  }
}
