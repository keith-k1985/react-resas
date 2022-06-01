// レイアウト
import { FC, memo } from 'react';

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = memo((props) => {
  const { children } = props;
  return <>{children}</>;
});
