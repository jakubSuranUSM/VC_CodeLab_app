import { LitElement, html, css } from 'lit';

class ChallengeTitle extends LitElement {
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
    challengeName: { type: String }
  };

  constructor() {
    super();
    this.challengeName = 'Merge Intervals';
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchChallengeName();
  }

  async fetchChallengeName() {
    // TO DO 
  }

  render() {
    return html`
      <h1>${this.challengeName}</h1>
    `;
  } 
}

customElements.define('challenge-title', ChallengeTitle);