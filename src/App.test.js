import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.reject(new Error('API offline during test')));
  window.scrollTo = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders the Baloch Hospitality shell', async () => {
  render(<App />);

  expect(screen.getByAltText(/Baloch Hospitality logo/i)).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /Menu/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Delivery/i }).length).toBeGreaterThan(0);
  expect(
    screen.getByRole('heading', {
      name: /Stay\. Dine\. Experience\./i,
    })
  ).toBeInTheDocument();
});
