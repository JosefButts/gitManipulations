const { Octokit } = require("@octokit/core");
// https://github.com/octokit/core.js#readme
// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const githubDeleteToken = process.env.githubDeleteToken;
const githubOwner = process.env.githubOwner;

const octokit = new Octokit({ auth: githubDeleteToken });

const remover = async (repo) => {
  try {
    const res = await octokit.request(`DELETE /repos/${githubOwner}/${repo}`, {
      owner: githubOwner,
      repo
    })
   
    console.log(`res, ${repo} has been removed`);
  } catch (error) {
    console.log(`Error deleting repo: ${repo}`, error)
  }
}


const runDeletes = async (repos) => {
  const repoDeletePromises = repos.map(repo => {
    return remover(repo);
  });
  await Promise.all(repoDeletePromises);
}

const getRepos = async () => {
  try {
    return await octokit.request(`GET /repos/${githubOwner}/`, {
      owner: githubOwner
    });
  } catch (error) {
    console.log(error);
  }
  

}
// getRepos()
const getReposBySomeCriteria = () => {
  const repos = require('./repos');
  const repoNames = repos.map((repo)=>{
   if (repo.git_url.includes('000')) return repo.name
 })
console.log("1111111111111", repoNames);
return repoNames;
}

// runDeletes(repoNames);

