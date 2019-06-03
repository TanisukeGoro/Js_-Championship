/**
 * dict.js
 * 
 * 
 * 
 */

// keyが1文字のものは弾く
// BLACK_LIST に存在する文字列も弾く
const BLACK_LIST = [
    'the', 'an', 'a',
    'my', 'me', 'mine',
    'he', 'his', 'him',
    'she', 'her',
    'we', 'our', 'us', 'be',
    'this', 'that', 'these', 'those',
    'they', 'their', 'them',
    'is', 'was', 'are', 'were',
];
// var cardsData = []


var DICT_INDEX_KEYS = '';

var cardsData = [];
window.onload = () => {
    // 辞書データの読み取り
    // from dict_src.js as DICT_INDEX_KEYS
    DICT_INDEX_KEYS = Object.keys(DICT_INDEX);

    // テキストが選択された場合、ボタンを表示させる
    document.addEventListener('mouseup', function(e) {
        selectedObj = window.getSelection();
        text = selectedObj.toString();
        if (text.length !== 0) insertSearchBtn(e.pageX, e.pageY);
    });
}


const insertSearchBtn = (mouseX, mouseY) => {
    // もしすでにボタンが表示されていた場合は処理を中断する
    isSearchBtn = document.querySelector('#go-Search-Idiom-btn');
    if (isSearchBtn === null) new SearchBtn(mouseX, mouseY);
};

const searchTrigger = () => {
    selectedObj = window.getSelection();
    text = selectedObj.toString();
    if (text.length !== 0) idiomSearch(text);
}


/**
 * 辞書検索関数
 * @param {string} searchChar 
 */
const idiomSearch = searchChar => {
    const starTimes = performance.now();
    // 文字列の先頭と末尾のスペースは削除する
    searchChar = searchChar.trim();
    // 文字列を比較するときは小文字に変換してから比較する
    searchChar = searchChar.toLowerCase();
    // 一致した結果(keyのみ)を取得する
    resultsKeys = listupMatchChar(searchChar);

    matchTestChar = searchChar.split(' ');

    // 重複を削除
    matchTestChar = checkDuplicate(matchTestChar);
    // ブラックリスト掲載単語も削除
    // matchTestChar = matchTestChar.filter(
    //     n => (BLACK_LIST.indexOf(n) === -1) && true);
    matchTestChar = matchTestChar.filter(
        n => BLACK_LIST.indexOf(n) === -1);


    // 一致したresultsKeysから正確に一致している単語を抽出
    matchingIdiom = diffResultArr(matchTestChar, resultsKeys);

    const endTimes = performance.now()
    const processTime = endTimes - starTimes;
    console.log(`processTime => ${processTime.toFixed(3)} ms`);

    // 結果があれば検索イベントを開始
    (matchingIdiom.length !== 0) && outputResults(matchingIdiom);


}


/**
 * 入力された文字列に対して曖昧に一致する文字列を返す
 * @param {string} text 検索文字列 
 * @returns {Array}
 */
const listupMatchChar = text => {
    let returnArr = [];
    DICT_INDEX_KEYS.forEach(a => {
        // 小文字同士で比較する, 1文字の一致は除外
        if (-1 != text.indexOf(a.toLowerCase()) && a.length > 1) {
            returnArr.push(a);
        }
    });
    return returnArr
}


/**
 * 配列の差分から厳密な一致をテストする
 * @param {Array} matchTestChar 入力文字列を空白区切りした配列
 * @param {Array} resultsKeys 検索結果曖昧一致した配列
 * @param {string} resultsKeys 検索結果曖昧一致した配列
 *
 */
const diffResultArr = (matchTestChar, resultsKeys) => {
    let matchingIdiom = [];
    matchTestChar.forEach(matchText => {
        resultsKeys.forEach(resultKey => {
            if (matchText === resultKey) {
                matchingIdiom.push(matchText);
                return
            }
        })
    });
    // 熟語判定
    resultsKeys.forEach(resultKey => {
        if (/\s/.test(resultKey)) {
            matchingIdiom.push(resultKey);
            return
        }
    })
    return matchingIdiom
};

/**
 * 配列内の重複を削除する関数
 * @param {Array} inpArr 配列の重複をチェックする関数
 */
const checkDuplicate = (inpArr) => {
    inpArr = inpArr.filter(function(x, i, self) {
        return self.indexOf(x) === i;
    });
    return inpArr
};

/**
 * 拡張機能のカードに出力するための関数
 * @param {card} matchingIdiom 
 */
const outputResults = (matchingIdiom) => {
    for (let i = 0; i < matchingIdiom.length; i++) {
        // highlight(document.body, matchingIdiom[i]);
        cardsData.push({
            title: matchingIdiom[i],
            description: highlightSearchResult(DICT_INDEX[matchingIdiom[i]])
        });
        // console.log(cardsData);

        // console.log(`idiom : ${matchingIdiom[i]}\n`, DICT_INDEX[matchingIdiom[i]]);

    };

    chrome.storage.local.set({ idiomListData: cardsData }, function() {
        console.log('data save success !!!');
        highlight(document.querySelector('body'), matchingIdiom);
    });
}


// テキストハイライトを行う関数
const highlightSearchResult = (highlightElem) => {
    const queryFront = '〈|《|『';
    const queryEnd = '〉|》|』';
    const regexpFront = new RegExp(`(${queryFront})`, 'gi');
    const regexpEnd = new RegExp(`(${queryEnd})`, 'gi');
    highlightElem = highlightElem.replace(regexpFront, '<span style="color: blue">$1')
    highlightElem = highlightElem.replace(regexpEnd, '$1</span>')
    return highlightElem
}


/**
 * 
 * @param {object} container 検索対象のDOM要素
 * @param {Array} what 検索する文字列の配列
 * @param {string} spanClass 適用するクラス
 */

function highlight(container, what) {
    var content = container.innerHTML
    let pattern = ''
    for (let i = 0; i < what.length; i++) {
        pattern = new RegExp(` ${what[i]} | ${what[i]}.| ${what[i]},| ${what[i]}s`, 'gi');
        content = content.replace(pattern, ` <mark>${what[i]}</mark> `);
    }
    container.innerHTML = content;
    // return (container.innerHTML = highlighted) !== content;
}


/**
 * マウスの近くに検索ボタンを表示する関数
 */
class SearchBtn {
    constructor(mouseX, mouseY) {
        // constructor() {
        this.positionX = mouseX;
        this.positionY = mouseY;
        this.init();
        this.createBtnDOM();
    }
    init = () => {
        const btnicon = chrome.extension.getURL('static/icon.png');
        this.btnHTML = `
        <button id="idiom-search-button" style="border-radius: 8px;">
            <img src="${btnicon}" width="20px" height="20px">
        </button>`
    }

    btnBind = () => {
        this.searchBtnWrapper
    }

    btnClick = () => {
        console.log('reaifew');
        this.searchBtnWrapper.addEventListener('click', function() {
            searchTrigger();
            document.body.removeChild(isSearchBtn);
        })
    }

    createBtnDOM = () => {
        this.btnDOM = document.createElement('div');
        this.btnDOM.setAttribute('id', 'go-Search-Idiom-btn');
        this.btnDOM.insertAdjacentHTML('afterbegin', this.btnHTML);
        this.btnDOM.style.zIndex = 1000000;
        this.btnDOM.style.position = 'absolute';
        this.btnDOM.style.width = "20px";
        this.btnDOM.style.height = "20px";
        this.btnDOM.style.borderRadius = "5px";
        this.btnDOM.style.left = `${this.positionX}px`;
        this.btnDOM.style.top = `${this.positionY + -50 }px`;
        document.body.appendChild(this.btnDOM);
        this.searchBtnWrapper = document.getElementById('idiom-search-button');
        console.log(this.searchBtnWrapper);
        this.btnClick();
    }
}




/**
 * 配列同士の差分をとる関数
 * 異なるものがあった場合、arr1の方を抽出する
 * @param {*} arr1 差分を抽出する配列 
 * @param {*} arr2 差分の比較対象
 */
const diffArrayTEST = (arr1, arr2) => {
    return arr1.concat(arr2)
        .filter(item => !arr1.includes(item) || !arr2.includes(item));
}