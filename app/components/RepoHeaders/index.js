/**
*
* RepoHeaders
*
*/

import React from 'react';
import styles from './styles.css';

const RepoHeaders = () => {
  const headers = [
    'repo',
    'latest',
    'deployed',
  ];

  return (
    <thead className={styles.repoHeaders}>
      <tr>
        { headers.map((header) => <th key={header}>{ header.toUpperCase() }</th>) }
      </tr>
    </thead>
  );
};

export default RepoHeaders;
