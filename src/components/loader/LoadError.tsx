import styled from 'styled-components';

export const LoadError = () => {
  return (
    <SMainLoading>
      <SLoadingSpinner>
        <SLoadingTitle>Loading Error</SLoadingTitle>
      </SLoadingSpinner>
    </SMainLoading>
  );
};

const SMainLoading = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SLoadingTitle = styled.h2`
  font-size: 40px;
  background: red;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SLoadingSpinner = styled.div`
  justify-content: center;
  align-items: center;
`;
