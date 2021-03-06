import React, { useCallback, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useCharacterSheetsRepository from '../../../Application/CharacterSheet/useCharacterSheetsRepository';
import Alignment from '../../../Domain/CharacterSheet/Model/Alignment';
import CharacterSheet from '../../../Domain/CharacterSheet/Model/CharacterSheet';

const alignmentList = [
  Alignment.LG,
  Alignment.NG,
  Alignment.CG,
  Alignment.LN,
  Alignment.N,
  Alignment.CN,
  Alignment.LE,
  Alignment.NE,
  Alignment.CE,
] as const;

const Edit = () => {
  const [characterSheets, refresh] = useCharacterSheetsRepository();
  const { characterSheetId } = useParams<{ characterSheetId: string }>();
  const { push } = useHistory();
  const characterSheet = useMemo(() => characterSheets.find(+characterSheetId) || new CharacterSheet(CharacterSheet.NEW_SHEET_ID), [characterSheets, characterSheetId]);
  const [characterName, setCharacterName] = useState(characterSheet.characterName);
  const [playerName, setPlayerName] = useState(characterSheet.playerName);
  const [alignment, setAlignment] = useState(characterSheet.alignment);
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

  const onPlayerNameChange = useCallback((e) => {
    characterSheet.playerName = e.target.value;
    setPlayerName(characterSheet.playerName);
  }, [characterSheet]);

  const onAlignmentChange = useCallback((e) => {
    characterSheet.alignment = e.target.value;
    setAlignment(characterSheet.alignment);
  }, [characterSheet]);

  const onExperiencePointsChange = useCallback((e) => {
    setExperiencePoints(+e.target.value);
  }, []);

  const saveExperiencePoints = useCallback(() => {
    characterSheet.experiencePoints = experiencePoints;
    characterSheets.save();
    refresh();
  }, [characterSheet, experiencePoints, characterSheets, refresh]);

  return (
    <form onSubmit={saveChanges}>
      <div>
        <button type="submit">??????????????????</button>
      </div>
      <div>
        ?????? ??????????????????
        <input type="text" value={characterName} onChange={onCharacterNameChange} />
      </div>
      <div>?????????? ?? ?????????????? {characterSheet.classAndLevel}</div>
      <div>
        ?????? ????????????
        <input type="text" value={playerName} onChange={onPlayerNameChange} />
      </div>
      <div>
        ??????????????????????????
        <select onChange={onAlignmentChange}>
          {alignmentList.map((alignmentItem) => (
            alignmentItem === alignment ? <option key={alignmentItem} selected>{alignmentItem}</option> : <option key={alignmentItem}>{alignmentItem}</option>
          ))}
        </select>
      </div>
      <div>
        ????????
        <input type="text" value={experiencePoints} onChange={onExperiencePointsChange} onBlur={saveExperiencePoints} />
      </div>
    </form>
  );
};

export default Edit;
