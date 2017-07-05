/**
 * Created by ruslan on 05.07.2017.
 */



function ajax(url, json) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };
    });
}


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
            placeholder: this.props.placeholder,
            type: this.props.type,
            style: {borderColor: this.state.border}
        }, null);
    }
}


class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {sendButtonDisabled: true, sendButtonClass:'btn btn-danger'};
        this.inputChange = this.inputChange.bind(this);
        this.send = this.send.bind(this);
    }

    inputChange() {
        if (this.refs.input1.state.isValid && this.refs.input2.state.isValid) {
            this.setState({sendButtonDisabled: false, sendButtonClass:'btn btn-success'})
        } else {
            this.setState({sendButtonDisabled: true, sendButtonClass:'btn btn-danger'})
        }
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
                        change: this.inputChange
                    }, null)),

                React.createElement('div', {className: "form-group"},
                    React.createElement(Input, {
                        type: "password",
                        ref: "input2",
                        placeholder: "пароль",
                        change: this.inputChange
                    }, null)),
                React.createElement('div', {className: "form-group"},
                    React.createElement("label", {htmlFor: "rem"}, "запомнить"),
                    React.createElement("input", {ref: "rem", type: "checkbox", id: "rem"}, null)),

                React.createElement('div', {className: "form-group"},
                    React.createElement('button', {
                        className:  this.state.sendButtonClass,
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