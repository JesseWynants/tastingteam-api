import { Wine as _Wine } from './wine';
import { Tasting as _Tasting } from './tasting';
import { Team as _Team } from './team';
import { Score as _Score } from './score';
import { WineLabel as _WineLabel } from './wine_label';
import { Country as _Country } from './country';
import { User as _User } from './user';
import { Grape as _Grape } from './grape';

export namespace PrismaModel {
  export class Wine extends _Wine {}
  export class Tasting extends _Tasting {}
  export class Team extends _Team {}
  export class Score extends _Score {}
  export class WineLabel extends _WineLabel {}
  export class Country extends _Country {}
  export class User extends _User {}
  export class Grape extends _Grape {}

  export const extraModels = [
    Wine,
    Tasting,
    Team,
    Score,
    WineLabel,
    Country,
    User,
    Grape,
  ];
}
