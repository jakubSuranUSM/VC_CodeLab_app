import { LitElement, html, css } from "lit";
import { Task } from "@lit/task";
import { getFolders } from "../services/resultService.js";

class ResultCard extends LitElement {
  static styles = css`
    :host {
      display: block;
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
      const response = await fetch(`http://example.com/product/${productId}`, {
        signal,
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    },
    args: () => [],
  });

  render() {
    return this._resultTask.render({
      pending: () => html`<p>Loading product...</p>`,
      complete: (result) => html` <p>${result}</p> `,
      error: (e) => html`<p>Error: ${e}</p>`,
    });
  }
}

customElements.define("result-card", ResultCard);
