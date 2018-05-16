import {
  getRepoIndex,
  getRequestUrl,
} from '../helpers';

describe('helpers', () => {
  describe('getRepoIndex', () => {
    const repos = [
      {
        name: 'repo1',
      },
      {
        name: 'repo2',
      },
    ];

    it('returns correct index', () => {
      const repoIndex = getRepoIndex(repos, 'repo2');
      const expectedRepoIndex = 1;

      expect(repoIndex).toEqual(expectedRepoIndex);
    });
  });

  describe('getRequestUrl', () => {
    const url = 'http://test';
    const segment = ['segment1', 'segment2'];
    const query = {
      query1: 'test1',
      query2: 'test2',
    };

    it('returns correct url', () => {
      const requestUrl = getRequestUrl(
        url,
      );
      const mockRequestUrl = 'http://test/';

      expect(requestUrl).toEqual(mockRequestUrl);
    });

    it('returns correct url with segment', () => {
      const requestUrl = getRequestUrl(
        url,
        segment,
      );
      const mockRequestUrl = 'http://test/segment1/segment2';

      expect(requestUrl).toEqual(mockRequestUrl);
    });

    it('returns correct url with segment and query', () => {
      const requestUrl = getRequestUrl(
        url,
        segment,
        query,
      );
      const mockRequestUrl = 'http://test/segment1/segment2?query1=test1&query2=test2';

      expect(requestUrl).toEqual(mockRequestUrl);
    });
  });
});
