import React from './react.js'

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

console.log('{{user.name}}'.interpolate({ user: { name: 'tomas' } }));

class Header extends Component {

    render() {
        return createElem('div', { className: 'my-class' }, [
            createElem('h1', {}, ['Bonjour']),
            createElem('h2', {}, ['{{user.name}}']),
            createElem(NavBar, {}),
            this.props.children
        ])
    }
}

const myApp = createElem(Header, { user: { name: 'toto' } });

console.log(myApp);