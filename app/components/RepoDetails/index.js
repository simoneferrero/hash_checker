/**
*
* RepoDetails
*
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';

import {
  branchType,
} from 'types';

import styles from './styles.css';

class RepoDetails extends Component {
  state = {
    selectedBranch: undefined,
  }

  componentWillReceiveProps = (nextProps) => {
    if (!this.state.selectedBranch) {
      this.setState({
        selectedBranch: {
          value: nextProps.defaultBranch,
          label: nextProps.defaultBranch,
        },
      });
    }
  }

  handleChangeBranch = (selectedBranch) => {
    this.setState({
      selectedBranch,
    });

    if (selectedBranch) {
      this.props.onChangeBranch(this.props.name, selectedBranch.value);
    }
  }

  createSelectOptions = (branches) => branches.map((branch) => (
    {
      value: branch.name,
      label: branch.name,
    }
  ))

  render() {
    const {
      selectedBranch,
    } = this.state;
    const {
      branches,
      defaultBranch,
      name,
    } = this.props;

    const options = this.createSelectOptions(branches);

    const getSelectedBranches = defaultBranch && (
      <Select
        name="selectedBranch"
        value={selectedBranch}
        onChange={this.handleChangeBranch}
        options={options}
      />
    );

    return (
      <div className={styles.repoDetails}>
        <h4>{ name }</h4>
        { getSelectedBranches }
      </div>
    );
  }
}

RepoDetails.propTypes = {
  branches: PropTypes.arrayOf(
    branchType,
  ).isRequired,
  defaultBranch: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChangeBranch: PropTypes.func.isRequired,
};

RepoDetails.defaultProps = {
  branches: [],
  name: '',
  onChangeBranch: () => {},
};

export default RepoDetails;
