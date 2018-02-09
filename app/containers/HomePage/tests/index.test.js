import React from 'react';
import { shallow } from 'enzyme';

import RepoListContainer from 'containers/RepoListContainer';
import HomePage from '../index';

const renderComponent = (props = {}) => shallow(
  <HomePage {...props} />
);

describe('<HomePage />', () => {
  it('renders RepoListContainer', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find(RepoListContainer).length).toEqual(1);
  });
});
