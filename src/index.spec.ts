import * as index from "./index.ts";

test("getMPForType fetches the expected values", () => {
  expect(index.getMPForType('Normal')).toEqual(124);
  expect(index.getMPForType('Fighting', 'Fairy')).toEqual(112);
  expect(index.getMPForType('Electric', 'Poison')).toEqual(106);
  expect(index.getMPForType('Psychic', 'Light')).toEqual(106);
  expect(index.getMPForType('Steel', 'Grass')).toEqual(88);
});

test("isMoveOutOfType accurately identifies out of type moves", () => {
  const testPokemon = {
    type1: 'Fighting',
    type2: 'Light',
    moves: []
  };

  const move1 = { type: 'Psychic', power: 5 };
  const move2 = { type: 'Fighting', power: 6 };
  const move3 = { type: 'Light', power: 7 };
  const move4 = { type: 'Fire', power: 8 };
  const move5 = { type: 'Normal', power: 9 };

  expect(index.isMoveOutOfType(move1, testPokemon)).toBeTruthy()
  expect(index.isMoveOutOfType(move2, testPokemon)).toBeFalsy()
  expect(index.isMoveOutOfType(move3, testPokemon)).toBeFalsy()
  expect(index.isMoveOutOfType(move4, testPokemon)).toBeTruthy()
  expect(index.isMoveOutOfType(move5, testPokemon)).toBeTruthy()
});

test("getInTypeMP accurately determines move point values for a Pokemon", () => {
  const testPokemon = {
    type1: 'Fire',
    type2: 'Ghost',
    moves: []
  };

  const move1 = { type: 'Fire', power: 5, status: null };
  const move2 = { type: 'Ghost', power: 15, status: null };

  expect(index.getInTypeMP(move1, testPokemon)).toEqual(11);
  testPokemon.moves.push(move1);
  expect(index.getInTypeMP(move2, testPokemon)).toEqual(21);
  testPokemon.moves.push(move2);

  const move3 = { type: 'Fire', power: null, status: index.MoveStatus.BUFF };
  const move4 = { type: 'Ghost', power: 6, status: index.MoveStatus.BUFF };

  expect(index.getInTypeMP(move3, testPokemon)).toEqual(16);
  testPokemon.moves.push(move3);
  expect(index.getInTypeMP(move4, testPokemon)).toEqual(16);
  testPokemon.moves.push(move4);

  const move5 = { type: 'Fire', power: null, status: index.MoveStatus.ALLY };
  const move6 = { type: 'Ghost', power: 2, status: index.MoveStatus.CONTROL };
  const move7 = { type: 'Fire', power: 10, status: index.MoveStatus.ENEMY };

  expect(index.getInTypeMP(move5, testPokemon)).toEqual(26);
  testPokemon.moves.push(move5);
  expect(index.getInTypeMP(move6, testPokemon)).toEqual(36);
  testPokemon.moves.push(move6);
  expect(index.getInTypeMP(move7, testPokemon)).toEqual(46);
  testPokemon.moves.push(move7);
});

test("getOutOfTypeMP fetches the right value for each new move", () => {
  const testPokemon = {
    type1: 'Normal',
    type2: 'Flying',
    moves: []
  };

  const move1 = { type: 'Psychic', power: 5 };
  const move2 = { type: 'Fighting', power: 6 };
  const move3 = { type: 'Bug', power: 7 };
  const move4 = { type: 'Fire', power: 8 };
  const move5 = { type: 'Light', power: 9 };

  expect(index.getOutOfTypeMP(move1, testPokemon)).toEqual(6);
  testPokemon.moves.push(move1);
  expect(index.getOutOfTypeMP(move2, testPokemon)).toEqual(8);
  testPokemon.moves.push(move2);
  expect(index.getOutOfTypeMP(move3, testPokemon)).toEqual(11);
  testPokemon.moves.push(move3);
  expect(index.getOutOfTypeMP(move4, testPokemon)).toEqual(15);
  testPokemon.moves.push(move4);
  expect(index.getOutOfTypeMP(move5, testPokemon)).toEqual(20);
});

test("getOutOfTypeMPPenalty increases as expected through each out of type move", () => {
  const testPokemon = {
    type1: 'Normal',
    type2: 'Flying',
    moves: []
  };

  const move1 = { type: 'Psychic', power: 5 };
  const move2 = { type: 'Fighting', power: 6 };
  const move3 = { type: 'Bug', power: 7 };
  const move4 = { type: 'Fire', power: 8 };
  const move5 = { type: 'Light', power: 9 };

  expect(index.getOutOfTypeMPPenalty(move1, testPokemon)).toEqual(6);
  testPokemon.moves.push(move1);
  expect(index.getOutOfTypeMPPenalty(move2, testPokemon)).toEqual(8);
  testPokemon.moves.push(move2);
  expect(index.getOutOfTypeMPPenalty(move3, testPokemon)).toEqual(11);
  testPokemon.moves.push(move3);
  expect(index.getOutOfTypeMPPenalty(move4, testPokemon)).toEqual(15);
  testPokemon.moves.push(move4);
  expect(index.getOutOfTypeMPPenalty(move5, testPokemon)).toEqual(20);
});
