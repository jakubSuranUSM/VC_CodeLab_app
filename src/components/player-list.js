import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { getFolders } from '../services/resultService';

class PlayerList extends LitElement {
  static styles = css`
    :host {
    display: block;
    padding: 16px;
    text-align: center;
    font-family: Arial, sans-serif;
    }

    h1 {
      font-size: 2em;
      margin: 50px 0;
    }

    .run-time {
      width: 30px;
      margin-right: 5px;
    }

    .player {
      margin-top: 20px; 
      margin-bottom: 10px;
    }
  `;

  static properties = {
    players: { type: Array }
  };

  constructor() {
    super();
    this.players = ["Loading..."];
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchPlayers();
  }

  async fetchPlayers() {
    try {
      const data = await getFolders();
      this.players = data;
      console.log(this.players);
    } catch (error) {
      console.error('failed to get player names:', error);
    }
  } 

  render() {
    return html`
      <div>
        ${this.players.map(player => 
          html`
          <div class="player-container">
            <div class="player">
              ${player}
            </div>
            <div class="input-fields">
              ${[...Array(10).keys()].map(i => 
                html`<input type="text" class="run-time" id="${player}-time${i+1}" name="${player}-time${i+1}">`
                )}
              <button>Submit</button>
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('player-list', PlayerList);
