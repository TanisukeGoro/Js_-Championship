// 必要な要素のパスを取得
// const panelframe_css = chrome.extension.getURL('components/panel/panel.css');
// const panelframe_js = chrome.extension.getURL('components/panel/panel.js');
// const panelframe_Logo = chrome.extension.getURL('components/panel/81x20.png');
// const panelframe_user = chrome.extension.getURL('components/panel/user-regular.svg');

// this.panelframe_bars = chrome.extension.getURL('components/panel/bars-solid.svg');
// this.eyeOpen = chrome.extension.getURL('components/panel/eye-regular.svg');
// this.eyeClose = chrome.extension.getURL('components/panel/eye-slash-regular.svg');
// 要素をjQuery風に扱う
let panelDispFlg = true;


const create = () => {
    panelOBJ = new Panel();
    panelOBJ.createPanelDOM();
    panelDispFlg = false;
};

const deleted = () => {
    console.log('deleted !!');
    panelOBJ.deletePanel();
    panelDispFlg = true;
};

let x = 0;
let y = 0;

let scrollTop = 0;
let scrollLeft = 0;
scrollTop =
    document.documentElement.scrollTop || // IE、Firefox、Opera
    document.body.scrollTop; // Chrome、Safari
scrollLeft =
    document.documentElement.scrollLeft || // IE、Firefox、Opera
    document.body.scrollLeft; // Chrome、Safari


window.onscroll = function() {
    scrollTop =
        document.documentElement.scrollTop || // IE、Firefox、Opera
        document.body.scrollTop; // Chrome、Safari
    scrollLeft =
        document.documentElement.scrollLeft || // IE、Firefox、Opera
        document.body.scrollLeft; // Chrome、Safari

};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('component');
        switch (request.greeting) {
            case 'component':
                (panelDispFlg === true) ? create(): deleted();
                sendResponse({ farewell: "this is Panel" });
                break;

            default:
                break;
        }
        // if (request.greeting == "component") {
        //     sendResponse({ farewell: "this is Panel" });
        //     console.log(request.greeting);
        //     panelOBJ = new Panel();
        //     panelOBJ.createPanelDOM();
        // }
        return true
    });

const $elem = (node, elem) => node.querySelector(elem);
class Panel {
    constructor() {
        // Panel DOM wrapper
        this.wrapperElement = '';
        // this.navPositon.x = 

        // Panelの最小化表示の状態管理
        this.activeEyeFlg = true;

        this.init();
        // this.initDebug();
    };

    init = () => {
        const panelframe_css = chrome.extension.getURL('components/panel/panel.css');
        const card_css = chrome.extension.getURL('components/card/card.css');
        const panelframe_Logo = chrome.extension.getURL('components/panel/icon/81x20.png');
        const panelframe_user = chrome.extension.getURL('components/panel/icon/user-regular.svg');
        const extensionOptionPage = chrome.extension.getURL('option.html');



        this.panelframe_bars = chrome.extension.getURL('components/panel/icon/bars-solid.svg');
        this.panelframe_bars = chrome.extension.getURL('components/panel/icon/bars-solid.svg');

        // テンプレートとなるHTMLファイルのプリロード
        this.HTMLtext = `  
        <link rel="stylesheet" href="${panelframe_css}">
        <link rel="stylesheet" href="${card_css}">
        <div id="js-contentsWrapper" class="panel_container">
            <div class="nav">
                <div id="navEyeicon" class="nav-collapse-btn">
                    <div id="eyeIcon" class="c-eye--open" width="27" height="15"></div>
                </div>
                <!-- 81 × 20 のアイコンとタイトル -->
                <div class="nav-logo">
                <img src="${panelframe_Logo}" alt="" srcset="">
                </div>
                <div class="nav-dropdown"><img src="${this.panelframe_bars}" width="27" height="15"></div>
            </div>

            <div class="contents">
            <!-- CardをVue によるコンポーネント化 -->
                <div class="blank_area"></div>
                <div id="idiom-card--app">

                </div>
            <div class="blank_area"></div>
            <div class="blank_area"></div>
            <div class="blank_area"></div>

            <div class="footer">
            <img src="${panelframe_user}" width="27" height="20">
            <p>User</p>
            <a href="${extensionOptionPage}" target="_blank">Log in</a>
            </div>
            </div>
        </div>`;
    };

    /**
     * 指定した要素をバインドしちゃう
     * @method panelDOMbind
     */
    panelDOMbind = () => {
        this.wrapperElement = document.getElementById('js-contentsWrapper');
        this.iconSvgElem = $elem(this.wrapperElement, '#navEyeicon>#eyeIcon');
        this.navElem = $elem(this.wrapperElement, '.nav');
        console.log('panel DOM binded');
    };

    /**
     * 指定した要素にAttachを指定する
     * @method panelDOMattach
     */
    panelDOMattach = () => {
        // if clicked eye icon, then checking the eyeicon state.
        this.iconSvgElem.addEventListener('click', this.changeEyestate);
        // if the navigation bar is held then activate the move event.  
        this.navElem.addEventListener('mousedown', this.panelMoveEvent);
        // if scrolling web page, 
        window.addEventListener('scroll', this.keepPotision);
        console.log('panel DOM Attached');
    };

    /**
     * パネルの位置を保持しておく関数
     */
    keepPotision = () => {
        x = this.wrapperPotision.x + scrollLeft;
        y = this.wrapperPotision.y + scrollTop;
        this.wrapperElement.style.left = `${x}px`;
        this.wrapperElement.style.top = `${y}px`;
    }

    /**
     * Panel DOM を生成
     * @method createPanelDOM
     */
    createPanelDOM = () => {
        // let test = document.createElement('idiomFlame');
        // test.innerHTML = this.HTMLtext;
        // let htmlELEM = document.querySelector('html');
        // htmlELEM.appendChild(test);
        document.body.insertAdjacentHTML('afterend', this.HTMLtext);
        this.wrapperElement = document.getElementById("js-contentsWrapper");
        scrollTop =
            document.documentElement.scrollTop || // IE、Firefox、Opera
            document.body.scrollTop; // Chrome、Safari
        scrollLeft =
            document.documentElement.scrollLeft || // IE、Firefox、Opera
            document.body.scrollLeft; // Chrome、Safari
        x = window.innerWidth - 500;
        y = scrollTop + 40;
        this.wrapperElement.style.left = `${x}px`;
        this.wrapperElement.style.top = `${y}px`;
        this.wrapperPotision = this.wrapperElement.getBoundingClientRect();
        this.wrapperPotision.x = window.innerWidth - 500;
        this.wrapperPotision.y = 40;
        this.panelDOMbind();
        this.panelDOMattach();
    };


    deletePanel = () => {
        // removeElem.parentNode.removeChild(removeElem);
        this.wrapperElement.parentNode.removeChild(this.wrapperElement);
        // document.documentElement.removeChild(this.wrapperElement);
        this.wrapperElement = null;
    }


    changeEyestate = () => (this.activeEyeFlg === true) ? this.closePanel() : this.openPanel();


    openPanel = () => {
        this.iconSvgElem.className = "c-eye--open";
        this.contents.display = "block";
        this.contents.classList.remove('fadeout');
        $elem(this.wrapperElement, '.nav').classList.remove('nav-boxshadow');
        this.activeEyeFlg = true;

    };

    /**
     *  display none にならないのを調整すること
     */
    closePanel = () => {
        this.iconSvgElem.className = "c-eye--close";
        this.contents = $elem(this.wrapperElement, '.contents');
        this.contents.classList.add('fadeout');
        $elem(this.wrapperElement, '.nav').classList.add('nav-boxshadow');
        this.activeEyeFlg = false;
        setTimeout(function() {
            // this.contents.display = "none";
        }, 1000);
    };


    panelMoveEvent = (e) => {
        this.mousedownOnNav(e);
        window.onmousemove = e => this.moveOnNav(e);
        window.addEventListener("mouseup", function(e) {
            window.onmousemove = null
        });

    }

    mousedownOnNav = (event) => {
        this.navPositon = this.navElem.getBoundingClientRect();
        this.offset = {
            x: this.navPositon.x - event.pageX,
            y: this.navPositon.y - event.pageY
        }
    };

    moveOnNav = (event) => {
        x = event.pageX + this.offset.x + scrollLeft;
        y = event.pageY + this.offset.y + scrollTop;
        this.wrapperElement.style.left = `${x}px`;
        this.wrapperElement.style.top = `${y}px`;
        this.wrapperPotision = this.wrapperElement.getBoundingClientRect();
    };


}