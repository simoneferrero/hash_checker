import React from 'react';
import { shallow } from 'enzyme';

import RepoHeaders from '../index';

const renderComponent = (props = {}) => shallow(
  <RepoHeaders {...props} />
);

const header1 = <th>REPO</th>;
const header2 = <th>LATEST</th>;
const header3 = <th>DEPLOYED</th>;

describe('<RepoHeaders />', () => {
  it('renders a thead', () => {
    const renderedComponent = renderComponent();

    expect(renderedComponent.find('thead').length).toEqual(1);
  });

  it('renders a row', () => {
    const renderedComponent = renderComponent();

    expect(renderedComponent.find('tr').length).toEqual(1);
  });

  it('renders all headers', () => {
    const renderedComponent = renderComponent();

    expect(renderedComponent.contains(header1)).toBe(true);
    expect(renderedComponent.contains(header2)).toBe(true);
    expect(renderedComponent.contains(header3)).toBe(true);
  });
});
