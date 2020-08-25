export default class UserInfo {
    constructor({ userNameSelector, userJobSelector, avatarSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userJob = document.querySelector(userJobSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    setUserInfo({ name, about, avatar }) {
        this._userName.textContent = name;
        this._userJob.textContent = about;
        this._avatar.style.backgroundImage = `url(${avatar})`;
    }

    getUserInfo() {
        const info = {};
        info.name = this._userName.textContent;
        info.about = this._userJob.textContent;
        info.avatar = this._avatar.style.backgroundImage;
        return info;
    }
}