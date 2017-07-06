/**
 * Created by ruslan on 06.07.2017.
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
        this.state.isValid = correct;
        this.state.text = txt;
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
        this.state = {repeatIsValid: false, allInputsValid: false};
        this.checkToUnblockSubmit = this.checkToUnblockSubmit.bind(this);
        this.saveRepeatValue = this.saveRepeatValue.bind(this);
        this.send = this.send.bind(this);
    }

    checkToUnblockSubmit() {
        this.state.repeatIsValid = this.refs.password.state.isValid && (this.refs.password.state.text === this.state.repeatText);
        this.state.allInputsValid = this.refs.login.state.isValid && this.refs.password.state.isValid && this.state.repeatIsValid;
        this.setState();
    }

    saveRepeatValue(e) {
        this.state.repeatText = e.target.value;
        this.checkToUnblockSubmit();
    }

    send() {
        ajax("/registry", JSON.stringify({
            username: this.refs.login.state.text,
            password: this.refs.password.state.text
        })).then(function () {
            window.location.href = "/login";
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
                        style: {borderColor: this.state.repeatIsValid ? "green" : "red"},
                        onChange: this.saveRepeatValue
                    }, null)),

                React.createElement('div', {className: "form-group"},
                    React.createElement('button', {
                        className: this.state.allInputsValid ? "btn btn-success" : "btn btn-danger",
                        disabled: !this.state.allInputsValid,
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