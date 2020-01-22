import {createElem, Component} from './react.js'

// Fonction prototypes

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


//

let currentProps;

function mountElement(vElement, parentDOMNode) {

    let currentNode;

    if(vElement.type == 'COMPONENT')
    {
        currentNode = parentDOMNode;
        
        currentProps = vElement.props;
    }
    else if(vElement.type == 'TEXT_ELEMENT')
    {
        console.log(vElement, vElement.value);

        let result = document.createTextNode(vElement.value.interpolate(currentProps))
        
        return parentDOMNode.appendChild(result);
    }
    else
    {
        let result = document.createElement(vElement.tag);

        if(vElement.props) {
            Object.entries(vElement.props).forEach(([key, value]) => {
                let checkOn = key.match(/^on(.+)/);
    
                if(checkOn) {
                    result.addEventListener(checkOn[1], value);
                }
                else
                {
                    result.setAttribute(key, value);
                }
            })
        }

        currentNode = result;
    }

    console.log(vElement);

    vElement.children.forEach(element => {
        mountElement(element, currentNode);
    });

    if(vElement.type === 'ELEMENT')
        parentDOMNode.appendChild(currentNode);

}

console.log('{{user.name}}'.interpolate({ user: { name: 'tomas' } }));

class Header extends Component {

    render() {
        return createElem('div', { className: 'my-class' }, [
            createElem('h1', {}, ['Bonjour']),
            createElem('h2', {}, ['{{user.name}}']),
            this.props.children
        ])
    }
}

const myApp = createElem(Header, { user: { name: 'toto'}});

mountElement(myApp, document.getElementById('root'));

// dans mount element quand tu tombes sur un type element tu fais un document create element
// text = document create text node 

// et ceux la j'append child à mon élement
