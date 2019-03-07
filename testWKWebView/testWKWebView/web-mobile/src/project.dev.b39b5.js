window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  API: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0d9a1nBa41G7JHyJ4olJope", "API");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var User_1 = require("./User");
    var Lang_1 = require("./Lang");
    var GameBox_1 = require("./GameBox");
    var QQPlay_1 = require("./pl/QQPlay");
    var Facebook_1 = require("./pl/Facebook");
    var Wechat_1 = require("./pl/Wechat");
    var API = function() {
      function API() {}
      Object.defineProperty(API, "share", {
        get: function() {
          null == API._instance && (API._instance = new API());
          return API._instance;
        },
        enumerable: true,
        configurable: true
      });
      API.prototype.init = function() {
        if (this.isWeChat) {
          Wechat_1.default.share.init();
          return;
        }
        if (this.isFacebook) {
          Facebook_1.default.share.init();
          return;
        }
      };
      API.prototype.showClub = function() {
        if (this.isWeChat) {
          Wechat_1.default.share.showClub();
          return;
        }
      };
      API.prototype.showLoginButton = function(rhand) {
        this.isWeChat && Wechat_1.default.share.showLoginButton(rhand);
      };
      API.prototype.showBannerAd = function() {
        if (this.isWeChat) {
          Wechat_1.default.share.showBannerAd();
          return;
        }
      };
      API.prototype.hideBannerAd = function() {
        if (this.isWeChat) {
          Wechat_1.default.share.hideBannerAd();
          return;
        }
      };
      API.prototype.showVideoAd = function(callback) {
        if (this.isWeChat) {
          Wechat_1.default.share.showVideoAd(callback);
          return;
        }
        if (this.isFacebook) {
          Facebook_1.default.share.showVideoAd(callback);
          return;
        }
        cc.log("\u64ad\u653e\u89c6\u9891\u5e7f\u544a\uff01\uff01");
        callback(true);
      };
      API.prototype.login = function(rhand, fhand) {
        if (this.isWeChat) {
          Wechat_1.default.share.login(rhand, fhand);
          return;
        }
        if (this.isFacebook) {
          Facebook_1.default.share.login(rhand);
          return;
        }
        if (this.isQQPlay) {
          QQPlay_1.default.share.login(rhand);
          return;
        }
      };
      API.prototype.getFriends = function(rhand) {
        if (this.isWeChat) {
          rhand([], null);
          return;
        }
        if (this.isFacebook) {
          Facebook_1.default.share.friends(rhand);
          return;
        }
        if (this.isQQPlay) {
          QQPlay_1.default.share.getFriends(rhand);
          return;
        }
        rhand([ User_1.default.share.uid ], null);
      };
      API.prototype.updateRank = function(score) {
        if (this.isWeChat) {
          Wechat_1.default.share.updateRank(score);
          return;
        }
        if (this.isQQPlay) {
          QQPlay_1.default.share.updateRank(score);
          return;
        }
      };
      API.prototype.share = function(rhand) {
        var _this = this;
        var text = null;
        var imgUrl = null;
        if (null != GameBox_1.default.share.shareData && "" != GameBox_1.default.share.shareData.picture) {
          text = GameBox_1.default.share.shareData.title;
          imgUrl = GameBox_1.default.share.shareData.picture;
          this.shareParam(text, imgUrl, "uid=" + User_1.default.share.uid, function(result) {
            if (null == result) {
              null != rhand && rhand(false);
              return;
            }
            null != rhand && rhand(true);
          });
          return;
        }
        cc.loader.loadRes("share", function(error, data) {
          if (error) {
            cc.log("share error ", error);
            null != rhand && rhand(false);
            return;
          }
          text = Lang_1.default.share.find("share_to");
          imgUrl = data.url;
          _this.shareParam(text, imgUrl, "uid=" + User_1.default.share.uid, function(result) {
            if (null == result) {
              null != rhand && rhand(false);
              return;
            }
            null != rhand && rhand(true);
          });
        });
      };
      API.prototype.shareParam = function(text, imageUrl, query, rhand) {
        if (this.isWeChat) {
          Wechat_1.default.share.share(text, imageUrl, query, rhand);
          return;
        }
        if (this.isFacebook) {
          Facebook_1.default.share.share(text, imageUrl, query, rhand);
          return;
        }
        if (this.isQQPlay) {
          QQPlay_1.default.share.share(text, imageUrl, query, rhand);
          return;
        }
        cc.log("\u5206\u4eab\u6e38\u620f\u6210\u529f\uff01\uff01\uff08\u6d4b\u8bd5)");
        rhand(true);
      };
      API.prototype.moveGame = function() {
        GameBox_1.default.share.moreGame();
      };
      Object.defineProperty(API.prototype, "lang", {
        get: function() {
          if (this.isWeChat) return "cn";
          if (this.isFacebook) return "en";
          return "cn";
        },
        enumerable: true,
        configurable: true
      });
      API.prototype.jumpTo = function(appId, isQcode) {
        if (this.isWeChat) {
          isQcode ? this.wechatPreviewImage(appId) : this.wechatJumpto(appId);
          return;
        }
        if (this.isFacebook) {
          Facebook_1.default.share.jumpTo(appId);
          return;
        }
        if (this.isQQPlay) {
          QQPlay_1.default.share.jumoTo(appId);
          return;
        }
      };
      Object.defineProperty(API.prototype, "isFacebook", {
        get: function() {
          if ("undefined" == typeof FBInstant) return false;
          return true;
        },
        enumerable: true,
        configurable: true
      });
      API.prototype.updateWechatFriendRank = function() {
        Wechat_1.default.share.updateFriendRank();
      };
      API.prototype.updateWechatFriendRank2 = function() {
        Wechat_1.default.share.updateFriendRank2();
      };
      API.prototype.updateWechatTargetFriend = function(score) {
        Wechat_1.default.share.updateTargetFriend(score);
      };
      API.prototype.updateWechatTargetFriend2 = function(score) {
        Wechat_1.default.share.updateTargetFriend2(score);
      };
      API.prototype.updateWechatOther = function(data) {
        Wechat_1.default.share.updateOther(data);
      };
      API.prototype.clearWechatContext = function() {
        Wechat_1.default.share.clearContext();
      };
      API.prototype.updateWechatContext = function(sp, text) {
        Wechat_1.default.share.updateContext(sp, text);
      };
      Object.defineProperty(API.prototype, "isWeChat", {
        get: function() {
          if ("undefined" != typeof wx) return true;
          return false;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(API.prototype, "isQQPlay", {
        get: function() {
          if ("undefined" != typeof BK) return true;
          return false;
        },
        enumerable: true,
        configurable: true
      });
      API._instance = null;
      return API;
    }();
    exports.default = API;
    cc._RF.pop();
  }, {
    "./GameBox": "GameBox",
    "./Lang": "Lang",
    "./User": "User",
    "./pl/Facebook": "Facebook",
    "./pl/QQPlay": "QQPlay",
    "./pl/Wechat": "Wechat"
  } ],
  AudioEngine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65da6BnrO1Ps5WcEBZmUGlp", "AudioEngine");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var AudioEngine = function(_super) {
      __extends(AudioEngine, _super);
      function AudioEngine() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      AudioEngine.prototype.onLoad = function() {
        var _this = this;
        cc.game.addPersistRootNode(this.node);
        this.onLoadAudioClip(function(audioes) {
          _this.audioes = audioes;
        });
      };
      AudioEngine.prototype.start = function() {};
      AudioEngine.prototype.onLoadAudioClip = function(rHand) {
        void 0 === rHand && (rHand = null);
        cc.loader.loadResDir("Sound", function(err, clip) {
          if (err) {
            cc.log(err.message || err);
            return;
          }
          cc.log("clip\u52a0\u8f7d\u6210\u529f");
          rHand && rHand(clip);
        });
      };
      AudioEngine.prototype.onPlayMusic = function(name) {
        this.onGetMusic(name);
      };
      AudioEngine.prototype.onStopMusic = function(name) {
        this.onGetMusic(name);
      };
      AudioEngine.prototype.onGetMusic = function(name) {
        for (var i = 0; i < this.audioes.length; i++) if (this.audioes[i]["_name"] == name) return this.audioes[i];
      };
      AudioEngine.prototype.onAddAudioSoure = function() {};
      AudioEngine = __decorate([ ccclass ], AudioEngine);
      return AudioEngine;
    }(cc.Component);
    exports.default = AudioEngine;
    cc._RF.pop();
  }, {} ],
  BaseCommand: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7aba0TAlPhFb7EuWhxZguY3", "BaseCommand");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseCommand = function() {
      function BaseCommand() {}
      Object.defineProperty(BaseCommand.prototype, "typeId", {
        get: function() {
          return "";
        },
        enumerable: true,
        configurable: true
      });
      BaseCommand.prototype.execute = function(data) {};
      return BaseCommand;
    }();
    exports.default = BaseCommand;
    cc._RF.pop();
  }, {} ],
  BaseScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2b496cS4a1GQqEy7CPg+fuu", "BaseScene");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Lang_1 = require("./Lang");
    var Util_1 = require("./Util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BaseScene = function(_super) {
      __extends(BaseScene, _super);
      function BaseScene() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      BaseScene.prototype.onLoad = function() {
        Util_1.default.adjustResolution(this.getComponent(cc.Canvas));
      };
      BaseScene.prototype.start = function() {
        Lang_1.default.share.bind(this.node);
      };
      BaseScene.prototype.showBox = function(pre) {
        return Util_1.default.showBox(pre);
      };
      return BaseScene;
    }(cc.Component);
    exports.default = BaseScene;
    cc._RF.pop();
  }, {
    "./Lang": "Lang",
    "./Util": "Util"
  } ],
  BoxMsg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8cc9eQ704dLQYm9bztgH/cv", "BoxMsg");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Box_1 = require("./Box");
    var Util_1 = require("./Util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BoxMsg = function(_super) {
      __extends(BoxMsg, _super);
      function BoxMsg() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.richMsg = null;
        return _this;
      }
      BoxMsg_1 = BoxMsg;
      BoxMsg.prototype.start = function() {
        _super.prototype.start.call(this);
      };
      Object.defineProperty(BoxMsg.prototype, "text", {
        get: function() {
          return this.richMsg.string;
        },
        set: function(v) {
          cc.log("v");
          this.richMsg.string = v;
        },
        enumerable: true,
        configurable: true
      });
      BoxMsg.show = function(v) {
        Util_1.default.showBoxAsync("BoxMsg", function(node) {
          var msg = node.getComponent(BoxMsg_1);
          if (null == msg) {
            cc.log("\u52a0\u8f7dBoxMsg\u4e3a\u7a7a\u5bf9\u8c61");
            return;
          }
          msg.text = v;
        });
      };
      var BoxMsg_1;
      __decorate([ property(cc.RichText) ], BoxMsg.prototype, "richMsg", void 0);
      BoxMsg = BoxMsg_1 = __decorate([ ccclass ], BoxMsg);
      return BoxMsg;
    }(Box_1.default);
    exports.default = BoxMsg;
    cc._RF.pop();
  }, {
    "./Box": "Box",
    "./Util": "Util"
  } ],
  Box: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4fa713X111DKK2acymMGkJa", "Box");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Lang_1 = require("./Lang");
    var Sound_1 = require("./Sound");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Box = function(_super) {
      __extends(Box, _super);
      function Box() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Box.prototype.onLoad = function() {
        var size = cc.director.getVisibleSize();
        this.node.setContentSize(size);
        var g = this.node.addComponent(cc.Graphics);
        g.fillColor = cc.color(0, 0, 0, 76.5);
        g.fillRect(-size.width / 2, -size.height / 2, 2 * size.width, 2 * size.height);
      };
      Box.prototype.start = function() {
        Lang_1.default.share.bind(this.node);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this, true);
      };
      Box.prototype.onTouch = function(e) {};
      Box.prototype.onClose = function() {
        Sound_1.default.share.click();
        this.node.removeFromParent(true);
      };
      Object.defineProperty(Box.prototype, "data", {
        get: function() {
          return this._data;
        },
        set: function(v) {
          this._data = v;
        },
        enumerable: true,
        configurable: true
      });
      Box.prototype.onDestroy = function() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouch, this, true);
      };
      Box = __decorate([ ccclass ], Box);
      return Box;
    }(cc.Component);
    exports.default = Box;
    cc._RF.pop();
  }, {
    "./Lang": "Lang",
    "./Sound": "Sound"
  } ],
  Commont: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7a780tKegFAC6y2q0rag5hK", "Commont");
    module.exports = {
      data: null,
      id: null
    };
    cc._RF.pop();
  }, {} ],
  CreatorWebToJs_Oc: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6411d4/yxxCLbwWtDovukfs", "CreatorWebToJs_Oc");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CreatorWebToJs_Oc = function() {
      function CreatorWebToJs_Oc() {}
      Object.defineProperty(CreatorWebToJs_Oc, "Instane", {
        get: function() {
          null == CreatorWebToJs_Oc._instance && (CreatorWebToJs_Oc._instance = new CreatorWebToJs_Oc());
          return CreatorWebToJs_Oc._instance;
        },
        enumerable: true,
        configurable: true
      });
      CreatorWebToJs_Oc.prototype.Login = function() {
        ClassNames_Good.methodNames_login();
      };
      CreatorWebToJs_Oc.prototype.pay = function(json) {
        ClassNames_Good.methodNames_payGood(json);
      };
      CreatorWebToJs_Oc.prototype.getPayProductId = function(productId) {
        return productId;
      };
      CreatorWebToJs_Oc._instance = null;
      return CreatorWebToJs_Oc;
    }();
    exports.default = CreatorWebToJs_Oc;
    window.testMethod = function(str) {
      CreatorWebToJs_Oc.Instane.productid = str;
    };
    cc._RF.pop();
  }, {} ],
  Customs: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cb1ceyB0lBMIrdEztCse+be", "Customs");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PerssistRootNode_1 = require("../../Data/PerssistRootNode");
    var HitPanel_1 = require("../../HitPanel");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Customs = function(_super) {
      __extends(Customs, _super);
      function Customs() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Customs.prototype.onLoad = function() {
        var node = cc.director.getScene().getChildByName("PerssistRootNode");
        this.perssissrootnode = node.getComponent(PerssistRootNode_1.default);
        this.perssissrootnode.onUserLoadGame();
        this.userInfor = this.perssissrootnode.getUserInfor;
        cc.log(this.userInfor);
      };
      Customs.prototype.start = function() {
        this.onInit();
      };
      Customs.prototype.onInit = function() {
        this.BG = this.node.getChildByName("BG");
        this.BGPOX = this.BG.position;
        this.lastBtn = this.node.getChildByName("lastBtn");
        this.nextBtn = this.node.getChildByName("nextBtn");
        this.hitplane = this.node.getChildByName("hitplane").getComponent(HitPanel_1.default);
        cc.log(this.userInfor);
        this.onloadcustom(Number(this.userInfor[8]["Customs"]));
      };
      Customs.prototype.onBtnClickEvent = function(event) {
        switch (event.currentTarget.name) {
         case "custom1Btn":
          this.onCousomBtnClick(1);
          break;

         case "custom2Btn":
          this.onCousomBtnClick(2);
          break;

         case "custom3Btn":
          this.onCousomBtnClick(3);
          break;

         case "custom4Btn":
          this.onCousomBtnClick(4);
          break;

         case "custom5Btn":
          this.onCousomBtnClick(5);
          break;

         case "custom6Btn":
          this.onCousomBtnClick(6);
          break;

         case "custom7Btn":
          this.onCousomBtnClick(7);
          break;

         case "custom8Btn":
          this.onCousomBtnClick(8);
          break;

         case "custom9Btn":
          this.onCousomBtnClick(9);
          break;

         case "custom10Btn":
          this.onCousomBtnClick(10);
          break;

         case "custom11Btn":
          this.onCousomBtnClick(11);
          break;

         case "custom12Btn":
          this.onCousomBtnClick(12);
          break;

         case "returnBtn":
          this.onReturnBtnClick();
          break;

         case "lastBtn":
          this.onlastBtnClick();
          break;

         case "nextBtn":
          this.onnextBtnClick();
        }
      };
      Customs.prototype.onloadcustom = function(customs) {
        cc.log(customs);
        var BgBtn = this.BG.getChildByName("BgBtn").children;
        var BgSprite = this.BG.getChildByName("BgSprite").children;
        var BgStartSprite = this.BG.getChildByName("BgStartSprite").children;
        for (var i = 0; i < BgBtn.length; i++) if (i <= customs) {
          if (i > 0 && i < 6 && customs <= 6) {
            BgSprite[i - 1].active = true;
            BgStartSprite[i - 1].active = false;
          }
          if (i > 6 && customs > 6) {
            BgSprite[i - 2].active = true;
            BgStartSprite[i - 2].active = false;
          }
        }
      };
      Customs.prototype.onCousomBtnClick = function(coustnum) {
        switch (coustnum) {
         case 1:
          cc.director.loadScene("GameSite1");
          break;

         case 2:
          this.onCoustsScenes(1, "GameSite2");
          break;

         case 3:
          this.onCoustsScenes(2, "GameSite3");
          break;

         case 4:
          this.onCoustsScenes(3, "GameSite4");
          break;

         case 5:
          this.onCoustsScenes(4, "GameSite5");
          break;

         case 6:
          this.onCoustsScenes(5, "GameSite6");
          break;

         case 7:
          this.onCoustsScenes(6, "GameSite7");
          break;

         case 8:
          this.onCoustsScenes(7, "GameSite8");
          break;

         case 9:
          this.onCoustsScenes(8, "GameSite9");
          break;

         case 10:
          this.onCoustsScenes(9, "GameSite10");
          break;

         case 11:
          this.onCoustsScenes(10, "GameSite11");
          break;

         case 12:
          this.onCoustsScenes(11, "GameSite12");
        }
      };
      Customs.prototype.onCoustsScenes = function(coustNum, loadScene) {
        if (Number(this.userInfor[8]["Customs"]) >= coustNum) cc.director.loadScene(loadScene); else {
          this.hitplane.node.active = true;
          this.hitplane.onSetHitpstr("\u8bf7\u5148\u901a\u8fc7\u4e0a\u4e00\u5173\u5361\uff0c\u624d\u80fd\u5f00\u59cb\u672c\u5173\u5361");
        }
      };
      Customs.prototype.onReturnBtnClick = function() {
        cc.director.loadScene("MainGame");
      };
      Customs.prototype.onlastBtnClick = function() {
        this.lastBtn.active = false;
        this.onCoustomSpriteMove(this.BGPOX, "last");
      };
      Customs.prototype.onnextBtnClick = function() {
        this.nextBtn.active = false;
        this.onCoustomSpriteMove(new cc.Vec2(650, 0), "next");
      };
      Customs.prototype.onCoustomSpriteMove = function(pos, Str) {
        var speed = .5;
        var aciton = cc.moveTo(speed, pos);
        this.BG.runAction(aciton);
        "last" == Str ? this.nextBtn.active = true : this.lastBtn.active = true;
      };
      Customs = __decorate([ ccclass ], Customs);
      return Customs;
    }(cc.Component);
    exports.default = Customs;
    cc._RF.pop();
  }, {
    "../../Data/PerssistRootNode": "PerssistRootNode",
    "../../HitPanel": "HitPanel"
  } ],
  Data: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7d5b6EEJlxCa5uJRJ4h6Luz", "Data");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Data = function() {
      function Data() {
        this.dataMap = {};
      }
      Object.defineProperty(Data, "share", {
        get: function() {
          null == Data._instance && (Data._instance = new Data());
          return Data._instance;
        },
        enumerable: true,
        configurable: true
      });
      Data.prototype.load = function(param, rhand) {
        var _this = this;
        cc.loader.loadResArray(param, function(err, jsonLst) {
          if (err) return;
          for (var index in param) {
            var tableName = param[index];
            tableName = tableName.split("data/")[1];
            var json = jsonLst[index];
            _this.dataMap[tableName] = json;
          }
          rhand();
        });
      };
      Data.prototype.getData = function(tableName, id) {
        var json = this.dataMap[tableName];
        if (!json) return;
        if (!id) return json;
        for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
          var data = json_1[_i];
          if (data.id == id) return data;
        }
      };
      Data._instance = null;
      return Data;
    }();
    exports.default = Data;
    cc._RF.pop();
  }, {} ],
  Enemy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f80218kfoxIJ6s5Vq2z18XH", "Enemy");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PerssistRootNode_1 = require("../../Data/PerssistRootNode");
    var Player_1 = require("../Player/Player");
    var GameSite_1 = require("../GameSite/GameSite");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Enemy = function(_super) {
      __extends(Enemy, _super);
      function Enemy() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.enemy_hp = 100;
        _this.enemy_Atn = 10;
        _this.enemy_def = 0;
        _this._Enemy_animation = null;
        _this.turnBasedExit = false;
        return _this;
      }
      Enemy.prototype.onLoad = function() {
        var node = cc.director.getScene().getChildByName("PerssistRootNode");
        this.perssistRoddtNode = node.getComponent(PerssistRootNode_1.default);
        this.UserInfor = this.perssistRoddtNode.getUserInfor;
      };
      Enemy.prototype.start = function() {
        this.GameSite = this.node.parent.getComponent(GameSite_1.default);
        this._Enemy_animation = this.getComponent(cc.Animation);
        this._Enemy_animation.play("idle");
        this._Enemy_animation.on("finished", this.AttackExit, this);
        this.hitPanel = cc.find("hitplane");
        this.blood = this.node.getChildByName("bloodcase").getChildByName("blood").getComponent(cc.Sprite);
        var manager = cc.director.getCollisionManager();
        manager.enabledDebugDraw = false;
      };
      Enemy.prototype.onMove = function(playpos) {
        var pos = new cc.Vec2(playpos.x + 60, playpos.y + 40);
        var speed = .2;
        var aciton = cc.moveTo(speed, pos);
        this.node.runAction(aciton);
        this._Enemy_animation.play("run");
        this.turnBasedExit = true;
      };
      Enemy.prototype.onAttack = function(player) {
        this.onMove(player.position);
      };
      Enemy.prototype.AttackExit = function() {
        this.Player.onHitblood(this.enemy_Atn);
        this.node.scaleX = -this.node.scaleX;
        this._Enemy_animation.play("run");
        this.onMove(new cc.Vec2(this.GameSite.enemysInstanNode.x - 60, this.GameSite.enemysInstanNode.y - 40));
        this.turnBasedExit = true;
      };
      Enemy.prototype.onEnemyhit = function(_playerharm) {
        if (this.hp > _playerharm - this.enemy_def) {
          this.hp -= _playerharm - this.enemy_def;
          this.node.color = new cc.Color(255, 0, 0, 255);
          this.schedule(this.onHitcolor, 1);
        } else {
          this.GameSite.onfalseAttackBtn();
          this.Player.enemyisonDie = true;
          this.node.color = new cc.Color(255, 0, 0, 255);
          this.schedule(this.onEnemydie, 2);
        }
      };
      Enemy.prototype.onHitblood = function(minusBlood) {
        minusBlood -= this.enemy_def;
        var a = minusBlood / this.enemy_hp;
        this.blood.fillStart += a;
      };
      Enemy.prototype.onHitcolor = function() {
        this.node.color = new cc.Color(255, 255, 255, 255);
      };
      Enemy.prototype.onEnemydie = function() {
        this.GameSite.onForBiddenGameSiteUI();
        this.node.parent.removeChild(this.node);
        this.GameSite.onIsonEnemyNull(this.enemy_name);
        this.schedule(this.die, 4);
      };
      Enemy.prototype.die = function() {
        this.node.destroy();
      };
      Enemy.prototype.onCollisionEnter = function(other, self) {
        var _this = this;
        if ("player" == other.node.group && this.turnBasedExit) {
          this._Enemy_animation.play("attack");
          this.Player = other.node.getComponent(Player_1.default);
          this.Player.onplayerHit(this.enemy_Atn);
        }
        if ("EnemyInstanNode" == other.node.group && this.turnBasedExit) {
          this.turnBasedExit = false;
          this.node.scaleX = -this.node.scaleX;
          this._Enemy_animation.play("idle");
          this.GameSite.onTrueAttackBtn();
          setTimeout(function() {
            _this.GameSite.onIsonAttack();
          }, 100);
        }
      };
      Enemy = __decorate([ ccclass ], Enemy);
      return Enemy;
    }(cc.Component);
    exports.default = Enemy;
    cc._RF.pop();
  }, {
    "../../Data/PerssistRootNode": "PerssistRootNode",
    "../GameSite/GameSite": "GameSite",
    "../Player/Player": "Player"
  } ],
  Facebook: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "483a02nMhpMeZzsBxJZxniV", "Facebook");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameBox_1 = require("../GameBox");
    var User_1 = require("../User");
    var Http_1 = require("../Http");
    var Util_1 = require("../Util");
    var Facebook = function() {
      function Facebook() {
        this.noVideoAD = false;
        this._facebookVideoAd = null;
        this._facebookVideoAdShowing = false;
      }
      Object.defineProperty(Facebook, "share", {
        get: function() {
          null == Facebook._instance && (Facebook._instance = new Facebook());
          return Facebook._instance;
        },
        enumerable: true,
        configurable: true
      });
      Facebook.prototype.init = function() {
        this.loadVideoAd();
        FBInstant.logEvent("init_facebook_sdk");
      };
      Facebook.prototype.loadVideoAd = function() {
        var _this = this;
        var adId = GameBox_1.default.share.voideoId;
        if (null == adId) {
          console.log("facebook \u6ca1\u6709\u914d\u7f6e\u89c6\u9891\u5e7f\u544a");
          return;
        }
        this._facebookVideoAd = null;
        this._facebookVideoAdShowing = false;
        var _rewarded = null;
        FBInstant.getRewardedVideoAsync(adId).then(function(rewarded) {
          _rewarded = rewarded;
          return rewarded.loadAsync();
        }).then(function() {
          console.log("\u52a0\u8f7d\u89c6\u9891\u5b8c\u6210\uff01");
          _this._facebookVideoAd = _rewarded;
        }).catch(function(err) {
          console.error("\u52a0\u8f7d\u89c6\u9891\u5931\u8d25: " + err.message);
          _this.loadWebAd();
        });
      };
      Facebook.prototype.loadWebAd = function() {
        var _this = this;
        var adId = GameBox_1.default.share.voideoId;
        if (null == adId) {
          console.log("facebook \u6ca1\u6709\u914d\u7f6e\u7f51\u7edc\u5e7f\u544a");
          return;
        }
        var preloadedInterstitial = null;
        FBInstant.getInterstitialAdAsync(adId).then(function(interstitial) {
          preloadedInterstitial = interstitial;
          return preloadedInterstitial.loadAsync();
        }).then(function() {
          console.log("\u52a0\u8f7d\u7f51\u9875\u5e7f\u544a\u6210\u529f\uff01");
          _this._facebookVideoAd = preloadedInterstitial;
        }).catch(function(err) {
          console.error("\u52a0\u8f7d\u7f51\u9875\u5e7f\u544a\u5931\u8d25: " + err.message);
          _this.noVideoAD = true;
        });
      };
      Facebook.prototype.login = function(rhand) {
        User_1.default.share.uid = FBInstant.player.getID();
        User_1.default.share.name = FBInstant.player.getName();
        User_1.default.share.icon = "";
        cc.log("facebook \u767b\u5f55\u5b8c\u6210", User_1.default.share.uid, User_1.default.share.name);
        Http_1.default.share.postUser(function() {
          Util_1.default.event.emit("loading", 24);
          Http_1.default.share.getPlayer(rhand);
        });
      };
      Facebook.prototype.share = function(text, imageUrl, query, rhand) {
        console.log("\u5206\u4eab\u53d7\u56fe\u7247\uff1a", text, imageUrl, query);
        GameBox_1.default.share.getImageBase64(imageUrl, function(str) {
          console.log("base64", str);
          FBInstant.shareAsync({
            intent: "REQUEST",
            image: str,
            text: text,
            data: {
              query: query
            }
          }).then(function() {
            console.log("facebook \u5206\u4eab\u6210\u529f");
            rhand(true);
          });
        });
      };
      Facebook.prototype.friends = function(rhand) {
        FBInstant.player.getConnectedPlayersAsync().then(function(players) {
          console.log("friends ", JSON.stringify(players));
          var arr = [];
          var iconMap = {};
          for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
            var v = players_1[_i];
            v = v["$1"];
            arr.push(v.id);
            iconMap[v.id] = v.photo;
          }
          iconMap[User_1.default.share.uid] = FBInstant.player.getPhoto();
          console.log("\u597d\u53cbIDS:", JSON.stringify(arr));
          rhand(arr, iconMap);
        });
      };
      Facebook.prototype.showVideoAd = function(callback) {
        var _this = this;
        if (this.noVideoAD) {
          console.log("\u6ca1\u6709\u5e7f\u544a...");
          callback(false);
          return;
        }
        if (this._facebookVideoAdShowing) {
          cc.log("\u89c6\u9891\u52a0\u8f7d\u4e2d...");
          callback(false);
          return;
        }
        if (null == this._facebookVideoAd) {
          cc.log("\u89c6\u9891\u8fd8\u6ca1\u52a0\u8f7d\u5b8c\u6210\uff01\uff01");
          callback(false);
          return;
        }
        this._facebookVideoAdShowing = true;
        this._facebookVideoAd.showAsync().then(function() {
          _this._facebookVideoAdShowing = false;
          console.log("\u663e\u793a\u5e7f\u544a\u6210\u529f\uff01");
          callback(true);
          _this.loadVideoAd();
        }).catch(function(e) {
          _this._facebookVideoAdShowing = false;
          console.error("\u663e\u793a\u5e7f\u544a\u5931\u8d25\uff1a", e.message);
          callback(false);
          _this.loadVideoAd();
        });
      };
      Facebook.prototype.showBannerAd = function() {
        console.log("FB\u6ca1\u6709Banner\u5e7f\u544a");
      };
      Facebook.prototype.jumpTo = function(appId) {
        console.log("\u8df3\u8f6cAPP :", appId);
        FBInstant.switchGameAsync(appId).catch(function(e) {
          console.log("\u8df3\u8f6cAPP\u5931\u8d25 :", appId, e, JSON.stringify(e));
        });
      };
      Facebook.prototype.activePlayers = function(rhand) {
        cc.log("activePlayers1");
        var contextPlayers = FBInstant.context.getPlayersAsync().then(function(players) {
          console.log("activePlayers ", JSON.stringify(players));
          var arr = [];
          var iconMap = {};
          for (var _i = 0, players_2 = players; _i < players_2.length; _i++) {
            var v = players_2[_i];
            v = v["$1"];
            arr.push(v.id);
            iconMap[v.id] = v.photo;
          }
          console.log("\u73a9\u5bb6\u5217\u8868IDS:", JSON.stringify(arr));
          rhand(arr, iconMap);
        });
        console.log("activePlayers222 ", JSON.stringify(contextPlayers));
        cc.log("activePlayers2");
      };
      Facebook._instance = null;
      return Facebook;
    }();
    exports.default = Facebook;
    cc._RF.pop();
  }, {
    "../GameBox": "GameBox",
    "../Http": "Http",
    "../User": "User",
    "../Util": "Util"
  } ],
  FriendTop3: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0b20fjG9q9K3Zijd4cUxgxv", "FriendTop3");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RankUtil_1 = require("./RankUtil");
    var API_1 = require("./API");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FriendTop3 = function(_super) {
      __extends(FriendTop3, _super);
      function FriendTop3() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      FriendTop3.prototype.start = function() {
        var _this = this;
        if (API_1.default.share.isWeChat) {
          this.node.active = false;
          return;
        }
        for (var i = 0; i < 3; i++) this.updateItem(i, null);
        RankUtil_1.default.share.showFriend(3, function(res, self) {
          var len = res.length;
          for (var i = 0; i < 3; i++) i < len ? _this.updateItem(i, res[i]) : _this.updateItem(i, null);
        });
      };
      FriendTop3.prototype.updateItem = function(index, data) {
        cc.log("\u8bf7\u91cd\u6784updateItem \u65b9\u6cd5\u8fdb\u884c\u4ed8\u503c\uff01\uff01\uff01\uff01", index);
      };
      FriendTop3 = __decorate([ ccclass ], FriendTop3);
      return FriendTop3;
    }(cc.Component);
    exports.default = FriendTop3;
    cc._RF.pop();
  }, {
    "./API": "API",
    "./RankUtil": "RankUtil"
  } ],
  GameBox: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1bc58G1KShFM5fXkQpP7Zl7", "GameBox");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Util_1 = require("./Util");
    var API_1 = require("./API");
    var User_1 = require("./User");
    var GameBox = function() {
      function GameBox() {
        this.url = "";
        this.gameId = "";
        this.version = "";
        this.moreGameData = null;
        this.gameData = null;
        this.shareData = null;
        this.adData = null;
      }
      Object.defineProperty(GameBox, "share", {
        get: function() {
          null == GameBox._instance && (GameBox._instance = new GameBox());
          return GameBox._instance;
        },
        enumerable: true,
        configurable: true
      });
      GameBox.prototype.init = function(url, gameId, rhand) {
        var _this = this;
        "/" != url.substr(url.length - 1) && (url += "/");
        this.url = url;
        this.gameId = gameId;
        var count = 4;
        this.httpGet("getGameGengduo.jsp", {
          gameId: gameId
        }, function(str) {
          "" != str && (_this.moreGameData = JSON.parse(str));
          --count <= 0 && rhand();
        });
        this.httpGet("Boxapi.jsp", {
          gameId: gameId
        }, function(str) {
          "" != str && (_this.gameData = JSON.parse(str));
          --count <= 0 && rhand();
        });
        this.httpGet("ShareData.jsp", {
          gameId: gameId
        }, function(str) {
          "" != str && (_this.shareData = JSON.parse(str));
          --count <= 0 && rhand();
        });
        this.httpGet("AdvertiseData.jsp", {
          gameId: gameId
        }, function(str) {
          "" != str && (_this.adData = JSON.parse(str));
          cc.log("this.addata", _this.adData);
          --count <= 0 && rhand();
        });
      };
      GameBox.prototype.httpGet = function(url, data, callback) {
        var u = this.url + url;
        Util_1.default.loadHtml(u, callback, data);
      };
      GameBox.prototype.moreGame = function() {
        if (null == this.moreGameData) {
          cc.log("\u6ca1\u6709\u66f4\u591a\u6e38\u620f\u6570\u636e\uff01\uff01");
          return;
        }
        0 == this.moreGameData.jump ? API_1.default.share.jumpTo(this.moreGameData.erWeiPicture, true) : 1 == this.moreGameData.jump && API_1.default.share.jumpTo(this.moreGameData.jumpAppId, false);
      };
      GameBox.prototype.createIcon = function() {
        var _this = this;
        var node = null;
        if (null != this.gameData && void 0 != this.gameData.icon) {
          if (API_1.default.share.isFacebook) {
            node = new cc.Node();
            Util_1.default.loadBase64(this.gameData.icon, function(sf) {
              var sp = node.addComponent(cc.Sprite);
              sp.spriteFrame = sf;
            });
          } else if (cc.sys.isBrowser) {
            node = new cc.Node();
            Util_1.default.loadSpriteCrossOrigin(this.gameData.icon, function(sf) {
              var sp = node.addComponent(cc.Sprite);
              sp.spriteFrame = sf;
            });
          } else {
            var png = "png";
            this.gameData.icon.lastIndexOf(".jpg") > 0 && (png = "jpg");
            node = Util_1.default.loadSpriteURL(this.gameData.icon, png);
          }
          node.setContentSize(100, 100);
          node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(3), cc.rotateTo(.2, 20), cc.rotateTo(.2, -20), cc.rotateTo(.2, 20), cc.rotateTo(.2, 0))));
          node.on(cc.Node.EventType.TOUCH_START, function(e) {
            API_1.default.share.jumpTo(_this.gameData.qrcode, true);
          });
        } else node = new cc.Node();
        return node;
      };
      Object.defineProperty(GameBox.prototype, "isShowRevive", {
        get: function() {
          if (null == this.shareData) return false;
          if (this.shareData.version != this.version) return false;
          return true;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(GameBox.prototype, "isShowVideoAd", {
        get: function() {
          if (null == this.voideoId) return false;
          return true;
        },
        enumerable: true,
        configurable: true
      });
      GameBox.prototype.uploadPid = function(pid) {
        this.httpGet("platform.jsp", {
          uid: User_1.default.share.uid,
          gameId: this.gameId,
          pid: pid
        }, function(str) {});
      };
      Object.defineProperty(GameBox.prototype, "voideoId", {
        get: function() {
          return this.getAdId(GameBox.AD_VIDEO);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(GameBox.prototype, "bannerId", {
        get: function() {
          return this.getAdId(GameBox.AD_BANNER);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(GameBox.prototype, "webId", {
        get: function() {
          return this.getAdId(GameBox.AD_WEB);
        },
        enumerable: true,
        configurable: true
      });
      GameBox.prototype.getAdId = function(type) {
        if (null == this.adData) {
          cc.log("\u5e7f\u544a\u6570\u636e\u4e3aNULL");
          return null;
        }
        for (var _i = 0, _a = this.adData; _i < _a.length; _i++) {
          var v = _a[_i];
          if (v.type == type) return v.advertiseId;
        }
        return null;
      };
      GameBox.prototype.getImageBase64 = function(url, rhand) {
        this.httpGet("imageTurn.jsp", {
          imagePath: url
        }, function(str) {
          var ext = url.substring(url.lastIndexOf(".") + 1).toLowerCase();
          str = "data:image/" + ext + ";base64," + str;
          null != rhand && rhand(str);
        });
      };
      GameBox.AD_VIDEO = 1;
      GameBox.AD_BANNER = 2;
      GameBox.AD_WEB = 3;
      GameBox.AD_NONE = 4;
      GameBox._instance = null;
      return GameBox;
    }();
    exports.default = GameBox;
    cc._RF.pop();
  }, {
    "./API": "API",
    "./User": "User",
    "./Util": "Util"
  } ],
  GameOverPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0ea8a+DihpA4rETWYjkzoR8", "GameOverPanel");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameOverPanel = function(_super) {
      __extends(GameOverPanel, _super);
      function GameOverPanel() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      GameOverPanel.prototype.onLoad = function() {
        this._Label = this.node.getChildByName("_Label").getComponent(cc.Label);
        this.Btn = this.node.getChildByName("Btn").getComponent(cc.Button);
        this.Btn.node.on("click", this.onBtnClick, this);
      };
      GameOverPanel.prototype.onLabelStr = function(gold) {
        this._Label.string = "\u606d\u559c\u73a9\u5bb6\u901a\u8fc7\u672c\u8f6e\u5173\u5361\uff0c\u83b7\u53d6\uff1a" + gold + "\u5956\u91d1";
      };
      GameOverPanel.prototype.onLabelPlayStr = function() {
        this._Label.string = "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u6311\u6218\u672c\u5173\u5361\u5931\u8d25\uff0c\u5e0c\u671b\u7ee7\u7eed\u52aa\u529b\u3002";
      };
      GameOverPanel.prototype.onBtnClick = function() {
        this.node.active = false;
        cc.director.loadScene("Customs");
      };
      GameOverPanel = __decorate([ ccclass ], GameOverPanel);
      return GameOverPanel;
    }(cc.Component);
    exports.default = GameOverPanel;
    cc._RF.pop();
  }, {} ],
  GameSite: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "efda310E4hL0aXJD14P2ZHX", "GameSite");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PerssistRootNode_1 = require("../../Data/PerssistRootNode");
    var Util_1 = require("../../base/Util");
    var Enemy_1 = require("../Enemy/Enemy");
    var Player_1 = require("../Player/Player");
    var HitPanel_1 = require("../../HitPanel");
    var GameOverPanel_1 = require("../../GameOverPanel");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameSite = function(_super) {
      __extends(GameSite, _super);
      function GameSite() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.GameLeve = 1;
        _this.Playes = [];
        _this.enemys = [];
        _this.PlayesAttackBtn = null;
        _this.isonInstanPlayer = true;
        _this.isonInstanEnemyer = true;
        _this.enemyDieNum = 0;
        return _this;
      }
      GameSite.prototype.onLoad = function() {
        var node = cc.director.getScene().getChildByName("PerssistRootNode");
        this.perssistRoddtNode = node.getComponent(PerssistRootNode_1.default);
        this.perssistRoddtNode.onUserLoadGame();
        this.userInfor = this.perssistRoddtNode.getUserInfor;
        this.RolesInfor = this.perssistRoddtNode.getRolesData_Config;
        switch (this.node.name) {
         case "Canvas1":
          this.GameLeve = 1;
          break;

         case "Canvas2":
          this.GameLeve = 2;
          break;

         case "Canvas3":
          this.GameLeve = 3;
          break;

         case "Canvas4":
          this.GameLeve = 4;
          break;

         case "Canvas5":
          this.GameLeve = 5;
          break;

         case "Canvas6":
          this.GameLeve = 6;
          break;

         case "Canvas7":
          this.GameLeve = 7;
          break;

         case "Canvas8":
          this.GameLeve = 8;
          break;

         case "Canvas9":
          this.GameLeve = 9;
          break;

         case "Canvas10":
          this.GameLeve = 10;
          break;

         case "Canvas11":
          this.GameLeve = 11;
          break;

         case "Canvas12":
          this.GameLeve = 12;
          break;

         default:
          cc.log("\u6218\u6597\u573a\u666f\u8bc6\u522b\u5931\u8d25");
        }
        var customs_config = this.perssistRoddtNode.getcustoms_Config;
        this.customsInfor = customs_config[this.GameLeve - 1];
      };
      GameSite.prototype.start = function() {
        this.Oninit();
      };
      GameSite.prototype.update = function() {};
      GameSite.prototype.Oninit = function() {
        this.playeInstanNode = this.node.getChildByName("playeInstanNode");
        this.enemysInstanNode = this.node.getChildByName("enemysInstanNode");
        this.PlayesAttackBtn = this.node.getChildByName("attackBtn").getComponent(cc.Button);
        this.isonAttackBtn = this.node.getChildByName("isonAttackBtn").getComponent(cc.Button);
        this.ManualAt = this.isonAttackBtn.node.getChildByName("ManualAt");
        this.AutomateAt = this.isonAttackBtn.node.getChildByName("AutomatedAt");
        this.returnBtn = this.node.getChildByName("returnBtn").getComponent(cc.Button);
        this.hitplane = cc.find("hitplane");
        this.HitPanel = this.hitplane.getComponent(HitPanel_1.default);
        this.gameoverpanel = cc.find("GameOverPanel");
        this._gameoverpanel = this.gameoverpanel.getComponent(GameOverPanel_1.default);
        this.PlayesAttackBtn.node.on("click", this.onPlayerAttackClick, this);
        this.isonAttackBtn.node.on("click", this.onIsonAttackClick, this);
        this.returnBtn.node.on("click", this.onReturnBtnClick, this);
        this.onInstacene();
      };
      GameSite.prototype.onInstacene = function() {
        this.onLoadPlayes();
        this.onLoadEnemyer();
        this.onInitPlayer();
        this.onInitEnemyer();
      };
      GameSite.prototype.onInitPlayer = function() {
        var _this = this;
        var _loop_1 = function(i) {
          if (this_1.isonInstanPlayer && null != this_1.Playes[i]) {
            this_1.isonInstanPlayer = false;
            this_1.onStartUsingGameSiteUI();
            Util_1.default.loadPrefab("Player/" + this_1.Playes[i], function(prefab) {
              var _player = cc.instantiate(prefab);
              _this.playeInstanNode.parent.addChild(_player);
              _player.name = "Player";
              _this._Player = _player;
              _player.position = _this.playeInstanNode.position;
              _player.getChildByName("bloodcase").active = true;
              for (var j = 0; j < _this.RolesInfor.length; j++) if (_this.RolesInfor[j]["Name"] == _this.Playes[i]) {
                var playerid = _this.RolesInfor[j]["ID"];
                var PlayerInfor = _this.onGetPlayInfor(playerid);
                var palyer = _player.getComponent(Player_1.default);
                palyer.player_id = playerid;
                palyer.player_name = _this.RolesInfor[j]["Name"];
                palyer.player_hp = PlayerInfor["Hp"];
                palyer.hp = PlayerInfor["Hp"];
                palyer.player_atn = PlayerInfor["Attack"];
                palyer.player_def = PlayerInfor["Defence"];
              }
            });
          }
        };
        var this_1 = this;
        for (var i = 0; i < this.Playes.length; i++) _loop_1(i);
      };
      GameSite.prototype.onLoadPlayes = function() {
        var packitem = this.userInfor[5]["packhave"];
        for (var i = 0; i < packitem.length; i++) for (var j = 0; j < this.RolesInfor.length; j++) this.RolesInfor[j]["Name"] == packitem[i]["packitemName"] && this.Playes.push(this.RolesInfor[j]["Name"]);
      };
      GameSite.prototype.onGetPlayInfor = function(id) {
        var player_Leve = this.perssistRoddtNode.onGetRolesLeveInfor(id);
        if (null == player_Leve) return;
        var userLeve = this.perssistRoddtNode.getUserInfor[2]["level"];
        var PlayerInfor = null;
        for (var i = 0; i < player_Leve.length; i++) player_Leve[i]["Leve"] == userLeve && (PlayerInfor = player_Leve[i]);
        if (null != PlayerInfor) return PlayerInfor;
      };
      GameSite.prototype.onInitEnemyer = function() {
        var _this = this;
        var _loop_2 = function(i) {
          if (this_2.isonInstanEnemyer && null != this_2.enemys[i]) {
            this_2.isonInstanEnemyer = false;
            this_2.onStartUsingGameSiteUI();
            Util_1.default.loadPrefab("Enemy/" + this_2.enemys[i], function(prefab) {
              var _enemy = cc.instantiate(prefab);
              _enemy.name = "Enemy";
              _this._Enemyer = _enemy;
              _this.enemysInstanNode.parent.addChild(_enemy);
              _enemy.position = _this.enemysInstanNode.position;
              _enemy.getChildByName("bloodcase").active = true;
              var enemy = _enemy.getComponent(Enemy_1.default);
              for (var j = 0; j < _this.RolesInfor.length; j++) if (_this.RolesInfor[j]["Name"] == _this.enemys[i]) {
                enemy.enemy_name = _this.RolesInfor[j]["Name"];
                enemy.enemy_hp = Number(_this.RolesInfor[j]["HP"]);
                enemy.hp = Number(_this.RolesInfor[j]["HP"]);
                enemy.enemy_Atn = Number(_this.RolesInfor[j]["Attack"]);
                enemy.enemy_def = Number(_this.RolesInfor[j]["Defence"]);
                enemy.price = Number(_this.RolesInfor[j]["Price"]);
              }
            });
          }
        };
        var this_2 = this;
        for (var i = 0; i < this.enemys.length; i++) _loop_2(i);
      };
      GameSite.prototype.onLoadEnemyer = function() {
        var e1 = this.customsInfor["Enemy1Num"];
        var e2 = e1 + this.customsInfor["Enemy2Num"];
        var e3 = e2 + this.customsInfor["Enemy3Num"];
        for (var i = 0; i <= e3; i++) {
          i < e1 && this.enemys.push(this.customsInfor["Enemy1"]);
          e1 < i && i <= e2 && this.enemys.push(this.customsInfor["Enemy2"]);
          e2 <= i && i < e3 && this.enemys.push(this.customsInfor["Enemy3"]);
        }
      };
      GameSite.prototype.onPlayerAttackClick = function() {
        var player = this._Player.getComponent(Player_1.default);
        player.onPlayerAttack(this._Enemyer);
        player.enemyisonDie = false;
        this.PlayesAttackBtn.interactable = false;
      };
      GameSite.prototype.onEneyerAttack = function() {
        var enemy = this._Enemyer.getComponent(Enemy_1.default);
        enemy.onAttack(this._Player);
      };
      GameSite.prototype.onTrueAttackBtn = function() {
        this.PlayesAttackBtn.interactable = true;
      };
      GameSite.prototype.onfalseAttackBtn = function() {
        this.PlayesAttackBtn.interactable = false;
      };
      GameSite.prototype.onIsonAttackClick = function() {
        if (true == this.ManualAt.active) {
          this.ManualAt.active = false;
          this.AutomateAt.active = true;
          true == this.PlayesAttackBtn.interactable && this.onPlayerAttackClick();
        } else {
          this.ManualAt.active = true;
          this.AutomateAt.active = false;
        }
      };
      GameSite.prototype.onIsonAttack = function() {
        true == this.AutomateAt.active && this.onPlayerAttackClick();
      };
      GameSite.prototype.onIsonPlayerNull = function(playername) {
        var a = this.Playes.shift();
        if (this.Playes.length <= 0 || null == this.Playes.length || void 0 == this.Playes.length) {
          this.gameoverpanel.active = true;
          this._gameoverpanel.onLabelPlayStr();
        } else {
          this.hitplane.active = true;
          this.HitPanel.onSetHitpstr("\u5bf9\u4e0d\u8d77\uff0c\u6211\u65b9\u4e00\u540d\u82f1\u96c4\u6b7b\u4ea1\uff1a" + playername);
          this.isonInstanPlayer = true;
          this.schedule(this.onInitPlayer, 2);
        }
      };
      GameSite.prototype.onIsonEnemyNull = function(enemyname) {
        this.enemys.shift();
        if (this.enemys.length <= 0 || null == this.enemys.length || void 0 == this.enemys.length) {
          this.gameoverpanel.active = true;
          this._gameoverpanel.onLabelStr(this.customsInfor["Award"] / 2);
          this.userInfor[3]["gold"] += this.customsInfor["Award"] / 2;
          this.onAddCustom();
          this.perssistRoddtNode.onGameBuidUserInfor(this.userInfor);
        } else {
          this.hitplane.active = true;
          this.enemyDieNum += 1;
          this.HitPanel.onSetHitpstr("\u606d\u559c\u4f60\u6740\u6b7b\u4e86\u7b2c" + this.enemyDieNum + "\u4e2a\u654c\u4eba\uff0c" + enemyname);
          this.isonInstanEnemyer = true;
          this.schedule(this.onInitEnemyer, 2);
        }
      };
      GameSite.prototype.onStartUsingGameSiteUI = function() {
        this.PlayesAttackBtn.interactable = true;
        this.isonAttackBtn.interactable = true;
      };
      GameSite.prototype.onForBiddenGameSiteUI = function() {
        this.PlayesAttackBtn.interactable = false;
        this.isonAttackBtn.interactable = false;
        this.ManualAt.active = true;
        this.AutomateAt.active = false;
      };
      GameSite.prototype.onAddCustom = function() {
        console.log(this.userInfor[8]["Customs"], this.GameLeve);
        if (this.userInfor[8]["Customs"] < this.GameLeve) {
          this.userInfor[8]["Customs"] += 1;
          cc.log(this.userInfor[8]["Customs"]);
        }
        this.userInfor[8]["Customs"] >= 11 && (this.userInfor[8]["Customs"] = 11);
        this.perssistRoddtNode.onGameBuidUserInfor(this.userInfor);
      };
      GameSite.prototype.onReturnBtnClick = function() {
        cc.director.loadScene("Customs");
      };
      GameSite = __decorate([ ccclass ], GameSite);
      return GameSite;
    }(cc.Component);
    exports.default = GameSite;
    cc._RF.pop();
  }, {
    "../../Data/PerssistRootNode": "PerssistRootNode",
    "../../GameOverPanel": "GameOverPanel",
    "../../HitPanel": "HitPanel",
    "../../base/Util": "Util",
    "../Enemy/Enemy": "Enemy",
    "../Player/Player": "Player"
  } ],
  HitPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d9998TQIHVDrrN255QVYvvK", "HitPanel");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HitPanel = function(_super) {
      __extends(HitPanel, _super);
      function HitPanel() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      HitPanel.prototype.onLoad = function() {
        this.hitpstr = this.node.getChildByName("hitpstr").getComponent(cc.Label);
        this.Btn = this.node.getChildByName("Btn").getComponent(cc.Button);
        this.Btn.node.on("click", this.onClick, this);
      };
      HitPanel.prototype.start = function() {};
      HitPanel.prototype.onClick = function() {
        this.hitpstr.string = "";
        this.node.active = false;
      };
      HitPanel.prototype.onSetHitpstr = function(str) {
        this.hitpstr.string = str;
      };
      HitPanel = __decorate([ ccclass ], HitPanel);
      return HitPanel;
    }(cc.Component);
    exports.default = HitPanel;
    cc._RF.pop();
  }, {} ],
  Http: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2dddbTBnQdIvJOp9wj/Sa/C", "Http");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Util_1 = require("./Util");
    var User_1 = require("./User");
    var API_1 = require("./API");
    var BoxMsg_1 = require("./BoxMsg");
    var Lang_1 = require("./Lang");
    var Facebook_1 = require("./pl/Facebook");
    var Http = function() {
      function Http() {
        this.url = null;
        this.gameId = null;
      }
      Object.defineProperty(Http, "share", {
        get: function() {
          null == Http._instance && (Http._instance = new Http());
          return Http._instance;
        },
        enumerable: true,
        configurable: true
      });
      Http.prototype.init = function(url, gameId) {
        "/" != url.substr(url.length - 1) && (url += "/");
        this.url = url;
        this.gameId = gameId;
      };
      Http.prototype.login = function(code, rhand, fhand) {
        var _this = this;
        var data = {
          code: code,
          gameId: this.gameId
        };
        this.httpGet("login/wxLogin", data, function(str) {
          if (_this.isError(str)) {
            Util_1.default.event.emit("loading", 21);
            fhand();
            return;
          }
          if (!_this.isJson(str)) {
            Util_1.default.event.emit("loading", 22);
            fhand();
            return;
          }
          Util_1.default.event.emit("loading", 23);
          var obj = JSON.parse(str);
          User_1.default.share.uid = obj.openid;
          _this.postUser(function() {
            Util_1.default.event.emit("loading", 24);
            _this.getPlayer(rhand);
          });
        });
      };
      Http.prototype.postUser = function(callback) {
        var data = {};
        data.uid = User_1.default.share.uid;
        data.name = User_1.default.share.name;
        data.icon = User_1.default.share.icon;
        if (null == data.uid || null == data.icon || null == data.name) {
          console.log("\u767b\u5f55\u6570\u636e\u4e3anull");
          return;
        }
        this.httpGet("login/login", data, callback);
      };
      Http.prototype.getPlayer = function(callback) {
        var _this = this;
        var data = {
          uid: User_1.default.share.uid,
          gameId: this.gameId
        };
        this.httpGet("game/getPlayer", data, function(str) {
          if (_this.isError(str)) {
            Util_1.default.event.emit("loading", 31);
            callback(false);
            return;
          }
          if (!_this.isJson(str)) {
            Util_1.default.event.emit("loading", 32);
            callback(false);
            return;
          }
          Util_1.default.event.emit("loading", 33);
          var obj = JSON.parse(str);
          User_1.default.share.score = obj.score;
          User_1.default.share.money = obj.money;
          User_1.default.share.addMoneyCount = obj.addMoneyCount;
          User_1.default.share.count = obj.count;
          User_1.default.share.maxCount = obj.maxCount;
          User_1.default.share.totalCount1 = obj.totalCount1;
          User_1.default.share.totalCount2 = obj.totalCount2;
          callback(true);
        });
      };
      Http.prototype.addGameCount = function(key, callback) {
        var _this = this;
        var data = {
          uid: User_1.default.share.uid,
          gameId: this.gameId,
          cid: key
        };
        this.httpGet("game/addCount", data, function(str) {
          if (_this.isError(str)) {
            callback(false);
            return;
          }
          if (!_this.isJson(str)) {
            callback(false);
            return;
          }
          var obj = JSON.parse(str);
          if (-1 == obj.count) {
            callback(false);
            BoxMsg_1.default.show(Lang_1.default.share.find("share_error"));
            return;
          }
          if (-2 == obj.count) {
            callback(false);
            BoxMsg_1.default.show(Lang_1.default.share.find("share_max"));
            return;
          }
          User_1.default.share.count = obj.count;
          callback(true);
        });
      };
      Http.prototype.delGameCount = function(callback) {
        var _this = this;
        var data = {
          uid: User_1.default.share.uid,
          gameId: this.gameId
        };
        this.httpGet("game/delCount", data, function(str) {
          if (_this.isError(str)) {
            callback(false);
            return;
          }
          if (!_this.isJson(str)) {
            callback(false);
            return;
          }
          var obj = JSON.parse(str);
          if (void 0 != obj.error) {
            callback(false);
            return;
          }
          User_1.default.share.count = obj.count;
          User_1.default.share.totalCount1 = obj.totalCount1;
          callback(true);
        });
      };
      Http.prototype.addMoney = function(callback) {
        var _this = this;
        var data = {
          uid: User_1.default.share.uid,
          gameId: this.gameId
        };
        this.httpGet("game/addMoney", data, function(str) {
          if (_this.isError(str)) {
            callback(-1);
            return;
          }
          if (!_this.isJson(str)) {
            callback(-1);
            return;
          }
          var obj = JSON.parse(str);
          User_1.default.share.money = obj.money;
          User_1.default.share.addMoney = obj.add;
          User_1.default.share.totalCount2 = obj.totalCount2;
          callback(obj.add);
        });
      };
      Http.prototype.getMoneyRecord = function(callback) {
        var _this = this;
        var data = {
          uid: User_1.default.share.uid,
          gameId: this.gameId
        };
        this.httpGet("game/getMoneyRecord", data, function(str) {
          if (_this.isError(str)) {
            callback(null);
            return;
          }
          if (!_this.isJson(str)) {
            callback(null);
            return;
          }
          var obj = JSON.parse(str);
          callback(obj);
        });
      };
      Http.prototype.getWorldRank = function(size, callback) {
        var _this = this;
        API_1.default.share.isFacebook && this.facebookWorlRank(size, function() {});
        var data = {
          uid: User_1.default.share.uid,
          gameId: this.gameId,
          size: size
        };
        this.httpGet("rank/getWorldRank", data, function(str) {
          if (_this.isError(str)) {
            callback(null);
            return;
          }
          if (!_this.isJson(str)) {
            callback(null);
            return;
          }
          var obj = JSON.parse(str);
          callback(obj);
        });
      };
      Http.prototype.facebookWorlRank = function(size, callback) {
        var _this = this;
        cc.log("\u83b7\u53d6FB\u6d3b\u52a8\u73a9\u5bb61");
        Facebook_1.default.share.activePlayers(function(ids, iconMap) {
          cc.log("\u83b7\u53d6FB\u6d3b\u52a8\u73a9\u5bb62");
          var uuid = ids.join(",");
          var data = {
            uid: User_1.default.share.uid,
            gameId: _this.gameId,
            uuid: uuid
          };
          _this.httpGet("rank/getFriendRank", data, function(str) {
            if (_this.isError(str)) {
              callback(null);
              return;
            }
            var obj = JSON.parse(str);
            if (null != iconMap) for (var _i = 0, _a = obj.datas; _i < _a.length; _i++) {
              var v = _a[_i];
              v.icon = iconMap[v.uid];
              v.id == User_1.default.share.uid && (obj.my.icon = v.icon);
            }
            callback(obj);
            cc.log("\u83b7\u53d6FB\u6d3b\u52a8\u73a9\u5bb63");
          });
        });
      };
      Http.prototype.getFriendRank = function(callback) {
        var _this = this;
        API_1.default.share.getFriends(function(uidArr, iconMap) {
          if (API_1.default.share.isQQPlay) {
            callback(iconMap);
            return;
          }
          if (null == uidArr || 0 == uidArr.length) {
            console.log("\u6ca1\u6709\u597d\u53cb\u6570\u636e");
            callback(null);
            return;
          }
          var uuid = uidArr.join(",");
          var data = {
            uid: User_1.default.share.uid,
            gameId: _this.gameId,
            uuid: uuid
          };
          _this.httpGet("rank/getFriendRank", data, function(str) {
            if (_this.isError(str)) {
              callback(null);
              return;
            }
            cc.log("\u597d\u53cb\u8fd4\u56de\uff1a\uff1a\uff1a", str);
            var obj = JSON.parse(str);
            if (null != iconMap) for (var _i = 0, _a = obj.datas; _i < _a.length; _i++) {
              var v = _a[_i];
              v.icon = iconMap[v.uid];
              v.id == User_1.default.share.uid && (obj.my.icon = v.icon);
            }
            cc.log("\u597d\u53cb\u6570\u636e\u5408\u5e76\u8fd4\u56de:", obj);
            callback(obj);
          });
        });
      };
      Http.prototype.updateRank = function(score, callback) {
        var _this = this;
        var data = {
          uid: User_1.default.share.uid,
          gameId: this.gameId,
          score: score
        };
        this.httpGet("rank/updateRank", data, function(str) {
          if (_this.isError(str)) {
            callback(null);
            return;
          }
          if (!_this.isJson(str)) {
            callback(null);
            return;
          }
          var obj = JSON.parse(str);
          score > User_1.default.share.score && (User_1.default.share.score = score);
          API_1.default.share.updateRank(User_1.default.share.score);
          callback(obj.i);
        });
      };
      Http.prototype.getFinishIds = function(callback) {
        var _this = this;
        var data = {
          uid: User_1.default.share.uid,
          gameId: this.gameId
        };
        this.httpGet("chengjiu/getNumbers", data, function(str) {
          if (_this.isError(str)) {
            callback(null);
            return;
          }
          if (!_this.isJson(str)) {
            callback(null);
            return;
          }
          var obj = JSON.parse(str);
          callback(obj);
        });
      };
      Http.prototype.tixian = function(money, callback) {
        var _this = this;
        var data = {
          uid: User_1.default.share.uid,
          gameId: this.gameId
        };
        data.money = money;
        this.httpGet("game/tixian", data, function(str) {
          if (_this.isError(str)) {
            callback(false);
            return;
          }
          if (!_this.isJson(str)) {
            callback(false);
            return;
          }
          var obj = JSON.parse(str);
          User_1.default.share.money = obj.money;
          User_1.default.share.addMoney = obj.add;
          User_1.default.share.tixian = obj.tixian;
          callback(true);
        });
      };
      Http.prototype.uploadWechatRank = function(key, value, callback) {
        var _this = this;
        var data = {
          uid: User_1.default.share.uid,
          gameId: this.gameId
        };
        data.kv_list = JSON.stringify({
          key: key,
          value: value.toString()
        });
        this.httpGet("rank/set_user_storage", data, function(str) {
          if (_this.isError(str)) {
            callback(false);
            return;
          }
          if (!_this.isJson(str)) {
            callback(false);
            return;
          }
          var obj = JSON.parse(str);
          User_1.default.share.money = obj.money;
          User_1.default.share.addMoney = obj.add;
          User_1.default.share.tixian = obj.tixian;
          callback(true);
        });
      };
      Http.prototype.httpGet = function(url, data, callback) {
        var u = this.url + url;
        Util_1.default.loadHtml(u, callback, data);
      };
      Http.prototype.isError = function(res) {
        if (null == res) return true;
        if ("null" == res) return true;
        return false;
      };
      Http.prototype.isJson = function(str) {
        var tmp = str.substr(0, 1);
        if ("{" != tmp && "[" != tmp) return false;
        return true;
      };
      Http._instance = null;
      return Http;
    }();
    exports.default = Http;
    cc._RF.pop();
  }, {
    "./API": "API",
    "./BoxMsg": "BoxMsg",
    "./Lang": "Lang",
    "./User": "User",
    "./Util": "Util",
    "./pl/Facebook": "Facebook"
  } ],
  InitScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5234d214R1K66dbeOl+AaEv", "InitScene");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseScene_1 = require("./BaseScene");
    var Init_1 = require("./Init");
    var Sound_1 = require("./Sound");
    var Lang_1 = require("./Lang");
    var Util_1 = require("./Util");
    var API_1 = require("./API");
    var GameBox_1 = require("./GameBox");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var InitScene = function(_super) {
      __extends(InitScene, _super);
      function InitScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.labLoading = null;
        _this.serverUrl = "https://wechat.awwgc.com/api/";
        _this.serverFacebookUrl = "https://h5facebook.awwgc.com/api/";
        _this.gameBoxUrl = "https://9527.awwgc.com/api/";
        _this.gameBoxFacebookUrl = "https://h5facebook.awwgc.com:444/api/";
        _this.gameId = "";
        _this.gameScene = "StartScene";
        _this.dataList = "";
        _this.resPrefab = "";
        _this.version = "3.0.0";
        return _this;
      }
      InitScene.prototype.start = function() {
        var url = this.serverUrl;
        var gameBoxUrl = this.gameBoxUrl;
        if (API_1.default.share.isFacebook) {
          url = this.serverFacebookUrl;
          gameBoxUrl = this.gameBoxFacebookUrl;
        }
        GameBox_1.default.share.version = this.version;
        Init_1.default.init([ url, gameBoxUrl ], this.gameId, this.gameScene, this.dataList, this.resPrefab, this.loadRhand.bind(this));
        Sound_1.default.share.bmg();
        Util_1.default.event.on("loading", this.loadingUpdate, this);
      };
      InitScene.prototype.loadRhand = function() {
        this.labLoading.node.active = true;
        this.labLoading.string = Lang_1.default.share.find("loading_tips");
      };
      InitScene.prototype.loadingUpdate = function(e) {
        this.labLoading.string = Lang_1.default.share.find("loading_tips") + e.detail;
        cc.log("this.labLoading.string", this.labLoading.string);
      };
      InitScene.prototype.onDestroy = function() {
        Util_1.default.event.off("loading", this.loadingUpdate, this);
      };
      __decorate([ property(cc.Label) ], InitScene.prototype, "labLoading", void 0);
      __decorate([ property ], InitScene.prototype, "gameId", void 0);
      __decorate([ property ], InitScene.prototype, "gameScene", void 0);
      __decorate([ property ], InitScene.prototype, "dataList", void 0);
      __decorate([ property ], InitScene.prototype, "resPrefab", void 0);
      __decorate([ property ], InitScene.prototype, "version", void 0);
      InitScene = __decorate([ ccclass ], InitScene);
      return InitScene;
    }(BaseScene_1.default);
    exports.default = InitScene;
    cc._RF.pop();
  }, {
    "./API": "API",
    "./BaseScene": "BaseScene",
    "./GameBox": "GameBox",
    "./Init": "Init",
    "./Lang": "Lang",
    "./Sound": "Sound",
    "./Util": "Util"
  } ],
  Init: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "36457WYI+VG8LmBGQi6x5dk", "Init");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var API_1 = require("./API");
    var Http_1 = require("./Http");
    var Lang_1 = require("./Lang");
    var User_1 = require("./User");
    var Data_1 = require("./Data");
    var Util_1 = require("./Util");
    var GameBox_1 = require("./GameBox");
    var Init = function() {
      function Init() {}
      Init.init = function(url, gameId, gameSceneName, dataLang, resPrefab, langCallBack) {
        if (Init.isInit) {
          Init.startLogin();
          return;
        }
        Init.gameSceneName = gameSceneName;
        Init.isInit = true;
        var count = 0;
        var rhand = function() {
          count--;
          cc.log("init count ", count);
          if (count > 0) return;
          API_1.default.share.init();
          Init.startLogin();
        };
        Http_1.default.share.init(url[0], gameId);
        Lang_1.default.share.init(function() {
          langCallBack();
          cc.log("\u8bed\u8a00\u5305\u52a0\u8f7d\u5b8c\u6210\uff01\uff01");
          var strArr = dataLang.split(",");
          var arr = [];
          for (var _i = 0, strArr_1 = strArr; _i < strArr_1.length; _i++) {
            var str = strArr_1[_i];
            "" != str && arr.push("data/" + str);
          }
          if (arr.length > 0) {
            cc.log("\u6570\u636e\u8868");
            count++;
            Data_1.default.share.load(arr, rhand);
          }
          if ("" != resPrefab) {
            cc.log("\u52a0\u8f7d\u9884\u52a0\u8f7d\u8d44\u6e90\u5e93");
            var arr_2 = resPrefab.split(",");
            for (var _a = 0, arr_1 = arr_2; _a < arr_1.length; _a++) {
              var tmp = arr_1[_a];
              var index = tmp.lastIndexOf("#");
              if (index > 0) {
                var name = tmp.substr(0, index);
                var max = parseInt(tmp.substr(index + 1));
                for (var i = 1; i <= max; i++) {
                  count++;
                  Util_1.default.loadPrefab(name + i, rhand);
                }
              } else {
                count++;
                Util_1.default.loadPrefab(tmp, rhand);
              }
            }
          }
          count++;
          GameBox_1.default.share.init(url[1], gameId, rhand);
          cc.log("\u603b\u8981\u52a0\u8f7d\u8d44\u6e90:", count);
          0 == count && rhand();
        });
      };
      Init.startLogin = function() {
        Init.isTest ? Init.test() : Init.login();
      };
      Object.defineProperty(Init, "isTest", {
        get: function() {
          if (API_1.default.share.isFacebook || API_1.default.share.isWeChat || API_1.default.share.isQQPlay) return false;
          return true;
        },
        enumerable: true,
        configurable: true
      });
      Init.login = function() {
        API_1.default.share.login(function() {
          cc.log("login success", User_1.default.share.uid, User_1.default.share.name);
          cc.director.loadScene(Init.gameSceneName);
        }, function() {
          API_1.default.share.showLoginButton(Init.login);
        });
      };
      Init.test = function() {
        User_1.default.share.uid = "fd";
        User_1.default.share.name = "fd";
        User_1.default.share.icon = "http://d.lanrentuku.com/down/png/1712/22xiaodongwu/22xiaodongwu_18.png";
        Http_1.default.share.postUser(function() {
          Http_1.default.share.getPlayer(function() {
            cc.log("User count ", User_1.default.share.count);
            cc.director.loadScene(Init.gameSceneName);
          });
        });
      };
      Init.isInit = false;
      return Init;
    }();
    exports.default = Init;
    cc._RF.pop();
  }, {
    "./API": "API",
    "./Data": "Data",
    "./GameBox": "GameBox",
    "./Http": "Http",
    "./Lang": "Lang",
    "./User": "User",
    "./Util": "Util"
  } ],
  Item: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f8e6b6SBYdOG6XaJnV9cb97", "Item");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var StorePanel_1 = require("./StorePanel");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Item = function(_super) {
      __extends(Item, _super);
      function Item() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Item.prototype.onload = function() {};
      Item.prototype.start = function() {
        var _this = this;
        this.sprite = this.node.getComponent(cc.Sprite);
        this.onSetSpriteFrame(this._assetsName, function(spr) {
          _this.sprite.spriteFrame = spr;
          _this.node.width = 85;
          _this.node.height = 85;
        });
        this.storePanel = cc.find("Canvas/storePanel").getComponent(StorePanel_1.default);
        var Btn = this.node.getComponent(cc.Button);
        Btn.node.on("click", this.onShowItemInfor, this);
      };
      Item.prototype.onShowItemInfor = function() {
        this.storePanel.itemname.string = this._name;
        this.storePanel.itemprice.string = this._BuyGold.toString();
        this.storePanel.itembrief.string = this._brief;
        this.storePanel.Buyprice = this._BuyGold;
        this.storePanel.itemid = this._id;
      };
      Item.prototype.onSetSpriteFrame = function(assetname, rhand) {
        cc.loader.loadRes("UI/Itemes/" + assetname, cc.SpriteFrame, function(err, spriteFrame) {
          err ? cc.log("\u52a0\u8f7d\u56fe\u7247\u51fa\u9519", assetname) : null != rhand && rhand(spriteFrame);
        });
      };
      Item = __decorate([ ccclass ], Item);
      return Item;
    }(cc.Component);
    exports.default = Item;
    cc._RF.pop();
  }, {
    "./StorePanel": "StorePanel"
  } ],
  LangSprite: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a58eeOJazlHUqBHzhT/olTl", "LangSprite");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Lang_1 = require("./Lang");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LangSprite = function(_super) {
      __extends(LangSprite, _super);
      function LangSprite() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.fileName = "";
        _this.isLoading = false;
        return _this;
      }
      LangSprite.prototype.onload = function() {
        this.update(0);
      };
      LangSprite.prototype.update = function(dt) {
        var _this = this;
        if (this.isLoading || null == Lang_1.default.LangName) return;
        this.isLoading = true;
        var url = "lang_ui/" + Lang_1.default.LangName + "/" + this.fileName;
        cc.log("url", url);
        cc.loader.loadRes(url, cc.SpriteFrame, function(err, spriteFrame) {
          if (err) {
            cc.log("\u52a0\u8f7d\u8bed\u8a00\u5305UI\u6587\u4ef6\u51fa\u9519\uff1a", url, err);
            return;
          }
          _this.spriteFrame = spriteFrame;
        });
      };
      __decorate([ property ], LangSprite.prototype, "fileName", void 0);
      LangSprite = __decorate([ ccclass ], LangSprite);
      return LangSprite;
    }(cc.Sprite);
    exports.default = LangSprite;
    cc._RF.pop();
  }, {
    "./Lang": "Lang"
  } ],
  Lang: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "252e4j0EDdDLL/0/Zeni/kx", "Lang");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var API_1 = require("./API");
    var Lang = function() {
      function Lang() {
        this.data = null;
      }
      Object.defineProperty(Lang, "share", {
        get: function() {
          null == Lang._instance && (Lang._instance = new Lang());
          return Lang._instance;
        },
        enumerable: true,
        configurable: true
      });
      Lang.prototype.init = function(rhand) {
        var _this = this;
        if (null != this.data) {
          cc.log("\u8bed\u8a00\u5305\u5df2\u7ecf\u521d\u59cb\u5316");
          return;
        }
        var name = API_1.default.share.lang;
        name != Lang.CN && name != Lang.EN && (name = "en");
        Lang.LangName = name;
        var path = "lang/" + name;
        cc.loader.loadRes(path, function(err, data) {
          if (err) {
            cc.log("\u8bed\u8a00\u5305\u52a0\u8f7d\u51fa\u9519", path);
            return;
          }
          _this.trans(data);
          rhand();
        });
      };
      Lang.prototype.trans = function(data) {
        var str = null;
        str = "string" == typeof data ? data : data.text;
        this.data = {};
        var list = str.split(/[\r\n]/g);
        var str1;
        var str2;
        var arr;
        var index;
        for (var i = list.length - 1; i >= 0; i--) {
          str1 = list[i];
          index = str1.indexOf("=");
          if (index < 1) continue;
          str2 = str1.substr(index + 1).replace(/\[br\]/g, "\n");
          str1 = str1.substr(0, index);
          this.data[str1] = str2;
        }
      };
      Lang.prototype.find = function(key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) param[_i - 1] = arguments[_i];
        if (null == this.data) {
          cc.log("\u8bed\u8a00\u5305\u672a\u5b8c\u6210\u521d\u59cb\u5316");
          return;
        }
        var str = this.data[key];
        str = str ? this.format.apply(this, [ str ].concat(param)) : key;
        return str;
      };
      Lang.prototype.format = function(str) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) param[_i - 1] = arguments[_i];
        for (var index in param) {
          var repstr = "{" + (Number(index) + 1) + "}";
          do {
            str = str.replace(repstr, param[index]);
          } while (str.indexOf(repstr) >= 0);
        }
        return str;
      };
      Lang.prototype.bind = function(node) {
        if (null == node) return;
        var lab = node.getComponent(cc.Label);
        null != lab && (lab.string = this.find(lab.string));
        for (var i = 0; i < node.childrenCount; i++) this.bind(node.children[i]);
      };
      Lang.CN = "cn";
      Lang.EN = "en";
      Lang._instance = null;
      Lang.LangName = null;
      return Lang;
    }();
    exports.default = Lang;
    cc._RF.pop();
  }, {
    "./API": "API"
  } ],
  Loading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "62dbeVCCdZDNLFEqQY3gJLx", "Loading");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Box_1 = require("./Box");
    var Lang_1 = require("./Lang");
    var Loading = function(_super) {
      __extends(Loading, _super);
      function Loading() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.step = 0;
        _this.len = 0;
        _this.label = null;
        return _this;
      }
      Loading.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        var node = new cc.Node();
        var label = node.addComponent(cc.Label);
        label.fontSize = 30;
        label.string = Lang_1.default.share.find("loading_tips");
        node.parent = this.node;
        var wd = node.addComponent(cc.Widget);
        wd.verticalCenter = 0;
        wd.horizontalCenter = 0;
        this.label = label;
      };
      Loading.prototype.update = function(dt) {
        this.step++;
        if (this.step % 24 == 0) {
          this.label.string = Lang_1.default.share.find("loading_tips");
          for (var i = this.len; i > 0; i--) this.label.string += ".";
          this.len++;
          this.len >= 4 && (this.len = 0);
        }
      };
      Loading.show = function(time) {
        void 0 === time && (time = 0);
        var parent = cc.director.getScene().getChildByName("Canvas");
        if (parent.getChildByName(Loading.NAME)) {
          cc.log("Loading \u5b58\u5728!");
          return;
        }
        var node = new cc.Node();
        node.addComponent(Loading);
        node.name = Loading.NAME;
        node.parent = parent;
        time > 0 && node.runAction(cc.sequence([ cc.delayTime(time), cc.removeSelf(true) ]));
      };
      Loading.hide = function() {
        var parent = cc.director.getScene().getChildByName("Canvas");
        var node = parent.getChildByName(Loading.NAME);
        (node = null) && node.removeFromParent(true);
      };
      Loading.NAME = "game_loading";
      return Loading;
    }(Box_1.default);
    exports.default = Loading;
    cc._RF.pop();
  }, {
    "./Box": "Box",
    "./Lang": "Lang"
  } ],
  Login: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "051c8gwdltIWo9A3ORoFSDv", "Login");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PerssistRootNode_1 = require("../../Data/PerssistRootNode");
    var CreatorWebToJs_Oc_1 = require("../../base/pl/CreatorWebToJs_Oc");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Login = function(_super) {
      __extends(Login, _super);
      function Login() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Login.prototype.start = function() {
        this.onInit();
      };
      Login.prototype.onInit = function() {
        this.perssistrootnode = cc.find("PerssistRootNode").getComponent(PerssistRootNode_1.default);
        this.SetPanel = this.node.getChildByName("SetPanel");
      };
      Login.prototype.onBtnClickEvent = function(event) {
        switch (event.currentTarget.name) {
         case "LoginBtn":
          this.LoginGame();
          break;

         case "offUserBtn":
          this.offuserBtnClick();
          break;

         case "BuildUserBtn":
          this.BuildUserBtnClick();
          break;

         case "SetBtn":
          this.onSetBtnClick();
          break;

         default:
          console.log(event.currentTarget.name);
        }
      };
      Login.prototype.LoginGame = function() {
        cc.director.loadScene("MainGame");
        CreatorWebToJs_Oc_1.default.Instane.Login();
      };
      Login.prototype.offuserBtnClick = function() {
        this.perssistrootnode.onRmoveUserInfor(757071728);
      };
      Login.prototype.BuildUserBtnClick = function() {
        this.perssistrootnode.onUserLoadGame();
      };
      Login.prototype.onSetBtnClick = function() {
        this.SetPanel.active = true;
      };
      Login = __decorate([ ccclass ], Login);
      return Login;
    }(cc.Component);
    exports.default = Login;
    cc._RF.pop();
  }, {
    "../../Data/PerssistRootNode": "PerssistRootNode",
    "../../base/pl/CreatorWebToJs_Oc": "CreatorWebToJs_Oc"
  } ],
  MainGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9aa3fFmbilLxpYo4DWYOfWn", "MainGame");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PerssistRootNode_1 = require("../../Data/PerssistRootNode");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MainGame = function(_super) {
      __extends(MainGame, _super);
      function MainGame() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.Player_prefab = null;
        return _this;
      }
      MainGame.prototype.onLoad = function() {
        var node = cc.director.getScene().getChildByName("PerssistRootNode");
        this.perssistRootNode = node.getComponent(PerssistRootNode_1.default);
        this.perssistRootNode.onUserLoadGame();
        this.UserInfo = this.perssistRootNode.getUserInfor;
      };
      MainGame.prototype.start = function() {
        this.onInit();
      };
      MainGame.prototype.onInit = function() {
        this.User = this.node.getChildByName("User");
        this.UserName = this.User.getChildByName("UserName").getComponent(cc.Label);
        this.UserExp = this.User.getChildByName("UserExp").getComponent(cc.Sprite);
        this._userExp = this.UserExp.node.getChildByName("UserExp").getComponent(cc.Label);
        this.gold = cc.find("Canvas/GoldorCrystal/Gold/gold").getComponent(cc.Label);
        this.crystal = cc.find("Canvas/GoldorCrystal/Crystal/crystal").getComponent(cc.Label);
        this.storePanel = this.node.getChildByName("storePanel");
        this.packPanel = this.node.getChildByName("packPanel");
        this.PayPanel = this.node.getChildByName("PayPanel");
        this.UserInforPanel = this.node.getChildByName("UserInforPanel");
        this.onLoadUserInfor();
      };
      MainGame.prototype.onBtnClickEvent = function(event) {
        switch (event.currentTarget.name) {
         case "packBtn":
          this.onpackBtnClick();
          break;

         case "storeBtn":
          this.onstoreBtnClick();
          break;

         case "CombatBtn":
          this.oncomBtnClick();
          break;

         case "PayBtn":
          this.onpayBtnClcik();
          break;

         case "User":
          this.onUserBtnClick();
          break;

         default:
          console.log(event.currentTarget.name);
        }
      };
      MainGame.prototype.onLoadUserInfor = function() {
        this.UserName.string = this.UserInfo[1]["Name"];
        var exp = this.UserInfo[9]["Exp"];
        var maxexp = this.UserInfo[10]["MaxExp"];
        this._userExp.string = exp + "/" + maxexp;
        var fill = 1 - exp / maxexp;
        this.UserExp.fillStart = fill;
        this.onShowGold(this.UserInfo[3]["gold"]);
        this.onShowCryteal(this.UserInfo[4]["crystal"]);
      };
      MainGame.prototype.onpackBtnClick = function() {
        this.packPanel.active = true;
        var _packpanel = this.packPanel.getComponent("PackPanel");
        _packpanel.UserInfo = this.perssistRootNode.getUserInfor;
        _packpanel.onLoadUseritem();
      };
      MainGame.prototype.onstoreBtnClick = function() {
        this.storePanel.active = true;
      };
      MainGame.prototype.onpayBtnClcik = function() {
        this.PayPanel.active = true;
      };
      MainGame.prototype.onUserBtnClick = function() {
        this.UserInforPanel.active = true;
      };
      MainGame.prototype.onShowGold = function(str) {
        this.gold.string = str;
      };
      MainGame.prototype.onShowCryteal = function(str) {
        this.crystal.string = str;
      };
      MainGame.prototype.oncomBtnClick = function() {
        cc.director.loadScene("Customs");
      };
      __decorate([ property(cc.Prefab) ], MainGame.prototype, "Player_prefab", void 0);
      MainGame = __decorate([ ccclass ], MainGame);
      return MainGame;
    }(cc.Component);
    exports.default = MainGame;
    cc._RF.pop();
  }, {
    "../../Data/PerssistRootNode": "PerssistRootNode"
  } ],
  Network: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe45f5grbtHko90yRrOZtU3", "Network");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Network = function() {
      function Network() {
        this.socket = null;
        this.id = 1;
        this.msgMap = {};
        this.isDebug = false;
        this.cmdMap = [];
      }
      Object.defineProperty(Network, "instance", {
        get: function() {
          Network._instance || (Network._instance = new Network());
          return Network._instance;
        },
        enumerable: true,
        configurable: true
      });
      Network.prototype.addCommand = function(cmd) {
        this.cmdMap[cmd.typeId] = cmd;
      };
      Network.prototype.connect = function(url, openRhand) {
        this.close();
        this.openRhand = openRhand;
        this.socket = new WebSocket(url);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.msgMap = {};
        cc.log("\u8fde\u63a5", url);
      };
      Network.prototype.close = function() {
        if (null == this.socket) return;
        this.socket.onopen = null;
        this.socket.onclose = null;
        this.socket.onerror = null;
        this.socket.onmessage = null;
        if (this.socket.readyState == WebSocket.CLOSED || this.socket.readyState == WebSocket.CLOSING) return;
        this.socket.close();
      };
      Network.prototype.onOpen = function(ws, ev) {
        cc.log("\u94fe\u63a5\u670d\u52a1\u5668");
        this.openRhand && this.openRhand();
      };
      Network.prototype.onMessage = function(event) {
        this.isDebug && cc.log("\u7f51\u7edc\u63a5\u6536 :", event.data);
        var data = JSON.parse(event.data);
        if (0 != data.type) {
          var cmd = this.cmdMap[data.type];
          null != cmd && cmd.execute(data);
          return;
        }
        var id = data.id;
        var rhand = this.msgMap[id];
        if (rhand) {
          rhand(data);
          delete this.msgMap[data.id];
        }
        0 != data.error;
      };
      Network.prototype.onError = function(ws, ev) {
        cc.log("\u8fde\u63a5\u51fa\u9519\uff01");
      };
      Network.prototype.onClose = function(ws, ev) {
        cc.log("\u670d\u52a1\u5668\u5173\u95ed");
      };
      Network.prototype.send = function(rhand, bean, method) {
        var params = [];
        for (var _i = 3; _i < arguments.length; _i++) params[_i - 3] = arguments[_i];
        return this.sendQuietly.apply(this, [ rhand, true, bean, method ].concat(params));
      };
      Network.prototype.sendQuietly = function(rhand, showLoading, bean, method) {
        var params = [];
        for (var _i = 4; _i < arguments.length; _i++) params[_i - 4] = arguments[_i];
        null == params && (params = []);
        this.msgMap[this.id] = rhand;
        var param = {};
        param.id = this.id;
        param.bean = bean;
        param.method = method;
        param.params = params;
        var str = JSON.stringify(param);
        this.socket.send(str);
        this.id++;
        this.isDebug && cc.log("\u7f51\u7edc\u53d1\u9001\uff1a", str);
        return param.id;
      };
      Network._instance = null;
      return Network;
    }();
    exports.default = Network;
    cc._RF.pop();
  }, {} ],
  NumberLabel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7aaf0XTU2NH0bAN98lt6NlD", "NumberLabel");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Util_1 = require("./Util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NumberLabel = function(_super) {
      __extends(NumberLabel, _super);
      function NumberLabel() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.charMap = "";
        _this.map = {};
        _this._value = 0;
        return _this;
      }
      NumberLabel.prototype.onLoad = function() {
        var text = this.charMap;
        var len = text.length;
        for (var i = 0; i < len; i++) {
          var char = text.substr(i, 1);
          this.map[char] = String.fromCharCode(48 + i);
        }
      };
      Object.defineProperty(NumberLabel.prototype, "value", {
        get: function() {
          return this._value;
        },
        set: function(v) {
          if (this._value == v) return;
          this._value = v;
          var text = v.toString();
          this.setString(text);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NumberLabel.prototype, "bigValue", {
        set: function(v) {
          this.value = v;
          this.setString(Util_1.default.formatNumber(v));
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NumberLabel.prototype, "text", {
        set: function(v) {
          this.setString(v);
        },
        enumerable: true,
        configurable: true
      });
      NumberLabel.prototype.setString = function(text) {
        if ("" == this.charMap) {
          this.string = text;
          cc.log("\u5e76\u6ca1\u6709\u8bbe\u7f6echarMap\u6570\u636e\uff01\uff01");
          return;
        }
        var show = "";
        var len = text.length;
        for (var i = 0; i < len; i++) {
          var char = text.substr(i, 1);
          show += this.map[char] || "";
        }
        this.string = show;
      };
      __decorate([ property ], NumberLabel.prototype, "charMap", void 0);
      __decorate([ property ], NumberLabel.prototype, "value", null);
      NumberLabel = __decorate([ ccclass ], NumberLabel);
      return NumberLabel;
    }(cc.Label);
    exports.default = NumberLabel;
    cc._RF.pop();
  }, {
    "./Util": "Util"
  } ],
  PackItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d6daaaBFRJG/qeUz2haIop1", "PackItem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PackPanel_1 = require("./PackPanel");
    var PerssistRootNode_1 = require("../../Data/PerssistRootNode");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PackItem = function(_super) {
      __extends(PackItem, _super);
      function PackItem() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      PackItem.prototype.onLoad = function() {
        var node = cc.director.getScene().getChildByName("PerssistRootNode");
        this.perssistRootNdoe = node.getComponent(PerssistRootNode_1.default);
        this.num = this.node.getChildByName("num").getComponent(cc.Label);
        this.packpanel = cc.find("Canvas/packPanel").getComponent(PackPanel_1.default);
        var Btn = this.node.getComponent(cc.Button);
        Btn.node.on("click", this.onpackItemClick, this);
      };
      PackItem.prototype.start = function() {
        this.onInit();
      };
      PackItem.prototype.onInit = function() {
        var _this = this;
        this.sprite = this.node.getComponent(cc.Sprite);
        this.onSetSpriteFrame(this._assetsName, function(spr) {
          _this.sprite.spriteFrame = spr;
          _this.node.width = 85;
          _this.node.height = 85;
        });
      };
      PackItem.prototype.onpackItemClick = function() {
        if ("AB" == this.id.substr(0, 2)) {
          var iteminfor = this.perssistRootNdoe.getItemes_Config;
          for (var i = 0; i < iteminfor.length; i++) if (iteminfor[i]["ID"] == this.id) {
            this.packpanel.brief.string = this.name + "\n" + iteminfor[i]["Brief"];
            this.packpanel.useBtn.node.active = true;
            this.packpanel.SelectedItemName = iteminfor[i]["Name"];
            this.packpanel.SelectedItemPrice = iteminfor[i]["Price"];
            this.packpanel.SelectedItemId = iteminfor[i]["ID"];
            "0" != iteminfor[i]["Hp"] && (this.packpanel.SelectedItemEffect = iteminfor[i]["Hp"]);
            "0" != iteminfor[i]["Exp"] && (this.packpanel.SelectedItemEffect = iteminfor[i]["Exp"]);
          }
        }
        if ("BS" == this.id.substr(0, 2)) {
          var userLeve = this.perssistRootNdoe.getUserInfor[2]["level"];
          var rolesleveinfor = this.perssistRootNdoe.onGetRolesLeveInfor(this.id);
          for (var i = 0; i < rolesleveinfor.length; i++) if (rolesleveinfor[i]["Leve"] == userLeve) {
            this.onSetPackitemsRoleInfor(this.name, rolesleveinfor[i]["Hp"], rolesleveinfor[i]["Attack"], rolesleveinfor[i]["Defence"], rolesleveinfor[i]["Price"]);
            this.packpanel.SelectedItemName = this.name;
            this.packpanel.SelectedItemPrice = rolesleveinfor[i]["Price"];
            this.packpanel.SelectedItemId = this.id;
            this.packpanel.useBtn.node.active = false;
          }
        }
        if ("QE" == this.id.substr(0, 2)) {
          var equ = this.perssistRootNdoe.getequipment_Config;
          for (var i = 0; i < equ.length; i++) if (equ[i]["id"] == this.id) switch (this.id.substr(2, 1)) {
           case "1":
            equ[i]["weapon"] = this.id;
            break;

           case "3":
            equ[i]["shoe"] = this.id;
            break;

           case "2":
            equ[i]["helmet"] = this.id;
            break;

           case "4":
            equ[i]["cuirass"] = this.id;
            break;

           default:
            console.log("\u6b66\u5668\u68c0\u6d4b\u6709\u95ee\u9898", this.id);
          }
        }
      };
      PackItem.prototype.onSetPackitemsRoleInfor = function(name, hp, attack, defence, price) {
        this.packpanel.brief.string = "\u4eba\u7269\u540d\u79f0\uff1a" + name + "\n\u8840\u91cf\uff1a" + hp + "\n\u653b\u51fb\u529b:" + attack + "\n\u9632\u5fa1\u529b:" + defence + "\n\u4ef7\u683c\uff1a" + price;
      };
      PackItem.prototype.onSetSpriteFrame = function(assetname, rhand) {
        cc.loader.loadRes("UI/Itemes/" + assetname, cc.SpriteFrame, function(err, spriteFrame) {
          err ? cc.log("\u52a0\u8f7d\u56fe\u7247\u51fa\u9519", assetname) : null != rhand && rhand(spriteFrame);
        });
      };
      PackItem = __decorate([ ccclass ], PackItem);
      return PackItem;
    }(cc.Component);
    exports.default = PackItem;
    cc._RF.pop();
  }, {
    "../../Data/PerssistRootNode": "PerssistRootNode",
    "./PackPanel": "PackPanel"
  } ],
  PackPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "95c2dPOlfRHmb10RotjdRPE", "PackPanel");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PerssistRootNode_1 = require("../../Data/PerssistRootNode");
    var HitPanel_1 = require("../../HitPanel");
    var MainGame_1 = require("./MainGame");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PackPanel = function(_super) {
      __extends(PackPanel, _super);
      function PackPanel() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      PackPanel.prototype.onLoad = function() {
        var node = cc.director.getScene().getChildByName("PerssistRootNode");
        this.PerssistRootNode = node.getComponent(PerssistRootNode_1.default);
        this.hitpanel = this.node.parent.getChildByName("HitPanel").getComponent(HitPanel_1.default);
        this.oninit();
      };
      PackPanel.prototype.start = function() {};
      PackPanel.prototype.oninit = function() {
        this.brief = this.node.getChildByName("brief").getComponent(cc.Label);
        this.useBtn = this.node.getChildByName("useBtn").getComponent(cc.Button);
        this.maingame = this.node.parent.getComponent(MainGame_1.default);
        this.useBtn.node.active = false;
        this.brief.string = " ";
        this.onLoadUseritem();
      };
      PackPanel.prototype.onBtnClickEvent = function(event) {
        switch (event.currentTarget.name) {
         case "offBtn":
          this.onoffBtnClick();
          break;

         case "sellBtn":
          this.onSellBtnClick();
          break;

         case "useBtn":
          this.onUseBtnClick();
        }
      };
      PackPanel.prototype.onLoadUseritem = function() {
        this.userInfor = this.PerssistRootNode.getUserInfor;
        if (null == this.userInfor || void 0 == this.userInfor) {
          cc.log("userinfor:" + this.userInfor);
          return;
        }
        var packhave = this.userInfor[5]["packhave"];
        var itemList = cc.find("Canvas/packPanel/itemList/view/content");
        if (packhave.length > 12) {
          var line = packhave.length / 4 + 1;
          itemList.height = 120 * line;
        }
        var children = itemList.children;
        for (var i = 0; i < children.length; i++) children[i].destroy();
        var allitemconfig = this.PerssistRootNode.getRolesData_Config;
        var equ = this.PerssistRootNode.getequipment_Config;
        for (var j = 0; j < equ.length; j++) allitemconfig.push(equ[j]);
        for (var i = 0; i < packhave.length; i++) {
          var _packitem = cc.instantiate(this.packitem);
          itemList.addChild(_packitem);
          var packitem = _packitem.getComponent("PackItem");
          for (var j = 0; j < allitemconfig.length; j++) if (allitemconfig[j]["ID"] == packhave[i]["id"]) {
            packitem._assetsName = allitemconfig[j]["AssetsName"];
            packitem.id = allitemconfig[j]["ID"];
            packitem.name = allitemconfig[j]["Name"];
            break;
          }
          packitem.num.string = packhave[i]["number"];
        }
      };
      PackPanel.prototype.onUseBtnClick = function() {
        this.onItemUseType("Use");
      };
      PackPanel.prototype.onSellBtnClick = function() {
        this.onItemUseType("Sell");
      };
      PackPanel.prototype.onItemUseType = function(_type) {
        if (null == this.SelectedItemName || void 0 == this.SelectedItemName || "" == this.SelectedItemName) return;
        var packhave = this.userInfor[5]["packhave"];
        for (var i = 0; i < packhave.length; i++) if (packhave[i]["packitemName"] == this.SelectedItemName) {
          if ("AB" == this.SelectedItemId.toString().substr(0, 2)) {
            if ("Use" == _type) {
              if ("AB002" == this.SelectedItemId) {
                var num = Number(packhave[i]["number"]);
                num -= 1;
                packhave[i]["number"] = num.toString();
                num <= 0 && packhave.splice(i, 1);
                this.onUserAddExp(this.SelectedItemEffect);
                this.userInfor[5]["packhave"] = packhave;
                this.PerssistRootNode.onGameBuidUserInfor(this.userInfor);
                this.hitpanel.node.active = true;
                this.hitpanel.onSetHitpstr("\u606d\u559c\u4f60\u589e\u52a0\u4e86" + this.SelectedItemEffect + "\u7ecf\u9a8c");
                this.maingame.onInit();
                this.onLoadUseritem();
                this.useBtn.node.active = false;
                return;
              }
              if ("AB001" == this.SelectedItemId) {
                this.hitpanel.node.active = true;
                this.hitpanel.onSetHitpstr("\u5bf9\u4e0d\u8d77\uff0c\u56de\u8840\u529f\u80fd\u8fd8\u672a\u5f00\u901a\uff0c\u656c\u8bf7\u671f\u5f85");
                return;
              }
            }
            if ("Sell" == _type) {
              var num = Number(packhave[i]["number"]);
              num -= 1;
              packhave[i]["number"] = num.toString();
              num <= 0 && packhave.splice(i, 1);
              this.userInfor[3]["gold"] = this.SelectedItemPrice;
              this.userInfor[5]["packhave"] = packhave;
              this.PerssistRootNode.onGameBuidUserInfor(this.userInfor);
              this.hitpanel.node.active = true;
              this.hitpanel.onSetHitpstr("\u606d\u559c\u4f60\u51fa\u552e\u4e86" + this.SelectedItemName);
              this.maingame.onInit();
              this.onLoadUseritem();
              return;
            }
          }
          if ("BS" == this.SelectedItemId.toString().substr(0, 2) && "Sell" == _type) if (1 == packhave[i]["number"]) {
            this.hitpanel.node.active = true;
            this.hitpanel.onSetHitpstr("\u5bf9\u4e0d\u8d77\uff0c\u8be5\u82f1\u96c4\u5fc5\u987b\u4fdd\u7559\u4e00\u4e2a");
          } else {
            this.userInfor[3]["gold"] += this.SelectedItemPrice;
            this.PerssistRootNode.onGameBuidUserInfor(this.userInfor);
            this.hitpanel.node.active = true;
            this.hitpanel.onSetHitpstr("\u606d\u559c\u4f60\u51fa\u552e\u4e86" + this.SelectedItemName);
            this.maingame.onInit();
            this.onLoadUseritem();
          }
          if ("EQ" == this.SelectedItemId.toString().substr(0, 2)) {
            if ("Use" == _type) {
              this.hitpanel.node.active = true;
              this.hitpanel.onSetHitpstr("\u6b64\u529f\u80fd\u6682\u65f6\u4e0d\u53ef\u7528");
            }
            if ("Sell" == _type) {
              this.hitpanel.node.active = true;
              this.hitpanel.onSetHitpstr("\u6b64\u529f\u80fd\u6682\u65f6\u4e0d\u53ef\u7528");
            }
          }
        }
      };
      PackPanel.prototype.onUseEquipment = function(id) {
        var num = id.substr(2, 1);
        var packhave = this.userInfor[5]["packhave"];
        for (var i = 0; i < packhave.length; i++) if (packhave[i]["id"] == this.userInfor[11]["RoleId"]) switch (num) {
         case 1:
          packhave[i]["weapon"] = id;
          break;

         case 3:
          packhave[i]["shoe"] = id;
          break;

         case 2:
          packhave[i]["helmet"] = id;
          break;

         case 4:
          packhave[i]["cuirass"] = id;
          break;

         default:
          console.log("\u6b66\u5668\u68c0\u6d4b\u6709\u95ee\u9898", id);
        }
      };
      PackPanel.prototype.onUserAddExp = function(EXP) {
        this.userInfor[9]["Exp"] += EXP;
        if (this.userInfor[9]["Exp"] >= this.userInfor[10]["MaxExp"]) {
          this.userInfor[2]["level"] += 1;
          this.userInfor[9]["Exp"] -= this.userInfor[10]["MaxExp"];
          var userLeveConfig = this.PerssistRootNode.getUserleve;
          var userleve = this.userInfor[9]["Exp"];
          this.userInfor[10]["MaxExp"] = userLeveConfig[userleve - 1]["MaxExp"];
        }
      };
      PackPanel.prototype.onoffBtnClick = function() {
        this.brief = null;
        this.SelectedItemName = null;
        this.useBtn.node.active = false;
        this.node.active = false;
      };
      __decorate([ property(cc.Prefab) ], PackPanel.prototype, "packitem", void 0);
      PackPanel = __decorate([ ccclass ], PackPanel);
      return PackPanel;
    }(cc.Component);
    exports.default = PackPanel;
    cc._RF.pop();
  }, {
    "../../Data/PerssistRootNode": "PerssistRootNode",
    "../../HitPanel": "HitPanel",
    "./MainGame": "MainGame"
  } ],
  PayItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8c254Lq8QJJ4IEdBUOrKBFV", "PayItem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PerssistRootNode_1 = require("../../Data/PerssistRootNode");
    var MainGame_1 = require("./MainGame");
    var CreatorWebToJs_Oc_1 = require("../../base/pl/CreatorWebToJs_Oc");
    var PayPanel_1 = require("./PayPanel");
    var Commont = require("../../Data/Commont");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PayItem = function(_super) {
      __extends(PayItem, _super);
      function PayItem() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      PayItem.prototype.onLoad = function() {
        var node = cc.director.getScene().getChildByName("PerssistRootNode");
        this.perssitRootNode = node.getComponent(PerssistRootNode_1.default);
        this.userInfor = this.perssitRootNode.getUserInfor;
        this.maingame = cc.find("Canvas").getComponent(MainGame_1.default);
        this.priceLabel = this.node.getChildByName("pice").getComponent(cc.Label);
        this.crystalLabel = this.node.getChildByName("crystal").getComponent(cc.Label);
        this.paypanel = cc.find("Canvas/PayPanel").getComponent(PayPanel_1.default);
      };
      PayItem.prototype.start = function() {
        this.onInit();
      };
      PayItem.prototype.onInit = function() {
        this.payitemBtn = this.node.getComponent(cc.Button);
        this.payitemBtn.node.on("click", this.onPayItemBtnClick, this);
      };
      PayItem.prototype.onPayItemBtnClick = function() {
        if (this.paypanel.payitemBtnIson) {
          CreatorWebToJs_Oc_1.default.Instane.pay(this.SetIosPayitemInfor());
          this.onSncy();
        } else cc.log("\u6b63\u5728\u5145\u503c\u4e0a\u4e00\u7b14\uff0c\u8bf7\u7a0d\u7b49");
      };
      PayItem.prototype.onSncy = function() {
        var _this = this;
        setTimeout(function() {
          0 === Commont.data && reutrn;
          if (null != Commont.data) {
            _this.onBuySuccess(Commont.data);
            Commont.data = null;
          } else _this.onSncy();
        }, 2e3);
      };
      PayItem.prototype.onBuySuccess = function(productID) {
        this.userInfor[4]["crystal"] += 1e3;
        this.userInfor[3]["gold"] += this.gold;
        this.perssitRootNode.onGameBuidUserInfor(this.userInfor);
        this.maingame.onShowCryteal(this.userInfor[4]["crystal"]);
        this.maingame.onShowGold(this.userInfor[3]["gold"]);
        this.paypanel.payitemBtnIson = true;
      };
      PayItem.prototype.SetIosPayitemInfor = function() {
        var PayitemInfor = {
          productId: this.productId,
          money: this.Price,
          cpOrderId: this.id,
          ProductName: this.idName,
          descripiton: this.Brief,
          roleId: this.userInfor["0"]["ID"],
          roleName: this.userInfor["1"]["Name"],
          roleLeve: this.userInfor["2"]["level"],
          serverId: 0,
          serverName: 0,
          memo: 0
        };
        return JSON.stringify(PayitemInfor);
      };
      PayItem.prototype.onBuyfail = function() {
        this.hitpanel.node.active = true;
        this.hitpanel.onSetHitpstr("\u5bf9\u4e0d\u8d77\u5145\u503c\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u5145\u503c");
      };
      PayItem = __decorate([ ccclass ], PayItem);
      return PayItem;
    }(cc.Component);
    exports.default = PayItem;
    window.payResultCallBack = function(str) {
      Commont.data = str;
    };
    cc._RF.pop();
  }, {
    "../../Data/Commont": "Commont",
    "../../Data/PerssistRootNode": "PerssistRootNode",
    "../../base/pl/CreatorWebToJs_Oc": "CreatorWebToJs_Oc",
    "./MainGame": "MainGame",
    "./PayPanel": "PayPanel"
  } ],
  PayPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "372d5X4NR9FWJzsN9TWQElb", "PayPanel");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PerssistRootNode_1 = require("../../Data/PerssistRootNode");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PayPanel = function(_super) {
      __extends(PayPanel, _super);
      function PayPanel() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.payitemBtnIson = true;
        return _this;
      }
      PayPanel.prototype.onLoad = function() {
        var node = cc.director.getScene().getChildByName("PerssistRootNode");
        this.perssitRootNode = node.getComponent(PerssistRootNode_1.default);
      };
      PayPanel.prototype.start = function() {
        this.Init();
      };
      PayPanel.prototype.Init = function() {
        this.onInstantiationPayItem();
      };
      PayPanel.prototype.onBtnClickEvent = function(event) {
        switch (event.currentTarget.name) {
         case "offBtn":
          this.onoffBtnClick();
        }
      };
      PayPanel.prototype.onInstantiationPayItem = function() {
        this.pay_Config = this.perssitRootNode.getPay_Config;
        if (null == this.pay_Config || void 0 == this.pay_Config) {
          cc.log("pay_config no find" + this.pay_Config);
          return;
        }
        var ItemList = cc.find("Canvas/PayPanel/itemList/view/content");
        if (this.pay_Config.length > 6) {
          var line = this.pay_Config.length / 2 + 1;
          ItemList.height = 120 * line;
        }
        for (var i = 0; i < this.pay_Config.length; i++) {
          var _item = cc.instantiate(this.item_prefab);
          ItemList.addChild(_item);
          var _payItem = _item.getComponent("PayItem");
          _payItem.id = this.pay_Config[i]["ID"];
          _payItem.gold = this.pay_Config[i]["Gold"];
          _payItem.crystal = this.pay_Config[i]["Crystal"];
          _payItem.Price = this.pay_Config[i]["Price"];
          _payItem.priceLabel.string = "$" + _payItem.Price.toString();
          _payItem.crystalLabel.string = this.pay_Config[i]["IDName"];
          _payItem.idName = this.pay_Config[i]["IDName"];
          _payItem.productId = this.pay_Config[i]["productID"];
          _payItem.Brief = this.pay_Config[i]["Brief"];
        }
      };
      PayPanel.prototype.onoffBtnClick = function() {
        this.node.active = false;
      };
      __decorate([ property(cc.Prefab) ], PayPanel.prototype, "item_prefab", void 0);
      PayPanel = __decorate([ ccclass ], PayPanel);
      return PayPanel;
    }(cc.Component);
    exports.default = PayPanel;
    cc._RF.pop();
  }, {
    "../../Data/PerssistRootNode": "PerssistRootNode"
  } ],
  PerssistRootNode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ec241qoo/9OHaMrwsPBhsmC", "PerssistRootNode");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PerssistRootNode = function(_super) {
      __extends(PerssistRootNode, _super);
      function PerssistRootNode() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.id = 757071728;
        return _this;
      }
      Object.defineProperty(PerssistRootNode.prototype, "getRolesData_Config", {
        get: function() {
          return this._RolesData_Config;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PerssistRootNode.prototype, "getUserInfor", {
        get: function() {
          return this._UserInfor;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PerssistRootNode.prototype, "setUserInfor", {
        set: function(Infor) {
          this._UserInfor = Infor;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PerssistRootNode.prototype, "getItemes_Config", {
        get: function() {
          return this._Itemes_Config;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PerssistRootNode.prototype, "getcustoms_Config", {
        get: function() {
          return this._customs_Config;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PerssistRootNode.prototype, "getUserleve", {
        get: function() {
          return this._Userleve_Config;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PerssistRootNode.prototype, "getequipment_Config", {
        get: function() {
          return this._equipment_Config;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PerssistRootNode.prototype, "getPay_Config", {
        get: function() {
          return this._Pay_Config;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PerssistRootNode.prototype, "getAllitemConfig", {
        get: function() {
          return this.AllitemConfig;
        },
        enumerable: true,
        configurable: true
      });
      PerssistRootNode.prototype.onLoad = function() {
        var _this = this;
        cc.game.addPersistRootNode(this.node);
        this.onGetJsonInfor("RolesInfor_Config", function(config) {
          _this._RolesData_Config = config;
          _this.AllitemConfig = config;
        });
        this.onGetJsonInfor("Itemes_Config", function(config) {
          _this._Itemes_Config = config;
          for (var i = 0; i < config.length; i++) _this.AllitemConfig.push(config[i]);
        });
        this.onGetJsonInfor("equipment_Config", function(config) {
          _this._equipment_Config = config;
        });
        this.onGetJsonInfor("Pay_Config", function(config) {
          _this._Pay_Config = config;
        });
        this.onGetJsonInfor("Customs_config", function(config) {
          _this._customs_Config = config;
        });
        this.onGetJsonInfor("UserLeve_Config", function(config) {
          _this._Userleve_Config = config;
        });
        this.onGetJsonInfor("\u9093\u8302Leve", function(config) {
          _this._dengmaoLeve = config;
        });
        this.onGetJsonInfor("\u65a7\u624bLeve", function(config) {
          _this._fushouLeve = config;
        });
        this.onGetJsonInfor("\u5415\u5e03Leve", function(config) {
          _this._lvbuLeve = config;
        });
        this.onGetJsonInfor("\u517d\u9a91Leve", function(config) {
          _this._shouqiLeve = config;
        });
        this.onGetJsonInfor("\u732a\u521a\u9b23Leve", function(config) {
          _this._zhuganglieLeve = config;
        });
        this.onUserLoadGame();
      };
      PerssistRootNode.prototype.start = function() {};
      PerssistRootNode.prototype.onBuildUserInfor = function(UserId) {
        var packhave = [ {
          packitemName: "\u5415\u5e03",
          number: "1",
          id: "BS002",
          weapon: "EQ101",
          shoe: "EQ301",
          helmet: "EQ201",
          cuirass: "EQ401"
        } ];
        var userData = [ {
          ID: UserId
        }, {
          Name: "\u6731\u5df4\u7eb3\u7c73"
        }, {
          level: 1
        }, {
          gold: 500
        }, {
          crystal: 0
        }, {
          packhave: packhave
        }, {
          MusicIson: "true"
        }, {
          SoundIson: "true"
        }, {
          Customs: 0
        }, {
          Exp: 0
        }, {
          MaxExp: 2e3
        }, {
          RoleId: "BS002"
        } ];
        this._UserInfor = cc.sys.localStorage.setItem(UserId, JSON.stringify(userData));
      };
      PerssistRootNode.prototype.onUserLoadGame = function() {
        this._UserInfor = JSON.parse(cc.sys.localStorage.getItem(this.id));
        if (null != this._UserInfor || void 0 != this._UserInfor) {
          cc.log("\u5b58\u5728\u7528\u6237\u4fe1\u606f");
          return;
        }
        this.onBuildUserInfor(this.id);
      };
      PerssistRootNode.prototype.onGetUserInfor = function(UserId) {
        var userData = JSON.parse(cc.sys.localStorage.getItem(UserId));
        this._UserInfor = userData;
        return userData;
      };
      PerssistRootNode.prototype.onRmoveUserInfor = function(UserId) {
        cc.sys.localStorage.removeItem(UserId);
        var removeData = this.onGetUserInfor(UserId);
        this._UserInfor = removeData;
        null == removeData && cc.log("\u7528\u6237\u4fe1\u606f\u5220\u9664\u6210\u529f");
      };
      PerssistRootNode.prototype.onGameBuidUserInfor = function(userinfor) {
        cc.sys.localStorage.removeItem(this.id);
        this._UserInfor = userinfor;
        cc.sys.localStorage.setItem(this.id, JSON.stringify(this._UserInfor));
      };
      PerssistRootNode.prototype.onGetJsonInfor = function(name, rHand) {
        void 0 === rHand && (rHand = null);
        cc.loader.loadRes("Data/json/" + name, function(err, config) {
          if (err) {
            cc.log("\u52a0\u8f7d\u914d\u7f6e\u9519\u8bef", name + err);
            return;
          }
          var infor = config.json;
          rHand && rHand(infor);
        });
      };
      PerssistRootNode.prototype.onGetSpriteFrame = function(assatsName, rHand) {
        void 0 === rHand && (rHand = null);
        cc.loader.loadRes("UI/Itemes/" + assatsName, function(err, spriteFrame) {
          err && cc.log("\u56fe\u7247\u52a0\u8f7d\u4e0d\u5230" + err);
          var sprite = spriteFrame;
          rHand && rHand(sprite);
        });
      };
      PerssistRootNode.prototype.onGetRolesLeveInfor = function(id) {
        switch (id) {
         case "BS001":
          return this._dengmaoLeve;

         case "BS002":
          return this._lvbuLeve;

         case "BS003":
          return this._fushouLeve;

         case "BS004":
          return this._shouqiLeve;

         case "BS005":
          return this._zhuganglieLeve;

         default:
          return null;
        }
      };
      PerssistRootNode = __decorate([ ccclass ], PerssistRootNode);
      return PerssistRootNode;
    }(cc.Component);
    exports.default = PerssistRootNode;
    cc._RF.pop();
  }, {} ],
  Player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4c878Xkb9VK2aliqngFJ3K9", "Player");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enemy_1 = require("../Enemy/Enemy");
    var GameSite_1 = require("../GameSite/GameSite");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Player = function(_super) {
      __extends(Player, _super);
      function Player() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.player_hp = 100;
        _this.player_atn = 10;
        _this.player_def = 0;
        _this.player_Speed = 2;
        _this.player_isMoveing = false;
        _this.turnBasedExit = false;
        _this.enemyisonDie = false;
        return _this;
      }
      Player.prototype.onLoad = function() {};
      Player.prototype.start = function() {
        this.oninInt();
      };
      Player.prototype.oninInt = function() {
        this._Player_animation = this.getComponent(cc.Animation);
        this._Player_animation.play("idle");
        var manager = cc.director.getCollisionManager();
        manager.enabledDebugDraw = false;
        cc.director.getCollisionManager().enabled = true;
        this._Player_animation.on("finished", this.AttackExit, this);
        this.GameSite = this.node.parent.getComponent(GameSite_1.default);
        this.blood = this.node.getChildByName("bloodcase").getChildByName("blood").getComponent(cc.Sprite);
      };
      Player.prototype.update = function() {};
      Player.prototype.onPlayerAttack = function(enemey) {
        this.onPlayerMove(enemey.position);
      };
      Player.prototype.onPlayerMove = function(enemypos) {
        var pos = new cc.Vec2(enemypos.x - 70, enemypos.y - 40);
        var speed = .2;
        var action = cc.moveTo(speed, pos);
        this.node.runAction(action);
        this._Player_animation.play("run");
        this.turnBasedExit = true;
      };
      Player.prototype.AttackExit = function() {
        this.Enemy.onHitblood(this.player_atn);
        this.node.scaleX = -this.node.scaleX;
        this.onPlayerMove(new cc.Vec2(this.GameSite.playeInstanNode.position.x + 70, this.GameSite.playeInstanNode.position.y + 40));
        this.turnBasedExit = true;
      };
      Player.prototype.onplayerHit = function(_Enemyharm) {
        var packhave = this.GameSite.userInfor[5]["packhave"];
        for (var i = 0; i < packhave.length; i++) packhave[i]["id"] == this.player_id;
        if (this.hp > _Enemyharm - this.player_def) {
          this.hp -= _Enemyharm - this.player_def;
          this.node.color = new cc.Color(255, 0, 0, 255);
          this.schedule(this.onHitcolor, 1);
        } else {
          this.node.color = new cc.Color(255, 0, 0, 255);
          this.onPlayerdie();
        }
      };
      Player.prototype.onHitblood = function(minusBlood) {
        minusBlood -= this.player_def;
        var a = minusBlood / this.player_hp;
        this.blood.fillStart += a;
      };
      Player.prototype.onHitcolor = function() {
        this.node.color = new cc.Color(255, 255, 255, 255);
      };
      Player.prototype.onPlayerdie = function() {
        this.GameSite.onForBiddenGameSiteUI();
        this.node.parent.removeChild(this.node);
        this.GameSite.onIsonPlayerNull(this.player_name);
        this.schedule(this.node.destroy, 5);
      };
      Player.prototype.onCollisionEnter = function(other, self) {
        var _this = this;
        if ("enemy" == other.node.group && true == this.turnBasedExit) {
          this._Player_animation.play("attack");
          this.Enemy = other.node.getComponent(Enemy_1.default);
          this.Enemy.onEnemyhit(this.player_atn);
        }
        if ("PlayerInstanNode" == other.node.group && true == this.turnBasedExit) {
          this.node.scaleX = -this.node.scaleX;
          this._Player_animation.play("idle");
          this.turnBasedExit = false;
          false == this.enemyisonDie && setTimeout(function() {
            _this.GameSite.onEneyerAttack();
          }, 100);
        }
      };
      Player = __decorate([ ccclass ], Player);
      return Player;
    }(cc.Component);
    exports.default = Player;
    cc._RF.pop();
  }, {
    "../Enemy/Enemy": "Enemy",
    "../GameSite/GameSite": "GameSite"
  } ],
  QQPlay: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "966b8/lZrZJdLN71X7I+Xii", "QQPlay");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var User_1 = require("../User");
    var Http_1 = require("../Http");
    var Util_1 = require("../Util");
    var QQPlay = function() {
      function QQPlay() {}
      Object.defineProperty(QQPlay, "share", {
        get: function() {
          null == QQPlay._instance && (QQPlay._instance = new QQPlay());
          return QQPlay._instance;
        },
        enumerable: true,
        configurable: true
      });
      QQPlay.prototype.login = function(rhand) {
        Util_1.default.event.emit("loading", 21);
        var openId = GameStatusInfo.openId;
        cc.log("\u73a9\u5bb6openId", openId);
        User_1.default.share.uid = openId;
        Util_1.default.event.emit("loading", 22);
        this.getNameIcon(openId, function(name, icon) {
          Util_1.default.event.emit("loading", 23);
          User_1.default.share.name = name;
          User_1.default.share.icon = icon;
          cc.log("QQPlay \u767b\u5f55\u5b8c\u6210", User_1.default.share.uid, User_1.default.share.name);
          Http_1.default.share.postUser(function() {
            Util_1.default.event.emit("loading", 24);
            Http_1.default.share.getPlayer(rhand);
          });
        });
      };
      QQPlay.prototype.getNameIcon = function(openId, rhand) {
        BK.MQQ.Account.getNick(openId, function(oid, name) {
          BK.MQQ.Account.getHead(openId, function(oid, icon) {
            rhand(name, icon);
          });
        });
      };
      QQPlay.prototype.share = function(text, imageUrl, query, rhand) {
        var shareInfo = {
          summary: text,
          picUrl: imageUrl,
          extendInfo: query,
          localPicPath: imageUrl,
          gameName: "\u5c0f\u9738\u738b"
        };
        BK.QQ.share(shareInfo, function(retCode, shareDest, isFirstShare) {
          cc.log(1, 1, "retCode:" + retCode + " shareDest:" + shareDest + " isFirstShare:" + isFirstShare);
          if (0 == retCode) {
            0 == shareDest || 1 == shareDest || 2 == shareDest || 3 == shareDest;
            rhand(true);
          } else if (1 == retCode) {
            cc.log(1, 1, "\u5206\u4eab\u5931\u8d25" + retCode);
            rhand(false);
          } else if (2 == retCode) {
            cc.log(1, 1, "\u5206\u4eab\u5931\u8d25\uff0c\u7528\u6237\u53d6\u6d88\u5206\u4eab\uff1a" + retCode);
            rhand(false);
          }
        });
      };
      QQPlay.prototype.updateRank = function(score) {
        var time = new Date().getTime().toString();
        var data = {
          userData: [ {
            openId: GameStatusInfo.openId,
            startMs: time,
            endMs: time,
            scoreInfo: {
              score: 100
            }
          } ],
          attr: {
            score: {
              type: "rank",
              order: 1
            }
          }
        };
        var gameMode = 1;
        BK.QQ.uploadScoreWithoutRoom(gameMode, data, function(errCode, cmd, data) {
          0 !== errCode && cc.log(1, 1, "\u4e0a\u4f20\u5206\u6570\u5931\u8d25!\u9519\u8bef\u7801\uff1a" + errCode);
        });
      };
      QQPlay.prototype.getFriends = function(rhand) {
        var attr = "score";
        var order = 1;
        var rankType = 0;
        BK.QQ.getRankListWithoutRoom(attr, order, rankType, function(errCode, cmd, data) {
          cc.log(1, 1, "getRankListWithoutRoom callback  cmd" + cmd + " errCode:" + errCode + "  data:" + JSON.stringify(data));
          if (0 !== errCode) {
            cc.log(1, 1, "\u83b7\u53d6\u6392\u884c\u699c\u6570\u636e\u5931\u8d25!\u9519\u8bef\u7801\uff1a" + errCode);
            return;
          }
          if (data) {
            var self = null;
            var result = [];
            var len = data.data.ranking_list.length;
            for (var i = 0; i < len; ++i) {
              var rd = data.data.ranking_list[i];
              var item = {
                i: i + 1,
                name: rd.nick,
                icon: rd.url,
                score: rd.score
              };
              result.push(item);
              if (rd.selfFlag) {
                self = item;
                item.uid = User_1.default.share.uid;
              } else item.uid = "rank" + i;
            }
            rhand(null, {
              datas: result,
              my: self
            });
          } else rhand([], null);
        });
      };
      QQPlay.prototype.jumoTo = function(appId) {
        var extendInfo = "";
        BK.QQ.skipGame(appId, extendInfo);
      };
      QQPlay._instance = null;
      return QQPlay;
    }();
    exports.default = QQPlay;
    cc._RF.pop();
  }, {
    "../Http": "Http",
    "../User": "User",
    "../Util": "Util"
  } ],
  RankUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2482046teRGgYzkZoxByMrz", "RankUtil");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Http_1 = require("./Http");
    var User_1 = require("./User");
    var RankUtil = function() {
      function RankUtil() {
        this.time = 0;
        this.data = null;
        this.selfData = null;
        this.pageIndex = 0;
        this.isLoading = false;
        this.friendTime = 0;
        this.friendData = null;
        this.friendSelf = null;
        this.friendMaxPage = 0;
      }
      Object.defineProperty(RankUtil, "share", {
        get: function() {
          null == RankUtil._instance && (RankUtil._instance = new RankUtil());
          return RankUtil._instance;
        },
        enumerable: true,
        configurable: true
      });
      RankUtil.prototype.show = function(size, rhand) {
        cc.log("rank tuil show");
        this.pageIndex = 0;
        this.next(size, rhand);
      };
      RankUtil.prototype.next = function(size, rhand) {
        cc.log("rank tuil next");
        if (this.isLoading) {
          cc.log("RankUtil \u52a0\u8f7d\u4e2d...");
          return;
        }
        this.pageIndex++;
        this.loadData(size, rhand);
      };
      RankUtil.prototype.before = function(size, rhand) {
        if (this.isLoading) {
          cc.log("RankUtil \u52a0\u8f7d\u4e2d...");
          return;
        }
        if (this.pageIndex <= 1) {
          this.pageIndex = 1;
          null != this.data ? rhand(this.data.slice(0, size), this.selfData) : rhand([], null);
          return;
        }
        this.pageIndex--;
        this.loadData(size, rhand);
      };
      RankUtil.prototype.loadData = function(size, rhand) {
        var _this = this;
        var len = this.pageIndex * size;
        if (null != this.data && this.data.length > len && new Date().getTime() - this.time <= RankUtil.CACHE_TIME) {
          rhand(this.data.slice((this.pageIndex - 1) * size, this.pageIndex * size), this.selfData);
          return;
        }
        this.isLoading = true;
        Http_1.default.share.getWorldRank(len, function(res) {
          _this.isLoading = false;
          if (null == res) {
            cc.log("RankUtil \u52a0\u8f7d\u6570\u636e\u5931\u8d25");
            return;
          }
          _this.data = res.datas;
          _this.selfData = res.my;
          _this.time = new Date().getTime();
          _this.data.length < len && (_this.pageIndex = Math.ceil(_this.data.length / size));
          rhand(_this.data.slice((_this.pageIndex - 1) * size, _this.pageIndex * size), _this.selfData);
        });
      };
      RankUtil.prototype.showFriend = function(size, rhand) {
        var _this = this;
        cc.log("RankUtil.showFriend");
        this.pageIndex = 1;
        this.isLoading = true;
        Http_1.default.share.getFriendRank(function(res) {
          _this.isLoading = false;
          if (null == res) {
            cc.log("RankUtil \u52a0\u8f7d\u597d\u53cb\u6570\u636e\u5931\u8d25");
            return;
          }
          _this.friendData = res.datas;
          _this.friendSelf = res.my;
          _this.friendMaxPage = Math.ceil(_this.friendData.length / size);
          rhand(_this.friendData.slice((_this.pageIndex - 1) * size, _this.pageIndex * size), _this.friendSelf);
        });
      };
      RankUtil.prototype.nextFriend = function(size, rhand) {
        if (this.isLoading) {
          cc.log("RankUtil \u52a0\u8f7d\u4e2d...");
          return;
        }
        if (this.pageIndex >= this.friendMaxPage) {
          cc.log("\u5df2\u7ecf\u662f\u6700\u540e\u4e00\u9875\uff01\uff01\uff01");
          return;
        }
        this.pageIndex++;
        rhand(this.friendData.slice((this.pageIndex - 1) * size, this.pageIndex * size), this.friendSelf);
      };
      RankUtil.prototype.beforeFriend = function(size, rhand) {
        if (this.isLoading) {
          cc.log("RankUtil \u52a0\u8f7d\u4e2d...");
          return;
        }
        if (this.pageIndex <= 1) {
          cc.log("\u5df2\u7ecf\u662f\u7b2c\u4e00\u9875\uff01\uff01\uff01");
          return;
        }
        this.pageIndex--;
        rhand(this.friendData.slice((this.pageIndex - 1) * size, this.pageIndex * size), this.friendSelf);
      };
      RankUtil.prototype.targetFriend = function(score, rhand) {
        var _this = this;
        if (null != this.friendData) {
          var target = null;
          var list = this.friendData;
          for (var i = list.length - 1; i >= 0; i--) {
            var item = list[i];
            if (item.uid != User_1.default.share.uid && item.score > score) {
              target = item;
              break;
            }
          }
          rhand(target);
          return;
        }
        Http_1.default.share.getFriendRank(function(res) {
          if (null == res) {
            cc.log("RankUtil \u52a0\u8f7d\u597d\u53cb\u6570\u636e\u5931\u8d25");
            return;
          }
          _this.friendData = res.datas;
          _this.targetFriend(score, rhand);
        });
      };
      RankUtil.CACHE_TIME = 3e4;
      RankUtil._instance = null;
      return RankUtil;
    }();
    exports.default = RankUtil;
    cc._RF.pop();
  }, {
    "./Http": "Http",
    "./User": "User"
  } ],
  ScrollViewBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2376cWbw0RHW7v7K4Ed5Fz3", "ScrollViewBase");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseScene_1 = require("./BaseScene");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ScrollViewBase = function(_super) {
      __extends(ScrollViewBase, _super);
      function ScrollViewBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.cellLst = new Array();
        _this.touchBeginX = 0;
        _this.touchBeginY = 0;
        return _this;
      }
      ScrollViewBase.prototype.start = function() {
        _super.prototype.start.call(this);
        if (!this.scrollView) {
          console.log("\u627e\u4e0d\u5230\u754c\u9762scrollView");
          return;
        }
        this.scrollView.node.on(cc.Node.EventType.TOUCH_START, this.touchEventHandler, this);
        this.scrollView.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchEventHandler, this);
        this.scrollView.node.on(cc.Node.EventType.TOUCH_END, this.touchEventHandler, this);
        this.scrollView.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEventHandler, this);
      };
      ScrollViewBase.prototype.setContentHeight = function(height) {
        if (!this.scrollView) {
          console.log("\u627e\u4e0d\u5230\u754c\u9762scrollView");
          return;
        }
        this.scrollView.content.height = Math.max(height, this.scrollView.node.height);
      };
      ScrollViewBase.prototype.touchEventHandler = function(event) {
        if (event.type == cc.Node.EventType.TOUCH_START) {
          this.touchBeginX = event.getLocationX();
          this.touchBeginY = event.getLocationY();
        } else if (event.type == cc.Node.EventType.TOUCH_END || event.type == cc.Node.EventType.TOUCH_CANCEL) {
          if (Math.abs(event.getLocationX() - this.touchBeginX) > 50 || Math.abs(event.getLocationY() - this.touchBeginY) > 50) return;
          for (var _i = 0, _a = this.cellLst; _i < _a.length; _i++) {
            var cell = _a[_i];
            var wp = new cc.Vec2(event.getLocationX(), event.getLocationY());
            var np = cell.convertToNodeSpaceAR(wp);
            var rect = cell.getBoundingBoxToWorld();
            if (rect.contains(wp)) {
              this.onClickCell(cell);
              return;
            }
          }
        }
      };
      ScrollViewBase.prototype.onViewDestroy = function() {
        this.scrollView.node.off(cc.Node.EventType.TOUCH_START, this.touchEventHandler, this);
        this.scrollView.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchEventHandler, this);
        this.scrollView.node.off(cc.Node.EventType.TOUCH_END, this.touchEventHandler, this);
        this.scrollView.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchEventHandler, this);
      };
      ScrollViewBase.prototype.onClickCell = function(cell) {};
      __decorate([ property(cc.ScrollView) ], ScrollViewBase.prototype, "scrollView", void 0);
      ScrollViewBase = __decorate([ ccclass ], ScrollViewBase);
      return ScrollViewBase;
    }(BaseScene_1.default);
    exports.default = ScrollViewBase;
    cc._RF.pop();
  }, {
    "./BaseScene": "BaseScene"
  } ],
  SetPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "96da8k7wpxBtpuECTh36Vhm", "SetPanel");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PerssistRootNode_1 = require("../Data/PerssistRootNode");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NewClass.prototype.onLoad = function() {
        this.persssistRootNode = cc.find("PerssistRootNode").getComponent(PerssistRootNode_1.default);
        this.userinfor = this.persssistRootNode.getUserInfor;
      };
      NewClass.prototype.start = function() {
        this.onInit();
      };
      NewClass.prototype.onInit = function() {
        this.BgMusicBtn = this.node.getChildByName("BgMusicBtn").getComponent(cc.Button);
        this.SoundBtn = this.node.getChildByName("SoundBtn").getComponent(cc.Button);
        this.ConfirmBtn = this.node.getChildByName("ConfirmBtn").getComponent(cc.Button);
        this.BgMusicIson = this.BgMusicBtn.node.getChildByName("ison").getComponent(cc.Label);
        this.SoundIson = this.SoundBtn.node.getChildByName("ison").getComponent(cc.Label);
        this.BgMusicBtn.node.on("click", this.onBgMusicBtnClick, this);
        this.SoundBtn.node.on("click", this.onSoundBtnClick, this);
        this.ConfirmBtn.node.on("click", this.onConfirmBtnClick, this);
        "true" == this.userinfor[6]["MusicIson"] ? this.BgMusicIson.string = "\u5f00" : this.BgMusicIson.string = "\u5173";
        "true" == this.userinfor[7]["SoundIson"] ? this.SoundIson.string = "\u5f00" : this.SoundIson.string = "\u5173";
      };
      NewClass.prototype.onBgMusicBtnClick = function() {
        if ("\u5f00" == this.BgMusicIson.string) {
          this.BgMusicIson.string = "\u5173";
          this.userinfor[6]["MusicIson"] = "false";
          this.persssistRootNode.onGameBuidUserInfor(this.userinfor);
        } else {
          this.BgMusicIson.string = "\u5f00";
          this.userinfor[6]["MusicIson"] = "true";
          this.persssistRootNode.onGameBuidUserInfor(this.userinfor);
        }
      };
      NewClass.prototype.onSoundBtnClick = function() {
        if ("\u5f00" == this.SoundIson.string) {
          this.SoundIson.string = "\u5173";
          this.userinfor[7]["SoundIson"] = "false";
          this.persssistRootNode.onGameBuidUserInfor(this.userinfor);
        } else {
          this.SoundIson.string = "\u5f00";
          this.userinfor[7]["SoundIson"] = "true";
          this.persssistRootNode.onGameBuidUserInfor(this.userinfor);
        }
      };
      NewClass.prototype.onConfirmBtnClick = function() {
        this.node.active = false;
      };
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "../Data/PerssistRootNode": "PerssistRootNode"
  } ],
  Sound: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d5b56kLCwJHqIyASbrXgPFJ", "Sound");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Util_1 = require("./Util");
    var Sound = function() {
      function Sound() {
        this._enableMusic = true;
        this._enableSound = true;
        this.musicName = null;
        this.musicId = -1;
        var v = Util_1.default.loadItem(Sound.MUSIC_KEY);
        if (null == v || "" == v) return;
        this.enableMusic = v.music;
        this.enableSound = v.sound;
      }
      Object.defineProperty(Sound, "share", {
        get: function() {
          null == Sound._instance && (Sound._instance = new Sound());
          return Sound._instance;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Sound.prototype, "enableMusic", {
        get: function() {
          return this._enableMusic;
        },
        set: function(v) {
          this._enableMusic = v;
          this.saveData();
          v ? null != this.musicName && this.music(this.musicName) : -1 != this.musicId && cc.audioEngine.stop(this.musicId);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Sound.prototype, "enableSound", {
        get: function() {
          return this._enableSound;
        },
        set: function(v) {
          this._enableSound = v;
          this.saveData();
        },
        enumerable: true,
        configurable: true
      });
      Sound.prototype.saveData = function() {
        Util_1.default.saveItem(Sound.MUSIC_KEY, {
          music: this.enableMusic,
          sound: this.enableSound
        });
      };
      Sound.prototype.music = function(v) {
        if (!this.enableMusic) {
          cc.log("\u97f3\u4e50\u5173\u95ed\u3002\u3002\u4e0d\u64ad\u653e\u97f3\u4e50");
          return;
        }
        -1 != this.musicId && cc.audioEngine.stop(this.musicId);
        this.musicName = v;
        this.musicId = cc.audioEngine.play(this.getPath(v), true, 1);
      };
      Sound.prototype.sound = function(v) {
        if (!this.enableSound) {
          cc.log("\u58f0\u6548\u5173\u95ed\u3002\u3002\u4e0d\u64ad\u653e\u58f0\u6548");
          return;
        }
        return cc.audioEngine.play(this.getPath(v), false, 1);
      };
      Sound.prototype.stopSound = function(audioId) {
        cc.audioEngine.stop(audioId);
      };
      Sound.prototype.click = function() {
        this.sound("click");
      };
      Sound.prototype.bmg = function() {
        this.music("bgm");
      };
      Sound.prototype.getPath = function(v) {
        return cc.url.raw("resources/sound/" + v + ".mp3");
      };
      Sound._instance = null;
      Sound.MUSIC_KEY = "MUSIC_KEY";
      return Sound;
    }();
    exports.default = Sound;
    cc._RF.pop();
  }, {
    "./Util": "Util"
  } ],
  StorePanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7746bLwpEpGopp4egqlqX2Y", "StorePanel");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PerssistRootNode_1 = require("../../Data/PerssistRootNode");
    var HitPanel_1 = require("../../HitPanel");
    var MainGame_1 = require("./MainGame");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StorePanel = function(_super) {
      __extends(StorePanel, _super);
      function StorePanel() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      StorePanel.prototype.onLoad = function() {
        var node = cc.director.getScene().getChildByName("PerssistRootNode");
        this.perssitRootNode = node.getComponent(PerssistRootNode_1.default);
        this.hitpanel = this.node.parent.getChildByName("HitPanel").getComponent(HitPanel_1.default);
      };
      StorePanel.prototype.start = function() {
        this.Init();
      };
      StorePanel.prototype.Init = function() {
        this.itemname = this.node.getChildByName("itemname").getComponent(cc.Label);
        this.itemprice = this.node.getChildByName("itemprice").getComponent(cc.Label);
        this.itembrief = this.node.getChildByName("itembrief").getComponent(cc.Label);
        this.maingame = this.node.parent.getComponent(MainGame_1.default);
        this.onGetItemConfig();
      };
      StorePanel.prototype.onBtnClickEvent = function(event) {
        switch (event.currentTarget.name) {
         case "offBtn":
          this.onoffBtnClick();
          break;

         case "buyBtn":
          this.onbuyBtnClick();
        }
      };
      StorePanel.prototype.onGetItemConfig = function() {
        this._itemList = this.perssitRootNode.getAllitemConfig;
        if (null == this._itemList || void 0 == this._itemList) {
          cc.log("_itemList:" + this._itemList);
          return;
        }
        var euqipment_config = this.perssitRootNode.getequipment_Config;
        for (var i = 0; i < euqipment_config.length; i++) this._itemList.push(euqipment_config[i]);
        var itemList = cc.find("Canvas/storePanel/itemList/view/content");
        if (this._itemList.length > 8) {
          var line = this._itemList.length / 4 + 1;
          itemList.height = 110 * line;
        }
        for (var i = 0; i < this._itemList.length; i++) {
          var _item = cc.instantiate(this.item_prefab);
          itemList.addChild(_item);
          var Item_1 = _item.getComponent("Item");
          Item_1._id = this._itemList[i]["ID"];
          Item_1._name = this._itemList[i]["Name"];
          Item_1._assetsName = this._itemList[i]["AssetsName"];
          Item_1._BuyGold = this._itemList[i]["BuyGold"];
          Item_1._brief = this._itemList[i]["Brief"];
        }
      };
      StorePanel.prototype.onoffBtnClick = function() {
        this.itemname.string = "";
        this.itemprice.string = "";
        this.itembrief.string = "";
        this.node.active = false;
      };
      StorePanel.prototype.onbuyBtnClick = function() {
        this.onbuyitem(this.itemname.string);
      };
      StorePanel.prototype.onbuyitem = function(name) {
        if (null == this.itemprice.string) return;
        var newPrice = Number(this.itemprice.string);
        var userinfro = this.perssitRootNode.getUserInfor;
        if (void 0 == userinfro || null == userinfro) return;
        var _gold = userinfro[3]["gold"];
        if (_gold - newPrice < 0) {
          this.hitpanel.node.active = true;
          this.hitpanel.onSetHitpstr("\u5bf9\u4e0d\u8d77\uff0c\u91d1\u5e01\u4e0d\u8db3\u4ee5\u8d2d\u4e70\u5f53\u524d\u7269\u54c1");
          return;
        }
        _gold -= newPrice;
        userinfro[3]["gold"] -= newPrice;
        var packhave = userinfro[5]["packhave"];
        for (var i = 0; i < packhave.length; i++) if (packhave[i]["packitemName"] == name) {
          var a = Number(packhave[i]["number"]);
          a += 1;
          packhave[i]["number"] = a.toString();
          this.hitpanel.node.active = true;
          this.hitpanel.onSetHitpstr("\u606d\u559c\u8d2d\u4e70" + name + "\u6210\u529f");
          this.perssitRootNode.onGameBuidUserInfor(userinfro);
          this.maingame.onInit();
          return;
        }
        this.onSaveNewItem(packhave);
        this.hitpanel.node.active = true;
        this.hitpanel.onSetHitpstr("\u606d\u559c\u8d2d\u4e70" + name + "\u6210\u529f");
        this.perssitRootNode.onGameBuidUserInfor(userinfro);
        this.maingame.onInit();
      };
      StorePanel.prototype.onSaveNewItem = function(packhave) {
        cc.log(this.itemid);
        switch (this.itemid.substr(0, 2)) {
         case "AB":
          var newpackitem = {
            packitemName: name,
            number: "1",
            id: this.itemid
          };
          packhave.push(newpackitem);
          break;

         case "BS":
          var newpackitem1 = {
            packitemName: name,
            number: "1",
            id: this.itemid,
            weapon: "",
            shoe: "",
            helmet: "",
            cuirass: ""
          };
          packhave.push(newpackitem1);
          break;

         case "EQ":
          var newpackitem2 = {
            packitemName: name,
            number: "1",
            id: this.itemid,
            weapon: "",
            shoe: "",
            helmet: "",
            cuirass: ""
          };
          packhave.push(newpackitem2);
          break;

         default:
          console.log(this.itemid.substr(0, 2));
        }
      };
      __decorate([ property(cc.Prefab) ], StorePanel.prototype, "item_prefab", void 0);
      StorePanel = __decorate([ ccclass ], StorePanel);
      return StorePanel;
    }(cc.Component);
    exports.default = StorePanel;
    cc._RF.pop();
  }, {
    "../../Data/PerssistRootNode": "PerssistRootNode",
    "../../HitPanel": "HitPanel",
    "./MainGame": "MainGame"
  } ],
  TargetFriend: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b4b09a+AdFBarplIIQNk4/g", "TargetFriend");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NumberLabel_1 = require("./NumberLabel");
    var User_1 = require("./User");
    var API_1 = require("./API");
    var RankUtil_1 = require("./RankUtil");
    var Util_1 = require("./Util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TargetFriend = function(_super) {
      __extends(TargetFriend, _super);
      function TargetFriend() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.labName = null;
        _this.labScorl = null;
        _this.nodeHead = null;
        _this.step = 0;
        _this.lastFriend = null;
        return _this;
      }
      TargetFriend.prototype.start = function() {
        if (API_1.default.share.isWeChat) {
          this.node.active = false;
          return;
        }
        this.labName.string = "";
        this.nodeHead.removeAllChildren(true);
        this.node.opacity = 0;
        null != this.labScorl && (this.labScorl.value = 0);
      };
      TargetFriend.prototype.getScore = function() {
        return User_1.default.share.score;
      };
      TargetFriend.prototype.update = function(dt) {
        var _this = this;
        this.step--;
        if (this.step > 0) return;
        this.step = 60;
        RankUtil_1.default.share.targetFriend(this.getScore(), function(friend) {
          if (null == friend) {
            _this.node.opacity = 0;
            return;
          }
          _this.node.opacity = 255;
          if (null == _this.lastFriend || _this.lastFriend.uid != friend.uid) {
            _this.labName.string = friend.name;
            Util_1.default.loadHead(_this.nodeHead, friend.icon);
            _this.lastFriend = friend;
          }
          null != _this.labScorl && (_this.labScorl.value = friend.score);
        });
      };
      __decorate([ property(cc.Label) ], TargetFriend.prototype, "labName", void 0);
      __decorate([ property(NumberLabel_1.default) ], TargetFriend.prototype, "labScorl", void 0);
      __decorate([ property(cc.Node) ], TargetFriend.prototype, "nodeHead", void 0);
      TargetFriend = __decorate([ ccclass ], TargetFriend);
      return TargetFriend;
    }(cc.Component);
    exports.default = TargetFriend;
    cc._RF.pop();
  }, {
    "./API": "API",
    "./NumberLabel": "NumberLabel",
    "./RankUtil": "RankUtil",
    "./User": "User",
    "./Util": "Util"
  } ],
  Tips: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "17525gTaUpLs5FUOMdzt6HG", "Tips");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Util_1 = require("./Util");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Tips = function(_super) {
      __extends(Tips, _super);
      function Tips() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.richMsg = null;
        return _this;
      }
      Tips_1 = Tips;
      Tips.prototype.start = function() {
        var size = cc.director.getVisibleSize();
        this.node.setContentSize(size);
        this.node.runAction(cc.sequence(cc.delayTime(1.5), cc.fadeOut(.3), cc.removeSelf()));
      };
      Object.defineProperty(Tips.prototype, "text", {
        get: function() {
          return this.richMsg.string;
        },
        set: function(v) {
          this.richMsg.string = v;
        },
        enumerable: true,
        configurable: true
      });
      Tips.show = function(v) {
        Util_1.default.showBoxAsync("Tips", function(node) {
          var msg = node.getComponent(Tips_1);
          if (null == msg) {
            cc.log("\u52a0\u8f7dTips\u4e3a\u7a7a\u5bf9\u8c61");
            return;
          }
          msg.text = v;
        });
      };
      var Tips_1;
      __decorate([ property(cc.RichText) ], Tips.prototype, "richMsg", void 0);
      Tips = Tips_1 = __decorate([ ccclass ], Tips);
      return Tips;
    }(cc.Component);
    exports.default = Tips;
    cc._RF.pop();
  }, {
    "./Util": "Util"
  } ],
  Tools: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "27a513aVjlAu5rjxBVJJL7N", "Tools");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Tools = function() {
      function Tools() {}
      Tools.LoadJson = function(jsonname) {
        var jsonData = {};
        cc.loader.loadRes("//", function(err, res) {
          cc.log(res);
          var i = JSON.parse(res);
          cc.log(i.entry[0].id);
        });
      };
      return Tools;
    }();
    exports.default = Tools;
    cc._RF.pop();
  }, {} ],
  UserInforPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a61e6azs3ZMQLMtBm3qTaUO", "UserInforPanel");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PerssistRootNode_1 = require("../../Data/PerssistRootNode");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var UserInforPanel = function(_super) {
      __extends(UserInforPanel, _super);
      function UserInforPanel() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      UserInforPanel.prototype.onLoad = function() {
        var node = cc.director.getScene().getChildByName("PerssistRootNode");
        this.perssisteRottnode = node.getComponent(PerssistRootNode_1.default);
        this.equipment_Config = this.perssisteRottnode.getequipment_Config;
      };
      UserInforPanel.prototype.start = function() {
        var we = this.node.getChildByName("weapon");
        this.weapon = we.getChildByName("we").getComponent(cc.Sprite);
        var sh = this.node.getChildByName("shoe");
        this.shoe = sh.getChildByName("sh").getComponent(cc.Sprite);
        var he = this.node.getChildByName("helmet");
        this.helmet = he.getChildByName("he").getComponent(cc.Sprite);
        var cu = this.node.getChildByName("cuirass");
        this.cuirass = cu.getChildByName("cu").getComponent(cc.Sprite);
        var id = this.node.getChildByName("id");
        this.idLabel = id.getChildByName("idLabel").getComponent(cc.Label);
        var Hp = this.node.getChildByName("hp");
        this.hp = Hp.getChildByName("hpLabel").getComponent(cc.Label);
        var le = this.node.getChildByName("level");
        this.level = le.getChildByName("levelLabel").getComponent(cc.Label);
        var at = this.node.getChildByName("ATK");
        this.ATK = at.getChildByName("ATKLabel").getComponent(cc.Label);
        var de = this.node.getChildByName("defense");
        this.defense = de.getChildByName("defenseLabel").getComponent(cc.Label);
        this.onLoadShow();
      };
      UserInforPanel.prototype.onLoadShow = function() {
        this.userinfor = this.perssisteRottnode.getUserInfor;
        this.idLabel.string = this.userinfor[0]["ID"];
        this.level.string = this.userinfor[2]["level"];
        var packhave = this.userinfor[5]["packhave"];
        var Equipment;
        for (var i = 0; i < packhave.length; i++) if ("BS" == packhave[i]["id"].substr(0, 2)) {
          this.onShowImage(packhave[i]["weapon"], this.weapon);
          this.onShowImage(packhave[i]["shoe"], this.shoe);
          this.onShowImage(packhave[i]["helmet"], this.helmet);
          this.onShowImage(packhave[i]["cuirass"], this.cuirass);
          var roleLevelData = this.perssisteRottnode.onGetRolesLeveInfor(packhave[i]["id"]);
          for (var j = 0; j < roleLevelData.length; j++) if (roleLevelData[j]["Leve"] == this.userinfor[2]["level"]) {
            var def = 0;
            for (var k = 0; k < this.equipment_Config.length; k++) {
              packhave[i]["weapon"] == this.equipment_Config[k]["ID"] && (this.ATK.string = roleLevelData[j]["Attack"] + this.equipment_Config[k]["Attack"]);
              if (packhave[i]["shoe"] == this.equipment_Config[k]["ID"]) {
                this.defense.string = roleLevelData[j]["Defence"] + this.equipment_Config[k]["Defence"];
                def = roleLevelData[j]["Defence"] + this.equipment_Config[k]["Defence"];
                cc.log(def);
              }
              packhave[i]["cuirass"] == this.equipment_Config[k]["ID"] && (this.hp.string = roleLevelData[j]["Hp"] + this.equipment_Config[k]["Hp"]);
              if (packhave[i]["helmet"] == this.equipment_Config[k]["ID"]) {
                def += this.equipment_Config[k]["Defence"];
                this.defense.string = def.toString();
                cc.log(def);
              }
            }
          }
        }
      };
      UserInforPanel.prototype.onShowImage = function(Equipmentid, sprite) {
        if (null != Equipmentid || void 0 != Equipmentid) for (var i = 0; i < this.equipment_Config.length; i++) Equipmentid == this.equipment_Config[i]["ID"] && this.onSetSpriteFrame(Equipmentid, function(spr) {
          sprite.spriteFrame = spr;
          sprite.node.width = 70;
          sprite.node.height = 70;
        });
      };
      UserInforPanel.prototype.onBtnClickEvent = function(event) {
        switch (event.currentTarget.name) {
         case "offBtn":
          this.onoffBtnClick();
          break;

         default:
          console.log(event.currentTarget.name);
        }
      };
      UserInforPanel.prototype.onoffBtnClick = function() {
        this.node.active = false;
      };
      UserInforPanel.prototype.onSetSpriteFrame = function(assetname, rhand) {
        cc.loader.loadRes("UI/Itemes/" + assetname, cc.SpriteFrame, function(err, spriteFrame) {
          err ? cc.log("\u52a0\u8f7d\u56fe\u7247\u51fa\u9519", assetname) : null != rhand && rhand(spriteFrame);
        });
      };
      UserInforPanel = __decorate([ ccclass ], UserInforPanel);
      return UserInforPanel;
    }(cc.Component);
    exports.default = UserInforPanel;
    cc._RF.pop();
  }, {
    "../../Data/PerssistRootNode": "PerssistRootNode"
  } ],
  User: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b28a6DL4DlLWIc2lhjQo3dE", "User");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var User = function() {
      function User() {
        this.userWinCount = 0;
        this.uid = null;
        this.name = null;
        this.icon = null;
        this.score = 0;
        this.money = 0;
        this.addMoneyCount = 0;
        this.count = 0;
        this.maxCount = 0;
        this.addMoney = 0;
        this.totalCount1 = 0;
        this.totalCount2 = 0;
        this.tixian = 0;
      }
      Object.defineProperty(User, "share", {
        get: function() {
          null == User._share && (User._share = new User());
          return User._share;
        },
        enumerable: true,
        configurable: true
      });
      User._share = null;
      return User;
    }();
    exports.default = User;
    cc._RF.pop();
  }, {} ],
  Util: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5a0f5en39JFP7Z0SsMmJC6F", "Util");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var API_1 = require("./API");
    var GameBox_1 = require("./GameBox");
    var Loading_1 = require("./Loading");
    var Util = function() {
      function Util() {}
      Util.saveItem = function(key, data) {
        var jsonObj = JSON.stringify(data);
        cc.sys.localStorage.setItem(key, jsonObj);
      };
      Util.loadItem = function(key) {
        var data = cc.sys.localStorage.getItem(key);
        if (null == data || "" == data) return null;
        return JSON.parse(data);
      };
      Util.removeItem = function(key) {
        cc.sys.localStorage.removeItem(key);
      };
      Util.loadHtml = function(url, rhand, postData) {
        void 0 === postData && (postData = null);
        cc.log("http ", url);
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (4 == xhr.readyState) if (xhr.status >= 200 && xhr.status < 300 || 304 == xhr.status) {
            cc.log("---\x3eurl:", url);
            cc.log("http request : ", xhr.responseText);
            cc.log("<---:", url);
            rhand(xhr.responseText);
          } else {
            cc.log("xhr status : ", xhr.status);
            rhand(null);
          }
        };
        var method = null != postData ? "POST" : "GET";
        xhr.open(method, url, false);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (null != postData) {
          method = "";
          for (var key in postData) method += key + "=" + postData[key] + "&";
          postData = method.substr(0, method.length - 1);
          cc.log("post data :", postData);
        }
        xhr.send(postData);
      };
      Util.formatNumber = function(v) {
        return v >= 1e6 ? Math.floor(v / 1e6).toFixed(0) + "M" : v >= 1e3 ? Math.floor(v / 1e3).toFixed(0) + "K" : v.toFixed(0);
      };
      Util.loadSprite = function(url, rhand) {
        var node = new cc.Node();
        var sp = node.addComponent(cc.Sprite);
        cc.loader.loadRes(url, cc.SpriteFrame, function(err, spriteFrame) {
          if (err) cc.log("\u52a0\u8f7d\u56fe\u7247\u51fa\u9519", url); else {
            sp.spriteFrame = spriteFrame;
            null != rhand && rhand(node);
          }
        });
        return node;
      };
      Util.loadSpriteURL = function(url, type, rhand) {
        var node = new cc.Node();
        var sp = node.addComponent(cc.Sprite);
        cc.loader.load({
          url: url,
          type: type
        }, function(err, texture) {
          if (err) cc.log("\u52a0\u8f7d\u56fe\u7247\u51fa\u9519", url); else {
            sp.spriteFrame = new cc.SpriteFrame(texture);
            null != rhand && rhand(node);
          }
        });
        return node;
      };
      Util.loadHead = function(parent, url) {
        parent.removeAllChildren(true);
        if ("data:image" == url.substr(0, 10)) {
          cc.log("\u4f7f\u7528base64\u56fe\u7247");
          var img_1 = new Image();
          img_1.onload = function() {
            cc.log("loadBase64\u52a0\u8f7d\u5b8c\u6210");
            var texture = new cc.Texture2D();
            texture.initWithElement(img_1);
            texture.handleLoadedTexture();
            var spriteFrame = new cc.SpriteFrame(texture);
            var node = new cc.Node();
            var sp = node.addComponent(cc.Sprite);
            sp.spriteFrame = spriteFrame;
            node.parent = parent;
            node.scale = parent.width / node.width;
          };
          img_1.src = url.replace(/ /g, "+");
          return;
        }
        if (cc.sys.isBrowser) {
          cc.log("\u8de8\u57df\u52a0\u8f7d\u56fe\u7247");
          this.loadSpriteCrossOrigin(url, function(sf) {
            var node = new cc.Node();
            var sp = node.addComponent(cc.Sprite);
            sp.spriteFrame = sf;
            node.parent = parent;
            node.scale = parent.width / node.width;
          });
          return;
        }
        cc.loader.load({
          url: url,
          type: "png"
        }, function(err, texture) {
          if (err) {
            cc.log("\u52a0\u8f7d\u5934\u50cf\u51fa\u9519", url);
            return;
          }
          var node = new cc.Node();
          var sp = node.addComponent(cc.Sprite);
          sp.spriteFrame = new cc.SpriteFrame(texture);
          node.parent = parent;
          node.scale = parent.width / node.width;
        });
      };
      Util.loadSpriteCrossOrigin = function(url, rhand) {
        var img = new Image();
        img.src = url;
        img.crossOrigin = "anonymous";
        img.onload = function() {
          cc.log("loadSpriteCrossOrigin\u52a0\u8f7d\u5b8c\u6210");
          var texture = new cc.Texture2D();
          texture.initWithElement(img);
          texture.handleLoadedTexture();
          var spriteFrame = new cc.SpriteFrame(texture);
          rhand(spriteFrame);
        };
      };
      Util.loadBase64 = function(url, rhand) {
        GameBox_1.default.share.getImageBase64(url, function(str) {
          if (null == str) {
            cc.log("\u52a0\u8f7d\u56fe\u7247\u5931\u8d25:", url);
            return;
          }
          var type = "png";
          (url.lastIndexOf(".jpg") || url.lastIndexOf(".JPG") > 0) && (type = "jpg");
          var img = new Image();
          img.onload = function() {
            cc.log("loadBase64\u52a0\u8f7d\u5b8c\u6210");
            var texture = new cc.Texture2D();
            texture.initWithElement(img);
            texture.handleLoadedTexture();
            var spriteFrame = new cc.SpriteFrame(texture);
            rhand(spriteFrame);
          };
          img.src = "data:image/" + type + ";base64," + str;
        });
      };
      Util.showBox = function(pre) {
        var node = cc.instantiate(pre);
        node.parent = cc.director.getScene().getChildByName("Canvas");
        return node;
      };
      Util.showBoxAsync = function(name, rhand) {
        Util.loadPrefab(name, function(prefab) {
          var node = Util.showBox(prefab);
          rhand && rhand(node);
        });
      };
      Util.loadPrefab = function(name, rhand) {
        cc.loader.loadRes("prefab/" + name, function(err, prefab) {
          if (err) {
            console.log("load prefab error" + err);
            return;
          }
          rhand && rhand(prefab);
        });
      };
      Util.adjustResolution = function(canvas) {
        if (null == canvas) return;
        var frameSize = cc.view.getFrameSize();
        var designSize = cc.view.getDesignResolutionSize();
        if (designSize.width / designSize.height < frameSize.width / frameSize.height) {
          canvas.fitHeight = true;
          canvas.fitWidth = false;
        } else {
          canvas.fitHeight = false;
          canvas.fitWidth = true;
        }
      };
      Util.image2base64 = function(url, rhand) {
        var img = new Image();
        img.src = url;
        img.crossOrigin = "anonymous";
        img.onload = function() {
          console.log("loadSpriteCrossOrigin\u52a0\u8f7d\u5b8c\u6210");
          var width = img.width;
          var height = img.height;
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
          var dataURL = canvas.toDataURL("image/" + ext);
          cc.log("\u56fe\u7247\u7f16\u7801:", dataURL);
          rhand(dataURL);
        };
      };
      Util.startGame = function(max, name) {
        if (API_1.default.share.isFacebook && Util.gamePlayCount > 0 && Util.gamePlayCount % max == 0) {
          API_1.default.share.showVideoAd(function(res) {
            if (res) {
              cc.director.loadScene(name);
              Util.gamePlayCount++;
            }
          });
          return;
        }
        Loading_1.default.show();
        cc.director.loadScene(name);
        Util.gamePlayCount++;
      };
      Util.event = new cc.EventTarget();
      Util.gamePlayCount = 0;
      return Util;
    }();
    exports.default = Util;
    cc._RF.pop();
  }, {
    "./API": "API",
    "./GameBox": "GameBox",
    "./Loading": "Loading"
  } ],
  WechatSubSprite: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d682bkON8BHU73ydETcKqY1", "WechatSubSprite");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var API_1 = require("./API");
    var User_1 = require("./User");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WechatSubSprite = function(_super) {
      __extends(WechatSubSprite, _super);
      function WechatSubSprite() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.texture = new cc.Texture2D();
        _this.rankType = 0;
        return _this;
      }
      WechatSubSprite.prototype.start = function() {
        cc.log("WechatSubSprite", this.rankType);
        switch (this.rankType) {
         case 1:
          API_1.default.share.updateWechatFriendRank();
          break;

         case 2:
          API_1.default.share.updateWechatTargetFriend(User_1.default.share.score);
          break;

         case 3:
          API_1.default.share.updateWechatFriendRank2();
          break;

         case 4:
          API_1.default.share.updateWechatTargetFriend2(User_1.default.share.score);
        }
      };
      WechatSubSprite.prototype.update = function(dt) {
        API_1.default.share.updateWechatContext(this, this.texture);
        this.node.scale = 750 / this.node.width;
      };
      WechatSubSprite.prototype.onDestroy = function() {
        null != this.texture && (this.texture = null);
      };
      __decorate([ property ], WechatSubSprite.prototype, "rankType", void 0);
      WechatSubSprite = __decorate([ ccclass ], WechatSubSprite);
      return WechatSubSprite;
    }(cc.Sprite);
    exports.default = WechatSubSprite;
    cc._RF.pop();
  }, {
    "./API": "API",
    "./User": "User"
  } ],
  Wechat: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "87707q8sU5G3ZA0rCm4fdz7", "Wechat");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameBox_1 = require("../GameBox");
    var User_1 = require("../User");
    var Lang_1 = require("../Lang");
    var Http_1 = require("../Http");
    var Util_1 = require("../Util");
    var API_1 = require("../API");
    var Wechat = function() {
      function Wechat() {
        this._wechatCludBtn = null;
        this._wechatLoginBtn = null;
        this._wechatCode = null;
        this._wechatVideo = null;
        this._wechatBannerAd = null;
        this.videoRhand = null;
      }
      Object.defineProperty(Wechat, "share", {
        get: function() {
          null == Wechat._instance && (Wechat._instance = new Wechat());
          return Wechat._instance;
        },
        enumerable: true,
        configurable: true
      });
      Wechat.prototype.init = function() {
        var _this = this;
        wx.showShareMenu({
          withShareTicket: true
        });
        null != GameBox_1.default.share.shareData && "" != GameBox_1.default.share.shareData.picture ? wx.onShareAppMessage(function() {
          return {
            title: GameBox_1.default.share.shareData.title,
            imageUrl: GameBox_1.default.share.shareData.picture,
            query: "uid=" + User_1.default.share.uid,
            success: function(res) {
              _this.shareRhand(res, function(res2) {
                if (null == res2) return;
                var str = res2.encryptedData + "," + res2.iv;
                cc.log("share key:", str);
                Http_1.default.share.addGameCount(str, function() {
                  cc.log("\u5206\u4eab\u6210\u529f\u589e\u52a0\u6e38\u620f\u6b21\u6570\u4e3a\uff1a", User_1.default.share.count);
                });
              });
            }
          };
        }) : cc.loader.loadRes("share.jpg", function(error, data) {
          if (error) {
            cc.log("share error ", error);
            return;
          }
          wx.onShareAppMessage(function() {
            return {
              title: Lang_1.default.share.find("share_to"),
              imageUrl: data.url,
              query: "uid=" + User_1.default.share.uid,
              success: function(res) {
                _this.shareRhand(res, function(res2) {
                  if (null == res2) return;
                  var str = res2.encryptedData + "," + res2.iv;
                  cc.log("share key:", str);
                  Http_1.default.share.addGameCount(str, function() {
                    cc.log("\u5206\u4eab\u6210\u529f\u589e\u52a0\u6e38\u620f\u6b21\u6570\u4e3a\uff1a", User_1.default.share.count);
                  });
                });
              }
            };
          });
        });
        var adId = GameBox_1.default.share.voideoId;
        if (null != adId) {
          this._wechatVideo = wx.createRewardedVideoAd({
            adUnitId: adId
          });
          this._wechatVideo.onClose(function(res) {
            res && res.isEnded || void 0 === res ? null != _this.videoRhand && _this.videoRhand(true) : null != _this.videoRhand && _this.videoRhand(false);
          });
        }
        this.wechatStart(wx.getLaunchOptionsSync());
        wx.onShow(this.wechatStart.bind(this));
      };
      Wechat.prototype.wechatStart = function(option) {
        console.log("wechatStart");
        var pid = null;
        if (void 0 != option.scene_note) {
          pid = option.scene_note;
          pid = decodeURIComponent(pid);
          pid = decodeURIComponent(pid);
          var index = pid.indexOf("pid=");
          pid = pid.substr(index + 4);
          index = pid.indexOf("&");
          pid = pid.substr(0, index);
        }
        console.log("\u542f\u52a8\u53c2\u6570\uff1a", pid);
        void 0 != pid && null != pid && "" != pid && GameBox_1.default.share.uploadPid(pid);
        console.log(JSON.stringify(option));
      };
      Wechat.prototype.showLoginButton = function(rhand) {
        var _this = this;
        if (null != this._wechatLoginBtn) {
          this._wechatLoginBtn.show();
          return;
        }
        var set = wx.getSystemInfoSync();
        var style = {
          left: (set.screenWidth - 150) / 2,
          top: (set.screenHeight - 30) / 2,
          width: 150,
          height: 35,
          backgroundColor: "#ffffff",
          borderColor: "#ffffff",
          color: "#111111",
          borderWidth: 2,
          borderRadius: 10,
          textAlign: "center",
          fontSize: 20,
          lineHeight: 30
        };
        this._wechatLoginBtn = wx.createUserInfoButton({
          type: "text",
          text: "\u767b\u5f55\u6e38\u620f",
          style: style
        });
        this._wechatLoginBtn.onTap(function(res) {
          console.log(res);
          var data = res.userInfo;
          User_1.default.share.name = data.nickName;
          User_1.default.share.icon = data.avatarUrl;
          Http_1.default.share.login(_this._wechatCode, rhand, function() {
            cc.log("\u5fae\u4fe1\u767b\u5f55\u5931\u8d25\uff01");
            _this._wechatLoginBtn.show();
          });
          _this._wechatLoginBtn.hide();
        });
        this._wechatLoginBtn.show();
      };
      Wechat.prototype.showClub = function() {
        if (null != this._wechatCludBtn) return;
        this._wechatCludBtn = wx.createGameClubButton({
          icon: "green",
          style: {
            left: 10,
            top: 10,
            width: 40,
            height: 40
          }
        });
      };
      Wechat.prototype.login = function(rhand, fhand) {
        var _this = this;
        Util_1.default.event.emit("loading", 11);
        wx.login({
          success: function(res1) {
            Util_1.default.event.emit("loading", 12);
            _this._wechatCode = res1.code;
            wx.getUserInfo({
              success: function(res2) {
                Util_1.default.event.emit("loading", 13);
                var data = res2.userInfo;
                User_1.default.share.name = data.nickName;
                User_1.default.share.icon = data.avatarUrl;
                Http_1.default.share.login(_this._wechatCode, rhand, fhand);
              },
              fail: fhand
            });
          },
          fail: fhand
        });
      };
      Wechat.prototype.showBannerAd = function() {
        var adId = GameBox_1.default.share.bannerId;
        if (null == adId) {
          cc.log("\u6ca1\u6709Banner\u5e7f\u544aID");
          return;
        }
        if (null == this._wechatBannerAd) {
          var set = wx.getSystemInfoSync();
          this._wechatBannerAd = wx.createBannerAd({
            adUnitId: adId,
            style: {
              left: 0,
              top: set.screenHeight - 80,
              width: set.screenWidth,
              height: 80
            }
          });
        }
        this._wechatBannerAd.show();
      };
      Wechat.prototype.hideBannerAd = function() {
        if (null != this._wechatBannerAd) {
          this._wechatBannerAd.hide();
          return;
        }
      };
      Wechat.prototype.showVideoAd = function(callback) {
        this.videoRhand = callback;
        this._wechatVideo.show();
      };
      Wechat.prototype.share = function(text, imageUrl, query, rhand) {
        var _this = this;
        wx.shareAppMessage({
          title: text,
          imageUrl: imageUrl,
          query: query,
          success: function(res) {
            _this.shareRhand(res, rhand);
          }
        });
      };
      Wechat.prototype.shareRhand = function(res, rhand) {
        console.log("\u8f6c\u53d1\u6210\u529f!!!");
        if (null == res.shareTickets || void 0 == res.shareTickets || "" == res.shareTickets) {
          console.log("res.shareTickets is null");
          wx.showModal({
            title: "\u63d0\u793a",
            content: "\u8bf7\u5206\u4eab\u5230\u7fa4!",
            showCancel: false,
            cancelText: "\u53d6\u6d88",
            confirmText: "\u77e5\u9053\u4e86"
          });
          rhand(null);
        } else {
          console.log("res.shareTickets is not null");
          if (res.shareTickets.length > 0) {
            console.log("\u5206\u4eab\u6210\u529f\uff01\uff01", res.shareTickets[0]);
            wx.getShareInfo({
              shareTicket: res.shareTickets[0],
              success: function(res2) {
                rhand(res2);
              },
              fail: function() {
                rhand(null);
              }
            });
          }
        }
      };
      Wechat.prototype.updateFriendRank = function() {
        if (!API_1.default.share.isWeChat) return;
        wx.postMessage({
          type: 1,
          name: "score",
          openId: User_1.default.share.uid
        });
      };
      Wechat.prototype.updateFriendRank2 = function() {
        if (!API_1.default.share.isWeChat) return;
        wx.postMessage({
          type: 3,
          name: "score",
          openId: User_1.default.share.uid
        });
      };
      Wechat.prototype.updateTargetFriend = function(score) {
        if (!API_1.default.share.isWeChat) return;
        wx.postMessage({
          type: 2,
          name: "score",
          openId: User_1.default.share.uid,
          score: score
        });
      };
      Wechat.prototype.updateTargetFriend2 = function(score) {
        if (!API_1.default.share.isWeChat) return;
        wx.postMessage({
          type: 4,
          name: "score",
          openId: User_1.default.share.uid,
          score: score
        });
      };
      Wechat.prototype.updateOther = function(data) {
        if (!API_1.default.share.isWeChat) {
          cc.log("updateWechatOther");
          return;
        }
        wx.postMessage(data);
      };
      Wechat.prototype.clearContext = function() {
        if (!API_1.default.share.isWeChat) {
          cc.log("\u4e0d\u662f\u5728\u5fae\u4fe1\u91cc\uff1aclearWechatContext");
          return;
        }
        wx.postMessage({
          type: 0
        });
      };
      Wechat.prototype.updateContext = function(sp, text) {
        if ("undefined" == typeof sharedCanvas) return;
        text.initWithElement(sharedCanvas);
        text.handleLoadedTexture();
        sp.spriteFrame = new cc.SpriteFrame(text);
      };
      Wechat.prototype.updateRank = function(score) {
        wx.setUserCloudStorage({
          KVDataList: [ {
            key: "score",
            value: score.toString()
          } ],
          success: function(res) {
            cc.log("\u4e0a\u4f20\u6392\u884c\u699c\u6210\u529f:", res);
          },
          fail: function(res) {
            cc.log("\u4e0a\u4f20\u6392\u884c\u699c\u5931\u8d25:", res);
          }
        });
      };
      Wechat.prototype.previewImage = function(url) {
        wx.previewImage({
          current: url,
          urls: [ url ]
        });
      };
      Wechat.prototype.jumpto = function(appId) {
        wx.navigateToMiniProgram({
          appId: appId,
          path: "",
          extraData: "gameId=" + Http_1.default.share.gameId + "&uid=" + User_1.default.share.uid
        });
      };
      Wechat._instance = null;
      return Wechat;
    }();
    exports.default = Wechat;
    cc._RF.pop();
  }, {
    "../API": "API",
    "../GameBox": "GameBox",
    "../Http": "Http",
    "../Lang": "Lang",
    "../User": "User",
    "../Util": "Util"
  } ],
  oldGameSite: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61c1cUUmAdDeaCRWQzg0iXo", "oldGameSite");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Util_1 = require("../../base/Util");
    var PerssistRootNode_1 = require("../../Data/PerssistRootNode");
    var Enemy_1 = require("../Enemy/Enemy");
    var Player_1 = require("../Player/Player");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var oldGameStite = function(_super) {
      __extends(oldGameStite, _super);
      function oldGameStite() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.playesPath = [];
        _this.Playes = [];
        _this.enemysPath = [];
        _this.enemyes = [];
        _this.GameLeve = 1;
        _this.PlayesAttackBtn = null;
        _this.selfAttackIson = false;
        _this.attackBtnIson = true;
        return _this;
      }
      oldGameStite.prototype.onLoad = function() {
        var node = cc.director.getScene().getChildByName("PerssistRootNode");
        this.perssistRoddtNode = node.getComponent(PerssistRootNode_1.default);
        this.UserInfor = this.perssistRoddtNode.getUserInfor;
        this.RolesInfor = this.perssistRoddtNode.getRolesData_Config;
        var name = this.node.name;
        switch (name) {
         case "Canvas1":
          this.GameLeve = 1;
          break;

         case "Canvas2":
          this.GameLeve = 2;
          break;

         case "Canvas3":
          this.GameLeve = 3;
          break;

         default:
          cc.log("\u6218\u6597\u573a\u666f\u8bc6\u522b\u5931\u8d25");
        }
        var customs_config = this.perssistRoddtNode.getcustoms_Config;
        this.customsInfor = customs_config[this.GameLeve - 1];
      };
      oldGameStite.prototype.start = function() {
        this.onInit();
      };
      oldGameStite.prototype.onInit = function() {
        this.onInstantiate();
        this.onInstantiateEnemy();
        this.PlayesAttackBtn = this.node.getChildByName("attackBtn").getComponent(cc.Button);
        this.isonAttackBtn = this.node.getChildByName("isonAttackBtn").getComponent(cc.Button);
        this.PlayesAttackBtn.node.on("click", this.onPlayerAttackClick, this);
        this.isonAttackBtn.node.on("click", this.onIsonAttackClick, this);
      };
      oldGameStite.prototype.onInstantiate = function() {
        var _this = this;
        var packitem = this.UserInfor[5]["packhave"];
        var _loop_1 = function(i) {
          var _loop_2 = function(j) {
            if (this_1.RolesInfor[j]["Name"] == packitem[i]["packitemName"]) for (var k = 0; k < this_1.playesPath.length; k++) Util_1.default.loadPrefab("Player/" + this_1.RolesInfor[j]["Name"], function(prefab) {
              var _player = cc.instantiate(prefab);
              _this.playesPath[i].parent.addChild(_player);
              var playesPathpos = _this.playesPath[i].position;
              _player.position = playesPathpos;
              _this.playesPath[i].destroy();
              _this.Playes.push(_player);
              _player.getChildByName("bloodcase").active = true;
              var playerid = _this.RolesInfor[j]["ID"];
              var PlayerInfor = _this.onGetPlayInfor(playerid);
              var palyer = _player.getComponent(Player_1.default);
              palyer.player_hp = PlayerInfor["Hp"];
              palyer.player_atn = PlayerInfor["Attack"];
              palyer.player_def = PlayerInfor["Defence"];
            });
          };
          for (var j = 0; j < this_1.RolesInfor.length; j++) _loop_2(j);
        };
        var this_1 = this;
        for (var i = 0; i < packitem.length; i++) _loop_1(i);
      };
      oldGameStite.prototype.onGetPlayInfor = function(id) {
        var player_Leve = this.perssistRoddtNode.onGetRolesLeveInfor(id);
        if (null == player_Leve) return;
        var userLeve = this.perssistRoddtNode.getUserInfor[2]["level"];
        var PlayerInfor = null;
        for (var i = 0; i < player_Leve.length; i++) player_Leve[i]["Leve"] == userLeve && (PlayerInfor = player_Leve[i]);
        if (null != PlayerInfor) return PlayerInfor;
      };
      oldGameStite.prototype.onInstantiateEnemy = function() {
        var e1 = this.customsInfor["Enemy1Num"];
        var e2 = this.customsInfor["Enemy1Num"] + this.customsInfor["Enemy2Num"];
        var e3 = this.customsInfor["Enemy1Num"] + this.customsInfor["Enemy2Num"] + this.customsInfor["Enemy3Num"];
        for (var i = 0; i < this.enemysPath.length; i++) {
          i < e1 && this.enemyInstantInfor(this.customsInfor["Enemy1"], this.enemysPath[i]);
          e1 < i && i < e2 && this.enemyInstantInfor(this.customsInfor["Enemy2"], this.enemysPath[i]);
          e2 < i && i < e3 && this.enemyInstantInfor(this.customsInfor["Enemy3"], this.enemysPath[i]);
        }
      };
      oldGameStite.prototype.enemyInstantInfor = function(Enemyname, EnemyPaths) {
        var _this = this;
        Util_1.default.loadPrefab("Enemy/" + Enemyname, function(prefab) {
          var _enemy = cc.instantiate(prefab);
          EnemyPaths.parent.addChild(_enemy);
          var EnemyPathsPos = EnemyPaths.position;
          _enemy.position = EnemyPathsPos;
          EnemyPaths.destroy();
          _this.enemyes.push(_enemy);
          _enemy.getChildByName("bloodcase").active = true;
          var enemy = _enemy.getComponent(Enemy_1.default);
          for (var i = 0; i < _this.RolesInfor.length; i++) if (_this.RolesInfor[i]["Name"] == Enemyname) {
            enemy.enemy_hp = Number(_this.RolesInfor[i]["HP"]);
            enemy.enemy_Atn = Number(_this.RolesInfor[i]["Attack"]);
            enemy.enemy_def = Number(_this.RolesInfor[i]["Defence"]);
          }
        });
      };
      oldGameStite.prototype.onPlayerAttackClick = function() {
        if (true != this.attackBtnIson) return;
        this.attackBtnIson = false;
        for (var i = 0; i < this.Playes.length; i++) for (var j = 0; j < this.enemyes.length; j++) if (null != this.enemyes[j]) var _play = this.Playes[i].getComponent(Player_1.default);
        this.attackBtnIson = true;
      };
      oldGameStite.prototype.onIsonAttackClick = function() {
        var str = this.isonAttackBtn.node.getChildByName("Label").getComponent(cc.Label);
        "\u624b\u52a8" == str.string ? str.string = "\u81ea\u52a8" : str.string = "\u624b\u52a8";
      };
      __decorate([ property([ cc.Node ]) ], oldGameStite.prototype, "playesPath", void 0);
      __decorate([ property([ cc.Node ]) ], oldGameStite.prototype, "enemysPath", void 0);
      oldGameStite = __decorate([ ccclass ], oldGameStite);
      return oldGameStite;
    }(cc.Component);
    exports.default = oldGameStite;
    cc._RF.pop();
  }, {
    "../../Data/PerssistRootNode": "PerssistRootNode",
    "../../base/Util": "Util",
    "../Enemy/Enemy": "Enemy",
    "../Player/Player": "Player"
  } ]
}, {}, [ "Commont", "PerssistRootNode", "GameOverPanel", "HitPanel", "Tools", "API", "BaseCommand", "BaseScene", "Box", "BoxMsg", "Data", "FriendTop3", "GameBox", "Http", "Init", "InitScene", "Lang", "LangSprite", "Loading", "Network", "NumberLabel", "RankUtil", "ScrollViewBase", "Sound", "TargetFriend", "Tips", "User", "Util", "WechatSubSprite", "CreatorWebToJs_Oc", "Facebook", "QQPlay", "Wechat", "Customs", "Enemy", "GameSite", "oldGameSite", "Login", "Item", "MainGame", "PackItem", "PackPanel", "PayItem", "PayPanel", "StorePanel", "UserInforPanel", "AudioEngine", "Player", "SetPanel" ]);