import { html, css, LitElement } from "lit";
import "./podium-card.js";

class Podium extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: space-around;
    }

    .first-place {
      margin-top: 0;
    }
    .second-place {
      margin-top: 60px;
    }
    .third-place {
      margin-top: 80px;
    }
  `;

  static properties = {
    firstPlace: { type: Object },
    secondPlace: { type: Object },
    thirdPlace: { type: Object },
  };

  render() {
    return html`
      <podium-card
        class="second-place"
        .name=${this.secondPlace.name}
        .score=${this.secondPlace.score}
        .placeColor=${"silver"}
      ></podium-card>
      <podium-card
        class="first-place"
        .name=${this.firstPlace.name}
        .score=${this.firstPlace.score}
        .placeColor=${"gold"}
      ></podium-card>
      <podium-card
        class="third-place"
        .name=${this.thirdPlace.name}
        .score=${this.thirdPlace.score}
        .placeColor=${"#cd7f32"}
      ></podium-card>
    `;
  }
}

customElements.define("podium-element", Podium);
