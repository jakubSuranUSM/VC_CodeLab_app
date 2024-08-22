import { html, css, LitElement } from "lit";

class NavBar extends LitElement {
  static styles = css`
    nav {
      background-color: #333;
      color: white;
      padding: 10px;
    }
    ul {
      display: flex;
      justify-content: space-around;
      list-style: none;
      padding: 0;
    }
    a {
      color: white;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/grade">Grade</a></li>
          <li><a href="/results">Results</a></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define("nav-bar", NavBar);
