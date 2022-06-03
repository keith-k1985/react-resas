import styled from 'styled-components';

export const Loader = () => {
  return (
    <SMainLoading>
      <SLoadingSpinner>
        <SLoadingTitle>Now Loading...</SLoadingTitle>
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
  background: -webkit-linear-gradient(45deg, #54d0ff, #9f92ff 20%, #ff7689 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SLoadingSpinner = styled.div`
  justify-content: center;
  align-items: center;
`;
