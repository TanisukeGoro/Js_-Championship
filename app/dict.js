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
    'we', 'our', 'us',
    'this', 'that', 'these', 'those',
    'they', 'their', 'them',
    'is', 'was', 'are', 'were',
]


var DICT_INDEX_KEYS = '';


window.onload = () => {
    // 辞書データの読み取り
    // from dict_src.js as DICT_INDEX_KEYS
    DICT_INDEX_KEYS = Object.keys(DICT_INDEX);
    document.addEventListener('mouseup', function(e) {
        selectedObj = window.getSelection();
        text = selectedObj.toString();
        if (text.length !== 0) idiomSearch(text);

    });
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
    matchTestChar = matchTestChar.filter(
        n => (BLACK_LIST.indexOf(n) === -1) && true);

    // 一致したresultsKeysから正確に一致している単語を抽出
    matchingIdiom = diffResultArr(matchTestChar, resultsKeys);


    const endTimes = performance.now()
    const processTime = endTimes - starTimes;

    // 結果があれば検索イベントを開始
    (matchingIdiom.length !== 0) && outputResults(matchingIdiom);
    console.log(`processTime => ${processTime.toFixed(3)} ms`);

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
        cardsData.push({
            title: matchingIdiom[i],
            description: highlightSearchResult(DICT_INDEX[matchingIdiom[i]])
        });

        highlight(document.querySelector('html'), matchingIdiom[i]);

        console.log(`idiom : ${matchingIdiom[i]}\n`, DICT_INDEX[matchingIdiom[i]]);
    };
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
 * @param {string} what 検索する文字列
 * @param {string} spanClass 適用するクラス
 */
function highlight(container, what) {
    var content = container.innerHTML
    const pattern = new RegExp(` ${what} `, 'gi')
    let highlighted = content.replace(pattern, ` <mark>${what}</mark> `);
    return (container.innerHTML = highlighted) !== content;
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



// ハッシュを用いて高速に処理を行えるのか考えたけど、今の所大丈夫そう
// var arrTable = '';
// const createHashTbale = () =>  {
//     const starTimes = performance.now()

//     arrTable = DICT_INDEX_KEYS.reduce(function(m, a, i) {
//         m[a] = (m[a] || []).concat(i);
//         return m;
//     }, {});
//     const endTimes = performance.now()
//     console.log(endTimes - starTimes);
// }

// const searchHash = (searchChar) => {
//     const starTimes = performance.now()
//     if (searchNum in arrTable) {
//         console.log(a);
//     }
//     const endTimes = performance.now()
//     console.log(endTimes - starTimes);
// }