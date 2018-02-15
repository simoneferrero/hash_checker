import uri from 'urijs';

export const getRequestUrl = (url, segmentArray = [], queryObject = {}) => (
  uri(url)
  .segment(segmentArray)
  .query(queryObject)
  .toString()
);
