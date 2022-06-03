import { useState, useEffect, FC } from 'react';
import { CheckBox } from '../checkbox/CheckBox';
import { Graph } from '../Graph/Graph';
import axios from 'axios';
import styled from 'styled-components';
import { Loader } from '../loader/Loader';
import { LoadError } from '../loader/LoadError';

export const Home: FC = () => {
  // 都道府県情報
  const [prefectures, setPreFectures] = useState<{
    message: null;
    result: {
      prefCode: number;
      prefName: string;
      check: boolean;
    }[];
  } | null>(null);

  // 人口情報,年
  const [prefPopulation, setPrefPopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // マウント時，情報取得
  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: { 'X-API-KEY': `${process.env.REACT_APP_API_KEY}` },
      })
      .then((res) => {
        setPreFectures(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
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

  return (
    <>
      <div>
        {error ? (
          <LoadError />
        ) : loading ? (
          <Loader />
        ) : (
          <>
            <SContainer>
              <SHeader>
                <STitle>都道府県別人口推移</STitle>
              </SHeader>
              <SMain>
                {prefectures && (
                  <CheckBox
                    prefectures={prefectures.result}
                    setPreFectures={setPreFectures}
                    onChanges={handleClickCheck}
                  />
                )}
                <Graph populationdata={prefPopulation} />
              </SMain>
            </SContainer>
          </>
        )}
      </div>
    </>
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
