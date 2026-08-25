import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.reject(new Error('API offline during test')));
  window.scrollTo = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders the upgraded restaurant platform shell', async () => {
  render(<App />);

  expect(screen.getByAltText(/Baloch Restaurant logo/i)).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /Menu/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Delivery/i }).length).toBeGreaterThan(0);
  expect(
    screen.getByRole('heading', {
      name: /A premium Pakistan-focused food destination with dine-in energy and home-delivery convenience./i,
    })
  ).toBeInTheDocument();
});
