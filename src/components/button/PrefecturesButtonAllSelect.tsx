import styled from 'styled-components';
import { prefectures } from '../../types/index';

export const PrefecturesButtonAllSelect = ({
  prefectures,
  setPrefectures,
}: {
  prefectures: Array<prefectures>;
  setPrefectures: any;
}) => {
  const clickButton = () => {
    const selectAllPrefectures: Array<prefectures> = prefectures.map(
      (prefecture: prefectures) => {
        return {
          prefCode: prefecture.prefCode,
          prefName: prefecture.prefName,
          isSelected: true,
        };
      }
    );
    setPrefectures(selectAllPrefectures);
  };

  return (
    <SButton className='all' onClick={clickButton}>
      すべて選択
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
  background-color: rgb(5, 5, 112);
  margin-right: 15px;
  &:hover {
    background-color: rgb(4, 4, 243);
  }
`;
