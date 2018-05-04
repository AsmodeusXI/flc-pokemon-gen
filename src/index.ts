import { MP_BY_TYPE } from './constants';

export function getMPForType(type1: string, type2: string = null): number {
  return MP_BY_TYPE[type1][`${type2 ? type2 : type1}`];
}
