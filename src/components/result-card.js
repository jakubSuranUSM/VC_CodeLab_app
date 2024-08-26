import { LitElement, html, css } from "lit";
import { Task } from "@lit/task";
import { getScores } from "../services/repoService.js";
import "./podium-element.js";

class ResultCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 60%;
      margin: 0 auto;
      padding: 16px;
      text-align: center;
      font-family: Atrial, sans-serif;
    }

    h1 {
      font-size: 2em;
      margin: 20px 0;
    }
  `;

  static properties = {
    userName: { type: String },
    avgRuntime: { type: Number },
  };

  _resultTask = new Task(this, {
    task: async ([], { signal }) => {
      let scores = await getScores(signal);
      scores.sort((a, b) => a.avgScore - b.avgScore);
      return scores;
    },
    args: () => [],
  });

  render() {
    return this._resultTask.render({
      pending: () => html`<p>Loading product...</p>`,
      complete: (result) => {
        console.log(result);
        // TODO: error handling if there are not enough results
        return html`<podium-element
            .firstPlace=${result[0]}
            .secondPlace=${result[1]}
            .thirdPlace=${result[2]}
          ></podium-element>
          <!-- TODO: display only 4th and below -->
          ${result.map(
            (r, index) =>
              html`<p>
                <strong>${index + 4}th:</strong> ${r.name} - ${r.avgScore}
              </p>`
          )}`;
      },
      error: (e) => html`<p>Error: ${e}</p>`,
    });
  }
}

customElements.define("result-card", ResultCard);
