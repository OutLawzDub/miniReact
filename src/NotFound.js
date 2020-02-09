import { Component } from "../react.js";
import { createElem } from "../element.js";


const center =
  "display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;";

export class NotFound extends Component {
  render() {
    return createElem(
      "div",
      {
        className: "my-class",
        style: center
      },
      [
        createElem(
          "img",
          {
            src: "https://media.giphy.com/media/VwoJkTfZAUBSU/giphy.gif"
          },
          ["404, page not found"]
        ),
        createElem(
          "a",
          {
            href: "/",
            style:
              "text-decoration: none; font-family: Kohicle25; font-weight: bolder; font-size: 50px;color: black;"
          },
          ['" - THIS IS NOT WHAT I\'M LOOKING FOR, I GO BACK TO HOME. "']
        ),
        this.props.children
      ]
    );
  }
}
