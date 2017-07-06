/**
 * Created by ruslan on 06.07.2017.
 */


class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {border: "red", isValid: false};
        this.inputValueChanged = this.inputValueChanged.bind(this);
    }

    inputValueChanged(e) {
        var txt = e.target.value;
        var correct = txt.length >= 3;
        this.state = {border: correct ? "green" : "red", isValid: correct, text: txt};
        this.props.checkToUnblockSubmit();
    }

    render() {
        return React.createElement('input', {
            className: "form-control",
            onChange: this.inputValueChanged,
            placeholder: this.props.placeholder,
            type: this.props.type,
            style: {borderColor: this.state.border}
        }, null);
    }
}


class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {sendButtonDisabled: true, sendButtonClass: 'btn btn-danger', repeatBorder: "red"};
        this.checkToUnblockSubmit = this.checkToUnblockSubmit.bind(this);
        this.saveRepeatValue = this.saveRepeatValue.bind(this);
        this.send = this.send.bind(this);
    }

    checkToUnblockSubmit() {
        var repeatIsValid = this.refs.password.state.isValid && (this.refs.password.state.text === this.state.repeatVal);
        var allInputsValid = this.refs.login.state.isValid && this.refs.password.state.isValid && repeatIsValid;
        this.setState({
            sendButtonDisabled: !allInputsValid
            , sendButtonClass: allInputsValid ? 'btn btn-success' : 'btn btn-danger'
            , repeatBorder: repeatIsValid ? "green" : "red"
        });
    }

    saveRepeatValue(e) {
        this.state.repeatVal = e.target.value;
        this.checkToUnblockSubmit();
    }

    send() {
        ajax("/registry", JSON.stringify({
            username: this.refs.login.state.value,
            password: this.refs.password.state.value
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
                        ref: "login",
                        placeholder: "логин",
                        checkToUnblockSubmit: this.checkToUnblockSubmit
                    }, null)),

                React.createElement('div', {className: "form-group"},
                    React.createElement(Input, {
                        type: "password",
                        ref: "password",
                        placeholder: "пароль",
                        checkToUnblockSubmit: this.checkToUnblockSubmit
                    }, null)),

                React.createElement('div', {className: "form-group"},
                    React.createElement('input', {
                        type: "password",
                        ref: "repeat",
                        className: "form-control",
                        placeholder: "повторить пароль",
                        style: {borderColor: this.state.repeatBorder},
                        onChange: this.saveRepeatValue
                    }, null)),

                React.createElement('div', {className: "form-group"},
                    React.createElement('button', {
                        className: this.state.sendButtonClass,
                        disabled: this.state.sendButtonDisabled,
                        onClick: this.send
                    }, 'отправить')),

                React.createElement('a', {href: "/login"}, "залогиниться")
            )
        )
    }
}

ReactDOM.render(
    React.createElement(Form, null, null),
    document.getElementById('react')
);