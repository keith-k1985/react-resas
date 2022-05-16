import styled from 'styled-components';
import { prefectures } from './types/index';

export const PrefecturesItem = ({
  prefecture,
  togglePref,
}: {
  prefecture: prefectures;
  togglePref: any;
}) => {
  return (
    <SLabel>
      <SInput
        type='checkbox'
        checked={prefecture.isSelected}
        id={prefecture.prefName}
        onChange={togglePref}
      />
      {prefecture.prefName}
    </SLabel>
  );
};

const SLabel = styled.label`
  cursor: pointer;
  user-select: none;
`;

const SInput = styled.input`
  cursor: pointer;
  margin-right: 10px;
`;
