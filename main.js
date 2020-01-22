Object.prototype.prop_access = function (value) {
    let split   = value.toLowerCase().split('.');
    let current = this;

    for (let i = 0; i < split.length; i++) {
        current = current[split[i]];

        if (current === undefined) {
            split.slice(0, i);

            throw split.join('.') + ' not exist.';
            // TODO créer exception exception
        }
    }

    return current;
}

String.prototype.interpolate = function (props) {
    return this.replace(/\{\{\s*(.*?)\s*\}\}/g, function(value, ...other) {
        return props.prop_access(other[0]);
    });
}

console.log('{{user.name}}'.interpolate({ user: { name: 'tomas' } }));

function createElement(tag, config, children) {
    const result = {
        props: config
    };

    // console.log("zzz", result);

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

    console.log("r", JSON.stringify(result.children));

    return result;
}

function mountElement(vElement, parentDOMNode) {
    const {tag, className}  = vElement;
    const domNode           = document.createElement(tag);

    vElement.dom = domNode;

    if (className !== undefined) {
        domNode.className = className;
    }

    parentDOMNode.appendChild(domNode);
}

// const root  = document.getElementById('root');
// const myApp = createVElement('div', { className: 'my-class'});

// mountVElement(myApp, root);

// const myApp = createVElement('div', { className: 'my-class'}, [
//     "Bonjour Hello"
// ]);

// const myApp = createVElement('div', { className: 'my-class'}, [
//     createVElement('h1', {}, ['Bonjour']),
//     createVElement('h2', {}, ['Toto'])
// ]);

// const myApp = createVElement(Header, {user: {name: 'toto'}}, [
// ]);

class Component {
    
    myProps (value) {
        this.props = value;
    }
}

class Header extends Component {
    render() {
        return createElement('div', { className: 'my-class' }, [
            createElement('h1', {}, ['Bonjour']),
            createElement('h2', {}, ['{{user.name}}']),
            this.props.children
        ])
    }
}

const myApp = createElement(Header, { user: { name: 'toto' } });

console.log(myApp);