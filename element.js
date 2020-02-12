export function createElem(tag, config, children) {
  const result = {
    props: config
  };

  // console.log(typeof tag, tag);

  if (typeof tag == "string") {
    result.type = "ELEMENT";
    result.tag = tag;

    result.children = children
      .filter(child => child !== undefined)
      .map(child => {
        return typeof child !== "object"
          ? {
              type: "TEXT_ELEMENT",
              value: child
            }
          : child;
      });
  } else {
    tag = new tag(result.props);

    result.props.children = children;

    // tag(result.props);

    result.type = "COMPONENT";
    result.children = [tag.render()];
    result.component = tag;
  }

  return result;
}

// Fonction prototypes
Object.prototype.prop_access = function(value) {
  let split = value.toLowerCase().split(".");
  let current = this;

  for (let i = 0; i < split.length; i++) {
    current = current[split[i]];

    if (current === undefined) {
      split.slice(0, i);

      throw split.join(".") + " not exist.";
      // TODO créer exception exception
    }
  }

  return current;
};

String.prototype.interpolate = function(props) {
  return this.replace(/\{\{\s*(.*?)\s*\}\}/g, function(value, ...other) {
    return props.prop_access(other[0]);
  });
};

//

let currentProps;

export function mountElement(vElement, parentDOMNode, from) {

  let currentNode;
  if (vElement.type == "COMPONENT") {
    currentNode = parentDOMNode;

    currentProps = vElement.props;
  } else if (vElement.type == "TEXT_ELEMENT") {
    // console.log(vElement, vElement.value);

      let result = document.createTextNode(
        vElement.value.interpolate(currentProps)
      );
    

    return parentDOMNode.appendChild(result);
  } else {
    let result = document.createElement(vElement.tag);

    if (vElement.props) {
      Object.entries(vElement.props).forEach(([key, value]) => {
        let checkOn = key.match(/^on(.+)/);

        if (checkOn) {
          result.addEventListener(checkOn[1], value);
        } else {
          result.setAttribute(key, value);
        }
      });
    }

    currentNode = result;
  }

  vElement.children.forEach(element => {
    mountElement(element, currentNode, "children");
  });

  if (vElement.type === "ELEMENT") parentDOMNode.appendChild(currentNode);
}

export function unMountElement() {
  var element = document.getElementById("root");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
