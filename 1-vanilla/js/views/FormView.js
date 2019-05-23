import View from './View.js';

const tag = '[FormView]';

const FormView = Object.create(View);

FormView.setup = function (el) {
    this.init(el);
    this.inputEl = el.querySelector('[type=text]');
    this.resetEl = el.querySelector('[type=reset]');
    this.showResetBtn(false);
    this.bindEvents();
    return this;    // builder 패턴 처럼 chaining 방식으로 설정하려면 return this; 를 해 주어야 함.
}

FormView.showResetBtn = function(show = true) {
    this.resetEl.style.display = show ? 'block' : 'none';
}

FormView.setValue = function(value = '') {
    this.inputEl.value = value;
    this.showResetBtn(this.inputEl.value.length);
}

FormView.bindEvents = function() {
    this.on('submit', e => e.preventDefault());
    this.inputEl.addEventListener('keyup', e => this.onKeyup(e));
    this.resetEl.addEventListener('click', e => this.onClickReset());
}

FormView.onKeyup = function (e) {
    this.showResetBtn(this.inputEl.value.length);

    if(!this.inputEl.value.length) {
        this.emit('@reset');
    }

    // enter키가 입력되면 mainController에 알려줌.
    const enterKey = 13;
    if (e.keyCode === enterKey) {
        this.emit('@submit', {input: this.inputEl.value});
    }
}

FormView.onClickReset = function () {
    this.emit('@reset');
    this.showResetBtn(false);
}

export default FormView;