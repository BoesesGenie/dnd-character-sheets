import CharacterSheet from '../../Domain/CharacterSheet/Model/CharacterSheet';
import CharacterSheetsRepository from '../../Domain/CharacterSheet/Model/CharacterSheetRepository';

interface StoredCharacterSheet {
  id: number;
  characterName: string;
};

class LocalStorageCharacterSheetsRepository implements CharacterSheetsRepository {
  private characterSheets: CharacterSheet[] = [];
  private maxId: number;

  private static extracted: CharacterSheetsRepository;

  constructor(characterSheets: CharacterSheet[]) {
    this.characterSheets = characterSheets;

    this.maxId = this.characterSheets.reduce((acc, sheet) => {
      if (sheet.id > acc) {
        acc = sheet.id;
      }

      return acc;
    }, 0);
  }

  public static extract = (): CharacterSheetsRepository => {
    if (LocalStorageCharacterSheetsRepository.extracted) {
      return LocalStorageCharacterSheetsRepository.extracted;
    }

    const rawData = window.localStorage.getItem('characterSheets');
    let data = [];
    
    if (rawData) {
      data = JSON.parse(rawData).map((item: StoredCharacterSheet) => {
        const current = new CharacterSheet(item.id);

        current.characterName = item.characterName;

        return current;
      });
    }

    LocalStorageCharacterSheetsRepository.extracted = new LocalStorageCharacterSheetsRepository(data);

    return LocalStorageCharacterSheetsRepository.extracted;
  }

  find = (id: number) => {
    return this.characterSheets.find(sheet => sheet.id === id);
  }

  add = (characterSheet: CharacterSheet) => {
    const data = characterSheet.toJSONReady();

    data.id = ++this.maxId;

    const added = CharacterSheet.fromJSONReady(data);

    this.characterSheets.push(added);

    return added;
  }

  save = () => {
    const data = this.characterSheets.map(sheet => sheet.toJSONReady());

    window.localStorage.setItem('characterSheets', JSON.stringify(data));
  }

  map = <T>(fn: (val: CharacterSheet) => T): T[] => {
    return this.characterSheets.map(fn);
  }
}

export default LocalStorageCharacterSheetsRepository;
