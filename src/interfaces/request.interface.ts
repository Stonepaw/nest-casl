import { AnyObject } from '@casl/ability/dist/types/types';

import { AuthorizableUser } from './authorizable-user.interface';
import { CaslRequestCache } from './casl-request-cache.interface';

export interface AuthorizableRequest<User = AuthorizableUser, Subject = AnyObject> {
  user?: User;
  currentUser?: User;
  casl: CaslRequestCache<User, Subject>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ContextWithAuthorizableRequest {
  req: AuthorizableRequest;
}
