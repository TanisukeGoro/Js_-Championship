// var inputFile = document.getElementById('file');

// function fileChange(ev) {
//     var target = ev.target;
//     var files = target.files;

//     console.log(files);
// }

// inputFile.addEventListener('change', fileChange, false);
var DICT_INDEX = ''
window.onload = () => {
    DICT_INDEX = Object.keys(index);
    text = 'One use case might be an automatic form fill extension.';

}

/***
 * 与えられた文字列を元に検索をかける
 * 
 * アルゴリズム
 * 1. まずはスペース区切りで検索をかける
 * 2. 一致した単語の中で比較対象と同じ文字列長ならOK
 * 
 * 
 * 1. ブラックリストと一致していたら出力を弾く
 * 
 * 
 */
const search = searchChar => {
    const starTimes = performance.now();
    // 文字列の先頭と末尾のスペースは削除する
    searchChar = searchChar.trim();
    // 文字列を比較するときは小文字に変換してから比較する
    searchChar = searchChar.toLowerCase();
    // 一致した結果(keyのみ)を取得する
    resultsKeys = listupMatchChar(searchChar);

    matchTestChar = searchChar.split(' ');
    // 一致したresultsKeysから正確に一致している単語を抽出
    matchingIdiom = diffResultArr(matchTestChar, resultsKeys);
    console.log(matchingIdiom);
    // console.log(resultsKeys);
    const endTimes = performance.now()
    const processTime = endTimes - starTimes;
    console.log(`processTime => ${processTime.toFixed(3)} ms`);
}

/**
 * 入力された文字列に対して曖昧に一致する文字列を返す
 * @param {string} text 検索文字列 
 * @returns {Array}
 */
const listupMatchChar = text => {
    let returnArr = [];
    DICT_INDEX.forEach(a => {
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
    // 重複を削除
    matchTestChar = matchTestChar.filter(function(x, i, self) {
        return self.indexOf(x) === i;
    });
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
 * 配列の差分をとる関数のテスト。これはダメっぽい
 * @param {*} arr1 入力文字列を空白区切りした配列
 * @param {*} arr2 検索結果曖昧一致した配列
 */
const diffArrayTEST = (arr1, arr2) => {
    return arr1.concat(arr2)
        .filter(item => !arr1.includes(item) || !arr2.includes(item));
}

// keyが1文字のものは弾く
// blackList に存在する文字列も弾く
const blackList = [
    'I',
    'me',
    'me',
]

// ハッシュを用いて高速に処理を行えるのか考えたけど、今の所大丈夫そう
// var arrTable = '';
// const createHashTbale = () =>  {
//     const starTimes = performance.now()

//     arrTable = DICT_INDEX.reduce(function(m, a, i) {
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