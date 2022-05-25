import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { prefectures } from '../types/index';

export const PrefecturesButtonClear = memo(
  ({
    prefectures,
    setPrefectures,
  }: {
    prefectures: Array<prefectures>;
    setPrefectures: any;
  }) => {
    const clickButton = useCallback(() => {
      const clearedPrefectures: Array<prefectures> = prefectures.map(
        (prefecture: prefectures) => {
          return {
            prefCode: prefecture.prefCode,
            prefName: prefecture.prefName,
            isSelected: false,
          };
        }
      );
      setPrefectures(clearedPrefectures);
    }, [prefectures, setPrefectures]);
    return (
      <SButton className='clear' onClick={clickButton}>
        クリア
      </SButton>
    );
  }
);

const SButton = styled.button`
  cursor: pointer;
  color: #fff;
  width: 100px;
  transition: background-color 0.6s;
  padding: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: rgb(109, 2, 2);
  &:hover {
    background-color: rgb(218, 14, 14);
  }
`;
