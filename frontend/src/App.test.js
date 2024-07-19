import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

/*
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Review Us/i); // Adjust the text matcher to match the actual text in your component
  expect(linkElement).toBeInTheDocument();
});
 */