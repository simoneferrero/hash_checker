import React from 'react';
import { shallow } from 'enzyme';

import Select from 'react-select';

import RepoDetails from '../index';

const renderComponent = (props = {}) => shallow(
  <RepoDetails {...props} />
);

const branches = [
  {
    name: 'testBranch1',
    commit: {
      sha: 'abcd123',
      url: 'testUrl1',
    },
  },
  {
    name: 'testBranch2',
    commit: {
      sha: 'efgh456',
      url: 'testUrl2',
    },
  },
];
const defaultBranch = 'testBranch1';
const name = 'testRepo';
const selectedBranch = {
  value: 'testBranch2',
  label: 'testBranch2',
};

describe('<RepoDetails />', () => {
  it('renders empty div if no props are passed', () => {
    const renderedComponent = renderComponent();

    expect(renderedComponent.contains(name)).toEqual(false);
  });

  it('renders name of repo', () => {
    const renderedComponent = renderComponent({ name });

    expect(renderedComponent.contains(name)).toEqual(true);
  });

  it('doesn\'t render Select component if defaultBranch is not passed', () => {
    const renderedComponent = renderComponent({ branches });

    expect(renderedComponent.find(Select).length).toEqual(0);
  });

  it('renders Select component if defaultBranch and branches are passed', () => {
    const renderedComponent = renderComponent({ branches, defaultBranch });

    expect(renderedComponent.find(Select).length).toEqual(1);
  });

  it('calls onChangeBranch and sets selectedBranch state if Select changes', () => {
    const onChangeBranch = jest.fn();
    const renderedComponent = renderComponent({ branches, defaultBranch, onChangeBranch });

    renderedComponent.find(Select).simulate('change', selectedBranch);

    expect(onChangeBranch).toBeCalled();
    expect(renderedComponent.state('selectedBranch')).toEqual(selectedBranch);
  });

  it('only calls onChangeBranch if selectedBranch is not undefined', () => {
    const onChangeBranch = jest.fn();
    const renderedComponent = renderComponent({ branches, defaultBranch, onChangeBranch });

    renderedComponent.find(Select).simulate('change');

    expect(onChangeBranch).not.toBeCalled();
  });

  it('sets selectedBranch state when it receives default Branch', () => {
    const renderedComponent = renderComponent({ branches, defaultBranch });
    renderedComponent.setProps({ selectedBranch });

    const newState = {
      selectedBranch: {
        value: defaultBranch,
        label: defaultBranch,
      },
    };

    expect(renderedComponent.state()).toEqual(newState);
  });

  it('only sets selectedBranch state if previously undefined', () => {
    const renderedComponent = renderComponent({ branches, defaultBranch });
    renderedComponent.state().selectedBranch = selectedBranch;
    renderedComponent.setProps({ selectedBranch });

    expect(renderedComponent.state('selectedBranch')).toEqual(selectedBranch);
  });

  it('creates an array of options from branches', () => {
    const renderedComponent = renderComponent();
    const optionsFromBranches = renderedComponent.instance().createSelectOptions(branches);
    const selectOptions = [
      {
        value: 'testBranch1',
        label: 'testBranch1',
      },
      {
        value: 'testBranch2',
        label: 'testBranch2',
      },
    ];

    expect(optionsFromBranches).toEqual(selectOptions);
  });
});
