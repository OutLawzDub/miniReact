export function createElem(tag, config, children) {
    const result = {
        props: config
    };


    if (typeof tag == "string") {
        result.type = "ELEMENT";
        result.tag = tag;

        result.children = children.map(child => {
            return typeof child !== 'object' ? {
                type: 'TEXT_ELEMENT',
                value: child
            } : child;
        })

    }
    else {
        tag = new tag();

        result.props.children = children;

        tag.myProps(result.props);

        result.type = "COMPONENT";
        result.children = tag.render();
        result.component = tag;


    };

    return result;
}

export function render(element, container) {

}

const React = {
    createElem,
    render
};

export class Component {
    
    myProps (value) {
        this.props = value;
    }

    mountElement(vElement, parentDOMNode) {
        const {tag, className}  = vElement;
        const domNode           = document.createElement(tag);
    
        vElement.dom = domNode;
    
        if (className !== undefined) {
            domNode.className = className;
        }
    
        parentDOMNode.appendChild(domNode);
    }

    shouldUpdate() {

    }
}