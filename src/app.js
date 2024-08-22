import { Router } from "@lit-labs/router";
import { html, css, LitElement } from "lit";
import "./components/challenge-title.js";
import "./components/result-card.js";
import "./components/player-list.js";
import "./components/nav-bar.js";

class App extends LitElement {
  static styles = css`
    .header {
      background-color: rgb(46, 98, 211);
    }
  `;

  _routes = new Router(this, [
    { path: "/", render: () => html`<h1>Home</h1>` },
    { path: "/grade", render: () => html`<player-list></player-list>` },
    { path: "/results", render: () => html`<result-card></result-card>` },
  ]);

  render() {
    return html`
      <header class="header">
        <challenge-title></challenge-title>
        <nav-bar></nav-bar>
      </header>
      <main>${this._routes.outlet()}</main>
    `;
  }
}

customElements.define("app-root", App);
