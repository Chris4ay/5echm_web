(function () {
  "use strict";

  var data = null;
  var built = false;

  function buildNav() {
    if (!data || built) return;
    built = true;

    var existing = document.getElementById("webhelpTopicNav");
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

    var nav = document.createElement("nav");
    nav.id = "webhelpTopicNav";
    nav.setAttribute("aria-label", "文章导航");

    if (data.prev) {
      var prevLink = document.createElement("a");
      prevLink.href = data.prev.url;
      prevLink.className = "webhelp-topic-nav-link webhelp-topic-nav-prev";
      prevLink.setAttribute("title", "上一页：" + data.prev.title);

      var prevDir = document.createElement("span");
      prevDir.className = "webhelp-topic-nav-direction";
      prevDir.textContent = "上一页";

      var prevTitle = document.createElement("span");
      prevTitle.className = "webhelp-topic-nav-title";
      prevTitle.textContent = data.prev.title;

      prevLink.appendChild(prevDir);
      prevLink.appendChild(prevTitle);
      nav.appendChild(prevLink);
    } else {
      var sp1 = document.createElement("div");
      sp1.className = "webhelp-topic-nav-spacer";
      nav.appendChild(sp1);
    }

    if (data.next) {
      var nextLink = document.createElement("a");
      nextLink.href = data.next.url;
      nextLink.className = "webhelp-topic-nav-link webhelp-topic-nav-next";
      nextLink.setAttribute("title", "下一页：" + data.next.title);

      var nextDir = document.createElement("span");
      nextDir.className = "webhelp-topic-nav-direction";
      nextDir.textContent = "下一页";

      var nextTitle = document.createElement("span");
      nextTitle.className = "webhelp-topic-nav-title";
      nextTitle.textContent = data.next.title;

      nextLink.appendChild(nextDir);
      nextLink.appendChild(nextTitle);
      nav.appendChild(nextLink);
    } else {
      var sp2 = document.createElement("div");
      sp2.className = "webhelp-topic-nav-spacer";
      nav.appendChild(sp2);
    }

    document.body.appendChild(nav);
  }

  function requestFromShell() {
    try {
      if (window.parent && window.parent.postMessage) {
        window.parent.postMessage({ type: "webhelp-topic-nav-request" }, "*");
      }
    } catch (e) {}
  }

  function handleMessage(event) {
    var msg = event && event.data;
    if (!msg || msg.type !== "webhelp-topic-nav") return;
    data = msg;
    built = false;
    buildNav();
  }

  window.addEventListener("message", handleMessage);

  if (document.body) {
    requestFromShell();
  } else {
    document.addEventListener("DOMContentLoaded", requestFromShell);
  }
})();
