import React from 'react';
import { shallow } from 'enzyme';

import LatestSha from 'components/LatestSha';
import { RepoContainer } from '../index';

const renderComponent = (props = {}) => shallow(
  <RepoContainer {...props} />
);

const date = '2018-02-05T15:40:23Z';
const name = 'test1';
const sha = '93b02ffd52c069fa21bc0c919405278ab0758ce5';
const mockProps = {
  onLoadGetLatestSha: () => {},
  repo: {
    name,
    latest: {
      date,
      sha,
    },
  },
};

describe('<RepoListContainer />', () => {
  it('renders the name of the repo', () => {
    const renderedComponent = renderComponent(mockProps);
    expect(renderedComponent.contains(name)).toBe(true);
  });

  it('renders a LatestSha', () => {
    const renderedComponent = renderComponent(mockProps);
    expect(renderedComponent.find(LatestSha).length).toEqual(1);
  });

  it('calls onLoadGetLatestSha on mount', () => {
    const mockCallback = jest.fn();
    mockProps.onLoadGetLatestSha = mockCallback;

    renderComponent(mockProps);

    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
