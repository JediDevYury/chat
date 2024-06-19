import { screen } from '@testing-library/react-native';
import InitialPage from "../app/index";
import { renderWithProviders } from './utils';

describe('<InitialPage />', () => {
  it('should render initial page', () => {
    renderWithProviders(<InitialPage/>);

    expect(screen.getByText('Chat App')).toBeTruthy();
  });
})
