(function() {
  // injectScript injects the script into the page and then removes it.
  const injectScript = file => {
    const hookInjector = document.createElement("script");
    hookInjector.type = "text/javascript";
    hookInjector.src = chrome.runtime.getURL(`tracy/scripts/${file}`);
    hookInjector.id = "injected";
    document.documentElement.appendChild(hookInjector);
    hookInjector.parentNode.removeChild(hookInjector);
  };

  // Create a listener on the shared window between content scripts and injected
  // scripts so that injected scripts can talk to the extension via window.postMessage.
  window.addEventListener("message", async event => {
    /*    console.log("[CS RECV FROM PAGE]", event);
    if (event.data.req) {
      const resp = await util.send({
        "message-type": "request",
        data: event.data.o,
        id: event.data.id
      });
      window.postMessage(
        { resp: true, o: resp.data.o, id: event.data.id },
        "*"
      );
    } else {*/
    util.send(event.data);
    //}
  });

  // A list of scripts we want to inject into the page rather than have them as
  // a content script.
  const injectionScripts = ["innerhtml.js", "repro.js"];
  injectionScripts.map(injectScript);
})();
