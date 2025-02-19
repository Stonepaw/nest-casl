import { AnyClass, SubjectType } from '@casl/ability/dist/types/types';
import { DefaultActions } from '../actions.enum';
import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

import { UserBeforeFilterHook, UserBeforeFilterTuple } from './hooks.interface';
import { AnyPermissions } from './permissions.interface';
import { AuthorizableUser } from './authorizable-user.interface';
import { AuthorizableRequest } from './request.interface';

export interface OptionsForRoot<Roles = string, User = AuthorizableUser<Roles>, Request = AuthorizableRequest<User>> {
  superuserRole?: Roles;
  getUserFromRequest?: (request: Request) => User | undefined;
  getUserHook?: AnyClass<UserBeforeFilterHook<User>> | UserBeforeFilterTuple<User>;
}

export interface OptionsForFeature<Roles extends string = string, Subjects = SubjectType, Actions extends string = DefaultActions, User extends AuthorizableUser = AuthorizableUser> {
  permissions: AnyPermissions<Roles, Subjects, Actions, User>;
}

export interface OptionsForRootAsync<Roles = string, User = AuthorizableUser<Roles>, Request = AuthorizableRequest<User>> extends Pick<ModuleMetadata, 'imports'> {
  useFactory: FactoryProvider<Promise<OptionsForRoot<Roles, User, Request>> | OptionsForRoot<Roles, User, Request>>['useFactory'];
  inject?: FactoryProvider['inject'];
}
