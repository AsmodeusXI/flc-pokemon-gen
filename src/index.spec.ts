import * as index from "./index.ts";

test("getMPForType fetches the expected values", () => {
  expect(index.getMPForType('Normal')).toEqual(124);
  expect(index.getMPForType('Fighting', 'Fairy')).toEqual(112);
  expect(index.getMPForType('Electric', 'Poison')).toEqual(106);
  expect(index.getMPForType('Psychic', 'Light')).toEqual(106);
  expect(index.getMPForType('Steel', 'Grass')).toEqual(88);
});
