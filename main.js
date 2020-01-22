function prop_access(array, value)
{
    if(typeof value !== "string" || value.length === 0) return array;
    if(array.length == 0 || typeof array !== 'object' || array === null) return array;

    let split   = value.toLowerCase().split('.');
    let current = array;

    for (let i = 0; i < split.length; i++)
    {
        current = current[split[i]];

        if(current === undefined)
        {
            split.slice(0, i);

            return console.log(split.join('.') + ' not exist');
        }
    }

    return current;
}

String.prototype.interpolate = function(props) {
    
}

'{{user.name}}'.interpolate(props)

return {
    props: {
        user: {
            name: 'ok'
        }
    }
}

function createElement(tag, config, children) {
    const result = {
        props: config
    };

    if(typeof tag == "string")
    {
        result.type = "ELEMENT";
        result.tag = tag;
    }
    else
    {
        tag = new tag();

        result.type = "COMPONENT";
        result.children = tag.render();
        result.component = tag;
    };

    result.children = children.map(function(child) {
        return typeof child !== 'object' ? {
            type: 'TEXT_ELEMENT',
            value: child
        } : child;
    })

    return result;
}

function mountVElement(vElement, parentDOMNode) {
    const {tag, className}  = vElement;
    const domNode           = document.createElement(tag);

    vElement.dom = domNode;

    if (className !== undefined) {
        domNode.className = className;
    }

    parentDOMNode.appendChild(domNode)
}

const root  = document.getElementById('root');
const myApp = createVElement('div', { className: 'my-class'});

mountVElement(myApp, root);

const myApp = createVElement('div', { className: 'my-class'}, [
    "Bonjour Hello"
]);

const myApp = createVElement('div', { className: 'my-class'}, [
    createVElement('h1', {}, ['Bonjour']),
    createVElement('h2', {}, ['Toto'])
]);

{
    type: 'ELEMENT',
    tag: "div",
    props: {
        className: 'my-class'
    },
    children: [
        {
            type: 'ELEMENT',
            tag: "h1",
            props: {
            },
            children: [
                {
                    type: 'TEXT_ELEMENT',
                    props: {
                    },
                    children: [ 
                    ]
                }
            ]
        },
        {
            type: 'ELEMENT',
            tag: "h2",
            props: {
            },
            children: [
                {
                    type: 'TEXT_ELEMENT',
                    text: '{{user.name}}'
                }
            ]
        }
    ]
}

class Header extends Component {
    render() {
        return createVElement('div', { className: 'my-class'}, [
            createVElement('h1', {}, ['Bonjour']),
            createVElement('h2', {}, ['{{user.name}}'])
        ])
    }
}

const myApp = createVElement(Header, {user: {name: 'toto'}}, [
]);

