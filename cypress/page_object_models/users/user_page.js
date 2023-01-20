import Page from '../page'

class UserPage extends Page {

    constructor() {
        super()
        this.new_user_button = "";
    }

    getNewUserButton() {
        return this.get(this.new_user_button);
    }

}
export default UserPage