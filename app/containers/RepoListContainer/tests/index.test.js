import React from 'react';
import { shallow } from 'enzyme';

import RepoContainer from 'containers/RepoContainer';
import RepoHeaders from 'components/RepoHeaders';
import { RepoListContainer } from '../index';

const renderComponent = (props = {}) => shallow(
  <RepoListContainer {...props} />
);

describe('<RepoListContainer />', () => {
  const repos = [
    {
      branches: [],
      defaultBranch: 'staging',
      name: 'test1',
      selectedBranch: 'staging',
    },
    {
      branches: [],
      defaultBranch: 'staging',
      name: 'test2',
      selectedBranch: 'staging',
    },
  ];

  it('renders RepoListContainer if no props are passed', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find(RepoContainer)).toBeDefined();
  });

  it('renders a RepoContainer for each repo passed to props', () => {
    const renderedComponent = renderComponent({ repos });
    expect(renderedComponent.find(RepoContainer).length).toEqual(2);
  });

  it('renders RepoHeaders', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find(RepoHeaders).length).toEqual(1);
  });
});
