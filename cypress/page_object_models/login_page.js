import Page from './page'

class LoginPage extends Page {

    constructor() {
        super()
        this.username = "input[id=user_login]";
        this.password = "input[type=password]";
        this.signin = "input[type=submit]";
    }

    getUserName() {
        return this.get(this.username);
    }

    getPassword() {
        return this.get(this.password);
    }

    getSignInButton() {
        return this.get(this.signin);
    }

}
export default LoginPage