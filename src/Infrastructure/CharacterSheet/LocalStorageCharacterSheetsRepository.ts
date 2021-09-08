import CharacterSheet, { CharacterSheetJSONReady } from '../../Domain/CharacterSheet/Model/CharacterSheet';
import CharacterSheetsRepository from '../../Domain/CharacterSheet/Model/CharacterSheetRepository';

class LocalStorageCharacterSheetsRepository implements CharacterSheetsRepository {
  private characterSheets: CharacterSheet[] = [];
  private maxId: number;

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
    return new LocalStorageCharacterSheetsRepository(
      LocalStorageCharacterSheetsRepository.readFromStorage()
    );
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
    window.localStorage.setItem('characterSheets', this.toJSONString());
  }

  upload = (data: string) => {
    window.localStorage.setItem('characterSheets', data);

    this.characterSheets = LocalStorageCharacterSheetsRepository.readFromStorage();
  }

  toJSONString = () => {
    return JSON.stringify(this.characterSheets.map(sheet => sheet.toJSONReady()))
  }

  map = <T>(fn: (val: CharacterSheet) => T): T[] => {
    return this.characterSheets.map(fn);
  }

  private static readFromStorage = (): CharacterSheet[] => {
    const rawData = window.localStorage.getItem('characterSheets');
    let data = [];
    
    if (rawData) {
      data = JSON.parse(rawData).map((item: CharacterSheetJSONReady) => CharacterSheet.fromJSONReady(item));
    }

    return data;
  }
}

export default LocalStorageCharacterSheetsRepository;
