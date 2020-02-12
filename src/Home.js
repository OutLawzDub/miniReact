import { Component } from "../react.js";
import { createElem, mountElement, unMountElement } from "../element.js";
import { Hello } from "./Hello.js";

const center =
  "display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;";

export class Home extends Component {
  test = e => {
    e.stopPropagation();

    this.setState({
      name: e.target.value
    });
  };

  render() {
    let test = createElem(
      "div",
      {
        style: center + "font-size: 50px"
      },
      [
        "Bienvenue à la maison!",
        createElem(
          "div",
          {
            style: " margin: 20px 0"
          },
          [
            createElem(
              "input",
              {
                style:
                  "padding: 20px; border: none; border-bottom: 1px solid black",
                onchange: e => this.test(e),
                placeholder: "Entrez votre nom"
              },
              []
            )
          ]
        ),
        this.state.name &&
          createElem(
            "div",
            {
              onclick: () => {
                history.pushState(null, null, "/hello?user=" + this.state.name);

                unMountElement();

                let a = new Hello({ user: { name: this.state.name } });
                a.render();
              }
            },
            ["Salut, " + this.state.name]
          ),
        this.props.children
      ]
    );
    unMountElement(test);

    return mountElement(test, document.getElementById("root"), "aaaaasqlskqlk");
  }
}
