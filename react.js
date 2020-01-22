export function createElem(tag, config, children) {
    const result = {
        props: config
    };

    console.log(typeof tag, tag);

    if (typeof tag == "string") {
        result.type = "ELEMENT";
        result.tag = tag;

        result.children = children.filter(child => child !== undefined).map(child => {
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
        result.children = [tag.render()];
        result.component = tag;

    };

    return result;
}

export function render(element, container) {

}

export class Component {
    
    myProps (value) {
        this.props = value;
    }

    shouldUpdate() {

    }
}