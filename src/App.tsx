import { useState, useEffect } from 'react';
import { Prefectures } from './Prefectures';
import { Graph } from './Graph';
import axios, { AxiosRequestConfig } from 'axios';
import styled from 'styled-components';
import { prefectures } from './types/index';
import { populations } from './types/index';
import { compositionUrl } from './types/index';
import BeatLoader from 'react-spinners/BeatLoader';

export const App = () => {
  const [prefectures, setPrefectures] = useState<Array<prefectures>>([]);
  const [populations, setPopulations] = useState<Array<populations>>([]);
  const resasConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.REACT_APP_RESAS_API_KEY || '',
    },
  };
  const prefUrl: string =
    'https://opendata.resas-portal.go.jp/api/v1/prefectures';
  const fetchPrefecture = async () => {
    await axios.get(prefUrl, resasConfig).then((response) => {
      if (response.data.result) {
        const prefList: Array<prefectures> = response.data.result.map(
          (item: prefectures) => {
            return {
              prefCode: item.prefCode,
              prefName: item.prefName,
              isSelected: false,
            };
          }
        );
        setPrefectures(prefList);
      }
    });
  };
  const fetchCompositions = async (prefectures: Array<prefectures>) => {
    const compositionUrls: Array<compositionUrl> = [];
    for (let i = 0; i < prefectures.length; i++) {
      const prefCode = i + 1;
      compositionUrls.push({
        prefCode: prefCode,
        url:
          'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=' +
          prefCode,
      });
    }
    const compositions: Array<populations> = [];
    for (let compositionUrl of compositionUrls) {
      await axios.get(compositionUrl.url, resasConfig).then((response) => {
        compositions.push({
          prefCode: compositionUrl.prefCode,
          data: response.data.result.data[0].data,
        });
      });
    }
    setPopulations(compositions);
  };

  useEffect(() => {
    fetchPrefecture();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchCompositions(prefectures);
    // eslint-disable-next-line
  }, [prefectures]);

  const ShowGraph = () => {
    const isSelected = prefectures.find(
      (prefecture: prefectures) => prefecture.isSelected
    );
    if (isSelected) {
      return <Graph prefectures={prefectures} populations={populations} />;
    }
    return <></>;
  };

  const ShowContents = () => {
    if (prefectures.length && populations.length) {
      return (
        <SMain>
          <Prefectures
            prefectures={prefectures}
            setPrefectures={setPrefectures}
          />
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
