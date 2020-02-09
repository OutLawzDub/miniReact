import { Component } from "../react.js";
import { createElem } from "../element.js";


const center =
  "display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;";

export class Hello extends Component {
  render() {
    return createElem(
      "div",
      {
        className: "my-class",
        style: center
      },
      [
        createElem("h1", {}, ["Bonjour"]),
        createElem("h2", {}, ["{{user.name}}"]),
        this.props.children
      ]
    );
  }
}
