import CharacterSheetsRepository from '../../Domain/CharacterSheet/Model/CharacterSheetRepository';
import LocalStorageCharacterSheetsRepository from '../../Infrastructure/CharacterSheet/LocalStorageCharacterSheetsRepository';

const useCharacterSheetsRepository = (): CharacterSheetsRepository => {
  return LocalStorageCharacterSheetsRepository.extract();
};

export default useCharacterSheetsRepository;
