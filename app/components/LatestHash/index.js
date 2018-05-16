/**
*
* LatestHash
*
*/

import React, { PureComponent } from 'react';

import CopyButton from 'components/CopyButton';

import {
  commitType,
} from 'types';

import styles from './styles.css';

export default class LatestHash extends PureComponent {
  state = {
    iconVisible: false,
  }

  handleHover = () => {
    this.setState({
      iconVisible: !this.state.iconVisible,
    });
  }

  render() {
    const {
      sha,
    } = this.props.branch;

    const shaSubstring = sha && sha.substring(0, 7);

    return (
      <div className={styles.latestHash} >
        <div>{ shaSubstring }</div>
        <CopyButton shaSubstring={shaSubstring} />
      </div>
    );
  }
}

LatestHash.propTypes = {
  branch: commitType.isRequired,
};
