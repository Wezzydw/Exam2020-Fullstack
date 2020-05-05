import {Userstats} from './userstats';

export class UpdateUser {
  static readonly type = '[USERSTAT] Update';
  constructor(public payload: Userstats) {
  }
}

export class GetUser {
  static readonly type = '[USERSTAT] Get';

}
