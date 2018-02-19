/**
*
* DeployedSha
*
*/

/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';


const DeployedSha = ({
  deployed,
}) => (
  <div>
    This is the deployed sha
  </div>
);

DeployedSha.propTypes = {
  deployed: PropTypes.shape().isRequired,
};

DeployedSha.defaultProps = {
  deployed: {},
};

export default DeployedSha;
