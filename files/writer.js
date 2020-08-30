var cover_cnt = -1;
      cur_num = null;
      (function () {
        var fullScreenApi = {
            supportsFullScreen: false,
            isFullScreen: function () {
              return false;
            },
            requestFullScreen: function () {},
            cancelFullScreen: function () {},
            fullScreenEventName: "",
            prefix: "",
          },
          browserPrefixes = "webkit moz o ms khtml".split(" ");

        // check for native support
        if (typeof document.cancelFullScreen != "undefined") {
          fullScreenApi.supportsFullScreen = true;
        } else {
          // check for fullscreen support by vendor prefix
          for (var i = 0, il = browserPrefixes.length; i < il; i++) {
            fullScreenApi.prefix = browserPrefixes[i];

            if (
              typeof document[fullScreenApi.prefix + "CancelFullScreen"] !=
              "undefined"
            ) {
              fullScreenApi.supportsFullScreen = true;

              break;
            }
          }
        }

        // update methods to do something useful
        if (fullScreenApi.supportsFullScreen) {
          fullScreenApi.fullScreenEventName =
            fullScreenApi.prefix + "fullscreenchange";

          fullScreenApi.isFullScreen = function () {
            switch (this.prefix) {
              case "":
                return document.fullScreen;
              case "webkit":
                return document.webkitIsFullScreen;
              default:
                return document[this.prefix + "FullScreen"];
            }
          };
          fullScreenApi.requestFullScreen = function (el) {
            return this.prefix === ""
              ? el.requestFullScreen()
              : el[this.prefix + "RequestFullScreen"]();
          };
          fullScreenApi.cancelFullScreen = function (el) {
            return this.prefix === ""
              ? document.cancelFullScreen()
              : document[this.prefix + "CancelFullScreen"]();
          };
        }

        // jQuery plugin
        if (typeof jQuery != "undefined") {
          jQuery.fn.requestFullScreen = function () {
            return this.each(function () {
              var el = jQuery(this);
              if (fullScreenApi.supportsFullScreen) {
                fullScreenApi.requestFullScreen(el);
              }
            });
          };
        }
        // export api
        window.fullScreenApi = fullScreenApi;
      })();
      if (localStorage.disable_animation == 1) {
        document.getElementById("advanced_control").innerHTML =
          "*{transition:none !important;animation:none !important} *:after{transition:none !important;}";
      }

      const default_text =
      "# Welcome to Clear Writer，这是一个沉浸式 Markdown 写作软件。\n\n## 为什么编写 Clear Writer\n\n我开了我自己的博客之后，一直苦于 Windows 端没有我喜欢的 Markdown 编辑器。\n\n> 其实写作，最需要的并不是很好很强大的工具，而是一个不易让人分心的环境。\n\nMac上的 iA Writer 固然能很好地做到这一点，但作为一个初二学生，我确实也没有那个经济实力去买正版。我也不打算用盗版。我找到了一个类似的软件，叫做 [4Me 写字板](http://write4Me.sinaapp.com/)。它基于 CodeMirror。但是，它和 iA Writer 的差距未免有点大……\n\n但这却给了我一个启发：为什么不自己动手试着用 CodeMirror 制作一个 Markdown 编辑器呢？\n\n于是我征求了原作者同意之后，借着这次因新冠疫情宅家的时间，尝试自己以 4Me 写字板为蓝本，制作自己的写作工具。于是我做出了这个 Markdown 编辑器 —— Clear Writer，意味着希望人们使用它时，可以让人理清自己的思维。\n\n另外，Clear Writer 的一个很重要的一点是它支持实时 Markdown 语法。很多的所谓实时 Markdown，我都不是很喜欢——因为它们会把 Markdown 格式标记隐去。我不喜欢这样，我喜欢让格式牢牢掌控在使用者的手里。\n\n## Clear Writer 的特点\n- 全自动保存；\n- 所见即所得的实时 MarkDown，以及标题悬挂；\n- 支持亮色 / 暗色模式；\n- 漂亮的隐藏式滚动条；\n- 支持简体中文 / 繁体中文 / 英文三种语言；\n- 支持开启 / 关闭行号；\n- 高亮当前段落；\n- 漂亮的光标闪动和跳动效果；\n- 界面自适应；\n- 内容全部在本地缓存，完全隐私保护；\n- 支持导出 `.txt`、`.md`、`.doc`、`.html`、带 CSS 的 `html` 5 种格式；\n- 平滑滚动；\n- 可让你立即进入状态的”闪念“功能（v1.7+）。\n\n## 使用技巧\n\n- 点击顶栏上的全屏按钮或按下 `F11`（或 `Fn + F11`）切入全屏，安心写作；\n- 鼠标移动至顶部时显示顶栏，其中可以切换亮/暗色模式、行号、语言等；\n- 点击顶栏上的图钉 `📌` 按钮可以固定顶栏，使其不自动隐藏；\n- 右上角有 `另存为...` 按钮，点击可以将文字导出为其他格式文本；\n- 点击左上角的 `Clear Writer` 会在侧边栏显示你现在正在看的这段文字，再次点击 `Clear Writer` 隐藏侧边栏；\n- 可撤销最近的 2000 次操作，无惧修改；\n- Clear Writer 全自动保存，正常情况下每 3 分钟自动保存一次，在关闭的时候也会再次自动保存一次。实在不放心，还可以 `Ctrl + S` 手动保存；\n- 查找：`Ctrl + F`；\n- 查找下一个：`Ctrl + G`；\n- 查找上一个：`Shift + Ctrl + G`；\n- 替换：`Shift + Ctrl + F`；\n- 替换全部：`Shift + Ctrl + R`。\n\n## 兼容性\n\nWindows 7 及以上。\n\n## 关于\n\nClear Writer 使用 GNU General Public License 3.0 进行许可。\n\n编码工具：Visual Studio & Visual Studio Code\n安装包制作工具：NSIS\n\n### Clear Writer 的诞生离不开：\n\n- 西文字体：NeverMind（SIL Open Font License 1.1）；\n- 中文字体：思源黑体（SIL Open Font License 1.1）；\n- 编辑器基础：CodeMirror（MIT License）；\n- Markdown 渲染：editor.md（MIT License）；\n- 构建基础：Electron（MIT License）；\n- 蓝本：4Me Writer，无协议状态，但已经开发者口头许可。\n\n衷心感谢所有为本项目提供支持与帮助的人。";
    //暗色模式CSS常量定义
    var darktheme =
      "*{--background:#252829;--darkback:#1A1C1D;--vscrollbar:#1A1C1D60;--selection:#fff2;--unfocusedselection:#252525;--active:#eee;--line: #222;--scroll:#666;--com:#fff1;--shadow:rgba(255,255,255,.3);--lighter:1.3;--darker:0.7;}";
    //亮色模式CSS常量定义
    var lighttheme =
      "*{--background:#f8f8f8;--darkback:#EEE;--vscrollbar:#EEE6;--selection:#C2E8F4;--unfocusedselection:#E5E5E5;--active:#333;--line: #ddd;--scroll:#aaa;--com:#0001;--shadow:rgba(0,0,0,.2);--lighter:1.1;--darker:0.9;}";
          //手搓i18n
      var cur_num;
      var fscreen = 0;
      var quicknote = 0; //闪念模式
      var stick = 0; //固定顶栏
      var about = 0; //“关于”栏
      var settings = 0; //设置栏
      var DARK,
        LIGHT,
        ON,
        OFF,
        SAVED_AT,
        AUTO_SAVED_AT,
        CHOOSE_FILE,
        NEW,
        WELCOME,
        ENSURE_DEL,
        YES,
        FNAME,
        FBLINK = "https://support.qq.com/products/174144",
        SEARCH,
        REPLACE,
        SEARCHTIP,
        RWITH,
        CREATE_FROM_FILE,
        RELSE_MOUSE,
        DRAG_HERE,
        SUCCEED,
        ALL,
        CANCEL,
        SKIP,
        PREVIEW,
        OR,
        CLICK_TO_UPLOAD,
        COUNT,
        WORD,
        CHAR,
        TIME,
        WITH_SPACE,
        NO_WHEN_MSGBOX,
        SAVE_AS,
        CHOOSE_MAIN_COLOR,
        DIY_COLOR,
        SET_TO_DEFALT,
        AUTO,
        WITH_STYLE,
        QUICK_NOTE,
        TERM,
        DEFALT;
      function set_lang_to(lang) {
        //用于初始化语言的函数
        switch (lang) {
          case "en":
            DARK = "Dark";
            LIGHT = "Light";
            ON = "On";
            OFF = "Off";
            SAVED_AT = "Saved at ";
            AUTO_SAVED_AT = "Automatically saved at ";
            CHOOSE_FILE = "Choose a file";
            NEW = "New";
            ENSURE_DEL =
              "Are you sure to delete it permanently? It is IRREVERSIBLE.";
            YES = "Yes";
            FNAME = "Rename";
            SEARCH = "Search";
            REPLACE = "Replace";
            SEARCHTIP =
              "Use /re/ syntax for regex search. <br />Press Esc to Exit.";
            RWITH = "With";
            RELSE_MOUSE = "release the mouse button";
            DRAG_HERE = "Drag the file here";
            CREATE_FROM_FILE = "Create a file from a local file...";
            SUCCEED = "Your file uploaded successfully";
            ALL = "All";
            CANCEL = "Cancel";
            SKIP = "Skip";
            PREVIEW = "Preview";
            OR = "or";
            CLICK_TO_UPLOAD = "Click to open a file";
            COUNT = "Count";
            WORD = "Words";
            CHAR = "Chars";
            TIME = "Expected reading time";
            WITH_SPACE = " (with spaces)";
            NO_WHEN_MSGBOX =
              "Commands cannot be executed when a dialog box is open";
            SAVE_AS = "Save as...";
            CHOOSE_MAIN_COLOR = "Choose main color";
            DIY_COLOR = "Pick a color...";
            SET_TO_DEFALT = "Set to defalt";
            WITH_STYLE = " (with styles)";
            QUICK_NOTE = "Quick note";
            TERM = "Monospaced font";
            DEFALT = "Normal font";
            $("#title_of_theme").html("Theme");
            $("#title_of_num").html("Line Number");
            $("#title_of_lang").html("Language");
            $("#lang").html("English");
            $("#save_btn").html("Save as...");
            $("#about").html(
              '<h1 id="h1-welcome-to-clear-writer-an-immersive-markdown-writing-software-"><a name="Welcome to Clear Writer, an immersive Markdown writing software." class="reference-link"></a><span class="header-link octicon octicon-link"></span>Welcome to Clear Writer, an immersive Markdown writing software.</h1><h2 id="h2-why-to-write-clear-writer"><a name="Why to write Clear Writer" class="reference-link"></a><span class="header-link octicon octicon-link"></span>Why to write Clear Writer</h2><p>After starting my own blog, I’ve been struggling with the lack of a Markdown editor on the Windows that I like.</p><blockquote><p>Actually, we don’t need a very powerful tool for writing. All we need is an environment that can make us not easily distracted.</p></blockquote><p>iA Writer certainly does this well, but as a student, I really didn’t have the means to buy the software. And I don’t plan to use piracy either. I found a silimar software called <a href="http://write4Me.sinaapp.com/">4Me Writer</a>. It is based on CodeMirror, but the difference between it and iA Writer is a bit large….</p><p>But it did inspire me: why not try making a Markdown editor with CodeMirror myself?</p><p>So after asking the original author’s permission, I took the time to try to make my own writing tool using the 4Me writing board as a model. So I made this Markdown editor — Clear Writer — meaning that I wanted people to use it so that they could clear their minds.</p><p>Also, a very important thing about Clear Writer is that it supports real-time Markdown preview. A lot of the so-called real-time Markdowns, I’m not a big fan of - because they hide the Markdown format markup. I don’t like that, I like to keep the format firmly in the hands of the user.</p><h2 id="h2-features-of-clear-writer"><a name="Features of Clear Writer" class="reference-link"></a><span class="header-link octicon octicon-link"></span>Features of Clear Writer</h2><ul><li>Fully automated preservation.</li><li>Real-time MarkDown for WYSIWYG, and title hanging.</li><li>Support bright/dark mode.</li><li>Nice scroll bar.</li><li>Support Simplified Chinese / Traditional Chinese / English.</li><li>Support for turning line numbers on/off.</li><li>Highlight the current paragraph.</li><li>Beautiful cursor flickering and jumping effects.</li><li>Interface adaptation.</li><li>All content is cached locally, with full privacy protection.</li><li>Support for exporting <code>.txt</code>, <code>.md</code>, <code>.doc</code>, <code>.html</code>, <code>html (with CSS)</code> in 5 formats.</li><li>Smooth rolling.</li><li>Quick note (v1.7+) that puts you in a writing state immediately.</li></ul><h2 id="h2-tips-for-using"><a name="Tips for using" class="reference-link"></a><span class="header-link octicon octicon-link"></span>Tips for using</h2><ul><li>Writing with peace of mind by clicking the full screen button on the title bar or by pressing <code>F11</code> (or <code>Fn + F11</code>) to go full screen.</li><li>The top bar is displayed when the mouse is moved to the top, where it is possible to switch between light/dark modes, line numbers, language, etc.</li><li>The top bar can be fixed so that it is not automatically hidden by clicking the <code>📌</code> button on the top bar.</li><li>The upper right corner has the <code>Save as...</code> button, which allows the text to be exported to other text formats.</li><li>Clicking on <code>Clear Writer</code> in the upper left corner will display the text you are reading right now — this article — in the sidebar, and clicking on <code>Clear Writer</code> again will hide the sidebar.</li><li>The last 2000 operations can be revoked without fear of modification.</li><li>Clear Writer saves automatically, normally every 3 minutes, and again when it is closed. If you are not sure, you can also save it manually by <code>Ctrl + S</code>.</li><li>Search: <code>Ctrl + F</code>.</li><li>Find the next one: <code>Ctrl + G</code>.</li><li>Find previous: <code>Shift + Ctrl + G</code>.</li><li>Replace: <code>Shift + Ctrl + F</code>.</li><li>Replace all: <code>Shift + Ctrl + R</code>.</li></ul><h2 id="h2-compatibility"><a name="Compatibility" class="reference-link"></a><span class="header-link octicon octicon-link"></span>Compatibility</h2><p>Windows 7+.</p><h2 id="h2-about-"><a name="About." class="reference-link"></a><span class="header-link octicon octicon-link"></span>About.</h2><p>Clear Writer is licensed under the GNU General Public License 3.0.</p><p>Coding tool: Visual Studio & Visual Studio Code<br>Installer creation tool: NSIS</p><h3 id="h3-clear-writer-was-born-from-"><a name="Clear Writer was born from." class="reference-link"></a><span class="header-link octicon octicon-link"></span>Clear Writer was born from:</h3><ul><li>Font: NeverMind (SIL Open Font License 1.1), Sarasa Gothic (SIL Open Font License 1.1).</li><li>Editor base: CodeMirror (MIT License).</li><li>Markdown rendering: editor.md (MIT License).</li><li>Building blocks: Electron (MIT License).</li><li>Icons: Font Awsome (Font Awesome Free License).</li><li>Blueprint: 4Me Writer, no agreement status, but has been orally licensed by the developer.</li></ul><p>Thanks to all those who have supported and helped with this project.</p>'
            );
            $("#copy").html("Copy");
            $("#paste").html("Paste");
            $("#cut").html("Cut");
            $("#selectall").html("Select all");
            $("#bold").html("Bold");
            $("#italic").html("Italic");
            $("#linethrough").html("Strike through");
            $("#hyperlink").html("Hyper link");
            $("#undo").html("Undo");
            $("#redo").html("Redo");
            $("#title_of_main_color").html("Main color");
            $("#fold").html("Fold");
            $("#advance").html("Advanced");
            $("#title_of_disable_animation").html("Disable Animations");
            $("#title_of_settings").html("Settings");
            $("#title_of_look").html("Appearance");
            $("#set_main_color").html("Set...");
            $("#title_of_font").html("Font");
            break;
          case "zh-hk":
            ON = "開";
            OFF = "關";
            SAVED_AT = "已存儲於 ";
            AUTO_SAVED_AT = "已自動存儲於 ";
            CHOOSE_FILE = "選擇檔案";
            NEW = "新建";
            ENSURE_DEL = "確定永久删除？此操作不可撤銷。";
            YES = "確定";
            SEARCH = "蒐索";
            REPLACE = "替換";
            SEARCHTIP =
              "使用 /re/ 語法以使用規則運算式蒐索，<br />按下 Esc 以退出";
            RWITH = "替換為";
            CREATE_FROM_FILE = "從檔案新建...";
            RELSE_MOUSE = "放開滑鼠";
            DRAG_HERE = "將檔案拖到此處";
            SUCCEED = "讀取成功";
            SKIP = "跳過";
            PREVIEW = "預覽";
            DARK = "暗";
            LIGHT = "亮";
            FNAME = "重命名";
            ALL = "全部";
            CANCEL = "取消";
            OR = "或";
            CLICK_TO_UPLOAD = "點此打開文件";
            COUNT = "統計";
            WORD = "字詞數";
            CHAR = "字元數";
            TIME = "預期閱讀時間";
            WITH_SPACE = " (包含空格)";
            NO_WHEN_MSGBOX = "對話方塊打開時無法執行命令";
            SAVE_AS = "另存為...";
            CHOOSE_MAIN_COLOR = "選擇主題色";
            DIY_COLOR = "選擇顏色...";
            SET_TO_DEFALT = "設為預設值";
            WITH_STYLE = "（帶有樣式）";
            QUICK_NOTE = "速記";
            TERM = "等寬字體";
            DEFALT = "預設字體";
            $("#title_of_theme").html("主題");
            $("#title_of_num").html("行號");
            $("#title_of_lang").html("語言");
            $("#lang").html("繁體中文");
            $("#save_btn").html("另存為...");
            $("#about").html(
              '<h1 id="h1-welcome-to-clear-writer-markdown-"><a name="Welcome to Clear Writer，這是一個沉浸式 Markdown 寫作軟件。" class="reference-link"></a><span class="header-link octicon octicon-link"></span>Welcome to Clear Writer，這是一個沉浸式 Markdown 寫作軟件。</h1><h2 id="h2--clear-writer"><a name="為什麼編寫 Clear Writer" class="reference-link"></a><span class="header-link octicon octicon-link"></span>為什麼編寫 Clear Writer</h2><p>我開了我自己的部落格之後，一直苦於Windows端沒有我喜歡的Markdown編輯器。</p><blockquote><p>其實寫作，最需要的並不是很好很强大的工具，而是一個不易讓人分心的環境。</p></blockquote><p>Mac上的iA Writer固然能很好地做到這一點，但作為一個初二學生，我確實也沒有那個經濟實力去買正版。我也不打算用盜版。我找到了一個類似的軟件，叫做 <a href="http://write4Me.sinaapp.com/">4Me寫字板</a>。它基於CodeMirror。但是，它和 iA Writer的差距未免有點大……</p><p>但這卻給了我一個啟發：為什麼不自己動手試著用CodeMirror製作一個Markdown編輯器呢？</p><p>於是我徵求了原作者同意之後，借著這次因新冠疫情宅家的時間，嘗試自己以4Me寫字板為藍本，製作自己的寫作工具。於是我做出了這個Markdown編輯器——Clear Writer，意味著希望人們使用它時，可以讓人理清自己的思維。</p><p>另外，Clear Writer的一個很重要的一點是它支持實时Markdown語法。很多的所謂實时Markdown，我都不是很喜歡——因為它們會把Markdown格式標記隱去。我不喜歡這樣，我喜歡讓格式牢牢掌控在使用者的手裡。</p><h2 id="h2-clear-writer-"><a name="Clear Writer 的特點" class="reference-link"></a><span class="header-link octicon octicon-link"></span>Clear Writer 的特點</h2><ul><li>全自動保存；</li><li>所見即所得的實时MarkDown，以及標題懸掛；<br>-支持亮色/暗色模式；<br>-漂亮的隱藏式滾動條；<br>-支持簡體中文/繁體中文/英文三種語言；<br>-支持開啟/關閉行號；<br>-高亮當前段落；<br>-漂亮的光標閃動和跳動效果；<br>-介面自我調整；<br>-內容全部在本地緩存，完全隱私保護；<br>-支持匯出<code>.txt</code>、<code>.md</code>、<code>.doc</code>、<code>.html</code>、帶CSS的<code>html</code> 5種格式；<br>-平滑滾動；<br>-可讓你立即進入狀態的”閃念“功能（v1.7+）</li></ul><h2 id="h2-u4F7Fu7528u6280u5DE7"><a name="使用技巧" class="reference-link"></a><span class="header-link octicon octicon-link"></span>使用技巧</h2><ul><li>點擊頂欄上的全屏按鈕或按下<code>F11</code>（或<code>Fn + F11</code>）切入全屏，安心寫作；</li><li>滑鼠移動至頂部時顯示頂欄，其中可以切換亮/暗色模式、行號、語言等；</li><li>點擊頂欄上的圖釘<code>📌</code>按鈕可以固定頂欄，使其不自動隱藏；</li><li>右上角有<code>另存為…</code>按鈕，點擊可以將文字匯出為其他格式文字；</li><li>點擊左上角的<code>Clear Writer</code>會在側邊欄顯示你現在正在看的這段文字，再次點擊<code>Clear Writer</code>隱藏側邊欄；</li><li>可撤銷最近的2000次操作，無懼修改；</li><li>Clear Writer全自動保存，正常情况下每3分鐘自動保存一次，在關閉的時候也會再次自動保存一次。實在不放心，還可以<code>Ctrl + S</code>手動保存；<br>-查找：<code>Ctrl + F</code>；<br>-查找下一個：<code>Ctrl + G</code>；<br>-查找上一個：<code>Shift + Ctrl + G</code>；<br>-替換：<code>Shift + Ctrl + F</code>；<br>-替換全部：<code>Shift + Ctrl + R</code>。</li></ul><h2 id="h2-u76F8u5BB9u6027"><a name="相容性" class="reference-link"></a><span class="header-link octicon octicon-link"></span>相容性</h2><p>Windows 7及以上。</p><h2 id="h2-u95DCu65BC"><a name="關於" class="reference-link"></a><span class="header-link octicon octicon-link"></span>關於</h2><p>Clear Writer使用GNU General Public License 3.0進行許可。</p><p>編碼工具：Visual Studio & Visual Studio Code<br>安裝包製作工具：NSIS</p><h3 id="h3-clear-writer-"><a name="Clear Writer的誕生離不開：" class="reference-link"></a><span class="header-link octicon octicon-link"></span>Clear Writer的誕生離不開：</h3><ul><li>西文字體：NeverMind（SIL Open Font License 1.1）；</li><li>中文&等距字體：更紗黑體（SIL Open Font License 1.1）；</li><li>編輯器基礎：CodeMirror（MIT License）；</li><li>Markdown渲染：editor.md（MIT License）；</li><li>構建基礎：Electron（MIT License）；</li><li>图标：Font Awsome (Font Awesome Free License)；</li><li>藍本：4Me Writer，無協定狀態，但已經開發者口頭許可。</li></ul><p>衷心感謝所有為本項目提供支援與幫助的人。</p>'
            );
            $("#cut").html("剪切");
            $("#copy").html("複製");
            $("#paste").html("粘貼");
            $("#selectall").html("全選");
            $("#bold").html("粗體");
            $("#italic").html("斜體");
            $("#linethrough").html("删除線");
            $("#hyperlink").html("超連結");
            $("#undo").html("撤銷");
            $("#title_of_main_color").html("主題色");
            $("#fold").html("折疊");
            $("#redo").html("重做");
            $("#advance").html("高級");
            $("#title_of_disable_animation").html("禁用動效");
            $("#title_of_settings").html("設定");
            $("#title_of_look").html("外觀");
            $("#set_main_color").html("設定...");
            $("#title_of_font").html("字體");
            break;
          case "zh-cn":
            DARK = "暗"; //暗色模式的显示名称
            LIGHT = "亮"; //亮色模式的显示名称
            ON = "开"; //开启状态的显示名称
            OFF = "关"; //关闭状态的显示名称
            SAVED_AT = "已保存于 "; //手动保存时在右上角的显示名称
            AUTO_SAVED_AT = "已自动保存于 "; //自动保存时在右上角的显示名称
            CHOOSE_FILE = "选择文件";
            NEW = "新建";
            ENSURE_DEL = "确定永久删除？此操作不可撤销。";
            YES = "确定";
            FNAME = "重命名";
            SEARCH = "查找";
            REPLACE = "替换";
            SEARCHTIP =
              "使用 /re/ 语法以使用正则表达式搜索，<br />按下 Esc 以退出";
            RWITH = "替换为";
            CREATE_FROM_FILE = "从文件新建...";
            RELSE_MOUSE = "请放开鼠标";
            DRAG_HERE = "请将文件拖拽至此";
            SUCCEED = "读取成功";
            ALL = "全部";
            CANCEL = "取消";
            SKIP = "跳过";
            PREVIEW = "预览";
            COUNT = "统计";
            WORD = "字词数";
            CHAR = "字符数";
            TIME = "预计阅读时长";
            WITH_SPACE = " (包含空格)";
            SAVE_AS = "另存为...";
            CHOOSE_MAIN_COLOR = "选择主题色";
            DIY_COLOR = "选择颜色...";
            SET_TO_DEFALT = "设为默认值";
            WITH_STYLE = "（带样式）";
            QUICK_NOTE = "闪念";
            TERM = "等距字体";
            DEFALT = "默认字体";
            OR = "或";
            CLICK_TO_UPLOAD = "点击此处打开文件";
            $("#title_of_theme").html("主题");
            $("#title_of_num").html("行号");
            $("#title_of_lang").html("语言");
            $("#lang").html("简体中文");
            $("#save_btn").html("另存为...");
            $("#about").html(
              '<h1 id="h1-welcome-to-clear-writer-markdown-"><a name="Welcome to Clear Writer，这是一个沉浸式 Markdown 写作软件。" class="reference-link"></a><span class="header-link octicon octicon-link"></span>Welcome to Clear Writer，这是一个沉浸式 Markdown 写作软件。</h1><h2 id="h2--clear-writer"><a name="为什么编写 Clear Writer" class="reference-link"></a><span class="header-link octicon octicon-link"></span>为什么编写 Clear Writer</h2><p>我开了我自己的博客之后，一直苦于 Windows 端没有我喜欢的 Markdown 编辑器。</p><blockquote><p>其实写作，最需要的并不是很好很强大的工具，而是一个不易让人分心的环境。</p></blockquote><p>Mac上的 iA Writer 固然能很好地做到这一点，但作为一个初二学生，我确实也没有那个经济实力去买正版。我也不打算用盗版。我找到了一个类似的软件，叫做 <a href="http://write4Me.sinaapp.com/">4Me 写字板</a>。它基于 CodeMirror。但是，它和 iA Writer 的差距未免有点大……</p><p>但这却给了我一个启发：为什么不自己动手试着用 CodeMirror 制作一个 Markdown 编辑器呢？</p><p>于是我征求了原作者同意之后，借着这次因新冠疫情宅家的时间，尝试自己以 4Me 写字板为蓝本，制作自己的写作工具。于是我做出了这个 Markdown 编辑器 —— Clear Writer，意味着希望人们使用它时，可以让人理清自己的思维。</p><p>另外，Clear Writer 的一个很重要的一点是它支持实时 Markdown 语法。很多的所谓实时 Markdown，我都不是很喜欢——因为它们会把 Markdown 格式标记隐去。我不喜欢这样，我喜欢让格式牢牢掌控在使用者的手里。</p><h2 id="h2-clear-writer-"><a name="Clear Writer 的特点" class="reference-link"></a><span class="header-link octicon octicon-link"></span>Clear Writer 的特点</h2><ul><li>全自动保存；</li><li>所见即所得的实时 MarkDown，以及标题悬挂；</li><li>支持亮色 / 暗色模式；</li><li>漂亮的隐藏式滚动条；</li><li>支持简体中文 / 繁体中文 / 英文三种语言；</li><li>支持开启 / 关闭行号；</li><li>高亮当前段落；</li><li>漂亮的光标闪动和跳动效果；</li><li>界面自适应；</li><li>内容全部在本地缓存，完全隐私保护；</li><li>支持导出 <code>.txt</code>、<code>.md</code>、<code>.doc</code>、<code>.html</code>、带 CSS 的 <code>html</code> 5 种格式；</li><li>平滑滚动；</li><li>可让你立即进入状态的”闪念“功能（v1.7+）。</li></ul><h2 id="h2-u4F7Fu7528u6280u5DE7"><a name="使用技巧" class="reference-link"></a><span class="header-link octicon octicon-link"></span>使用技巧</h2><ul><li>点击顶栏上的全屏按钮或按下 <code>F11</code>（或 <code>Fn + F11</code>）切入全屏，安心写作；</li><li>鼠标移动至顶部时显示顶栏，其中可以切换亮/暗色模式、行号、语言等；</li><li>点击顶栏上的图钉 <code>📌</code> 按钮可以固定顶栏，使其不自动隐藏；</li><li>右上角有 <code>另存为...</code> 按钮，点击可以将文字导出为其他格式文本；</li><li>点击左上角的 <code>Clear Writer</code> 会在侧边栏显示你现在正在看的这段文字，再次点击 <code>Clear Writer</code> 隐藏侧边栏；</li><li>可撤销最近的 2000 次操作，无惧修改；</li><li>Clear Writer 全自动保存，正常情况下每 3 分钟自动保存一次，在关闭的时候也会再次自动保存一次。实在不放心，还可以 <code>Ctrl + S</code> 手动保存；</li><li>查找：<code>Ctrl + F</code>；</li><li>查找下一个：<code>Ctrl + G</code>；</li><li>查找上一个：<code>Shift + Ctrl + G</code>；</li><li>替换：<code>Shift + Ctrl + F</code>；</li><li>替换全部：<code>Shift + Ctrl + R</code>。</li></ul><h2 id="h2-u517Cu5BB9u6027"><a name="兼容性" class="reference-link"></a><span class="header-link octicon octicon-link"></span>兼容性</h2><p>Windows 7 及以上。</p><h2 id="h2-u5173u4E8E"><a name="关于" class="reference-link"></a><span class="header-link octicon octicon-link"></span>关于</h2><p>Clear Writer 使用 GNU General Public License 3.0 进行许可。</p><p>编码工具：Visual Studio & Visual Studio Code<br>安装包制作工具：NSIS</p><h3 id="h3-clear-writer-"><a name="Clear Writer 的诞生离不开：" class="reference-link"></a><span class="header-link octicon octicon-link"></span>Clear Writer 的诞生离不开：</h3><ul><li>西文字体：NeverMind（SIL Open Font License 1.1）；</li><li>中文&等宽字体：更纱黑体（SIL Open Font License 1.1）；</li><li>编辑器基础：CodeMirror（MIT License）；</li><li>Markdown 渲染：editor.md（MIT License）；</li><li>构建基础：Electron（MIT License）；</li><li>图标: Font Awsome（Font Awesome Free License）；</li><li>蓝本：4Me Writer，无协议状态，但已经开发者口头许可。</li></ul><p>衷心感谢所有为本项目提供支持与帮助的人。</p><h2 id="h2-u66F4u65B0u65E5u5FD7"><a name="更新日志" class="reference-link"></a><span class="header-link octicon octicon-link"></span>更新日志</h2>   <h3 id="h3-clear-writer-v1-8-"><a name="Clear Writer v1.8 更新日志" class="reference-link"></a><span class="header-link octicon octicon-link"></span>v1.8</h3><ul><li>引入等距更纱黑体作为等宽字体；</li><li>新增统一的设置面板；</li><li>支持在全局使用等宽字体；</li><li>新增查找时的工具条；</li><li>优化超长文件名的显示；</li><li>优化启动时长；</li><li>顶栏改版，使用图标代替文字，取消标签页</li></ul>   <h3 id="h3-v1-7"><a name="v1.7" class="reference-link"></a><span class="header-link octicon octicon-link"></span>v1.7</h3><ul><li>新增新建文件时的回车快捷确认；</li><li>修复标题中插入 HTML 标签时的异常；</li><li>新增禁用动画选项，以保证能在低配置环境下运行；</li><li>新增查找栏的动画效果；</li><li>修复程序体积过大的问题；</li><li>大幅缩短程序加载时长；</li><li>新增 <code>html</code> 和 <code>带 CSS 的 html</code> 的文件另存支持。</li></ul><h3 id="h3-v1-6"><a name="v1.6" class="reference-link"></a><span class="header-link octicon octicon-link"></span>v1.6</h3><ul><li>优化主题色选择，支持直接跟随系统主题色（仅 Windows 10）；</li><li>优化亮色/暗色模式适配，支持跟随系统亮色/暗色模式（仅 Windows 10）；</li><li>新增全新的开始屏幕磁贴（仅 Windows 10）；</li><li>修复“预览”窗格中 HTML 代码块未被正常高亮的问题；</li><li>在正文编辑的代码块中使用等宽字体 Consolas，带来原汁原味的代码风；</li><li>新增对 Python、PHP、ruby 和 go 语言的代码块高亮支持；</li></ul><h3 id="h3-v1-5"><a name="v1.5" class="reference-link"></a><span class="header-link octicon octicon-link"></span>v1.5</h3><ul><li>修复两个弹窗并行时的一个 BUG；</li><li>修复“折叠”“剪切”按钮未翻译的问题；</li><li>修复了全屏模式下点击最大化/还原按钮无反应的 BUG；</li><li>新增打开、切换文件时标题栏的切换动画；</li><li>新增“另存为”格式：.md、.doc；</li><li>新增预览时的代码块高亮；</li><li>新增删除文件时的“取消”按钮；</li><li>新增覆盖输入模式下（按Insert键进入）的特有光标，以和插入模式区别开来</li></ul><h3 id="h3-v1-4"><a name="v1.4" class="reference-link"></a><span class="header-link octicon octicon-link"></span>v1.4</h3><ul><li>修复了在重命名文件之后文件内容丢失的 BUG； </li><li>修复了在切换文件后快捷键定义重复现象的 BUG；</li><li>抛弃系统自带的标题栏，自己做了一个更漂亮的；</li><li>新增统计功能（统计的是最终生成的文本，不包含 Markdown 语法字符）。</li></ul><h3 id="h3-v1-3"><a name="v1.3" class="reference-link"></a><span class="header-link octicon octicon-link"></span>v1.3</h3><ul><li>更新内核为 Chromium 82；</li><li>支持更改主题色（”主题“组下），自定义你的 Clear Writer；</li><li>标题栏优化：鼠标悬停在组标题上时才显示按钮；</li><li>大幅缩短切换文件、切换语言的用时；</li><li>优化语言切换方式；</li><li>增加右键菜单项目，现支持 11 种操作，如加粗、斜体等，解救鼠标党；</li><li>在标题栏的”工具“组下新增”查找“”查找下一个“”替换“按钮，解救鼠标党；</li><li>新增 Markdown 标题段落折叠。</li></ul><h3 id="h3-v1-2"><a name="v1.2" class="reference-link"></a><span class="header-link octicon octicon-link"></span>v1.2</h3><ul><li>新图标；</li><li>新增预览窗口。</li></ul><h3 id="h3-v1-1"><a name="v1.1" class="reference-link"></a><span class="header-link octicon octicon-link"></span>v1.1</h3><ul><li>新增右键菜单；</li><li>新增“从文件新建”功能。</li></ul>'
            );
            $("#copy").html("复制");
            $("#paste").html("粘贴");
            $("#cut").html("剪切");
            $("#selectall").html("全选");
            $("#bold").html("粗体");
            $("#italic").html("斜体");
            $("#linethrough").html("删除线");
            $("#hyperlink").html("超链接");
            $("#undo").html("撤销");
            $("#redo").html("重做");
            $("#title_of_main_color").html("主题色");
            $("#fold").html("折叠");
            $("#advance").html("高级");
            $("#title_of_disable_animation").html("禁用动画");
            $("#title_of_settings").html("设置");
            $("#title_of_look").html("外观");
            $("#set_main_color").html("设置...");
            $("#title_of_font").html("字体");
            $("#experiment").html("实验性功能");
            break;
        }
        reset_switch();
      }
      document.body.className = localStorage.font == 1 ? "term" : "";
      if (localStorage.lang != null) set_lang_to(localStorage.lang);
      //如果之前选过，直接使用
      else {
        //否则从浏览器获取当前语言
        switch (navigator.language.toLowerCase()) {
          case "zh-tw":
          case "zh-hk":
            localStorage.lang = "zh-hk";
            set_lang_to("zh-hk");
            break;
          case "en":
          case "en-us":
          case "en-uk":
            localStorage.lang = "en";
            set_lang_to("en");
            break;
          case "zh-cn":
          case "zh":
            localStorage.lang = "zh-cn";
            set_lang_to("zh-cn");
            break;
          default:
            //不支持的语言，弹窗警告
            msgbox(
              "Clear Writer does not support your language",
              "<p>Current language: " +
                language(navigator.language.toLowerCase(), "native") +
                " / " +
                language(navigator.language.toLowerCase(), "en") +
                " / " +
                language(navigator.language.toLowerCase(), "zh-cn") +
                " / " +
                language(navigator.language.toLowerCase(), "zh-hk") +
                '.<br />抱歉，Clear Writer 不兼容你正在使用的语言。<br />抱歉，Clear Writer 不相容你正在使用的語言。<br />Clear Writer now supports Chinese (both simplified & traditional) and English. You can set the language on the top bar later.<br />You can also help me to translate Clear Writer. Please <a href="mailto:linhongping1219@163.com">email me</a>.</div>',
              40,
              20
            );
            localStorage.lang = "en"; //语言默认为英文
            set_lang_to("en");
            break;
        }
      }

      if (localStorage.theme != null)
        if (localStorage.theme == 0) {
          //如果之前存过亮色/暗色模式
          //0表示亮色模式
          document.getElementById("control").innerHTML = lighttheme;
          document.getElementById("theme").innerHTML = LIGHT;
        } else {
          //1表示暗色模式
          document.getElementById("control").innerHTML = darktheme;
          document.getElementById("theme").innerHTML = DARK;
        }
      else {
        //没有存过，默认为亮色模式
        localStorage.theme = 0;
        document.getElementById("control").innerHTML = lighttheme;
        document.getElementById("theme").innerHTML = LIGHT;
      }

      if (!localStorage.opacity) localStorage.opacity = 0.7;
      if (localStorage.line_num != null)
        //如果之前有存过行号设置
        document.getElementById("num").className =
          localStorage.line_num == 1 ? "on" : "off";
      else {
        //没有存过，默认不显示行号
        localStorage.line_num = 0;
        document.getElementById("num").className =
          localStorage.line_num == 1 ? "on" : "off";
      }

      if (localStorage.disable_animation != null)
        //如果之前有禁用动画
        document.getElementById("disable_animation").className =
          localStorage.disable_animation == 1 ? "on" : "off";
      else {
        //没有存过，默认不禁用动画
        localStorage.disable_animation = 0;
        document.getElementById("disable_animation").className =
          localStorage.disable_animation == 1 ? "on" : "off";
      }

      var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        //获得行号设置，开始生成CodeMirror
        lineNumbers: localStorage.line_num * 1, //有行号为1，无行号为0，乘以1（字符转数字）
        lineWrapping: true,
        indentUnit: 4,
        indentWithTabs: true,
        undoDepth: 2000,
        cursorBlinkRate: 800,
        styleActiveLine: true,
        foldGutter: true,
        spellcheck: true,
        autocapitalize: true,
        viewportMargin: 140,
        //gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        mode: {
          name: "gfm",
          tokenTypeOverrides: {
            emoji: "emoji",
          },
        },
        theme: "default",
        onCursorActivity: function () {
          editor.setLineClass(hlLine, null);
          hlLine = editor.addLineClass(editor.getCursor().line, "activeline");

          $("pre.activeline ~ pre").addClass("activeline");
          //console.log($("pre.activeline ~ pre"));
        },
      });
      if (localStorage.line_num == 1)
        editor.setOption("gutters", [
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
        ]);
      else editor.setOption("gutters", "");

      editor.on("focus", function () {
        var cnt = 0;
        if (document.querySelector(".cm-header-6") != null) cnt = 6;
        else if (document.querySelector(".cm-header-5") != null) cnt = 5;
        else if (document.querySelector(".cm-header-4") != null) cnt = 4;
        else if (document.querySelector(".cm-header-3") != null) cnt = 3;
        else if (document.querySelector(".cm-header-2") != null) cnt = 2;
        else if (document.querySelector(".cm-header-1") != null) cnt = 1;
        document.getElementById("padding_control").innerHTML =
          ".CodeMirror pre.CodeMirror-line,CodeMirror pre.CodeMirror-line-like{padding-left:" +
          ((cnt + 1) * 14.56 + 5.86 + 5) +
          "px !important}";
      });

      if (localStorage.maincolor) {
        document.getElementById("main_color_control").innerHTML =
          "* {--main:" + localStorage.maincolor + "}";
      } else localStorage.maincolor = "#00BAFF";

      window.onload = function () {
        document.getElementById("preload").style.opacity = "0";
        setTimeout(function () {
          document.getElementById("preload").style.display = "none";
        }, 180);
        msgbox(CHOOSE_FILE + "...", build_list(), 35, 25, true);
      };

      var nameArray = [];
      if (localStorage.nameArray != null) {
        nameArray = JSON.parse(localStorage.nameArray);
      } else {
        var list = [];
        localStorage.nameArray = JSON.stringify(list);
      }
      var pcon = document.getElementById("padding_control");

      var first = 1;
      function choose_file(num) {
        cur_num = num;
        filename = nameArray[num];
        $("head>title").html(filename + " - Clear Writer");
        if (window.localStorage.getItem(filename) !== null)
          editor.setValue(window.localStorage.getItem(filename));
        else editor.setValue(default_text);
        var topbar = document.getElementById("top_file_name");
        topbar.style.opacity = "0";
        topbar.style.transform = "translateY(-10px)";
        setTimeout(
          "var topbar = document.getElementById('top_file_name'); topbar.style.transition = 'none';  topbar.style.transition = '';  topbar.innerHTML = filename; topbar.style.opacity = ''; topbar.style.transform='translateY(0px)';",
          280
        );
        editor.setOption("styleActiveLine", { nonEmpty: true });
        editor.focus();
        editor.clearHistory();
        if (quicknote) {
          document.getElementById("main_color_control").innerHTML =
            "* {--main:" + localStorage.maincolor + "}";
        }
        quicknote = 0;
        if (first) {
          $(document)
            .keyup(function (e) {
              if (e.which == 17 || e.which == 224) {
                glvar_isCtrl = false;
              }
            })
            .keydown(function (e) {
              if (e.which == 27) {
                if (document.getElementById("msg_close")) close_msgbox();
                return false;
              }

              if (e.which == 17 || e.which == 224) {
                glvar_isCtrl = true;
                glvar_ctrlDownTime = Date.parse(new Date());
                return false;
              }

              if (glvar_isCtrl == true) {
                var curtime = Date.parse(new Date());
                var timedf = curtime - glvar_ctrlDownTime;
                if (timedf < 2000) {
                  switch (e.which) {
                    case 83: //s
                      save_content(1);
                      return false;
                      break;
                    case 66: //b
                      editor.focus();
                      editor.replaceSelection(
                        " **" + editor.getSelection() + "** "
                      );
                      return false;
                      break;
                    case 73: //i
                      editor.focus();
                      editor.replaceSelection(
                        " *" + editor.getSelection() + "* "
                      );
                      return false;
                      break;
                    case 75: //k
                      editor.focus();
                      editor.replaceSelection(
                        " [" +
                          editor.getSelection() +
                          "](https://example.com/) "
                      );
                      editor.execCommand("goCharLeft");
                      editor.execCommand("goCharLeft");
                      return false;
                      break;
                    case 81: //q
                      editor.focus();
                      editor.foldCode(editor.getCursor());
                      return false;
                      break;
                    case 79: //o
                      save_content();
                      msgbox(CHOOSE_FILE + "...", build_list(), 35, 25, false);
                      break;
                    case 78: //n
                      save_content();
                      msgbox(CHOOSE_FILE + "...", build_list(), 35, 25, false);
                      setTimeout(new_file(), 200);
                    default:
                      break;
                  }
                }
              }

              //F11 全屏，针对 Electron
              if (e.which == 122) {
                handleFullScreen();
                return false;
              }
            });
        }
        first = 0;
      }

      function rename_quick_note(callback) {
        if (document.getElementById("msgbox")) return;
        msgbox(
          FNAME + QUICK_NOTE,
          '<input type="text" name="fname" class="fname_box" id="fname_box0" onkeydown="changeInputlength(this,43,0);" onkeypress="check_enter();"><button id="fname_btn">' +
            FNAME +
            "</button>",
          35,
          10,
          true
        );
        setTimeout(function () {
          if (callback)
            document
              .getElementById("fname_btn")
              .addEventListener("click", validateForm(0, callback), false);
          else
            document
              .getElementById("fname_btn")
              .addEventListener("click", validateForm(0), false);
        }, 300);
      }

      function build_list() {
        var list;
        var i;
        list = '<ul id="files_list">';
        list += '<li id="new" onclick="new_file()">+ ' + NEW + "...</li>";
        list +=
          '<li id="quick_note" onclick="quick_note()">+ ' +
          QUICK_NOTE +
          "...</li>";
        for (i = 0; i < nameArray.length; i++) {
          list +=
            '<li id="list_' +
            i +
            '"><span onclick="f_del(' +
            i +
            ')">⛔</span><span onclick="f_rename(' +
            i +
            ')">📝</span><a onclick="choose_file(' +
            i +
            ');close_msgbox();"> ';
          list += nameArray[i];
          list += "</a></li>";
        }
        return list;
      }

      function new_file() {
        $("#box_title").html(NEW + "...");
        var t = "";
        if (document.getElementById("fname_box0") != null) {
          t = document.getElementById("fname_box0").value;
        }
        document.getElementById("content").innerHTML =
          '<input type="text" name="fname" class="fname_box" id="fname_box0" onkeydown="changeInputlength(this,43,0);" onkeypress="check_enter();"><button onclick="validateForm(0)" id="fname_btn">' +
          NEW +
          '</button><p><button onclick="new_file_from_local()">' +
          CREATE_FROM_FILE +
          '</button><button onclick="cancel_creating()" style="background:var(--background);color: var(--active)">' +
          CANCEL +
          "</button></p>";
        document.getElementById("fname_box0").focus();
        if (t != "") {
          document.getElementById("fname_box0").value = t;
          changeInputlength(document.getElementById("fname_box0"), 43, 0);
        }
      }

      function quick_note() {
        var day = new Date();
        var time =
          day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds();
        var date =
          day.getFullYear() + "." + (day.getMonth() + 1) + "." + day.getDate();
        nameArray.unshift(QUICK_NOTE + " " + date + " " + time);
        localStorage.nameArray = JSON.stringify(nameArray);
        choose_file(0);
        close_msgbox();
        quicknote = 1;
        document.getElementById("main_color_control").innerHTML =
          "* {--main:#EA6725}";
        editor.setValue("");
      }

      function check_enter() {
        if (event.keyCode == 13) {
          validateForm(0);
        }
        return false;
      }

      function cancel_creating() {
        $("#content").html(build_list());
        $("#box_title").html(CHOOSE_FILE + "...");
      }

      var f_cont;
      function new_file_from_local() {
        var t;
        t = document.getElementById("fname_box0").value;
        document.getElementById("content").innerHTML =
          '<input type="text" name="fname" class="fname_box" id="fname_box0" onkeydown="changeInputlength(this,43,0);" onkeypress="check_enter();"><span id="description">' +
          DRAG_HERE +
          '</span><div id="box">' +
          DRAG_HERE +
          '</div><input id="real_uploader" style="display:none;" type="file" accept="text/plain" onchange="openFile(event)"><a style="color:#999;font-size:16px;margin: 5px .6rem;user-select:none;">' +
          OR +
          '</a><button onclick="' +
          "$('#real_uploader').click();" +
          '">' +
          CLICK_TO_UPLOAD +
          '</button><br /><button onclick="submit_file()" id="fname_btn">' +
          YES +
          '</button><button onclick="new_file()" style="background:var(--background); color:var(--active)">' +
          CANCEL +
          "</button>";
        if (t != "") {
          document.getElementById("fname_box0").value = t;
          changeInputlength(document.getElementById("fname_box0"), 43, 0);
        }
        document.getElementById("fname_box0").focus();
        dragdrop();
      }
      function submit_file() {
        if (document.getElementById("fname_box0").value == "") {
          document.getElementById("fname_box0").style.background =
            "rgba(255,0,0,.2)";
        } else if (f_cont == null) {
          document.getElementById("description").style.color =
            "rgba(255,0,0,.5)";
        } else {
          nameArray.unshift(document.getElementById("fname_box0").value);
          localStorage.nameArray = JSON.stringify(nameArray);
          choose_file(0);
          editor.setValue(f_cont);
          close_msgbox();
        }
      }
      function validateForm(num) {
        if (
          document.getElementById("fname_box" + num).value == "" ||
          localStorage.getItem(document.getElementById("fname_box" + num).value)
        ) {
          document.getElementById("fname_box" + num).style.background =
            "rgba(255,0,0,.2)";
        } else {
          nameArray.unshift(document.getElementById("fname_box0").value);
          localStorage.nameArray = JSON.stringify(nameArray);
          choose_file(0);
          close_msgbox();
        }
      }

      function set_theme() {
        if (localStorage.theme == 0) {
          //亮色模式转暗色模式
          document.getElementById("control").innerHTML = darktheme;
          document.getElementById("theme").innerHTML = DARK;
          localStorage.theme = 1;
        } else {
          //跟随系统转亮色模式
          document.getElementById("control").innerHTML = lighttheme;
          document.getElementById("theme").innerHTML = LIGHT;
          localStorage.theme = 0;
        }
      }

      function set_line_num() {
        //切换行号的可见性
        localStorage.line_num = localStorage.line_num == 1 ? "0" : "1";
        editor.setOption(
          "lineNumbers",
          localStorage.line_num == 1 ? true : false
        );
        if (localStorage.line_num == 1)
          editor.setOption("gutters", [
            "CodeMirror-linenumbers",
            "CodeMirror-foldgutter",
          ]);
        else editor.setOption("gutters", "");
        document.getElementById("num").className =
          localStorage.line_num == 1 ? "on" : "off";
      }

      function set_font() {
        //切换字体
        localStorage.font = localStorage.font == 1 ? "0" : "1";
        document.body.className = localStorage.font == 1 ? "term" : "";
        document.getElementById("font").innerHTML =
          localStorage.font == 1 ? TERM : DEFALT;
      }

      function set_lang() {
        //切换语言
        var list = '<div class="choose"><ul>';
        list +=
          '<li onclick="' +
          "click_lang('zh-cn');" +
          '">' +
          '<span class="flag" id="cn"></span>' +
          "简体中文" +
          "</li>";
        list +=
          '<li onclick="' +
          "click_lang('zh-hk');" +
          '">' +
          '<span class="flag" id="hk"></span>' +
          "繁體中文" +
          "</li>";
        list +=
          '<li onclick="' +
          "click_lang('en');" +
          '">' +
          '<span class="flag" id="us"></span>' +
          "English" +
          "</li>";
        list += "</ul></div>";
        set_settings();
        setTimeout(function () {
          msgbox("语言 · 語言 · Language", list, 30, 20, false);
        }, 300);
      }

      function click_lang(lang) {
        set_lang_to(lang);
        localStorage.lang = lang;
        reset_switch();
        close_msgbox();
        save_content();
      }

      function reset_switch() {
        $("#theme").html(localStorage.theme == 1 ? DARK : LIGHT);
        $("#font").html(localStorage.font == 1 ? TERM : DEFALT);
      }

      function set_about() {
        //设置“关于”栏的开/关
        if (about == 0) {
          //开起来
          document.getElementById("about").style.display = "block";
          cover("set_about()"); //激活遮罩，onclick设为'set_about()'
          setTimeout("document.getElementById('about').style.left = '0';", 100);
          about = 1;
        } else {
          //关掉
          document.getElementById("about").style.left = "";
          close_cover();
          setTimeout(
            "document.getElementById('about').style.display = '';",
            320
          );
          about = 0;
        }
      }

      function set_settings() {
        //设置设置栏的开/关
        if (settings == 0) {
          //开起来
          document.getElementById("settings").style.display = "block";
          cover("set_settings()"); //激活遮罩，onclick设为'set_settings()'
          setTimeout(
            "document.getElementById('settings').style.left = '0';",
            100
          );
          settings = 1;
        } else {
          //关掉
          document.getElementById("settings").style.left = "";
          close_cover();
          setTimeout(
            "document.getElementById('settings').style.display = '';",
            320
          );
          settings = 0;
        }
      }

      function disable_animation() {
        if (localStorage.disable_animation == 1) {
          document.getElementById("advanced_control").innerHTML = "";
          localStorage.disable_animation = 0;
        } else {
          document.getElementById("advanced_control").innerHTML =
            "*,*:after,*:before{transition:none !important;animation:none !important}";
          localStorage.disable_animation = 1;
        }
        document.getElementById("disable_animation").className =
          localStorage.disable_animation == 1 ? "on" : "off";
      }

      function msgbox(title, content, width, height, disableClose) {
        //弹窗函数，传入标题和内容
        if (document.getElementById("msgbox")) return false;
        cover(disableClose ? "" : "close_msgbox()"); //激活遮罩，点击遮罩时调用'close_msgbox()'
        var box = document.createElement("div");
        document.body.appendChild(box);
        box.id = "msgbox";
        box.style.width = width + "rem";
        box.style.height = height + "rem";
        box.innerHTML =
          (disableClose
            ? ""
            : '<g-emoji id="msg_close" alias="x" onclick="close_msgbox()" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/274c.png">❌</g-emoji>') +
          '<h1 id="box_title">' +
          title +
          '</h1><div id="content">' +
          content +
          "</div>";
        //创建一个弹窗div
      }

      function close_msgbox() {
        //关闭弹窗
        var box = document.getElementById("msgbox");
        box.style.animationName = "window-out";
        setTimeout(
          'document.getElementById("msgbox").parentNode.removeChild(document.getElementById("msgbox"));',
          280
        );
        close_cover();
      }

      function cover(onclick) {
        //遮罩激活函数
        cover_cnt += 1;
        var coverdiv = document.createElement("div");
        coverdiv.id = "cover_" + cover_cnt;
        coverdiv.className = "cover";
        coverdiv.style.opacity = "1";
        coverdiv.style.display = "block";
        coverdiv.setAttribute("onclick", onclick);
        document.body.appendChild(coverdiv);
      }

      function close_cover() {
        //遮罩隐藏函数
        var coverdiv = document.getElementById("cover_" + cover_cnt);

        coverdiv.style.animationName = "fade-out";
        setTimeout(
          "document.body.removeChild(document.getElementById('cover_'+cover_cnt));cover_cnt -= 1;",
          250
        );

        editor.focus();
      }

      function tips(content) {
        if (document.getElementById("tip")) {
          close_tips();
          setTimeout("cont()", 620);
        } else cont();
        function cont() {
          var tip = document.createElement("div");
          tip.innerHTML = content;
          tip.id = "tips";
          tip.onclick = "close_tips()";
          tip.setAttribute("onclick", "close_tips()");
          document.body.appendChild(tip);
          setTimeout("close_tips();", 4000);
        }
      }

      function close_tips() {
        var tip = document.getElementById("tips");
        tip.style.animationName = "fade-out";
        setTimeout(
          "var tip = document.getElementById('tips');tip.parentNode.removeChild(tip);",
          580
        );
      }

      function set_stick() {
        //设置顶栏是否钉住
        if (stick == 0) {
          document.getElementById("topbar").style.opacity = "1";
          stick = 1;
          document.getElementById("stick").innerHTML = "📍";
        } else {
          document.getElementById("topbar").style.opacity = "";
          stick = 0;
          document.getElementById("stick").innerHTML = "📌";
        }
      }

      function changeInputlength(cursor, maxlenth, num) {
        var getText = document.getElementById("fname_box" + num);
        var len = getText.value.length == 0 ? 10 : getText.value.length + 3;
        cursor.size;
        if (len == 0) cursor.size = 10;
        else if (len > maxlenth) cursor.size = maxlenth + 3;
        else cursor.size = len + 3;
        getText.style.background = "var(--background)";
      }

      function f_del(num) {
        document.getElementById("list_" + num).innerHTML =
          '<span style="color:var(--active);font-size:16px;opacity:1;">' +
          ENSURE_DEL +
          '</span><span style="color:var(--main);font-size:16px;opacity:1;" onclick="del(' +
          num +
          ')">' +
          YES +
          '</span><span style="color:#888;font-size:16px;opacity:1;" onclick="cancel_creating()">' +
          CANCEL +
          "</span>";
        document.getElementById("list_" + num).style = "font-size:16px";
      }

      function del(num) {
        if (num == cur_num) {
          cur_num = filename = null;
          if (document.getElementById("msg_close"))
            document.getElementById("msg_close").style.display = "none";
          document
            .getElementById("cover_" + cover_cnt)
            .removeAttribute("onclick");
          $("head>title").html("Clear Writer");
          //console.log("del!");
        }
        //console.log("num=" + num);
        //console.log("cur_num=" + cur_num);
        window.localStorage.removeItem(nameArray[num]); //删除这个板子的内容
        nameArray.splice(num, 1); //从文件列表里面删掉这个元素
        localStorage.nameArray = JSON.stringify(nameArray); //将文件列表同步到存储里面
        document.getElementById("content").innerHTML = build_list();
      }

      function f_rename(num) {
        var li = document.getElementById("list_" + num);
        li.innerHTML =
          '<input type="text" name="fname" class="fname_box" id="fname_box' +
          num +
          '" onkeydown="changeInputlength(this,28,' +
          num +
          ');" value="' +
          nameArray[num] +
          '"><button onclick="rename(' +
          num +
          ",document.getElementById(" +
          "'fname_box" +
          num +
          "').value)" +
          '" id="fname_btn">' +
          FNAME +
          '</button><button onclick="cancel_creating();" style="background:var(--background);color: var(--active)">' +
          CANCEL +
          "</button>";
      }

      function rename(num, des) {
        if (des == "" || (nameArray[num] != des && localStorage.getItem(des))) {
          document.getElementById("fname_box" + num).style.background =
            "rgba(255,0,0,.2)";
        } else {
          var content = localStorage.getItem(nameArray[num]);
          localStorage.setItem(des, content);
          localStorage.removeItem(nameArray[num]);
          nameArray[num] = des;
          localStorage.nameArray = JSON.stringify(nameArray);
          document.getElementById("content").innerHTML = build_list();
        }
      }

      var hlLine = editor.addLineClass(0, "activeline");

      var local_save = setInterval(save_content, 60000);

      var glvar_isCtrl = false;
      var glvar_ctrlDownTime = 0;

      function save_content(user) {
        //保存函数：命就在这里了
        editor.save();
        if (!filename) return;
        window.localStorage.setItem(filename, $("#code").val());
        var d = new Date();
        var time =
          d.getHours() +
          ":" +
          (d.getMinutes() < 10 ? "0" : "") +
          d.getMinutes(); //在顶栏显示一下提示
        var note;
        if (user == 1) {
          //手动保存
          note = SAVED_AT + time;
          tips(note);
        } //自动保存
        else note = AUTO_SAVED_AT + time;
        $("#save_info").html(note);
      }

      function handleFullScreen() {
        let element = document.documentElement;
        // 判断是否已经是全屏
        // 如果是全屏，退出
        if (fscreen) {
          document.exitFullscreen();
          document.getElementById("fullscreen").style.backgroundImage =
            "url('files/fullscreen.svg')";
          $("#header-control").html("");
        } else {
          // 否则，进入全屏
          document.documentElement.requestFullscreen();
          document.getElementById("fullscreen").style.backgroundImage =
            "url('files/close_fullscreen.svg')";
          $("#header-control").html(
            "#header{opacity:0;box-shadow:none !important;-webkit-app-region: no-drag;}#header:hover{opacity:1 !important;}#header ~ .sidebar{height:100%;top:0;}#header:hover ~ .sidebar{height:calc(100% - 40px);top:40px;}"
          );
        }
        // 改变当前全屏状态
        fscreen = !fscreen;
      }

      function down_cur() {
        //“另存为”函数
        var list = '<div class="choose"><ul>';
        list +=
          '<li onclick="' +
          "download('txt');" +
          '">' +
          '<span class="file" style="background:#6A6A6A;color:#fff;">T</span>' +
          ".txt" +
          "</li>";
        list +=
          '<li onclick="' +
          "download('md');" +
          '">' +
          '<span class="file" style="background:#000;color:#fff;">M<a style="font-size:13px;display:inline-block;width:10px;text-align:center;">↓</a></span>' +
          ".md" +
          "</li>";
        list +=
          '<li onclick="' +
          "download('doc');" +
          '">' +
          '<span class="file" style="background:#1A73E8;color:#fff;">W</span>' +
          ".doc" +
          "</li>";
        list +=
          '<li onclick="' +
          "download('html');" +
          '">' +
          '<span class="file" style="background:#0095D7;color:#fff;">H</span>' +
          ".html" +
          "</li>";
        list +=
          '<li onclick="' +
          "download('html_css');" +
          '">' +
          '<span class="file" style="background:#EF6725;color:#fff;">H</span>' +
          ".html" +
          WITH_STYLE +
          "</li>";
        list += "</ul></div>";
        msgbox(SAVE_AS, list, 30, 20, false);

        //download(nameArray[cur_num] + '.txt', editor.getValue());
      }

      function download(type) {
        close_msgbox();
        var name = nameArray[cur_num];
        var content = editor.getValue();
        switch (type) {
          case "txt":
          case "md":
            var element = document.createElement("a");
            const blob1 = new Blob([content]);
            element.download = name + "." + type;
            element.style = "display: none";
            element.href = URL.createObjectURL(blob1);
            document.body.appendChild(element);
            element.click();

            setTimeout(function () {
              document.body.removeChild(element);
              window.URL.revokeObjectURL(blob1);
            }, 100);
            break;
          case "doc":
            make_html(content);
            $("#databox").wordExport(name);
            $("#calculate").html("");
            break;
          case "html":
          case "html_css":
            make_html(content);
            var res = document.getElementById("databox").innerHTML;
            res =
              "<title>" +
              name +
              "</title></head><body>" +
              res +
              "</body></html>";
            if (type == "html_css")
              res =
                "<style>html{color:#333;font-size:16px;background:#f8f8f8}body{max-width:880px;width:100%;margin:60px auto}img{border-radius:4px;box-shadow:rgba(0,0,0,.2) 0 5px 15px;margin:20px 15px;max-width:calc(100% - 30px)}.emoji{width:18px;height:18px;box-shadow:none;border-radius:0;margin:0}code{background:rgba(0,0,0,.08);border-radius:3px;padding:0 7px}.prettyprint.linenums.prettyprinted{padding: 20px !important;box-shadow: rgba(0, 0, 0, .2) 0 10px 20px;margin: 20px 0;background:#eee;overflow:auto}.linenums code *{font-family:Consolas,monospace !important}.linenums code{background:0}.kwd,.tag{color:#dc3939;font-weight:bold}.lit{color:#46a609}.pun{color:var(--active)}.com,.atn{color:#21a366;font-weight:bold}.str,.atv{color:#d68f29}h1,h2,h3,h4,h5,h6{color:" +
                localStorage.maincolor +
                ";text-shadow:rgba(0,0,0,.2) 0 1px 5px;font-weight:bold;transition:all .3s}h1{font-size:29px;margin-top:50px;line-height:50px}h1 a{transition:all .3s}h2{font-size:23px}h3{font-size:20px}h4{font-size:18px}h5{font-size:16px}h6{font-size:14px}blockquote p{border-left:var(--shadow) 4px solid;padding-left:10px}</style>" +
                res;
            res = '<!DOCTYPE html><html><head><meta charset="utf-8" />' + res;
            var element = document.createElement("a");
            const blob2 = new Blob([res]);
            element.download = name + ".html";
            element.style = "display: none";
            element.href = URL.createObjectURL(blob2);
            document.body.appendChild(element);
            element.click();

            setTimeout(function () {
              document.body.removeChild(element);
              window.URL.revokeObjectURL(blob);
            }, 100);
            break;
        }
      }

      function feedback() {
        window.open(FBLINK);
      }

      function dragdrop() {
        var oBox = document.getElementById("box");
        var des = document.getElementById("description");
        var timer = null;
        document.ondragover = function () {
          clearTimeout(timer);
          timer = setTimeout(function () {
            oBox.style.opacity = "0";
          }, 200);
          oBox.style.opacity = "1";
        };
        //进入子集的时候 会触发ondragover 频繁触发 不给ondrop机会
        oBox.ondragenter = function () {
          oBox.innerHTML = RELSE_MOUSE;
          oBox.style.boxShadow = "var(--shadow) 0 15px 30px";
          oBox.style.color = "var(--main)";
        };
        oBox.ondragover = function () {
          return false;
        };
        oBox.ondragleave = function () {
          oBox.innerHTML = DRAG_HERE;
          oBox.style.boxShadow = "var(--shadow) 0 5px 20px";
          oBox.style.color = "var(--active)";
        };
        oBox.ondrop = function (ev) {
          var oFile = ev.dataTransfer.files[0];
          var reader = new FileReader();
          //读取成功
          reader.onload = function () {
            //console.log(reader);
            if (reader.result) {
              f_cont = reader.result;
              des.innerHTML = SUCCEED;
              des.style.color = "999";
            }
          };
          reader.onerror = function () {
            alert(reader.error.code);
            des.innerHTML = DRAG_HERE;
          };
          reader.readAsText(oFile);
          return false;
        };
      }

      function openFile(event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function () {
          if (reader.result) {
            //显示文件内容
            f_cont = reader.result;
            $("#description").html(SUCCEED);
          }
        };
        reader.readAsText(input.files[0]);
      }
      console.log(
        "  oooooooo8   ooooo         ooooooooooo        o        oooooooooo\no888     88    888           888    88        888        888    888\n888            888           888ooo8         8  88       888oooo88\n888o     oo    888      o    888    oo      8oooo88      888  88o\n 888oooo88    o888ooooo88   o888ooo8888   o88o  o888o   o888o  88o8\n\noooo     oooo oooooooooo  ooooo ooooooooooo ooooooooooo oooooooooo\n 88   88  88   888    888  888  88  888  88  888    88   888    888\n  88 888 88    888oooo88   888      888      888ooo8     888oooo88\n   888 888     888  88o    888      888      888    oo   888  88o\n    8   8     o888o  88o8 o888o    o888o    o888ooo8888 o888o  88o8\n"
      );

      function previewer() {
        msgbox(
          PREVIEW,
          '<div id="preview_box"><textarea>' +
            editor.getValue() +
            "</textarea></div>",
          50,
          30,
          false
        );
        editormd.markdownToHTML("preview_box", {
          htmlDecode: "style,script,iframe", //可以过滤标签解码
          emoji: true,
          taskList: true,
        });
      }
      function count() {
        var source;
        if (editor.getSelection() == "") source = editor.getValue();
        else source = editor.getSelection();

        var data = make_html(source);
        $("#calculate").html('<div id="databox"></div>');
        data = data.replace(/<[^>]+>/g, "");
        var chars_with_space = data.match(/[^\r\n]/g).length;
        var chars = data.match(/[^\s]/g).length;

        //先对回车换行符做特殊处理
        data = data.replace(/(\r\n+|\s+|　+)/g, "\uFFFF");
        //处理英文字符数字，连续字母、数字、英文符号视为一个单词
        data = data.replace(/[\x00-\xff]/g, "m");
        //合并字符m，连续字母、数字、英文符号视为一个单词
        data = data.replace(/m+/g, "*");
        //去掉回车换行符
        data = data.replace(/\uFFFF+/g, "");
        //返回字数
        var words = data.length;

        var time = (words / 430).toFixed(1);
        if (time < 1) time = "<1";
        var list =
          '<ul style="color:var(--active)">' +
          "<li><strong>" +
          WORD +
          ": </strong>" +
          words +
          "</li>" +
          "<li><strong>" +
          CHAR +
          ": </strong>" +
          chars +
          "</li>" +
          "<li><strong>" +
          CHAR +
          WITH_SPACE +
          ": </strong>" +
          chars_with_space +
          "</li>" +
          "<li><strong>" +
          TIME +
          ": </strong>" +
          time +
          "min. </li>" +
          "</ul>";
        msgbox(COUNT, list, 23, 20);
      }

      function make_html(source) {
        $("#calculate").html(
          '<div id="databox"><textarea id="data_area">' +
            source +
            "</textarea></div>"
        );
        editormd.markdownToHTML("databox", {
          htmlDecode: "style,script,iframe", //可以过滤标签解码
          emoji: true,
          taskList: true,
        });
        return document.getElementById("databox").innerHTML;
      }

      document.getElementById("set_main_color").onclick = function () {
        set_settings();
        setTimeout(function () {
          msgbox(
            CHOOSE_MAIN_COLOR,
            '<button onclick="diycolor()">' +
              DIY_COLOR +
              "</button><button onclick=set_to_defalt_color()>" +
              SET_TO_DEFALT +
              "</button>",
            28,
            3
          );
        }, 300);
      };
      function diycolor() {
        document.getElementById("real_main_color").click();
        close_msgbox();
      }
      function set_to_defalt_color() {
        localStorage.maincolor = "#00BAFF";
        document.getElementById("main_color_control").innerHTML =
          "* {--main:#00BAFF}";
        close_msgbox();
      }
      document.getElementById("real_main_color").onchange = function () {
        localStorage.maincolor = this.value;
        document.getElementById("main_color_control").innerHTML =
          "* {--main:" + this.value + "}";
      };

      window.onblur = function () {
        this.document.getElementById("focus-control").innerHTML =
          "#top_file_name{color:#888 !important}";
      };
      window.onfocus = function () {
        this.document.getElementById("focus-control").innerHTML = "";
      };

      function showToolBar() {
        document.getElementById("tool_bar").style.display = "block";
      }
      function hideToolBar() {
        document.getElementById("tool_bar").style.animation =
          "fadeOutRight .5s cubic-bezier(0, 0.6, 0.06, 0.99)";
        setTimeout(function () {
          document.getElementById("tool_bar").style.display = "none";
          document.getElementById("tool_bar").style.animation = "";
        }, 480);
      }