/**
 * Created by ruslan on 05.07.2017.
 */


class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {border: "red", isValid: false};
        this.change = this.change.bind(this);
    }

    change(e) {
        var txt = e.target.value;
        if (txt.length < 3) {
            this.state = {border: "red", isValid: false, value: txt};
        } else {
            this.state = {border: "green", isValid: true, value: txt};
        }
        this.props.change();
    }

    render() {
        return React.createElement('input', {
            className: "form-control",
            onChange: this.change,
            type: this.props.type,
            style: {borderColor: this.state.border}
        }, null);
    }
}


class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {buttonDisabled: true};
        this.inputChange = this.inputChange.bind(this);
        this.send = this.send.bind(this);
    }

    inputChange() {
        if (this.refs.input1.state.isValid && this.refs.input2.state.isValid) {
            this.setState({buttonDisabled: false})
        } else {
            this.setState({buttonDisabled: true})
        }
    }

    send() {
        console.log(this.refs.input1.state.value + " " + this.refs.input2.state.value)
    }

    render() {
        return (
            React.createElement('div', null,
                React.createElement('div', {className: "form-group"},
                    React.createElement(Input, {type: "text", ref: "input1", change: this.inputChange}, null)),

                React.createElement('div', {className: "form-group"},
                    React.createElement(Input, {type: "password", ref: "input2", change: this.inputChange}, null)),

                React.createElement('div', {className: "form-group"},
                    React.createElement("label", {htmlFor: "rem"}, "запомнить"),
                    React.createElement("input", {type: "checkbox", id: "rem"}, null)),

                React.createElement('div', {className: "form-group"},
                    React.createElement('button', {
                        className: 'btn btn-success',
                        disabled: this.state.buttonDisabled,
                        onClick: this.send
                    }, 'отправить')),

                React.createElement('a', {href: "/registry"}, "зарегистрироваться")
            )
        )

    }
}


ReactDOM.render(
    React.createElement(Form, null, null),
    document.getElementById('react')
);