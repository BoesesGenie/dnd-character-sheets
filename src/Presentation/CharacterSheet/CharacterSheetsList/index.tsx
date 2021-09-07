import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import useCharacterSheetsRepository from '../../../Application/CharacterSheet/useCharacterSheetsRepository';

const CharacterSheetsList = () => {
  const [characterSheets, refreshCharacterSheets] = useCharacterSheetsRepository();
  const { push } = useHistory();

  const onCharacterNameClick = useCallback((id: number) => {
    return () => {
      return push(`/sheet/${id}`)
    };
  }, [push]);

  const onAddClick = useCallback(() => {
    push('/sheet');
  }, [push]);

  const onDownloadClick = useCallback(() => {
    const data = `data:text/json;charset=utf-8,${encodeURIComponent(characterSheets.toJSONString())}`;
    const downloadAnchorNode = document.createElement('a');
    
    downloadAnchorNode.setAttribute('href', data);
    downloadAnchorNode.setAttribute('download', 'sheets.json');
    downloadAnchorNode.style.display = 'none';
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }, [characterSheets]);

  const onFileSelect = useCallback((e) => {
    const reader = new FileReader();
    
    reader.onload = (e) => { 
      if (!e.target) {
        return;
      }

      characterSheets.upload(e.target.result as string);
      
      refreshCharacterSheets();
    };

    reader.readAsText(e.target.files[0]);
  }, [characterSheets, refreshCharacterSheets]);

  return (
    <>
      <ul>
        {characterSheets.map((characterSheet) => (
          <li key={characterSheet.id}>
            Лист #{characterSheet.id}: <button onClick={onCharacterNameClick(characterSheet.id)}>{characterSheet.characterName}</button>
          </li>
        ))}
      </ul>
      <button onClick={onAddClick}>Добавить персонажа</button>
      <button onClick={onDownloadClick}>Выгрузить всех персонажей</button>
      <input type="file" onChange={onFileSelect} />
    </>
  );
};

export default CharacterSheetsList;
