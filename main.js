import fetch from "node-fetch";
import dotenv from "dotenv";

// Replace these with your GitHub token, username, and repository name
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const USERNAME = "jakubSuranUSM";
const REPO = "VC_codelab_test";

async function getFolders(repoOwner, repoName) {
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

const folders = await getFolders(USERNAME, REPO);
console.log("Folders in the repository:", folders);

const DIRECTORY_PATH = folders[0];

async function getFilesInDirectory(repoOwner, repoName, directoryPath) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${directoryPath}`;

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
  const files = contents
    .filter((item) => item.type === "file")
    .map((item) => item.path);

  return files;
}

const files = await getFilesInDirectory(USERNAME, REPO, DIRECTORY_PATH);
console.log(`Files in the directory '${DIRECTORY_PATH}':`, files);

const FILE_PATH = files[0];

async function getFileContent(repoOwner, repoName, filePath) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
  console.log(url);

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const file = await response.json();
  const content = Buffer.from(file.content, "base64").toString("utf-8");

  return content;
}

getFileContent(USERNAME, REPO, FILE_PATH)
  .then((content) => {
    console.log(`Content of the file '${FILE_PATH}':\n`, content);
  })
  .catch((error) => {
    console.error("Error fetching file content:", error.message);
  });
