import { LitElement, html, css } from "lit";
import { Task } from "./task.js";

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

  constructor() {
    super();
    this.userName = "Loading...";
    this.avgRuntime = 0;
  }

  _userTask = new Task(this, {
    task: async ([productId], { signal }) => {
      const response = await fetch(`http://example.com/product/${productId}`, {
        signal,
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    },
    args: () => [this.productId],
  });

  render() {
    return this._productTask.render({
      pending: () => html`<p>Loading product...</p>`,
      complete: (product) => html`
        <h1>${product.name}</h1>
        <p>${product.price}</p>
      `,
      error: (e) => html`<p>Error: ${e}</p>`,
    });
  }
}

customElements.define("result-card", ResultCard);
