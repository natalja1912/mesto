export default class UserInfo {
    constructor({ userNameSelector, userJobSelector, avatarSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userJob = document.querySelector(userJobSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    setUserInfo({ name, job, link }) {
        this._userName.textContent = name;
        this._userJob.textContent = job;
        this._avatar.style.backgroundImage = `url(${link})`;
    }
}