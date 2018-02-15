import { fromJS } from 'immutable';
import {
  selectRepoListContainerDomain,
  selectRepos,
  selectSingleRepo,
} from '../selectors';

const mockedState = fromJS({
  repoListContainer: {
    repos: [
      {
        name: 'test1',
      },
      {
        name: 'test2',
      },
    ],
  },
});

describe('RepoListContainer selectors', () => {
  describe('selectRepoListContainerDomain', () => {
    it('selects the entire state', () => {
      const selector = selectRepoListContainerDomain(mockedState);
      const selectedState = fromJS({
        repos: [
          {
            name: 'test1',
          },
          {
            name: 'test2',
          },
        ],
      });

      expect(selector).toEqual(selectedState);
    });
  });

  describe('selectRepos', () => {
    it('selects the repos array', () => {
      const selector = selectRepos();

      const expectedResult = [
        {
          name: 'test1',
        },
        {
          name: 'test2',
        },
      ];

      expect(selector(mockedState)).toEqual(expectedResult);
    });
  });

  describe('selectSingleRepo', () => {
    it('selects the repos array', () => {
      const name = 'test1';
      const selector = selectSingleRepo(name);

      const expectedResult = {
        name: 'test1',
      };

      expect(selector(mockedState)).toEqual(expectedResult);
    });
  });
});
