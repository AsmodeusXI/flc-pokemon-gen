import { MP_BY_TYPE } from './mp_by_type';
import { OOT_CONSTANT } from './oot_constant';

export function getMPForType(type1: string, type2: string = null): number {
  return MP_BY_TYPE[type1][`${type2 ? type2 : type1}`];
}

export enum MoveStatus {
  BUFF = 1,
  CONTROL,
  DOT,
  CLEAN,
  ALLY,
  ENEMY
}

export interface PokemonMove {
  type: string,
  power?: number,
  status?: MoveStatus
}

export interface Pokemon {
  type1: string,
  type2: string,
  moves: Array<PokemonMove>
}

export function isMoveOutOfType(move: PokemonMove, pokemon: Pokemon): boolean {
  return (move.type !== pokemon.type1 && move.type !== pokemon.type2);
}

export function getInTypeMP(move: PokemonMove, pokemon: Pokemon): number {
  let inTypeMP = 6;
  if (move.power && !move.status) {
    inTypeMP += move.power;
  } else {
    inTypeMP += 10;
    const uniqueStatuses = [move.status];
    pokemon.moves.forEach((move) => {
      if (move.status && !uniqueStatuses.includes(move.status)) {
        uniqueStatuses.push(move.status);
      }
    });
    inTypeMP += (uniqueStatuses.length - 1) * 10;
  }
  return inTypeMP;
}

export function getOutOfTypeMoveConstant(move: PokemonMove, pokemon: Pokemon): number {
  if (!pokemon.type1) throw new Error('Pokemon Primary Type is required!');
  if (!pokemon.type2) pokemon.type2 = pokemon.type1;

  return OOT_CONSTANT[pokemon.type1][pokemon.type2][move.type];
}

export function getOutOfTypeMPPenalty(move: PokemonMove, pokemon: Pokemon): number {
  const ootMoveIndex = pokemon.moves.filter((pokeMove) => isMoveOutOfType(pokeMove, pokemon)).length + 1;
  let ootMoveCost = 5;
  for (let i = 1; i <= ootMoveIndex; i++) {
    ootMoveCost += i;
  }
  return ootMoveCost;
}

export function getOutOfTypeMP(move: PokemonMove, pokemon: Pokemon): number {
  return getOutOfTypeMoveConstant(move, pokemon) + getOutOfTypeMPPenalty(move, pokemon);
}

export function getMoveMP(move: PokemonMove, pokemon: Pokemon): number {
  // In-Type Costs
  let moveMP = getInTypeMP(move, pokemon);

  // Out-Type Costs
  if (isMoveOutOfType(move, pokemon)) {
    moveMP += getOutOfTypeMP(move, pokemon);
  }

  return moveMP;
}
