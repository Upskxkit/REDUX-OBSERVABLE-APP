const links = [
  "mozilla/5.0 (macintosh; intel mac os x 10_14_5) applewebkit/537.36 (khtml, like gecko) chrome/87.0.4280.88 safari/537.36 opr/73.0.3856.329",
  "mozilla/5.0 (macintosh; intel mac os x 10.14; rv:84.0) gecko/20100101 firefox/84.0",
  "mozilla/5.0 (macintosh; intel mac os x 10_14_5) applewebkit/605.1.15 (khtml, like gecko) version/12.1.1 safari/605.1.15",
  "mozilla/5.0 (macintosh; intel mac os x 10_14_5) applewebkit/537.36 (khtml, like gecko) chrome/87.0.4280.88 safari/537.36",
  "mozilla/5.0 (linux; android 11; sm-g980f) applewebkit/537.36 (khtml, like gecko) chrome/86.0.4240.198 mobile safari/537.36 opr/61.2.3076.56749",
  "mozilla/5.0 (android 11; mobile; rv:84.0) gecko/84.0 firefox/84.0",
  "mozilla/5.0 (linux; android 11; sm-g980f) applewebkit/537.36 (khtml, like gecko) chrome/87.0.4280.101 mobile safari/537.36",
];

// Detects if device is in standalone mode
export const isInStandaloneMode = () =>
  "standalone" in window.navigator && window.navigator.standalone;

export function isIos(userAgentRaw = window.navigator.userAgent) {
  return checkUserAgent(/iphone|ipad|ipod/, userAgentRaw);
}

export function isChrome(userAgentRaw = window.navigator.userAgent) {
  const result = checkUserAgent(/^.*chrome((?!opr).)*?$/, userAgentRaw);
  console.log(userAgentRaw, "result: " + result);
  return result;
}

export function checkUserAgent(regExp, userAgentRaw) {
  const userAgent = userAgentRaw.toLowerCase();

  if (!regExp instanceof RegExp) {
    throw new Error(
      `${JSON.stringify(
        regExp
      )} isn't instance of RegExp, need pass only instance of RegExp - /xxx/ or new RegExp('xxx', flags)`
    );
  }

  return regExp.test(userAgent);
}
