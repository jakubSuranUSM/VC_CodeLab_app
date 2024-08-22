import { html, css, LitElement } from "lit";

class NavBar extends LitElement {
  static styles = css`
    /* Add your navbar styles here */
  `;

  render() {
    return html`
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define("nav-bar", NavBar);
