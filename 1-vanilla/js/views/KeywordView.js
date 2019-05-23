import View from './View.js'

const tag = '[KeywordView]';

const KeywordView = Object.create(View);

KeywordView.setup = function (el) {
    this.init(el);
    return this;
}

KeywordView.bindClickEvent = function() {
    // this.el.querySelectorAll('li') 는 Array가 아니라 array-like 타입이므로 Array.from() 으로 감싸준다.
    Array.from(this.el.querySelectorAll('li')).forEach( li => {
        li.addEventListener('click', e => this.onClickKeyword(e));
    });
}

KeywordView.render = function(data = []) {
    this.el.innerHTML = data.length ? this.getKeywordsHtml(data) : '추천 검색어가 없습니다.';
    this.bindClickEvent();
    this.show();
}

KeywordView.getKeywordsHtml = function (data) {
    return data.reduce((html, item, index) => {
        html += `<li data-keyword="${item.keyword}">
            <span class="number">${index + 1}</span>
            ${item.keyword}
        </li>`

        return html;
    }, '<ul class="list">') + '</ul>';
}

KeywordView.onClickKeyword = function (e) {
    const {keyword} = e.currentTarget.dataset;

    console.log(tag, 'onClickHistory()');
    this.emit('@click', {keyword});
}

export default KeywordView;
