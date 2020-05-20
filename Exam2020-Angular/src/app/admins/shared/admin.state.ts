import {Certificate} from '../../certificates/shared/certificate';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AuthUser} from '../../auth/shared/authUser';
import {Injectable} from '@angular/core';
import {CertificateStateModel} from '../../certificates/shared/certificate.state';
import {SetSelectedCertificate} from '../../certificates/shared/certificate.action';
import {Navigate} from '@ngxs/router-plugin';
import {SetSelectedUser} from './admin.action';

export class AdminStateModel {
  users: AuthUser[];
  selectedUser: AuthUser;
}
@State<AdminStateModel>({
  name: 'admin',
  defaults: {
    users: [],
    selectedUser: undefined
  }

})
@Injectable()
export class AdminState {
  @Selector()
  static selectedUser(state: AdminStateModel) {
    return state.selectedUser;
  }

  @Action(SetSelectedUser)
  setSelectedUser(ctx: StateContext<AdminStateModel>, action: SetSelectedUser) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      selectedUser: action.user
    });
    ctx.dispatch(new Navigate(['admin/user']));
  }

}
