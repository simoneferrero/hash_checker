import React from 'react';
import { shallow } from 'enzyme';

import DeployedHash from '../index';

const renderComponent = (props = {}) => shallow(
  <DeployedHash {...props} />
);


describe('<DeployedHash />', () => {
  it('displays a work in progress message', () => {
    const message = 'Deployed hash coming soon';
    const renderedComponent = renderComponent();

    expect(renderedComponent.contains(message)).toBe(true);
  });
});
