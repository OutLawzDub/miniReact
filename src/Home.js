import { Component } from "../react.js";
import { createElem, mountElement, unMountElement } from "../element.js";
import { Hello } from "./Hello.js";
import { type_check_v2 } from "../type-check.js";

const center =
  "display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;";

export class Home extends Component {
  test = e => {
    e.stopPropagation();

    let checkNum = Number(e.target.value);
    if (isNaN(checkNum)) checkNum = e.target.value;

    let check = type_check_v2(checkNum, {
      type: "string"
    });

    if (check.res) {
      this.setState({ name: e.target.value });
    } else {
      this.setState({ error: check.msg });
    }
  };

  render() {
    console.log(this.state);
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
        (this.state.name || this.state.error) &&
          createElem(
            "div",
            {
              style: this.state.error ? "color: red" : "color: black",
              onclick: () => {
                history.pushState(null, null, "/hello?user=" + this.state.name);

                unMountElement();

                let a = new Hello({
                  user: { name: this.state.name }
                });
                a.render();
              }
            },
            [this.state.error ? this.state.error : `Salut, ${this.state.name}`]
          ),
        this.props.children
      ]
    );
    unMountElement();

    return mountElement(test, document.getElementById("root"));
  }
}
