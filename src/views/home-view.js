import { html, css, LitElement } from "lit";
import { Task } from "@lit/task";
import { getRepositories } from "../services/repoService";

class HomeView extends LitElement {
  static styles = css``;

  _repoTask = new Task(this, {
    task: async ([], { signal }) => {
      let repos = await getRepositories(signal);
      return repos;
    },
    args: () => [],
  });

  render() {
    return this._repoTask.render({
      pending: () => html`<p>Loading repos...</p>`,
      complete: (result) => {
        result = result.map((repo) => {
          return {
            name: repo.name,
            updated_at: new Date(repo.updated_at),
            svn_url: repo.svn_url,
          };
        });
        result.sort((a, b) => b.updated_at - a.updated_at);
        return html`<ul>
          ${result.map(
            (repo) =>
              html`<li>
                <a href=${repo.svn_url} target="_blank">${repo.name}</a>
              </li>`
          )}
        </ul>`;
      },
      error: (e) => html`<p>Error: ${e}</p>`,
    });
  }
}

customElements.define("home-view", HomeView);
