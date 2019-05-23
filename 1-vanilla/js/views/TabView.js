import View from './View.js'

const tag = '[TabView]';

const TabView = Object.create(View);

TabView.tabNames = {
    recommend: '추천 검색어',
    recent: '최근 검색어'
}

TabView.setup = function (el) {
    this.init(el);
    this.bindEvents();
    return this;
}

TabView.bindEvents = function() {
    this.el.querySelectorAll('li').forEach( li => {
        li.addEventListener('click', e => this.onClick(li.innerHTML));
    });
}

TabView.onClick = function (tabName) {
    this.setActiveTab(tabName);
    this.emit('@change', {tabName});
}

TabView.setActiveTab = function (tabName) {
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.className = li.innerHTML === tabName ? 'active' : '';
    });
}

export default TabView;