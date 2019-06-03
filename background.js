chrome.browserAction.onClicked.addListener(function(tab) {
    // タブに送信する

    // 現在のタブについて情報を取得
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { greeting: "component" }, function(response) {
            console.log(response);
        });
    });
});