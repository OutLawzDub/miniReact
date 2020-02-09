export function render(element, container) {

}

/*
 * Component
 */

export class Component {
    //todo shouldUpdate
    myProps (value) {
        this.props = value;
    }

    shouldUpdate() {
    }

    display(props) {
        // si shouldUpdate -> true call render()
    }
}