/**
 * cardsDataをバインドしてcardを生成まくる。
 * カードのスクロールに合わせてフェードアウトするはずだけど
 * divの中に入れたら動かなくなった、絶望
 */
// console.log('Card js is loaded!!!');

// MutationObserver(
//     function() {
//         console.log('変更がありました！！');
//     }
// )
let isPanel = false;
let cardArr = [];
// メッセージを元に、 panelの表示状態を習得
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        (isPanel) ? isPanel = false: isPanel = true;
        console.log(isPanel);
        return true
    });
displayFlg = true;
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let key in changes) {
        let storageChange = changes[key];
        if (key == 'idiomListData') {
            newCard = storageChange.newValue;
            oldCard = storageChange.oldValue;

            if (oldCard == undefined) {
                displayFlg = true;
                for (let i = 0; i < newCard.length; i++) {
                    cardArr.push(new Card(newCard[i].title, newCard[i].description));
                }
                continue;
            };

            for (let i = 0; i < newCard.length; i++) {
                for (let j = 0; j < oldCard.length; j++) {
                    if (newCard[i].title === oldCard[j].title) displayFlg = false;
                }
                if (displayFlg === true)
                    cardArr.push(new Card(newCard[i].title, newCard[i].description));
                displayFlg = true;
            }
            console.log(cardArr);
        }
    }

});

const checkingObjDuplicate = (newIdiom, oldIdiom) => {
    newIdiom.concat(oldIdiom);
    let arrObj = {};
    for (var i = 0; i < newIdiom.length; i++) {
        arrObj[newIdiom[i]['title']] = newIdiom[i];
    }
    let outputObj = [];
    for (var key in arrObj) {
        outputObj.push(arrObj[key]);
    }
    return outputObj
}



class Card {
    constructor(title, description) {
        this.title = title;
        this.cardID = `idiom-${this.title.replace(/\s+/g, "")}`
        this.sendBtnID = `idom-send-btn-${this.title.replace(/\s+/g, "")}`
        this.deleatBtnID = `idom-delete-btn-${this.title.replace(/\s+/g, "")}`
        this.description = description;
        this.init();
    }

    init = () => {
        this.cardHTML = `
            <div class="card__content">
                <h3>${this.title}</h3>
                <p>${this.description}</p>
            </div>
            <button id="${this.sendBtnID}" class="idiom-send send--icon"></button>
            <button id="${this.deleatBtnID}" class="idiom-delete delete--icon"></button>
        `
        this.createCardDOM()
    };

    createCardDOM = () => {
        this.cardDOM = document.createElement('div');
        this.cardDOM.setAttribute('class', 'card');
        this.cardDOM.setAttribute('id', this.cardID);
        this.cardDOM.innerHTML = this.cardHTML;
        this.idiomPanelWrapper = document.querySelector('#idiom-card--app');
        this.idiomPanelWrapper.appendChild(this.cardDOM);
        this.cardBind();
        this.cardAttch();
    };
    cardBind = () => {
        this.sendCardBtn = document.getElementById(this.sendBtnID);
        this.deleteCardBtn = document.getElementById(this.deleatBtnID);
    }
    cardAttch = () => {
        this.sendCardBtn.addEventListener('click', this.cardSend);
        this.deleteCardBtn.addEventListener('click', this.cardDelete);
    }

    cardSend = (e) => {
        this.sendCardBtn.style.backgroundColor = "#0fd378";
    }
    cardDelete = (e) => {
        this.cardDOM.parentNode.removeChild(this.cardDOM);
    }

}






// const target = document.querySelector('html');
// const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//         console.log(mutation.target);
//         console.log('変更されたよ')
//     })
// })
// const mutationConfig = {
//     attributes: true,
//     characterData: true,
//     subtree: true
// }
// observer.observe(target, mutationConfig);



// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         switch (request.greeting) {
//             case 'component':
//                 (panelDispFlg === true) ? create(): deleted();
//                 sendResponse({ farewell: "this is Panel" });
//                 break;

//             default:
//                 break;
//         }
//         // if (request.greeting == "component") {
//         //     sendResponse({ farewell: "this is Panel" });
//         //     console.log(request.greeting);
//         //     a = new Panel();
//         //     a.createPanelDOM();
//         // }
//         return true
//     });


// new Vue({
//     el: '#app',
//     data: {
//         cards: cardsData,
//         scrollPosition: 0
//     },
//     filters: {
//         oneDecimal: function(value) {
//             return value.toFixed(1)
//         },
//         toStars: function(value) {
//             let result = ''
//             while (result.length < value) {
//                 result += '★'
//             }
//             return result
//         }
//     },
//     computed: {
//         styledCards() {
//             return this.cards.map(this.calculateCardStyle)
//         }
//     },
//     methods: {
//         onScroll() {
//             this.scrollPosition = window.scrollY
//         },
//         calculateCardStyle(card, index) {
//             const cardHeight = 110 // height + padding + margin

//             const positionY = index * cardHeight
//             const deltaY = positionY - this.scrollPosition

//             // constrain deltaY between -160 and 0
//             const dY = this.clamp(deltaY, -cardHeight, 0)

//             const dissapearingValue = (dY / cardHeight) + 1
//             const zValue = dY / cardHeight * 50
//             const yValue = dY / cardHeight * -20
//             card.style = {
//                 opacity: dissapearingValue,
//                 transform: `perspective(200px) translate3d(0,${yValue}px, ${zValue}px)`
//             }
//             return card
//         },
//         clamp(value, min, max) {
//             return Math.min(Math.max(min, value), max)
//         }
//     }
// })
// Vue.directive('scroll', {
//     inserted: function(el, binding) {
//         let f = function(evt) {
//             if (binding.value(evt, el)) {
//                 window.removeEventListener('scroll', f)
//             }
//         }
//         window.addEventListener('scroll', f)
//     }
// })