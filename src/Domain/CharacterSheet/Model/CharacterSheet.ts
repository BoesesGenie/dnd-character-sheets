interface CharacterSheetJSONReady {
  id: number;
  characterName: string;
}

class CharacterSheet {
  public static readonly NEW_SHEET_ID = 0;

  public characterName = '';

  private _id: number;

  constructor(id: number) {
    this._id = id;
  }

  static fromJSONReady = (data: CharacterSheetJSONReady) => {
    const sheet = new CharacterSheet(data.id);

    sheet.characterName = data.characterName;

    return sheet;
  }

  get id() {
    return this._id;
  }

  toJSONReady = (): CharacterSheetJSONReady => {
    return {
      id: this._id,
      characterName: this.characterName
    };
  };
}

export default CharacterSheet;
