import tamaguiConfig from "../tamagui.config";
import { TamaguiProvider } from "tamagui";
import { render } from '@testing-library/react-native';
import { ReactElement, ReactNode } from 'react';

export const renderWithProviders = (
 tree: ReactElement,
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
   <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
  );
  return { ...render(tree, { wrapper: Wrapper }) };
};
