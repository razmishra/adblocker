'use strict';

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
  const msg = `Navigation blocked to ${e.request.url} on tab ${e.request.tabId}.`;
  console.log(msg);
});

console.log('Service worker started.');

//Pattern Matching
const adPatterns = [
  'advertising.com',
  'example.com/ad',
  '/advertisements/',
  '?utm_source=ad',
  // Add more patterns, it is necessary
];


const adsProvider = [
	"*://*.doubleclick.net/*",
	"*://*.scorecardresearch.com/*",
	"*://*.googlesyndication.com/*",
	"*://*.google-analytics.com/*",
	"*://*.zedo.com/*",
	"*://partner.googleadservices.com/*",
	"*://creative.ak.fbcdn.net/*",
	"*://*.adbrite.com/*",
	"*://*.exponential.com/*",
	"*://*.quantserve.com/*",
]

let redirectUrl = '';

chrome.webRequest.onBeforeRequest.addListener(
    function(details) 
	{ 
    const url = details.url.toLowerCase();
    for(const pattern of adPatterns){
      if(url.includes(pattern)){
        //Ad pattern matched, store the current URL and redirect
        //the user
        redirectUrl = details.url;

        //ad pattern matches, take appropriate action
        return { redirectUrl: 'https://google.com'}
      }
    }
	},
    { 
		urls:['<all_urls>', ...adsProvider],
	},
    ["blocking"]
);

chrome.webRequest.onBeforeRedirect.addListener(
  function (details) {
    const redirectTabId = details.tabId;
    if(details.redirectUrl === 'https://google.com'){
      //The user was redirected to a custom page, redirect them
      //back to the original URL
      chrome.tabs.update(redirectTabId, { url, redirectUrl});
    }
    
  }
)