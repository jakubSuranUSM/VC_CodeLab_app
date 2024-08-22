import { html, css, LitElement } from "lit";
import "./components/challenge-title.js";
import "./components/result-card.js";
import "./components/player-list.js";

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
      <player-list></player-list>

      <!--<result-card></result-card>-->
    `;
  }
}

customElements.define("app-root", App);
