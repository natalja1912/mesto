
export default class UserInfo {
    constructor({ userNameSelector, userJobSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userJob = document.querySelector(userJobSelector);
    }

    getUserInfo() {
        const item = {};
        item.name = this._userName.textContent;
        item.job = this._userJob.textContent;
        return item;
    }

    setUserInfo({ name, job }) {
        this._userName.textContent = name;
        this._userJob.textContent = job;
    }
}