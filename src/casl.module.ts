import { DynamicModule, Module } from '@nestjs/common';

import { OptionsForFeature, OptionsForRoot } from './interfaces/options.interface';
import { CASL_ROOT_OPTIONS, CASL_FEATURE_OPTIONS } from './casl.constants';
import { AccessService } from './access.service';
import { AbilityFactory } from './factories/ability.factory';
import { AuthorizableUser } from './interfaces/authorizable-user.interface';
import { CaslConfig } from './casl.config';

@Module({
  imports: [],
  providers: [
    AccessService,
    AbilityFactory,
    {
      provide: CASL_FEATURE_OPTIONS,
      useValue: {},
    },
  ],
  exports: [AccessService],
})
export class CaslModule {
  static forFeature(options: OptionsForFeature): DynamicModule {
    return {
      module: CaslModule,
      imports: [],
      // exports: [AccessService],
      providers: [
        AccessService,
        AbilityFactory,
        {
          provide: CASL_FEATURE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  static forRoot<User = AuthorizableUser>(options: OptionsForRoot<User>): DynamicModule {
    Reflect.defineMetadata(CASL_ROOT_OPTIONS, options, CaslConfig);
    return {
      module: CaslModule,
    };
  }
}
