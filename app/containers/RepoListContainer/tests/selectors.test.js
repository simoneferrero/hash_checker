import { fromJS } from 'immutable';
import {
  getSelectedBranch,
  getRepoListContainer,
  getAllRepos,
  getRepo,
} from '../selectors';

const mockedState = fromJS({
  repoListContainer: {
    repos: [
      {
        name: 'test1',
        branches: [
          {
            name: 'testBranch1',
            commit: 'testCommit1',
          },
          {
            name: 'testBranch2',
            commit: 'testCommit2',
          },
        ],
        selectedBranch: 'testBranch1',
      },
      {
        name: 'test2',
        branches: [
          {
            name: 'testBranch1',
            commit: 'testCommit3',
          },
          {
            name: 'testBranch2',
            commit: 'testCommit4',
          },
        ],
        selectedBranch: 'testBranch2',
      },
    ],
  },
});

describe('RepoListContainer selectors', () => {
  describe('getRepoListContainer', () => {
    it('selects the entire state', () => {
      const selector = getRepoListContainer(mockedState);
      const selectedState = fromJS({
        repos: [
          {
            name: 'test1',
            branches: [
              {
                name: 'testBranch1',
                commit: 'testCommit1',
              },
              {
                name: 'testBranch2',
                commit: 'testCommit2',
              },
            ],
            selectedBranch: 'testBranch1',
          },
          {
            name: 'test2',
            branches: [
              {
                name: 'testBranch1',
                commit: 'testCommit3',
              },
              {
                name: 'testBranch2',
                commit: 'testCommit4',
              },
            ],
            selectedBranch: 'testBranch2',
          },
        ],
      });

      expect(selector).toEqual(selectedState);
    });
  });

  describe('getAllRepos', () => {
    it('selects the repos array', () => {
      const selector = getAllRepos();

      const expectedResult = [
        {
          name: 'test1',
          branches: [
            {
              name: 'testBranch1',
              commit: 'testCommit1',
            },
            {
              name: 'testBranch2',
              commit: 'testCommit2',
            },
          ],
          selectedBranch: 'testBranch1',
        },
        {
          name: 'test2',
          branches: [
            {
              name: 'testBranch1',
              commit: 'testCommit3',
            },
            {
              name: 'testBranch2',
              commit: 'testCommit4',
            },
          ],
          selectedBranch: 'testBranch2',
        },
      ];

      expect(selector(mockedState)).toEqual(expectedResult);
    });
  });

  describe('getRepo', () => {
    it('selects the requested repo', () => {
      const name = 'test1';
      const selector = getRepo(name);

      const expectedResult = {
        name: 'test1',
        branches: [
          {
            name: 'testBranch1',
            commit: 'testCommit1',
          },
          {
            name: 'testBranch2',
            commit: 'testCommit2',
          },
        ],
        selectedBranch: 'testBranch1',
      };

      expect(selector(mockedState)).toEqual(expectedResult);
    });

    describe('getSelectedBranch', () => {
      it('selects the requested branch', () => {
        const repoName = 'test1';
        const selector = getSelectedBranch(repoName);

        const expectedResult = {
          name: 'testBranch1',
          commit: 'testCommit1',
        };

        expect(selector(mockedState)).toEqual(expectedResult);
      });
    });
  });
});
