import { useState, useEffect } from 'react';
import { CheckBox } from '../checkbox/CheckBox';
import { Graph } from '../Graph/Graph';
import axios from 'axios';
import styled from 'styled-components';
import { prefectures } from '../../types/index';
import { populations } from '../../types/index';
import BeatLoader from 'react-spinners/BeatLoader';

export const Home = () => {
  // 都道府県情報
  const [prefectures, setPreFectures] = useState<Array<prefectures>>([]);
  // 人口情報,年
  const [prefPopulation, setPrefPopulation] = useState<Array<populations>>([]);

  // マウント時，情報取得
  useEffect(() => {
    axios
      .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: { 'X-API-KEY': `${process.env.REACT_APP_API_KEY}` },
      })
      .then((res) => {
        setPreFectures(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  // チェックボックスをクリックしたとき
  const handleClickCheck = (
    prefName: string,
    prefCode: number,
    check: boolean
  ) => {
    let prefPopulationCopy = prefPopulation.slice(); // 配列コピー

    if (check) {
      // チェックをつけたとき(check===true)
      if (
        prefPopulationCopy.findIndex((value) => value.prefName === prefName) !==
        -1
      ) {
        return;
      }
      axios
        .get(
          'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=' +
            String(prefCode),
          {
            headers: { 'X-API-KEY': `${process.env.REACT_APP_API_KEY}` },
          }
        )
        .then((res) => {
          prefPopulationCopy.push({
            prefCode: prefCode,
            prefName: prefName,
            data: res.data.result.data[0].data,
          });
          setPrefPopulation(prefPopulationCopy);
        })
        .catch((err) => {
          alert(err);
          return;
        });
    } else {
      // チェックを外したとき(check===false)
      const deleteIndex = prefPopulationCopy.findIndex(
        (value) => value.prefName === prefName
      );
      if (deleteIndex === -1) {
        return;
      }
      prefPopulationCopy.splice(deleteIndex, 1);
      setPrefPopulation(prefPopulationCopy);
    }
  };

  const ShowGraph = () => {
    const isSelected = prefectures.find(
      (prefecture: prefectures) => prefecture.isSelected
    );
    if (isSelected) {
      return <Graph populationdata={prefPopulation} />;
    }
    return <></>;
  };

  const ShowContents = () => {
    if (prefectures.length && prefPopulation.length) {
      return (
        <SMain>
          <CheckBox prefectures={prefectures} onChanges={handleClickCheck} />
          <ShowGraph />
        </SMain>
      );
    }
    return (
      <SMainLoading>
        <SLoadingSpinner>
          <SLoadingTitle>Now Loading</SLoadingTitle>
          <BeatLoader color={'#FFBB7A'} size={40} margin={4} />
        </SLoadingSpinner>
      </SMainLoading>
    );
  };

  return (
    <SContainer>
      <SHeader>
        <STitle>都道府県別人口推移</STitle>
      </SHeader>
      <ShowContents />
    </SContainer>
  );
};

const SMain = styled.main`
  box-sizing: border-box;
  min-height: 100vh;
  padding: 110px 80px;
  @media screen and (max-width: 600px) {
    padding: 90px 10px 50px;
  }
`;

const SMainLoading = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SContainer = styled.div`
  text-align: center;
`;

const SHeader = styled.header`
  background-color: rgba(255, 255, 255, 0.8);
  height: 100px;
  @media screen and (max-width: 600px) {
    height: 80px;
  }
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 1.2vmin);
  color: #333;
  z-index: 100;
`;

const STitle = styled.h1`
  margin: 0;
`;

const SLoadingTitle = styled.h2`
  font-size: 40px;
  background: -webkit-linear-gradient(45deg, #54d0ff, #9f92ff 20%, #ff7689 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SLoadingSpinner = styled.div`
  justify-content: center;
  align-items: center;
`;
