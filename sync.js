const CLIENT_ID = "Iv1.a249e57e1459d5bd";
const REDIRECT_URL = "https://henrylin666.gitee.io/clearwriter/callback.html";
const CLIENT_SECRET = "01b9bb8f4a3942f68dbbea7fc13848785613defc";
const AUTH_LINK =
  `https://github.com/login/oauth/authorize?` +
  `client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=gist`;
function githubSyncStart() {
  const { BrowserWindow } = require("electron").remote;
  let githubAuthWin = new BrowserWindow({ width: 800, height: 600 });
  githubAuthWin.loadURL(AUTH_LINK);
  githubAuthWin.webContents.openDevTools();
  githubAuthWin.webContents.addListener("did-navigate", (event, url) => {
    console.log(url);
    if (!url.match(/clearwriter\/callback.html/)) return;
    var code = url;
    var start = code.indexOf("?code=") + 6;
    console.log(code.indexOf("&state"));
    var end =
      code.indexOf("&state") == -1 ? code.length : code.indexOf("&state");
    code = code.substring(start, end);
    console.log(code);
    $.ajax({
      type: "POST",
      url: "https://github.com/login/oauth/access_token",
      data: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        Accept: "application/json",
      },
      success: (callback) => {
        console.log(callback);
        console.log(callback.access_token);
      },
    });
  });
}
