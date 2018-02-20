/**
*
* DeployedHash
*
*/

/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';


const DeployedHash = ({
  deployed,
}) => (
  <div>
    Deployed hash coming soon
  </div>
);

DeployedHash.propTypes = {
  deployed: PropTypes.shape().isRequired,
};

DeployedHash.defaultProps = {
  deployed: {},
};

export default DeployedHash;
