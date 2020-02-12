import { mountElement, unMountElement } from "./element.js";

export class Component {
  //todo shouldUpdate
  state = {};
  prevState = {};
  prevProps = {};

  constructor(props) {
    this.prevProps = this.props;
    this.props = props;

    this.prevState = this.state;
    this.state = this.state;
  }

  setState(obj) {
    this.prevState = this.state;
    this.state = obj;
    this.display(this.props);
  }

  shouldUpdate() {
    return this.prevProps !== this.props || this.prevState !== this.state;
  }

  display(newProps) {
    let result = this.shouldUpdate();
    if (result) {
        console.log("refresh");
        this.render();
    } else {
        this.display(newProps.children);
    }
  }
}
