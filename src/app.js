import { Router } from "@lit-labs/router";
import { html, css, LitElement } from "lit";
import "./components/challenge-title.js";
import "./components/result-card.js";
import "./components/nav-bar.js";
import "./views/home-view.js";
import "./views/grade-view.js";
import "./views/result-view.js";

class App extends LitElement {
  static styles = css`
    .header {
      background-color: rgb(46, 98, 211);
    }
  `;

  _routes = new Router(this, [
    { path: "/", render: () => html`<home-view></home-view>` },
    { path: "/grade", render: () => html`<grade-view></grade-view>` },
    { path: "/results", render: () => html`<result-view></result-view>` },
  ]);

  render() {
    return html`
      <nav-bar></nav-bar>
      <main>${this._routes.outlet()}</main>
    `;
  }
}

customElements.define("app-root", App);
