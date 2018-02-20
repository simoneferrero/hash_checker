# SHA checker

A simple UI to check the latest git SHA on selected repositories/branches against those deployed to an environment (using a monitoring service).

### Quick start

To run this project locally, run the following commands:

```
$ git clone https://github.com/simoneferrero/hash_checker.git
$ npm install
$ npm start
```
If you wish to access private repositories, you will need to create a token to authenticate on Github.
- Go to https://github.com/settings/tokens
- Click on 'Generate new token'
- Save the token securely as it will no longer be available after navigating away from the page

And finally, add the following to `app/utils/config.js`:

```
export const GITHUB_API_URL = 'https://api.github.com/'; // required
export const GITHUB_API_TOKEN = '{your_token}'; // if empty/null, no authentication will be used

export const GIT_COMPANY_NAME = '{your_name/company_name}'; // required
export const GIT_DEFAULT_BRANCH = '{repo_default_branch}'; // if empty/null, default will be master
export const GIT_REPOS = []; // array of repo names to check SHA from, as strings
```
