import {
  arrayOf,
  shape,
  string,
} from 'prop-types';

export const commitType = shape({
  sha: string.isRequired,
  url: string.isRequired,
});

export const branchType = shape({
  commit: commitType.isRequired,
  name: string.isRequired,
});

export const latestType = shape({
  date: string,
  sha: string,
});

export const repoType = shape({
  branches: arrayOf(
    branchType,
  ).isRequired,
  defaultBranch: string.isRequired,
  error: string,
  name: string.isRequired,
  latest: latestType,
  selectedBranch: string.isRequired,
});
