import React, { useCallback, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useCharacterSheetsRepository from '../../../Application/CharacterSheet/useCharacterSheetsRepository';
import CharacterSheet from '../../../Domain/CharacterSheet/Model/CharacterSheet';

const Edit = () => {
  const [characterSheets] = useCharacterSheetsRepository();
  const { characterSheetId } = useParams<{ characterSheetId: string }>();
  const { push } = useHistory();
  const characterSheet = useMemo(() => characterSheets.find(+characterSheetId) || new CharacterSheet(CharacterSheet.NEW_SHEET_ID), [characterSheets, characterSheetId]);
  const [characterName, setCharacterName] = useState(characterSheet.characterName);
  
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

  return (
    <form onSubmit={saveChanges}>
      <div>
        <button type="submit">Сохранить</button>
      </div>
      <div>
        <input type="text" value={characterName} onChange={onCharacterNameChange} />
      </div>
    </form>
  );
};

export default Edit;
