import { useEffect } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';
import { prefectures } from '../types/index';
import { populations } from '../types/index';
import { series } from '../types/index';

const years: Array<string> = [];

export const Graph = ({
  prefectures,
  populations,
}: {
  prefectures: Array<prefectures>;
  populations: Array<populations>;
}) => {
  const selectedPref = prefectures.filter(
    (prefecture: prefectures) => prefecture.isSelected
  );
  const selectedPrefCode = selectedPref.map(
    (prefecture) => prefecture.prefCode
  );
  const selectedPopulations = populations.filter((population) =>
    selectedPrefCode.includes(population.prefCode)
  );
  const series: Array<series> | any = selectedPopulations.map((population) => {
    const values = population.data.map((data) => data.value);
    const prefName = selectedPref.find(
      (response) => response.prefCode === population.prefCode
    )?.prefName;
    return {
      type: 'line',
      name: prefName,
      data: values,
    };
  });
  useEffect(() => {
    if (populations[0] !== undefined) {
      for (const year of populations[0].data.map((item) => String(item.year))) {
        years.push(year);
      }
    }
  }, [populations]);
  const options: Highcharts.Options = {
    title: {
      text: '都道府県別人口推移',
    },
    yAxis: {
      title: {
        text: '人口(人)',
      },
    },
    xAxis: {
      categories: years,
      title: {
        text: '年度(年度)',
      },
    },
    series: series,
  };

  return (
    <SGraph>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </SGraph>
  );
};

const SGraph = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;
