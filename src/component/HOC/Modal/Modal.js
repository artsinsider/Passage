import React    from 'react';
import ReactDOM from 'react-dom';
import './style.scss'

const modalRoot = document.getElementById('modal');

export default class Modal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.el.className = 'modal-wrap';
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
        this.el.addEventListener('click', () => this.props.history.goBack())
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}