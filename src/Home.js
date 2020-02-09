import { Component } from "../react.js";
import { createElem } from "../element.js";


const center =
  "display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;";


export class Home extends Component {
    render() {
      return createElem(
        "div",
        {
          style: center + "font-size: 25px"
        },
        ["Welcome Home!"]
      );
    }
  }