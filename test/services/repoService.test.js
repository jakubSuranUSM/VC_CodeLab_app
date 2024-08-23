import fetch from "node-fetch";
import {
  getFolders,
  getFileContent,
  getRepositories,
  upload,
} from "../../src/services/repoService";

jest.mock("node-fetch", () => jest.fn());

describe("getFolders", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("should return a list of folder paths", async () => {
    const mockResponse = ["finn_michaud", "jakub_suran"];

    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const folders = await getFolders();
    expect(folders).toEqual(["finn_michaud", "jakub_suran"]);
  });

  //   test("should throw an error if the API call fails", async () => {
  //     fetch.mockResolvedValue({
  //       ok: false,
  //       statusText: "Not Found",
  //     });

  //     await expect(getFolders()).rejects.toThrow("GitHub API error: Not Found");
  //   });
});

describe("getFileContent", () => {
  test("should return the content of a file", async () => {
    const mockResponse = "This is the content of the file";

    fetch.mockResolvedValue({
      ok: true,
      text: async () => mockResponse,
    });

    await getFileContent();
  });
});

describe("getRepositories", () => {
  test("should return all repositories for a user", async () => {
    const mockResponse = "This is the content of the file";

    fetch.mockResolvedValue({
      ok: true,
      text: async () => mockResponse,
    });

    const repos = await getRepositories();
    console.log(repos);
  });
});

describe("upload", () => {
  // TODO: skip for now before the implementation of getting token from GitHub OAuth is implemented
  test.skip("should upload a file to github", async () => {
    const mockResponse = "This is the content of the file";

    fetch.mockResolvedValue({
      ok: true,
      text: async () => mockResponse,
    });
    const body = await upload(JSON.stringify({ update: true }), "test.json");
    console.log(body);
  });
});
