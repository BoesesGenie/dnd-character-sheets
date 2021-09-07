import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import useCharacterSheetsRepository from '../../../Application/CharacterSheet/useCharacterSheetsRepository';

const CharacterSheetsList = () => {
  const characterSheets = useCharacterSheetsRepository();
  const { push } = useHistory();

  const onCharacterNameClick = useCallback((id: number) => {
    return () => push(`/sheet/${id}`);
  }, [push]);

  const onAddClick = useCallback(() => {
    push('/sheet');
  }, [push]);

  return (
    <>
      <ul>
        {characterSheets.map((characterSheet) => (
          <li key={characterSheet.id}>
            Лист #{characterSheet.id}: <button onClick={onCharacterNameClick(characterSheet.id)}>{characterSheet.characterName}</button>
          </li>
        ))}
      </ul>
      <button onClick={onAddClick}>Добавить</button>
    </>
  );
};

export default CharacterSheetsList;
