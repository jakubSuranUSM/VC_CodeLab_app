import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { getFolders, upload } from '../services/repoService';

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
  
  handlePlayerSubmit(player) {
    const playerData = {};
    playerData[player] = []

    for (let i = 1; i <= 10; i++) {
      const inputElement = this.shadowRoot.querySelector(`#${player}-time${i}`).value;

      if (inputElement) {
        playerData[player].push(Number(inputElement));
      } else {
        playerData[player].push(0);
      }
    }

    let totalScore = 0; 
    playerData[player].forEach(time => {
      totalScore += time;
    });

    // always 10 scores
    const avgScore = totalScore / 10;
    
    const playerJson = {
      player: player,
      scores: playerData[player],
      avgScore: avgScore
    };
    
    const jsonString = JSON.stringify(playerJson, null, 2);
    console.log(jsonString);

    upload(jsonString);
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
              <button class="submit-button" @click="${() => this.handlePlayerSubmit(player)}">Submit</button>
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('player-list', PlayerList);
