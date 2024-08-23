const USERNAME = "jakubSuranUSM";
const REPO = "VC_codelab_test";

// console.log(GITHUB_TOKEN);

export async function getFolders(
  signal,
  repoOwner = USERNAME,
  repoName = REPO
) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/`;

  const response = await fetch(url, {
    headers: {
      //Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const contents = await response.json();
  const folders = contents
    .filter((item) => item.type === "dir")
    .map((item) => item.path);

  return folders;
}

export async function getFileContent(
  signal,
  repoOwner = USERNAME,
  repoName = REPO,
  filePath = "scores.json"
) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
  console.log(url);

  const response = await fetch(url, {
    headers: {
      // Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const file = await response.json();
  const content = atob(file.content);
  return content;
}

export async function getScores(signal) {
  let content = await getFileContent(signal, USERNAME, REPO, "scores.json");
  content = JSON.parse(content);

  const keys = Object.keys(content);
  let scores = keys.map((key) => ({
    name: key,
    scores: content[key].scores,
    avgScore: content[key].avg_score,
  }));

  return scores;
}

export async function getRepositories(signal, owner = "VC-CodeLabs") {
  const url = `https://api.github.com/users/${owner}/repos`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const repositories = await response.json();
  return repositories;
  // const repositoryNames = repositories.map((repo) => repo.name);

  // return repositoryNames;
}

export async function upload(
  content,
  path = "scores.json",
  message = "update scores"
) {
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  const existingFile = await (
    await fetch(
      `https://api.github.com/repos/${USERNAME}/${REPO}/contents/${path}`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      }
    )
  ).json();

  const response = await fetch(
    `https://api.github.com/repos/${USERNAME}/${REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        message: message,
        content: btoa(content),
        sha: existingFile.sha,
      }),
    }
  );

  if (!response.ok) {
    throw response;
  }

  return response.json();
}
