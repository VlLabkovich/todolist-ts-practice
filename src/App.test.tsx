import React from 'react';
import { render } from '@testing-library/react';
import AppWithReducers from "./AppWithReducers";

test('renders learn react link', () => {
  const { getByText } = render(<AppWithReducers />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});