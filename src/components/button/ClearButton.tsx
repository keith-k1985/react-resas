import { FC } from 'react';
import styled from 'styled-components';

type Props = {
  // 都道府県
  prefectures:
    | {
        prefCode: number;
        prefName: string;
      }[];
  setPreFectures: any;
  // チェック時イベント
};

export const ClearButton: FC<Props> = ({ prefectures, setPreFectures }) => {
  const clickButton = () => {
    const clearedPrefectures = prefectures.map((prefecture) => {
      return {
        prefCode: prefecture.prefCode,
        prefName: prefecture.prefName,
        check: false,
      };
    });
    setPreFectures(clearedPrefectures);
  };
  return (
    <SButton className='clear' onClick={clickButton}>
      クリア
    </SButton>
  );
};

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
