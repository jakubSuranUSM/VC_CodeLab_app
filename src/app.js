import { html, css, LitElement } from "lit";
import "./components/challenge-title.js";
import "./components/result-card.js";

class App extends LitElement {
  static styles = css``;

  render() {
    return html` <challenge-title></challenge-title> `;
  }
}

customElements.define("app-root", App);
