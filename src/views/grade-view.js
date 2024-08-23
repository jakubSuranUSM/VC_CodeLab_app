import { html, css, LitElement } from "lit";
import "../components/player-list.js";

class GradeView extends LitElement {
  render() {
    return html`
      <header class="header">
        <challenge-title></challenge-title>
      </header>
      <player-list></player-list>
    `;
  }
}

customElements.define("grade-view", GradeView);
