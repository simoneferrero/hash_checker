import React from 'react';
import { shallow } from 'enzyme';

import LatestHash from 'components/LatestHash';
import DeployedHash from 'components/DeployedHash';
import {
  RepoContainer,
} from '../index';

const renderComponent = (props = {}) => shallow(
  <RepoContainer {...props} />
);

const date = '2018-02-05T15:40:23Z';
const name = 'test1';
const sha = '93b02ffd52c069fa21bc0c919405278ab0758ce5';
const branches = [
  {
    name: 'staging',
    commit: {
      sha: '0246991e7e11b3ef20e7d43a6ca6d32b4fb42059',
      url: 'testUrl',
    },
  },
];
const mockProps = {
  name,
  onLoadGetLatestHash: () => {},
  onLoadGetRepoBranches: () => {},
  onLoadGetRepoDetails: () => {},
  repo: {
    name,
    branches,
    latest: {
      date,
      sha,
    },
  },
};

describe('<RepoContainer />', () => {
  it('renders the name of the repo', () => {
    const renderedComponent = renderComponent(mockProps);
    expect(renderedComponent.contains(name)).toBe(true);
  });

  it('renders a LatestHash', () => {
    const renderedComponent = renderComponent(mockProps);
    expect(renderedComponent.find(LatestHash).length).toEqual(1);
  });

  it('renders a DeployedHash', () => {
    const renderedComponent = renderComponent(mockProps);
    expect(renderedComponent.find(DeployedHash).length).toEqual(1);
  });

  it('calls onLoadGetLatestHash on mount', () => {
    const mockCallback = jest.fn();
    mockProps.onLoadGetLatestHash = mockCallback;

    renderComponent(mockProps);

    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it('calls onLoadGetRepoDetails on mount', () => {
    const mockCallback = jest.fn();
    mockProps.onLoadGetRepoDetails = mockCallback;

    renderComponent(mockProps);

    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it('calls onLoadGetRepoBranches on mount', () => {
    const mockCallback = jest.fn();
    mockProps.onLoadGetRepoBranches = mockCallback;

    renderComponent(mockProps);

    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
