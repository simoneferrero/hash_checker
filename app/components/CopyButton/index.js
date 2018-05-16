/**
*
* CopyButton
*
*/

import React, { PureComponent } from 'react';
import { string } from 'prop-types';

import { toastr } from 'react-redux-toastr';
import copy from 'clipboard-copy';

import { Button } from 'semantic-ui-react';
import GoClippy from 'react-icons/lib/go/clippy';
import GoCheck from 'react-icons/lib/go/check';

import styles from './styles.css';

export default class CopyButton extends PureComponent {
  state = {
    clicked: false,
  }

  handleClick = () => {
    const {
      shaSubstring,
    } = this.props;

    if (this.iconTimeout) {
      clearTimeout(this.iconTimeout);
    }

    this.setState({
      clicked: true,
    });

    this.iconTimeout = setTimeout(() => (
      this.setState({
        clicked: false,
      })
    ), 2000);

    // TODO: find a better way to handle this
    // tests break without this check
    if (window.getSelection) {
      copy(shaSubstring);
    }
    toastr.info(shaSubstring, 'Copied to clipboard');
  }

  render() {
    const {
      clicked,
    } = this.state;

    return (
      <Button
        className={styles.button}
        color={clicked ? 'green' : 'blue'}
        onClick={this.handleClick}
      >
        { clicked ? <GoCheck /> : <GoClippy /> }
      </Button>
    );
  }
}

CopyButton.propTypes = {
  shaSubstring: string,
};

CopyButton.defaultProps = {
  shaSubstring: '',
};
