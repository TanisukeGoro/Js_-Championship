chrome.browserAction.onClicked.addListener(function(tab) {
    // 現在のタブについて情報を取得
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // タブに送信する
        chrome.tabs.sendMessage(tabs[0].id, { greeting: "component" }, function(response) {
            console.log('test');
            console.log(response);
        });
    });
});