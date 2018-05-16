import uri from 'urijs';

export const getRepoIndex = (repos, name) =>
  repos.findIndex((repo) => (repo.name === name));

export const getRequestUrl = (url, segmentArray = [], queryObject = {}) => (
  uri(url)
  .segment(segmentArray)
  .query(queryObject)
  .toString()
);
