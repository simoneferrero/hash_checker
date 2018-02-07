import React from 'react';
import { shallow } from 'enzyme';

import RepoList from 'components/RepoList';
import { RepoListContainer } from '../index';

const renderComponent = (props = {}) => shallow(
  <RepoListContainer {...props} />
);

describe('<RepoListContainer />', () => {
  const repos = [
    {
      name: 'test1',
    },
    {
      name: 'test2',
    },
  ];

  it('renders RepoList component', () => {
    const renderedComponent = renderComponent({ repos });
    expect(renderedComponent.contains(<RepoList repos={repos} />)).toEqual(true);
  });

  it('provides empty repo array props if not specified', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.contains(<RepoList repos={[]} />)).toEqual(true);
  });
});
