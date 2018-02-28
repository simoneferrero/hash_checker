/**
*
* RepoDetails
*
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';

import styles from './styles.css';

class RepoDetails extends Component {
  state = {
    selectedBranch: undefined,
  }

  componentWillReceiveProps = (nextProps) => {
    if (!this.state.selectedBranch) {
      this.setState({
        selectedBranch: nextProps.defaultBranch,
      });
    }
  }

  handleChangeBranch = (selectedBranch) => {
    this.setState({
      selectedBranch,
    });
    this.props.onChangeBranch(this.props.name, selectedBranch.value);
  }

  render() {
    const {
      selectedBranch,
    } = this.state;
    const {
      branches,
      defaultBranch,
      name,
    } = this.props;

    const options = branches.map((branch) => (
      {
        value: branch.name,
        label: branch.name,
      }
    ));

    const selectBranches = defaultBranch && (
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
        { selectBranches }
      </div>
    );
  }
}

RepoDetails.propTypes = {
  branches: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      commit: PropTypes.shape({
        sha: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  defaultBranch: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChangeBranch: PropTypes.func.isRequired,
};

export default RepoDetails;
