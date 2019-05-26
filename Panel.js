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
    a = new Panel();
    a.createPanelDOM();
    panelDispFlg = false;
};

const deleted = () => {
    console.log('deleted !!');
    a.deletePanl();
    panelDispFlg = true;
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
        //     a = new Panel();
        //     a.createPanelDOM();
        // }
        return true
    });

const $elem = (node, elem) => node.querySelector(elem);
class Panel {
    constructor() {
        // Panel DOM wrapper
        this.wrapperElement = '';

        // Panelの最小化表示の状態管理
        this.activeEyeFlg = true;

        this.init();
        // this.initDebug();
    }

    initDebug = () => {
        const panelframe_css = 'components/panel/panel.css';
        const panelframe_js = 'components/panel/panel.js';
        const panelframe_Logo = 'components/panel/81x20.png';
        const panelframe_user = 'components/panel/user-regular.svg';
        this.panelframe_bars = 'components/panel/bars-solid.svg';
        this.eyeOpen = 'components/panel/eye-regular.svg';
        this.eyeClose = 'components/panel/eye-slash-regular.svg';
        // テンプレートとなるHTMLファイルのプリロード
        this.HTMLtext = `  
            <link rel="stylesheet" href="${panelframe_css}">
            <div id="js-contentsWrapper" class="panel_container">
                <div class="nav">
                    <div id="navEyeicon" class="nav-collapse-btn"><div id="eyeIcon" class="c-eye--open" width="27" height="15"></div></div>
                    <!-- 81 × 20 のアイコンとタイトル -->
                    <div class="nav-logo">
                        <img src="${panelframe_Logo}" id="navlogo"  alt="" srcset="">
                    </div>
                    <div class="nav-dropdown"><img src="${this.panelframe_bars}" width="27" height="15"></div>
                </div>
                <div class="contents">

                    <div class="footer">
                        <img src="${panelframe_user}" id="userIcon">
                        <p>USENAME USENAME</p>
                    </div>
                </div>
            </div>

            <script src="${panelframe_js}"></script>`;

    }
    init = () => {
        const panelframe_css = chrome.extension.getURL('components/panel/panel.css');
        const panelframe_js = chrome.extension.getURL('components/panel/panel.js');
        const content_script_js = chrome.extension.getURL('content_scripts.js');

        const panelframe_Logo = chrome.extension.getURL('components/panel/81x20.png');
        const panelframe_user = chrome.extension.getURL('components/panel/user-regular.svg');

        this.panelframe_bars = chrome.extension.getURL('components/panel/bars-solid.svg');
        this.eyeOpen = chrome.extension.getURL('components/panel/eye-regular.svg');
        this.eyeClose = chrome.extension.getURL('components/panel/eye-slash-regular.svg');

        // テンプレートとなるHTMLファイルのプリロード
        this.HTMLtext = `  
            <link rel="stylesheet" href="${panelframe_css}">
            <div id="js-contentsWrapper" class="panel_container">
                <div class="nav">
                    <div id="navEyeicon" class="nav-collapse-btn"><div id="eyeIcon" class="c-eye--open" width="27" height="15"></div></div>
                    <!-- 81 × 20 のアイコンとタイトル -->
                    <div class="nav-logo">
                        <img src="${panelframe_Logo}" alt="" srcset="">
                    </div>
                    <div class="nav-dropdown"><img src="${this.panelframe_bars}" width="27" height="15"></div>
                </div>
                <div class="contents">

                    <div class="footer">
                        <img src="${panelframe_user}" width="27" height="20">
                        <p>USENAME USENAME</p>
                    </div>
                </div>
            </div>

            <script src="${panelframe_js}"></script>
            <script src="${content_script_js}"></script>`;
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
        // this.navElem.addEventListener('mousedown', function(e) {
        //     this.panelMoveEvent(e);
        // });
        this.navElem.addEventListener('mousedown', this.panelMoveEvent);
        console.log('panel DOM Attached');
    };

    /**
     * Panel DOM を生成
     * @method createPanelDOM
     */
    createPanelDOM = () => {
        document.body.insertAdjacentHTML('beforeend', this.HTMLtext);
        this.wrapperElement = document.getElementById("js-contentsWrapper");
        this.panelDOMbind();
        this.panelDOMattach();
        // return this.wrapperElement
    };


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
    /**
     * 
     */
    panelMoveEvent = (e) => {
        this.mousedownOnNav(e);
        window.onmousemove = e => this.moveOnNav(e);
        window.addEventListener("mouseup", function(e) {
            window.onmousemove = null
        });

    }

    mousedownOnNav = (event) => {
        let navPositon = this.navElem.getBoundingClientRect();
        this.offset = {
            x: navPositon.x - event.pageX,
            y: navPositon.y - event.pageY
        }
    };

    moveOnNav = (event) => {
        x = event.pageX + this.offset.x + scrollLeft;
        y = event.pageY + this.offset.y + scrollTop;
        this.wrapperElement.style.left = `${x}px`;
        this.wrapperElement.style.top = `${y}px`;
    };

    deletePanl = () => {
        document.body.removeChild(this.wrapperElement);
        this.wrapperElement = null;
    }

}
let x = 0;
let y = 0;

let scrollTop = 0;
let scrollLeft = 0;
window.onscroll = function() {
    scrollTop =
        document.documentElement.scrollTop || // IE、Firefox、Opera
        document.body.scrollTop; // Chrome、Safari
    scrollLeft =
        document.documentElement.scrollLeft || // IE、Firefox、Opera
        document.body.scrollLeft; // Chrome、Safari
}

// exports = Panel;