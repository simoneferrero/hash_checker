import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';

import Header from 'components/Header';

import App from '../index';

const renderComponent = (props = {}) => shallow(
  <App {...props} />
);

describe('<App />', () => {
  it('renders some routes', () => {
    const renderedComponent = renderComponent();

    expect(renderedComponent.find(Route).length).not.toBe(0);
  });

  it('renders a header', () => {
    const renderedComponent = renderComponent();

    expect(renderedComponent.find(Header).length).toBe(1);
  });
});
