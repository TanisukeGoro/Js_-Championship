// const $elem = elem => document.querySelector(elem);
// // const = $elem('.panel_container');
// // const naveyeiconElem = $elem('#navEyeicon>#nav-eye');
// const naveyeiconElem = $elem('#navEyeicon>img');
// const nav = $elem('.nav');
// const contents = $elem('.contents');

// // class name
// eyeOpen = 'c-eye--open';
// eyeClose = 'c-eye--close';
// openEyeState = true;

// let x, y, offset;
// let scrollTop = 0;
// let scrollLeft = 0;

// window.onscroll = function() {
//     scrollTop =
//         document.documentElement.scrollTop || // IE、Firefox、Opera
//         document.body.scrollTop; // Chrome、Safari
//     scrollLeft =
//         document.documentElement.scrollLeft || // IE、Firefox、Opera
//         document.body.scrollLeft; // Chrome、Safari
// }

// // // パネルのナビが押された時
// naveyeiconElem.addEventListener('click', () => {
//     const openPanel = () => {
//         openEyeState = true;
//         // 開く操作
//         naveyeiconElem.classList.add(eyeOpen);
//         naveyeiconElem.classList.remove(eyeClose);
//         contents.style.display = "block";
//         nav.classList.remove('nav-boxshadow');
//         contents.classList.remove('fadeout');
//     };
//     const closePanel = () => {
//         openEyeState = false;
//         //閉じる操作
//         naveyeiconElem.classList.add(eyeClose);
//         naveyeiconElem.classList.remove(eyeOpen);
//         contents.classList.add('fadeout');
//         nav.classList.add('nav-boxshadow');
//         setTimeout(function() {
//             contents.style.display = "none";
//         }, 1000);
//     };
//     (openEyeState === true) ? closePanel(): openPanel();
// });


// // パネル移動
// // トラックパッドでタッチした時の処理を追加しておくこと
// nav.addEventListener("mousedown", function(e) {

//     const mousedownOnNav = (event, nav) => {
//         let navPositon = nav.getBoundingClientRect();
//         offset = {
//             x: navPositon.x - event.pageX,
//             y: navPositon.y - event.pageY
//         }
//     };
//     const moveOnNav = (event) => {
//         // console.log(scrollTop, scrollLeft)
//         x = event.pageX + offset.x + scrollLeft;
//         y = event.pageY + offset.y + scrollTop;
//         panelElem.style.left = `${x}px`;
//         panelElem.style.top = `${y}px`;
//     };

//     mousedownOnNav(e, nav);
//     window.onmousemove = e => moveOnNav(e);
//     this.addEventListener("mouseup", function(e) {
//         window.onmousemove = null
//     });
// });