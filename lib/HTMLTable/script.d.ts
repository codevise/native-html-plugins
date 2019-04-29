declare const injectedScript = "\n\nvar RNWV = window.ReactNativeWebView;\n\n// Send size on body content height updates\nfunction postSize() {\n    //https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript\n    var body = document.body, html = document.documentElement;\n    var maxHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);\n    RNWV.postMessage(JSON.stringify({\n      type: 'heightUpdate',\n      content: maxHeight\n    }));\n}\npostSize();\n//trigger when DOM changes\nvar MutationObserver = window.MutationObserver || window.WebKitMutationObserver;\nvar observer = new MutationObserver(postSize);\nobserver.observe(document, {\n    subtree: true,\n    attributes: true\n});\n\n// Intercept click events\n\nfunction interceptClickEvent(e) {\n  var href;\n  var target = e.target || e.srcElement;\n  if (target.tagName === 'A') {\n      href = target.getAttribute('href');\n      e.preventDefault();\n      // Post message\n      RNWV.postMessage(JSON.stringify({\n        type: 'navigateEvent',\n        content: href\n      }));\n  }\n}\n\ndocument.addEventListener('click', interceptClickEvent);\n";
export default injectedScript;
