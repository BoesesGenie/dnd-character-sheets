import CharacterSheet from './CharacterSheet';

interface CharacterSheetsRepository {
  find(id: number): CharacterSheet | undefined;
  add(characterSheet: CharacterSheet): CharacterSheet;
  save(): void;
  map<T>(fn: (val: CharacterSheet) => T): T[];
}

export default CharacterSheetsRepository;
