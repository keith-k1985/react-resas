/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosRequestConfig } from 'axios';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

type Props = {
  // 都道府県
  prefectures:
    | {
        prefCode: number;
        prefName: string;
      }[];
  setPreFectures: any;
};

export const ClearButton: FC<Props> = () => {
  const [prefectures, setPreFectures] = useState([]);

  const resasConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.REACT_APP_API_KEY || '',
    },
  };
  const prefUrl: string =
    'https://opendata.resas-portal.go.jp/api/v1/prefectures';
  const fetchPreFecture = () => {
    axios.get(prefUrl, resasConfig).then((response) => {
      if (response.data.result) {
        const prefList = response.data.result.map(
          (item: { prefName: string; prefCode: number; check: boolean }) => {
            return {
              prefCode: item.prefCode,
              prefName: item.prefName,
              check: false,
            };
          }
        );
        setPreFectures(prefList);
      }
    });
  };
  const fetchCompositions = (prefectures: any) => {
    const compositionUrls = [];
    for (let i = 0; i < prefectures.length; i++) {
      const prefCode = i + 1;
      compositionUrls.push({
        prefCode: prefCode,
        url:
          'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=' +
          prefCode,
      });
    }
  };

  useEffect(() => {
    fetchPreFecture();
  }, []);

  useEffect(() => {
    fetchCompositions(prefectures);
  }, []);
  return (
    <SButton className='clear' onClick={fetchPreFecture}>
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