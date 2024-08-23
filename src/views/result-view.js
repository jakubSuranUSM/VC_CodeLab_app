import { html, css, LitElement } from "lit";
import "../components/result-card.js";

export class ResultView extends LitElement {
  static styles = css``;

  render() {
    return html`
      <header class="header">
        <challenge-title></challenge-title>
      </header>
      <result-card></result-card>
    `;
  }
}

customElements.define("result-view", ResultView);
