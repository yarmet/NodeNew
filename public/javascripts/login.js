/**
 * Created by ruslan on 05.07.2017.
 */
class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isValid: false};
        this.inputValueChanged = this.inputValueChanged.bind(this);
    }

    inputValueChanged(e) {
        var txt = e.target.value;
        var correct = txt.length >= 3;
        this.state = {isValid: correct, value: txt};
        this.props.checkToUnblockSubmit();
    }

    render() {
        return React.createElement('input', {
            className: "form-control",
            onChange: this.inputValueChanged,
            placeholder: this.props.placeholder,
            type: this.props.type,
            style: {borderColor: this.state.isValid ? "green" : "red"}
        }, null);
    }
}


class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {sendButtonDisabled: true, sendButtonClass: 'btn btn-danger'};
        this.checkToUnblockSubmit = this.checkToUnblockSubmit.bind(this);
        this.send = this.send.bind(this);
    }

    checkToUnblockSubmit() {
        var inputsValid = this.refs.input1.state.isValid && this.refs.input2.state.isValid;
        this.setState({
            sendButtonDisabled: !inputsValid,
            sendButtonClass: inputsValid ? 'btn btn-success' : 'btn btn-danger'
        })
    }

    send() {
        ajax("/login", JSON.stringify({
            username: this.refs.input1.state.value,
            password: this.refs.input2.state.value,
            remember: this.refs.rem.checked
        })).then(function () {
            window.location.href = "/";
        }, function (err) {
            alert(err);
        })
    }

    render() {
        return (
            React.createElement('div', null,
                React.createElement('div', {className: "form-group"},
                    React.createElement(Input, {
                        type: "text",
                        ref: "input1",
                        placeholder: "логин",
                        checkToUnblockSubmit: this.checkToUnblockSubmit
                    }, null)),

                React.createElement('div', {className: "form-group"},
                    React.createElement(Input, {
                        type: "password",
                        ref: "input2",
                        placeholder: "пароль",
                        checkToUnblockSubmit: this.checkToUnblockSubmit
                    }, null)),
                React.createElement('div', {className: "form-group"},
                    React.createElement("label", {htmlFor: "rem"}, "запомнить"),
                    React.createElement("input", {ref: "rem", type: "checkbox", id: "rem"}, null)),

                React.createElement('div', {className: "form-group"},
                    React.createElement('button', {
                        className: this.state.sendButtonClass,
                        disabled: this.state.sendButtonDisabled,
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