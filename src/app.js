import { html, css, LitElement } from "lit";
import "./components/challenge-title.js";
import "./components/result-card.js";

class App extends LitElement {
  static styles = css`
    .header {
      background-color: rgb(46, 98, 211);
    }
  `;

  render() {
    return html`
      <header class="header">
        <challenge-title></challenge-title>
      </header>
      <result-card></result-card>
    `;
  }
}

customElements.define("app-root", App);
