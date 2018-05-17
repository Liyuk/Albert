import React, { Component, PropTypes } from 'react';
import  { Button }  from 'react-bootstrap';

export default class MessageComposer extends Component {
    constructor(props, context) {
        super(props, context);
    }

    onKeyDown(event) {
        if (event.which === 13) {
            event.preventDefault();
            this.handleSubmit(event);
        }
    }

    handleSubmit(event) {
        const text = this.refs.input.value.trim();
        if (text.length > 0) {
            this.props.sendMessage(text);
            this.refs.input.value = '';
        }
    }

    render() {
        return (<div>
            <input 
                className="input-message"
                placeholder="Type here..."
                autoFocus="true"
                ref="input"
                onKeyDown={this.onKeyDown.bind(this)}
            />
            <Button className="input-submit" onClick={this.handleSubmit.bind(this)}>Submit</Button>
        </div>
        );
    }
}
