const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const USERNAME = "jakubSuranUSM";
const REPO = "VC_codelab_test";

console.log(GITHUB_TOKEN);

export async function getFolders(repoOwner = USERNAME, repoName = REPO) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/`;

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
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
