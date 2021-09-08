import React, { useCallback, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useCharacterSheetsRepository from '../../../Application/CharacterSheet/useCharacterSheetsRepository';
import CharacterSheet from '../../../Domain/CharacterSheet/Model/CharacterSheet';

const Edit = () => {
  const [characterSheets, refresh] = useCharacterSheetsRepository();
  const { characterSheetId } = useParams<{ characterSheetId: string }>();
  const { push } = useHistory();
  const characterSheet = useMemo(() => characterSheets.find(+characterSheetId) || new CharacterSheet(CharacterSheet.NEW_SHEET_ID), [characterSheets, characterSheetId]);
  const [characterName, setCharacterName] = useState(characterSheet.characterName);
  const [experiencePoints, setExperiencePoints] = useState(characterSheet.experiencePoints);
  
  const saveChanges = useCallback((e) => {
    e.preventDefault();
    
    let sheetId = +characterSheetId;

    if (characterSheet.id === CharacterSheet.NEW_SHEET_ID) {
      const added = characterSheets.add(characterSheet);

      sheetId = added.id;
    }

    characterSheets.save();

    push(`/sheet/${sheetId}`);
  }, [characterSheets, characterSheet, characterSheetId, push]);

  const onCharacterNameChange = useCallback((e) => {
    characterSheet.characterName = e.target.value;
    setCharacterName(characterSheet.characterName);
  }, [characterSheet]);

  const onExperiencePointsChange = useCallback((e) => {
    setExperiencePoints(e.target.value);
  }, []);

  const saveExperiencePoints = useCallback(() => {
    characterSheet.experiencePoints = experiencePoints;
    characterSheets.save();
    refresh();
  }, [characterSheet, experiencePoints, characterSheets, refresh]);

  return (
    <form onSubmit={saveChanges}>
      <div>
        <button type="submit">Сохранить</button>
      </div>
      <div>
        Имя персонажа
        <input type="text" value={characterName} onChange={onCharacterNameChange} />
      </div>
      <div>Класс и уровень {characterSheet.classAndLevel}</div>
      <div>
        Опыт
        <input type="text" value={experiencePoints} onChange={onExperiencePointsChange} onBlur={saveExperiencePoints} />
      </div>
    </form>
  );
};

export default Edit;
