import { Component } from "../react.js";
import { createElem, mountElement, unMountElement } from "../element.js";

const center =
  "display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;";

export class Bye extends Component {
  state = {
    left: false
  };

  async makeJoke() {
    var _this = this;

    const promise = new Promise(function(resolve, reject) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
          if (xmlhttp.status == 200) {
            resolve(xmlhttp.response);
          } else if (xmlhttp.status == 400) {
            reject("There was an error 400");
          } else {
            reject("something else other than 200 was returned");
          }
        }
      };

      xmlhttp.open(
        "GET",
        "https://sv443.net/jokeapi/category/Programming?blacklistFlags=religious",
        true
      );
      xmlhttp.send();
    });

    promise
      .then(function(value) {
        switch (JSON.parse(value).type) {
          case "single":
            _this.setState({ joke: JSON.parse(value).joke, left: true });
            break;
          case "twopart":
            _this.setState({
              joke: JSON.parse(value).setup,
              delivery: JSON.parse(value).delivery,
              left: true
            });

            break;
          default:
            _this.setState({
              joke: "Problème, lors de la récupération",
              left: true
            });
            break;
        }
      })
      .catch(function(error) {
        console.log(error);
        _this.setState({ error: error, left: true });
      });

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
          [this.state.joke]
        ),
        createElem(
          "h2",
          {
            id: "delivery",
            style: this.state.left
              ? "display: inline;  font-family: Kohicle25; font-weight: bolder; font-size: 70px; text-align: center"
              : "display: none"
          },
          [this.state.delivery]
        ),
        createElem("h2", { style: "color: red;" }, [this.state.error]),
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
    unMountElement();

    return mountElement(bye, document.getElementById("root"));
  }
}
