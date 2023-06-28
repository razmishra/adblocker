'use strict';

function onMessage(message) {
  if (message.type === "showPopup") {
    // Block the popup from being shown.
    window.event.preventDefault();
  }
}
chrome.runtime.onMessage.addListener(onMessage);

const adList = [
  "*://*.doubleclick.net/*",
  "*://*.googlesyndication.com/*",
  "*://*.googletagservices.com/*",
  "*://*.googleadservices.com/*",
  "*://*.google-analytics.com/*",
  "*://*.googleadservices.com/*",
  "*://*.zedo.com/*",
  "*://*.adbrite.com/*",
  "*://*.adbureau.net/*",
  "*://* carbonads.net/*",
  "*://*.cdn.carbonads.com/*",
  "*://*.cdn.arbonads.net/*",
  "*://*.cdn.doubleclick.net/*",
  "*://*.cdn.googletagservices.com/*",
  "*://*.cdn.googleadservices.com/*",
  "*://5k4i.com/*",
  "*://ceesty.com/*",
  "*://clkme.me/*",
  "*://clkmein.com/*",
  "*://cllkme.com/*",
  "*://corneey.com/*",
  "*://destyy.com/*",
  "*://festyy.com/*",
  "*://festyy.com/*",
  "*://iklan.master-cyber.com/*",
  "*://links.orgasmatrix.com/*",
  "*://pj45.com/*",
  "*://sh.st/*",
  "*://shorte.st/*",
  "*://skiip.me/*",
  "*://viid.me/*",
  "*://wiid.me/*",
  "*://wik34.com/*",
  "*://xiw34.com/*",
  "*://zryydi.com/*",
]

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
  const msg = `Navigation blocked to ${e.request.url} on tab ${e.request.tabId}.`;
  console.log(msg);
});

chrome.declarativeNetRequest.onBeforeRequest.addListener(
  (details) => {return
     {cancel: true};
  },
  {urls: adList},
  ["blocking"]
)
// console.log('Service worker started.');