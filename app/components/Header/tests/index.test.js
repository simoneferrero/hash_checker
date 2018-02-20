import React from 'react';
import { shallow } from 'enzyme';

import Header from '../index';

const renderComponent = (props = {}) => shallow(
  <Header {...props} />
);

const title = <h2>HASH CHECKER</h2>;

describe('<Header />', () => {
  it('renders a title', () => {
    const renderedComponent = renderComponent();

    expect(renderedComponent.contains(title)).toBe(true);
  });
});
