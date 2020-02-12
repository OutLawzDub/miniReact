import { Component } from "../react.js";
import { createElem, mountElement, unMountElement } from "../element.js";

const center =
  "display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;";

export class Bye extends Component {
  state = {
    left: false
  };
  async makeJoke() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = await function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        switch (JSON.parse(xmlhttp.response).type) {
          case "single":
            document.getElementById("joke").innerHTML = JSON.parse(
              xmlhttp.response
            ).joke;
            break;
          case "twopart":
            document.getElementById("joke").innerHTML = JSON.parse(
              xmlhttp.response
            ).setup;
            setTimeout(() => {
              document.getElementById("delivery").innerHTML = JSON.parse(
                xmlhttp.response
              ).delivery;
            }, 3000);
            break;
          default:
            document.getElementById("joke").innerHTML = "problem api";
            break;
        }
        if (xmlhttp.status == 200) {
        } else if (xmlhttp.status == 400) {
          alert("There was an error 400");
        } else {
          alert("something else other than 200 was returned");
        }
      }
    };

    xmlhttp.open(
      "GET",
      "https://sv443.net/jokeapi/category/Programming?blacklistFlags=religious",
      true
    );
    xmlhttp.send();

    this.setState({ left: true });
  }

  render() {
    let bye = createElem(
      "div",
      {
        className: "my-class",
        style: center
      },
      [
        createElem(
          "h1",
          { style: this.state.left ? "display: inline" : "display: none" },
          ["Au revoir,"]
        ),
        createElem("h2", {}, [this.props.user.name]),
        createElem(
          "h2",
          {
            id: "joke",
            style: this.state.left
              ? "display: inline;  font-family: Kohicle25; font-weight: bolder; font-size: 70px; text-align: center"
              : "display: none"
          },
          [""]
        ),
        createElem(
          "h2",
          {
            id: "delivery",
            style: this.state.left
              ? "display: inline;  font-family: Kohicle25; font-weight: bolder; font-size: 70px; text-align: center"
              : "display: none"
          },
          [""]
        ),
        createElem(
          "button",
          {
            style: "padding: 20px; margin: 10px 0",
            onclick: e => {
              e.stopPropagation();
              this.makeJoke();
            }
          },
          [
            this.state.left
              ? "Une autre ??"
              : "Une petite blague avant de nous quitter ?"
          ]
        ),
        createElem(
          "button",
          {
            style: !this.state.left
              ? "display: inline; padding: 20px"
              : "display: none",
            onclick: e => {
              e.stopPropagation();
              this.setState({ left: true });
            }
          },
          ["Je dois y aller"]
        ),
        this.props.children
      ]
    );
    unMountElement(bye);

    return mountElement(bye, document.getElementById("root"));
  }
}
