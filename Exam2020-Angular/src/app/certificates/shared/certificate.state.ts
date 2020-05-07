import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {CertificateAdd} from './certificate.action';
import {CertificateService} from './certificate.service';
import {Certificate} from './certificate';

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
  certificateAdd(ctx: StateContext<CertificateStateModel>, action: CertificateAdd) {
    debugger;
    const state = ctx.getState();
    return this.certService.certificateAdd(action.certificate).then(value => {
      ctx.setState({
        ...state,
        certificate: [...state.certificate, action.certificate]
      });
    });
  }
}
