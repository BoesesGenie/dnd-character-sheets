import DomainException from '../../Exception/DomainException';
import Alignment from './Alignment';

export interface CharacterSheetJSONReady {
  id: number;
  characterName: string;
  playerName: string;
  alignment: Alignment;
  experiencePoints: number;
}

class CharacterSheet {
  public static readonly NEW_SHEET_ID = 0;

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

  public characterName = '';
  public playerName = '';
  public alignment = Alignment.N;

  private _id: number;
  private _level: number = 1;
  private _experiencePoints: number = 0;

  constructor(id: number) {
    this._id = id;
  }

  static fromJSONReady = (data: CharacterSheetJSONReady) => {
    const sheet = new CharacterSheet(data.id);

    sheet.characterName = data.characterName;
    sheet.playerName = data.playerName;
    sheet.experiencePoints = +data.experiencePoints;
    sheet.alignment = data.alignment;

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
      playerName: this.playerName,
      alignment: this.alignment,
      experiencePoints: this._experiencePoints,
    };
  };
}

export default CharacterSheet;
