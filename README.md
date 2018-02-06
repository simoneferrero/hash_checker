# SHA checker

A simple UI to check the latest git SHA on selected repositories/branches against those deployed to an environment (using a monitoring service).

### Quick start

To run this project locally, run the following commands:

```
$ git clone https://github.com/simoneferrero/sha_checker.git
$ npm install
$ npm start
```
If you wish to access private repositories, you will need to create a token to authenticate on Github.
- Go to https://github.com/settings/tokens
- Click on 'Generate new token'
- Save the token securely as it will no longer be available after navigating away from the page

And finally, add the following to `app/utils/config.js`:

```
export const GITHUB_URL = 'https://api.github.com/repos/{company_name}'; // required
export const GITHUB_API_TOKEN = '{your_token}'; // if empty/null, no authentication will be used
export const DEFAULT_BRANCH = '{repo_default_branch}'; // if empty/null, default will be master
```
