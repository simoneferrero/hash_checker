import { fromJS } from 'immutable';
import {
  selectBranch,
  selectRepoListContainerDomain,
  selectRepos,
  selectRepo,
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
  describe('selectRepoListContainerDomain', () => {
    it('selects the entire state', () => {
      const selector = selectRepoListContainerDomain(mockedState);
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

  describe('selectRepos', () => {
    it('selects the repos array', () => {
      const selector = selectRepos();

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

  describe('selectRepo', () => {
    it('selects the requested repo', () => {
      const name = 'test1';
      const selector = selectRepo(name);

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

    describe('selectBranch', () => {
      it('selects the requested branch', () => {
        const repoName = 'test1';
        const selector = selectBranch(repoName);

        const expectedResult = {
          name: 'testBranch1',
          commit: 'testCommit1',
        };

        expect(selector(mockedState)).toEqual(expectedResult);
      });
    });
  });
});
