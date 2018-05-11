import { MP_BY_TYPE } from './constants';

export function getMPForType(type1: string, type2: string = null): number {
  return MP_BY_TYPE[type1][`${type2 ? type2 : type1}`];
}

enum MoveStatus {
  BUFF,
  CONTROL,
  DOT,
  CLEAN,
  ALLY,
  ENEMY
}

interface PokemonMove {
  type: string,
  power?: number,
  status?: MoveStatus
}

interface Pokemon {
  type1: string,
  type2: string,
  moves: Array<PokemonMove>
}

export function getMPForPokemonMove(move: PokemonMove, pokemon: Pokemon): number {
  let moveMP = 6; // Starting value.
  // In-Type Costs
  if (move.power && !move.status) {
    moveMP += move.power;
  } else {
    moveMP += 10;
    const moveStatuses = pokemon.moves.map((currentMoves) => {
      if (currentMoves.status) return currentMoves.status;
    });
    const uniqueStatuses = [move.status];
    moveStatuses.forEach((moveStatus) => {
      if (!uniqueStatuses.includes(moveStatus)) uniqueStatuses.push(moveStatus);
    });
    moveMP += (uniqueStatuses.length - 1) * 10;
  }
  // Out-Type Costs
  return moveMP;
}
