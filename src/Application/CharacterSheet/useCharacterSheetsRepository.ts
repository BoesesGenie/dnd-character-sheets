import { useCallback, useState } from 'react';
import CharacterSheetsRepository from '../../Domain/CharacterSheet/Model/CharacterSheetRepository';
import LocalStorageCharacterSheetsRepository from '../../Infrastructure/CharacterSheet/LocalStorageCharacterSheetsRepository';

const useCharacterSheetsRepository = (): [CharacterSheetsRepository, () => void] => {
  const [repository, setRepository] = useState(LocalStorageCharacterSheetsRepository.extract());

  const refresh = useCallback(() => {
    setRepository(LocalStorageCharacterSheetsRepository.extract());
  }, []);

  return [repository, refresh];
};

export default useCharacterSheetsRepository;
