import DomainException from '../../Exception/DomainException';

export interface CharacterSheetJSONReady {
  id: number;
  characterName: string;
  experiencePoints: number;
}

class CharacterSheet {
  public static readonly NEW_SHEET_ID = 0;

  public characterName = '';

  public static readonly LEVEL_MAP = [
    0,
    300,
    900,
    2700,
    6500,
    14000,
    23000,
    34000,
    48000,
    64000,
    85000,
    100000,
    120000,
    140000,
    165000,
    195000,
    225000,
    265000,
    305000,
    355000,
  ] as const;

  private _id: number;
  private _experiencePoints: number = 0;
  private _level: number = 1;

  constructor(id: number) {
    this._id = id;
  }

  static fromJSONReady = (data: CharacterSheetJSONReady) => {
    const sheet = new CharacterSheet(data.id);

    sheet.characterName = data.characterName;
    sheet.experiencePoints = data.experiencePoints;

    return sheet;
  }

  get id() {
    return this._id;
  }

  get classAndLevel() {
    return this._level;
  }

  get experiencePoints() {
    return this._experiencePoints;
  }

  set experiencePoints(value: number) {
    if (value < this._experiencePoints) {
      throw new DomainException('Нельзя уменьшить очки опыта');
    }

    if (value > CharacterSheet.LEVEL_MAP[CharacterSheet.LEVEL_MAP.length - 1]) {
      value = CharacterSheet.LEVEL_MAP[CharacterSheet.LEVEL_MAP.length - 1];
    }

    let level = 1;

    while (level < CharacterSheet.LEVEL_MAP.length) {
      if (value < CharacterSheet.LEVEL_MAP[level]) {
        break;
      }

      level++;
    }

    this._experiencePoints = value;
    this._level = level;
  }

  toJSONReady = (): CharacterSheetJSONReady => {
    return {
      id: this._id,
      characterName: this.characterName,
      experiencePoints: this._experiencePoints,
    };
  };
}

export default CharacterSheet;
