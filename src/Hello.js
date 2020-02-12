import { Component } from "../react.js";
import { createElem, mountElement, unMountElement } from "../element.js";
import { Bye } from "./Bye.js";
import { type_check_v2 } from "../type-check.js";

const center =
  "display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;";

export class Hello extends Component {
  age(e) {
    e.stopPropagation();
    let checkNum = Number(event.target.value);
    if (isNaN(checkNum)) checkNum = event.target.value;

    let check = type_check_v2(checkNum, {
      type: "number"
    });

    if (check.res) {
      this.setState({ age: event.target.value });
    } else {
      this.setState({ error: check.msg });
    }
  }

  render() {
    console.log(this.state);
    let x = createElem(
      "div",
      {
        className: "my-class",
        style: center
      },
      [
        createElem("h1", {}, ["Bonjour, "]),
        createElem("p", {}, [this.props.user.name]),
        createElem(
          "p",
          {
            style: this.state.error ? "color: red" : "color: black"
          },
          [
            this.state.error
              ? this.state.error
              : this.state.age || this.props.user.age
          ]
        ),
        createElem("p", {}, [this.props.user.sexe]),
        createElem("div", { style: "margin: 20px 0" }, [
          createElem(
            "input",
            {
              style:
                "padding: 20px; border: none; border-bottom: 1px solid black",
              onchange: e => this.age(e),
              placeholder: "Quel âge avez-vous ?"
            },
            []
          )
        ]),
        this.state.age &&
          createElem(
            "button",
            {
              style: "padding: 20px",
              onclick: e => {
                history.pushState(
                  null,
                  null,
                  "/bye?user=" + this.props.user.name
                );

                unMountElement();

                let a = new Bye({ user: { name: this.props.user.name } });
                a.render();
              }
            },
            [
              this.state.age > 30
                ? "Désolé, de vous l'apprendre mais vous êtes vieux! Passons à la suite"
                : "Vous êtes jeune! Passons à la suite"
            ]
          ),
        this.props.children
      ]
    );
    unMountElement();
    return mountElement(x, document.getElementById("root"));
  }
}
