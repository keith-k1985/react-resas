import { PrefecturesButtonAllSelect } from './PrefecturesButtonAllSelect';
import { PrefecturesButtonClear } from './PrefecturesButtonClear';
import { PrefecturesItem } from './PrefecturesItem';
import styled from 'styled-components';
import { prefectures } from '../types/index';

export const Prefectures = ({
  prefectures,
  setPrefectures,
}: {
  prefectures: Array<prefectures>;
  setPrefectures: any;
}) => {
  const togglePref = (event: any) => {
    const target: any = localStorage.setItem('api_key', event.target.value);
    const clickedTarget = prefectures.find(
      (prefecture: prefectures) => prefecture.prefName === target.id
    );
    if (clickedTarget) {
      clickedTarget.isSelected = !clickedTarget.isSelected;
    }
    const toggledPrefectures = prefectures.map((prefecture) => prefecture);
    setPrefectures(toggledPrefectures);
  };

  return (
    <SContainer>
      <STitle>都道府県を選択してください</STitle>
      <SButtons>
        <PrefecturesButtonAllSelect
          prefectures={prefectures}
          setPrefectures={setPrefectures}
        />
        <PrefecturesButtonClear
          prefectures={prefectures}
          setPrefectures={setPrefectures}
        />
      </SButtons>
      <SList>
        {prefectures.map((prefecture: prefectures) => {
          return (
            <SItem key={prefecture.prefCode}>
              <PrefecturesItem
                prefecture={prefecture}
                togglePref={togglePref}
              />
            </SItem>
          );
        })}
      </SList>
    </SContainer>
  );
};

const SContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto 60px;
`;

const STitle = styled.h2`
  text-align: left;
  color: #333;
  font-size: calc(8px + 2vmin);
`;

const SButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 0 20px 0;
`;

const SList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const SItem = styled.li`
margin: 0 10px 20px 0;
@media screen and (max-width: 600px) {
  width: calc(100% / 3);
  margin-right: 0;
  display: flex;
`;
