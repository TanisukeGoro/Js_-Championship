console.log('これはテスト');

// chrome.runtime.onMessage.addListener(function(msg) {
//     console.log(msg);
// });
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     // write some code
//     sendResponse(request);
// });
// console.log($.load(panelframe));
// let insertXML = new XMLHttpRequest();
// if ((insertXML.readyState === 4) && (insertXML.status === 200)) {
//     $('body').
// }
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('hello');
        if (request.greeting == "hello") {
            console.log(request.greeting);
            sendResponse({ farewell: "goodbye" });
        }
        return true;
    });

console.log('appendしたよ');