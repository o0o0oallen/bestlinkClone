window.__require = function e(t, i, n) {
    function a(r, s) {
        if (!i[r]) {
            if (!t[r]) {
                var c = r.split("/");
                if (c = c[c.length - 1],
                    !t[c]) {
                    var l = "function" == typeof __require && __require;
                    if (!s && l)
                        return l(c, !0);
                    if (o)
                        return o(c, !0);
                    throw new Error("Cannot find module '" + r + "'")
                }
                r = c
            }
            var h = i[r] = {
                exports: {}
            };
            t[r][0].call(h.exports, function (e) {
                return a(t[r][1][e] || e)
            }, h, h.exports, e, t, i, n)
        }
        return i[r].exports
    }
    for (var o = "function" == typeof __require && __require, r = 0; r < n.length; r++)
        a(n[r]);
    return a
}({
    AdvertFail: [function (e, t) {
        "use strict";
        cc._RF.push(t, "28c4202NLhBbqWASe1Z3Gxs", "AdvertFail"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                onDestroy: function () { },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                addEvent: function () {
                    this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this)
                },
                removeEvent: function () {
                    this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this)
                },
                initialize: function () {
                    this.addEvent()
                },
                clickCloseBtn: function () {
                    this.destroyClass()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    BannerManager: [function (e, t) {
        "use strict";
        cc._RF.push(t, "e9202qQEjlFG6989w+ypuYL", "BannerManager"),
            window.bannerLayerNameOb = {
                pause: "pause",
                watch: "watch",
                grade: "grade",
                dailyTask: "dailyTask",
                levelCustom: "levelCustom",
                tip: "tip",
                surprise: "surprise"
            },
            window.bannerManager = {
                bannerNode: null,
                testID: 0,
                inteval: 3,
                showLab: null,
                hideDelayTime: 0,
                bannerLayerOb: {},
                refreshBanner: function (e) {
                    if (e) {
                        var t = (new Date).getTime();
                        if (null == this.bannerLayerOb[e] && (this.bannerLayerOb[e] = {
                            has: !0,
                            time: null
                        }),
                            this.bannerLayerOb[e].time && t - this.bannerLayerOb[e].time < 1e3 * this.inteval)
                            ccLog("\u8be5\u754c\u9762banner\u79bb\u4e0a\u6b21\u5237\u65b0\u4e0d\u8db3" + this.inteval + "s");
                        else
                            switch (this.bannerLayerOb[e].time = t,
                            gameSDKName) {
                                case faceBookSDK:
                                    gameSDK.faceBookAdvertisement.loadBannerAd();
                                    break;
                                case faceBookSDKTest:
                                    this.addTestBanner()
                            }
                    }
                },
                addTestBanner: function () {
                    if (!this.bannerNode) {
                        var e = new cc.Node("nodeName")
                            , t = new cc.Texture2D
                            , i = new cc.SpriteFrame;
                        t.initWithData(new Uint8Array([0, 0, 0]), cc.Texture2D.PixelFormat.RGB888, 1, 1, cc.winSize),
                            i.setTexture(t),
                            i.setRect(cc.rect(0, 0, cc.winSize.width, 110)),
                            e.addComponent(cc.Sprite).spriteFrame = i,
                            e.color = cc.Color.WHITE,
                            e.anchorY = 0,
                            e.setPosition(cc.winSize.width / 2, 0),
                            this.bannerNode = e,
                            cc.director.getScene().addChild(e, 1e4),
                            cc.game.addPersistRootNode(e);
                        var n = new cc.Node;
                        n.y = 55,
                            n.color = cc.Color.WHITE,
                            (this.showLab = n.addComponent(cc.Label)).fontSize = 50,
                            e.addChild(n, 1)
                    }
                    null == this.bannerNode.parent && (this.bannerNode.parent = cc.director.getScene(),
                        this.bannerNode = 1e3),
                        this.bannerNode.active = !0,
                        this.showLab && (this.showLab.string = "" + this.testID++)
                },
                hideBanner: function (e) {
                    if (this.bannerLayerOb[e] && (this.bannerLayerOb[e].has = !1),
                        !this.checkBannerLayer())
                        switch (gameSDKName) {
                            case faceBookSDK:
                                gameSDK.faceBookAdvertisement.hideBanner();
                                break;
                            case faceBookSDKTest:
                                this.bannerNode && (this.bannerNode.active = !1)
                        }
                },
                checkBannerLayer: function () {
                    for (var e in this.bannerLayerOb)
                        if (this.bannerLayerOb[e].has)
                            return !0;
                    return !1
                }
            },
            cc._RF.pop()
    }
        , {}],
    BossAnimation: [function (e, t) {
        "use strict";
        cc._RF.push(t, "778f9cUy3pLMoolgfcHKJYT", "BossAnimation"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                initialize: function (e) {
                    this.spineURL = e.spineURL,
                        this.bossDeath = e.bossDeath,
                        this.bossAppearCallback = e.bossAppearCallback,
                        this.bossAttackCallback = e.bossAttackCallback
                },
                loadAnimation: function () {
                    this.spine = this.node.getChildByName("bossNode").addComponent(sp.Skeleton),
                        this.spine.loop = !1,
                        this.spine.skeletonData = engine.memory.getSpine(this.spineURL),
                        this.spine.timeScale = .5,
                        this.setAnimationListener(),
                        this.spine.animation = "appear"
                },
                setAnimationListener: function () {
                    var e = this
                        , t = this.spine;
                    t.setStartListener(function (e) {
                        var t = e.animation ? e.animation.name : "";
                        e.timeScale = "death" === t ? .6 : "appear" === t ? 1 : "attack" === t ? 1.5 : 1
                    }),
                        t.setCompleteListener(function (t) {
                            var i = t.animation ? t.animation.name : "";
                            "death" === i ? (e.spine.clearTrack(0),
                                e.bossDeath && e.bossDeath()) : "appear" === i && (e.spine.setAnimation(0, "free", !0),
                                    e.bossAppearCallback && e.bossAppearCallback())
                        })
                },
                showDefeatBossAnimation: function (e) {
                    e === attackBossTypeEm.normal ? this.spine.setAnimation(0, "hit1", !1) : this.spine.setAnimation(0, "hit2", !1),
                        engine.eventM.emit(event_id.COLLECT_LEVEL_TARGET, {
                            type: collectTypeEm.boss,
                            num: 0
                        }),
                        this.spine.addAnimation(0, "death", !1)
                },
                showBeatBackAnimation: function (e, t) {
                    t === attackBossTypeEm.normal ? this.spine.setAnimation(0, "hit1", !1) : this.spine.setAnimation(0, "hit2", !1),
                        this.spine.addAnimation(0, "free", !0)
                },
                showBossAttackAnimation: function () {
                    var e = this;
                    this.spine.setAnimation(0, "attack", !1),
                        this.spine.addAnimation(0, "free", !0),
                        setTimeout(function () {
                            e.bossAttackCallback && e.bossAttackCallback()
                        }, 1e3)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    BossData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "6c682CVCmBHaLErj9q57nxY", "BossData"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    hp: null,
                    maxHp: null,
                    bossType: null,
                    attType: null,
                    beatBackNum: null
                },
                initialize: function (e, t, i) {
                    this.refreshBossInfo(e, t, i)
                },
                refreshBossInfo: function (e, t, i) {
                    this.hp = t,
                        this.maxHp = t,
                        this.bossType = e,
                        this.attType = i,
                        this.beatBackNum = 0
                },
                bossBeatBack: function () {
                    this.hp -= 2,
                        this.beatBackNum++,
                        (this.maxHp - this.hp) % ATTCK_PRECUENCY == 0 && 0 != this.attType && (fightUILayer.mapLayer.isCanClick = !1)
                },
                getBossAttackGridArr: function () {
                    var e = this.getBossEmptyPosArr()
                        , t = e[0]
                        , i = e[1]
                        , n = [];
                    return t.length >= 2 ? n = this.addBossGrid(t) : i.length > 0 && (n = this.addBossIce(i)),
                        n
                },
                getBossEmptyPosArr: function () {
                    for (var e = fightControl.mapData.gridArr, t = [], i = [], n = 4; n < e.length; n++)
                        for (var a = 0; a < e[n].length; a++) {
                            var o = e[n][a]
                                , r = JSON.parse(JSON.stringify(o.gridPos));
                            o.isEmpty() ? t.push(r) : o.isUsable() && i.push(r)
                        }
                    return [t, i]
                },
                addBossGrid: function (e) {
                    var t;
                    t = this.getRandomGridArr(e, 2);
                    for (var i = fightControl.createElement(t.length / 2), n = 0; n < t.length; n++) {
                        var a = fightControl.mapData.getGridDataByPos(t[n]);
                        a.refreshGridID(i[n]),
                            a.refreshGridOther(gridTypeEm.normal)
                    }
                    return fightControl.mapData.remainGrid += 2,
                        t
                },
                addBossIce: function (e) {
                    var t = this.getRandomGridArr(e, 1);
                    return fightControl.mapData.getGridDataByPos(t[0]).refreshGridOther(gridTypeEm.ice),
                        t
                },
                getRandomGridArr: function (e, t) {
                    var i = [];
                    if (!(e instanceof Array) || e.length < 1)
                        return i;
                    for (var n = 0; n < t; n++) {
                        var a = Math.floor(Math.random() * e.length);
                        i = i.concat(e.splice(a, 1))
                    }
                    return i
                }
            }),
            cc._RF.pop()
    }
        , {}],
    BossLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "08ee2lFdm1FGoEili/07vB0", "BossLayer"),
            window.ATTCK_PRECUENCY = 3,
            debugtest.attckTime,
            window.attackBossTypeEm = cc.Enum({
                normal: 0,
                rocket: 1
            }),
            cc.Class({
                extends: cc.Component,
                properties: {
                    hpProgres: null,
                    bossType: null,
                    isDied: null,
                    fakeHpNode: null,
                    lastAttckTime: null,
                    curHp: null
                },
                onDestroy: function () {
                    this.hpProgres = null,
                        this.isDied = null,
                        this.fakeHpNode = null,
                        this.curHp = null
                },
                initialize: function (e) {
                    this.parentLayer = e,
                        this.bossAni = this.addComponent("BossAnimation"),
                        this.isDied = !1,
                        this.hpProgres = this.node.getChildByName("hpProgress").getComponent(cc.ProgressBar),
                        this.fakeHpNode = this.node.getChildByName("fakeHpNode");
                    var t = fightControl.bossData;
                    this.attType = t.attType,
                        this.bossType = t.bossType,
                        this.curHp = t.hp,
                        this.initBossAniData(),
                        this.refreshBossInfo()
                },
                initBossAniData: function () {
                    var e = {};
                    e.spineURL = needLoadSpine.boss,
                        e.bossDeath = this.bossDeath.bind(this),
                        e.bossAppearCallback = this.bossAppearCallback.bind(this),
                        e.bossAttackCallback = this.bossAttackCallback.bind(this),
                        this.bossAni.initialize(e),
                        this.bossAni.loadAnimation()
                },
                bossAppearCallback: function () { },
                refreshBossInfo: function () {
                    var e = fightControl.bossData;
                    this.removeHpProgressSchedule(),
                        this.hpProgres.progress = this.fakeHpNode.progress = e.hp / e.maxHp
                },
                bossBeatBack: function (e) {
                    var t = fightControl.bossData
                        , i = t.hp;
                    this.curHp -= 2,
                        heroData.bossHp = t.hp,
                        heroData.bossMaxHp = t.bossMaxHp,
                        this.addHpProgressSchedule(),
                        i <= 0 ? this.bossAni.showDefeatBossAnimation(e) : 1 == t.attType && (t.maxHp - this.curHp) % ATTCK_PRECUENCY == 0 ? this.bossAni.showBossAttackAnimation() : this.bossAni.showBeatBackAnimation(this.curHp, e)
                },
                bossAttackCallback: function () {
                    for (var e = this, t = fightControl.bossData.getBossAttackGridArr(), i = 0; i < t.length; i++) {
                        var n = e.parentLayer.getGridNodeComByPos(t[i])
                            , a = function () {
                                e.parentLayer.checkGameStatus() == curMapChangeTypeEm.rearrangement && (fightControl.rearrangement(),
                                    e.parentLayer.rearrangementMapLayer())
                            };
                        t.length > 1 ? i == t.length - 1 ? n.bossCreateAction(a) : n.bossCreateAction() : a()
                    }
                },
                bossDeath: function () {
                    1 === openModuleValue.isTimeOut && this.parentLayer.showCongratulations(),
                        this.parentLayer.defeatBoss()
                },
                addHpProgressSchedule: function () {
                    this.fakeHpNode.active || this.schedule(this.setHpProgress, .1)
                },
                removeHpProgressSchedule: function () {
                    this.fakeHpNode.active && (this.fakeHpNode.active = !1,
                        this.unschedule(this.setHpProgress, this))
                },
                setHpProgress: function () {
                    var e = fightControl.bossData;
                    this.hpProgres.progress * e.maxHp > e.hp ? (this.fakeHpNode.active = !0,
                        this.hpProgres.progress = e.hp / e.maxHp,
                        this.bloodSpeed = (this.fakeHpNode.scaleX - (e.hp + 2) / e.maxHp) / 8 + .01) : this.fakeHpNode.active && (this.fakeHpNode.scaleX -= this.bloodSpeed,
                            this.fakeHpNode.scaleX <= this.hpProgres.progress && (this.fakeHpNode.scaleX = this.hpProgres.progress,
                                this.removeHpProgressSchedule()))
                },
                update: function () {
                    this.parentLayer.pause || this.isDied
                }
            }),
            cc._RF.pop()
    }
        , {}],
    CacheData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "9c113gi4zROapvfqbyAskSH", "CacheData"),
            cc.Class({
                properties: {},
                initialize: function () { },
                readCaheData: function (e) {
                    var t = {};
                    try {
                        t = JSON.parse(cc.sys.localStorage.getItem(e))
                    } catch (i) { }
                    return t
                },
                writeCaheDataByKey: function (e, t) {
                    try {
                        cc.sys.localStorage.setItem(e, JSON.stringify(t))
                    } catch (i) { }
                }
            }),
            cc._RF.pop()
    }
        , {}],
    ChallengeInviteLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "bb01adbzChObL0J2x+XR+Aw", "ChallengeInviteLayer");
        var i = e("GameListLayer");
        cc.Class({
            extends: i,
            properties: {},
            destroyClass: function () {
                this.clear(),
                    this.removeEvent(),
                    null != this.node && this.node.destroy()
            },
            addEvent: function () {
                this.node.getChildByName("mask").on(cc.Node.EventType.TOUCH_END, this.clickClose, this),
                    this.bg.getChildByName("close").on(cc.Node.EventType.TOUCH_END, this.clickClose, this)
            },
            removeEvent: function () {
                this.node.getChildByName("mask").off(cc.Node.EventType.TOUCH_END, this.clickClose, this),
                    this.bg.getChildByName("close").off(cc.Node.EventType.TOUCH_END, this.clickClose, this)
            },
            initialize: function () {
                var e = this;
                this.bg = this.node.getChildByName("bg"),
                    this.addEvent(),
                    this.clear(),
                    this.getNotChallengeFriend(function (t) {
                        e.itemTemplate = e.bg.getChildByName("itemTemplate"),
                            e.moveLayer = e.bg.getChildByName("scr").getComponent(cc.ScrollView).content,
                            e.curData = [];
                        for (var i = 0; i < t.length; i++) {
                            var n = {};
                            n.data = t[i],
                                n.pos = -75 - 145 * i,
                                e.curData.push(n)
                        }
                        e.addNode()
                    })
            },
            addNode: function () {
                this.moveLayer.height = 145 * this.curData.length + 20,
                    this.moveLayer.height < 840 && (this.moveLayer.height = 840);
                var e = this
                    , t = new Object;
                t.initPoint = 0,
                    t.borderPos1 = 90,
                    t.borderPos2 = -930,
                    t.nodeDatas = this.curData,
                    t.createUIFun = function (t) {
                        var i = cc.instantiate(this.itemTemplate);
                        return i.addComponent("ChallengeInviteNode").initialize(t.data, e),
                            i.y = t.pos,
                            e.moveLayer.addChild(i),
                            i
                    }
                    ,
                    this.setData(t)
            },
            getNotChallengeFriend: function (e) {
                for (var t = heroData.challengeData.roomData, i = JSON.parse(JSON.stringify(friendsList)), n = 0; n < i.length; n++) {
                    for (var a = !1, o = 0; o < t.length; o++)
                        if (t[o].otherData && t[o].otherData.playerID === i[n].playerID) {
                            a = !0;
                            break
                        }
                    a && (i.splice(n, 1),
                        n--)
                }
                e && e(i)
            },
            clickClose: function () {
                this.destroyClass()
            },
            update: function () {
                null != this.curData && this.curData.length > 0 && this.updateView(this.moveLayer.y)
            }
        }),
            cc._RF.pop()
    }
        , {
        GameListLayer: "GameListLayer"
    }],
    ChallengeInviteNode: [function (e, t) {
        "use strict";
        cc._RF.push(t, "6a455ZhBxRDLobTZehZSpXU", "ChallengeInviteNode");
        var i = e("GameExternalImage");
        cc.Class({
            extends: cc.Component,
            properties: {
                data: null
            },
            onDestroy: function () {
                this.data = null
            },
            destroyClass: function () {
                null != this.node && (this.removeEvent(),
                    this.node.destroy())
            },
            addEvent: function () {
                this.node.getChildByName("playBtn").on(cc.Node.EventType.TOUCH_END, this.clickPlayBtn, this)
            },
            removeEvent: function () {
                this.node.getChildByName("playBtn").off(cc.Node.EventType.TOUCH_END, this.clickPlayBtn, this)
            },
            initialize: function (e) {
                this.addEvent(),
                    this.node.active = !0,
                    this.data = e;
                var t = this.node.getChildByName("head").getChildByName("icon")
                    , n = new i;
                n.loadImage(e.photo, null, t.width - 2, t.height - 2),
                    t.addChild(n),
                    this.node.getChildByName("name").getComponent(cc.Label).string = myGameGetShortName(this.data.name)
            },
            clickPlayBtn: function () {
                var e = getSendFriendData();
                e.data.score = 0,
                    e.data.targetID = this.data.playerID,
                    e.data.targetPhoto = this.data.photo,
                    e.data.targetName = this.data.name,
                    ccLog("data.data ", e.data),
                    gameSDK.challengeLeaderboard.inviteAppointFriend(e, function (e) {
                        heroData.gameMode = GameModelEnum.challenge,
                            heroData.challengeData.updateData(e),
                            sceneControl.turnFightScene()
                    })
            }
        }),
            cc._RF.pop()
    }
        , {
        GameExternalImage: "GameExternalImage"
    }],
    ChallengeLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "06cbdQC6ahDeIrQaYn/MJNI", "ChallengeLayer");
        var i = e("GameListLayer");
        cc.Class({
            extends: i,
            properties: {
                inviteBtn: null
            },
            destroyClass: function () {
                cc.director.getScene().getChildByName("main_prefab").active = !0,
                    this.clear(),
                    this.removeEvent(),
                    null != this.node && this.node.destroy()
            },
            start: function () {
                cc.director.getScene().getChildByName("main_prefab").active = !1
            },
            addEvent: function () {
                this.node.getChildByName("closeBtn").on(cc.Node.EventType.TOUCH_END, this.clickClose, this),
                    this.node.getChildByName("invitebtn").on(cc.Node.EventType.TOUCH_END, this.clickInvite, this),
                    engine.eventM.on(event_id.REMOVE_CHALLENGENODE, this.timeOverCallback, this)
            },
            removeEvent: function () {
                this.node.getChildByName("closeBtn").off(cc.Node.EventType.TOUCH_END, this.clickClose, this),
                    this.node.getChildByName("invitebtn").off(cc.Node.EventType.TOUCH_END, this.clickInvite, this),
                    engine.eventM.off(event_id.REMOVE_CHALLENGENODE, this.timeOverCallback, this),
                    this.inviteBtn = null
            },
            initialize: function () {
                this.inviteBtn = this.node.getChildByName("invitebtn"),
                    this.addEvent(),
                    this.clear(),
                    this.moveLayer = this.node.getChildByName("scr").getComponent(cc.ScrollView).content;
                var e = heroData.challengeData.roomData;
                this.refreshGameList(e)
            },
            fmtContextData: function (e) {
                for (var t = Math.floor((new Date).getTime()), i = 0; i < e.length; i++)
                    t - e[i].time >= heroData.challengeData.saveDataTime && (e.splice(i, 1),
                        i--)
            },
            refreshGameList: function (e) {
                this.clear(),
                    this.curData = [];
                for (var t = 0; t < e.length; t++) {
                    var i = {};
                    i.data = e[t],
                        i.pos = -90 - 200 * t,
                        this.curData.push(i)
                }
                this.addNode()
            },
            addNode: function () {
                this.moveLayer.height = 200 * this.curData.length + 20,
                    this.moveLayer.height < 910 && (this.moveLayer.height = 910);
                var e = this
                    , t = new Object;
                t.initPoint = 0,
                    t.borderPos1 = 90,
                    t.borderPos2 = -1e3,
                    t.nodeDatas = this.curData,
                    t.createUIFun = function (t) {
                        var i = engine.memory.getPrefab(nextLoadPrefab.challenge_node_prefab);
                        return i.addComponent("ChallengeNode").initialize(t.data),
                            i.y = t.pos,
                            e.moveLayer.addChild(i),
                            i
                    }
                    ,
                    this.setData(t)
            },
            update: function () {
                null != this.curData && this.curData.length > 0 && this.updateView(this.moveLayer.y)
            },
            refreshCupNum: function () {
                this.node.getChildByName("cupCount").getComponent(cc.Label).string = "11"
            },
            clickClose: function () {
                this.destroyClass()
            },
            clickInvite: function () {
                openWindowLayer(openTypeEm.challengeInvite)
            },
            lateUpdate: function () {
                this.inviteBtn && (this.inviteBtn.active = heroData.challengeData.roomData.length < heroData.challengeData.maxRoomCount)
            },
            timeOverCallback: function (e) {
                var t = this;
                heroData.challengeData.clearRoomData(e),
                    gameSDK.challengeLeaderboard.clearRoomData(e, function (e) {
                        t.refreshGameList(e)
                    })
            }
        }),
            cc._RF.pop()
    }
        , {
        GameListLayer: "GameListLayer"
    }],
    ChallengeNode: [function (e, t) {
        "use strict";
        cc._RF.push(t, "25846XmBL5K/6Un2GevbDOJ", "ChallengeNode"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    data: null,
                    timeLab: null,
                    myData: null,
                    otherData: null
                },
                onDestroy: function () {
                    this.data = null,
                        this.otherData = null,
                        this.timeLab = null
                },
                destroyClass: function () {
                    this.clear(),
                        this.removeEvent(),
                        null != this.node && this.node.destroy()
                },
                addEvent: function () {
                    this.bg.getChildByName("btn_start").on(cc.Node.EventType.TOUCH_END, this.clickStart, this)
                },
                removeEvent: function () {
                    this.bg.getChildByName("btn_start").off(cc.Node.EventType.TOUCH_END, this.clickStart, this)
                },
                initialize: function (e) {
                    this.bg = this.node.getChildByName("bg"),
                        this.addEvent(),
                        this.data = e,
                        this.otherData = e.otherData,
                        this.timeLab = this.bg.getChildByName("timeLab").getComponent(cc.Label),
                        this.refreshMeInfo(),
                        this.refreshOtherInfo(),
                        this.refreshButton(),
                        this.timeSchedule(),
                        this.schedule(this.timeSchedule.bind(this), 1, cc.macro.REPEAT_FOREVER, 0)
                },
                refreshMeInfo: function () {
                    var e = this.bg.getChildByName("me")
                        , t = e.getChildByName("headMask").getChildByName("icon");
                    e.getChildByName("score").getComponent(cc.Label).string = heroData.challengeData.getMyScoreByRoom(this.data.roomID) + "",
                        GameTool.addImage(gameSDK.sdkPlayInfo.photo, t)
                },
                refreshOtherInfo: function () {
                    var e = this
                        , t = this.data.otherData
                        , i = this.bg.getChildByName("other")
                        , n = i.getChildByName("headMask").getChildByName("icon")
                        , a = i.getChildByName("score").getComponent(cc.Label);
                    t ? (gameSDK.challengeLeaderboard.getChallengeRankScore(t.playerID, function (t) {
                        t += heroData.challengeData.getOtherAddScore(e.data.roomID),
                            a.string = t + ""
                    }),
                        GameTool.addImage(t.photo, n)) : (GameTool.addImage("headimg/pk_earth", n),
                            a.string = "")
                },
                refreshButton: function () { },
                clickStart: function () {
                    heroData.gameMode = GameModelEnum.challenge,
                        heroData.challengeData.updateData(this.data),
                        sceneControl.turnFightScene()
                },
                timeSchedule: function () {
                    var e = (new Date).getTime()
                        , t = heroData.challengeData.saveDataTime - (e - this.data.time);
                    t <= 0 ? (this.timeLab.string = "",
                        this.unschedule(this.timeSchedule, this),
                        this.timeOverCallback()) : this.timeLab.string = engine.gameTime.formatTime(t)
                },
                timeOverCallback: function () {
                    engine.eventM.emit(event_id.REMOVE_CHALLENGENODE, this.data.roomID)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    ChallengeOverLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "bf9c0jP5ZRHZbO+pMzt0sj+", "ChallengeOverLayer");
        var i = e("GameListLayer");
        cc.Class({
            extends: i,
            properties: {
                itemTemplate: null
            },
            onDestroy: function () {
                this.itemTemplate = null
            },
            removeEvent: function () {
                this.bg.getChildByName("continueBtn").off(cc.Node.EventType.TOUCH_END, this.clickContinue, this),
                    this.bg.getChildByName("playBtn").off(cc.Node.EventType.TOUCH_END, this.clickPlayWithFriend, this)
            },
            addEvent: function () {
                this.bg.getChildByName("continueBtn").on(cc.Node.EventType.TOUCH_END, this.clickContinue, this),
                    this.bg.getChildByName("playBtn").on(cc.Node.EventType.TOUCH_END, this.clickPlayWithFriend, this)
            },
            destroClass: function () {
                this.removeEvent(),
                    this.node.destroy()
            },
            initialize: function () {
                var e = this;
                this.bg = this.node.getChildByName("bg"),
                    this.addEvent(),
                    this.clear(),
                    this.getNotChallengeFriend(function (t) {
                        if (!t || t.length < 1)
                            e.bg.getChildByName("black3").active = !1;
                        else {
                            e.itemTemplate = e.bg.getChildByName("itemTemplate"),
                                e.moveLayer = e.bg.getChildByName("scr").getComponent(cc.ScrollView).content,
                                e.curData = [];
                            for (var i = 0; i < t.length; i++) {
                                var n = {};
                                n.data = t[i],
                                    n.pos = -75 - 145 * i,
                                    e.curData.push(n)
                            }
                            e.addNode()
                        }
                    }),
                    this.bg.getChildByName("friendName").getComponent(cc.Label).string = heroData.challengeData.otherData.name,
                    heroData.challengeData.setMyScoreByRoom(fightControl.challengeScore),
                    fightControl.levelOverControl.customLevelEvent()
            },
            addNode: function () {
                this.moveLayer.height = 145 * this.curData.length + 20,
                    this.moveLayer.height < 300 && (this.moveLayer.height = 300);
                var e = this
                    , t = new Object;
                t.initPoint = 0,
                    t.borderPos1 = 75,
                    t.borderPos2 = -372.5,
                    t.nodeDatas = this.curData,
                    t.createUIFun = function (t) {
                        var i = cc.instantiate(this.itemTemplate);
                        return i.addComponent("ChallengeOverNode").initialize(t.data, e),
                            i.y = t.pos,
                            e.moveLayer.addChild(i),
                            i
                    }
                    ,
                    this.setData(t)
            },
            update: function () {
                null != this.curData && this.curData.length > 0 && this.updateView(this.moveLayer.y)
            },
            clickContinue: function () {
                this.destroClass(),
                    sceneControl.turnMainScene()
            },
            clickPlayWithFriend: function () {
                sceneControl.turnFightScene()
            },
            getNotChallengeFriend: function (e) {
                for (var t = heroData.challengeData.roomData, i = JSON.parse(JSON.stringify(friendsList)), n = 0; n < i.length; n++) {
                    for (var a = !1, o = 0; o < t.length; o++)
                        if (t[o].otherData && t[o].otherData.playerID === i[n].playerID) {
                            a = !0;
                            break
                        }
                    a && (i.splice(n, 1),
                        n--)
                }
                e && e(i)
            }
        }),
            cc._RF.pop()
    }
        , {
        GameListLayer: "GameListLayer"
    }],
    ChallengeOverNode: [function (e, t) {
        "use strict";
        cc._RF.push(t, "8206dB2dOBA6JYHrm8C+qjM", "ChallengeOverNode");
        var i = e("GameExternalImage");
        cc.Class({
            extends: cc.Component,
            properties: {
                data: null
            },
            onDestroy: function () {
                this.data = null
            },
            destroyClass: function () {
                null != this.node && (this.removeEvent(),
                    this.node.destroy())
            },
            addEvent: function () {
                this.node.getChildByName("playBtn").on(cc.Node.EventType.TOUCH_END, this.clickPlayBtn, this)
            },
            removeEvent: function () {
                this.node.getChildByName("playBtn").off(cc.Node.EventType.TOUCH_END, this.clickPlayBtn, this)
            },
            initialize: function (e) {
                this.addEvent(),
                    this.node.active = !0,
                    this.data = e;
                var t = this.node.getChildByName("head").getChildByName("icon")
                    , n = new i;
                n.loadImage(e.photo, null, t.width - 2, t.height - 2),
                    t.addChild(n),
                    this.node.getChildByName("name").getComponent(cc.Label).string = myGameGetShortName(this.data.name)
            },
            clickPlayBtn: function () {
                var e = getSendFriendData();
                e.data.score = 0,
                    e.data.targetID = this.data.playerID,
                    e.data.targetPhoto = this.data.photo,
                    e.data.targetName = this.data.name,
                    gameSDK.challengeLeaderboard.inviteAppointFriend(e, function (e) {
                        heroData.gameMode = GameModelEnum.challenge,
                            heroData.challengeData.updateData(e),
                            sceneControl.turnFightScene()
                    })
            }
        }),
            cc._RF.pop()
    }
        , {
        GameExternalImage: "GameExternalImage"
    }],
    ChallengeSurpassLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "15171RWVRRMapuQDsJcO+SU", "ChallengeSurpassLayer"),
            e("GameExternalImage"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    isCanclick: !1
                },
                removeEvent: function () {
                    this.node.getChildByName("mask").off(cc.Node.EventType.TOUCH_END, this.clickMask, this)
                },
                addEvent: function () {
                    this.node.getChildByName("mask").on(cc.Node.EventType.TOUCH_END, this.clickMask, this)
                },
                destroClass: function () {
                    this.removeEvent(),
                        openWindowLayer(openTypeEm.challengeOver),
                        this.node.destroy()
                },
                initialize: function () {
                    var e = this;
                    this.addEvent();
                    var t = this.node.getChildByName("acitveNode")
                        , i = t.getChildByName("me")
                        , n = t.getChildByName("other")
                        , a = n.getPosition().clone()
                        , o = i.getPosition().clone()
                        , r = heroData.challengeData.otherScore + ""
                        , s = heroData.challengeData.getCurRoomScore()
                        , c = fightControl.challengeScore > s ? fightControl.challengeScore : s
                        , l = c > r ? 1 : 2
                        , h = heroData.challengeData.lastMaxChallengeScore > r ? 1 : 2;
                    i.getChildByName("name").getComponent(cc.Label).string = myGameGetShortName(gameSDK.sdkPlayInfo.name),
                        i.getChildByName("score").getComponent(cc.Label).string = c + "",
                        i.getChildByName("ranImg").getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "rank_" + l);
                    var d = i.getChildByName("head").getChildByName("icon");
                    GameTool.addImage(gameSDK.sdkPlayInfo.photo, d),
                        n.getChildByName("name").getComponent(cc.Label).string = myGameGetShortName(heroData.challengeData.otherData.name),
                        n.getChildByName("score").getComponent(cc.Label).string = r + "",
                        n.getChildByName("ranImg").getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "rank_" + (1 === l ? 2 : 1));
                    var u = n.getChildByName("head").getChildByName("icon");
                    GameTool.addImage(heroData.challengeData.otherData.photo, u),
                        l < h ? cc.tween(t).to(1, {
                            opacity: 255
                        }).call(function () {
                            m()
                        }).start() : (1 === l && (i.position = a,
                            n.position = o),
                            cc.tween(t).to(1, {
                                opacity: 255
                            }).call(function () {
                                e.isCanClick = !0,
                                    setTimeout(function () {
                                        e.destroClass()
                                    }, 1e3)
                            }).start());
                    var m = function () {
                        cc.tween(i).to(.2, {
                            position: a
                        }).start(),
                            cc.tween(n).to(.2, {
                                position: o
                            }).call(function () {
                                e.isCanClick = !0,
                                    setTimeout(function () {
                                        e.destroClass()
                                    }, 1e3)
                            }).start()
                    }
                },
                clickMask: function () { }
            }),
            cc._RF.pop()
    }
        , {
        GameExternalImage: "GameExternalImage"
    }],
    ChooseLevelLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "01dc2RNqIdI4YGEcctRcm92", "ChooseLevelLayer"),
            cc._RF.pop()
    }
        , {}],
    ChooseLevelNode: [function (e, t) {
        "use strict";
        cc._RF.push(t, "f2ec2olwjlFP47sHhPcbBAB", "ChooseLevelNode"),
            cc._RF.pop()
    }
        , {}],
    ChooseMessengerLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "9d8610i8AtGCaQZYt+Zx1f7", "ChooseMessengerLayer"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                onDestroy: function () { },
                destroyNode: function () {
                    this.node.getChildByName("openbtn").off(cc.Node.EventType.TOUCH_END, this.clickOpenBtnFun, this),
                        this.node.destroy()
                },
                initialize: function () {
                    this.node.getChildByName("openbtn").on(cc.Node.EventType.TOUCH_END, this.clickOpenBtnFun, this)
                },
                clickOpenBtnFun: function () {
                    var e = this
                        , t = function () {
                            botData.openSubscribeBot = 1,
                                gameSDK.faceBookBot.sendMessengerRobot(),
                                e.destroyNode();
                            var t = []
                                , i = getGlobleDic(12);
                            t.push(getItemConfig(itemIDConfig.gem, i)),
                                sceneControl.showReward(t),
                                heroData.addGem(i),
                                heroData.saveData()
                        }
                        , i = function () {
                            botData.openSubscribeBot = 0,
                                gameSDK.faceBookBot.sendMessengerRobot(),
                                e.destroyNode()
                        }
                        , n = this.node.getChildByName("msg_box").getComponent(sp.Skeleton);
                    n.loop = !1,
                        n.animation = "open",
                        n.setCompleteListener(function () {
                            gameSDK.faceBookBot.subscribeBotAsync(t, i)
                        })
                }
            }),
            cc._RF.pop()
    }
        , {}],
    CollectData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "07876yTQEBPfYj8JNPkWxvC", "CollectData"),
            window.collectTypeEm = cc.Enum({
                grid: "grid",
                dragonfly: "dragonfly",
                egg: "egg",
                bonfire: "bonfire",
                boss: "boss",
                birdcage: "birdcage",
                flower: "flower",
                clawball: "clawball"
            }),
            window.specialGridType = {
                birdcage: 1,
                flower: 101,
                magic: 1
            },
            cc.Class({
                properties: {
                    dragonfly: null,
                    egg: null,
                    bonfire: null,
                    birdcage: null,
                    flower: null,
                    clawball: null,
                    boss: null,
                    grid: null,
                    collectObj: null
                },
                initialize: function () { },
                initCollectInfo: function () {
                    this.collectObj = null,
                        this.needCollcetTypeNum = 0;
                    var e = getDicData(dataJson.level_json, fightControl.curLvDicID);
                    for (var t in collectTypeEm) {
                        var i = 0;
                        null == this[collectTypeEm[t]] && (this[collectTypeEm[t]] = {});
                        var n = this[collectTypeEm[t]];
                        switch (collectTypeEm[t]) {
                            case collectTypeEm.dragonfly:
                                i = e.BD_Num || this.getNumByConfig([gridTypeEm.dragonfly]);
                                break;
                            case collectTypeEm.egg:
                                i = e.EGG_Num || this.getNumByConfig([gridTypeEm.egg]);
                                break;
                            case collectTypeEm.bonfire:
                                i = e.FIRE_Num || this.getNumByConfig([gridTypeEm.bonfire]);
                                break;
                            case collectTypeEm.birdcage:
                                i = e.CAGE_Num || this.getNumByConfig([gridTypeEm.birdcage]);
                                break;
                            case collectTypeEm.flower:
                                i = e.FLOWER_Num || this.getNumByConfig([gridTypeEm.flower]);
                                break;
                            case collectTypeEm.clawball:
                                i = e.Claw_Num || this.getNumByConfig([gridTypeEm.clawball1, gridTypeEm.clawball2, gridTypeEm.clawball3, gridTypeEm.clawball4])
                        }
                        i > 0 && this.setLevelCollectInfo(collectTypeEm[t], i),
                            n.name = collectTypeEm[t],
                            n.curNum = n.needNum = i
                    }
                    this.birdcageGridArr = [],
                        this.flowerGridArr = [],
                        this.birdcage.needNum > 0 && (this.birdcageGridArr = fightControl.createSpecialElement(this.birdcage.needNum, specialGridType.birdcage)),
                        this.flower.needNum > 0 && (this.flowerGridArr = fightControl.createSpecialElement(this.flower.needNum, specialGridType.flower))
                },
                setLevelCollectInfo: function (e, t) {
                    null == this.collectObj && (this.collectObj = {});
                    var i = {};
                    this.collectObj[e] = i,
                        i.curNum = i.needNum = t,
                        i.name = e,
                        this.needCollcetTypeNum++
                },
                isCollectAll: function () {
                    for (var e in this.collectObj)
                        if (this.collectObj[e].curNum > 0)
                            return !1;
                    return !0
                },
                collectTargetByType: function (e, t) {
                    this.needCollcetTypeNum <= 0 || !cc.sys.isObjectValid(this.collectObj) || !cc.sys.isObjectValid(this.collectObj[e]) || this.collectObj[e].curNum <= 0 || (this.collectObj[e].curNum -= t,
                        this[e].curNum -= t,
                        this[e].curNum <= 0 && this.needCollcetTypeNum--)
                },
                getCollectNumByType: function (e) {
                    return cc.sys.isObjectValid(this.collectObj) && cc.sys.isObjectValid(this.collectObj[e]) ? this.collectObj[e].curNum : 0
                },
                refeshDragonflyNum: function () {
                    var e = this.getCollectNumByType(collectTypeEm.dragonfly);
                    if (!(e <= 0))
                        for (var t = fightControl.mapData.gridArr, i = 0; i < t.length; i++)
                            for (var n = 0; n < t[i].length; n++) {
                                var a = 0;
                                if (t[i][n].otherType === gridTypeEm.dragonfly) {
                                    for (var o = i - 1; o >= 0; o--)
                                        t[o][n].isEmpty() && a++;
                                    a === i && e--
                                }
                            }
                },
                collectClawball: function (e) {
                    var t = 0;
                    switch (e) {
                        case gridTypeEm.clawball1:
                            t = 2;
                            break;
                        case gridTypeEm.clawball2:
                            t = 4
                    }
                    this.collectTargetByType(collectTypeEm.clawball, t)
                },
                getNumByConfig: function (e) {
                    if (1 !== debugtest.appointLevel || !e)
                        return 0;
                    for (var t = 0, i = 0; i < e.length; i++) {
                        var n = new RegExp(e[i] + "", "g")
                            , a = fightControl.mapConfig.match(n);
                        a && a.length && (a[0] == gridTypeEm.clawball2 || a[0] == gridTypeEm.clawball4 ? t += 2 * a.length : t += a.length)
                    }
                    return t
                }
            }),
            cc._RF.pop()
    }
        , {}],
    ComboAction: [function (e, t) {
        "use strict";
        cc._RF.push(t, "a2eb7pADk9O1pfBhUbovw9o", "ComboAction"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                resetCombo: function (e) {
                    var t = this;
                    fightControl.curCombo = -1,
                        e && fightControl.levelBlood > 0 && (this.addNoComboAction(e),
                            fightControl.levelBlood--,
                            this.parentLayer.refreshLevelBlood(!0),
                            fightControl.levelBlood <= 0 && (this.levelEndFun(),
                                setTimeout(function () {
                                    t.parentLayer.endGame(endGameTypeEm.noBlood)
                                }, 1e3)))
                },
                addNoComboAction: function (e) {
                    var t = this.getPosByGrid(e)
                        , i = new cc.Node;
                    i.opacity = 0,
                        i.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "fightblood1_big"),
                        i.setPosition(t.x, t.y + 40),
                        this.node.addChild(i, fightZIndexConfig.scoreZIndex);
                    var n = cc.spawn(cc.fadeIn(.2), cc.moveBy(.8, 0, 40))
                        , a = new cc.Node;
                    a.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "fightbloodsub1"),
                        a.x = 50,
                        i.addChild(a),
                        i.runAction(cc.sequence(n, cc.fadeOut(1), cc.removeSelf()))
                },
                addComboAction: function (e) {
                    if (null != e) {
                        var t = this.getComponent("FightMapLayer");
                        if (fightControl.curCombo > 0) {
                            var i = t.getPosByGrid(e)
                                , n = new cc.Node;
                            n.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(needLoadLanguageImage.language1, "combo"),
                                n.x = i.x,
                                n.x > 200 && (n.x = 200),
                                n.y = i.y + 60,
                                this.node.addChild(n, fightZIndexConfig.scoreZIndex),
                                n.runAction(cc.sequence(cc.moveBy(1, 0, 100), cc.removeSelf()));
                            var a = new cc.Node
                                , o = a.addComponent("GameArtWord");
                            o.indentationWidth = -4,
                                o.fontName = "fnttype7",
                                o.styleType = ArtWordStyleType.left,
                                o.fontSpriteAtlas = engine.memory.getSpriteAtlas(loginLoadImage.publicimg1),
                                o.setString("" + fightControl.curCombo),
                                a.x = n.x + 86,
                                a.y = n.y,
                                this.node.addChild(a, fightZIndexConfig.scoreZIndex),
                                a.runAction(cc.sequence(cc.moveBy(1, 0, 100), cc.removeSelf())),
                                this.addComboScoreAction(i)
                        }
                    }
                },
                addComboScoreAction: function (e, t, i) {
                    var n = t || fightControl.getComboScore()
                        , a = new cc.Node;
                    a.anchorX = 0,
                        a.x = e.x + 86,
                        a.y = e.y + 100;
                    var o = a.addComponent(cc.Label);
                    o.string = "+" + n,
                        o.font = engine.memory.getFont(needLoadFont.fntttf1_font),
                        o.fontSize = 50,
                        o.color = cc.color("#E8F4FC");
                    var r = a.addComponent(cc.LabelShadow);
                    r.color = cc.Color.BLACK,
                        r.offset = cc.v2(-2, -2),
                        fightUILayer.node.addChild(a, fightZIndexConfig.lineZIndex + 10);
                    var s = cc.v2(a.x, a.y)
                        , c = cc.v2(120, 678 + this.node.y);
                    heroData.gameMode === GameModelEnum.challenge && (c = cc.v2(100, 565 + this.node.y));
                    var l = cc.v2((s.x + c.x) / 2 + c.sub(s).mag() / 2, (s.y + c.y) / 2);
                    l.x = l.x > cc.winSize.width / 2 ? cc.winSize.width / 2 - 10 : l.x;
                    var h = [s, l, c];
                    a.runAction(cc.sequence(cc.spawn(cc.bezierTo(1, h), cc.scaleTo(1, .5)), cc.callFunc(function () {
                        fightControl.fightAddScore(n),
                            fightUILayer.refreshScore(n),
                            i && i()
                    }), cc.delayTime(.5), cc.removeSelf()))
                },
                addComboGoodTxt: function () {
                    var e = ["nice", "great", "verygood", "perfect"]
                        , t = [soundurl.combo10, soundurl.combo15, soundurl.combo20, soundurl.combo20];
                    if (fightControl.curCombo > 0 && fightControl.curCombo % getGlobleDic(17) == 0) {
                        var i = fightControl.curCombo / getGlobleDic(17) - 1;
                        i >= e.length && (i = e.length - 1),
                            null != t[i] && engine.gameSound.playEffect(t[i]);
                        var n = new cc.Node;
                        this.node.addChild(n, fightZIndexConfig.scoreZIndex),
                            n.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(needLoadLanguageImage.language1, e[i]),
                            n.y = 300,
                            n.scale = 0;
                        var a = cc.spawn(cc.fadeOut(.2), cc.scaleTo(.2, .6));
                        n.runAction(cc.sequence(cc.scaleTo(.2, 1.5), cc.scaleTo(.1, .9), cc.scaleTo(.1, 1), cc.delayTime(.4), a, cc.removeSelf()))
                    }
                },
                getCustomChallengeScore: function () {
                    fightControl.challengeLevelCount++;
                    var e = heroData.challengeData.customChallengeScore * fightControl.challengeLevelCount;
                    this.addComboScoreAction(new cc.v2(-200, this.node.y), e, function () {
                        setTimeout(function () {
                            fightControl.levelOverControl.customLevelEvent(),
                                engine.eventM.emit(event_id.GOTO_NEXT_CUSTOM)
                        }, 1e3)
                    })
                },
                showComboTotalAction: function (e) {
                    var t = this.getComponent("FightMapLayer")
                        , i = new cc.Node;
                    i.y = -120,
                        this.node.addChild(i, fightZIndexConfig.scoreZIndex);
                    var n = new cc.Node;
                    n.x = -22,
                        n.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(needLoadLanguageImage.language1, "bestcombo"),
                        i.addChild(n);
                    var a = new cc.Node;
                    a.x = 153,
                        a.scale = .8;
                    var o = a.addComponent("GameArtWord");
                    o.indentationWidth = -26,
                        o.fontName = "fnttype9",
                        o.styleType = ArtWordStyleType.left,
                        o.fontSpriteAtlas = engine.memory.getSpriteAtlas(loginLoadImage.publicimg1),
                        o.setString("" + this.maxComboNum),
                        i.addChild(a);
                    var r = new cc.Node;
                    r.x = -5,
                        r.y = -65;
                    var s = r.addComponent("GameArtWord");
                    s.indentationWidth = -26,
                        s.fontName = "fnttype9",
                        s.styleType = ArtWordStyleType.middle,
                        s.fontSpriteAtlas = engine.memory.getSpriteAtlas(loginLoadImage.publicimg1),
                        s.setString("+" + e),
                        i.addChild(r),
                        i.scale = 0;
                    var c = cc.spawn(cc.moveTo(1, 0, 607), cc.sequence(cc.delayTime(.6), cc.fadeIn(.4)));
                    i.runAction(cc.sequence(cc.scaleTo(.4, 1.1), cc.scaleTo(.2, .9), cc.scaleTo(.2, 1), cc.delayTime(1.2), c, cc.callFunc(function () {
                        t.parentLayer.refreshScore(),
                            t.addScoreAction(null, cc.v2(0, 607), e),
                            setTimeout(function () {
                                t.customEnd()
                            }, 800),
                            i.destroy()
                    })))
                }
            }),
            cc._RF.pop()
    }
        , {}],
    ConveyBeltCom: [function (e, t) {
        "use strict";
        cc._RF.push(t, "665f1E4N7ZGprzG0j1HuLf7", "ConveyBeltCom");
        var i = cc.Enum({
            top: 1,
            down: 2,
            left: 3,
            right: 4,
            leftTop: 5,
            rightTop: 6,
            leftDown: 7,
            rightDown: 8,
            topLeft: 9,
            topRight: 10,
            downLeft: 11,
            downRight: 12
        });
        cc.Class({
            extends: cc.Component,
            properties: {
                conveyBeltNodeArr: null
            },
            onDestroy: function () {
                this.conveyBeltNodeArr = null
            },
            initialize: function () {
                this.conveyBeltNodeArr = []
            },
            updateInfo: function () {
                this.clearConveyBeltNode(),
                    this.addConveyBeltNode()
            },
            clearConveyBeltNode: function () {
                for (var e = 0; e < this.conveyBeltNodeArr.length; e++) {
                    var t = this.conveyBeltNodeArr[e];
                    cc.sys.isObjectValid(t) && (t.destroy(),
                        this.conveyBeltNodeArr[e] = null)
                }
                this.conveyBeltNodeArr = []
            },
            addConveyBeltNode: function () {
                for (var e = this.getComponent("FightMapLayer"), t = fightControl.conveyBeltData.conveyArr, i = 0; i < t.length; i++)
                    for (var n = 0; n < t[i].length; n++) {
                        var a = t[i][n];
                        if (null != t[i][n] && null != t[i][n].next && null != t[i][n].last) {
                            var o = new cc.Node;
                            o.scale = 1.1;
                            var r = this.getConveyNodeDir(a);
                            o.addComponent(cc.Sprite).spriteFrame = this.getConveySprite(r),
                                o.setPosition(e.getPosByGrid({
                                    x: n,
                                    y: i
                                })),
                                o.angle = this.getConveyNodeAngle(r),
                                this.node.addChild(o, fightZIndexConfig.conveyZIndex),
                                this.conveyBeltNodeArr.push(o)
                        }
                    }
            },
            getConveyNodeDir: function (e) {
                var t = []
                    , n = function (e, t) {
                        var i = 0;
                        return t.x === e.x ? i = t.y > e.y ? 2 : 1 : t.y === e.y && (i = t.x > e.x ? 4 : 3),
                            i
                    };
                t.push(n(e.last, e.pos)),
                    t.push(n(e.pos, e.next));
                var a = 0;
                switch (t[0]) {
                    case 1:
                        1 === t[1] || 0 === t[1] ? a = i.top : 3 === t[1] ? a = i.topLeft : 4 === t[1] && (a = i.topRight);
                        break;
                    case 2:
                        2 === t[1] || 0 === t[1] ? a = i.down : 3 === t[1] ? a = i.downLeft : 4 === t[1] && (a = i.downRight);
                        break;
                    case 3:
                        1 === t[1] ? a = i.leftTop : 2 === t[1] ? a = i.leftDown : 3 !== t[1] && 0 !== t[1] || (a = i.left);
                        break;
                    case 4:
                        1 === t[1] ? a = i.rightTop : 2 === t[1] ? a = i.rightDown : 4 !== t[1] && 0 !== t[1] || (a = i.right)
                }
                return a
            },
            getConveySprite: function (e) {
                var t = "";
                switch (e) {
                    case i.top:
                    case i.down:
                    case i.left:
                    case i.right:
                        t = engine.memory.getSpriteFrame(nextLoadImage.fightimg2, "conveyBelt1");
                        break;
                    case i.leftTop:
                    case i.topRight:
                    case i.rightDown:
                    case i.downLeft:
                        t = engine.memory.getSpriteFrame(nextLoadImage.fightimg2, "conveyBelt3");
                        break;
                    case i.leftDown:
                    case i.topLeft:
                    case i.rightTop:
                    case i.downRight:
                        t = engine.memory.getSpriteFrame(nextLoadImage.fightimg2, "conveyBelt2")
                }
                return t
            },
            getConveyNodeAngle: function (e) {
                var t = 0;
                switch (e) {
                    case i.top:
                    case i.topRight:
                    case i.leftDown:
                        t = 0;
                        break;
                    case 2:
                    case i.down:
                    case i.downLeft:
                    case i.rightTop:
                        t = 180;
                        break;
                    case 3:
                    case i.left:
                    case i.downRight:
                    case i.leftTop:
                        t = 90;
                        break;
                    case 4:
                    case i.right:
                    case i.rightDown:
                    case i.topLeft:
                        t = 270
                }
                return t
            },
            conveyBeltMove: function () {
                var e = this
                    , t = this.getComponent("FightMapLayer");
                fightControl.conveyBeltData.conveyBeltMove();
                var i = fightControl.conveyBeltData.firstPos
                    , n = t.getGridNodeComByPos(i);
                this.haveRunCallback = !1,
                    function a(o) {
                        var r = fightControl.mapData.getGridDataByPos(o)
                            , s = fightControl.mapData.getGridDataByPos(r.lastPos)
                            , c = t.getPosByGrid(o)
                            , l = !1;
                        isSamePos(i, s.gridPos) ? (t.gridNodeComArr[o.y][o.x] = n,
                            n.gridPos = o,
                            l = !0) : (e.changeGridNode(r.gridPos, r.lastPos),
                                a(r.lastPos)),
                            r.lastPos = null,
                            t.getGridNodeComByPos(o).showMoveAction(c, e.moveOver.bind(e), l)
                    }(i)
            },
            changeGridNode: function (e, t) {
                var i = this.getComponent("FightMapLayer");
                if (null != e.y && null != e.x && null != t.y && null != t.x) {
                    var n = i.gridNodeComArr[t.y][t.x];
                    i.gridNodeComArr[t.y][t.x] = i.gridNodeComArr[e.y][e.x],
                        i.gridNodeComArr[e.y][e.x] = n;
                    var a = i.gridNodeComArr[t.y][t.x].gridPos;
                    i.gridNodeComArr[t.y][t.x].gridPos = i.gridNodeComArr[e.y][e.x].gridPos,
                        i.gridNodeComArr[e.y][e.x].gridPos = a
                }
            },
            moveOver: function () {
                if (!this.haveRunCallback) {
                    var e = this;
                    this.haveRunCallback = !0,
                        setTimeout(function () {
                            var t = e.getComponent("FightMapLayer");
                            t.isCanClick = !0;
                            var i = t.checkGameStatus(null);
                            engine.eventM.emit(event_id.MOVE_GRID_OVER, i)
                        }, 100)
                }
            }
        }),
            cc._RF.pop()
    }
        , {}],
    ConveyBeltData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "1f2a7fCOj9HGp4BgqPOs5/X", "ConveyBeltData"),
            cc.Class({
                properties: {
                    firstPos: null,
                    conveyArr: null,
                    endPos: null
                },
                initialize: function () {
                    this.conveyArr = []
                },
                fmtConveyConfig: function () {
                    this.clearData();
                    var e = fightControl.mapData;
                    if (this.veerTimes = 0,
                        fightControl.conveyBeltConfig) {
                        for (var t = null, i = fightControl.conveyBeltConfig.split("|"), n = 0; n < e.mapHeight; n++) {
                            this.conveyArr[n] = [];
                            for (var a = 0; a < e.mapWight; a++)
                                1 == i[n * e.mapWight + a] ? (this.conveyArr[n][a] = {
                                    pos: {
                                        x: a,
                                        y: n
                                    }
                                },
                                    t || (this.firstPos = t = {
                                        x: a,
                                        y: n
                                    })) : this.conveyArr[n][a] = null
                        }
                        var o = fightControl.conveyBeltDir - 1;
                        this.fmtConveyData(t, [[2, 4, 1, 3], [4, 2, 3, 1]][o], 0)
                    }
                },
                clearData: function () {
                    if (this.firstPos = null,
                        this.endPos = null,
                        null != this.conveyArr)
                        for (var e = 0; e < this.conveyArr.length; e++)
                            for (var t = 0; t < this.conveyArr[t].length; t++)
                                this.conveyArr[e][t] = null;
                    this.conveyArr = []
                },
                fmtConveyData: function (e, t, i) {
                    var n = fightControl.mapData;
                    i %= t.length;
                    var a = JSON.parse(JSON.stringify(e));
                    switch (t[i]) {
                        case 1:
                            a.y -= 1;
                            break;
                        case 2:
                            a.y += 1;
                            break;
                        case 3:
                            a.x -= 1;
                            break;
                        case 4:
                            a.x += 1
                    }
                    if (a.y < 0 || a.y >= n.mapHeight || a.x < 0 || a.x >= n.mapWeight || null == this.conveyArr[a.y][a.x])
                        this.veerTimes++,
                            this.veerTimes < 5 ? this.fmtConveyData(e, t, ++i) : (this.conveyArr[e.y][e.x].next = this.firstPos,
                                this.conveyArr[this.firstPos.y][this.firstPos.x].last = e);
                    else if (null != this.conveyArr[a.y][a.x]) {
                        var o = this.conveyArr[e.y][e.x].last;
                        if (o && isSamePos(o, a))
                            return this.veerTimes++,
                                void this.fmtConveyData(e, t, ++i);
                        this.veerTimes = 0,
                            this.conveyArr[e.y][e.x].next = a,
                            this.conveyArr[a.y][a.x].last = e,
                            isSamePos(a, this.firstPos) || this.fmtConveyData(a, t, i)
                    }
                },
                conveyBeltMove: function () {
                    var e = this
                        , t = fightControl.mapData.gridArr
                        , i = JSON.parse(JSON.stringify(this.firstPos))
                        , n = t[i.y][i.x];
                    (function i(a) {
                        var o = e.getConveyDataPos(a).last;
                        isSamePos(o, e.firstPos) ? (t[a.y][a.x] = n,
                            t[a.y][a.x].gridPos = a) : (fightControl.mapData.tempGridByPos(a, o),
                                i(o))
                    }
                    )(i)
                },
                getConveyDataPos: function (e) {
                    return e && null != e.x && null != e.y ? this.conveyArr[e.y][e.x] : null
                },
                getConveyDataGridNum: function () {
                    for (var e = 0, t = 0; t < this.conveyArr.length; t++)
                        for (var i = 0; i < this.conveyArr[t].length; i++)
                            null != this.conveyArr[t][i] && (fightControl.mapData.getGridDataByPos(this.conveyArr[t][i].pos).isEmpty() || e++);
                    return e
                }
            }),
            cc._RF.pop()
    }
        , {}],
    CustomEndLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "53db0uWChlEw4JK6kKds1wc", "CustomEndLayer"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    isCanClick: null
                },
                onDestroy: function () {
                    this.isCanClick = null,
                        bannerManager.hideBanner(bannerLayerNameOb.levelCustom, !0)
                },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                addEvent: function () {
                    var e = this.node.getChildByName("actionnode");
                    e.getChildByName("nextbtn").on(cc.Node.EventType.TOUCH_END, this.clickNextBtn, this),
                        e.getChildByName("watchbtn").on(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this)
                },
                removeEvent: function () {
                    var e = this.node.getChildByName("actionnode");
                    e.getChildByName("nextbtn").off(cc.Node.EventType.TOUCH_END, this.clickNextBtn, this),
                        e.getChildByName("watchbtn").off(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this)
                },
                initialize: function () {
                    this.addEvent();
                    var e = this.node.getChildByName("actionnode");
                    this.refreshNormalInfo(),
                        e.getChildByName("lvword").getComponent("GameArtWord").setString("" + fightControl.curLevel),
                        this.runEnterAction(),
                        this.isCanClick = !1,
                        fightControl.levelOverControl.customLevelEvent(),
                        bannerManager.refreshBanner(bannerLayerNameOb.levelCustom)
                },
                refreshNormalInfo: function () {
                    var e = this.node.getChildByName("actionnode")
                        , t = fightControl.endGetGem(fightControl.curLevel);
                    e.getChildByName("gemnum").getComponent(cc.Label).string = "x" + t,
                        e.getChildByName("watchbtn").getChildByName("txt").getComponent(cc.Label).string = getLanguageDic(1016) + " x" + getGlobleDic(24),
                        t <= 0 ? this.refreshBtn() : heroData.addGem(t)
                },
                refreshBtn: function () {
                    var e = this.node.getChildByName("actionnode");
                    e.getChildByName("watchbtn").active = !1,
                        e.getChildByName("nextbtn").x = 0
                },
                runEnterAction: function () {
                    var e = this.node.getChildByName("actionnode");
                    e.scale = .5;
                    var t = this;
                    e.runAction(cc.sequence(cc.scaleTo(.2, 1.1), cc.scaleTo(.1, .9), cc.scaleTo(.1, 1), cc.callFunc(function () {
                        t.isCanClick = !0
                    })))
                },
                clickNextBtn: function () {
                    !0 === this.isCanClick && (engine.eventM.emit(event_id.GOTO_NEXT_CUSTOM),
                        this.destroyClass())
                },
                clickWatchBtn: function () {
                    if (1 === openModuleValue.forFBCheck || 1 === debugtest.noAD)
                        this.successFun();
                    else {
                        var e = videoAdKeyList[Math.floor(Math.random() * videoAdKeyList.length)];
                        gameSDK.faceBookAdvertisement.showRewardVideoAd(e, this.successFun.bind(this))
                    }
                },
                successFun: function () {
                    gaLogEvent.logByDate("\u5173\u5361\u4f7f\u75285\u500d\u94bb\u77f3\u5e7f\u544a", fightControl.curLevel),
                        fightControl.isWatch = !0,
                        this.refreshBtn();
                    var e = fightControl.endGetGem(fightControl.curLevel);
                    e *= getGlobleDic(24),
                        heroData.addGem(e),
                        heroData.saveData();
                    var t = [];
                    t.push(getItemConfig(itemIDConfig.gem, e)),
                        sceneControl.showReward(t)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    Engine: [function (e, t) {
        "use strict";
        cc._RF.push(t, "84b90avxNxAm75UmT9aocNk", "Engine");
        var i = e("GameEventManager")
            , n = e("GameMemoryManagement")
            , a = e("GameCPUManagement")
            , o = e("GameData")
            , r = e("GameTime")
            , s = e("GameSound")
            , c = e("CacheData")
            , l = e("GameAdapterInfo")
            , h = e("GameBackgroundLoad");
        window.initEngine = function () {
            null == window.engine && (window.engine = new d,
                engine.initialize())
        }
            ;
        var d = cc.Class({
            properties: {
                eventM: null,
                memory: null,
                CPUM: null,
                gameData: null,
                gameTime: null,
                gameSound: null,
                cacheData: null,
                gameAdapterInfo: null
            },
            initialize: function () {
                window.ccLog = function () {
                    for (var e = Array(), t = arguments.length, i = 0; i < t; i++)
                        e[i] = arguments[i];
                    for (var n = 0; n < e.length; n++)
                        console.log(e[n])
                }
                    ,
                    ccLog("\u5f15\u64ce\u7248\u672c" + gameVersions),
                    this.eventM = new i,
                    this.eventM.initialize(),
                    this.memory = new n,
                    this.memory.initialize(),
                    this.CPUM = new a,
                    this.CPUM.initialize(),
                    this.gameData = new o,
                    this.gameData.initialize(),
                    this.gameTime = new r,
                    this.gameTime.initialize(),
                    this.cacheData = new c,
                    this.cacheData.initialize(),
                    this.gameSound = new s,
                    this.gameSound.initialize(),
                    this.gameAdapterInfo = new l,
                    this.gameAdapterInfo.initialize(),
                    this.gameBackgroundLoad = new h,
                    this.gameBackgroundLoad.initialize()
            }
        });
        cc._RF.pop()
    }
        , {
        CacheData: "CacheData",
        GameAdapterInfo: "GameAdapterInfo",
        GameBackgroundLoad: "GameBackgroundLoad",
        GameCPUManagement: "GameCPUManagement",
        GameData: "GameData",
        GameEventManager: "GameEventManager",
        GameMemoryManagement: "GameMemoryManagement",
        GameSound: "GameSound",
        GameTime: "GameTime"
    }],
    FaceBookAdvertisement: [function (e, t) {
        "use strict";
        cc._RF.push(t, "26c3azCp7tM4pYniOjw9k6f", "FaceBookAdvertisement"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    hasRemoveAD: null,
                    isLoadInterstitialAD: null,
                    loadedInterstitialAD: null,
                    loadInterstitialADOne: null,
                    errorLoadInterstitialCount: null,
                    interstitialKeyArr: null
                },
                initialize: function () {
                    1 != this.isInit && (this.isInit = !0,
                        this.isLoadInterstitialAD = !1,
                        this.loadInterstitialADOne = !1,
                        this.errorLoadInterstitialCount = 0,
                        this.interstitialKeyArr = [],
                        interstitialAdKeyList.length > 0 && this.loadInterstitial())
                },
                loadInterstitial: function () {
                   /* ccLog("\u8fdb\u5165\u63d2\u5c4f\u52a0\u8f7d"),
                        1 != this.hasRemoveAD && 1 != this.isLoadInterstitialAD && null == this.loadedInterstitialAD && (this.errorLoadInterstitialCount >= 3 ? 1 == this.loadInterstitialADOne && (this.loadInterstitialADOne = !1,
                            this.preLoadInterstitialAD()) : (this.loadInterstitialADOne = !1,
                                this.preLoadInterstitialAD()))*/
                },
                preLoadInterstitialAD: function () {
                    /*switch (gameSDKName) {
                        case faceBookSDK:
                            this.isLoadInterstitialAD = !0,
                                this.interstitialKeyArr.length <= 0 && (this.interstitialKeyArr = interstitialAdKeyList.slice(),
                                    this.interstitialKeyArr.sort(function () {
                                        return Math.random() - .5
                                    }));
                            var e, t = this.interstitialKeyArr.shift(), i = this;
                            FBInstant.getInterstitialAdAsync(t).then(function (i) {
                                return ccLog("\u52a0\u8f7d\u63d2\u5c4f\u5e7f\u544a" + t),
                                    (e = i).loadAsync()
                            }).then(function () {
                                ccLog("\u52a0\u8f7d\u63d2\u5c4f\u5e7f\u544a\u52a0\u8f7d\u6210\u529f"),
                                    i.loadedInterstitialAD = e,
                                    i.isLoadInterstitialAD = !1
                            }).catch(function (e) {
                                i.isLoadInterstitialAD = !1,
                                    i.errorLoadInterstitialCount++,
                                    ccLog("\u52a0\u8f7d\u63d2\u5c4f\u5e7f\u544a\u52a0\u8f7d\u5931\u8d25" + e.message),
                                    ccLog(e.code),
                                    setTimeout(function () {
                                        i.loadInterstitial()
                                    }, 3e3)
                            });
                            break;
                        case faceBookSDKTest:
                    }*/
                },
                showInterstitialAD: function (e) {
                    /*if (this.hasRemoveAD)
                        null != e && e();
                    else
                        switch (gameSDKName) {
                            case faceBookSDK:
                                var t = this;
                                try {
                                    t.loadInterstitialADOne = !0,
                                        null != t.loadedInterstitialAD ? t.loadedInterstitialAD.showAsync().then(function () {
                                            ccLog("InterstitialAd\u5e7f\u544a\u663e\u793a\u6210\u529f"),
                                                t.loadedInterstitialAD = null,
                                                setTimeout(function () {
                                                    t.loadInterstitial()
                                                }, 3e3)
                                        }).catch(function (e) {
                                            t.loadedInterstitialAD = null,
                                                t.errorLoadInterstitialCount++,
                                                ccLog("\u52a0\u8f7d\u63d2\u5c4f\u5e7f\u544a\u52a0\u8f7d\u5931\u8d25" + e.message),
                                                ccLog(e.code),
                                                setTimeout(function () {
                                                    t.loadInterstitial()
                                                }, 3e3)
                                        }) : ccLog("\u63d2\u5c4f\u5e7f\u544a\u5c1a\u672a\u52a0\u8f7d\u5b8c\u6210")
                                } catch (i) {
                                    ccLog("e", i)
                                } finally {
                                    null != e && e()
                                }
                                break;
                            case faceBookSDKTest:
                                ccLog("\u64ad\u653e\u63d2\u5c4f"),
                                    null != e && e()
                        }*/
                },
                showRewardVideoAd: function (e, t, i) {
                    null != t && t()
                    /*switch (gameSDKName) {
                        case faceBookSDK:
                            var n = null;
                            addLoadingCircle(),
                                FBInstant.getRewardedVideoAsync(e).then(function (e) {
                                    return ccLog("RewardedVideo\u5f00\u59cb\u52a0\u8f7d"),
                                        (n = e).loadAsync()
                                }).then(function () {
                                    return ccLog("RewardedVideo\u52a0\u8f7d\u6210\u529f\u56de\u8c03"),
                                        n.showAsync()
                                }).then(function () {
                                    ccLog("RewardedVideo\u5e7f\u544a\u663e\u793a\u6210\u529f"),
                                        removeLoadingCircle(),
                                        null != t && t()
                                }).catch(function (e) {
                                    removeLoadingCircle(),
                                        createGameSureTitleWindow(),
                                        null != i && i(),
                                        ccLog("RewardedVideo\u5e7f\u544a\u663e\u793a\u5931\u8d25"),
                                        ccLog("\u52a0\u8f7d\u89c6\u9891\u5e7f\u544a\u5931\u8d25" + e.message),
                                        ccLog(e.code)
                                });
                            break;
                        case faceBookSDKTest:
                            null != t && t()
                    }*/
                },
                loadBannerAd: function () {
                    /*if (!(bannerAdKeyList.length <= 0)) {
                        var e = Math.random() * bannerAdKeyList.length | 0
                            , t = bannerAdKeyList[e];
                        switch (gameSDKName) {
                            case faceBookSDK:
                                FBInstant.loadBannerAdAsync(t).then(function () {
                                    ccLog("banner\u5e7f\u544a\u663e\u793a\u6210\u529f")
                                }).catch(function (e) {
                                    ccLog("banner\u5e7f\u544a\u663e\u793a\u5931\u8d25"),
                                        null != e && ccLog(e.code)
                                })
                        }
                    }*/
                },
                hideBanner: function () {
                    /*FBInstant.hideBannerAdAsync()*/
                }
            }),
            cc._RF.pop()
    }
        , {}],
    FaceBookBot: [function (e, t) {
        "use strict";
        cc._RF.push(t, "e79559qm4NC1J9ynoREshFx", "FaceBookBot"),
            cc.Class({
                extends: cc.Class,
                properties: {
                    getSubscribeBotCount: null
                },
                initialize: function () {
                    this.getSubscribeBotCount = 0
                },
                canSubscribeBotAsync: function (e) {
                    switch (gameSDKName) {
                        case faceBookSDKTest:
                            null != e && e();
                            break;
                        case faceBookSDK:
                            this.getSubscribeBotCount = this.getSubscribeBotCount + 1;
                            var t = this;
                            FBInstant.player.getDataAsync(["bot"]).then(function (i) {
                                ccLog("\u83b7\u53d6\u5230\u7684data:"),
                                    ccLog(i);
                                var n = engine.gameTime.getDayToString();
                                null != i && null != i.bot && i.bot == n || (ccLog("\u8c03\u7528canSubscribeBotAsync\u3002"),
                                    FBInstant.player.canSubscribeBotAsync().then(function (t) {
                                        ccLog("\u8c03\u7528canSubscribeBotAsync\u6210\u529f\u3002"),
                                            ccLog(t),
                                            1 == t ? (gameSDK.logEvent("canSubscribe", 1, {
                                                canSubscribe: "canSubscribe"
                                            }),
                                                null != e && e()) : gameSDK.logEvent("yijingxuanzedingyue", 1, {
                                                    yijingxuanzedingyue: "yijingxuanzedingyue"
                                                })
                                    }).catch(function (i) {
                                        ccLog("\u8c03\u7528msg\u5931\u8d25:" + i.code + ":" + i.message),
                                            1 == gameSDK.sdkPlayInfo.isNewPlayer ? (gameSDK.logEvent("aotuopen_toofast", 1, {
                                                aotuopen_toofast: "aotuopen_toofast"
                                            }),
                                                t.getSubscribeBotCount < 4 ? setTimeout(function () {
                                                    t.canSubscribeBotAsync(e)
                                                }, 100) : gameSDK.logEvent("try3fail", 1, {
                                                    try3fail: "try3fail"
                                                })) : gameSDK.logEvent("yijingxuanzedingyue", 1, {
                                                    yijingxuanzedingyue: "yijingxuanzedingyue"
                                                })
                                    }))
                            })
                    }
                },
                subscribeBotAsync: function (e, t) {
                    var i = this;
                    switch (gameSDKName) {
                        case faceBookSDKTest:
                            null != e && e();
                            break;
                        case faceBookSDK:
                            ccLog("\u8c03\u7528subscribeBotAsync\u3002"),
                                FBInstant.player.subscribeBotAsync().then(function () {
                                    i.canSubscribeBot = !1,
                                        gameSDK.logEvent("dingyuedakai", 1, {
                                            dingyuedakai: "dingyuedakai"
                                        }),
                                        ccLog("\u8ba2\u9605Bot\u3002");
                                    var t = engine.gameTime.getDayToString();
                                    FBInstant.player.setDataAsync({
                                        bot: t
                                    }).then(function () { }),
                                        null != e && e()
                                }).catch(function () {
                                    i.canSubscribeBot = !1,
                                        gameSDK.logEvent("dingyueguanbi", 1, {
                                            dingyueguanbi: "dingyueguanbi"
                                        }),
                                        ccLog("\u53d6\u6d88\u8ba2\u9605Bot\u3002");
                                    var e = engine.gameTime.getDayToString();
                                    FBInstant.player.setDataAsync({
                                        bot: e
                                    }).then(function () { }),
                                        null != t && t()
                                })
                    }
                },
                sendMessengerRobot: function (e) {
                    switch (gameSDKName) {
                        case faceBookSDKTest:
                            null != e && e();
                            break;
                        case faceBookSDK:
                            FBInstant.setSessionData(getBotData())
                    }
                }
            }),
            cc._RF.pop()
    }
        , {}],
    FaceBookChallengeLeaderboard: [function (e, t) {
        "use strict";
        var i;
        cc._RF.push(t, "69da582j4dOM4Yx1EDpI6kt", "FaceBookChallengeLeaderboard");
        var n = [1e4, 9e3, 7500, 6100, 5300, 4500, 2800, 1500, 800, 300]
            , a = [500, 2500]
            , o = (cc.Class(((i = {
                properties: {
                    roomCount: 0,
                    loadRankOver: !0,
                    roomPlayers: null
                },
                initialize: function () { },
                fmtChallengeRoomData: function (e) {
                    this.getChallengeRankData(),
                        e && e()
                },
                clearRoomData: function (e, t) {
                    for (var i = 0; i < o.length; i++)
                        if (e === o[i].roomID) {
                            o.splice(i, 1),
                                this.roomCount--;
                            break
                        }
                    t && t(o)
                },
                getChallengeRankScore: function (e, t) {
                    var i = this;
                    if (this.loadRankOver || !t) {
                        for (var n = 0, a = 0; a < c.length; a++)
                            if (c[a].playerID === e) {
                                n = l[c[a].playerID] > -1 ? l[c[a].playerID] : c[a].score;
                                break
                            }
                        return t && t(n),
                            n
                    }
                    setTimeout(function () {
                        i.getChallengeRankScore(e, t)
                    }, 200)
                },
                getChallengeRankData: function (e) {
                    var t = 0;
                    if (c.length > 0) {
                        if (null != l)
                            for (t = 0; t < c.length; t++)
                                l[c[t].playerID] && (c[t].score = l[c[t].playerID]);
                        e && e(c)
                    }
                },
                setScoreAsync: function (e) {
                    s = Math.max(s, e),
                        c.length > 0 && this._flushRankData(),
                        l = {},
                        this._checkNeedSetRealRankData()
                },
                _checkNeedSetRealRankData: function () {
                    var e = this;
                    gameSDKName === faceBookSDK && null != FBInstant.context.getID() && FBInstant.getLeaderboardAsync("linkGameChallengeRank").then(function (e) {
                        return ccLog("update my score:linkGameChallengeRank"),
                            e.setScoreAsync(s)
                    }).then(function () {
                        ccLog("update suc,get challengeLeadbord"),
                            e._getRealRank()
                    }).catch(function (e) {
                        ccLog("update challengeLeadbord fail"),
                            ccLog(e)
                    })
                },
                _getRealRank: function () {
                    var e = this;
                    gameSDKName === faceBookSDK && null != FBInstant.context.getID() && FBInstant.getLeaderboardAsync("linkGameChallengeRank." + FBInstant.context.getID()).then(function (e) {
                        return e.getConnectedPlayerEntriesAsync()
                    }).then(function (t) {
                        if (ccLog("getEntriesAsync suc:"),
                            l = {},
                            null != t && t.length > 0) {
                            ccLog("entries : ", t);
                            for (var i = 0; i < t.length; i++) {
                                var n = {};
                                n.playerID = t[i].getPlayer().getID(),
                                    n.photo = t[i].getPlayer().getPhoto(),
                                    n.name = t[i].getPlayer().getName(),
                                    n.score = t[i].getScore(),
                                    n.rank = t[i].getRank(),
                                    ccLog(n.name),
                                    Number(n.score) >= 99999999 || (l[n.playerID] = n.score)
                            }
                        }
                        ccLog("\u771f\u5b9erank\u6570\u636e:", l),
                            e.getChallengeRankData()
                    }).catch(function (e) {
                        ccLog("update leaderbord fail"),
                            ccLog(e)
                    })
                },
                _getFriendList: function (e) {
                    switch (this._getFriendList = function () { }
                    ,
                    friendsList = JSON.parse(JSON.stringify(e)),
                    gameSDKName) {
                        case faceBookSDK:
                            this._buildRealRank();
                            break;
                        case faceBookSDKTest:
                            this._buildUnrealRank()
                    }
                },
                _buildRealRank: function () {
                    var e = 0;
                    e = t;
                    var t = 0;
                    for (t = 0; t < n.length && !(s >= n[t]); t++)
                        ;
                    e === n.length && (e = 100),
                        friendsList = this._shuffleArray(friendsList);
                    var i = JSON.parse(JSON.stringify(friendsList));
                    c.push({
                        playerID: gameSDK.sdkPlayInfo.playerID,
                        name: gameSDK.sdkPlayInfo.name,
                        photo: gameSDK.sdkPlayInfo.photo,
                        score: s
                    });
                    var a, o = Math.min(i.length, e);
                    for (t = 0; t < o; t++)
                        (a = i.shift()).score = 0,
                            c.push(a);
                    c.reverse();
                    var r = i.length;
                    for (t = 0; t < r; t++)
                        (a = i.shift()).score = 0,
                            c.push(a);
                    ccLog("\u6311\u6218\u6392\u884c\u699c\u6570\u636e", c)
                },
                _buildUnrealRank: function () {
                    var e = []
                        , t = []
                        , i = s
                        , o = s
                        , r = 0
                        , l = 0;
                    for (l = 0; l < n.length && !(s >= n[l]); l++)
                        ;
                    for ((r = l) === n.length && (r = 100),
                        l = r - 1; l >= 0; l--)
                        e.push(i += parseInt(a[0] + a[1] * Math.random()));
                    for (l = 0; l < 100; l++)
                        t.push((o -= parseInt(a[0] + a[1] * Math.random()),
                            o = Math.max(0, o)));
                    friendsList = this._shuffleArray(friendsList);
                    var h = JSON.parse(JSON.stringify(friendsList));
                    c.push({
                        playerID: gameSDK.sdkPlayInfo.playerID,
                        name: gameSDK.sdkPlayInfo.name,
                        photo: gameSDK.sdkPlayInfo.photo,
                        score: s
                    });
                    var d, u = Math.min(h.length, r);
                    for (l = 0; l < u; l++)
                        (d = h.shift()).score = e.shift(),
                            c.push(d);
                    c.reverse();
                    var m = h.length;
                    for (l = 0; l < m; l++)
                        (d = h.shift()).score = t.shift(),
                            c.push(d);
                    ccLog("\u6311\u6218\u6392\u884c\u699c\u6d4b\u8bd5\u6570\u636e", c)
                },
                _flushRankData: function () {
                    for (var e = 0; e < c.length; e++)
                        if (c[e].playerID === gameSDK.sdkPlayInfo.playerID) {
                            c[e].score = s;
                            break
                        }
                    c.sort(function (e, t) {
                        return t.score - e.score
                    })
                },
                _shuffleArray: function (e) {
                    for (var t, i, n = e.length; n;)
                        i = Math.floor(Math.random() * n--),
                            t = e[n],
                            e[n] = e[i],
                            e[i] = t;
                    return e
                },
                createAllContext: function () {
                    r = JSON.parse(JSON.stringify(heroData.challengeData.roomData)) || [],
                        h = gameSDK.leaderboard._getRandomBotArr(10);
                    for (var e = 0; e < r.length; e++)
                        this.createBaseContextData(r[e])
                },
                createBaseContextData: function (e) {
                    for (var t = 0; t < o.length; t++)
                        if (e.roomID === o[t].roomID)
                            return;
                    var i = {};
                    i.roomID = e.roomID,
                        i.time = e.time,
                        i.addScore = e.addScore,
                        i.hasSwitch = !1,
                        i.players = [],
                        i.players[0] = {
                            playerID: gameSDK.sdkPlayInfo.playerID,
                            name: gameSDK.sdkPlayInfo.name,
                            photo: gameSDK.sdkPlayInfo.photo
                        },
                        h.length < 1 && (h = gameSDK.leaderboard._getRandomBotArr(10));
                    var n = h.shift();
                    n && (i.players[1] = {
                        playerID: n.playerID,
                        name: n.name,
                        photo: n.photo
                    }),
                        o.push(i),
                        this.roomCount++
                },
                _switchAsyncAll: function () { },
                _switchAsync: function (e, t) {
                    var i = this
                        , n = this.getContextRoom(e);
                    if (ccLog("__switchAsync    roomID", e),
                        n) {
                        if (!0 === n.hasSwitch)
                            return void (t && t(n));
                        switch (ccLog("\u904d\u5386\u623f\u95f4 roomID "),
                        gameSDKName) {
                            case faceBookSDK:
                                ccLog("\u8fdb\u5165\u623f\u95f4  roomID\uff1a " + e),
                                    n.roomID === FBInstant.context.getID() ? i.getContextPlayers(n, t) : FBInstant.context.switchAsync(n.roomID).then(function () {
                                        ccLog("\u8df3\u8f6c\u5230\u623f\u95f4\u6210\u529f  data.roomID:" + n.roomID),
                                            i.getContextPlayers(n, t)
                                    }).catch(function (e) {
                                        ccLog("\u8fdb\u5165\u623f\u95f4 \u5931\u8d25  \u904d\u5386\u623f\u95f4  data.roomID " + n.roomID + "              " + e),
                                            t && t(n)
                                    });
                                break;
                            case faceBookSDKTest:
                                ccLog("\u8fdb\u5165\u623f\u95f4  roomID\uff1a " + e),
                                    h.length < 1 && (h = gameSDK.leaderboard._getRandomBotArr(10));
                                var a = h.shift();
                                n.otherData = {
                                    playerID: a.playerID,
                                    name: a.name,
                                    photo: a.photo
                                },
                                    n.hasSwitch = !0,
                                    t && t(n)
                        }
                    } else
                        t && t()
                },
                getContextRoom: function (e) {
                    for (var t = 0; t < heroData.challengeData.roomData.length; t++)
                        if (e === heroData.challengeData.roomData[t].roomID)
                            return heroData.challengeData.roomData[t];
                    return console.error("\u627e\u4e0d\u5230\u623f\u95f4  roomID", e),
                        null
                },
                getContextPlayers: function (e, t) {
                    var i = this;
                    ccLog("\u5f00\u59cb\u83b7\u53d6\u623f\u95f4\u5185\u73a9\u5bb6\u4fe1\u606f", JSON.stringify(e)),
                        void 0 !== e && FBInstant.context.getPlayersAsync().then(function (n) {
                            i.roomPlayers = n,
                                n.map(function (t) {
                                    t.getID() !== gameSDK.sdkPlayInfo.playerID && (e.otherData = {
                                        playerID: t.getID(),
                                        name: t.getName(),
                                        photo: t.getPhoto()
                                    })
                                }),
                                e.hasSwitch = !0,
                                ccLog("\u83b7\u53d6\u623f\u95f4\u5185\u73a9\u5bb6\u4fe1\u606f data ", JSON.stringify(e), "players:" + n),
                                t && t(e)
                        }).catch(function (i) {
                            ccLog("\u83b7\u53d6\u623f\u95f4\u5185\u73a9\u5bb6\u4fe1\u606f \u5931\u8d25   roomID" + e.roomID + "              " + i),
                                t && t()
                        })
                },
                _updateEnter: function (e) {
                    var t = heroData.challengeData.roomData;
                    if (1 === debugtest.challengeRoom && (gameSDK.sdkPlayInfo.entryPointData = {},
                        gameSDK.sdkPlayInfo.entryPointData.roomID = ~~(2e3 * Math.random()),
                        gameSDK.sdkPlayInfo.entryPointData.time = (new Date).getTime() - 3,
                        gameSDK.sdkPlayInfo.entryPointData.score = 1),
                        null != gameSDK.sdkPlayInfo.entryPointData) {
                        ccLog("\u5f53\u524d\u8fdb\u5165\u6e38\u620f\u5176\u4ed6\u73a9\u5bb6\u6570\u636e,", gameSDK.sdkPlayInfo.entryPointData);
                        var i = !0
                            , n = gameSDK.sdkPlayInfo.entryPointData.roomID
                            , a = gameSDK.sdkPlayInfo.entryPointData.time
                            , o = gameSDK.sdkPlayInfo.entryPointData.score || 0
                            , r = null;
                        if (a > 0 && (new Date).getTime() - gameSDK.sdkPlayInfo.entryPointData.time >= heroData.challengeData.saveDataTime)
                            return ccLog("\u623f\u95f4\u4fdd\u5b58\u65f6\u95f4\u5df2\u8fc7 "),
                                void (e && e());
                        if (void 0 !== n && a > 0) {
                            isHaveNewbie = !1;
                            for (var s = 0; s < t.length; s++)
                                if (n === t[s].roomID) {
                                    i = !1,
                                        ccLog("\u623f\u95f4\u5df2\u5b58", n),
                                        r = t[s];
                                    break
                                }
                            if (!0 === i && (r = {
                                roomID: n,
                                time: a,
                                addScore: ~~(2500 * Math.random() + 500),
                                otherScore: o
                            },
                                t.push(r),
                                ccLog("\u5b58\u5165\u65b0\u7684\u623f\u95f4  "),
                                heroData.saveData()),
                                ccLog("\u901a\u8fc7msg\u76f4\u63a5\u8fdb\u5165\u6311\u6218", r),
                                r)
                                return void this._switchAsync(n, e)
                        }
                        e && e()
                    } else
                        e && e()
                },
                createRoom: function (e, t) {
                    var i = this
                        , n = getSendFriendData();
                    n.data.score = e,
                        heroData.challengeData.roomData.length >= heroData.challengeData.maxRoomCount || gameSDK.faceBookUpdateAsync.sendFaceBookFriendInRoom(n, function () {
                            i.createChallengeRoomSuccess(t)
                        })
                },
                addContextData: function (e) {
                    for (var t = 0; t < o.length; t++)
                        if (o[t].roomID === e.roomID)
                            return;
                    this.createBaseContextData(e)
                },
                inviteAppointFriend: function (e, t) {
                    heroData.challengeData.roomData.length >= heroData.challengeData.maxRoomCount ? openWindowLayer(openTypeEm.tipsLayer, {
                        des: "\u6311\u6218\u623f\u95f4\u5df2\u6ee1"
                    }) : this.checkInvitePlayerInRoom(e, t)
                },
                checkInvitePlayerInRoom: function (e, t) {
                    var i = this
                        , n = this;
                    switch (e.isInRoom = !1,
                    gameSDKName) {
                        case faceBookSDK:
                            FBInstant.context.getPlayersAsync().then(function (i) {
                                i.map(function (t) {
                                    t.getID() === e.data.targetID && (e.isInRoom = !0)
                                }),
                                    ccLog("\u83b7\u53d6\u623f\u95f4\u5185\u73a9\u5bb6\u4fe1\u606f data ", JSON.stringify(i), "players:" + i),
                                    gameSDK.faceBookUpdateAsync.appointFaceBookFriendAndChallenge(e, function (e) {
                                        n.createChallengeRoomSuccess(t, e)
                                    })
                            }).catch(function (i) {
                                ccLog("\u83b7\u53d6\u623f\u95f4\u5185\u73a9\u5bb6\u4fe1\u606f\u5931\u8d25", i),
                                    gameSDK.faceBookUpdateAsync.appointFaceBookFriendAndChallenge(e, function (e) {
                                        n.createChallengeRoomSuccess(t, e)
                                    })
                            });
                            break;
                        case faceBookSDKTest:
                            gameSDK.faceBookUpdateAsync.appointFaceBookFriendAndChallenge(e, function (e) {
                                i.createChallengeRoomSuccess(t, e, !1)
                            })
                    }
                },
                createChallengeRoomSuccess: function (e, t) {
                    var i, n = new Date;
                    ccLog("\u672c\u5730\u521b\u5efa\u623f\u95f4", JSON.stringify(t));
                    var o = ~~(Math.random() * a[1] + a[0]);
                    switch (gameSDKName) {
                        case faceBookSDK:
                            (i = {
                                roomID: FBInstant.context.getID(),
                                time: n.getTime(),
                                addScore: o
                            }).otherData = {
                                photo: t.targetPhoto,
                                name: t.targetName,
                                playerID: t.targetID,
                                score: ~~(2500 * Math.random() + 500)
                            },
                                heroData.challengeData.addRoom(i),
                                ccLog("\u672c\u5730\u521b\u5efa\u623f\u95f4", JSON.stringify(heroData.challengeData.roomData)),
                                heroData.saveData();
                            break;
                        case faceBookSDKTest:
                            (i = {
                                roomID: ~~(1e4 * Math.random()),
                                time: n.getTime(),
                                addScore: o
                            }).otherData = {
                                photo: t.targetPhoto,
                                name: t.targetName,
                                playerID: t.targetID,
                                score: ~~(2500 * Math.random() + 500)
                            },
                                heroData.challengeData.addRoom(i),
                                heroData.saveData()
                    }
                    e && e(i),
                        ccLog("\u4fdd\u5b58\u7684\u623f\u95f4\u4fe1\u606f", i.roomID),
                        ccLog("\u9080\u8bf7\u597d\u53cb\u8fdb\u5165\u623f\u95f4\u6210\u529f")
                },
                function: function () {
                    ccLog("\u9080\u8bf7\u597d\u53cb\u8fdb\u5165\u623f\u95f4\u5931\u8d25")
                }
            }).function = function () {
                ccLog("\u9080\u8bf7\u597d\u53cb\u8fdb\u5165\u623f\u95f4\u53d6\u6d88")
            }
                ,
                i)),
                [])
            , r = []
            , s = 0
            , c = []
            , l = {}
            , h = [];
        cc._RF.pop()
    }
        , {}],
    FaceBookLeaderboard: [function (e, t) {
        "use strict";
        cc._RF.push(t, "fcc30qpaslB6JfBkzeB5Oua", "FaceBookLeaderboard");
        var i = [8e5, 5e5, 2e5, 15e4, 1e5, 5e4, 3e4, 1e4, 5e3, 1e3]
            , n = [500, 3e3];
        window.friendsList = null,
            cc.Class({
                properties: {},
                initialize: function () { },
                getRankData: function (e) {
                    var t = this
                        , i = 0;
                    if (a.length > 0) {
                        if (r) {
                            for (i = 0; i < a.length; i++)
                                r[a[i].playerID] && (a[i].score = r[a[i].playerID]);
                            a.sort(function (e, t) {
                                return t.score - e.score
                            })
                        }
                        for (i = 0; i < a.length; i++)
                            a[i].rank = i + 1;
                        e(a)
                    } else
                        setTimeout(function () {
                            t.getRankData(e)
                        }, 200)
                },
                setScoreAsync: function (e) {
                    o = Math.max(o, e),
                        a.length > 0 && this._flushRankData(),
                        r = {},
                        this._getfriendsList(),
                        this._checkNeedSetRealRankData()
                },
                getPassPerson: function () {
                    var e = friendsList || [];
                    if (e.length < 5) {
                        var t = this._getRandomBotArr();
                        e = e.concat(t)
                    }
                    return this._shuffleArray(e)
                },
                _checkNeedSetRealRankData: function () {
                    var e = this;
                    gameSDKName === faceBookSDK && null != FBInstant.context.getID() && FBInstant.getLeaderboardAsync("LinkGameRank002." + FBInstant.context.getID()).then(function (e) {
                        return ccLog("update my score:LinkGameRank002"),
                            e.setScoreAsync(o)
                    }).then(function () {
                        ccLog("update suc,get leadbord"),
                            e._getRealRank()
                    }).catch(function (e) {
                        ccLog("update leaderbord fail"),
                            ccLog(e)
                    })
                },
                _getRealRank: function () {
                    gameSDKName === faceBookSDK && null != FBInstant.context.getID() && FBInstant.getLeaderboardAsync("LinkGameRank002." + FBInstant.context.getID()).then(function (e) {
                        return e.getConnectedPlayerEntriesAsync()
                    }).then(function (e) {
                        if (ccLog("getEntriesAsync suc:"),
                            r = {},
                            null != e && e.length > 0)
                            for (var t = 0; t < e.length; t++) {
                                var i = {};
                                i.playerID = e[t].getPlayer().getID(),
                                    i.photo = e[t].getPlayer().getPhoto(),
                                    i.name = e[t].getPlayer().getName(),
                                    i.score = e[t].getScore(),
                                    i.rank = e[t].getRank(),
                                    ccLog(i.name),
                                    Number(i.score) >= 99999999 || (r[i.playerID] = i.score)
                            }
                        cc.log("\u771f\u5b9erank\u6570\u636e:", r)
                    }).catch(function (e) {
                        ccLog("update leaderbord fail"),
                            ccLog(e)
                    })
                },
                _getfriendsList: function () {
                    var e = this;
                    switch (this._getfriendsList = function () { }
                    ,
                    gameSDKName) {
                        case faceBookSDK:
                            FBInstant.player.getConnectedPlayersAsync().then(function (t) {
                                friendsList = [];
                                for (var i = 0; i < t.length; i++) {
                                    var n = t[i]
                                        , a = {};
                                    a.name = n.getName(),
                                        a.playerID = n.getID(),
                                        a.photo = n.getPhoto(),
                                        friendsList.push(a)
                                }
                                gameSDK.challengeLeaderboard._getFriendList(friendsList),
                                    e._buildUnrealRank()
                            }).catch(function (e) {
                                ccLog("get friend fail"),
                                    ccLog(e)
                            });
                            break;
                        case faceBookSDKTest:
                            setTimeout(function () {
                                friendsList = e._getRandomBotArr(),
                                    gameSDK.challengeLeaderboard._getFriendList(friendsList),
                                    e._buildUnrealRank()
                            }, 2e3)
                    }
                },
                _buildUnrealRank: function () {
                    var e = []
                        , t = []
                        , r = o
                        , s = o
                        , c = 0
                        , l = 0;
                    for (l = 0; l < i.length && !(o >= i[l]); l++)
                        ;
                    for ((c = l) === i.length && (c = 100),
                        l = c - 1; l >= 0; l--)
                        e.push(r += parseInt(n[0] + n[1] * Math.random()));
                    for (l = 0; l < 100; l++)
                        t.push((s -= parseInt(n[0] + n[1] * Math.random()),
                            s = Math.max(0, s)));
                    friendsList = this._shuffleArray(friendsList);
                    var h = JSON.parse(JSON.stringify(friendsList));
                    a.push({
                        playerID: gameSDK.sdkPlayInfo.playerID,
                        name: gameSDK.sdkPlayInfo.name,
                        photo: gameSDK.sdkPlayInfo.photo,
                        score: o
                    });
                    var d, u = Math.min(h.length, c);
                    for (l = 0; l < u; l++)
                        (d = h.shift()).score = e.shift(),
                            a.push(d);
                    a.reverse();
                    var m = h.length;
                    for (l = 0; l < m; l++)
                        (d = h.shift()).score = t.shift(),
                            a.push(d);
                    cc.log("\u6392\u884c\u699c\u6570\u636e", a)
                },
                _flushRankData: function () {
                    for (var e = 0; e < a.length; e++)
                        if (a[e].playerID === gameSDK.sdkPlayInfo.playerID) {
                            a[e].score = o;
                            break
                        }
                    a.sort(function (e, t) {
                        return t.score - e.score
                    })
                },
                _getRandomBotArr: function (e) {
                    e = e || 7;
                    for (var t = ["Max Julia", "Nathan Anthony", "Asa Webb", "Phil Harrison", "Diana Hoyle", "Gloria Nelly", "Rodney Warner", "Eunice Peggy", "Henry Katrine", "Oscar Anderson", "Glenn Cocker", "Kerr Reade", "Lindsay Gill,", "Vito Hobbes", "Andy Hugh", "Elroy MacAdam", "Ternence Emma", "Ruth Harrington", "Sam Carmen", "Yvette Spenser", "Joy Eve", "Erin Christ", "Omar Maxwell", "Devin Theresa", "Godfery Collins", "Edwiin Becky", "Christopher Pop", "Aldrich White", "June Margery", "Dominic Larkin", "Jason Carllyle", "Armand Flower", "Ian Hughes", "Rex Burke", "Crystal Peg", "Quintina Petty", "Myron Yule", "Kay Noel", "Linda Felix", "Abel Smith", "Irene Fast", "Ruth Nell", "Wade Kit", "Ivy Grant", "Tom Pope", "Sibyl Rhodes", "Noel Lawrence", "Charles Edward", "Kirk Finn", "Ophelia Peter", "Candice Wild", "Bblythe Eveline", "Mary Philemon", "Grace Beerbohm", "Brian Rayleign", "Oscar Mark", "Will Carroll", "Cora Garcia", "Truman Kennedy", "Maurice Fanny", "Booth Birrell", "Eve DuBois", "Edwina Theresa", "Marsh Roland", "Salome Malan", "Ryan Ellis", "Morgan Chris", "Byron Tracy", "Eric Bertie", "Hazel Evan", "Chad Ferguson", "Dolores Adolph", "Ira Bell", "Basil Moses", "Eartha Lawson", "Lucien Harper", "Ivan Bulwer", "Gloria Jim", "Anna Aldridge", "Wilbur Dunlop", "Yale Bob", "Roberta Dewar", "Jo Bruce", "Simon Wallace", "Abel Christy", "Otis Copper", "Elva Sheridan", "Edison Horatio", "Christian Coco", "Betty Pater", "Janet Beaufort", "Norma Matthew", "Payne Anto", "Bertram Dewey", "Vera Ingersoll", "Vincent Holmes", "Jamie Lucy", "Aaron Ramsden", "Buck Daisy", "Howar Louisa", "Yvonne Wallis", "Nathan Oliver", "Ada Clara", "Caesar Henry", "Cynthia Noyes", "Nathaniel Leo", "Griffith Marcus", "Tabitha Pulit", "Chad Hewlett", "Patricia Yerkes", "Jennifer Nahum", "Alston Sophia", "Brian Martin", "Leif Hamilton", "Mike Conrad", "Coral Gus", "Matthew Isaac", "Broderick Joe", "Harold Cover", "Orville McCar", "Lena Giles", "Giles Anna", "Sophia Joyce", "Clare Carpenter", "Tab Yeates", "Jacqueline Cra", "Alvin MacArthur", "Alvis Garcia", "Omar Salome", "Maud Ferguson", "Eudora Cotton", "Lennon Dickens", "Robin Toby", "Zora Buck", "Tony Camilla", "Hedy Wordsworth", "Lesley Morgan", "Devin Maud", "Isidore Palmer", "Benson Scripps", "Phil Webster", "Hyman Pearson", "Magee", "Hilary Martha", "Grace Noah", "Arm Ernest", "Wendell Abraham", "Adair Acheson", "Betsy Larkin", "Marshall Walton", "Rex Bertha", "Nicole Harrod", "Arm Elinor", "Audrey Swin", "Elvira Tommy", "Roxanne Eveline", "Newman Bess", "Dominic Wood", "Nat Anderson", "Nelly James", "Gabriel Grote", "Joseph Darwin", "Gloria Joan", "Hubery Conan", "Tyrone Marion", "Sabina Dickey", "Emma Ernest", "Avery Raglan", "Maxine Sharp", "Sarah Felix", "Alfred Isabel", "Wright Gall", "Evange Lucius", "Burnell Gal", "Zoe Kennedy", "Gwend Oliver", "Alexia Ted", "Blanche Chaplin", "Aries Bell", "Dolores Lincoln", "Ulysses Guy", "Barnett Nick", "Yale Julian", "Wade Peter", "Benjamin Donne", "Miranda Douglas", "Jim Marshall", "Richard Van", "Saxon Leopold", "Ralap Milton", "Dave Surrey", "Emily Barney", "Thomas Christ", "Cliff Thoreau", "Jenny Quiller", "Marina Aldridge", "Augus Abe", "Quinn Irving", "Alice Zacharias", "Winifred Troll", "There Euphemia", "Mandy Spring", "Ida Dewar", "Geoffrey Parker", "Zenobia Gunther", "Raymond Carroll", "Jill Wilde", "Jacqueline Hugh", "Edwiin Eisen", "Lucien Henri", "Ingrid Patience", "Victor Wilhel", "Marvin Jennings", "Teresa Maria", "Faithe Rob", "Cherry Morrison", "Sandy Wagner"], i = [], n = 0; n < 10; n++)
                        i.push(n);
                    for (var a = [], o = 0; o < 10; o++)
                        a.push(o);
                    for (var r = []; r.length < e;) {
                        var s = ~~(Math.random() * t.length);
                        -1 === r.indexOf(t[s]) && r.push(t[s])
                    }
                    var c, l = [];
                    for (c = 0; c < e; c++)
                        l.push(c);
                    l = this._shuffleArray(l);
                    var h = [];
                    for (c = 0; c < l.length; c++) {
                        var d = i.splice(~~(Math.random() * i.length), 1)[0]
                            , u = a.splice(~~(Math.random() * a.length), 1)[0];
                        h.push({
                            playerID: d,
                            name: r[c],
                            photo: "headimg/bot" + u,
                            score: 1e3 * c + 50
                        })
                    }
                    return h
                },
                _shuffleArray: function (e) {
                    for (var t, i, n = e.length; n;)
                        i = Math.floor(Math.random() * n--),
                            t = e[n],
                            e[n] = e[i],
                            e[i] = t;
                    return e
                }
            });
        var a = []
            , o = 0
            , r = null;
        cc._RF.pop()
    }
        , {}],
    FaceBookPayment: [function (e, t) {
        "use strict";
        cc._RF.push(t, "750e9LtZF5BQZrQqRjzJBO+", "FaceBookPayment"),
            cc.Class({
                properties: {
                    supplementPropList: null,
                    isCanPayment: null
                },
                initialize: function () {
                    this.supplementPropList = [],
                        this.isCanPayment = !0
                },
                getPayList: function () { },
                checkPaymentStatus: function () {
                    switch (gameSDKName) {
                        case faceBookSDKTest:
                            getSupplementTestData(this);
                            break;
                        case faceBookSDK:
                            var e = this;
                            if (0 == this.isCanPayment)
                                return void ccLog("\u652f\u4ed8\u5e76\u6ca1\u6709\u51c6\u5907\u597d");
                            FBInstant.payments.getPurchasesAsync().then(function (t) {
                                t.length > 0 && (ccLog("\u6709\u672a\u6d88\u8d39\u7684\u8ba2\u5355"),
                                    e.supplementPropList = t)
                            })
                    }
                },
                showPay: function (e, t, i, n) {
                    switch (gameSDKName) {
                        case faceBookSDKTest:
                            if (0 == this.isCanPayment)
                                return ccLog("\u652f\u4ed8\u5e76\u6ca1\u6709\u51c6\u5907\u597d"),
                                    void (null != i && i());
                            if (null != t) {
                                var a = getPayTestData();
                                t(a)
                            }
                            break;
                        case faceBookSDK:
                            if (0 == this.isCanPayment)
                                return ccLog("\u652f\u4ed8\u5e76\u6ca1\u6709\u51c6\u5907\u597d"),
                                    void (null != i && i());
                            addLoadingCircle(),
                                FBInstant.payments.purchaseAsync({
                                    productID: e.payid,
                                    developerPayload: e.developerPayload
                                }).then(function (e) {
                                    ccLog("\u8d2d\u4e70\u6210\u529f,\u4f7f\u5546\u54c1\u751f\u6548\u5e76\u4fdd\u5b58\u73a9\u5bb6\u4fe1\u606f"),
                                        removeLoadingCircle(),
                                        null != t && (t(e),
                                            ccLog(e))
                                }).catch(function (e) {
                                    removeLoadingCircle(),
                                        ccLog("\u652f\u4ed8\u5931\u8d25:"),
                                        ccLog(e),
                                        "USER_INPUT" == e.code ? null != n && n() : null != i && i()
                                })
                    }
                },
                consumeFbItem: function (e) {
                    switch (gameSDKName) {
                        case faceBookSDKTest:
                            ccLog("\u6e05\u9664\u5bf9\u5e94\u7684\u6d88\u8d39\u4fe1\u606f:" + e);
                            break;
                        case faceBookSDK:
                            FBInstant.payments.consumePurchaseAsync(e).then(function () {
                                ccLog("\u5546\u54c1\u6d88\u8d39\u6389\u4e86\uff1a" + e)
                            })
                    }
                },
                isCanPay: function () {
                    return 1 != gameSDK.isIOS()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    FaceBookSDK: [function (e, t) {
        "use strict";
        cc._RF.push(t, "ec659xRl8pEiKTOgVdCAXHm", "FaceBookSDK"),
            e("GameCustomImage");
        var i = e("FaceBookLeaderboard")
            , n = e("FaceBookChallengeLeaderboard")
            , a = e("FaceBookUpdateAsync")
            , o = e("FaceBookAdvertisement")
            , r = e("FaceBookPayment")
            , s = e("FaceBookBot");
        window.sdkPortEm = cc.Enum({
            ios: "IOS",
            android: "ANDROID",
            web: "WEB",
            mobileWeb: "MOBILE_WEB"
        }),
            cc.Class({
                properties: {
                    isInit: null,
                    sdkPlayInfo: null,
                    sdkPort: null,
                    isFirstStartGame: null,
                    leaderboard: null,
                    challengeLeaderboard: null,
                    faceBookUpdateAsync: null,
                    faceBookAdvertisement: null,
                    faceBookPayment: null,
                    faceBookBot: null,
                    _startGameFun: null
                },
                initialize: function () {
                    1 != this.isInit && (this.isInit = !0,
                        this.isFirstStartGame = !0,
                        this.sdkPlayInfo = new Object,
                        this.sdkPlayInfo.friendsList = new Object,
                        this.sdkPort = new Object,
                        this.leaderboard = new i,
                        this.leaderboard.initialize(),
                        this.challengeLeaderboard = new n,
                        this.challengeLeaderboard.initialize(),
                        this.faceBookUpdateAsync = new a,
                        this.faceBookUpdateAsync.initialize(),
                        this.faceBookAdvertisement = new o,
                        this.faceBookAdvertisement.initialize(),
                        this.faceBookPayment = new r,
                        this.faceBookPayment.initialize(),
                        this.faceBookBot = new s,
                        this.faceBookBot.initialize())
                },
                getLocale: function () {
                    switch (gameSDKName) {
                        case faceBookSDK:
                        case faceBookSDKTest:
                            this.localeInfo = "en_US"
                    }
                    var e = {
                        en_US: "content_en",
                        id_ID: "content_Indonisian",
                        vi_VN: "content_Vietnamese",
                        hi_IN: "content_Hindi",
                        pt_PT: "content_Portuguese",
                        th_TH: "content_Thai"
                    }
                        , t = e[this.localeInfo];
                    return t || (t = e.en_US),
                        t
                },
                isIOS: function () {
                    return this.sdkPort == sdkPortEm.ios || cc.sys.os == cc.sys.OS_IOS
                },
                getPlayInfo: function (e) {
                    switch (gameSDKName) {
                        case faceBookSDK:
                            ccLog("\u83b7\u53d6\u7528\u6237\u767b\u5f55\u4fe1\u606f\u8c03\u7528:FBInstant.initializeAsync\u51fd\u6570"),
                                this.sdkPlayInfo.playerID = FBInstant.player.getID(),
                                this.sdkPlayInfo.photoSpriteFrameFun = function () {
                                    return null
                                }
                                ,
                                ccLog("\u83b7\u53d6\u7528\u6237\u767b\u5f55\u4fe1\u606f:FBInstant.initializeAsync\u56de\u8c03:" + this.sdkPlayInfo.playerID),
                                this.getUserData(e);
                            break;
                        case faceBookSDKTest:
                            createTestPlayer(),
                                this.getUserData(e)
                    }
                },
                getUserData: function (e) {
                    switch (gameSDKName) {
                        case faceBookSDK:
                            var t = this;
                            this.logEvent("getDataAsync", 1, {
                                getDataAsync: "getDataAsync"
                            }),
                                FBInstant.player.getDataAsync(fbSaveDataKey).then(function (i) {
                                    if (t.logEvent("getDataAsyncOK", 1, {
                                        getDataAsyncOK: "getDataAsyncOK"
                                    }),
                                        ccLog("\u53d6\u5230FB\u7684\u6570\u636e:"),
                                        ccLog(i),
                                        null != i) {
                                        var n = 0;
                                        for (var a in i)
                                            n++;
                                        0 == n && (i = null)
                                    }
                                    if (null == i)
                                        t.sdkPlayInfo.isNewPlayer = !0,
                                            e(null);
                                    else if (1 == fbSaveDataKey.length)
                                        e(i[fbSaveDataKey[0]]);
                                    else {
                                        for (var o = new Object, r = 0; r < fbSaveDataKey.length; r++)
                                            o[fbSaveDataKey[r]] = i[fbSaveDataKey[r]];
                                        e(o)
                                    }
                                });
                            break;
                        case faceBookSDKTest:
                            var i = null;
                            try {
                                var n = JSON.parse(cc.sys.localStorage.getItem(gameSaveDataKey));
                                if (null != n)
                                    if (1 == fbSaveDataKey.length)
                                        i = n[fbSaveDataKey[0]];
                                    else {
                                        for (var a = new Object, o = 0; o < fbSaveDataKey.length; o++)
                                            a[fbSaveDataKey[o]] = n[fbSaveDataKey[o]];
                                        i = a
                                    }
                            } catch (r) { }
                            ccLog("\u53d6\u5230\u7f13\u5b58\u6570\u636e:"),
                                ccLog(i),
                                e(null == i ? null : i)
                    }
                },
                saveUserData: function (e, t) {
                    switch (gameSDKName) {
                        case faceBookSDK:
                            FBInstant.player.setDataAsync(e).then(function () {
                                ccLog("\u6e38\u620f\u5b58\u6863\u6210\u529f\uff01"),
                                    ccLog(e),
                                    null != t && t()
                            });
                            break;
                        case faceBookSDKTest:
                            try {
                                cc.sys.localStorage.setItem(gameSaveDataKey, JSON.stringify(e))
                            } catch (i) { }
                            null != t && t()
                    }
                },
                startGame: function (e) {
                    switch (gameSDKName) {
                        case faceBookSDK:
                            ccLog("\u83b7\u53d6\u6e38\u620fisFirstStartGame\u5c5e\u6027\uff0c\u5982\u679ctrue\u5219\u8c03\u7528FBInstant.startGameAsync\u65b9\u6cd5" + this.isFirstStartGame),
                                1 == this.isFirstStartGame ? (this.isFirstStartGame = !1,
                                    FBInstant.startGameAsync().then(function () { }),
                                    this._startGameFun = e,
                                    setTimeout(this._checkStartGameEnd.bind(this), 100)) : null != e && (cc.log("callfun"),
                                        e());
                            break;
                        case faceBookSDKTest:
                            1 == this.isFirstStartGame ? (this.faceBookPayment.getPayList(),
                                this.isFirstStartGame = !1,
                                null != e && e()) : null != e && e()
                    }
                },
                _checkStartGameEnd: function () {
                    null != this.sdkPlayInfo.name ? (ccLog("FBInstant.startGameAsync\u56de\u8c03\u3002"),
                        this.faceBookPayment.getPayList(),
                        null != this._startGameFun && this._startGameFun()) : setTimeout(this._checkStartGameEnd.bind(this), 100)
                },
                loadPlayerInfo: function (e) {
                    if (null != FBInstant.player.getName()) {
                        this.sdkPlayInfo.name = FBInstant.player.getName(),
                            this.sdkPlayInfo.photo = FBInstant.player.getPhoto(),
                            this.sdkPlayInfo.entryPointData = FBInstant.getEntryPointData();
                        var t = FBInstant.context.getType();
                        ccLog("\u4f1a\u8bdd\u7c7b\u578b" + t),
                            ccLog("\u73a9\u5bb6 name=" + this.sdkPlayInfo.name + "photo=" + this.sdkPlayInfo.photo, "entryPointData" + this.sdkPlayInfo.entryPointData),
                            this.sdkPort = FBInstant.getPlatform(),
                            ccLog(this.sdkPort),
                            e && e()
                    } else
                        setTimeout(this.loadPlayerInfo.bind(this), 100)
                },
                setLoadingProgress: function (e) {
                    switch (gameSDKName) {
                        case faceBookSDK:
                            FBInstant.setLoadingProgress(e);
                            break;
                        case faceBookSDKTest:
                    }
                },
                logEvent: function (e, t, i) {
                    switch (ccLog("\u6253\u70b9" + e),
                    gameSDKName) {
                        case faceBookSDK:
                            FBInstant.logEvent(e, t, i);
                            break;
                        case faceBookSDKTest:
                    }
                },
                logEventByString: function (e) {
                    ccLog("\u6253\u70b9" + e);
                    var t = new Object;
                    switch (t[e] = e,
                    gameSDKName) {
                        case faceBookSDK:
                            FBInstant.logEvent(e, 1, t);
                            break;
                        case faceBookSDKTest:
                    }
                },
                goToOtherGame: function (e) {
                    switch (gameSDKName) {
                        case faceBookSDK:
                            FBInstant.switchGameAsync(e).then(function () {
                                ccLog("\u8df3\u8f6c\u5176\u4ed6\u6e38\u620f\u6210\u529f")
                            }).catch(function (e) {
                                null != e && (ccLog("\u8df3\u8f6c\u5176\u4ed6\u6e38\u620f\u5931\u8d25\uff0c\u5931\u8d25\u7f16\u7801\u4e3a:"),
                                    ccLog(e))
                            });
                            break;
                        case faceBookSDKTest:
                            ccLog("\u8df3\u8f6c\u6210\u529f\u3002")
                    }
                },
                getMessengerRobot: function (e) {
                    switch (gameSDKName) {
                        case faceBookSDKTest:
                            return null != e && e(null),
                                null;
                        case faceBookSDK:
                            var t = FBInstant.getEntryPointData();
                            return null != e && e(t),
                                t
                    }
                },
                createShortcut: function (e) {
                    switch (gameSDKName) {
                        case faceBookSDKTest:
                            ccLog("\u521b\u5efa\u684c\u9762\u5feb\u6377\u65b9\u5f0f\u3002"),
                                null != e && e(null);
                            break;
                        case faceBookSDK:
                            ccLog("\u521b\u5efa\u684c\u9762\u5feb\u6377\u65b9\u5f0fsdk\u3002"),
                                FBInstant.player.getDataAsync(["shortcut"]).then(function (t) {
                                    ccLog("\u83b7\u53d6\u5230\u7684data:"),
                                        ccLog(t),
                                        null != t && null != t.shortcut && 1 == t.shortcut || FBInstant.canCreateShortcutAsync().then(function (t) {
                                            ccLog("\u521b\u5efa\u684c\u9762\u5feb\u6377\u65b9\u5f0fcanCreateShortcut\uff1a" + t),
                                                t && FBInstant.createShortcutAsync().then(function () {
                                                    FBInstant.player.setDataAsync({
                                                        shortcut: 1
                                                    }).then(function () { }),
                                                        ccLog("\u521b\u5efa\u684c\u9762\u5feb\u6377\u65b9\u5f0f\u6210\u529f\u3002"),
                                                        null != e && e(null)
                                                }).catch(function (e) {
                                                    ccLog("\u521b\u5efa\u684c\u9762\u5feb\u6377\u65b9\u5f0f\u5931\u8d25\u3002"),
                                                        ccLog(e)
                                                })
                                        }).catch(function (e) {
                                            ccLog("\u684c\u9762\u5feb\u6377\u65b9\u5f0f\u4e0d\u53ef\u4ee5\u521b\u5efa\u3002"),
                                                ccLog(e)
                                        })
                                }).catch(function (e) {
                                    ccLog("\u83b7\u53d6\u521b\u5efa\u684c\u9762\u5feb\u6377\u65b9\u5f0f\u6570\u636e\u5931\u8d25\u3002"),
                                        ccLog(e)
                                })
                    }
                },
                sendToFBBestScore: function (e) {
                    switch (gameSDKName) {
                        case faceBookSDKTest:
                            ccLog("\u63d0\u4ea4\u6700\u4f73\u5206\u6570:" + e);
                            break;
                        case faceBookSDK:
                            FBInstant.postSessionScoreAsync(e),
                                ccLog("\u63d0\u4ea4\u6700\u4f73\u5206\u6570:" + e)
                    }
                }
            }),
            cc._RF.pop()
    }
        , {
        FaceBookAdvertisement: "FaceBookAdvertisement",
        FaceBookBot: "FaceBookBot",
        FaceBookChallengeLeaderboard: "FaceBookChallengeLeaderboard",
        FaceBookLeaderboard: "FaceBookLeaderboard",
        FaceBookPayment: "FaceBookPayment",
        FaceBookUpdateAsync: "FaceBookUpdateAsync",
        GameCustomImage: "GameCustomImage"
    }],
    FaceBookUpdateAsync: [function (e, t) {
        "use strict";
        cc._RF.push(t, "d9c44n9Y/5LMqW/nEZrx75d", "FaceBookUpdateAsync");
        var i = e("GameCustomImage");
        cc.Class({
            properties: {},
            initialize: function () { },
            sendFaceBookFriend: function (e, t, n, a) {
                switch (gameSDKName) {
                    case faceBookSDK:
                        var o = this;
                        ccLog("\u8c03\u7528FBInstant.context.chooseAsync\u65b9\u6cd5"),
                            FBInstant.context.chooseAsync({
                                filters: ["NEW_CONTEXT_ONLY"]
                            }).then(function () {
                                ccLog("\u8c03\u7528FBInstant.context.chooseAsync\u65b9\u6cd5\u56de\u8c03");
                                var r = new i;
                                r.initialize(e),
                                    r.drawCompleteFun = function (i) {
                                        ccLog("\u597d\u53cb\u56fe\u7247\u52a0\u8f7d\u5b8c\u6210\uff0c\u8c03\u7528FBInstant.updateAsync\u65b9\u6cd5\uff0c\u9080\u8bf7\u597d\u53cb"),
                                            FBInstant.updateAsync({
                                                action: "CUSTOM",
                                                cta: "Play",
                                                template: e.template,
                                                image: i,
                                                text: e.text,
                                                data: e.data,
                                                strategy: "LAST",
                                                notification: "PUSH"
                                            }).then(function () {
                                                null != t && (ccLog("\u9080\u8bf7\u597d\u53cb\u56de\u8c03"),
                                                    t())
                                            }).catch(function (e) {
                                                o.updateAsyncError(n, a, e, "\u9080\u8bf7\u597d\u53cb")
                                            })
                                    }
                            }).catch(function (e) {
                                o.updateAsyncError(n, a, e, "\u9080\u8bf7\u597d\u53cb")
                            });
                        break;
                    case faceBookSDKTest:
                        ccLog("\u9080\u8bf7\u597d\u53cb\u3002"),
                            null != t && t();
                        var r = new i;
                        r.initialize(e),
                            r.drawCompleteFun = function (e) {
                                ccLog(e)
                            }
                }
            },
            shareGame: function (e, t, n, a) {
                switch (gameSDKName) {
                    case faceBookSDK:
                        var o = this;
                        (r = new i).initialize(e),
                            r.drawCompleteFun = function (i) {
                                var r = new Image;
                                r.crossOrigin = "anonymous",
                                    r.src = i,
                                    r.onload = function () {
                                        FBInstant.shareAsync({
                                            intent: "SHARE",
                                            image: i,
                                            text: e.text,
                                            data: e.data
                                        }).then(function () {
                                            null != t && t()
                                        }).catch(function (e) {
                                            o.updateAsyncError(n, a, e, "\u5206\u4eab\u597d\u53cb")
                                        })
                                    }
                            }
                            ;
                        break;
                    case faceBookSDKTest:
                        var r;
                        null != t && t(),
                            (r = new i).initialize(e),
                            r.drawCompleteFun = function (e) {
                                ccLog(e)
                            }
                }
            },
            appointFaceBookFriendOnlyUpdateAsync: function (e, t, n, a) {
                switch (gameSDKName) {
                    case faceBookSDK:
                        var o = this
                            , r = FBInstant.context.getID();
                        if (null == r)
                            return void (null != a && a());
                        ccLog("appointFaceBookFriend\u65b9\u6cd5\u56de\u8c03"),
                            (s = new i).initialize(e),
                            s.drawCompleteFun = function (i) {
                                ccLog("\u9080\u8bf7\u6307\u5b9a\u73a9\u5bb6\u56fe\u7247\u52a0\u8f7d\u5b8c\u6210\uff0c\u8c03\u7528FBInstant.updateAsync\u65b9\u6cd5"),
                                    FBInstant.updateAsync({
                                        action: "CUSTOM",
                                        cta: "Play",
                                        template: e.updateAsyncTemplate,
                                        image: i,
                                        text: e.updateAsyncText,
                                        data: e.data,
                                        strategy: "LAST",
                                        notification: "PUSH"
                                    }).then(function () {
                                        null != t && (ccLog("\u6307\u5b9a\u597d\u53cb\u56de\u8c03\uff01"),
                                            t(r))
                                    }).catch(function (e) {
                                        o.updateAsyncError(n, a, e, "\u9080\u8bf7\u6307\u5b9a\u597d\u53cb")
                                    })
                            }
                            ;
                        break;
                    case faceBookSDKTest:
                        var s;
                        null != t && t(),
                            (s = new i).initialize(e),
                            s.drawCompleteFun = function (e) {
                                var t = new Image;
                                t.crossOrigin = "anonymous",
                                    t.src = e,
                                    t.onload = function () {
                                        ccLog(e)
                                    }
                            }
                }
            },
            appointFaceBookFriendAndUpdateAsync: function (e, t, n, a) {
                var o = this;
                switch (gameSDKName) {
                    case faceBookSDK:
                        ccLog("\u8c03\u7528appointFaceBookFriend\u65b9\u6cd5,\u9080\u8bf7\u6307\u5b9a\u73a9\u5bb6id\uff1a" + e.playerID),
                            FBInstant.context.createAsync(e.playerID).then(function () {
                                o.appointFaceBookFriendOnlyUpdateAsync(e, t, n, a)
                            }).catch(function (e) {
                                o.updateAsyncError(n, a, e, "\u9080\u8bf7\u6307\u5b9a\u597d\u53cb")
                            });
                        break;
                    case faceBookSDKTest:
                        null != t && t();
                        var r = new i;
                        r.initialize(e),
                            r.drawCompleteFun = function (e) {
                                var t = new Image;
                                t.crossOrigin = "anonymous",
                                    t.src = e,
                                    t.onload = function () {
                                        ccLog(e)
                                    }
                            }
                }
            },
            updateAsyncError: function (e, t, i, n) {
                ccLog(i),
                    null != i ? (ccLog(n + "\u5931\u8d25"),
                        "USER_INPUT" == i.code ? null != e && e() : null != t && t()) : (ccLog(n + "\u5931\u8d25"),
                            null != t && t())
            },
            appointFaceBookFriendAndChallenge: function (e, t, n, a) {
                var o = this;
                switch (gameSDKName) {
                    case faceBookSDK:
                        ccLog("appointFaceBookFriendAndChallenge,\u9080\u8bf7\u6307\u5b9a\u73a9\u5bb6id\uff1a" + e.data.targetID),
                            ccLog("\u9080\u8bf7\u6307\u5b9a\u73a9\u5bb6\u4e4b\u524d\u7684\u623f\u95f4ID: ", FBInstant.context.getID());
                        var r = function () {
                            var r = new i;
                            r.initialize(e),
                                r.drawCompleteFun = function (i) {
                                    ccLog("\u597d\u53cb\u56fe\u7247\u52a0\u8f7d\u5b8c\u6210\uff0c\u8c03\u7528FBInstant.updateAsync\u65b9\u6cd5\uff0c\u9080\u8bf7\u597d\u53cb"),
                                        FBInstant.updateAsync({
                                            action: "CUSTOM",
                                            cta: "Play",
                                            template: e.template,
                                            image: i,
                                            text: e.text,
                                            data: e.data,
                                            strategy: "LAST",
                                            notification: "PUSH"
                                        }).then(function () {
                                            null != t && (ccLog("\u9080\u8bf7\u597d\u53cb\u56de\u8c03"),
                                                t(e.data))
                                        }).catch(function (e) {
                                            o.updateAsyncError(n, a, e, "\u9080\u8bf7\u597d\u53cb")
                                        })
                                }
                        };
                        e.isInRoom ? (e.data.roomID = FBInstant.context.getID(),
                            e.data.time = (new Date).getTime(),
                            ccLog("\u597d\u53cb\u5728\u623f\u95f4\u4e2d \u76f4\u63a5\u53d1\u9001\u94fe\u63a5"),
                            r()) : (ccLog("\u8c03\u7528FBInstant.context.createAsync\u65b9\u6cd5, contextID:" + FBInstant.context.getID()),
                                FBInstant.context.createAsync(e.data.targetID).then(function () {
                                    e.data.roomID = FBInstant.context.getID(),
                                        e.data.time = (new Date).getTime(),
                                        ccLog("\u8c03\u7528FBInstant.context.createAsync\u65b9\u6cd5\u56de\u8c03, contextID:" + FBInstant.context.getID()),
                                        r()
                                }).catch(function (e) {
                                    o.updateAsyncError(n, a, e, "\u9080\u8bf7\u6307\u5b9a\u597d\u53cb")
                                }));
                        break;
                    case faceBookSDKTest:
                        e.data.roomID = GameTool.getRandomInt(1, 1e5),
                            e.data.time = (new Date).getTime(),
                            null != t && t(e.data);
                        var s = new i;
                        s.initialize(e),
                            s.drawCompleteFun = function (e) {
                                var t = new Image;
                                t.crossOrigin = "anonymous",
                                    t.src = e,
                                    t.onload = function () {
                                        ccLog(e)
                                    }
                            }
                }
            },
            sendFaceBookFriendInRoom: function (e, t, n, a) {
                var o = this;
                switch (gameSDKName) {
                    case faceBookSDK:
                        ccLog("\u8c03\u7528FBInstant.context.chooseAsync\u65b9\u6cd5 \u4e4b\u524d\u623f\u95f4ID", FBInstant.context.getID()),
                            FBInstant.context.chooseAsync({
                                filters: ["NEW_CONTEXT_ONLY"],
                                minSize: 2
                            }).then(function () {
                                var r = FBInstant.context.getID();
                                e.data.roomID = r,
                                    e.data.time = (new Date).getTime(),
                                    ccLog("\u8c03\u7528FBInstant.context.chooseAsync\u65b9\u6cd5\u56de\u8c03  \u65b0\u7684\u623f\u95f4", r);
                                var s = new i;
                                s.initialize(e),
                                    s.drawCompleteFun = function (i) {
                                        ccLog("\u597d\u53cb\u56fe\u7247\u52a0\u8f7d\u5b8c\u6210\uff0c\u8c03\u7528FBInstant.updateAsync\u65b9\u6cd5\uff0c\u9080\u8bf7\u597d\u53cb"),
                                            FBInstant.updateAsync({
                                                action: "CUSTOM",
                                                cta: "Play",
                                                template: e.template,
                                                image: i,
                                                text: e.text,
                                                data: e.data,
                                                strategy: "LAST",
                                                notification: "PUSH"
                                            }).then(function () {
                                                null != t && (ccLog("\u9080\u8bf7\u597d\u53cb\u56de\u8c03"),
                                                    t())
                                            }).catch(function (e) {
                                                o.updateAsyncError(n, a, e, "\u9080\u8bf7\u597d\u53cb")
                                            })
                                    }
                            }).catch(function (e) {
                                o.updateAsyncError(n, a, e, "\u9080\u8bf7\u597d\u53cb")
                            });
                        break;
                    case faceBookSDKTest:
                        ccLog("\u9080\u8bf7\u597d\u53cb\u3002"),
                            null != t && t();
                        var r = new i;
                        r.initialize(e),
                            r.drawCompleteFun = function (e) {
                                ccLog(e)
                            }
                }
            },
            createAsync: function (e, t, i) {
                var n = this;
                switch (gameSDKName) {
                    case faceBookSDK:
                        ccLog("\u8c03\u7528createAsync\u65b9\u6cd5,\u521b\u5efaID\uff1a" + FBInstant.context.getID()),
                            FBInstant.context.createAsync(gameSDK.sdkPlayInfo.playerID).then(function () {
                                ccLog("createAsync\u65b9\u6cd5\u56de\u8c03,\u65b0ID\uff1a" + FBInstant.context.getID()),
                                    e && e()
                            }).catch(function (a) {
                                e && e(),
                                    n.updateAsyncError(t, i, a, "\u521b\u5efa\u623f\u95f4")
                            });
                        break;
                    case faceBookSDKTest:
                        e && e()
                }
            }
        }),
            cc._RF.pop()
    }
        , {
        GameCustomImage: "GameCustomImage"
    }],
    FacebookSDKTestData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "79b0aPyNA9GeJqL3NlzaFw+", "FacebookSDKTestData"),
            window.fbSaveDataKey = ["LinkGameBaseData002"],
            window.gameSaveDataKey = "LinkGame002",
            window.fbRankName = "LinkGameRank002",
            window.videoAdKeyList = ["276668990342375_279246430084631", "276668990342375_279246740084600", "276668990342375_279245806751360", "276668990342375_279246886751252", "276668990342375_279246970084577", "276668990342375_279247073417900", "276668990342375_279247203417887"],
            window.interstitialAdKeyList = ["276668990342375_279247440084530", "276668990342375_279247576751183", "276668990342375_279247676751173", "276668990342375_279247830084491", "276668990342375_279247943417813"],
            window.bannerAdKeyList = ["276668990342375_465285731480699"],
            window.createTestPlayer = function () {
                gameSDK.sdkPlayInfo.playerID = "12342",
                    gameSDK.sdkPlayInfo.name = "WordCross",
                    gameSDK.sdkPlayInfo.photo = "testhead",
                    gameSDK.sdkPlayInfo.photoSpriteFrameFun = function () {
                        return engine.memory.getSpriteFrame(needLoadImage.mastloadimg1, "headimg")
                    }
            }
            ,
            window.botData = {},
            window.getBotData = function () {
                return null == botData && (botData = {}),
                    botData
            }
            ,
            window.setFriendsList = function () { }
            ,
            window.addLoadingCircle = function () {
                openWindowLayer(openTypeEm.loading)
            }
            ,
            window.removeLoadingCircle = function () {
                Global.needSoonRemoveLoadingCircle = !0,
                    engine.eventM.emit(event_id.CLOSE_LOADING_LAYER)
            }
            ,
            window.createGameSureTitleWindow = function () {
                openWindowLayer(openTypeEm.tipsLayer, {
                    des: getLanguageDic(1010)
                })
            }
            ,
            window.getPlayerEntryRankData = function () {
                var e = new Object;
                return e.rank = 3,
                    e.playerID = gameSDK.sdkPlayInfo.playerID,
                    e.photo = gameSDK.sdkPlayInfo.photo,
                    e.name = gameSDK.sdkPlayInfo.name,
                    e.score = 500,
                    e
            }
            ,
            window.getPlayGamePlayerRankData = function () {
                return []
            }
            ,
            window.getConnectedPlayerEntriesRankData = function () {
                for (var e = [], t = [356, 13011, 13012, 12, 33, 44, 7, 8, 9, gameSDK.sdkPlayInfo.playerID], i = [9999999999, 11, 13, 12, 14, 15, 6, 7, 9, 24], n = 0; n < t.length; n++) {
                    var a = new Object;
                    a.name = "asdsadasdasdasdasd" + n,
                        t[n] == gameSDK.sdkPlayInfo.playerID && (a.name = "selfselfselfselfself"),
                        a.playerID = t[n],
                        a.photo = cc.resources.load("resources/headimg/bot" + n + ".png"),
                        a.rank = n + 1,
                        a.score = i[n],
                        e.push(a)
                }
                return e
            }
            ,
            window.getLocalEntriesRankData = function () {
                for (var e = [], t = [11, gameSDK.sdkPlayInfo.playerID, 13012, 13015, 44, 66, 78, 99, 1, 2], i = [9999999999, 11, 13, 12, 14, 15, 6, 7, 9, 24], n = 0; n < t.length; n++) {
                    var a = new Object;
                    a.name = "world" + n,
                        a.playerID = t[n],
                        a.photo = cc.resources.load("resources/headimg/bot" + n + ".png"),
                        a.score = i[n],
                        a.rank = n + 1,
                        e.push(a)
                }
                return e
            }
            ,
            window.getSupplementTestData = function () { }
            ,
            window.getPayTestData = function () {
                return {
                    purchaseToken: "123456",
                    productID: "9001",
                    signedRequest: "123"
                }
            }
            ,
            window.getSendFriendData = function () {
                var e = {}
                    , t = cc.url.raw("resources/testhead.png");
                return "undefined" != typeof FBInstant && (t = gameSDK.sdkPlayInfo.photo),
                    e.pngData = [{
                        url: t,
                        suffix: ".png",
                        posX: 46,
                        posY: 99,
                        imgWidth: 182,
                        imgHeight: 182
                    }, {
                        url: cc.url.raw("resources/invbg.png"),
                        suffix: ".png",
                        posX: 0,
                        posY: 0,
                        imgWidth: 750,
                        imgHeight: 380
                    }],
                    e.width = 750,
                    e.height = 380,
                    e.text = "Come and play together",
                    e.template = "play_turn",
                    e.data = {},
                    ccLog("data.pngData", e.pngData),
                    e
            }
            ,
            window.getShareData = function () {
                var e = {};
                return e.pngData = [{
                    url: cc.url.raw("resources/share.jpg"),
                    suffix: ".jpg",
                    posX: 0,
                    posY: 0,
                    imgWidth: 750,
                    imgHeight: 380
                }],
                    e.width = 750,
                    e.height = 380,
                    e.text = "invites you to play together",
                    ccLog("data.pngData", e.pngData),
                    e
            }
            ,
            window.getAppointInviteData = function (e) {
                var t = {}
                    , i = cc.url.raw("resources/testhead.png");
                return "undefined" != typeof FBInstant && (i = gameSDK.sdkPlayInfo.photo),
                    t.pngData = [{
                        url: i,
                        suffix: ".png",
                        posX: 46,
                        posY: 99,
                        imgWidth: 182,
                        imgHeight: 182
                    }, {
                        url: cc.url.raw("resources/invbg.png"),
                        suffix: ".png",
                        posX: 0,
                        posY: 0,
                        imgWidth: 750,
                        imgHeight: 380
                    }],
                    t.fontData = [],
                    t.width = 750,
                    t.height = 380,
                    t.playerID = e,
                    t.updateAsyncTemplate = "play_turn",
                    t.updateAsyncText = "Your friend is challenging you",
                    t.data = new Object,
                    t.data.id = gameSDK.sdkPlayInfo.id,
                    t.data.photo = gameSDK.sdkPlayInfo.photo,
                    t.data.name = gameSDK.sdkPlayInfo.name,
                    t.data.score = heroData.bestScore,
                    ccLog("data.pngData", t.pngData),
                    t
            }
            ,
            window.randomNameArr = ["Max Julia", "Nathan Anthony", "Asa Webb", "Phil Harrison", "Diana Hoyle", "Gloria Nelly", "Rodney Warner", "Eunice Peggy", "Henry Katrine", "Oscar Anderson", "Glenn Cocker", "Kerr Reade", "Lindsay Gill,", "Vito Hobbes", "Andy Hugh", "Elroy MacAdam", "Ternence Emma", "Ruth Harrington", "Sam Carmen", "Yvette Spenser", "Joy Eve", "Erin Christ", "Omar Maxwell", "Devin Theresa", "Godfery Collins", "Edwiin Becky", "Christopher Pop", "Aldrich White", "June Margery", "Dominic Larkin", "Jason Carllyle", "Armand Flower", "Ian Hughes", "Rex Burke", "Crystal Peg", "Quintina Petty", "Myron Yule", "Kay Noel", "Linda Felix", "Abel Smith", "Irene Fast", "Ruth Nell", "Wade Kit", "Ivy Grant", "Tom Pope", "Sibyl Rhodes", "Noel Lawrence", "Charles Edward", "Kirk Finn", "Ophelia Peter", "Candice Wild", "Bblythe Eveline", "Mary Philemon", "Grace Beerbohm", "Brian Rayleign", "Oscar Mark", "Will Carroll", "Cora Garcia", "Truman Kennedy", "Maurice Fanny", "Booth Birrell", "Eve DuBois", "Edwina Theresa", "Marsh Roland", "Salome Malan", "Ryan Ellis", "Morgan Chris", "Byron Tracy", "Eric Bertie", "Hazel Evan", "Chad Ferguson", "Dolores Adolph", "Ira Bell", "Basil Moses", "Eartha Lawson", "Lucien Harper", "Ivan Bulwer", "Gloria Jim", "Anna Aldridge", "Wilbur Dunlop", "Yale Bob", "Roberta Dewar", "Jo Bruce", "Simon Wallace", "Abel Christy", "Otis Copper", "Elva Sheridan", "Edison Horatio", "Christian Coco", "Betty Pater", "Janet Beaufort", "Norma Matthew", "Payne Anto", "Bertram Dewey", "Vera Ingersoll", "Vincent Holmes", "Jamie Lucy", "Aaron Ramsden", "Buck Daisy", "Howar Louisa", "Yvonne Wallis", "Nathan Oliver", "Ada Clara", "Caesar Henry", "Cynthia Noyes", "Nathaniel Leo", "Griffith Marcus", "Tabitha Pulit", "Chad Hewlett", "Patricia Yerkes", "Jennifer Nahum", "Alston Sophia", "Brian Martin", "Leif Hamilton", "Mike Conrad", "Coral Gus", "Matthew Isaac", "Broderick Joe", "Harold Cover", "Orville McCar", "Lena Giles", "Giles Anna", "Sophia Joyce", "Clare Carpenter", "Tab Yeates", "Jacqueline Cra", "Alvin MacArthur", "Alvis Garcia", "Omar Salome", "Maud Ferguson", "Eudora Cotton", "Lennon Dickens", "Robin Toby", "Zora Buck", "Tony Camilla", "Hedy Wordsworth", "Lesley Morgan", "Devin Maud", "Isidore Palmer", "Benson Scripps", "Phil Webster", "Hyman Pearson", "Magee", "Hilary Martha", "Grace Noah", "Arm Ernest", "Wendell Abraham", "Adair Acheson", "Betsy Larkin", "Marshall Walton", "Rex Bertha", "Nicole Harrod", "Arm Elinor", "Audrey Swin", "Elvira Tommy", "Roxanne Eveline", "Newman Bess", "Dominic Wood", "Nat Anderson", "Nelly James", "Gabriel Grote", "Joseph Darwin", "Gloria Joan", "Hubery Conan", "Tyrone Marion", "Sabina Dickey", "Emma Ernest", "Avery Raglan", "Maxine Sharp", "Sarah Felix", "Alfred Isabel", "Wright Gall", "Evange Lucius", "Burnell Gal", "Zoe Kennedy", "Gwend Oliver", "Alexia Ted", "Blanche Chaplin", "Aries Bell", "Dolores Lincoln", "Ulysses Guy", "Barnett Nick", "Yale Julian", "Wade Peter", "Benjamin Donne", "Miranda Douglas", "Jim Marshall", "Richard Van", "Saxon Leopold", "Ralap Milton", "Dave Surrey", "Emily Barney", "Thomas Christ", "Cliff Thoreau", "Jenny Quiller", "Marina Aldridge", "Augus Abe", "Quinn Irving", "Alice Zacharias", "Winifred Troll", "There Euphemia", "Mandy Spring", "Ida Dewar", "Geoffrey Parker", "Zenobia Gunther", "Raymond Carroll", "Jill Wilde", "Jacqueline Hugh", "Edwiin Eisen", "Lucien Henri", "Ingrid Patience", "Victor Wilhel", "Marvin Jennings", "Teresa Maria", "Faithe Rob", "Cherry Morrison", "Sandy Wagner"],
            cc._RF.pop()
    }
        , {}],
    FightControl: [function (e, t) {
        "use strict";
        cc._RF.push(t, "45823m7O9hEarxbDk9DYGg6", "FightControl"),
            window.lastTargetID = null,
            window.lastSurpassID = null;
        var i = e("MapData")
            , n = e("BossData")
            , a = e("CollectData")
            , o = e("LevelOverControl");
        cc.Class({
            properties: {
                mapData: null,
                levelDic: null,
                gridPos1: null,
                gridPos2: null,
                lastStepArr: null,
                curLevel: null,
                maxTime: null,
                curTime: null,
                itemObj: null,
                curScore: null,
                curLevelScore: null,
                surpassInfo: null,
                mapConfig: null,
                curLvDicID: null,
                isHaveParachute: null,
                targetNum: null,
                lastSurpass: null,
                targetScore: null,
                addScoreParachute: null,
                curResurgence: null,
                lastGrade: null,
                lastLevelArr: null,
                isWatch: null,
                curCustomTimes: null,
                addScore: null,
                rocketTargetPosArr: null,
                rocketGetScore: null,
                curCombo: null,
                bossData: null,
                levelOverControl: null,
                curLevelStar: null,
                levelStarTargetArr: null,
                challengeTime: 0,
                challengeScore: 0,
                challengeLevelCount: 0
            },
            initialize: function (e) {
                if (heroData.gameMode === GameModelEnum.challenge && (isHaveNewbie = !1),
                    this.curResurgence = 0,
                    this.targetScore = 0,
                    this.addScore = 0,
                    this.mapData = new i,
                    this.mapData.initialize(),
                    this.levelOverControl = new o,
                    this.levelOverControl.initialize(),
                    this.collectData = new a,
                    this.collectData.initialize(),
                    heroData.gameMode === GameModelEnum.challenge && heroData.challengeData,
                    this.challengeTime = heroData.challengeData.challengeTime,
                    null == e ? (this.lastLevelArr = [],
                        this.curLevel = parseInt(heroData.curLevel) + 1,
                        debugtest.chooseLv > 0 ? (this.curLevel = parseInt(debugtest.chooseLv),
                            heroData.totalScore = GameTool.getRandomInt(800 * this.curLevel, 1200 * this.curLevel),
                            debugtest.chooseLv = 0) : openModuleValue.chooseLv > 0 && (this.curLevel = parseInt(openModuleValue.chooseLv),
                                openModuleValue.chooseLv = 0),
                        this.targetNum = 0,
                        this.initItemObj(),
                        this.curScore = heroData.totalScore,
                        !0 === isHaveNewbie ? (this.curLevel = 1,
                            gaLogEvent.logByDate("\u8fdb\u5165\u5173\u5361", this.curLevel),
                            gameSDK.logEvent("jinruguanka", this.curLevel, {
                                jinruguanka: "jinruguanka"
                            }),
                            this.curLvDicID = getGlobleDic(26),
                            this.lastLevelArr = [this.curLvDicID]) : this.getRandomLevel(),
                        this.getLevelData(),
                        this.getCustomTargetScore(),
                        this.maxTime = this.getTotalTime(),
                        this.curTime = this.maxTime,
                        this.isHaveParachute = !1,
                        this.addScoreParachute = !1,
                        this.lastGrade = heroData.gradeData.getCurGradeByScore(),
                        this.getTargetInfo(),
                        heroData.curLevel = this.curLevel - 1) : (this.lastSurpass = e.lastSurpass,
                            this.targetNum = e.targetNum,
                            this.curLevel = e.curLevel,
                            this.maxTime = e.maxTime,
                            this.curTime = e.curTime,
                            this.itemObj = e.itemObj,
                            this.curScore = e.curScore,
                            this.targetScore = e.targetScore,
                            this.surpassInfo = e.surpassInfo,
                            this.curLvDicID = e.curLvDicID,
                            this.lastLevelArr = [this.curLvDicID],
                            this.isHaveParachute = e.isHaveParachute,
                            this.addScoreParachute = e.addScoreParachute,
                            this.curResurgence = e.curResurgence,
                            this.lastGrade = e.lastGrade,
                            this.getLevelData(e),
                            null == this.lastGrade && (this.lastGrade = heroData.gradeData.getCurGradeByScore())),
                    this.curCustomTimes = 1,
                    this.gridPos1 = null,
                    this.gridPos2 = null,
                    this.lastStepArr = [],
                    this.isWatch = !1,
                    null == e && !1 === isHaveNewbie) {
                    var t = this.createElement();
                    this.rearrangement(t)
                }
                1 === debugtest.quickDead && (this.targetScore = 9999999999)
            },
            getLevelData: function (e) {
                var t = getDicData(dataJson.level_json, this.curLvDicID);
                this.levelDic = t,
                    this.levelBlood = null,
                    this.conveyBeltConfig = "1|1|1|1|1|1|1|1|1|0|0|0|0|0|0|1|1|0|0|0|0|0|0|1|1|0|0|0|0|0|0|1|1|1|0|0|0|0|1|1|0|1|0|0|0|0|1|0|0|1|0|0|0|0|1|0|0|1|1|1|1|1|1|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0",
                    this.conveyBeltDir = 0,
                    this.mapData.collcetTypeNum = 0,
                    this.mapData.moveDir = t.Move || 0,
                    this.curLevelScore = 0,
                    isHaveNewbie ? this.mapConfig = "0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|31|0|0|0|0|31|0|0|0|32|0|0|12|0|0|0|0|36|0|0|36|0|0|0|0|0|12|14|0|0|0|0|0|0|19|29|0|0|0|0|0|32|21|21|16|0|0|0|0|0|19|29|0|0|0|0|0|16|0|0|14|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0" : 1 === debugtest.appointLevel ? this.mapConfig = "0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|-9|-9|-9|-9|0|0|0|-9|1|1|1|1|-9|0|0|-9|-10|-10|-10|-10|-9|0|0|-9|-10|-10|-10|-10|-9|0|0|-9|1|1|1|1|-9|0|0|0|-9|-9|-9|-9|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0" : this.mapConfig = null != e ? e.mapConfig : t.content;
                var i = t.Combo
                    , a = t.IsBoss;
                if (1 === debugtest.testBoss && (a = 1),
                    a > 0) {
                    var o = t.AttType || fightControl.curLevel > 50 ? 1 : 0
                        , r = t.HP_Boss || 0;
                    null == this.bossData ? (this.bossData = new n,
                        this.bossData.initialize(a, r, o)) : this.bossData.refreshBossInfo(a, r, o)
                } else
                    1 === i && (this.levelBlood = 3);
                this.mapData.refreshMapByConfig(this.mapConfig),
                    this.collectData.initCollectInfo()
            },
            fightAddScore: function (e) {
                heroData.gameMode === GameModelEnum.challenge ? this.challengeScore += e : (this.addScore += e,
                    this.curLevelScore += e,
                    this.curScore += e)
            },
            getCustomTargetScore: function () {
                var e = getDicData(dataJson.levelscore_json, this.curLevel);
                null == e ? this.targetScore += getGlobleDic(32) : this.targetScore = e.score
            },
            getTargetInfo: function () {
                if (this.lastSurpass = this.surpassInfo,
                    this.surpassInfo = null,
                    !isHaveNewbie) {
                    this.surpassInfo = this.getRandomPlayerInfo(lastTargetID);
                    var e = heroData.totalScore;
                    switch (null != this.lastSurpass && (e = this.lastSurpass.score),
                    this.targetNum) {
                        case 0:
                            this.surpassInfo.score = e + GameTool.getRandomInt(200, 400);
                            break;
                        case 1:
                            this.surpassInfo.score = e + GameTool.getRandomInt(300, 600);
                            break;
                        default:
                            this.surpassInfo.score = e + GameTool.getRandomInt(800, 1600)
                    }
                    lastTargetID = this.surpassInfo.playerID,
                        this.targetNum++
                }
            },
            getSurpassInfo: function () {
                var e = null;
                null != this.surpassInfo && (e = this.surpassInfo.playerID);
                var t = this.getRandomPlayerInfo(lastSurpassID, e);
                return t.score = this.curScore - GameTool.getRandomInt(10, this.curScore - 50),
                    lastSurpassID = t.playerID,
                    t
            },
            getRandomPlayerInfo: function (e, t) {
                for (var i = {}, n = [], a = gameSDK.leaderboard.getPassPerson(), o = 0; o < a.length; o++) {
                    var r = a[o].playerID;
                    r !== e && r !== t && r !== gameSDK.sdkPlayInfo.playerID && n.push(a[o])
                }
                if (n.length <= 0) {
                    for (var s = 0; s < 10; s++)
                        s !== e && s !== t && n.push(s);
                    var c = n[GameTool.getRandomInt(0, n.length - 1)]
                        , l = {};
                    l.playerID = c,
                        l.photo = cc.resources.load("resources/headimg/bot" + c + ".png"),
                        l.name = randomNameArr[c],
                        i = l
                } else {
                    var h = n[GameTool.getRandomInt(0, n.length - 1)];
                    i.playerID = h.playerID,
                        i.photo = h.photo,
                        i.name = h.name
                }
                return i
            },
            getGameConfig: function () {
                var e = {};
                return e.lastSurpass = this.lastSurpass,
                    e.curLevel = this.curLevel,
                    e.targetNum = this.targetNum,
                    e.maxTime = this.maxTime,
                    e.curTime = this.curTime,
                    e.itemObj = this.itemObj,
                    e.curScore = this.curScore,
                    e.surpassInfo = this.surpassInfo,
                    e.mapConfig = this.mapData.getMapConfig(),
                    e.curLvDicID = this.curLvDicID,
                    e.isHaveParachute = this.isHaveParachute,
                    e.targetScore = this.targetScore,
                    e.addScoreParachute = this.addScoreParachute,
                    e.curResurgence = this.curResurgence,
                    e.lastGrade = this.lastGrade,
                    e
            },
            rePlayCurLevel: function () {
                this.gotoNextLevel(!0)
            },
            gotoNextLevel: function (e) {
                this.bossData = null,
                    this.isHaveParachute = !1,
                    this.curLevel = parseInt(heroData.curLevel) + (e ? 0 : 1),
                    this.curCustomTimes++,
                    this.gridPos1 = null,
                    this.gridPos2 = null,
                    this.lastStepArr = [],
                    this.getRandomLevel(),
                    heroData.gameMode !== GameModelEnum.challenge && (this.maxTime = this.getTotalTime(),
                        this.curTime = this.maxTime),
                    this.getLevelData(),
                    this.getCustomTargetScore();
                var t = this.createElement();
                this.rearrangement(t)
            },
            resurgenceData: function (e) {
                switch (this.isHaveParachute = !1,
                this.gridPos1 = null,
                this.gridPos2 = null,
                this.lastStepArr = [],
                e) {
                    case endGameTypeEm.timeout:
                        this.curTime = getGlobleDic(22);
                        break;
                    case endGameTypeEm.noBlood:
                        this.levelBlood = 3,
                            this.curTime < getGlobleDic(22) && (this.curTime = getGlobleDic(22))
                }
            },
            getTotalTime: function () {
                return heroData.gameMode === GameModelEnum.challenge ? this.challengeTime : getDicData(dataJson.level_json, this.curLvDicID, "time")
            },
            getStarsNum: function () {
                var e = this.levelDic;
                this.curLevelStar = 0;
                for (var t = 1; t <= 3; t++)
                    this.curLevelScore >= e["star" + t] && this.curLevelStar++;
                return this.curLevelStar
            },
            getStarScore: function () {
                var e = 0;
                switch (this.getStarsNum()) {
                    case 0:
                        break;
                    case 1:
                        e += getGlobleDic(29);
                        break;
                    case 2:
                        e += getGlobleDic(30);
                        break;
                    case 3:
                        e += getGlobleDic(31)
                }
                return e
            },
            getOneStarScore: function (e) {
                var t = 0;
                switch (e) {
                    case 1:
                        t = getGlobleDic(29);
                        break;
                    case 2:
                        t += getGlobleDic(30) - getGlobleDic(29);
                        break;
                    case 3:
                        t += getGlobleDic(31) - getGlobleDic(30)
                }
                return t
            },
            getComboTotalScore: function (e) {
                return Math.ceil(e * (6 + 3 * (e - 1)) / 2)
            },
            initItemObj: function () {
                this.itemObj = {};
                for (var e = getGlobleDic(15).split(","), t = 0; t < e.length; t++) {
                    var i = e[t].split("|");
                    this.itemObj[parseInt(i[0])] = parseInt(i[1])
                }
            },
            getRandomLevel: function () {
                gaLogEvent.logByDate("\u8fdb\u5165\u5173\u5361", this.curLevel),
                    gameSDK.logEvent("jinruguanka", this.curLevel, {
                        jinruguanka: "jinruguanka"
                    }),
                    heroData.gameMode !== GameModelEnum.challenge ? this.curLevel > getGlobleDic(5) ? this.curLevel % 6 == 0 ? (this.curLvDicID = GameTool.getRandomInt(getGlobleDic(35), getGlobleDic(36)),
                        this.curLvDicID -= this.curLvDicID % 6) : this.curLvDicID = function e() {
                            var t = GameTool.getRandomInt(getGlobleDic(35), getGlobleDic(36));
                            return t % 6 == 0 && (t = e()),
                                t
                        }() : this.curLvDicID = this.curLevel : this.getChallengeLevel()
            },
            getChallengeLevel: function () {
                var e = 50 * this.challengeLevelCount + 1;
                return this.curLevel = GameTool.getRandomInt(e, e + 49),
                    this.curLevel % 6 == 0 ? this.getChallengeLevel() : (this.curLevel > getGlobleDic(5) ? this.curLvDicID = GameTool.getRandomInt(getGlobleDic(35), getGlobleDic(36)) : this.curLvDicID = this.curLevel,
                        this.curLvDicID % 6 == 0 ? this.getChallengeLevel() : getDicData(dataJson.level_json, this.curLvDicID).BD_Num > 0 ? this.getChallengeLevel() : void 0)
            },
            createElement: function (e) {
                var t = null == e ? (this.mapData.remainGrid - this.mapData.specialGridNum) / 2 : e
                    , i = [];
                if (this.curLevel >= getGlobleDic(3) && null == e)
                    for (var n = [itemIDConfig.addTime, itemIDConfig.bomb, itemIDConfig.tips], a = GameTool.getRandomInt(0, getGlobleDic(10)), o = 0; o < a; o++) {
                        var r = GameTool.getRandomInt(0, n.length - 1);
                        i.push(n[r])
                    }
                for (var s = [], c = 0; c < getGlobleDic(6); c++)
                    s.push(c + 1);
                for (var l in heroData.levelData.lockPuzzleGridObj)
                    s.push(heroData.levelData.lockPuzzleGridObj[l]);
                var h = this.levelDic;
                if (s.sort(function () {
                    return Math.random() - .5
                }),
                    this.curLevel > 1 && this.curLevel % (puzzleCellRow * puzzleCellCol) == 1) {
                    var d = heroData.levelData.lockPuzzleGridObj[heroData.levelData.getPuzzleImgIndexByLevel(this.curLevel - 1)];
                    d > 1 && s.unshift(d)
                }
                s = s.slice(0, h.maxelement),
                    i = i.concat(s);
                for (var u = h.sameelement - 1, m = [], g = 0; g < u; g++) {
                    var p = s.slice(0);
                    m = m.concat(p)
                }
                var f = t - i.length
                    , y = f - m.length;
                if (y > 0)
                    for (var C = 0; C < y; C++)
                        m.push(m[0]);
                m.sort(function () {
                    return Math.random() - .5
                });
                for (var v = 0; v < f; v++)
                    i.push(m[v]);
                i.length > t && (i = i.slice(0, t));
                var D = i.slice(0);
                return i = i.concat(D),
                    this.checkCreateData(i),
                    i
            },
            createSpecialElement: function (e, t) {
                var i = e / 2
                    , n = []
                    , a = []
                    , o = [];
                switch (t) {
                    case specialGridType.birdcage:
                        o = [1, 1 + getGlobleDic(6) - 1];
                        break;
                    case specialGridType.flower:
                        o = [specialGridType.flower, specialGridType.flower + specialGridTypeNum.flower - 1]
                }
                for (var r = o[0]; r < o[1]; r++)
                    n.push(r);
                n.sort(function () {
                    return Math.random() - .5
                });
                for (var s = 0; s < i; s++)
                    a.push(n.pop());
                var c = a.slice(0);
                return (a = a.concat(c)).sort(function () {
                    return Math.random() - .5
                }),
                    a
            },
            checkCreateData: function (e) {
                for (var t = 0, i = 0; i < e.length; i++) {
                    t = 0;
                    for (var n = 0; n < e.length; n++)
                        e[n] === e[i] && t++;
                    if (t % 2 != 0)
                        return void cc.error("\u5173\u5361\u6570\u636e\u521b\u5efa\u9519\u8bef", e)
                }
            },
            rearrangement: function (e) {
                var t = !1
                    , i = null;
                if (null == e) {
                    i = this.mapData.getHaveArr(),
                        t = !0,
                        e = [];
                    for (var n = 0; n < i.length; n++) {
                        var a = {};
                        a.gridID = i[n].gridID,
                            a.otherType = i[n].otherType,
                            e.push(a)
                    }
                } else
                    i = this.mapData.getHaveArr(!0);
                for (var o = 0; ;) {
                    if (11 == ++o) {
                        if (this.mapData.clearAllParry(),
                            i = this.mapData.getHaveArr(),
                            t = !0,
                            e = [],
                            null != this.collectData.collectObj)
                            for (var r = this.mapData.createTwoCollectGrid(), s = 0; s < r.length; s++) {
                                var c = this.mapData.getGridDataByPos(r[s]);
                                i.push(c)
                            }
                        for (var l = 0; l < i.length; l++) {
                            var h = {};
                            h.gridID = i[l].gridID,
                                h.otherType = i[l].otherType,
                                e.push(h)
                        }
                    }
                    if (e.sort(function () {
                        return Math.random() - .5
                    }),
                        t)
                        for (var d = 0; d < i.length; d++)
                            i[d].refreshGridID(e[d].gridID),
                                i[d].refreshGridOther(e[d].otherType);
                    else
                        for (var u = 0; u < i.length; u++)
                            i[u].refreshGridID(e[u]);
                    if (this.getHaveCanDeleteWay().length > 1)
                        return void ccLog("....\u968f\u673a\u6392\u5217\u4e86\u51e0\u6b21...." + o + "  \u8fd9\u4e2a\u5173\u5361..." + this.curLvDicID);
                    if (o >= 100)
                        return void ccLog(".......\u6392\u4e86100\u6b21\u90fd\u6ca1\u627e\u5230\u80fd\u7528\u7684,\u8fd9\u4e2a\u5173\u5361..." + this.curLvDicID)
                }
            },
            addItem: function (e, t) {
                null == t && (t = 1),
                    null == this.itemObj[e] && (this.itemObj[e] = 0),
                    this.itemObj[e] += t
            },
            getItemNum: function (e) {
                var t = 0;
                return t += heroData.getItemNum(e),
                    null != this.itemObj[e] && (t += this.itemObj[e]),
                    t
            },
            useItem: function (e) {
                null != this.itemObj[e] && this.itemObj[e] > 0 ? this.itemObj[e]-- : (1 === debugtest.itemMore ? heroData.addItemNum(e, 0) : heroData.addItemNum(e, -1),
                    heroData.saveData())
            },
            deleteGrid: function (e) {
                if (null != e)
                    this.deleteGridData(e);
                else {
                    var t = {}
                        , i = this.mapData.getGridDataByPos(this.gridPos1)
                        , n = this.mapData.getGridDataByPos(this.gridPos2);
                    null != this.gridPos1 && (t.pos1 = this.gridPos1,
                        null != i && (t.gridID1 = i.gridID)),
                        null != this.gridPos2 && (t.pos2 = this.gridPos2,
                            null != n && (t.gridID2 = n.gridID)),
                        this.lastStepArr.push(t),
                        this.deleteGridData([this.gridPos1, this.gridPos2])
                }
            },
            deleteGridData: function (e) {
                for (var t = [], i = 0; i < e.length; i++)
                    t[i] = this.mapData.getGridDataByPos(e[i]);
                engine.eventM.emit(event_id.DELETE_GRID, t[0]),
                    this.fmtSpecialGrid(t);
                for (var n = 0; n < 2; n++)
                    this.mapData.deleteGrid(e[n]);
                this.gridPos1 = null,
                    this.gridPos2 = null,
                    this.fmtArroundGrid(e)
            },
            fmtSpecialGrid: function (e) {
                var t = [e[0].gridPos, e[1].gridPos];
                if (e[0].gridID === gridTypeEm.rocket && this.mapData.remainGrid >= 4 && !fightControl.bossData) {
                    var i = this.mapData.getRocketTargetPosArr(e[0], e[1])
                        , n = [];
                    if (i && i.length > 1) {
                        for (var a = 0; a < i.length; a++)
                            n[a] = i[a].gridPos;
                        e[0].targetPos = n[0],
                            e[1].targetPos = n[1]
                    }
                } else if (e[0].gridID === gridTypeEm.demon) {
                    var o = this.mapData.addDemonGridPos(t)
                        , r = this.createElement(o.length / 2);
                    r.sort(function () {
                        return Math.random() - .5
                    }),
                        e[0].demonPosArr = o,
                        e[1].demonPosArr = o,
                        this.mapData.addGridData(r, o)
                } else
                    e[0].otherType === gridTypeEm.flower ? this.collectData.collectTargetByType(collectTypeEm.flower, 2) : e[0].isClawball() && this.collectData.collectClawball(e[0].otherType)
            },
            fmtArroundGrid: function (e) {
                this.collectData.egg.curNum > 0 && this.refreshArroundGrid(e, gridTypeEm.egg),
                    this.collectData.bonfire.curNum > 0 && this.refreshArroundGrid(e, gridTypeEm.bonfire),
                    this.collectData.birdcage.curNum > 0 && this.refreshArroundGrid(e, gridTypeEm.birdcage),
                    this.collectData.flower.curNum > 0 && this.refreshArroundGrid(e, gridTypeEm.flower),
                    this.collectData.clawball.curNum > 0 && (this.refreshArroundGrid(e, gridTypeEm.clawball1),
                        this.refreshArroundGrid(e, gridTypeEm.clawball2))
            },
            refreshArroundGrid: function (e, t) {
                for (var i = [], n = 0; n < e.length; n++)
                    for (var a = e[n].y - 1; a <= e[n].y + 1; a++)
                        for (var o = e[n].x - 1; o <= e[n].x + 1; o++)
                            1 === Math.abs(e[n].y - a) + Math.abs(e[n].x - o) && null != this.mapData.gridArr[a] && null != this.mapData.gridArr[a][o] && this.mapData.gridArr[a][o].otherType === t && i.push(JSON.parse(JSON.stringify(this.mapData.gridArr[a][o].gridPos)));
                for (var r = 0; r < i.length; r++) {
                    var s = this.mapData.getGridDataByPos(i[r]);
                    switch (t) {
                        case gridTypeEm.egg:
                            s.collectGridEgg();
                            break;
                        case gridTypeEm.bonfire:
                            s.refreshFireNum(1);
                            break;
                        case gridTypeEm.birdcage:
                            s.refreshBirdcageNum();
                            break;
                        case gridTypeEm.flower:
                            s.refreshFlower();
                            break;
                        case gridTypeEm.clawball1:
                        case gridTypeEm.clawball2:
                            s.refreshClawball()
                    }
                }
            },
            refreshFireNum: function () {
                for (var e = 0; e < this.mapData.fireGridPosArr.length; e++)
                    this.mapData.getGridDataByPos(this.mapData.fireGridPosArr[e]).refreshFireNum(2)
            },
            rollback: function () {
                var e = [];
                if (this.lastStepArr.length <= 0)
                    return e;
                var t = this.lastStepArr.pop();
                return null != t.pos1 && null != t.gridID1 && (this.mapData.remainGrid++,
                    this.mapData.getGridDataByPos(t.pos1).refreshGridID(t.gridID1),
                    e.push(t.pos1)),
                    null != t.pos2 && null != t.gridID2 && (this.mapData.remainGrid++,
                        this.mapData.getGridDataByPos(t.pos2).refreshGridID(t.gridID2),
                        e.push(t.pos2)),
                    e
            },
            changeChoose: function (e) {
                var t = this.gridPos1;
                return this.gridPos1 = e,
                    this.gridPos2 = null,
                    fightControl.levelBlood > 0 && e && this.mapData.getGridDataByPos(e).otherType !== gridTypeEm.question && (this.gridPos1 = null),
                    t
            },
            getHaveCanDeleteWay: function () {
                for (var e = this.mapData.gridArr, t = 0; t < e.length; t++)
                    for (var i = 0; i < e[t].length; i++) {
                        var n = e[t][i];
                        if (!1 !== n.isUsable()) {
                            var a = this.findCanLinkWay(n.gridPos);
                            if (a.length > 1)
                                return a
                        }
                    }
                return []
            },
            findCanLinkWay: function (e) {
                var t = [e]
                    , i = this.mapData.getGridDataByPos(e)
                    , n = this.getGridThroughArr(e)
                    , a = this.isHaveSame(n, e);
                if (null != a)
                    t.push(a);
                else {
                    for (var o = !1, r = [], s = 0; s < n.length; s++)
                        if (this.isEmptyByPos(n[s])) {
                            for (var c = this.getGridThroughArr(n[s]), l = 0; l < c.length; l++) {
                                var h = c[l];
                                if (!isSamePos(h, e)) {
                                    var d = this.mapData.getGridDataByPos(h);
                                    if (null != d) {
                                        if (d.gridID === i.gridID) {
                                            t.push(n[s]),
                                                t.push(h),
                                                o = !0;
                                            break
                                        }
                                        d.isEmpty() && r.push({
                                            pos: h,
                                            lastPos: n[s]
                                        })
                                    } else
                                        r.push({
                                            pos: h,
                                            lastPos: n[s]
                                        })
                                }
                            }
                            if (o)
                                break
                        }
                    if (!o)
                        for (var u = 0; u < r.length; u++) {
                            var m = this.getGridThroughArr(r[u].pos)
                                , g = this.isHaveSame(m, e);
                            if (null != g) {
                                t.push(r[u].lastPos),
                                    t.push(r[u].pos),
                                    t.push(g);
                                break
                            }
                        }
                }
                return t
            },
            isHaveSame: function (e, t) {
                for (var i = this.mapData.getGridDataByPos(t), n = 0; n < e.length; n++) {
                    var a = e[n]
                        , o = this.mapData.getGridDataByPos(a);
                    if (null != o && !isSamePos(a, t) && o.gridID === i.gridID)
                        return a
                }
                return null
            },
            isEmptyByPos: function (e) {
                var t = this.mapData.getGridDataByPos(e);
                return null == t || t.isEmpty()
            },
            getChooseLinkWay: function () {
                return null == this.gridPos1 || null == this.gridPos2 ? [] : this.getGridGoWay(this.gridPos1, this.gridPos2)
            },
            getGridGoWay: function (e, t) {
                var i = [e]
                    , n = this.getGridThroughArr(e);
                if (this.wayIsPass(n, t))
                    i.push(t);
                else {
                    for (var a = !1, o = [], r = 0; r < n.length; r++)
                        if (this.isEmptyByPos(n[r])) {
                            for (var s = this.getGridThroughArr(n[r]), c = 0; c < s.length; c++) {
                                var l = s[c];
                                if (isSamePos(l, t)) {
                                    i.push(n[r]),
                                        i.push(t),
                                        a = !0;
                                    break
                                }
                                this.isEmptyByPos(l) && o.push({
                                    pos: l,
                                    lastPos: n[r]
                                })
                            }
                            if (a)
                                break
                        }
                    if (!a)
                        for (var h = 0; h < o.length; h++) {
                            var d = this.getGridThroughArr(o[h].pos);
                            if (this.wayIsPass(d, t)) {
                                i.push(o[h].lastPos),
                                    i.push(o[h].pos),
                                    i.push(t);
                                break
                            }
                        }
                }
                return i
            },
            wayIsPass: function (e, t) {
                for (var i = 0; i < e.length; i++)
                    if (isSamePos(e[i], t))
                        return !0;
                return !1
            },
            getGridThroughArr: function (e) {
                for (var t = [], i = this.mapData, n = function (e) {
                    var n = !1
                        , a = i.getGridDataByPos(e);
                    return null == a ? t.push(e) : a.isEmpty() ? t.push(e) : a.isParry() ? n = !0 : (t.push(e),
                        n = !0),
                        n
                }, a = e.x + 1; a <= i.mapWight && !0 !== n({
                    x: a,
                    y: e.y
                }); a++)
                    ;
                for (var o = e.x - 1; o >= -1 && !0 !== n({
                    x: o,
                    y: e.y
                }); o--)
                    ;
                for (var r = e.y - 1; r >= -1 && !0 !== n({
                    x: e.x,
                    y: r
                }); r--)
                    ;
                for (var s = e.y + 1; s <= i.mapHeight && !0 !== n({
                    x: e.x,
                    y: s
                }); s++)
                    ;
                return t
            },
            endGetGem: function (e) {
                if (null != e) {
                    var t = getGlobleDic(18) + getGlobleDic(23) * (e - 1);
                    return t > getGlobleDic(34) && (t = getGlobleDic(34)),
                        t
                }
                var i = getGlobleDic(18) + getGlobleDic(23) * (this.curLevel - 1);
                return Math.ceil(i / 2)
            },
            getScore: function (e) {
                return this.curCombo,
                    e
            },
            getComboScore: function () {
                return 1 * this.curCombo
            },
            isDelayModel: function () {
                return this.conveyBeltDir > 0
            }
        }),
            cc._RF.pop()
    }
        , {
        BossData: "BossData",
        CollectData: "CollectData",
        LevelOverControl: "LevelOverControl",
        MapData: "MapData"
    }],
    FightMapLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "c0df5uYNYlGqYU93Ua+VLLp", "FightMapLayer"),
            window.gridScale = 1.1;
        var i = 75 * gridScale
            , n = 75 * gridScale
            , a = -262 - 300 * (gridScale - 1)
            , o = 408 + 450 * (gridScale - 1);
        window.curMapChangeTypeEm = cc.Enum({
            normal: 0,
            gotoNext: 1,
            rearrangement: 2,
            bossDied: 3,
            collectALL: 4,
            noConveyBelt: 5,
            deleteItem: 6
        }),
            window.endGameTypeEm = cc.Enum({
                timeout: 0,
                noBlood: 1
            }),
            cc.Class({
                extends: cc.Component,
                properties: {
                    gridNodeComArr: null,
                    isCanClick: null,
                    parentLayer: null,
                    curCombo: null,
                    lastLineTime: null,
                    comboTime: null,
                    tipsGrid1: null,
                    tipsGrid2: null,
                    curGetScore: null,
                    isCreateCall: null,
                    playCongratulation: null,
                    maxComboNum: null,
                    mapType: null,
                    bossLayer: null
                },
                onDestroy: function () {
                    this.removeDataEvent(),
                        this.gridNodeComArr = null,
                        this.isCanClick = null,
                        this.parentLayer = null,
                        this.lastLineTime = null,
                        this.comboTime = null,
                        this.tipsGrid1 = null,
                        this.tipsGrid2 = null,
                        this.curGetScore = null,
                        this.isCreateCall = null,
                        this.playCongratulation = null,
                        this.maxComboNum = null,
                        this.bossLayer = null
                },
                destroyClass: function () {
                    if (null != this.gridNodeComArr)
                        for (var e = 0; e < this.gridNodeComArr.length; e++)
                            for (var t = 0; t < this.gridNodeComArr[e].length; t++)
                                this.gridNodeComArr[e][t].destroyClass();
                    null != this.node && this.node.destroy()
                },
                addDataEvent: function () {
                    engine.eventM.on(event_id.CLOSE_NEW_ELEMENT, this.closeNewElementCall, this),
                        engine.eventM.on(event_id.REWARD_ADD_SCORE_PARACHUTE, this.parachuteAddScore, this),
                        engine.eventM.on(event_id.ADD_SCORE_COMBO, this.lineChangeData, this),
                        engine.eventM.on(event_id.DELETE_GRID, this.deleteGridEvent, this),
                        engine.eventM.on(event_id.COLLECT_LEVEL_TARGET, this.refreshLevelTargetNum, this),
                        engine.eventM.on(event_id.MOVE_GRID_OVER, this.overCallback3, this),
                        engine.eventM.on(event_id.EVENT_CONGRATULATIONS, this.showCongratulations, this)
                },
                removeDataEvent: function () {
                    engine.eventM.off(event_id.CLOSE_NEW_ELEMENT, this.closeNewElementCall, this),
                        engine.eventM.off(event_id.REWARD_ADD_SCORE_PARACHUTE, this.parachuteAddScore, this),
                        engine.eventM.off(event_id.ADD_SCORE_COMBO, this.lineChangeData, this),
                        engine.eventM.off(event_id.DELETE_GRID, this.deleteGridEvent, this),
                        engine.eventM.off(event_id.COLLECT_LEVEL_TARGET, this.refreshLevelTargetNum, this),
                        engine.eventM.off(event_id.MOVE_GRID_OVER, this.overCallback3, this),
                        engine.eventM.off(event_id.EVENT_CONGRATULATIONS, this.showCongratulations, this)
                },
                initialize: function (e) {
                    this.addOtherComponent(),
                        this.maxComboNum = 0,
                        this.addDataEvent(),
                        this.parentLayer = e,
                        this.gridNodeComArr = [],
                        this.resetCombo(),
                        this.getComboTime();
                    for (var t = fightControl.mapData, r = 0; r < t.gridArr.length; r++) {
                        this.gridNodeComArr[r] = [];
                        for (var s = 0; s < t.gridArr[r].length; s++) {
                            var c = engine.memory.getPrefab(needLoadPrefab.grid_node_prefab);
                            this.node.addChild(c),
                                c.x = a + i * s,
                                c.y = o - n * r,
                                c.scale = gridScale;
                            var l = c.addComponent("GridNode");
                            l.initialize({
                                x: s,
                                y: r
                            }, this),
                                l.setZIndex(),
                                this.gridNodeComArr[r].push(l)
                        }
                    }
                    this.isCanClick = !1
                },
                addOtherComponent: function () {
                    this.addComponent("Grid_Rocket"),
                        this.addComponent("Grid_Demon"),
                        this.dragonflyLayer = this.addComponent("Grid_Dragonfly"),
                        this.dragonflyLayer.initialize(),
                        this.comboActionCom = this.addComponent("ComboAction"),
                        this.scoreActionCom = this.addComponent("ScoreAction"),
                        this.lineStarCom = this.addComponent("LineStarAction")
                },
                runCreateAction: function () {
                    var e = this;
                    this.isCreateCall = !1;
                    var t = function () {
                        e.createCallFun()
                    };
                    this.initCollectInfo();
                    for (var i = 0; i < this.gridNodeComArr.length; i++)
                        for (var n = 0; n < this.gridNodeComArr[i].length; n++)
                            this.gridNodeComArr[i][n].createAction(t);
                    this.parentLayer.refreshSurpassLayer()
                },
                initCollectInfo: function () {
                    this.curDragonflyNum = fightControl.collectData.dragonfly.needNum,
                        this.curEggNum = fightControl.collectData.egg.needNum,
                        this.needLightFireNum = fightControl.collectData.bonfire.needNum,
                        this.curBirdcageNum = fightControl.collectData.birdcage.needNum,
                        this.curFlowerNum = fightControl.collectData.flower.needNum,
                        this.curClawballNum = fightControl.collectData.clawball.needNum,
                        this.needCollcetTypeNum = fightControl.collectData.needCollcetTypeNum
                },
                createCallFun: function () {
                    if (!this.isCreateCall) {
                        if (this.isCreateCall = !0,
                            this.maxComboNum = 0,
                            this.playCongratulation = !1,
                            this.isCanClick = !0,
                            this.parentLayer.pause = !1,
                            this.parentLayer.isHaveCustom = !0,
                            this.parentLayer.resetTipsTime(),
                            this.parentLayer.resetItemTipsTime(),
                            this.parentLayer.resetCloudTime(),
                            this.parentLayer.refreshLevelBlood(),
                            this.parentLayer.showNewbieLayer(),
                            this.dragonflyLayer.refreshDragonNode(),
                            this.checkNewElement(),
                            null != fightControl.bossData)
                            if (null == this.bossLayer) {
                                var e = engine.memory.getPrefab(needLoadPrefab.boss_layer_prefab)
                                    , t = e.addComponent("BossLayer");
                                t.initialize(this),
                                    this.bossLayer = t,
                                    this.node.addChild(e, fightZIndexConfig.lineZIndex + 1)
                            } else
                                this.refreshBoss();
                        this.parentLayer.node.getChildByName("fightbloodbg").active = fightControl.levelBlood > 0
                    }
                },
                checkNewElement: function () {
                    if (heroData.gameMode !== GameModelEnum.challenge) {
                        var e = -1;
                        for (var t in newElementConfig) {
                            var i = newElementConfig[t].lv;
                            if (null == heroData.newElementObj[t] && fightControl.curLevel === i) {
                                e = parseInt(t),
                                    heroData.newElementObj[t] = 1,
                                    heroData.saveData();
                                break
                            }
                        }
                        1 === debugtest.newElement && (e = 1),
                            e >= 0 && (this.isCanClick = !1,
                                this.parentLayer.pause = !0,
                                openWindowLayer(openTypeEm.newElement, e))
                    }
                },
                clearBossLayer: function () {
                    null != this.bossLayer && (this.bossLayer.node.destroy(),
                        this.bossLayer = null)
                },
                closeNewElementCall: function () {
                    this.isCanClick = !0,
                        this.parentLayer.pause = !1
                },
                getGridNodeComByPos: function (e) {
                    return null == this.gridNodeComArr[e.y] || null == this.gridNodeComArr[e.y][e.x] ? (ccLog(".....bug\u4e86\uff0c\u5750\u6807..." + e.x + "  ," + e.y),
                        null) : this.gridNodeComArr[e.y][e.x]
                },
                resetCombo: function (e) {
                    this.comboActionCom.resetCombo(e)
                },
                clickGrid: function (e) {
                    if (this.parentLayer.resetTipsTime(),
                        this.clearTips(),
                        null == fightControl.gridPos1)
                        fightControl.gridPos1 = e,
                            this.getGridNodeComByPos(e).refreshChoose();
                    else if (isSamePos(e, fightControl.gridPos1))
                        fightControl.gridPos1 = null,
                            this.getGridNodeComByPos(e).refreshChoose();
                    else {
                        var t = fightControl.mapData.getGridDataByPos(fightControl.gridPos1)
                            , i = fightControl.mapData.getGridDataByPos(e);
                        if (t.gridID !== i.gridID)
                            this.resetChoose(e),
                                t.otherType === gridTypeEm.question && i.otherType === gridTypeEm.question || this.resetCombo(e);
                        else {
                            fightControl.gridPos2 = e;
                            var n = fightControl.getChooseLinkWay();
                            n.length <= 1 ? (this.resetCombo(e),
                                this.resetChoose(e)) : (this.getGridNodeComByPos(e).refreshChoose(),
                                    this.drawWay(n))
                        }
                    }
                },
                resetChoose: function (e) {
                    var t = fightControl.changeChoose(e);
                    fightControl.gridPos1 && this.getGridNodeComByPos(fightControl.gridPos1).refreshChoose(),
                        t && this.getGridNodeComByPos(t).refreshChoose()
                },
                resetTip: function () {
                    this.tipsGrid1 && this.tipsGrid1.refreshChoose && this.tipsGrid1.refreshChoose(),
                        this.tipsGrid2 && this.tipsGrid2.refreshChoose && this.tipsGrid2.refreshChoose()
                },
                getComboTime: function () {
                    this.comboTime = getGlobleDic(16)
                },
                lineChangeData: function (e) {
                    var t = this
                        , i = fightControl.mapData.getGridDataByPos(e[0])
                        , n = i.isItem()
                        , a = i.gridID;
                    fightControl.deleteGrid(e),
                        fightControl.collectData.getCollectNumByType(collectTypeEm.dragonfly) > 0 && fightControl.mapData.moveDragonGrid(1),
                        fightControl.mapData.moveDir > 0 && (this.isCanClick = !1),
                        null != fightControl.bossData && fightControl.bossData.bossBeatBack(),
                        null != this.bossLayer && i.otherType !== gridTypeEm.rocket && this.bossLayer.bossBeatBack(attackBossTypeEm.normal),
                        fightControl.curCombo++,
                        fightControl.curCombo > this.maxComboNum && (this.maxComboNum = fightControl.curCombo);
                    var o = this.checkGameStatus(e[0], n);
                    return this.mapType = o,
                        heroData.saveData(),
                        n && o === curMapChangeTypeEm.deleteItem && setTimeout(function () {
                            t.parentLayer.autoUseItem(a)
                        }, this.isCanClick ? 500 : 1500),
                        o
                },
                checkGameStatus: function (e, t) {
                    var i = null;
                    if (null != e && (i = fightControl.mapData.getGridDataByPos(e)),
                        null != fightControl.bossData && fightControl.bossData.hp <= 0)
                        return ccLog("gameStatus bossDied"),
                            this.levelEndFun(),
                            curMapChangeTypeEm.bossDied;
                    if (null != fightControl.collectData.collectObj && (fightControl.collectData.isCollectAll() || fightControl.mapData.remainGrid <= 0))
                        return this.levelEndFun(),
                            curMapChangeTypeEm.collectALL;
                    if (fightControl.mapData.remainGrid <= 0)
                        return this.levelEndFun(),
                            curMapChangeTypeEm.gotoNext;
                    if (null != i) {
                        if (i.otherType === gridTypeEm.rocket && null == fightControl.bossData)
                            return ccLog("gameStatus isRocket  normal"),
                                curMapChangeTypeEm.normal;
                        if (!this.getComponent("Grid_Rocket").checkRocketAniOver() && null == fightControl.bossData)
                            return ccLog("gameStatus haveRocketAni  normal"),
                                curMapChangeTypeEm.normal
                    }
                    return fightControl.getHaveCanDeleteWay().length <= 1 ? (ccLog("gameStatus   rearrangement"),
                        this.parentLayer.pause = !0,
                        this.isCanClick = !1,
                        curMapChangeTypeEm.rearrangement) : t ? curMapChangeTypeEm.deleteItem : curMapChangeTypeEm.normal
                },
                levelEndFun: function () {
                    this.parentLayer.pause = !0,
                        this.isCanClick = !1,
                        this.lastLineTime = null,
                        this.parentLayer.isHaveCustom = !1
                },
                deleteGridEvent: function (e) {
                    e && e.isItem() ? heroData.achievementData.addProgress(achievementTypeEm.itemGrid) : (heroData.achievementData.addProgress(achievementTypeEm.normalGrid),
                        heroData.dailyTaskData.addTaskPro(dailyTaskTypeEm.normalGrid))
                },
                drawWay: function (e) {
                    e.length;
                    var t = e[0]
                        , i = e[e.length - 1]
                        , n = fightControl.mapData.getGridDataByPos(e[0])
                        , a = n.gridID;
                    (n.otherType === gridTypeEm.rocket && null == this.bossLayer || n.otherType === gridTypeEm.demon) && (this.isCanClick = !1);
                    var o = this.lineChangeData([t, i]);
                    this.lineStarCom.addLine(e, o, a),
                        i.y < t.y && (t = i),
                        this.refreshFightShow(t, i)
                },
                refreshFightShow: function (e, t) {
                    this.parentLayer.resetItemTipsTime(),
                        engine.gameSound.playEffect(soundurl.cleargrid),
                        this.getGridNodeComByPos(e).changeCanClick(!1),
                        this.getGridNodeComByPos(t).changeCanClick(!1),
                        this.addScoreAction(e),
                        this.addComboAction(e),
                        this.addComboGoodTxt(),
                        1 === debugtest.quickDead && this.parentLayer.endGame(endGameTypeEm.timeout)
                },
                parachuteAddScore: function () {
                    var e = fightControl.targetScore - fightControl.curScore;
                    fightControl.addScoreParachute = !0,
                        this.parentLayer.showTargetOK(),
                        this.parentLayer.refreshScore(),
                        1 !== openModuleValue.isTimeOut && this.showCongratulations(),
                        this.addScoreAction(null, cc.v2(0, 607), e)
                },
                animationComplete: function (e, t, i, n) {
                    this.parentLayer.refreshScore();
                    var a = !1;
                    fightControl.curScore >= fightControl.targetScore && !this.playCongratulation && (this.parentLayer.showTargetOK(),
                        1 !== openModuleValue.isTimeOut && (this.showCongratulations(),
                            a = !0)),
                        i !== curMapChangeTypeEm.gotoNext && i !== curMapChangeTypeEm.bossDied && this.parentLayer.refreshSurpassLayer();
                    var o = [e, t];
                    this.addBombAnimation(o, 1, a, i, n),
                        this.addBombAnimation(o, 2, a, i, n)
                },
                addBombAnimation: function (e, t, i, n, a) {
                    var o = this
                        , r = this
                        , s = e[t - 1]
                        , c = this.getGridNodeComByPos(s)
                        , l = fightControl.mapData.getGridDataByPos(s);
                    c.showDeleteAction(l.otherType),
                        c.changeCanClick(!0),
                        this.roundGridShow(s);
                    var h = function (e) {
                        n === curMapChangeTypeEm.bossDied && (e.otherType === gridTypeEm.rocket ? e.clearRocketData() : l.otherType === gridTypeEm.demon && e.clearDemonData()),
                            o.refreshCollect(e)
                    };
                    if (l.otherType === gridTypeEm.rocket || l.otherType === gridTypeEm.demon)
                        2 === t && this.overCallback1(n, e, a),
                            h(l);
                    else {
                        var d = new cc.Node
                            , u = d.addComponent(sp.Skeleton);
                        GameTool.setSkeleton(u, needLoadSpine.bomb, "bomb", .8, !1),
                            d.position = this.getPosByGrid(s),
                            this.node.addChild(d, fightZIndexConfig.lineZIndex),
                            h(l),
                            2 === t ? u.setCompleteListener(function () {
                                r.overCallback1(n, e, a),
                                    d.destroy()
                            }) : (engine.gameSound.playEffect(soundurl.bomb),
                                u.setCompleteListener(function () {
                                    d.destroy()
                                }))
                    }
                },
                overCallback1: function (e, t, i) {
                    var n = fightControl.mapData.getGridDataByPos(t[0]);
                    if (e === curMapChangeTypeEm.normal) {
                        if (n) {
                            if (n.otherType === gridTypeEm.rocket)
                                return void engine.eventM.emit(event_id.CREATE_ROCKET, {
                                    posArr: t
                                });
                            if (n.otherType === gridTypeEm.demon)
                                return void engine.eventM.emit(event_id.CREATE_DEMON, {
                                    posArr: t,
                                    callback: this.overCallback2.bind(this)
                                })
                        }
                    } else if (e === curMapChangeTypeEm.bossDied) {
                        if (n && n.otherType === gridTypeEm.rocket)
                            return void engine.eventM.emit(event_id.CREATE_ROCKET, {
                                posArr: t
                            })
                    } else if (e === curMapChangeTypeEm.deleteItem && i === itemIDConfig.bomb)
                        return;
                    this.overCallback2(e)
                },
                overCallback2: function (e) {
                    this.curDragonflyNum > 0 && this.dragonflyLayer.updateDragonNodeMove(e),
                        this.overCallback3(e)
                },
                overCallback3: function (e) {
                    var t = this;
                    e === curMapChangeTypeEm.gotoNext ? 1 === openModuleValue.isTimeOut && this.showCongratulations() : e === curMapChangeTypeEm.rearrangement ? (fightControl.rearrangement(),
                        this.rearrangementMapLayer()) : e !== curMapChangeTypeEm.normal && e !== curMapChangeTypeEm.deleteItem || 0 === fightControl.mapData.moveDir || (fightControl.mapData.moveGridByConfig(),
                            this.moveGrid(function () {
                                t.checkGameStatus() === curMapChangeTypeEm.rearrangement ? (fightControl.rearrangement(),
                                    t.rearrangementMapLayer()) : t.isCanClick = !0
                            }))
                },
                refreshCollect: function (e) {
                    var t = this.getGridNodeComByPos(e.gridPos);
                    fightControl.collectData.collectObj ? e.otherType === gridTypeEm.flower && t.showCollect() : this.refreshLevelTargetNum({
                        type: collectTypeEm.grid,
                        num: fightControl.mapData.remainGrid
                    })
                },
                hasCollectedOne: function () {
                    this.needCollcetTypeNum <= 0 || (this.needCollcetTypeNum--,
                        this.needCollcetTypeNum <= 0 && this.showCongratulations())
                },
                refreshLevelTargetNum: function (e) {
                    this.parentLayer.refreshLevelTargetNum(e)
                },
                rearrangementMapLayer: function () {
                    this.parentLayer.pause = !1,
                        this.isCanClick = !0,
                        this.refreshGrid(!0)
                },
                roundGridShow: function (e) {
                    for (var t = e.y - 1; t <= e.y + 1; t++)
                        for (var i = e.x - 1; i <= e.x + 1; i++)
                            if (1 === Math.abs(e.y - t) + Math.abs(e.x - i) && null != this.gridNodeComArr[t] && null != this.gridNodeComArr[t][i]) {
                                var n = this.gridNodeComArr[t][i]
                                    , a = fightControl.mapData.getGridDataByPos({
                                        x: i,
                                        y: t
                                    });
                                n.refreshArroundSpecialShow(a.otherType)
                            }
                },
                showStarAdd: function () {
                    this.parentLayer.clearParachute(),
                        this.parentLayer.clearCloud(),
                        heroData.gameMode === GameModelEnum.challenge ? this.customEnd() : this.scoreActionCom.addTimeScoreAction()
                },
                customEnd: function () {
                    this.parentLayer.resetItemTipsTime(),
                        this.resetCombo(),
                        this.showLvEnd()
                },
                showCongratulations: function (e) {
                    fightControl.challengeTime = fightControl.curTime;
                    var t = this.mapType;
                    this.playCongratulation = !0,
                        engine.gameSound.playEffect(soundurl.victory);
                    var i = this
                        , n = new cc.Node
                        , a = n.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(a, nextLoadSpine.congratulations, "congratulations", .5, !1),
                        n.y = 200,
                        this.node.addChild(n, fightZIndexConfig.scoreZIndex),
                        a.setCompleteListener(function () {
                            setTimeout(function () {
                                e ? i.customEnd() : i.isGoroNextType(t) && i.showStarAdd(),
                                    n.destroy()
                            }, 200)
                        })
                },
                isGoroNextType: function (e) {
                    return e === curMapChangeTypeEm.gotoNext || e === curMapChangeTypeEm.bossDied || e === curMapChangeTypeEm.collectALL
                },
                showLvEnd: function () {
                    gaLogEvent.logByDate("\u5173\u5361\u7ed3\u675f", fightControl.curLevel),
                        this.node.active = !1,
                        this.dragonflyLayer.initDragonflyNode(),
                        this.parentLayer.hideLevelUI(),
                        fightControl.curScore < fightControl.targetScore && 1 !== openModuleValue.isTimeOut ? this.parentLayer.endGame() : this.mapType === curMapChangeTypeEm.bossDied ? openWindowLayer(openTypeEm.surpriseLayer, surpriseOpenTypeEm.defeatBoss) : heroData.gameMode === GameModelEnum.challenge ? this.comboActionCom.getCustomChallengeScore() : openWindowLayer(openTypeEm.customEnd)
                },
                addComboAction: function (e) {
                    this.comboActionCom.addComboAction(e)
                },
                addComboGoodTxt: function () {
                    this.comboActionCom.addComboGoodTxt()
                },
                addScoreAction: function (e, t, i) {
                    this.scoreActionCom.addScoreAction(e, t, i)
                },
                refreshGrid: function (e) {
                    for (var t = 0; t < this.gridNodeComArr.length; t++)
                        for (var i = 0; i < this.gridNodeComArr[t].length; i++)
                            this.gridNodeComArr[t][i].resetGrid(e)
                },
                refreshBoss: function () {
                    null != this.bossLayer && this.bossLayer.refreshBossInfo()
                },
                defeatBoss: function () {
                    null != this.bossLayer && (this.bossLayer.node.destroy(),
                        this.bossLayer = null,
                        fightControl.bossData = null)
                },
                getPosByGrid: function (e) {
                    var t, r;
                    return t = -1 === e.x ? a - 60 : e.x === fightControl.mapData.mapWight ? a + (e.x - 1) * i + 60 : a + e.x * i,
                        r = -1 === e.y ? o + 60 : e.y === fightControl.mapData.mapHeight ? o - (e.y - 1) * n - 53 : o - e.y * n,
                        cc.v2(t, r)
                },
                getRocketPosByGrid: function (e, t) {
                    if (null != this.bossLayer && t)
                        return cc.v2(this.bossLayer.node.x, this.bossLayer.node.y + this.bossLayer.node.getChildByName("bossNode").y + 100);
                    var i = this.getPosByGrid(e);
                    return cc.v2(i.x + 3, i.y + 3)
                },
                gridGray: function (e) {
                    for (var t = 0; t < this.gridNodeComArr.length; t++)
                        for (var i = 0; i < this.gridNodeComArr[t].length; i++)
                            this.gridNodeComArr[t][i].gridGray(e)
                },
                moveGrid: function (e) {
                    var t = this
                        , i = function (e, i) {
                            var n = fightControl.mapData.gridArr[e][i]
                                , a = t.getPosByGrid(n.gridPos);
                            n.lastPos && (fightControl.mapData.gridArr[n.lastPos.y][n.lastPos.x].lastPos && t.changeGridNode(n.gridPos, n.lastPos),
                                n.lastPos = null),
                                t.getGridNodeComByPos(n.gridPos).showMoveAction(a, n.gridPos)
                        };
                    if (fightControl.mapData.moveDir === moveDirTypeEm.up || fightControl.mapData.moveDir === moveDirTypeEm.left)
                        for (var n = 0; n < fightControl.mapData.gridArr.length; n++)
                            for (var a = 0; a < fightControl.mapData.gridArr[n].length; a++)
                                i(n, a);
                    else if (fightControl.mapData.moveDir === moveDirTypeEm.down || fightControl.mapData.moveDir === moveDirTypeEm.right)
                        for (var o = fightControl.mapData.gridArr.length - 1; o >= 0; o--)
                            for (var r = fightControl.mapData.gridArr[o].length - 1; r >= 0; r--)
                                i(o, r);
                    setTimeout(function () {
                        e && e()
                    }, 300)
                },
                changeGridNode: function (e, t) {
                    if (null != e.y && null != e.x && null != t.y && null != t.x) {
                        var i = this.gridNodeComArr[t.y][t.x];
                        this.gridNodeComArr[t.y][t.x] = this.gridNodeComArr[e.y][e.x],
                            this.gridNodeComArr[e.y][e.x] = i;
                        var n = this.gridNodeComArr[t.y][t.x].gridPos;
                        this.gridNodeComArr[t.y][t.x].gridPos = this.gridNodeComArr[e.y][e.x].gridPos,
                            this.gridNodeComArr[e.y][e.x].gridPos = n
                    }
                },
                showLineTips: function () {
                    var e = fightControl.getHaveCanDeleteWay();
                    e.length > 1 && (this.tipsGrid1 = this.getGridNodeComByPos(e[0]),
                        this.tipsGrid2 = this.getGridNodeComByPos(e[e.length - 1]),
                        this.tipsGrid1.showTipsType(!0),
                        this.tipsGrid2.showTipsType(!0),
                        this.parentLayer.isHaveTips = !0)
                },
                clearTips: function () {
                    this.parentLayer.isHaveTips = !1,
                        null != this.tipsGrid1 && (this.tipsGrid1.refreshChoose(),
                            this.tipsGrid1 = null),
                        null != this.tipsGrid2 && (this.tipsGrid2.refreshChoose(),
                            this.tipsGrid2 = null)
                },
                itemBomb: function () {
                    var e = fightControl.getHaveCanDeleteWay();
                    if (e.length > 1) {
                        this.clearTips(),
                            fightControl.gridPos1 = e[0],
                            fightControl.gridPos2 = e[e.length - 1];
                        var t = this.getGridNodeComByPos(fightControl.gridPos1)
                            , i = this.getGridNodeComByPos(fightControl.gridPos2);
                        t.showTipsType(!0),
                            i.showTipsType(!0),
                            this.drawWay(e)
                    }
                },
                rollback: function () {
                    for (var e = fightControl.rollback(), t = 0; t < e.length; t++)
                        this.getGridNodeComByPos(e[t]).refreshView(),
                            this.getGridNodeComByPos(e[t]).refreshGridBg(),
                            this.getGridNodeComByPos(e[t]).refreshOtherShow(!1)
                },
                runNewbieTipAction: function () {
                    this.tipsGrid1 && this.tipsGrid1.runNewbieTipAction(),
                        this.tipsGrid2 && this.tipsGrid2.runNewbieTipAction()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    FightSceneControl: [function (e, t) {
        "use strict";
        cc._RF.push(t, "3f05d/YuU5D+pyN95dlJnhX", "FightSceneControl");
        var i = e("GameScene")
            , n = e("FightControl");
        window.fightControl = null,
            window.fightUILayer = null,
            cc.Class({
                extends: i,
                properties: {
                    gameLoadUI: null
                },
                onDestroy: function () {
                    fightControl = null,
                        null != this.gameLoadUI && (this.gameLoadUI.destroyClass(),
                            this.gameLoadUI = null)
                },
                onLoad: function () {
                    this.gameLoadUI = this.node.addComponent("GameLoadUI"),
                        this._super(),
                        sceneControl.curSceneType = SceneType.fight
                },
                initialize: function () {
                    this._super(),
                        fightControl = new n,
                        fightControl.initialize(sceneControl.transitionData),
                        sceneControl.resetTransitionData(),
                        openWindowLayer(openTypeEm.fightUI),
                        openWindowLayer(openTypeEm.raceLamp),
                        engine.gameSound.playMusic(soundurl.bgMusic, !0),
                        setTimeout(function () {
                            sceneControl.curSceneType == SceneType.fight && engine.CPUM.addCPUInfo([{
                                type: CPUStyleType.loadType,
                                data: gameFightRes(),
                                executeOrder: CPUExecuteOrder.curUIType,
                                timeOrder: engine.gameTime.localTime,
                                loadErrorMaxCount: LoadErrorMaxCountConfig.UI
                            }])
                        }, 3e3)
                },
                loadComplete: function () {
                    this._super(),
                        null != this.gameLoadUI && (this.gameLoadUI.destroyClass(),
                            this.gameLoadUI.destroy(),
                            this.gameLoadUI = null),
                        this.initialize()
                },
                getRes: function () {
                    return []
                },
                setLoadPercent: function (e) {
                    null != this.gameLoadUI && this.gameLoadUI.setLoadPercent(e)
                }
            }),
            cc._RF.pop()
    }
        , {
        FightControl: "FightControl",
        GameScene: "GameScene"
    }],
    FightUIChallengeLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "8124eRzwhlN9JZ3SjuG5cja", "FightUIChallengeLayer");
        var i = e("GameExternalImage");
        cc.Class({
            extends: cc.Component,
            properties: {
                fridenChallenge: null,
                myIcon: null,
                otherIcon: null,
                myScore: null,
                otherScore: null
            },
            addEvent: function () {
                engine.eventM.on(event_id.REFRESH_CHALLENGE_SCORE, this.refreshScore, this)
            },
            removeEvent: function () {
                engine.eventM.off(event_id.REFRESH_CHALLENGE_SCORE, this.refreshScore, this)
            },
            initialize: function () {
                this.addEvent(),
                    this.node.getChildByName("starbg").active = !1,
                    this.node.getChildByName("score").active = !1,
                    this.fridenChallenge = this.node.getChildByName("fridenChallenge"),
                    this.fridenChallenge.active = !0,
                    this.refreshMyInfo(),
                    this.refreshOtherInfo(),
                    this.refreshScore(),
                    this.setChallengeModeUI()
            },
            refreshMyInfo: function () {
                var e = this.fridenChallenge.getChildByName("icon_me")
                    , t = new i;
                t.loadImage(gameSDK.sdkPlayInfo.photo, null, e.width - 2, e.height - 2),
                    e.addChild(t),
                    this.myScore = this.fridenChallenge.getChildByName("myScore").getComponent(cc.Label)
            },
            refreshOtherInfo: function () {
                var e = this.fridenChallenge.getChildByName("icon_ohter")
                    , t = new i;
                t.loadImage(heroData.challengeData.otherData.photo, null, e.width - 2, e.height - 2),
                    e.addChild(t),
                    this.fridenChallenge.getChildByName("otherScore").getComponent(cc.Label).string = heroData.challengeData.otherScore + ""
            },
            setChallengeModeUI: function () {
                this.node.getChildByName("lvword").active = !1,
                    this.node.getChildByName("lvimg").active = !1
            },
            refreshScore: function () {
                this.myScore.string = fightControl.challengeScore + ""
            }
        }),
            cc._RF.pop()
    }
        , {
        GameExternalImage: "GameExternalImage"
    }],
    FightUILayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "73194J3qGxDPbUYyrUSJHzF", "FightUILayer");
        var i = e("GameExternalImage");
        cc.Class({
            extends: cc.Component,
            properties: {
                mapLayer: null,
                pause: null,
                starPro: null,
                timeLab: null,
                itemIDArr: null,
                parachuteNode: null,
                isHaveCustom: null,
                actionTime: null,
                isHaveTips: null,
                newbieStep: null,
                newbieGridArr: null,
                newbieFinger: null,
                cloudTime: null,
                cloudLevel: null,
                cloudNode: null,
                isGiveTips: null,
                isTipsItem: null,
                itemTipsTime: null,
                curTipsItem: null,
                tipsAction: null,
                collectTypeArr: null,
                scoreLab: null
            },
            onDestroy: function () {
                this.removeDataEvent(),
                    this.mapLayer = null,
                    this.pause = null,
                    this.starPro = null,
                    this.timeLab = null,
                    this.itemIDArr = null,
                    this.parachuteNode = null,
                    this.isHaveCustom = null,
                    this.actionTime = null,
                    this.isHaveTips = null,
                    this.newbieStep = null,
                    this.newbieGridArr = null,
                    this.newbieFinger = null,
                    this.cloudTime = null,
                    this.cloudLevel = null,
                    this.cloudNode = null,
                    this.isGiveTips = null,
                    this.isTipsItem = null,
                    this.itemTipsTime = null,
                    this.curTipsItem = null,
                    this.tipsAction = null,
                    this.collectTypeArr = null
            },
            destroyClass: function () {
                this.clearParachute(),
                    null != this.cloudNode && (this.cloudNode.destroy(),
                        this.cloudNode = null),
                    null != this.newbieFinger && (this.newbieFinger.destroy(),
                        this.newbieFinger = null),
                    null != this.mapLayer && (this.mapLayer.destroyClass(),
                        this.mapLayer = null),
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
            },
            addDataEvent: function () {
                engine.eventM.on(event_id.REFRESH_GEM_NUMBER, this.refreshGemNum, this),
                    engine.eventM.on(event_id.REFRESH_PAUSE, this.refreshPause, this),
                    engine.eventM.on(event_id.RESURGENCE_REFRESH, this.resurgenceRefresh, this),
                    engine.eventM.on(event_id.REFRESH_ITEM_NUM, this.refreshItemNum, this),
                    engine.eventM.on(event_id.SHOW_TARGET_ACTION, this.showTarget, this),
                    engine.eventM.on(event_id.GOTO_NEXT_CUSTOM, this.gotoNextCustom, this),
                    engine.eventM.on(event_id.REPLAY_CUR_LEVEL, this.rePlayCurLevel, this)
            },
            removeDataEvent: function () {
                engine.eventM.off(event_id.REFRESH_GEM_NUMBER, this.refreshGemNum, this),
                    engine.eventM.off(event_id.REFRESH_PAUSE, this.refreshPause, this),
                    engine.eventM.off(event_id.RESURGENCE_REFRESH, this.resurgenceRefresh, this),
                    engine.eventM.off(event_id.REFRESH_ITEM_NUM, this.refreshItemNum, this),
                    engine.eventM.off(event_id.SHOW_TARGET_ACTION, this.showTarget, this),
                    engine.eventM.off(event_id.GOTO_NEXT_CUSTOM, this.gotoNextCustom, this),
                    engine.eventM.off(event_id.REPLAY_CUR_LEVEL, this.rePlayCurLevel, this)
            },
            addEvent: function () {
                this.node.getChildByName("pausebtn").on(cc.Node.EventType.TOUCH_END, this.clickPauseBtn, this),
                    this.node.getChildByName("addgembtn").on(cc.Node.EventType.TOUCH_END, this.clickAddGemBtn, this);
                for (var e = 1; e <= 4; e++)
                    this.node.getChildByName("itembtn_" + e).on(cc.Node.EventType.TOUCH_END, this.clickItemBtn, this)
            },
            removeEvent: function () {
                this.node.getChildByName("pausebtn").off(cc.Node.EventType.TOUCH_END, this.clickPauseBtn, this),
                    this.node.getChildByName("addgembtn").off(cc.Node.EventType.TOUCH_END, this.clickAddGemBtn, this);
                for (var e = 1; e <= 4; e++)
                    this.node.getChildByName("itembtn_" + e).off(cc.Node.EventType.TOUCH_END, this.clickItemBtn, this)
            },
            initialize: function () {
                fightUILayer = this,
                    this.isGiveTips = !1,
                    this.actionTime = 0,
                    this.cloudTime = 0,
                    this.isHaveTips = !1,
                    this.isHaveCustom = !1,
                    this.isTipsItem = !1,
                    this.itemTipsTime = 0,
                    this.newbieStep = 1,
                    this.newbieGridArr = [{
                        x: 1,
                        y: 2
                    }, {
                        x: 6,
                        y: 2
                    }],
                    this.cloudLevel = getGlobleDic(27),
                    this.addEvent(),
                    this.addDataEvent(),
                    this.itemIDArr = [itemIDConfig.addTime, itemIDConfig.tips, itemIDConfig.bomb, itemIDConfig.resort],
                    this.node.getChildByName("combonode").active = !1,
                    this.node.getChildByName("newbielayer").active = !1,
                    this.bg1Node = this.node.getChildByName("bg1"),
                    this.tipsAction = this.node.getChildByName("countdown");
                for (var e = 1; e <= 4; e++) {
                    var t = this.node.getChildByName("itembtn_" + e);
                    t.getChildByName("img").getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(needLoadImage.mastloadimg1, "itemicon" + getDicData(dataJson.item_json, this.itemIDArr[e - 1], "icon")),
                        t.getChildByName("gem").getComponent(cc.Label).string = getDicData(dataJson.item_json, this.itemIDArr[e - 1], "price"),
                        this.refreshItemNum({
                            index: e
                        })
                }
                this.refreshGemNum();
                var i = new cc.Node;
                this.node.addChild(i),
                    i.y = this.node.getChildByName("bg2").y,
                    this.mapLayer = i.addComponent("FightMapLayer"),
                    this.mapLayer.initialize(this),
                    this.mapLayer.node.active = !1,
                    this.starPro = this.node.getChildByName("pro").getChildByName("mask"),
                    this.starProWidth = this.starPro.width,
                    this.timeLab = this.node.getChildByName("timebg").getChildByName("time").getComponent(cc.Label),
                    this.pause = !0,
                    this.refreshLv(),
                    this.refreshScore(),
                    this.refreshStar(),
                    debugtest.remainTime > 0 && (fightControl.curTime = debugtest.remainTime),
                    this.showTime();
                var n = this;
                gameSDK.startGame(function () {
                    null == fightControl.surpassInfo ? n.customInfoAction() : openWindowLayer(openTypeEm.target),
                        gameSDK.leaderboard.setScoreAsync(heroData.bestScore),
                        setTimeout(function () {
                            gameSDK.challengeLeaderboard.setScoreAsync(heroData.challengeData.maxChallengeScore)
                        }, 100)
                }),
                    1 == openModuleValue.isTimeOut && (this.node.getChildByName("targetbg").active = !1,
                        this.node.getChildByName("targettxt").active = !1,
                        this.node.getChildByName("targetok").active = !1),
                    1 === debugtest.showGridNum ? this.node.getChildByName("totalnum").active = !0 : this.node.getChildByName("totalnum").active = !1,
                    this.refreshMode(),
                    heroData.gameMode === GameModelEnum.challenge && this.addComponent("FightUIChallengeLayer").initialize()
            },
            initNode: function () {
                var e = this.node.getChildByName("bg1");
                this.dragonflyTargetNode = e.getChildByName("dragonfly"),
                    this.eggTargetNode = e.getChildByName("egg"),
                    this.gridTargetNode = e.getChildByName("grid"),
                    this.bonfireTargetNode = e.getChildByName("bonfire"),
                    this.bossTargetNode = e.getChildByName("boss")
            },
            refreshStar: function () {
                this.starPro.width = fightControl.curLevelScore / fightControl.levelDic.star3 * this.starProWidth;
                for (var e = this.node.getChildByName("starbg"), t = fightControl.getStarsNum(), i = 1; i <= 3; i++) {
                    var n = e.getChildByName("star_" + i);
                    i <= t ? (n.isStar = !0,
                        n.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "star_1")) : (n.isStar = !1,
                            n.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "star_2"))
                }
            },
            refreshStarByTime: function () {
                for (var e = fightControl.getStarsNum(), t = 1; t <= 3; t++) {
                    var i = this.node.getChildByName("star_" + t);
                    t <= e ? i.isStar || (i.isStar = !0,
                        i.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "star_1")) : i.isStar && (i.isStar = !1,
                            i.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "star_2"))
                }
            },
            showNewbieLayer: function () {
                if (isHaveNewbie) {
                    var e = this.node.getChildByName("newbielayer");
                    e.active || (e.active = !0,
                        this.newbieFinger = new cc.Node,
                        this.newbieFinger.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "finger"),
                        this.node.addChild(this.newbieFinger),
                        this.newbieFinger.position = this.getNewbieFingerPos(this.newbieGridArr[this.newbieStep - 1]),
                        this.newbieFinger.runAction(cc.sequence(cc.moveBy(.5, 0, 20), cc.moveBy(.5, 0, -20)).repeatForever()))
                }
            },
            isNewbieNeedPos: function (e) {
                return isSamePos(e, this.newbieGridArr[this.newbieStep - 1])
            },
            runNextNewbie: function () {
                var e = this;
                this.newbieStep++,
                    this.newbieStep > this.newbieGridArr.length ? (this.node.getChildByName("newbielayer").active = !1,
                        this.newbieFinger.destroy(),
                        isHaveNewbie = !1,
                        setTimeout(function () {
                            e.actionTime = getGlobleDic(25) + 1,
                                e.refreshTipsTime(),
                                e.mapLayer.runNewbieTipAction()
                        }, 500)) : (this.newbieFinger.position = this.getNewbieFingerPos(this.newbieGridArr[this.newbieStep - 1]),
                            this.newbieFinger.stopAllActions(),
                            this.newbieFinger.runAction(cc.sequence(cc.moveBy(.5, 0, 20), cc.moveBy(.5, 0, -20)).repeatForever()))
            },
            getNewbieFingerPos: function (e) {
                return this.getPosByGrid(e).add(cc.v2(70, 67))
            },
            getPosByGrid: function (e) {
                return this.mapLayer.getPosByGrid(e).add(this.mapLayer.node.position)
            },
            showTargetOK: function () {
                1 !== openModuleValue.isTimeOut && (this.node.getChildByName("targetok").active = !0)
            },
            customInfoAction: function () {
                this.setCurLevelTarget(),
                    this.node.getChildByName("targetok").active = !1,
                    addGameLayer(openTypeEm.levelTarget, {
                        callback: this.startGame.bind(this)
                    })
            },
            setCurLevelTarget: function () {
                var e = [];
                this.bg1Node.removeAllChildren();
                var t = fightControl.collectData.collectObj;
                for (var i in t)
                    t[i].needNum > 0 && e.push({
                        type: t[i].name,
                        num: t[i].needNum
                    });
                e.length < 1 && (null != fightControl.bossData ? e.push({
                    type: collectTypeEm.boss,
                    num: 1
                }) : e.push({
                    type: collectTypeEm.grid,
                    num: fightControl.mapData.remainGrid
                }));
                for (var n = 0; n < e.length; n++) {
                    var a = this.addCollectTargetNode(e[n].type);
                    0 === n ? 1 === e.length ? a.x = 0 : a.x = -80 : 1 === n && (a.x = 80),
                        this.refreshLevelTargetNum(e[n])
                }
            },
            addCollectTargetNode: function (e) {
                var t = new cc.Node;
                t.name = e;
                var i = new cc.Node;
                i.name = "img",
                    i.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.fightimg2, "target_" + e),
                    i.setPosition(cc.v2(-32, -2)),
                    i.scale = .6,
                    t.addChild(i, 1);
                var n = new cc.Node
                    , a = n.addComponent(cc.Label);
                n.name = "num",
                    n.setPosition(cc.v2(0, 0)),
                    n.anchorX = 0,
                    a.font = engine.memory.getFont(needLoadFont.fntttf1_font),
                    a.fontSize = 32,
                    a.horizontalAlign = cc.Label.HorizontalAlign.CENTER,
                    a.verticalAlign = cc.Label.VerticalAlign.CENTER;
                var o = i.addComponent(cc.LabelOutline);
                return o.color = "#092B68",
                    o.width = 2,
                    t.addChild(n, 1),
                    this.bg1Node.addChild(t, 1),
                    heroData.gameMode === GameModelEnum.challenge && (t.active = !1),
                    t
            },
            refreshLevelTargetNum: function (e) {
                if (e && e.type) {
                    var t = e.type
                        , i = e.num
                        , n = this.bg1Node.getChildByName(t);
                    null != n && (n.getChildByName("img").stopAllActions(),
                        n.getChildByName("num").getComponent(cc.Label).string = "x" + i)
                }
            },
            gotoNextCustom: function (e) {
                var t = 1;
                isNewPlayer && (t = 2),
                    !fightControl.isWatch && fightControl.curCustomTimes >= t && 1 !== debugtest.noAD && !e && heroData.gameMode !== GameModelEnum.challenge && setTimeout(function () {
                        gameSDK.faceBookAdvertisement.showInterstitialAD()
                    }, 1e3),
                    console.log("nextLevel callFun"),
                    this.mapLayer.clearBossLayer(),
                    fightControl.gotoNextLevel(),
                    this.customInfoAction(),
                    this.refreshLv(),
                    this.showTime(),
                    this.refreshStar(),
                    this.refreshScore(),
                    e && (this.mapLayer.resetCombo(),
                        this.mapLayer.node.active = !1)
            },
            rePlayCurLevel: function () {
                this.gotoNextCustom(!0)
            },
            resurgenceRefresh: function () {
                if (fightControl.curResurgence++,
                    2 === fightControl.curResurgence && 1 !== openModuleValue.isTimeOut) {
                    gaLogEvent.logByDate("\u7b2c\u51e0\u6b21\u590d\u6d3b", fightControl.curResurgence),
                        this.mapLayer.node.active = !0;
                    var e = fightControl.targetScore - fightControl.curScore;
                    fightControl.fightAddScore(e),
                        this.showTargetOK(),
                        this.refreshScore(),
                        this.mapLayer.showCongratulations(!0),
                        this.mapLayer.addScoreAction(null, cc.v2(0, 607), e)
                } else
                    this.mapLayer.refreshGrid(),
                        this.mapLayer.refreshBoss(),
                        this.refreshStar(),
                        this.startGame(!0),
                        this.showTime(),
                        this.refreshScore(),
                        this.refreshLevelBlood(),
                        this.mapLayer.resetChoose(),
                        this.mapLayer.resetTip()
            },
            endGame: function (e) {
                if (gaLogEvent.logByDate("\u5173\u5361\u5931\u8d25", fightControl.curLevel),
                    gameSDK.logEvent("guankashibai", fightControl.curLevel, {
                        guankashibai: "guankashibai"
                    }),
                    this.pause = !0,
                    this.mapLayer.resetChoose(),
                    this.clearCloud(),
                    this.clearParachute(),
                    this.mapLayer.gridGray(!0),
                    heroData.gameMode === GameModelEnum.challenge)
                    openWindowLayer(openTypeEm.challengeSurpass);
                else if (1 === openModuleValue.forFBCheck)
                    openWindowLayer(openTypeEm.gameOver);
                else
                    switch (e) {
                        case endGameTypeEm.timeout:
                        case endGameTypeEm.noBlood:
                            openWindowLayer(openTypeEm.resurgence, {
                                endType: e
                            });
                            break;
                        default:
                            openWindowLayer(openTypeEm.loseDetail)
                    }
            },
            showTarget: function () {
                if (heroData.gameMode !== GameModelEnum.challenge) {
                    var e = this.node.getChildByName("otherplayer");
                    e.active = !0,
                        e.scale = .4,
                        e.runAction(cc.sequence(cc.scaleTo(.2, 1.1 * .8), cc.scaleTo(.1, .9 * .8), cc.scaleTo(.1, .8)));
                    var t = new i;
                    t.loadImage(fightControl.surpassInfo.photo, null, e.getContentSize().width, e.getContentSize().height),
                        t.name = "myHead",
                        e.addChild(t, -1),
                        e.getChildByName("score").getComponent(cc.Label).string = fightControl.surpassInfo.score,
                        e.getChildByName("name").getComponent(cc.Label).string = myGameGetShortName(fightControl.surpassInfo.name),
                        this.customInfoAction()
                } else
                    this.customInfoAction()
            },
            startGame: function (e) {
                this.mapLayer.gridGray(!1),
                    gaLogEvent.logByDate("\u5f00\u59cb\u5173\u5361", 1),
                    gameSDK.logEvent("kaishiguanka", 1, {
                        kaishiguanka: "kaishiguanka"
                    }),
                    this.isGiveTips = !1,
                    this.mapLayer.node.active = !0,
                    e ? (this.pause = !1,
                        this.mapLayer.isCanClick = !0) : this.mapLayer.runCreateAction(),
                    fightControl.isWatch = !1
            },
            refreshItemNum: function (e) {
                var t = e.index;
                e.isID && (t = arrIsContain(this.itemIDArr, e.index) + 1);
                var i = this.node.getChildByName("itembtn_" + t)
                    , n = this.itemIDArr[t - 1]
                    , a = fightControl.getItemNum(n)
                    , o = i.getChildByName("gemimg")
                    , r = i.getChildByName("gem")
                    , s = i.getChildByName("number");
                a <= 0 ? (s.active = !1,
                    o.active = !0,
                    r.active = !0) : (s.active = !0,
                        o.active = !1,
                        r.active = !1,
                        s.getComponent(cc.Label).string = "x" + a)
            },
            refreshGemNum: function () {
                this.node.getChildByName("gemword").getComponent(cc.Label).string = "" + heroData.diamond
            },
            refreshPause: function (e) {
                this.pause = e
            },
            refreshLv: function () {
                this.node.getChildByName("lvword").getComponent("GameArtWord").setString("" + fightControl.curLevel),
                    this.node.getChildByName("targettxt").getComponent(cc.Label).string = getLanguageDic(1038) + fightControl.targetScore;
                for (var e = fightControl.levelDic, t = [e.star1, e.star2, e.star3], i = this.node.getChildByName("starbg"), n = 1; n <= 3; n++)
                    i.getChildByName("star_" + n).x = i.width * t[n - 1] / t[2]
            },
            refreshScore: function () {
                heroData.gameMode === GameModelEnum.challenge ? engine.eventM.emit(event_id.REFRESH_CHALLENGE_SCORE) : (this.scoreLab || (this.scoreLab = this.node.getChildByName("score").getComponent(cc.Label)),
                    this.scoreLab.string = "SCORE: " + fightControl.curLevelScore,
                    this.refreshStar())
            },
            refreshSurpassLayer: function () { },
            showAddScore: function () {
                this.node.getChildByName("score").runAction(cc.sequence(cc.scaleTo(.15, 1.5), cc.scaleTo(.15, 1)))
            },
            hideLevelUI: function () {
                var e = this.node.getChildByName("bg1")
                    , t = this.node.getChildByName("fightbloodbg");
                for (var i in t.active = !1,
                    e.children)
                    e.children[i].active = !1
            },
            refreshLevelBlood: function () {
                for (var e = this.node.getChildByName("fightbloodbg"), t = 0; t < 3; t++) {
                    var i = e.getChildByName("blood" + (t + 1)).getComponent(cc.Sprite);
                    t < fightControl.levelBlood ? i.spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "fightblood1") : i.spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "fightblood2")
                }
            },
            refreshTime: function (e) {
                !0 !== isHaveNewbie && (this.pause ? null != this.cloudNode && !1 === this.cloudNode.isPauseAction && (this.cloudNode.pauseAllActions(),
                    this.cloudNode.isPauseAction = !0) : (null != this.cloudNode && !0 === this.cloudNode.isPauseAction && (this.cloudNode.resumeAllActions(),
                        this.cloudNode.isPauseAction = !1),
                        fightControl.curTime -= e,
                        openModuleValue.isTimeOut,
                        fightControl.curLevel >= this.cloudLevel && (this.cloudTime += e,
                            this.cloudTime >= getGlobleDic(28) && this.showCloud()),
                        !1 === this.isHaveTips && (this.actionTime += e,
                            this.refreshTipsTime()),
                        !0 === this.isGiveTips && !1 === this.isTipsItem && (this.itemTipsTime += e,
                            this.showItemTipsAction()),
                        fightControl.curTime <= 0 && (fightControl.curTime = 0,
                            1 === openModuleValue.isTimeOut && this.endGame(endGameTypeEm.timeout)),
                        this.showTime(),
                        this.isShowParachute()))
            },
            showItemTipsAction: function () {
                if (this.itemTipsTime >= getGlobleDic(33)) {
                    this.itemTipsTime = 0,
                        this.isTipsItem = !0,
                        this.itemIDArr = [itemIDConfig.addTime, itemIDConfig.tips, itemIDConfig.bomb, itemIDConfig.resort];
                    var e = 2;
                    fightControl.getItemNum(itemIDConfig.bomb) > fightControl.getItemNum(itemIDConfig.tips) && (e = 3),
                        this.curTipsItem = this.node.getChildByName("itembtn_" + e),
                        this.curTipsItem.stopAllActions(),
                        this.curTipsItem.runAction(cc.sequence(cc.scaleTo(.5, 1.1 * .8), cc.scaleTo(.5, .8), cc.scaleTo(.5, .9 * .8), cc.scaleTo(.5, .8)).repeatForever())
                }
            },
            showCloud: function () {
                if (engine.memory.isExistRes(bgImgUrl.cloudBig, !0)) {
                    this.resetCloudTime();
                    var e = GameTool.getRandomInt(1, fightControl.mapData.mapHeight - 2)
                        , t = this.getPosByGrid({
                            x: 1,
                            y: e
                        }).y;
                    this.cloudNode = new cc.Node,
                        this.cloudNode.x = -688,
                        this.cloudNode.y = t,
                        this.cloudNode.addComponent(cc.Sprite).spriteFrame = engine.memory.getTexture(bgImgUrl.cloudBig),
                        this.cloudNode.isPauseAction = !1,
                        this.node.addChild(this.cloudNode);
                    var i = this;
                    this.cloudNode.runAction(cc.sequence(cc.moveBy(3, 1373, 0), cc.callFunc(function () {
                        i.clearCloud()
                    })))
                }
            },
            clearCloud: function () {
                null != this.cloudNode && (this.cloudNode.destroy(),
                    this.cloudNode = null)
            },
            resetCloudTime: function () {
                this.cloudTime = 0
            },
            refreshTipsTime: function () {
                !0 !== this.isGiveTips && this.actionTime >= getGlobleDic(25) && (this.isGiveTips = !0,
                    this.clearChoose(),
                    this.mapLayer.showLineTips(),
                    this.resetItemTipsTime())
            },
            resetTipsTime: function () {
                this.actionTime = 0
            },
            resetItemTipsTime: function () {
                this.itemTipsTime = 0,
                    this.isTipsItem = !1,
                    null != this.curTipsItem && (this.curTipsItem.stopAllActions(),
                        this.curTipsItem.scale = .8,
                        this.curTipsItem = null)
            },
            isShowParachute: function () {
                heroData.gameMode !== GameModelEnum.challenge && !0 !== fightControl.isHaveParachute && (fightControl.curCustomTimes <= 3 || fightControl.curCustomTimes % 2 > 0 || fightControl.curTime <= 30 && fightControl.mapData.remainGrid >= 10 && 0 === openModuleValue.forFBCheck && this.addParachute())
            },
            addParachute: function () {
                fightControl.isHaveParachute = !0,
                    this.clearParachute(),
                    this.parachuteNode = new cc.Node,
                    this.parachuteNode.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "parachute"),
                    this.parachuteNode.x = -413,
                    this.parachuteNode.y = 440,
                    this.parachuteNode.anchorX = .66,
                    this.mapLayer.node.addChild(this.parachuteNode, fightZIndexConfig.parachuteZIndex),
                    this.parachuteNode.on(cc.Node.EventType.TOUCH_END, this.clickParachute, this);
                var e = [cc.v2(222, 176), cc.v2(163, -119), cc.v2(360, 0)]
                    , t = [cc.v2(-222, 176), cc.v2(-163, -119), cc.v2(-360, 0)]
                    , i = [cc.v2(-222, 176), cc.v2(-163, -119), cc.v2(-200, 0)]
                    , n = this;
                this.parachuteNode.runAction(cc.sequence(cc.scaleTo(.5, .95), cc.scaleTo(.5, 1)).repeatForever()),
                    this.parachuteNode.runAction(cc.sequence(cc.bezierBy(2.5, e), cc.bezierBy(2.5, e), cc.delayTime(2), cc.bezierBy(2.5, t), cc.bezierBy(2.5, i), cc.bezierBy(2.5, e), cc.bezierBy(2.5, e), cc.callFunc(function () {
                        n.parachuteNode.x = -413
                    })).repeatForever())
            },
            clearParachute: function () {
                null != this.parachuteNode && (this.parachuteNode.stopAllActions(),
                    this.parachuteNode.off(cc.Node.EventType.TOUCH_END, this.clickParachute, this),
                    this.parachuteNode.destroy(),
                    this.parachuteNode = null)
            },
            showTime: function () {
                this.timeLab.string = Math.ceil(fightControl.curTime)
            },
            playComboAction: function () {
                var e = this.node.getChildByName("combonode");
                e.stopAllActions(),
                    this.mapLayer.curCombo > 0 ? (e.active = !0,
                        e.runAction(cc.sequence(cc.scaleTo(.15, 1.5, 1.5), cc.scaleTo(.15, 1, 1))),
                        e.getChildByName("artword").getComponent("GameArtWord").setString("" + this.mapLayer.curCombo)) : e.active = !1
            },
            update: function (e) {
                this.refreshTime(e)
            },
            clearChoose: function () {
                if (null != fightControl.gridPos1) {
                    var e = fightControl.gridPos1;
                    fightControl.gridPos1 = null,
                        this.mapLayer.getGridNodeComByPos(e).refreshChoose()
                }
                this.mapLayer.clearTips()
            },
            clickItemBtn: function (e) {
                if (!0 === this.isHaveCustom && null != this.pause && !0 !== this.pause && null != this.mapLayer && !1 !== this.mapLayer.isCanClick) {
                    var t = parseInt(e.target.name.split("_")[1]);
                    if (2 !== t || 1 !== debugtest.starFly)
                        if (3 !== t || 1 !== debugtest.cloud)
                            if (4 !== t || 1 !== debugtest.surpass) {
                                if (1 === t && 1 === debugtest.skinLevel)
                                    return this.mapLayer.node.active = !1,
                                        heroData.curLevel = fightControl.curLevel,
                                        void this.gotoNextCustom();
                                this.resetTipsTime(),
                                    this.resetItemTipsTime();
                                var i = this.itemIDArr[t - 1];
                                if (fightControl.getItemNum(i) > 0 || 1 === debugtest.itemMore)
                                    fightControl.useItem(i),
                                        this.useItem(t);
                                else {
                                    var n = getDicData(dataJson.item_json, i, "price");
                                    heroData.diamond >= n ? (heroData.addGem(-n),
                                        heroData.saveData(),
                                        this.useItem(t)) : (this.pause = !0,
                                            openWindowLayer(openTypeEm.watchAdvert, watchOpenTypeEm.gemNoEnough))
                                }
                            } else
                                openWindowLayer(openTypeEm.surpass);
                        else
                            this.showCloud();
                    else
                        this.mapLayer.showStarAdd()
                }
            },
            useItem: function (e) {
                var t = this.itemIDArr[e - 1];
                gaLogEvent.logByDate("\u4f7f\u7528\u9053\u5177", t),
                    fightControl.curLevel <= 100 && setTimeout(function () {
                        gaLogEvent.logByDate("\u6bcf\u5173\u4f7f\u7528\u9053\u5177", fightControl.curLevel)
                    }, 1e3),
                    this.useItemCallback(t),
                    this.refreshItemNum({
                        index: e
                    })
            },
            useItemCallback: function (e) {
                var t = this;
                switch (e) {
                    case itemIDConfig.addTime:
                        fightControl.curTime += getGlobleDic(8),
                            fightControl.curTime > fightControl.maxTime && (fightControl.curTime = fightControl.maxTime),
                            this.showTime(),
                            this.addTimeAction();
                        break;
                    case itemIDConfig.tips:
                        this.clearChoose(),
                            this.mapLayer.showLineTips();
                        break;
                    case itemIDConfig.bomb:
                        this.clearChoose(),
                            this.mapLayer.itemBomb();
                        break;
                    case itemIDConfig.resort:
                        this.clearChoose(),
                            fightControl.rearrangement(),
                            this.playItemAnimation(e, function () {
                                t.mapLayer.rearrangementMapLayer()
                            })
                }
            },
            autoUseItem: function (e) {
                this.useItemCallback(e)
            },
            addTimeAction: function () { },
            playItemAnimation: function (e, t) {
                var i = this;
                engine.gameSound.playEffect(soundurl.rearrange);
                var n = function () {
                    i.pause = !1,
                        i.mapLayer.isCanClick = !0,
                        t ? t() : i.useItemCallback(e);
                    var n = new cc.Node
                        , a = n.addComponent(cc.ParticleSystem);
                    a.file = engine.memory.getParticle(needLoadParticle.rearrange_plz),
                        a.autoRemoveOnFinish = !0,
                        i.node.addChild(n, fightZIndexConfig.scoreZIndex)
                }
                    , a = "";
                switch (e) {
                    case itemIDConfig.addTime:
                        a = "time";
                        break;
                    case itemIDConfig.tips:
                        a = "search";
                        break;
                    case itemIDConfig.bomb:
                        a = "bomb";
                        break;
                    case itemIDConfig.resort:
                        a = "rearrange"
                }
                var o = new cc.Node
                    , r = o.addComponent(sp.Skeleton);
                GameTool.setSkeleton(r, needLoadSpine.rearrange, a, 1, !1),
                    this.node.addChild(o, fightZIndexConfig.scoreZIndex),
                    r.setCompleteListener(function () {
                        o.destroy(),
                            n()
                    })
            },
            clickParachute: function () {
                this.pause = !0,
                    !1 === fightControl.addScoreParachute && fightControl.curScore < fightControl.targetScore && 1 !== openModuleValue.isTimeOut ? (openWindowLayer(openTypeEm.watchAdvert, watchOpenTypeEm.scoreParachute),
                        gaLogEvent.logByDate("\u70b9\u51fb\u8865\u5206\u964d\u843d\u4f1e", 1)) : openWindowLayer(openTypeEm.watchAdvert, watchOpenTypeEm.parachute),
                    this.clearParachute()
            },
            clickAddGemBtn: function () {
                1 !== debugtest.gem1000 ? !0 === this.isHaveCustom && (1 !== debugtest.parachute ? (this.pause = !0,
                    openWindowLayer(openTypeEm.watchAdvert, watchOpenTypeEm.getGem)) : this.addParachute()) : heroData.addGem(1e3)
            },
            clickPauseBtn: function () {
                !0 === this.isHaveCustom && (this.pause = !0,
                    openWindowLayer(openTypeEm.pause))
            },
            refreshMode: function () {
                heroData.gameMode === GameModelEnum.challenge ? this.node.getChildByName("pro").active = !1 : heroData.gameMode === GameModelEnum.normal && (this.node.getChildByName("pro").active = !0)
            }
        }),
            cc._RF.pop()
    }
        , {
        GameExternalImage: "GameExternalImage"
    }],
    FreindChallengeData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "24aa1eCdBlNtrLXvYmTK3lB", "FreindChallengeData"),
            cc.Class({
                properties: {
                    data: null,
                    challengeTime: 180,
                    levelCount: 0,
                    myData: null,
                    otherData: null,
                    roomData: null,
                    maxChallengeScore: 0,
                    saveDataTime: 288e5,
                    maxRoomCount: 10,
                    customChallengeScore: 500,
                    lastMaxChallengeScore: 0,
                    curRoomData: null,
                    otherScore: 0
                },
                initialize: function (e) {
                    e = e || {},
                        1 === debugtest.challengeRoom && (this.saveDataTime = 3e5),
                        this.roomData = null == e.roomData ? [] : e.roomData;
                    for (var t = 0; t < this.roomData.length; t++)
                        this.roomData[t].addScore || (this.roomData[t].addScore = ~~(1e3 * Math.random() + 500));
                    this.maxChallengeScore = null == e.maxChallengeScore ? 0 : e.maxChallengeScore,
                        this.fmtData()
                },
                fmtData: function () {
                    for (var e = Math.floor((new Date).getTime()), t = 0; t < this.roomData.length; t++)
                        e - this.roomData[t].time >= this.saveDataTime ? (this.roomData.splice(t, 1),
                            t--) : this.roomData[t].roomID || (this.roomData.splice(t, 1),
                                t--)
                },
                updateData: function (e) {
                    this.curRoomData = e,
                        this.otherData = e.otherData,
                        this.lastMaxChallengeScore = this.getCurRoomScore(),
                        this.refreshOtherScore()
                },
                addRoom: function (e) {
                    if (this.roomData.length >= this.maxRoomCount)
                        ccLog("\u6311\u6218\u6570\u91cf\u6700\u5927");
                    else if (this.roomData) {
                        for (var t = 0; t < this.roomData.length; t++)
                            if (this.roomData[t].roomID === e.roomID)
                                return void ccLog("\u623f\u95f4\u5df2\u5b58\u5728  \u521b\u5efa\u5931\u8d25");
                        this.roomData.push(e)
                    }
                },
                getOhterMsgScore: function (e) {
                    for (var t = 0; t < this.roomData.length; t++)
                        if (this.roomData[t].roomID === e)
                            return ccLog("msg score"),
                                this.roomData[t].otherScore || 0;
                    return 0
                },
                getOtherAddScore: function (e) {
                    for (var t = 0, i = 0; i < this.roomData.length; i++)
                        if (e === this.roomData[i].roomID) {
                            this.roomData[i].addScore || (this.roomData[i].addScore = GameTool.getRandomInt(500, 2500)),
                                t += this.roomData[i].addScore;
                            break
                        }
                    return t
                },
                getRoomData: function (e) {
                    if (void 0 === e)
                        return ccLog("roomID \u4e3a\u7a7a");
                    for (var t = 0; t < this.roomData.length; t++)
                        if (this.roomData[t].roomID === e)
                            return this.roomData[t];
                    return ccLog("\u627e\u4e0d\u5230\u623f\u95f4 " + e)
                },
                clearRoomData: function (e) {
                    for (var t = 0; t < this.roomData; t++)
                        if (e === this.roomData[t].roomID) {
                            this.roomData.splice(t, 1);
                            break
                        }
                },
                getSaveData: function () {
                    var e = {};
                    return e.roomData = this.roomData,
                        e.maxChallengeScore = this.maxChallengeScore,
                        e
                },
                getCurRoomScore: function () {
                    return this.curRoomData && this.curRoomData.myScore || 0
                },
                getMyScoreByRoom: function (e) {
                    for (var t = 0; t < this.roomData.length; t++)
                        if (this.roomData[t].roomID === e)
                            return this.roomData[t].myScore = this.roomData[t].myScore || 0,
                                this.roomData[t].myScore;
                    return this.curRoomData.score
                },
                setCurRoomScore: function (e) {
                    this.curRoomData ? e ? this.curRoomData.myScore > e ? ccLog("\u8bbe\u7f6e\u5206\u6570\u5931\u8d25 \u5f53\u524d\u623f\u95f4 \u5206\u6570\u6bd4\u539f\u6765\u7684\u6700\u9ad8\u5206\u4f4e : " + e) : this.curRoomData.myScore = e : ccLog("score\u9519\u8bef " + e) : ccLog("this.curRoomData \u4e3a\u7a7a")
                },
                refreshOtherScore: function () {
                    var e = this;
                    gameSDK.challengeLeaderboard.getChallengeRankScore(this.otherData.playerID, function (t) {
                        t += heroData.challengeData.getOtherAddScore(e.curRoomData.roomID),
                            e.otherScore = t
                    })
                },
                setMyScoreByRoom: function (e) {
                    this.curRoomData ? e ? (ccLog("\u8bbe\u7f6e\u623f\u95f4\u6700\u9ad8\u5206", e),
                        (!this.curRoomData.myScore || e > this.curRoomData.myScore) && (this.curRoomData.myScore = e)) : ccLog("score\u9519\u8bef " + e) : ccLog("this.curRoomData \u4e3a\u7a7a")
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameAchievementData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "182eah0sFZIRJgU2qFvikaF", "GameAchievementData"),
            window.achievementTypeEm = cc.Enum({
                normalGrid: 1,
                itemGrid: 2,
                passLevel: 3,
                surpass: 4,
                dailyTask: 5,
                maxScore: 6
            }),
            cc.Class({
                extends: cc.Component,
                properties: {
                    achievementProObj: null,
                    rewardObj: null
                },
                initialize: function (e) {
                    null == e && (e = {}),
                        this.achievementProObj = e.pro,
                        null == this.achievementProObj && (this.achievementProObj = {}),
                        this.rewardObj = e.reward,
                        null == this.rewardObj && (this.rewardObj = {})
                },
                isGetReward: function (e) {
                    if (null != this.rewardObj[e])
                        return rewardStateEm.already;
                    var t = getDicData(dataJson.achievement_json, e);
                    return this.getProgress(t.type) >= t.num ? rewardStateEm.canReward : rewardStateEm.notCan
                },
                rewardAchieve: function (e) {
                    return null == this.rewardObj[e] && (this.rewardObj[e] = 1,
                        engine.eventM.emit(event_id.REFRESH_ACHIEVEMENT_PUSH),
                        !0)
                },
                getProgress: function (e) {
                    return null == this.achievementProObj[e] && (this.achievementProObj[e] = 0),
                        this.achievementProObj[e]
                },
                getAchievementPush: function () {
                    var e = getDicData(dataJson.achievement_json);
                    for (var t in e)
                        if (this.isGetReward(t) == rewardStateEm.canReward)
                            return !0;
                    return !1
                },
                getWeightValue: function (e) {
                    var t = 0
                        , i = getDicData(dataJson.achievement_json, e)
                        , n = this.isGetReward(e);
                    return n == rewardStateEm.canReward ? t -= 1e4 : n == rewardStateEm.already && (t += 1e4),
                        t + 100 * i.type + i.index
                },
                addProgress: function (e, t) {
                    null == t && (t = 1),
                        null == this.achievementProObj[e] && (this.achievementProObj[e] = 0),
                        1 == getDicData("achievement", e, 1).isadd ? this.achievementProObj[e] += t : t > this.achievementProObj[e] && (this.achievementProObj[e] = t),
                        engine.eventM.emit(event_id.REFRESH_ACHIEVEMENT_PUSH)
                },
                getSaveData: function () {
                    var e = {};
                    return e.pro = this.achievementProObj,
                        e.reward = this.rewardObj,
                        e
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameAchievementOrStrongNode: [function (e, t) {
        "use strict";
        cc._RF.push(t, "a1147HFWcJJc6T/IXcTPoNs", "GameAchievementOrStrongNode"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    openType: null,
                    curData: null,
                    parentLayer: null,
                    isCanClick: null
                },
                onDestroy: function () {
                    this.openType = null,
                        this.curData = null,
                        this.parentLayer = null,
                        this.isCanClick = null
                },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                addEvent: function () {
                    this.node.getChildByName("lvupbtn").on(cc.Node.EventType.TOUCH_END, this.clickLvUpBtn, this)
                },
                removeEvent: function () {
                    this.node.getChildByName("lvupbtn").off(cc.Node.EventType.TOUCH_END, this.clickLvUpBtn, this)
                },
                initialize: function (e, t, i) {
                    this.isCanClick = !0,
                        this.curData = e,
                        this.openType = t,
                        this.parentLayer = i,
                        this.refreshView(),
                        this.addEvent()
                },
                refreshView: function () {
                    switch (this.openType) {
                        case achiOpenTypeEm.achievement:
                            this.showAchievement();
                            break;
                        case achiOpenTypeEm.strong:
                            this.showStronger()
                    }
                },
                showAchievement: function () {
                    var e = getDicData(dataJson.achievement_json, this.curData);
                    this.node.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(needLoadImage.mastloadimg1, "icon_" + e.icon),
                        this.node.getChildByName("desc").getComponent(cc.Label).string = e.describe;
                    var t = heroData.achievementData.getProgress(e.type);
                    this.node.getChildByName("pro").getComponent(cc.ProgressBar).progress = t / e.num,
                        this.node.getChildByName("protxt").getComponent(cc.Label).string = t + "/" + e.num;
                    var i = this.node.getChildByName("lvupbtn")
                        , n = i.getChildByName("txt")
                        , a = i.getChildByName("gemword")
                        , o = this.node.getChildByName("check");
                    n.active = !1,
                        a.getComponent("GameArtWord").setString("" + e.reward);
                    var r = heroData.achievementData.isGetReward(this.curData);
                    this.isCanClick = !1,
                        r == rewardStateEm.already ? (i.active = !1,
                            o.active = !0) : r == rewardStateEm.canReward ? (i.active = !0,
                                o.active = !1,
                                this.isCanClick = !0,
                                i.getComponent(cc.Button).interactable = !0,
                                a.getComponent("GameArtWord").fontName = "fnttype5") : (i.active = !0,
                                    o.active = !1,
                                    i.getComponent(cc.Button).interactable = !1,
                                    a.getComponent("GameArtWord").fontName = "fnttype6"),
                        this.refreshAchievementPush()
                },
                refreshAchievementPush: function () {
                    this.node.getChildByName("lvupbtn").getChildByName("push").active = !1
                },
                showStronger: function () {
                    var e = heroData.strongData.getStrongerData(this.curData);
                    this.node.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(needLoadImage.mastloadimg1, "icon_" + e.icon),
                        this.node.getChildByName("desc").getComponent(cc.Label).string = e.describe;
                    var t = heroData.strongData.getStrongerMax(this.curData);
                    this.node.getChildByName("pro").getComponent(cc.ProgressBar).progress = e.level / t,
                        this.node.getChildByName("protxt").getComponent(cc.Label).string = e.level + "/" + t;
                    var i = this.node.getChildByName("lvupbtn")
                        , n = i.getChildByName("txt")
                        , a = i.getChildByName("gemword")
                        , o = i.getChildByName("gem");
                    this.node.getChildByName("check").active = !1,
                        e.level >= t ? (this.isCanClick = !1,
                            n.active = !0,
                            a.active = !1,
                            o.active = !1) : (this.isCanClick = !0,
                                n.active = !1,
                                a.active = !0,
                                o.active = !0,
                                a.getComponent("GameArtWord").setString("" + e.nextcost)),
                        this.refreshStrongerPush()
                },
                refreshStrongerPush: function () {
                    this.node.getChildByName("lvupbtn").getChildByName("push").active = !1
                },
                clickLvUpBtn: function () {
                    if (1 == this.isCanClick)
                        switch (this.openType) {
                            case achiOpenTypeEm.achievement:
                                this.achievementGet();
                                break;
                            case achiOpenTypeEm.strong:
                                this.clickStronger()
                        }
                },
                clickStronger: function () {
                    var e = heroData.strongData.getStrongerData(this.curData).nextcost;
                    heroData.diamond < e ? openWindowLayer(openTypeEm.watchAdvert, watchOpenTypeEm.gemNoEnough) : 1 == heroData.strongData.lvUpStronger(this.curData) && (gaLogEvent.logByDate("\u5f3a\u5316", this.curData),
                        this.refreshView(),
                        heroData.addGem(-e),
                        heroData.saveData(),
                        this.parentLayer.refreshStrongerPush())
                },
                achievementGet: function () {
                    if (1 == heroData.achievementData.rewardAchieve(this.curData)) {
                        var e = getDicData(dataJson.achievement_json, this.curData, "reward");
                        heroData.addGem(e),
                            heroData.saveData();
                        var t = [];
                        t.push(getItemConfig(itemIDConfig.gem, e)),
                            sceneControl.showReward(t),
                            this.parentLayer.initView()
                    }
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameAchievementOrStrong: [function (e, t) {
        "use strict";
        cc._RF.push(t, "65a35nxkFdL9pVvAse1I7ew", "GameAchievementOrStrong"),
            window.achiOpenTypeEm = cc.Enum({
                achievement: 0,
                strong: 1
            });
        var i = e("GameListLayer");
        cc.Class({
            extends: i,
            properties: {
                curData: null,
                moveLayer: null,
                openType: null
            },
            onDestroy: function () {
                this.removeDataEvent(),
                    this.openType = null,
                    this.curData = null,
                    this.moveLayer = null
            },
            destroyClass: function () {
                this.clear(),
                    this.removeEvent(),
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
            },
            addDataEvent: function () {
                engine.eventM.on(event_id.REFRESH_STRONGER_NODE_PUSH, this.refreshStrongerPush, this),
                    engine.eventM.on(event_id.REFRESH_ACHIEVEMENT_OR_STRONGER_GEM, this.refreshGemNum, this)
            },
            removeDataEvent: function () {
                engine.eventM.off(event_id.REFRESH_STRONGER_NODE_PUSH, this.refreshStrongerPush, this),
                    engine.eventM.off(event_id.REFRESH_ACHIEVEMENT_OR_STRONGER_GEM, this.refreshGemNum, this)
            },
            addEvent: function () {
                this.node.getChildByName("homebtn").on(cc.Node.EventType.TOUCH_END, this.clickHomeBtn, this),
                    this.node.getChildByName("addgembtn").on(cc.Node.EventType.TOUCH_END, this.clickAddGemBtn, this)
            },
            removeEvent: function () {
                this.node.getChildByName("homebtn").off(cc.Node.EventType.TOUCH_END, this.clickHomeBtn, this),
                    this.node.getChildByName("addgembtn").off(cc.Node.EventType.TOUCH_END, this.clickAddGemBtn, this)
            },
            initialize: function (e) {
                this.openType = e,
                    this.moveLayer = this.node.getChildByName("scr").getComponent(cc.ScrollView).content,
                    this.curData = [],
                    this.addEvent(),
                    this.addDataEvent(),
                    this.initView(),
                    this.refreshGemNum()
            },
            refreshGemNum: function () {
                this.node.getChildByName("gemword").getComponent("GameArtWord").setString("" + heroData.diamond),
                    this.refreshStrongerPush()
            },
            initView: function () {
                var e = this.node.getChildByName("title").getComponent(cc.Sprite);
                switch (this.clear(),
                this.curData = [],
                this.openType) {
                    case achiOpenTypeEm.achievement:
                        e.spriteFrame = engine.memory.getSpriteFrame(needLoadLanguageImage.language1, "achievement"),
                            this.addAchievementNode();
                        break;
                    case achiOpenTypeEm.strong:
                        e.spriteFrame = engine.memory.getSpriteFrame(needLoadLanguageImage.language1, "stronger"),
                            this.addStrongerNode()
                }
                this.addNode()
            },
            addAchievementNode: function () {
                var e = getDicData(dataJson.achievement_json)
                    , t = [];
                for (var i in e)
                    (a = new Object).data = i,
                        a.weight = heroData.achievementData.getWeightValue(i),
                        t.push(a);
                t.sort(function (e, t) {
                    return e.weight - t.weight
                });
                for (var n = 0; n < t.length; n++) {
                    var a;
                    (a = new Object).data = t[n].data,
                        a.pos = -70 - 149 * n,
                        this.curData.push(a)
                }
            },
            addStrongerNode: function () {
                var e = getDicData("stronger")
                    , t = 0;
                for (var i in e) {
                    var n = new Object;
                    n.data = i,
                        n.pos = -130 - 149 * t,
                        this.curData.push(n),
                        t++
                }
            },
            addNode: function () {
                this.moveLayer.height = 149 * this.curData.length + 20,
                    this.moveLayer.height < 890 && (this.moveLayer.height = 890);
                var e = this
                    , t = new Object;
                t.initPoint = 0,
                    t.borderPos1 = 70,
                    t.borderPos2 = -960,
                    t.nodeDatas = this.curData,
                    t.createUIFun = function (t) {
                        var i = engine.memory.getPrefab(nextLoadPrefab.achievement_stronger_node_prefab);
                        return i.addComponent("GameAchievementOrStrongNode").initialize(t.data, e.openType, e),
                            i.y = t.pos,
                            e.moveLayer.addChild(i),
                            i
                    }
                    ,
                    this.setData(t)
            },
            update: function () {
                null != this.curData && this.curData.length > 0 && this.updateView(this.moveLayer.y)
            },
            refreshStrongerPush: function () {
                if (this.openType != achiOpenTypeEm.achievement)
                    for (var e = this.nodeUIList.length - 1; e >= 0; e--)
                        this.nodeUIList[e].getComponent("GameAchievementOrStrongNode").refreshStrongerPush()
            },
            clickHomeBtn: function () {
                this.destroyClass()
            },
            clickAddGemBtn: function () {
                openWindowLayer(openTypeEm.watchAdvert, watchOpenTypeEm.getGem)
            }
        }),
            cc._RF.pop()
    }
        , {
        GameListLayer: "GameListLayer"
    }],
    GameAdapterInfo: [function (e, t) {
        "use strict";
        cc._RF.push(t, "bd4ediO/QpAQZNC962nqDl7", "GameAdapterInfo"),
            cc.Class({
                properties: {
                    isInit: null
                },
                initialize: function () {
                    1 != this.isInit && (this.isInit = !0)
                },
                getPercentageX: function (e) {
                    return Math.floor(engineGlobal.viewGameWidth * e)
                },
                getPercentageY: function (e) {
                    return Math.floor(engineGlobal.viewGameHeigh * e)
                },
                getTopY: function (e) {
                    return engineGlobal.viewGameHeigh - e
                },
                getEndY: function (e) {
                    return e
                },
                getLeftX: function (e) {
                    return e
                },
                getRightX: function (e) {
                    return engineGlobal.viewGameWidth - e
                },
                addSceneNode: function (e, t, i, n) {
                    e.x = t,
                        e.y = i,
                        cc.director.getScene().addChild(e),
                        null != n && (e.zIndex = n)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameAnimationConfig: [function (e, t) {
        "use strict";
        cc._RF.push(t, "030cetUHaBMfIpJ7mhgLYzI", "GameAnimationConfig"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                initialize: function () { }
            }),
            cc._RF.pop()
    }
        , {}],
    GameAnimation: [function (e, t) {
        "use strict";
        cc._RF.push(t, "5ba96ZaLz9P1qPBqTggMqXV", "GameAnimation"),
            cc.Class({
                extends: cc.Node,
                properties: {
                    frameIndex: null,
                    lastFrameTime: null,
                    frameIntervalTime: null,
                    isInit: null,
                    playCount: null,
                    curPlayCount: null,
                    isStop: null,
                    isRemoveFromComplete: null,
                    frameFun: null,
                    frameCompleteFun: null,
                    playFrameIndex: null,
                    fromFrameIndex: null,
                    imgeData: null,
                    animationSprite: null
                },
                destroy: function () {
                    this.frameIndex = null,
                        this.lastFrameTime = null,
                        this.frameIntervalTime = null,
                        this.isInit = null,
                        this.playCount = null,
                        this.curPlayCount = null,
                        this.isStop = null,
                        this.isRemoveFromComplete = null,
                        this.frameFun = null,
                        this.frameCompleteFun = null,
                        this.playFrameIndex = null,
                        this.fromFrameIndex = null,
                        this.imgeData = null,
                        this.animationSprite = null,
                        this._super()
                },
                initialize: function () {
                    if (1 != this.isInit) {
                        this.lastFrameTime = 0,
                            this.playCount = 1,
                            this.isRemoveFromComplete = !0,
                            this.frameIndex = 0,
                            this.imgeData = [],
                            this.animationSprite = this.addComponent(cc.Sprite);
                        var e = this;
                        this.animationSprite.update = function () {
                            e.playFrame()
                        }
                    }
                },
                addImgeData: function (e, t) {
                    var i = new Object;
                    i.spriteAtlasURL = e,
                        i.pngName = t,
                        this.imgeData.push()
                },
                setImgeData: function (e) {
                    this.imgeData = e
                },
                playFrame: function () {
                    if (1 != this.isStop && engine.gameTime.getLocalTime() - this.lastFrameTime > this.frameIntervalTime) {
                        if (this.frameIndex > this.playFrameIndex)
                            if (this.curPlayCount++,
                                -1 == this.playCount)
                                this.frameIndex = this.fromFrameIndex;
                            else {
                                if (!(this.curPlayCount < this.playCount))
                                    return this.gotoAndStop(this.playFrameIndex),
                                        null != this.frameCompleteFun && this.frameCompleteFun(),
                                        void (1 == this.isRemoveFromComplete && this.destroy());
                                this.frameIndex = this.fromFrameIndex
                            }
                        this.lastFrameTime = engine.gameTime.getLocalTime(this.frameIndex),
                            this.setBitmapInfo(this.frameIndex),
                            null != this.frameFun && this.frameFun(this.frameIndex),
                            this.frameIndex++
                    }
                },
                play: function () {
                    this.isStop = !1,
                        this.frameIndex = 0,
                        this.fromFrameIndex = 0,
                        this.playFrameIndex = this.imgeData.length - 1
                },
                setBitmapInfo: function () {
                    var e = this.imgeData[this.frameIndex];
                    this.animationSprite.spriteFrame = engine.gameMemoryManagement.getSpriteFrame(e.spriteAtlasURL, e.pngName)
                },
                setFrameIntervalTime: function (e) {
                    this.frameIntervalTime = parseInt(1e3 / e)
                },
                gotoAndPlay: function (e) {
                    this.isStop = !1,
                        this.lastFrameTime = 0,
                        this.frameIndex = e,
                        this.setBitmapInfo(this.frameIndex)
                },
                fromFrameIndexToPlayFrameIndex: function (e, t) {
                    this.isStop = !1,
                        this.fromFrameIndex = e,
                        this.frameIndex = e,
                        this.lastFrameTime = 0,
                        this.setBitmapInfo(this.frameIndex),
                        this.playFrameIndex = t
                },
                gotoAndStop: function (e) {
                    this.isStop = !0,
                        this.lastFrameTime = 0,
                        this.frameIndex = e,
                        this.setBitmapInfo(this.frameIndex)
                },
                setIsStop: function (e) {
                    this.isStop = e
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameArrayDic: [function (e, t) {
        "use strict";
        cc._RF.push(t, "78ad9TkBXpMc7CkBFcKBNV4", "GameArrayDic"),
            cc.Class({
                properties: {
                    keyName: null,
                    arr: null,
                    dic: null
                },
                initialize: function (e) {
                    this.keyName = e,
                        this.arr = [],
                        this.dic = {}
                },
                setArr: function (e) {
                    this.arr = e,
                        this.dic = {};
                    for (var t = 0; t < this.arr.length; t++)
                        this.dic[this.arr[t][this.keyName]] = this.arr[t]
                },
                setDic: function (e) {
                    for (var t in this.dic = e,
                        this.arr = [],
                        e)
                        this.arr.push(e[t])
                },
                addItem: function (e) {
                    null == this.dic[e[this.keyName]] ? (this.dic[e[this.keyName]] = e,
                        this.arr.push(e)) : ccLog("\u653e\u5165\u6570\u636e\u4e0d\u552f\u4e00\uff0c\u952e\u503c\u4e3a:" + this.key)
                },
                setItem: function (e) {
                    if (null != this.dic[e[this.keyName]]) {
                        this.dic[e[this.keyName]] = e;
                        for (var t = 0; t < this.arr.length; t++)
                            this.arr[t][this.keyName] == e[this.keyName] && (this.arr[t] = e)
                    } else
                        this.addItem(e)
                },
                getItem: function (e) {
                    return this.dic[e]
                },
                removeItem: function (e) {
                    null != this.dic[e] && (this.dic[e] = null,
                        delete this.dic[e]);
                    for (var t = 0; t < this.arr.length; t++)
                        if (this.arr[t][this.keyName] == e)
                            return void this.arr.splice(t, 1)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameArtWord: [function (e, t) {
        "use strict";
        cc._RF.push(t, "c065aWrojlEdoYtWfgd7pju", "GameArtWord"),
            window.escapeTxt = new Object,
            escapeTxt["/"] = "gang",
            window.setEscapeTxt = function (e, t) {
                escapeTxt[e] = t
            }
            ,
            window.ArtWordStyleType = cc.Enum({
                middle: 0,
                left: 1,
                right: 2
            }),
            cc.Class({
                extends: cc.Component,
                properties: {
                    _text: "",
                    _styleType: ArtWordStyleType.middle,
                    _txtWidth: 0,
                    _indentationWidth: 0,
                    _txtHight: 0,
                    _fontName: "",
                    _txtNode: null,
                    _fontSpriteAtlas: null,
                    _stringSize: null,
                    _isInit: null,
                    styleType: {
                        type: ArtWordStyleType,
                        set: function (e) {
                            this._styleType = e,
                                this.refreshString()
                        },
                        get: function () {
                            return this._styleType
                        }
                    },
                    txtWidth: {
                        set: function (e) {
                            this._txtWidth = e,
                                this.refreshString()
                        },
                        get: function () {
                            return this._txtWidth
                        }
                    },
                    indentationWidth: {
                        set: function (e) {
                            this._indentationWidth = e,
                                this.refreshString()
                        },
                        get: function () {
                            return this._indentationWidth
                        }
                    },
                    txtHight: {
                        set: function (e) {
                            this._txtHight = e,
                                this.refreshString()
                        },
                        get: function () {
                            return this._txtHight
                        }
                    },
                    fontName: {
                        set: function (e) {
                            this._fontName = e,
                                this.refreshString()
                        },
                        get: function () {
                            return this._fontName
                        }
                    },
                    fontSpriteAtlas: {
                        type: cc.SpriteAtlas,
                        set: function (e) {
                            this._fontSpriteAtlas = e,
                                this.refreshString()
                        },
                        get: function () {
                            return this._fontSpriteAtlas
                        }
                    },
                    text: {
                        set: function (e) {
                            this.setString(e)
                        },
                        get: function () {
                            return this._text
                        }
                    }
                },
                initialize: function () {
                    1 != this._isInit && (this._isInit = !0,
                        this.node.destroyAllChildren())
                },
                onDestroy: function () { },
                onLoad: function () {
                    this.initialize(),
                        this.refreshString()
                },
                refreshString: function () {
                    var e = this._text;
                    this._text = "",
                        this.setString(e)
                },
                setString: function (e) {
                    if (e != this._text) {
                        null != this._txtNode && (this._txtNode.destroy(),
                            this._txtNode = null),
                            null == this._stringSize && (this._stringSize = new cc.Size),
                            this._text = e,
                            this._txtNode = new cc.Node,
                            this.node.addChild(this._txtNode);
                        for (var t = 0, i = 0; i < e.length; i++) {
                            var n = e[i]
                                , a = new cc.Node;
                            switch (a.addComponent(cc.Sprite).spriteFrame = this.fontSpriteAtlas.getSpriteFrame(this.fontName + "_" + n),
                            this.styleType) {
                                case ArtWordStyleType.middle:
                                case ArtWordStyleType.left:
                                    a.setAnchorPoint(0, .5);
                                    break;
                                case ArtWordStyleType.right:
                                    a.setAnchorPoint(1, .5)
                            }
                            a.x = t;
                            var o = a.getContentSize();
                            a.x = t,
                                null != o && null != o.width && 0 != o.width ? t = t + o.width + this._indentationWidth : t += this.txtWidth,
                                this._txtNode.addChild(a)
                        }
                        switch (this._stringSize.width = t,
                        this.styleType) {
                            case ArtWordStyleType.middle:
                                this._txtNode.x = -t / 2
                        }
                    }
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameBackgroundLoad: [function (e, t) {
        "use strict";
        cc._RF.push(t, "548532kx/tGWoI+ESt3D79J", "GameBackgroundLoad");
        var i = e("LoadControl");
        cc.Class({
            properties: {
                loadInfoArr: null,
                isLoad: null,
                isInit: null
            },
            initialize: function () {
                1 != this.isInit && (this.isInit = !0,
                    this.loadInfoArr = [],
                    this.isLoad = !1)
            },
            addLoadRes: function (e) {
                for (var t = 0; t < e.length; t++)
                    this.loadInfoArr.push(e[t]);
                this.loadRes()
            },
            loadRes: function () {
                if (0 == this.isLoad && this.loadInfoArr.length > 0) {
                    var e = this
                        , t = new i
                        , n = new Object;
                    n.resources = [this.loadInfoArr.shift()],
                        n.completeCallback = function () {
                            e.isLoad = !1,
                                e.loadRes()
                        }
                        ,
                        t.initialize(n),
                        t.loadRes()
                }
            }
        }),
            cc._RF.pop()
    }
        , {
        LoadControl: "LoadControl"
    }],
    GameCPUManagement: [function (e, t) {
        "use strict";
        cc._RF.push(t, "4ec50QFmC9PEJcmG5G+GblJ", "GameCPUManagement");
        var i = e("GameLoadCPU");
        window.CPUStyleType = cc.Enum({
            loadType: 1
        }),
            window.CPUExecuteOrder = cc.Enum({
                curUIType: 99,
                otherType: 10
            }),
            cc.Class({
                extends: cc.Component,
                properties: {
                    CPUInfoArr: null,
                    isRun: null,
                    isInit: null,
                    callFun: null,
                    isStop: null,
                    isOrder: null
                },
                initialize: function () {
                    1 != this.isInit && (this.isInit = !0,
                        this.CPUInfoArr = [],
                        this.isRun = !1,
                        this.isOrder = !1)
                },
                addCPUInfo: function (e) {
                    e.length > 0 && (this.isOrder = !0);
                    for (var t = 0; t < e.length; t++)
                        e[t].order = 1e10 * e[t].executeOrder + e[t].timeOrder,
                            this.CPUInfoArr.push(e[t]);
                    this.run()
                },
                setRun: function (e) {
                    this.isRun = e
                },
                run: function () {
                    if (this.CPUInfoArr.length <= 0)
                        ccLog("......\u4e0b\u8f7d\u8d44\u6e90\u957f\u5ea6\u4e3a0...");
                    else if (1 != this.isStop) {
                        if (0 == this.isRun) {
                            this.isRun = !0,
                                1 == this.order && (this.CPUInfoArr.sort(function (e, t) {
                                    return e.order - t.order
                                }),
                                    this.order = !1);
                            var e = this.CPUInfoArr.shift();
                            switch (e.type) {
                                case CPUStyleType.loadType:
                                    var t = new i;
                                    t.initialize(e),
                                        t.run()
                            }
                        }
                    } else
                        ccLog("......\u4e0b\u8f7d\u8d44\u6e90\u505c\u6b62\u4e86...")
                },
                stopCPU: function () {
                    this.isStop = !0
                },
                openCPU: function () {
                    this.isStop = !1
                }
            }),
            cc._RF.pop()
    }
        , {
        GameLoadCPU: "GameLoadCPU"
    }],
    GameCPU: [function (e, t) {
        "use strict";
        cc._RF.push(t, "2ef61adCRBAfJPfoD2ijVt7", "GameCPU"),
            cc.Class({
                properties: {},
                run: function () { },
                destroy: function () { },
                complete: function () {
                    this.destroy(),
                        engine.CPUM.setRun(!1),
                        engine.CPUM.run()
                },
                failComplete: function () {
                    this.destroy(),
                        engine.CPUM.setRun(!1),
                        engine.CPUM.run()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameChatRaceLampLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "fb6ec5x6h1ECrOqzOwknsEy", "GameChatRaceLampLayer"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    bgNode: null,
                    richLabel: null
                },
                onDestroy: function () {
                    this.bgNode = null,
                        this.richLabel = null
                },
                destroyClass: function () {
                    null != this.node && this.node.destroy()
                },
                initialize: function () {
                    this.bgNode = new cc.Node;
                    var e = this.bgNode.addComponent(cc.Sprite);
                    e.spriteFrame = engine.memory.getSpriteFrame(loginLoadImage.publicimg1, "lampbg"),
                        e.type = cc.Sprite.Type.SLICED,
                        e.sizeMode = cc.Sprite.SizeMode.CUSTOM,
                        this.bgNode.opacity = 170,
                        this.bgNode.y = 528,
                        this.bgNode.width = 920,
                        this.bgNode.height = 38,
                        this.node.addChild(this.bgNode),
                        this.richLabel = new cc.Node,
                        this.richLabel.anchorX = 0,
                        this.richLabel.x = 460,
                        this.richLabel.y = this.bgNode.y + 1;
                    var t = this.richLabel.addComponent(cc.RichText);
                    t.horizontalAlign = cc.Label.HorizontalAlign.LEFT,
                        t.fontSize = 22,
                        t.font = engine.memory.getFont(needLoadFont.fntttf1_font),
                        t.lineHeight = 32,
                        this.node.addChild(this.richLabel),
                        this.bgNode.active = !1,
                        this.richLabel.active = !1,
                        this.isNeedShow()
                },
                isNeedShow: function () {
                    var e = heroData.raceLampData.getRaceLampData();
                    if (heroData.raceLampData.deleteRaceLampData(),
                        null != e) {
                        this.bgNode.active = !0,
                            this.richLabel.active = !0,
                            this.richLabel.x = 460,
                            this.richLabel.getComponent(cc.RichText).string = e;
                        var t = -460 - this.richLabel.width
                            , i = this.richLabel.y
                            , n = this;
                        this.richLabel.stopAllActions(),
                            this.richLabel.runAction(cc.sequence(cc.moveTo(10, t, i), cc.callFunc(function () {
                                n.isNeedShow()
                            })))
                    } else
                        this.bgNode.active = !1,
                            this.richLabel.active = !1
                },
                update: function () {
                    0 == this.bgNode.active && this.isNeedShow()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameConfigData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "627c8PYqfxHMacgOaksddMW", "GameConfigData"),
            window.openModuleValue = {
                forFBCheck: 0,
                hideMessageBox: 1,
                isApk: 0,
                isTimeOut: 1,
                chooseLv: 0
            },
            gameSDKName == faceBookSDK && (debugtest = {}),
            window.rewardStateEm = cc.Enum({
                notCan: 0,
                canReward: 1,
                already: 2
            }),
            window.isSamePos = function (e, t) {
                return null == e && null == t || null != e && null != t && e.y == t.y && e.x == t.x
            }
            ,
            window.Global = {
                needSoonRemoveLoadingCircle: !1
            },
            window.openTypeEm = cc.Enum({
                help: 0,
                mainUI: 1,
                achievementOrStrong: 2,
                rank: 3,
                fightUI: 4,
                pause: 5,
                watchAdvert: 6,
                loading: 7,
                messageBox: 8,
                dailyTask: 10,
                tipsLayer: 11,
                surpriseLayer: 12,
                resultLayer: 13,
                gameOver: 14,
                resurgence: 15,
                target: 16,
                surpass: 17,
                customEnd: 18,
                loadRes: 19,
                newElement: 20,
                gradeUI: 21,
                gradeUpUI: 22,
                loseDetail: 23,
                raceLamp: 24,
                chooseLevel: 25,
                starBox: 26,
                newMode: 27,
                levelTarget: 28,
                puzzlePageView: 29,
                puzzleLevel: 30,
                levelWatch: 31,
                challenge: 32,
                challengeOver: 33,
                challengeSurpass: 34,
                challengeInvite: 35,
                gameSelectLevel: 36,
                gameZuma: 37,
                game_samll_end: 38,
                gameQs: 39,
                game_samll_exit_certain: 40
            }),
            window.openDataConfig = {
                0: {
                    component: "HelpLayer",
                    prefab: needLoadPrefab.public_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex,
                    otherPrefab: nextLoadPrefab.help_node_prefab
                },
                1: {
                    component: "MainUILayer",
                    prefab: needLoadPrefab.main_prefab,
                    zIndex: UIzIndexInfo.UIBottomzIndex
                },
                2: {
                    component: "GameAchievementOrStrong",
                    prefab: nextLoadPrefab.achievement_stronger_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex,
                    otherPrefab: nextLoadPrefab.achievement_stronger_node_prefab
                },
                3: {
                    component: "GameRankLayer",
                    prefab: nextLoadPrefab.rank_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex,
                    otherPrefab: nextLoadPrefab.rank_node_prefab
                },
                4: {
                    component: "FightUILayer",
                    prefab: needLoadPrefab.fight_prefab,
                    zIndex: UIzIndexInfo.UIBottomzIndex
                },
                5: {
                    component: "PauseLayer",
                    prefab: needLoadPrefab.public_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                6: {
                    component: "WatchAdvertLayer",
                    prefab: needLoadPrefab.public_watch_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                7: {
                    component: "LoadingLayer",
                    prefab: needLoadPrefab.loading_prefab,
                    zIndex: UIzIndexInfo.UILoadzIndex
                },
                8: {
                    component: "ChooseMessengerLayer",
                    prefab: nextLoadPrefab.choose_messenger_prefab,
                    zIndex: UIzIndexInfo.UIRewardIndex
                },
                10: {
                    component: "GameDailyTaskLayer",
                    prefab: needLoadPrefab.public_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex,
                    otherPrefab: nextLoadPrefab.daily_task_node_prefab
                },
                11: {
                    component: "TipsLayer",
                    prefab: nextLoadPrefab.tips_layer_prefab,
                    zIndex: UIzIndexInfo.UIConfirmzIndex
                },
                12: {
                    component: "GameSurpriseLayer",
                    prefab: nextLoadPrefab.surprise_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex,
                    otherSpine: nextLoadSpine.mysterious,
                    otherPrefab: nextLoadPrefab.surprise_card_node_prefab
                },
                13: {
                    component: "ResultLayer",
                    prefab: nextLoadPrefab.result_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                14: {
                    component: "GameOverLayer",
                    prefab: nextLoadPrefab.game_over_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                15: {
                    component: "ResurgenceLayer",
                    prefab: nextLoadPrefab.resurgence_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                16: {
                    component: "TargetLayer",
                    prefab: needLoadPrefab.target_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                17: {
                    component: "SurpassLayer",
                    prefab: nextLoadPrefab.surpass_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                18: {
                    component: "CustomEndLayer",
                    prefab: nextLoadPrefab.custom_end_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                19: {
                    component: "LoadResLayer",
                    prefab: needLoadPrefab.loading_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                20: {
                    component: "NewElementTipsLayer",
                    prefab: needLoadPrefab.public_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                21: {
                    component: "GradeLayer",
                    prefab: needLoadPrefab.public_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex,
                    otherPrefab: nextLoadPrefab.grade_node_prefab
                },
                22: {
                    component: "GradeUpLayer",
                    prefab: nextLoadPrefab.grade_up_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                23: {
                    component: "LoseDetailLayer",
                    prefab: nextLoadPrefab.lose_detail_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                24: {
                    component: "GameChatRaceLampLayer",
                    zIndex: UIzIndexInfo.UIRewardIndex
                },
                26: {
                    component: "StarGiftBoxLayer",
                    prefab: nextLoadPrefab.starGiftBox_layer_prefrab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                27: {
                    component: "NewModeLayer",
                    prefab: needLoadPrefab.public_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                28: {
                    component: "LevelTargetLayer",
                    prefab: needLoadPrefab.level_target_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                29: {
                    component: "LevelPageView",
                    prefab: nextLoadPrefab.page_view_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex,
                    otherPrefab: [nextLoadPrefab.puzzle_layer_prefab]
                },
                30: {
                    component: "LevelPuzzleLayer",
                    prefab: nextLoadPrefab.puzzle_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                31: {
                    component: "LevelWatchLayer",
                    prefab: nextLoadPrefab.watch_replay_level_Layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                32: {
                    component: "ChallengeLayer",
                    prefab: nextLoadPrefab.challenge_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex,
                    otherPrefab: nextLoadPrefab.challenge_node_prefab
                },
                33: {
                    component: "ChallengeOverLayer",
                    prefab: nextLoadPrefab.challengeOver_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                34: {
                    component: "ChallengeSurpassLayer",
                    prefab: nextLoadPrefab.challengeSurpass_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                35: {
                    component: "ChallengeInviteLayer",
                    prefab: nextLoadPrefab.challengeInvite_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                36: {
                    component: "SmallGameSelectLayer",
                    prefab: nextLoadPrefab.smallgame_select_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                37: {
                    component: "SmallGameZumaLayer",
                    prefab: nextLoadPrefab.smallgame_zuma_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                38: {
                    component: "SmallGameEndLayer",
                    prefab: nextLoadPrefab.smallgame_end_layer_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                39: {
                    component: "SmallGameQsLayer",
                    prefab: nextLoadPrefab.smallgame_qs_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                },
                40: {
                    component: "SmallGameCertainExitLayer",
                    prefab: nextLoadPrefab.smallgame_certain_exit_prefab,
                    zIndex: UIzIndexInfo.UITopzIndex
                }
            },
            window.windowResIsExist = function (e) {
                var t = openDataConfig[e];
                if (null != t.prefab && 0 == engine.memory.isExistRes(t.prefab))
                    return !1;
                if (null != t.otherPrefab)
                    if (t.otherPrefab instanceof Array)
                        t.otherPrefab.forEach(function (e) {
                            if (0 == engine.memory.isExistRes(e))
                                return !1
                        });
                    else if (0 == engine.memory.isExistRes(t.otherPrefab))
                        return !1;
                return null == t.otherSpine || 0 != engine.memory.isExistRes(t.otherSpine)
            }
            ,
            window.openWindowLayer = function (e, t) {
                var i = function () {
                    addGameLayer(e, t)
                };
                1 == windowResIsExist(e) ? i() : addGameLayer(openTypeEm.loadRes, {
                    callFun: i,
                    openType: e
                })
            }
            ,
            window.addGameLayer = function (e, t) {
                var i = openDataConfig[e]
                    , n = null
                    , a = (n = null != i.prefab ? engine.memory.getPrefab(i.prefab) : new cc.Node).addComponent(i.component);
                engine.gameAdapterInfo.addSceneNode(n, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), i.zIndex),
                    a.initialize(t)
            }
            ,
            window.getDicData = function (e, t, i) {
                return null == t ? engine.gameData.dataDic[e] : null == i ? engine.gameData.dataDic[e][t] : engine.gameData.dataDic[e][t][i]
            }
            ,
            window.getLanguageDic = function (e) {
                return getDicData(dataJson.language_json, e, "content")
            }
            ,
            window.getGlobleDic = function (e) {
                return getDicData(dataJson.globle_json, e, "value")
            }
            ,
            window.changeMusic = function () {
                heroData.isStopMusic = engine.gameSound.stopSound,
                    heroData.saveData()
            }
            ,
            window.itemIDConfig = {
                gem: 1e3,
                addTime: 1001,
                tips: 1002,
                bomb: 1003,
                resort: 1004,
                starBox: 10001
            },
            window.getItemConfig = function (e, t) {
                return {
                    num: t,
                    id: e
                }
            }
            ,
            window.getItemSpriteFrame = function (e) {
                var t = null;
                switch (e) {
                    case itemIDConfig.gem:
                        t = engine.memory.getSpriteFrame(loginLoadImage.publicimg1, "gem2");
                        break;
                    case itemIDConfig.starBox:
                        t = engine.memory.getSpriteFrame(nextLoadImage.level, "levelGiftIcon");
                        break;
                    default:
                        var i = getDicData(dataJson.item_json, e, "icon");
                        t = engine.memory.getSpriteFrame(needLoadImage.mastloadimg1, "itemicon" + i)
                }
                return t
            }
            ,
            window.arrIsContain = function (e, t, i) {
                for (var n = -1, a = 0; a < e.length; a++)
                    if (null != i) {
                        if (e[a][i] == t) {
                            n = a;
                            break
                        }
                    } else if (e[a] == t) {
                        n = a;
                        break
                    }
                return n
            }
            ,
            window.spriteSetGray = function (e) {
                var t = e.getComponent(cc.Sprite);
                t.setMaterial(0, cc.MaterialVariant.createWithBuiltin("2d-gray-sprite", t))
            }
            ,
            window.spriteGrayRecover = function (e) {
                var t = e.getComponent(cc.Sprite);
                t.setMaterial(0, cc.MaterialVariant.createWithBuiltin("2d-sprite", t))
            }
            ,
            window.myGameGetShortName = function (e, t) {
                t = t || 10;
                for (var i = e.length, n = 0, a = e, o = 0; o < i; o++)
                    if (0 != (65280 & e.charCodeAt(o)) && n++,
                        ++n > t) {
                        a = e.slice(0, o) + "...";
                        break
                    }
                return a
            }
            ,
            window.analysisItemInfoByDic = function (e) {
                for (var t = [], i = e.split(","), n = 0; n < i.length; n++) {
                    var a = i[n].split("|")
                        , o = getItemConfig(parseInt(a[0]), parseInt(a[1]));
                    t.push(o)
                }
                return t
            }
            ,
            cc._RF.pop()
    }
        , {}],
    GameCustomImage: [function (e, t) {
        "use strict";
        cc._RF.push(t, "e694eRmeg1Eg4Zi/4TyHhma", "GameCustomImage"),
            cc.Class({
                properties: {
                    width: null,
                    height: null,
                    pngData: null,
                    fontData: null,
                    drawFun: null,
                    drawCompleteFun: null
                },
                initialize: function (e) {
                    null != e.pngData ? this.pngData = e.pngData : this.pngData = [],
                        null != e.fontData ? this.fontData = e.fontData : this.fontData = [],
                        this.width = e.width,
                        this.height = e.height,
                        this.getBase64Image(e)
                },
                getBase64Image: function () {
                    var e = this;
                    ccLog(this.pngData.length);
                    for (var t = 0; t < this.pngData.length; t++) {
                        var i = this.pngData[t]
                            , n = new Image;
                        i.playImage = n,
                            n.crossOrigin = "anonymous",
                            n.imgHeight = i.imgHeight,
                            n.imgWidth = i.imgWidth,
                            n.src = i.url,
                            n.isLoad = !1,
                            n.onload = function () {
                                this.width = this.imgWidth,
                                    this.height = this.imgHeight,
                                    this.isLoad = !0,
                                    e.drawImage()
                            }
                    }
                },
                drawImage: function () {
                    for (var e = 0; e < this.pngData.length; e++)
                        if (1 != (n = this.pngData[e]).playImage.isLoad)
                            return;
                    if (null == this.drawFun) {
                        var t = document.createElement("canvas");
                        t.width = this.width,
                            t.height = this.height;
                        for (var i = 0; i < this.pngData.length; i++) {
                            var n = this.pngData[i]
                                , a = t.getContext("2d");
                            a.drawImage(n.playImage, n.posX, n.posY, n.playImage.width, n.playImage.height)
                        }
                        for (var o = 0; o < this.fontData.length; o++) {
                            var r = this.fontData[o];
                            a.font = r.font,
                                a.lineWidth = r.lineWidth,
                                a.fillStyle = r.fillStyle,
                                a.textAlign = r.textAlign,
                                a.strokeStyle = r.strokeStyle,
                                a.strokeText(r.des.toString(), r.posX, r.posY),
                                a.fillText(r.des.toString(), r.posX, r.posY)
                        }
                        var s = t.toDataURL("image/png");
                        null != this.drawCompleteFun && this.drawCompleteFun(s)
                    } else
                        this.drawFun()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameDailyTaskData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "d82714tKvNAEqBQS8Whx+Dm", "GameDailyTaskData"),
            window.dailyTaskTypeEm = cc.Enum({
                normalGrid: 1,
                passLevel: 2,
                surpass: 3,
                gameTime: 4,
                getSort: 5
            }),
            cc.Class({
                extends: cc.Component,
                properties: {
                    curTaskArr: null
                },
                initialize: function (e) {
                    null == e && (e = []),
                        this.curTaskArr = e,
                        this.curTaskArr.length <= 0 && this.refreshTaskData()
                },
                refreshTaskData: function () {
                    this.curTaskArr = [];
                    var e = getDicData("dailytask")
                        , t = [];
                    for (var i in e)
                        t.push(i);
                    t.sort(function () {
                        return Math.random() - .5
                    });
                    for (var n = 0; n < 3; n++) {
                        var a = t[n]
                            , o = GameTool.getRandomInt(0, e[a].length - 1)
                            , r = {
                                id: e[a][o].id,
                                pro: 0,
                                reward: 0
                            };
                        this.curTaskArr.push(r)
                    }
                },
                addTaskPro: function (e, t) {
                    null == t && (t = 1);
                    for (var i = 0; i < this.curTaskArr.length; i++) {
                        var n = this.curTaskArr[i]
                            , a = getDicData(dataJson.dailytask_json, n.id);
                        if (a.type == e) {
                            1 == a.isadd ? this.curTaskArr[i].pro += t : t > n.pro && (this.curTaskArr[i].pro = t),
                                this.curTaskArr[i].pro > a.num && (this.curTaskArr[i].pro = a.num);
                            break
                        }
                    }
                    engine.eventM.emit(event_id.REFRESH_DAILY_TASK_PUSH)
                },
                getTaskPush: function () {
                    for (var e = 0; e < this.curTaskArr.length; e++)
                        if (this.getRewardState(e) == rewardStateEm.canReward)
                            return !0;
                    return !1
                },
                getRewardState: function (e) {
                    var t = this.curTaskArr[e];
                    if (1 == t.reward)
                        return rewardStateEm.already;
                    var i = getDicData(dataJson.dailytask_json, t.id);
                    return t.pro >= i.num ? rewardStateEm.canReward : rewardStateEm.notCan
                },
                getTaskReward: function (e) {
                    return 0 == this.curTaskArr[e].reward && (this.curTaskArr[e].reward = 1,
                        engine.eventM.emit(event_id.REFRESH_DAILY_TASK_PUSH),
                        !0)
                },
                getSaveData: function () {
                    return this.curTaskArr
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameDailyTaskLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "60ae9hVxx9OPJMGCT1oZjSq", "GameDailyTaskLayer");
        var i = e("PublicLayer");
        cc.Class({
            extends: i,
            properties: {
                timeTxt: null,
                txtDes: null,
                updateCD: null,
                nodeComArr: null
            },
            onDestroy: function () {
                this.timeTxt = null,
                    this.txtDes = null,
                    this.updateCD = null,
                    this.nodeComArr = null,
                    this.removeDataEvent(),
                    bannerManager.hideBanner(bannerLayerNameOb.dailyTask)
            },
            destroyClass: function () {
                null != this.timeTxt && this.timeTxt.node.destroy(),
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
            },
            addDataEvent: function () {
                engine.eventM.on(event_id.REFRESH_DAILY_TASK_LAYER, this.refreshLayer, this)
            },
            removeDataEvent: function () {
                engine.eventM.off(event_id.REFRESH_DAILY_TASK_LAYER, this.refreshLayer, this)
            },
            initialize: function () {
                var e = {
                    bg: {
                        y: 28,
                        width: 666,
                        height: 620
                    },
                    bg2: {
                        y: 41,
                        width: 620,
                        height: 585
                    },
                    title: {
                        txt: getLanguageDic(1023)
                    },
                    close: {
                        x: 312,
                        y: 340
                    }
                };
                this.addEvent(),
                    this.addDataEvent();
                var t = new cc.Node;
                t.y = 235,
                    this.timeTxt = t.addComponent(cc.Label),
                    this.timeTxt.font = engine.memory.getFont(needLoadFont.fntttf1_font),
                    this.timeTxt.fontSize = 28,
                    this.timeTxt.horizontalAlign = cc.Label.HorizontalAlign.CENTER,
                    this.timeTxt.verticalAlign = cc.Label.VerticalAlign.CENTER,
                    this.node.getChildByName("activenode").addChild(t);
                var i = t.addComponent(cc.LabelOutline);
                i.width = 2,
                    i.color = cc.color("#723B11"),
                    this.nodeComArr = [];
                for (var n = heroData.dailyTaskData.curTaskArr, a = 0; a < n.length; a++) {
                    var o = engine.memory.getPrefab(nextLoadPrefab.daily_task_node_prefab)
                        , r = o.addComponent("GameDailyTaskNode");
                    r.initialize(a, this),
                        o.y = 130 - 154 * a,
                        this.node.getChildByName("activenode").addChild(o),
                        this.nodeComArr.push(r)
                }
                this.txtDes = getLanguageDic(1011),
                    this.refreshEndTime(),
                    this._super(e),
                    bannerManager.refreshBanner(bannerLayerNameOb.dailyTask)
            },
            refreshLayer: function () {
                for (var e = 0; e < this.nodeComArr.length; e++)
                    this.nodeComArr[e].refreshLayer()
            },
            update: function () {
                null != this.updateCD && engine.gameTime.localTime - this.updateCD > 500 && this.refreshEndTime()
            },
            refreshEndTime: function () {
                this.updateCD = engine.gameTime.localTime;
                var e = heroData.taskRefreshTime + heroData.dailyTaskCD - engine.gameTime.localTime;
                this.timeTxt.string = this.txtDes + engine.gameTime.formatTime(e)
            }
        }),
            cc._RF.pop()
    }
        , {
        PublicLayer: "PublicLayer"
    }],
    GameDailyTaskNode: [function (e, t) {
        "use strict";
        cc._RF.push(t, "8582bMWRBJAmJPdH90W7yDX", "GameDailyTaskNode"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    index: null,
                    parentLayer: null,
                    isCanClick: null
                },
                onDestroy: function () {
                    this.index = null,
                        this.parentLayer = null,
                        this.isCanClick = null
                },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                addEvent: function () {
                    this.node.getChildByName("getbtn").on(cc.Node.EventType.TOUCH_END, this.clickGetBtn, this)
                },
                removeEvent: function () {
                    this.node.getChildByName("getbtn").off(cc.Node.EventType.TOUCH_END, this.clickGetBtn, this)
                },
                initialize: function (e, t) {
                    this.isCanClick = !1,
                        this.index = e,
                        this.parentLayer = t,
                        this.addEvent(),
                        this.refreshLayer()
                },
                refreshLayer: function () {
                    var e = heroData.dailyTaskData.curTaskArr[this.index]
                        , t = getDicData(dataJson.dailytask_json, e.id);
                    this.node.getChildByName("desc").getComponent(cc.Label).string = t.describe,
                        this.node.getChildByName("pro").getComponent(cc.ProgressBar).progress = e.pro / t.num,
                        this.node.getChildByName("protxt").getComponent(cc.Label).string = e.pro + "/" + t.num;
                    var i = this.node.getChildByName("getbtn")
                        , n = i.getChildByName("gemword")
                        , a = this.node.getChildByName("check");
                    n.getComponent("GameArtWord").setString("" + t.reward);
                    var o = heroData.dailyTaskData.getRewardState(this.index);
                    this.isCanClick = !1,
                        o == rewardStateEm.already ? (i.active = !1,
                            a.active = !0) : o == rewardStateEm.canReward ? (i.active = !0,
                                a.active = !1,
                                this.isCanClick = !0,
                                i.getComponent(cc.Button).interactable = !0,
                                n.getComponent("GameArtWord").fontName = "fnttype5") : (i.active = !0,
                                    a.active = !1,
                                    i.getComponent(cc.Button).interactable = !1,
                                    n.getComponent("GameArtWord").fontName = "fnttype6")
                },
                clickGetBtn: function () {
                    if (1 == this.isCanClick && 1 == heroData.dailyTaskData.getTaskReward(this.index)) {
                        this.refreshLayer();
                        var e = heroData.dailyTaskData.curTaskArr[this.index]
                            , t = getDicData(dataJson.dailytask_json, e.id, "reward");
                        heroData.addGem(t);
                        var i = [];
                        i.push(getItemConfig(itemIDConfig.gem, t)),
                            sceneControl.showReward(i),
                            heroData.achievementData.addProgress(achievementTypeEm.dailyTask),
                            heroData.saveData()
                    }
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "f8499hr5dVKqpoWGh6smq1b", "GameData"),
            cc.Class({
                properties: {
                    isInit: null,
                    dataDic: null
                },
                initialize: function () {
                    1 != this.isInit && (this.isInit = !0,
                        this.dataDic = new Object)
                },
                analysisJsonData: function (e, t) {
                    if (null == this.dataDic[e]) {
                        var i = cc.resources.get(t);
                        if (null != i) {
                            i = i.json;
                            for (var n = new Object, a = 1; a < i.length; a++) {
                                for (var o = new Object, r = 0; r < i[a].length; r++)
                                    "null" != i[a][r] ? o[i[0][r]] = i[a][r] : o[i[0][r]] = "";
                                n[i[a][0]] = o
                            }
                            this.dataDic[e] = n
                        } else
                            ccLog("\u914d\u7f6e\u7684" + e + "JSON\u6587\u4ef6\u7f3a\u5931")
                    } else
                        ccLog("\u914d\u7f6e\u7684" + e + "JSON\u6587\u4ef6\u5df2\u7ecf\u88ab\u521d\u59cb\u5316\u4e86")
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameEventConfig: [function (e, t) {
        "use strict";
        cc._RF.push(t, "fdeaeSzWMVEgqRlrvxBC2eD", "GameEventConfig"),
            window.event_id = {
                REFRESH_STRONGER_NODE_PUSH: 100001,
                REFRESH_ACHIEVEMENT_PUSH: 100002,
                REFRESH_DAILY_GIFT_BTN: 100003,
                REFRESH_ACHIEVEMENT_OR_STRONGER_GEM: 100004,
                REFRESH_DAILY_TASK_PUSH: 100005,
                REFRESH_DAILY_TASK_LAYER: 100006,
                REFRESH_SURPRISE_PUSH: 100007,
                REFRESH_RANK_LAYER: 100008,
                REFRESH_GRADE_PUSH: 100009,
                REFRESH_PUZZLE_PUSH: 100010,
                REFRESH_PAUSE: 200002,
                RESURGENCE_REFRESH: 200003,
                REFRESH_ITEM_NUM: 200004,
                SHOW_TARGET_ACTION: 200005,
                GOTO_NEXT_CUSTOM: 200006,
                CLOSE_NEW_ELEMENT: 200007,
                REWARD_ADD_SCORE_PARACHUTE: 200008,
                ICE_BROKEN_ACTION: 200009,
                COLLECT_LEVEL_TARGET: 200010,
                MOVE_GRID_OVER: 200011,
                REPLAY_CUR_LEVEL: 200012,
                EVENT_CONGRATULATIONS: 200013,
                REFRESH_GEM_NUMBER: 3e5,
                REFRESH_GOLD_NUMBER: 300001,
                CLOSE_LOADING_LAYER: 300002,
                REFRESH_CHALLENGE_SCORE: "REFRESH_CHALLENGE_SCORE",
                CREATE_ROCKET: "CREATE_ROCKET",
                CREATE_DEMON: "CREATE_DEMON",
                DELETE_GRID: "DELETE_GRID",
                ADD_SCORE_COMBO: "ADD_SCORE_COMBO",
                REMOVE_CHALLENGENODE: "REMOVE_CHALLENGENODE",
                MOVE_LEVE_BG_OVER: "MOVE_LEVE_BG_OVER"
            },
            cc._RF.pop()
    }
        , {}],
    GameEventManager: [function (e, t) {
        "use strict";
        cc._RF.push(t, "b5ab6VzOG5CwoM7A6wftrQs", "GameEventManager"),
            cc.Class({
                properties: {
                    node: null,
                    keyDic: null
                },
                initialize: function () {
                    this.node = new cc.Node,
                        this.keyDic = new Object
                },
                on: function (e, t, i) {
                    null != this.keyDic[e] ? ccLog("\u4e8b\u4ef6\u91cd\u590d\u6dfb\u52a0\uff0c\u4e8b\u4ef6\u7f16\u53f7:" + e) : this.keyDic[e] = e,
                        this.node.on(e, t, i)
                },
                off: function (e, t, i) {
                    null != this.keyDic[e] && (this.keyDic[e] = null,
                        delete this.keyDic[e]),
                        this.node.off(e, t, i)
                },
                emit: function (e, t) {
                    this.node.emit(e, t)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameExternalImage: [function (e, t) {
        "use strict";
        cc._RF.push(t, "0cc55a/evFKRbKSgTaZ8wF5", "GameExternalImage"),
            cc.Class({
                extends: cc.Node,
                properties: {
                    animationSprite: null
                },
                loadImage: function (e, t, i, n) {
                    this.animationSprite = this.addComponent(cc.Sprite),
                        null != t && (this.animationSprite.spriteFrame = t,
                            null != i && (this.scaleX = i / this.getContentSize().width),
                            null != n && (this.scaleY = n / this.getContentSize().height));
                    var a = engine.memory.getExternalImage(e)
                        , o = this;
                    null == a ? (loadExternalImage(e),
                        this.animationSprite.update = function () {
                            var t = engine.memory.getExternalImage(e);
                            null != t && (o.animationSprite.update = function () { }
                                ,
                                o.animationSprite.spriteFrame = t,
                                null != i && (o.scaleX = i / o.getContentSize().width),
                                null != n && (o.scaleY = n / o.getContentSize().height))
                        }
                    ) : (this.animationSprite.spriteFrame = a,
                        null != i && (o.scaleX = i / o.getContentSize().width),
                        null != n && (o.scaleY = n / o.getContentSize().height))
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameGlobal: [function (e, t) {
        "use strict";
        cc._RF.push(t, "12d37ZPvOZDzp7kMvfn0GQJ", "GameGlobal");
        var i = e("FaceBookSDK");
        window.faceBookSDK = "FaceBookSDK",
            window.faceBookSDKTest = "FaceBookSDKTest",
            window.errorServerUrl = "https://sendsmgvt.9191youxi.com:8080/WordsGame_err",
            window.gameSDKName = faceBookSDK,
            window.gameSDK = null,
            window.gameVersions = "20210203_v1",
            window.engineGlobal = {
                gamelanguage: "english",
                languageStyle: 0,
                gameFrame: 50,
                playEffectMinTime: 300,
                loadSoundDic: new Object,
                gameWidth: 720,
                gameHeigh: 1280,
                offY: 0,
                offX: 0,
                viewGameWidth: 720,
                viewGameHeigh: 1280
            },
            window.UIzIndexInfo = {
                UIBgimgzIndex: -1,
                UIBottomzIndex: 1e3,
                UIMiddlezIndex: 2e3,
                UITopzIndex: 3e3,
                UIConfirmzIndex: 4e3,
                UIEffectIndex: 5e3,
                UIEffectIndex2: 5100,
                UINovicezIndex: 6e3,
                UIRewardIndex: 7e3,
                UILoadzIndex: 8e3
            },
            window.fightZIndexConfig = {
                conveyZIndex: 9e3,
                gridZIndex: 1e4,
                lineZIndex: 2e4,
                rockretAniZIndex: 21e3,
                parachuteZIndex: 25e3,
                scoreZIndex: 3e4
            },
            window.initGameSDK = function () {
                switch (ccLog(window.gameSDKName),
                window.gameSDKName) {
                    case faceBookSDKTest:
                    case faceBookSDK:
                        gameSDK = new i,
                            gameSDK.initialize()
                }
            }
            ,
            window.MyGameEvent = {
                SMALLGAME_GRID_CLEAR_ALL_SELECT: "SMALLGAME_GRID_CLEAR_ALL_SELECT",
                SMALLGAME_GRID_CLEAR_BY_UUID: "SMALLGAME_GRID_CLEAR_BY_UUID",
                SMALLGAME_ZUMA_MOVE_BACK: "SMALLGAME_ZUMA_MOVE_BACK",
                SMALLGAME_END: "SMALLGAME_END",
                SMALLGAME_END_CLEAR: "SMALLGAME_END_CLEAR",
                SMALLGAME_CHECK_NEXT: "SMALLGAME_CHECK_NEXT",
                SMALLGAME_QS_NEXT_LV: "SMALLGAME_QS_NEXT_LV",
                showGemFly: "showGemFly",
                init: function () {
                    this.scriptObj = new cc.Node,
                        this.init = function () { }
                },
                emit: function (e, t) {
                    this.init(),
                        this.scriptObj.emit(e, t)
                },
                on: function (e, t, i) {
                    this.init(),
                        this.scriptObj.on(e, t, i)
                },
                off: function (e, t, i) {
                    this.init(),
                        this.scriptObj.off(e, t, i)
                }
            },
            cc._RF.pop()
    }
        , {
        FaceBookSDK: "FaceBookSDK"
    }],
    GameGradeData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "9366dpRex9L+4U9MwTb8ztj", "GameGradeData"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    rewardObj: null
                },
                initialize: function (e) {
                    this.rewardObj = null == e ? {} : e
                },
                getRewardStateByID: function (e) {
                    if (null != this.rewardObj[e])
                        return rewardStateEm.already;
                    var t = getDicData(dataJson.grade_json, e);
                    return this.getCurGradeByScore() >= t.grade ? rewardStateEm.canReward : rewardStateEm.notCan
                },
                getGradePush: function () {
                    var e = !1;
                    for (var t in getDicData(dataJson.grade_json))
                        if (this.getRewardStateByID(t) == rewardStateEm.canReward) {
                            e = !0;
                            break
                        }
                    return e
                },
                gradeReward: function (e) {
                    this.rewardObj[e] = 1
                },
                getCurGradeByScore: function (e) {
                    var t = 0;
                    null == e && (e = heroData.bestScore);
                    var i = getDicData(dataJson.grade_json);
                    for (var n in i) {
                        var a = i[n];
                        if (e > a.score1 && (null == a.score2 || "" == a.score2 || e <= a.score2)) {
                            t = a.grade;
                            break
                        }
                    }
                    return t
                },
                getSaveData: function () {
                    return this.rewardObj
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameLanguageLabel: [function (e, t) {
        "use strict";
        cc._RF.push(t, "30fe3rxTvpKZ6bjdyYdeUrj", "GameLanguageLabel"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    dic: "language",
                    _key: "",
                    key: {
                        set: function (e) {
                            this._key = e,
                                this.refreshString()
                        },
                        get: function () {
                            return this._key
                        }
                    },
                    column: "content"
                },
                onDestroy: function () {
                    this.dic = null,
                        this.key = null,
                        this.column = null,
                        null != this.node && (this.node.setLanguageKey = null)
                },
                onLoad: function () {
                    this.node.setLanguageKey = function (e) {
                        this.getComponent("GameLanguageLabel").key = e
                    }
                        ,
                        this.refreshString()
                },
                refreshString: function () {
                    "undefined" != typeof engine && "" != this._key && (this.node.getComponent(cc.Label).string = engine.gameData.dataDic[this.dic][this._key][this.column])
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameLanguageSprite: [function (e, t) {
        "use strict";
        cc._RF.push(t, "f0568AcwDFIx4CBvbLcS9n7", "GameLanguageSprite"),
            window.LanguageStyleType = cc.Enum({
                English: 0,
                Hindi: 1,
                Indonisian: 2,
                Portuguese: 3,
                Thai: 4,
                Vietemnese: 5
            }),
            cc.Class({
                extends: cc.Component,
                properties: {
                    _language: 1,
                    _dataInfo: null,
                    _pngURL: null,
                    _pngX: 0,
                    _pngY: 0,
                    language: {
                        type: LanguageStyleType,
                        set: function (e) {
                            this._language = e,
                                this.refreshSprite()
                        },
                        get: function () {
                            return this.refreshSprite(),
                                this._language
                        }
                    },
                    pngURL: {
                        type: cc.SpriteFrame,
                        set: function (e) {
                            this._pngURL = e,
                                this.saveDataInfo(),
                                this.refreshSprite()
                        },
                        get: function () {
                            return this._pngURL
                        }
                    },
                    pngX: {
                        set: function (e) {
                            this._pngX = e,
                                this.saveDataInfo(),
                                this.refreshSprite()
                        },
                        get: function () {
                            return this._pngX
                        }
                    },
                    pngY: {
                        set: function (e) {
                            this._pngY = e,
                                this.saveDataInfo(),
                                this.refreshSprite()
                        },
                        get: function () {
                            return this._pngY
                        }
                    }
                },
                createLanguage: function () {
                    if (null == this._dataInfo)
                        for (var e in this._dataInfo = {},
                            LanguageStyleType)
                            this._dataInfo[LanguageStyleType[e]] = {};
                    null == this._dataInfo[this._language] && (this._dataInfo[this._language] = {})
                },
                onLoad: function () {
                    this._language = engineGlobal.languageStyle,
                        this.refreshSprite()
                },
                saveDataInfo: function () {
                    this.createLanguage(),
                        this._dataInfo[this._language].x = this._pngX,
                        this._dataInfo[this._language].y = this._pngY,
                        this._dataInfo[this._language].png = this._pngURL
                },
                refreshSprite: function () {
                    this.createLanguage();
                    var e = this._dataInfo[this._language];
                    if (null != e) {
                        var t = this.node.getComponent(cc.Sprite);
                        void 0 !== e.png && null != e.png && (t.spriteFrame = e.png,
                            this.node.width = t.spriteFrame.getOriginalSize().width,
                            this.node.height = t.spriteFrame.getOriginalSize().height,
                            this._pngURL = t.spriteFrame),
                            void 0 !== e.x && null != e.x && (this.node.x = e.x,
                                this._pngX = e.x),
                            void 0 !== e.y && null != e.y && (this.node.y = e.y,
                                this._pngY = e.y)
                    }
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameListLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "c0a9fi/aotG1LeAvBJuJ0qP", "GameListLayer"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    nodeUIList: null,
                    nodeDataList: null,
                    createUIFun: null,
                    keyNum: null,
                    borderPos1: null,
                    borderPos2: null,
                    initPoint: null,
                    curPoint: null,
                    isStop: null
                },
                onDestroy: function () {
                    this.nodeUIList = null,
                        this.nodeDataList = null,
                        this.createUIFun = null,
                        this.keyNum = null,
                        this.borderPos1 = null,
                        this.borderPos2 = null,
                        this.initPoint = null,
                        this.curPoint = null,
                        this.isStop = null
                },
                setData: function (e) {
                    this.nodeUIList = [],
                        this.nodeDataList = [],
                        this.initPoint = e.initPoint,
                        this.curPoint = null,
                        this.isStop = !1,
                        this.keyNum = 1e3,
                        this.borderPos1 = e.borderPos1,
                        this.borderPos2 = e.borderPos2;
                    for (var t = 0; t < e.nodeDatas.length; t++) {
                        var i = new Object;
                        i.data = e.nodeDatas[t],
                            i.dataKey = this.keyNum,
                            i.isAdd = !1,
                            this.nodeDataList.push(i),
                            this.keyNum++
                    }
                    this.createUIFun = e.createUIFun
                },
                refreshNodeData: function (e) {
                    var t = new Object;
                    t.data = e,
                        t.dataKey = this.keyNum,
                        t.isAdd = !1,
                        this.nodeDataList.push(t),
                        this.keyNum++
                },
                refreshBorder: function (e) {
                    this.borderPos1 = e.borderPos1,
                        this.borderPos2 = e.borderPos2,
                        this.refurbishUI()
                },
                updateView: function (e) {
                    1 != this.isStop && this.curPoint != e && (this.curPoint = e,
                        this.refurbishUI())
                },
                setStop: function (e) {
                    this.isStop = e
                },
                addNodeByIndex: function (e) {
                    var t = this.nodeDataList[e];
                    if (null != t) {
                        var i = this.curPoint + t.data.pos;
                        if (i <= this.borderPos1 && i >= this.borderPos2 && 0 == t.isAdd) {
                            t.isAdd = !0;
                            var n = this.createUIFun(t.data);
                            null != n && (n.dataKey = t.dataKey,
                                this.nodeUIList.push(n))
                        }
                        return !0
                    }
                    return !1
                },
                refurbishUI: function () {
                    for (var e = 0; e < this.nodeDataList.length; e++) {
                        var t = this.nodeDataList[e];
                        (n = this.curPoint + t.data.pos) <= this.borderPos1 && n >= this.borderPos2 && 0 == t.isAdd && (t.isAdd = !0,
                            null != (a = this.createUIFun(t.data)) && (a.dataKey = t.dataKey,
                                this.nodeUIList.push(a)))
                    }
                    for (var i = this.nodeUIList.length - 1; i >= 0; i--) {
                        var n, a = this.nodeUIList[i];
                        t = this.getNodeDataByDataKey(a.dataKey),
                            ((n = this.curPoint + t.data.pos) > this.borderPos1 || n < this.borderPos2) && (t.isAdd = !1,
                                a.destroy(),
                                this.nodeUIList.splice(i, 1))
                    }
                },
                clear: function () {
                    if (null != this.nodeUIList)
                        for (; this.nodeUIList.length > 0;)
                            this.nodeUIList.shift().destroy();
                    if (null != this.nodeDataList)
                        for (; this.nodeDataList.length > 0;) {
                            var e = this.nodeDataList.shift();
                            e.data = null,
                                e.dataKey = null,
                                e.isAdd = null
                        }
                    this.curPoint = this.initPoint
                },
                removeData: function (e) {
                    for (var t = this.nodeDataList.length - 1; t >= 0; t--)
                        if (this.nodeDataList[t].dataKey == e)
                            return void this.nodeDataList.splice(t, 1)
                },
                removeNodeUI: function (e) {
                    for (var t = this.nodeUIList.length - 1; t >= 0; t--)
                        if (this.nodeUIList[t].dataKey == e)
                            return void this.nodeUIList.splice(t, 1)
                },
                getNodeDataByDataKey: function (e) {
                    for (var t = 0; t < this.nodeDataList.length; t++)
                        if (this.nodeDataList[t].dataKey == e)
                            return this.nodeDataList[t];
                    return null
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameLoadCPU: [function (e, t) {
        "use strict";
        cc._RF.push(t, "475d2HorzVGH5YhM2E44lbE", "GameLoadCPU");
        var i = e("LoadControl")
            , n = e("GameCPU");
        cc.Class({
            extends: n,
            properties: {
                loadData: null
            },
            destroy: function () {
                this.loadData.resources = null,
                    this.loadData.completeCallbackFun = null,
                    this.loadData = null
            },
            initialize: function (e) {
                var t = this;
                this.loadData = new Object,
                    this.loadData.resources = e.data,
                    this.loadData.loadErrorMaxCount = e.loadErrorMaxCount,
                    this.loadData.completeCallbackFun = function () {
                        t.complete()
                    }
                    ,
                    this.loadData.loadErrorCallBackFun = function () {
                        t.failComplete()
                    }
            },
            run: function () {
                var e = new i;
                e.initialize(this.loadData),
                    e.loadRes()
            }
        }),
            cc._RF.pop()
    }
        , {
        GameCPU: "GameCPU",
        LoadControl: "LoadControl"
    }],
    GameLoadPrefabLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "2e239fuh9ZI8ohElfBk2Oc0", "GameLoadPrefabLayer"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    isInit: null,
                    callFun: null
                },
                onDestroy: function () {
                    this.isInit = null,
                        this.callFun = null
                },
                destroyNode: function () {
                    this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this),
                        this.node.destroy()
                },
                initialize: function (e) {
                    if (1 != this.isInit) {
                        this.isInit = !0,
                            this.callFun = e.callFun;
                        var t = e.curLoadPreConfig
                            , i = this.node.getChildByName("bgsp");
                        null != i && (i.y = t.bgY,
                            i.width = t.bgWidth,
                            i.height = t.bgHeight);
                        var n = this.node.getChildByName("closebtn");
                        null != n && (null != t.closeX ? (n.y = t.closeY,
                            n.x = t.closeX) : n.active = !1,
                            n.on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this));
                        var a = this.node.getChildByName("circleimg");
                        if (null != a) {
                            a.scale = t.circleScale;
                            var o = cc.rotateBy(2, 360);
                            o.repeatForever(),
                                a.y = t.circleY,
                                a.runAction(o)
                        }
                        var r = this.node.addComponent("GameLoadPrefab");
                        this.node.loadPrefabComplete = this.loadPrefabComplete.bind(this),
                            r.loadPrefab(t.loadPrefab)
                    }
                },
                loadPrefabComplete: function () {
                    null != this.callFun && this.callFun(),
                        this.destroyNode()
                },
                clickClosebtnFun: function () {
                    engine.gameSound.playEffect(soundurl.click),
                        this.destroyNode()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameLoadPrefab: [function (e, t) {
        "use strict";
        cc._RF.push(t, "e3a11ftLyRLf4myB3dbgVM8", "GameLoadPrefab"),
            e("GameCPUManagement"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    resArr: null,
                    isRunUpdate: null
                },
                onDestroy: function () {
                    this.resArr = null,
                        this.isRunUpdate = null
                },
                loadRes: function (e, t, i, n) {
                    null == i && (i = CPUExecuteOrder.otherType),
                        null == n && (n = LoadErrorMaxCountConfig.Prefab);
                    var a = [];
                    if (this.resArr = [],
                        null != t)
                        for (var o = 0; o < t.length; o++)
                            0 == engine.memory.isExistRes(t[o]) && ((r = {}).url = t[o],
                                r.restype = LoadStyleType.spriteAtlas,
                                a.push(r),
                                this.resArr.push(t[o]));
                    for (o = 0; o < e.length; o++) {
                        var r;
                        0 == engine.memory.isExistRes(e[o]) && ((r = {}).url = e[o],
                            r.restype = LoadStyleType.prefab,
                            a.push(r),
                            this.resArr.push(e[o]))
                    }
                    this.resArr.length < 0 ? (this.node.loadComplete(),
                        this.destroy()) : (engine.CPUM.addCPUInfo([{
                            type: CPUStyleType.loadType,
                            data: a,
                            executeOrder: i,
                            timeOrder: engine.gameTime.localTime,
                            loadErrorMaxCount: n
                        }]),
                            this.isRunUpdate = !0)
                },
                update: function () {
                    1 == this.isRunUpdate && 1 == this.isLoadComplete() && (this.node.loadComplete(),
                        this.destroy())
                },
                isLoadComplete: function () {
                    for (var e = 0; e < this.resArr.length; e++)
                        if (0 == engine.memory.isExistRes(this.resArr[e]))
                            return !1;
                    return !0
                }
            }),
            cc._RF.pop()
    }
        , {
        GameCPUManagement: "GameCPUManagement"
    }],
    GameLoadSpine: [function (e, t) {
        "use strict";
        cc._RF.push(t, "3ffa9tXf4NMk5vHnC9N5zDI", "GameLoadSpine"),
            e("GameCPUManagement"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    isInit: null,
                    spineUrlArr: null,
                    isRunUpdate: null
                },
                onDestroy: function () {
                    this.spineUrlArr = null
                },
                onLoad: function () {
                    this.initialize()
                },
                loadSpine: function (e, t, i) {
                    if (this.spineUrlArr = e,
                        null == t && (t = CPUExecuteOrder.otherType),
                        null == i && (i = LoadErrorMaxCountConfig.Spine),
                        1 == this.isLoadComplete())
                        this.node.loadComplete(),
                            this.destroy();
                    else {
                        for (var n = 0; n < this.spineUrlArr.length; n++)
                            0 == engine.memory.isExistRes(this.spineUrlArr[n]) && engine.CPUM.addCPUInfo([{
                                type: CPUStyleType.loadType,
                                data: [{
                                    url: this.spineUrlArr[n],
                                    restype: LoadStyleType.spine
                                }],
                                executeOrder: t,
                                timeOrder: engine.gameTime.localTime,
                                loadErrorMaxCount: i
                            }]);
                        this.isRunUpdate = !0
                    }
                },
                isLoadComplete: function () {
                    for (var e = 0; e < this.spineUrlArr.length; e++)
                        if (0 == engine.memory.isExistRes(this.spineUrlArr[e]))
                            return !1;
                    return !0
                },
                initialize: function () {
                    1 != this.isInit && (this.isInit = !0)
                },
                update: function () {
                    1 == this.isRunUpdate && 1 == this.isLoadComplete() && (this.node.loadComplete(),
                        this.destroy())
                }
            }),
            cc._RF.pop()
    }
        , {
        GameCPUManagement: "GameCPUManagement"
    }],
    GameLoadSprite: [function (e, t) {
        "use strict";
        cc._RF.push(t, "ab649QQvUxNJqynbgE6mp9g", "GameLoadSprite"),
            e("GameCPUManagement"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    isInit: null,
                    spriteAtlas: null,
                    pngName: null,
                    isRunUpdate: null
                },
                onDestroy: function () {
                    this.spriteAtlas = null,
                        this.pngName = null,
                        this.isRunUpdate = null
                },
                onLoad: function () {
                    this.initialize()
                },
                loadPng: function (e, t, i, n, a) {
                    this.spriteAtlas = e,
                        this.pngName = t,
                        null == n && (n = CPUExecuteOrder.otherType),
                        null == a && (a = LoadErrorMaxCountConfig.Sprite),
                        0 == engine.memory.isExistRes(e) ? (0 != i && engine.CPUM.addCPUInfo([{
                            type: CPUStyleType.loadType,
                            data: [{
                                url: e,
                                restype: LoadStyleType.spriteAtlas
                            }],
                            executeOrder: n,
                            timeOrder: engine.gameTime.localTime,
                            loadErrorMaxCount: a
                        }]),
                            this.isRunUpdate = !0) : (this.node.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(this.spriteAtlas, this.pngName),
                                this.destroy())
                },
                initialize: function () {
                    1 != this.isInit && (this.isInit = !0)
                },
                update: function () {
                    1 == this.isRunUpdate && 1 == engine.memory.isExistRes(this.spriteAtlas) && (this.node.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(this.spriteAtlas, this.pngName),
                        this.destroy())
                }
            }),
            cc._RF.pop()
    }
        , {
        GameCPUManagement: "GameCPUManagement"
    }],
    GameLoadTexture: [function (e, t) {
        "use strict";
        cc._RF.push(t, "cea3f697xpJEIY93hjxQdGj", "GameLoadTexture"),
            e("GameBackgroundLoad"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    isInit: null,
                    url: null,
                    isRunUpdate: null
                },
                onDestroy: function () {
                    this.url = null,
                        this.isRunUpdate = null
                },
                onLoad: function () { },
                loadPng: function (e) {
                    this.url = e,
                        !1 === engine.memory.isExistRes(this.url, !0) ? (engine.gameBackgroundLoad.addLoadRes([{
                            url: this.url,
                            restype: LoadStyleType.texture
                        }]),
                            this.isRunUpdate = !0) : this.callback ? this.callback(engine.memory.getTexture(this.url, !0)) : this.node.getComponent(cc.Sprite).spriteFrame = engine.memory.getTexture(this.url)
                },
                initialize: function (e, t) {
                    1 != this.isInit && (this.isInit = !0,
                        this.callback = t,
                        "string" == typeof e && this.loadPng(e))
                },
                update: function () {
                    1 == this.isRunUpdate && 1 == engine.memory.isExistRes(this.url, !0) && (this.callback ? this.callback(engine.memory.getTexture(this.url, !0)) : this.node.getComponent(cc.Sprite).spriteFrame = engine.memory.getTexture(this.url),
                        this.destroy())
                }
            }),
            cc._RF.pop()
    }
        , {
        GameBackgroundLoad: "GameBackgroundLoad"
    }],
    GameLoadUI: [function (e, t) {
        "use strict";
        cc._RF.push(t, "c4c93H70JVFwJ9phyKBLW9C", "GameLoadUI"),
            e("GameLoadSpine");
        var i = e("LoadControl");
        cc.Class({
            extends: cc.Component,
            properties: {
                loadUI: null,
                progress: null,
                proTxt: null,
                effectN: null,
                isAddLoad: null,
                createComplete: null
            },
            onDestroy: function () {
                this.loadUI = null,
                    this.progress = null,
                    this.proTxt = null,
                    this.effectN = null,
                    this.isAddLoad = null,
                    this.createComplete = null
            },
            onLoad: function () {
                this.isAddLoad = !1,
                    this.startLoadRes()
            },
            startLoadRes: function () {
                var e = new i
                    , t = new Object;
                t.resources = [],
                    t.setLoadPercent = function () { }
                    ,
                    t.completeCallbackFun = function () { }
                    ,
                    t.loadErrorMaxCount = 100,
                    e.initialize(t),
                    e.loadRes()
            },
            update: function () {
                this.isAddLoad
            },
            creatLoadUI: function () { },
            destroyClass: function () {
                null != this.node && null != this.loadUI && this.loadUI.destroy()
            },
            setLoadPercent: function () { }
        }),
            cc._RF.pop()
    }
        , {
        GameLoadSpine: "GameLoadSpine",
        LoadControl: "LoadControl"
    }],
    GameLog: [function (e, t) {
        "use strict";
        cc._RF.push(t, "eaabca+x2VK+qUTmbjdO/S3", "GameLog"),
            cc.Class({
                properties: {
                    isInit: null,
                    bugLimitCount: null
                },
                initialize: function () {
                    if (1 != this.isInit) {
                        this.bugLimitCount = 0;
                        var e = this;
                        window.onerror = function (t, i, n, a, o) {
                            if (null != o && null != o.stack && e.bugLimitCount <= 5) {
                                e.bugLimitCount++;
                                var r = o.stack.toString();
                                switch (gameSDKName) {
                                    case faceBookSDKTest:
                                        e.bugInfoHttp(r)
                                }
                            }
                        }
                    }
                },
                bugInfoHttp: function (e) {
                    if (!(e.indexOf("_assembler") > 0)) {
                        var t = new Date
                            , i = t.getFullYear() + "." + (t.getMonth() + 1) + "." + t.getDate()
                            , n = new Object
                            , a = "0";
                        "undefined" != typeof gameSDK && null != gameSDK && null != gameSDK.sdkPlayInfo && null != gameSDK.sdkPlayInfo.playerID && (a = gameSDK.sdkPlayInfo.playerID),
                            n.playerid = a,
                            n.emsg = (" \u7248\u672c\u53f7\uff1a" + gameVersions).replace(/\|/g, " "),
                            n.date = i,
                            n.emsg2 = e.replace(/\|/g, " ");
                        var o = errorServerUrl + "?opcode=90001";
                        ccLog(o);
                        var r = JSON.stringify(n)
                            , s = new XMLHttpRequest;
                        s.open("POST", o),
                            s.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"),
                            s.send(r),
                            ccLog("\u53d1\u9001\u7ed9\u670d\u52a1\u5668\u9519\u8bef\u4fe1\u606f\uff1a" + r)
                    }
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameMemoryManagement: [function (e, t) {
        "use strict";
        cc._RF.push(t, "216d76lZ4tOC7sRH/nkGJy8", "GameMemoryManagement"),
            cc.Class({
                properties: {
                    isInit: null,
                    spriteAtlassDic: null,
                    spriteFrameDic: null,
                    prefabDic: null,
                    jsonDic: null,
                    spineDic: null,
                    fontDic: null,
                    textureDic: null,
                    externalImageDic: null,
                    particleDic: null,
                    soundDic: null,
                    txtDic: null,
                    deleteKeyDic: null
                },
                initialize: function () {
                    1 != this.isInit && (this.isInit = !0,
                        this.spriteFrameDic = new Object,
                        this.spriteAtlassDic = new Object,
                        this.particleDic = new Object,
                        this.externalImageDic = new Object,
                        this.prefabDic = new Object,
                        this.jsonDic = new Object,
                        this.spineDic = new Object,
                        this.textureDic = new Object,
                        this.fntDic = new Object,
                        this.soundDic = new Object,
                        this.txtDic = new Object,
                        this.deleteKeyDic = new Object)
                },
                addExternalImage: function (e, t) {
                    this.externalImageDic[e] = t
                },
                getExternalImage: function (e) {
                    return this.externalImageDic[e]
                },
                addTexture: function (e, t) {
                    this.textureDic[e] = new cc.SpriteFrame(t)
                },
                getTexture: function (e, t) {
                    return t ? cc.resources.get(e, cc.Texture2D) : new cc.SpriteFrame(cc.resources.get(e, cc.Texture2D))
                },
                addPrefabDic: function (e, t) {
                    this.prefabDic[e] = t
                },
                getPrefab: function (e) {
                    var t = this.prefabDic[e];
                    return null == t ? (ccLog("\u9884\u5236\u4ef6\uff1a" + e + "\u6ca1\u6709\u88ab\u52a0\u8f7d\uff01"),
                        null) : cc.instantiate(t)
                },
                addSoundDic: function (e, t) {
                    this.soundDic[e] = t
                },
                getSound: function (e) {
                    return this.soundDic[e]
                },
                addFont: function (e, t) {
                    this.fntDic[e] = t
                },
                getFont: function (e) {
                    return this.fntDic[e]
                },
                addSpine: function (e, t) {
                    this.spineDic[e] = t
                },
                getSpine: function (e) {
                    var t = this.spineDic[e];
                    return null == t ? (ccLog("spine\uff1a" + e + "\u6ca1\u6709\u88ab\u52a0\u8f7d\uff01"),
                        null) : t
                },
                addSpriteAtlasDic: function (e, t) {
                    if (null == this.spriteFrameDic[e]) {
                        this.spriteAtlassDic[e] = t,
                            this.spriteFrameDic[e] = new Object;
                        for (var i = t.getSpriteFrames(), n = 0; n < i.length; n++)
                            this.spriteFrameDic[e][i[n].name] = i[n]
                    }
                },
                getSpriteAtlas: function (e) {
                    return this.spriteAtlassDic[e]
                },
                getSpriteFrame: function (e, t) {
                    var i = this.spriteFrameDic[e];
                    if (null != i) {
                        var n = i[t];
                        return null == n && ccLog("\u56fe\u7247\u540d\u5b57" + t + "\u4e0d\u5bf9\uff01"),
                            n
                    }
                    return ccLog("\u56fe\u7247\u540d\u5b57" + t),
                        ccLog("\u5408\u56fe\u6587\u4ef6" + e + "\u6ca1\u6709\u88ab\u52a0\u8f7d\uff01"),
                        null
                },
                addparticleDic: function (e, t) {
                    null == this.particleDic[e] && (this.particleDic[e] = t)
                },
                getParticle: function (e) {
                    var t = this.particleDic[e];
                    return null == t ? (ccLog("particle\uff1a" + e + "\u6ca1\u6709\u88ab\u52a0\u8f7d\uff01"),
                        null) : t
                },
                addJsonDic: function (e, t) {
                    null != t && (this.jsonDic[e] = t.json)
                },
                getJsonDic: function (e) {
                    var t = this.jsonDic[e];
                    return null != t && (this.jsonDic[e] = t),
                        t
                },
                addTextAssetDic: function (e, t) {
                    null != t && (this.txtDic[e] = t)
                },
                getTextAssetDic: function (e) {
                    var t = this.txtDic[e];
                    return null != t && (this.txtDic[e] = t),
                        t
                },
                isExistRes: function (e, t) {
                    return 1 == t ? null != cc.resources.get(e, cc.Texture2D) : null != this.prefabDic[e] || null != this.spriteAtlassDic[e] || null != this.jsonDic[e] || null != this.spineDic[e] || null != this.fntDic[e] || null != this.textureDic[e] || null != this.soundDic[e] || null != this.particleDic[e] || null != this.txtDic[e]
                },
                cleanManagement: function () { }
            }),
            cc._RF.pop()
    }
        , {}],
    GameMove: [function (e, t) {
        "use strict";
        cc._RF.push(t, "075f8ydvoVIUKc+rSEPMMjq", "GameMove"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    toX: null,
                    toY: null,
                    speedDic: null,
                    isInit: null,
                    endPos: null,
                    moveComplete: null
                },
                onDestroy: function () {
                    this.toX = null,
                        this.toY = null,
                        this.speedDic = null,
                        this.isInit = null,
                        this.endPos = null,
                        this.moveComplete = null
                },
                initialize: function (e) {
                    this.endPos = cc.v2(e.toX, e.toY),
                        this.toX = e.toX,
                        this.toY = e.toY,
                        this.speedDic = e.speedDic,
                        this.isInit = !0
                },
                update: function () {
                    if (0 != this.isInit) {
                        var e = this.endPos.sub(this.node.position).mag();
                        e <= this.speedDic ? (this.node.x = this.toX,
                            this.node.y = this.toY,
                            null != this.moveComplete && (this.moveComplete(),
                                this.destroy())) : (this.node.x = this.node.x + this.speedDic / e * (this.toX - this.node.x),
                                    this.node.y = this.node.y + this.speedDic / e * (this.toY - this.node.y))
                    }
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameOverLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "f6e5ayRNZlGJ4XJ0UCQVddb", "GameOverLayer"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                onDestroy: function () { },
                destroyClass: function () {
                    null != this.node && this.node.destroy()
                },
                initialize: function () {
                    engine.gameSound.playEffect(soundurl.gameover),
                        heroData.bestScore < fightControl.curScore && (heroData.bestScore = fightControl.curScore),
                        gameSDK.leaderboard.setScoreAsync(heroData.bestScore),
                        heroData.totalScore = fightControl.curScore,
                        null != heroData.gameConfig && (heroData.gameConfig = null),
                        heroData.dailyTaskData.addTaskPro(dailyTaskTypeEm.gameTime),
                        heroData.dailyTaskData.addTaskPro(dailyTaskTypeEm.getSort, fightControl.addScore),
                        fightControl.addScore = 0,
                        heroData.achievementData.addProgress(achievementTypeEm.maxScore, fightControl.curScore),
                        heroData.saveData();
                    var e = this.node.getChildByName("overnode");
                    e.opacity = 0;
                    var t = cc.spawn(cc.fadeIn(.4), cc.moveBy(.4, 0, -88))
                        , i = this;
                    e.runAction(cc.sequence(t, cc.moveBy(.3, 0, 29), cc.moveBy(.3, 0, -7), cc.delayTime(.5), cc.callFunc(function () {
                        i.actionEnd()
                    })))
                },
                actionEnd: function () {
                    heroData.gradeData.getCurGradeByScore() > fightControl.lastGrade ? openWindowLayer(openTypeEm.gradeUpUI) : isHaveSurpassLayer(),
                        this.destroyClass()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameRankData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "fff03PDuxZJZr4xsmeCNzx9", "GameRankData"),
            window.rankTypeEm = cc.Enum({
                globalRank: 1,
                friendRank: 2,
                nearbyRank: 3,
                mySelfRank: 4
            }),
            cc.Class({
                properties: {
                    nearbyRankData: null,
                    globalRankData: null,
                    friendRankData: null,
                    mySelfRankData: null,
                    newRankData: null
                },
                initialize: function () {
                    this.initialize = function () { }
                        ,
                        this.nearbyRankData = [],
                        this.globalRankData = [],
                        this.friendRankData = [],
                        this.mySelfRankData = [],
                        this.newRankData = []
                },
                getNewRankData: function () {
                    var e = this;
                    gameSDK.leaderboard.getRankData(function (t) {
                        e.newRankData = t
                    })
                },
                async_getRankData: function (e, t, i) {
                    var n;
                    switch (i && this._setRankData(e, []),
                    e) {
                        case rankTypeEm.globalRank:
                            this.globalRankData.length > 0 ? n = this.globalRankData : this._loadGlobalRankDataBySDK(t);
                            break;
                        case rankTypeEm.friendRank:
                            this.friendRankData.length > 0 ? n = this.friendRankData : this._loadFriendRankDataBySDK(t);
                            break;
                        case rankTypeEm.nearbyRank:
                            this.nearbyRankData.length > 0 ? n = this.nearbyRankData : this._loadNearbyRankDataBySDK(t);
                            break;
                        case rankTypeEm.mySelfRank:
                            this.mySelfRankData.length > 0 ? n = this.mySelfRankData[0] : this._mySelfRankDataBySDK(t)
                    }
                    t && n && t(n)
                },
                _loadGlobalRankDataBySDK: function (e) {
                    var t = this;
                    ccLog("get global rank"),
                        gameSDK.leaderboard.getEntriesAsyncInfo(fbRankName, [{
                            count: 50,
                            beginNum: 0
                        }], function (i) {
                            t._setRankData(rankTypeEm.globalRank, i),
                                e && e(i)
                        })
                },
                _loadFriendRankDataBySDK: function (e) {
                    var t = this;
                    ccLog("get friend rank"),
                        gameSDK.leaderboard.getConnectedPlayerEntriesAsync(fbRankName, 100, 0, function (i) {
                            t._setRankData(rankTypeEm.friendRank, i),
                                e && e(i)
                        })
                },
                _loadNearbyRankDataBySDK: function (e) {
                    var t = this;
                    gameSDK.leaderboard.getPlayerEntryAsync(fbRankName, function (i) {
                        var n;
                        null != i && (n = 1 == i.rank ? 0 : i.rank - 2,
                            gameSDK.leaderboard.getEntriesAsyncInfo(fbRankName, [{
                                count: 50,
                                beginNum: n
                            }], function (i) {
                                t._setRankData(rankTypeEm.nearbyRank, i),
                                    e && e(i)
                            }))
                    })
                },
                _mySelfRankDataBySDK: function (e) {
                    var t = this;
                    gameSDK.leaderboard.getPlayerEntryAsync(fbRankName, function (i) {
                        t._setRankData(rankTypeEm.mySelfRank, [i]),
                            e && e(i)
                    })
                },
                _setRankData: function (e, t) {
                    switch (e) {
                        case rankTypeEm.globalRank:
                            this.globalRankData = t;
                            break;
                        case rankTypeEm.friendRank:
                            this.friendRankData = t;
                            break;
                        case rankTypeEm.nearbyRank:
                            this.nearbyRankData = t;
                            break;
                        case rankTypeEm.mySelfRank:
                            this.mySelfRankData = t
                    }
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameRankLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "c9696jzlbZNDLE/V2/7dEGS", "GameRankLayer");
        var i = e("GameListLayer")
            , n = e("GameExternalImage");
        window.rankPageEm = cc.Enum({
            world: 0,
            friend: 1
        }),
            cc.Class({
                extends: i,
                properties: {
                    curIndex: null,
                    curData: null,
                    moveLayer: null,
                    curWorldData: null,
                    curFriendData: null,
                    myWorldData: null,
                    isShowMy: null,
                    isShowRank: null
                },
                onDestroy: function () {
                    this.removeDataEvent(),
                        this.curIndex = null,
                        this.curData = null,
                        this.moveLayer = null,
                        this.curWorldData = null,
                        this.curFriendData = null,
                        this.myWorldData = null,
                        this.isShowMy = null,
                        this.isShowRank = null
                },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                addDataEvent: function () { },
                removeDataEvent: function () { },
                addEvent: function () {
                    for (var e = 0; e < 2; ++e)
                        this.node.getChildByName("page_" + e).on(cc.Node.EventType.TOUCH_END, this.clickPageBtn, this);
                    this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this),
                        this.node.getChildByName("invitebtn").on(cc.Node.EventType.TOUCH_END, this.clickInviteBtn, this)
                },
                removeEvent: function () {
                    for (var e = 0; e < 2; ++e)
                        this.node.getChildByName("page_" + e).off(cc.Node.EventType.TOUCH_END, this.clickPageBtn, this);
                    this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this),
                        this.node.getChildByName("invitebtn").off(cc.Node.EventType.TOUCH_END, this.clickInviteBtn, this)
                },
                initialize: function () {
                    this.isShowMy = !1,
                        this.isShowRank = !1,
                        this.curIndex = rankPageEm.world,
                        this.moveLayer = this.node.getChildByName("scr").getComponent(cc.ScrollView).content,
                        this.addEvent(),
                        this.addDataEvent(),
                        this.refreshView(),
                        this.clearMyShow();
                    var e = this;
                    gameSDK.leaderboard.getRankData(function (t) {
                        e.refreshRankInfo(t),
                            e.showMyInfo(t)
                    })
                },
                refreshView: function () {
                    this.refreshBtnInfo()
                },
                clearMyShow: function () {
                    this.node.getChildByName("self").active = !1
                },
                refreshBtnInfo: function () { },
                refreshRankInfo: function (e) {
                    this.clear(),
                        this.curData = [];
                    for (var t = 1, i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.rank = t,
                            this.curData.push(n),
                            t++
                    }
                    for (i = 0; i < this.curData.length; i++)
                        this.curData[i].pos = -61 - 135 * i;
                    this.moveLayer.y = 0,
                        this.moveLayer.height = 135 * this.curData.length + 20;
                    var a = this
                        , o = new Object;
                    o.initPoint = 0,
                        o.borderPos1 = 65,
                        o.borderPos2 = -790,
                        o.nodeDatas = this.curData,
                        o.createUIFun = function (e) {
                            var t = engine.memory.getPrefab(nextLoadPrefab.rank_node_prefab);
                            return t.addComponent("GameRankNode").initialize(e, this),
                                t.y = e.pos,
                                a.moveLayer.addChild(t),
                                t
                        }
                        ,
                        this.setData(o)
                },
                update: function () {
                    null != this.curData && this.curData.length > 0 && this.updateView(this.moveLayer.y)
                },
                showMyInfo: function (e) {
                    for (var t = null, i = 0; i < e.length; i++) {
                        var a = e[i];
                        if (a.playerID == gameSDK.sdkPlayInfo.playerID) {
                            t = a;
                            break
                        }
                    }
                    if (null != t) {
                        this.isShowMy = !0;
                        var o = this.node.getChildByName("self");
                        o.active = !0;
                        var r = o.getChildByName("rankimg")
                            , s = o.getChildByName("ranknum");
                        t.rank <= 3 ? (s.active = !1,
                            r.active = !0,
                            r.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "rank_" + t.rank)) : (s.active = !0,
                                r.active = !1,
                                s.getComponent(cc.Label).string = t.rank);
                        var c = o.getChildByName("headbg")
                            , l = new n;
                        l.loadImage(t.photo, null, c.getContentSize().width - 6, c.getContentSize().height - 6),
                            c.addChild(l, -1),
                            o.getChildByName("name").getComponent(cc.Label).string = t.name,
                            o.getChildByName("score").getComponent("GameArtWord").setString("" + t.score)
                    }
                },
                clickPageBtn: function (e) {
                    var t = parseInt(e.target.name.split("_")[1]);
                    t != this.curIndex && (this.isShowMy = !1,
                        this.isShowRank = !1,
                        this.curData = [],
                        this.clearMyShow(),
                        this.clear(),
                        this.curIndex = t,
                        this.refreshView())
                },
                clickInviteBtn: function () {
                    gameSDK.faceBookUpdateAsync.sendFaceBookFriend(getSendFriendData())
                },
                clickCloseBtn: function () {
                    this.destroyClass()
                }
            }),
            cc._RF.pop()
    }
        , {
        GameExternalImage: "GameExternalImage",
        GameListLayer: "GameListLayer"
    }],
    GameRankNode: [function (e, t) {
        "use strict";
        cc._RF.push(t, "c1bd6KAemBPvrxU/YW5ahWL", "GameRankNode");
        var i = e("GameExternalImage");
        cc.Class({
            extends: cc.Component,
            properties: {},
            onDestroy: function () { },
            destroyClass: function () {
                this.removeEvent(),
                    this.node.destroy()
            },
            initialize: function (e) {
                this.addEvent(),
                    this.initUI(e)
            },
            addEvent: function () { },
            removeEvent: function () { },
            initUI: function (e) {
                var t = this.node.getChildByName("rankimg")
                    , n = this.node.getChildByName("ranknum");
                e.rank <= 3 ? (n.active = !1,
                    t.active = !0,
                    t.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "rank_" + e.rank)) : (n.active = !0,
                        t.active = !1,
                        n.getComponent(cc.Label).string = e.rank);
                var a = this.node.getChildByName("headbg")
                    , o = new i;
                o.loadImage(e.photo, null, a.getContentSize().width - 6, a.getContentSize().height - 6),
                    a.addChild(o, -1),
                    this.node.getChildByName("name").getComponent(cc.Label).string = myGameGetShortName(e.name),
                    this.node.getChildByName("score").getComponent("GameArtWord").setString("" + e.score)
            }
        }),
            cc._RF.pop()
    }
        , {
        GameExternalImage: "GameExternalImage"
    }],
    GameScene: [function (e, t) {
        "use strict";
        cc._RF.push(t, "0829aYj3k9MmZgxQw+Ghy5W", "GameScene");
        var i = e("LoadControl");
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function (e) {
                var t = this;
                this.node.addTipsWindow = function (e) {
                    t.addTipsWindow(e)
                }
                    ,
                    this.node.showReward = function (e) {
                        t.showReward(e)
                    }
                    ,
                    ccLog(".....\u8fdb\u5165\u573a\u666fonLoad...."),
                    this.loadRes(e)
            },
            start: function () {
                ccLog(".....\u8fdb\u5165\u573a\u666fstart....")
            },
            loadRes: function (e) {
                var t = this
                    , n = new i
                    , a = new Object;
                a.resources = this.getRes(),
                    a.setLoadPercent = function (e) {
                        t.setLoadPercent(e)
                    }
                    ,
                    a.analysisFun = function () {
                        t.analysis()
                    }
                    ,
                    a.completeCallbackFun = function () {
                        t.loadComplete()
                    }
                    ,
                    a.loadErrorCallBackFun = function () { }
                    ,
                    null != e && (null != e.minPercent && (a.minPercent = e.minPercent),
                        null != e.maxPercent && (a.maxPercent = e.maxPercent)),
                    n.initialize(a),
                    n.loadRes()
            },
            initialize: function () {
                ccLog(".....\u8fdb\u5165\u573a\u666finitialize...."),
                    sceneControl.curSceneType != SceneType.login && this.addSceneMaskLayer(),
                    engine.CPUM.openCPU();
                var e = this;
                this.node.addTips = function (t) {
                    e.addTips(t)
                }
                    ,
                    this.node.addNewbieLayer = function (t) {
                        e.addNewbieLayer(t)
                    }
                    ,
                    this.node.removeNewbieLayer = function (t) {
                        e.removeNewbieLayer(t)
                    }
            },
            onDestroy: function () {
                null != this.node && null != this.node.addTips && (this.node.addTips = null),
                    null != this.node && null != this.node.addTipsWindow && (this.node.addTipsWindow = null),
                    null != this.node && (this.node.resLoadComplete = null)
            },
            loadComplete: function () {
                null != this.node && (this.node.resLoadComplete = !0)
            },
            getRes: function () {
                return []
            },
            analysis: function () { },
            setLoadPercent: function () { },
            addSceneMaskLayer: function () { },
            addTipsWindow: function (e) {
                if (null == this.node.getChildByName("tipsWindowNode")) {
                    var t = new Object;
                    t.str = e.str,
                        t.callFun = function () {
                            null != e.callFunc && e.callFunc()
                        }
                }
            },
            addTips: function () { },
            removeNewbieLayer: function () { },
            addNewbieLayer: function () {
                this.removeNewbieLayer()
            },
            showReward: function (e) {
                for (var t = 0; t < e.length; t++)
                    this.addReward(e[t], t)
            },
            addReward: function (e, t) {
                var i = new cc.Node;
                i.addComponent(cc.Sprite).spriteFrame = getItemSpriteFrame(e.id),
                    i.scale = this.getRewardScale(e),
                    i.opacity = 0;
                var n = new cc.Node;
                n.anchorX = 0,
                    n.scale = 2;
                var a = n.addComponent(cc.Label);
                a.string = "+" + e.num,
                    a.font = engine.memory.getFont(needLoadFont.fntttf1_font),
                    a.fontSize = 45,
                    a.horizontalAlign = cc.Label.HorizontalAlign.LEFT,
                    a.verticalAlign = cc.Label.VerticalAlign.CENTER;
                var o = n.addComponent(cc.LabelOutline);
                o.width = 2.5,
                    o.color = cc.Color.BLACK,
                    n.x = 136,
                    i.addChild(n);
                var r = engine.gameAdapterInfo.getPercentageX(.5) - 50
                    , s = engine.gameAdapterInfo.getPercentageY(.5) + 80;
                engine.gameAdapterInfo.addSceneNode(i, r, s, UIzIndexInfo.UIRewardIndex);
                var c = cc.spawn(cc.moveBy(.4, 0, 100), cc.fadeOut(.4));
                i.runAction(cc.sequence(cc.delayTime(.4 * t), cc.fadeIn(.01), cc.moveBy(.8, 0, 200), c, cc.removeSelf()))
            },
            getRewardScale: function (e) {
                var t = 1;
                switch (e.id) {
                    case itemIDConfig.starBox:
                        t = .6;
                        break;
                    default:
                        t = .4
                }
                return t
            },
            update: function () { }
        }),
            cc._RF.pop()
    }
        , {
        LoadControl: "LoadControl"
    }],
    GameSoundButton: [function (e, t) {
        "use strict";
        cc._RF.push(t, "8225d9PnTZOJbX7Y6ncL9e9", "GameSoundButton"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    _soundBtn: null,
                    _btnSpriteUrl: null,
                    btnSpriteUrl: {
                        type: cc.SpriteFrame,
                        set: function (e) {
                            this.refreshBtnTexture(e)
                        },
                        get: function () {
                            return this._btnSpriteUrl
                        }
                    },
                    _soundIconSp: null,
                    _closeSpriteUrl: null,
                    closeSpriteUrl: {
                        type: cc.SpriteFrame,
                        set: function (e) {
                            this.refreshSoundTexture(e, 1)
                        },
                        get: function () {
                            return this._closeSpriteUrl
                        }
                    },
                    _openSpriteUrl: null,
                    openSpriteUrl: {
                        type: cc.SpriteFrame,
                        set: function (e) {
                            this.refreshSoundTexture(e, 0)
                        },
                        get: function () {
                            return this._openSpriteUrl
                        }
                    },
                    _isInit: null
                },
                onLoad: function () {
                    this.initialize()
                },
                onDestroy: function () {
                    this._soundBtn.off(cc.Node.EventType.TOUCH_END, this.clickSoundBtnFun, this),
                        this._soundBtn = null,
                        this._btnSpriteUrl = null,
                        this._soundIconSp = null,
                        this._closeSpriteUrl = null,
                        this._openSpriteUrl = null,
                        this._curSoundType = null,
                        this._isInit = null
                },
                initialize: function () {
                    1 != this._isInit && (this._isInit = !0,
                        this.createBtn(),
                        this.createSoundIcon(),
                        this.iconChangeTexture(engine.gameSound.stopSound))
                },
                createBtn: function () {
                    if (null == this._soundBtn) {
                        this._soundBtn = new cc.Node,
                            this._soundBtn.addComponent(cc.Sprite);
                        var e = this._soundBtn.addComponent(cc.Button);
                        e.transition = cc.Button.Transition.SCALE,
                            e.zoomScale = .9,
                            this.node.addChild(this._soundBtn)
                    }
                    this._soundBtn.on(cc.Node.EventType.TOUCH_END, this.clickSoundBtnFun, this)
                },
                clickSoundBtnFun: function () {
                    1 == engine.gameSound.stopSound ? engine.gameSound.openMusic() : engine.gameSound.stopMusic(),
                        "undefined" != typeof changeMusic && null != changeMusic && changeMusic(),
                        this.iconChangeTexture(engine.gameSound.stopSound)
                },
                createSoundIcon: function () {
                    null == this._soundIconSp && (this._soundIconSp = new cc.Node,
                        this._soundIconSp.addComponent(cc.Sprite),
                        this._soundBtn.addChild(this._soundIconSp))
                },
                refreshBtnTexture: function (e) {
                    this._btnSpriteUrl = e,
                        this.createBtn(),
                        this._soundBtn.getComponent(cc.Sprite).spriteFrame = this._btnSpriteUrl
                },
                iconChangeTexture: function (e) {
                    this._soundIconSp.getComponent(cc.Sprite).spriteFrame = 1 == e ? this._closeSpriteUrl : this._openSpriteUrl
                },
                refreshSoundTexture: function (e, t) {
                    null != this._soundIconSp && (this._soundIconSp.destroy(),
                        this._soundIconSp = null),
                        1 == t ? this._closeSpriteUrl = e : this._openSpriteUrl = e,
                        this.createBtn(),
                        this.createSoundIcon(),
                        this.iconChangeTexture(t)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameSoundLoad: [function (e, t) {
        "use strict";
        cc._RF.push(t, "39d59sv/SRKu5h8OcJV5ZYm", "GameSoundLoad"),
            window.loadSoundDic = new Object,
            cc.Class({
                properties: {
                    url: null,
                    playSound: null
                },
                loadEffectSound: function (e) {
                    null == loadSoundDic[e] && (loadSoundDic[e] = !0,
                        cc.resources.load(e, cc.AudioClip, function (t, i) {
                            null != i && i instanceof cc.AudioClip && engine.memory.addSoundDic(e, i)
                        }))
                },
                loadBackgroundSound: function (e) {
                    var t = this;
                    this.url = e,
                        null == loadSoundDic[e] && (loadSoundDic[e] = new Object,
                            loadSoundDic[e].loadCount = 1,
                            loadSoundDic[e].isNowLoad = !1),
                        loadSoundDic[e].loadCount >= 5 || 0 == loadSoundDic[e].isNowLoad && (loadSoundDic[e].isNowLoad = !0,
                            loadSoundDic[e].loadCount++,
                            cc.resources.load(e, cc.AudioClip, function (i, n) {
                                loadSoundDic[e].isNowLoad = !1,
                                    null != n && n instanceof cc.AudioClip && engine.memory.addSoundDic(e, n),
                                    null != t.playSound && (t.playSound(t.url),
                                        t.playSound = null)
                            }))
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameSound: [function (e, t) {
        "use strict";
        cc._RF.push(t, "44be7DXRgVDU7yA86scaIhh", "GameSound");
        var i = e("GameSoundLoad");
        cc.Class({
            properties: {
                isInit: null,
                soundVolume: null,
                backgroundSoundVolume: null,
                effectSoundVolume: null,
                stopSound: null,
                stopBackgroundSound: null,
                stopEffectSound: null,
                playBackgroundSoundUrl: null,
                lastTimeDic: null,
                loadSoundDic: null
            },
            initialize: function () {
                1 != this.isInit && (this.isInit = !0,
                    this.soundVolume = 1,
                    this.backgroundSoundVolume = 1,
                    this.effectSoundVolume = 1,
                    this.stopBackgroundSound = 0,
                    this.stopEffectSound = 0,
                    this.stopSound = 0,
                    this.playBackgroundSoundUrl = "",
                    this.lastTimeDic = new Object,
                    this.loadSoundDic = new Object)
            },
            stopBackgroundMusic: function () {
                this.stopBackgroundSound = 1,
                    cc.audioEngine.setMusicVolume(0)
            },
            openBackgroundMusic: function () {
                this.stopBackgroundSound = 0,
                    cc.audioEngine.setMusicVolume(this.backgroundSoundVolume)
            },
            changeBackgroundMusicState: function () {
                1 == this.stopBackgroundSound ? this.openBackgroundMusic() : this.stopBackgroundMusic()
            },
            stopEffectMusic: function () {
                this.stopEffectSound = 1,
                    cc.audioEngine.setEffectsVolume(0)
            },
            openEffectMusic: function () {
                this.stopEffectSound = 0,
                    cc.audioEngine.setEffectsVolume(this.effectSoundVolume)
            },
            changeEffectMusicState: function () {
                1 == this.stopEffectSound ? this.openEffectMusic() : this.stopEffectMusic()
            },
            stopMusic: function () {
                this.stopSound = 1,
                    this.stopBackgroundMusic(),
                    this.stopEffectMusic()
            },
            openMusic: function () {
                this.stopSound = 0,
                    this.openBackgroundMusic(),
                    this.openEffectMusic()
            },
            playEffect: function (e) {
                var t = engine.gameTime.localTime;
                if (!(null != this.lastTimeDic[e] && t - engineGlobal.playEffectMinTime <= this.lastTimeDic[e])) {
                    this.lastTimeDic[e] = t;
                    var n = engine.memory.getSound(e);
                    null != n ? cc.audioEngine.playEffect(n) : (new i).loadEffectSound(e)
                }
            },
            playMusic: function (e, t) {
                null == t && (t = !0);
                var n = this;
                this.playMusicUrl = e;
                var a = engine.memory.getSound(e);
                if (null == a) {
                    var o = new i;
                    o.playSound = function (e) {
                        if (e == n.playMusicUrl) {
                            var i = engine.memory.getSound(e);
                            null != i && cc.audioEngine.playMusic(i, t)
                        }
                    }
                        ,
                        o.loadBackgroundSound(e)
                } else
                    cc.audioEngine.playMusic(a, t)
            }
        }),
            cc._RF.pop()
    }
        , {
        GameSoundLoad: "GameSoundLoad"
    }],
    GameStrongData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "a0f0ffF4epCMbjK0wAx3gvQ", "GameStrongData"),
            window.strongerAddTypeEm = cc.Enum({
                addTime: 1,
                addScore: 2,
                addComboScore: 3,
                addComboTime: 4,
                addItem: 6
            }),
            cc.Class({
                extends: cc.Component,
                properties: {
                    strongLvObj: null,
                    maxLevelObj: null
                },
                initialize: function (e) {
                    this.maxLevelObj = {};
                    var t = getDicData("stronger");
                    for (var i in t) {
                        var n = 0
                            , a = t[i];
                        for (var o in a)
                            n < parseInt(a[o].level) && (n = parseInt(a[o].level));
                        this.maxLevelObj[i] = n
                    }
                    null == e && (e = {}),
                        this.strongLvObj = e
                },
                getStrongerData: function (e) {
                    var t = this.strongLvObj[e];
                    return null == t && (t = 0),
                        getDicData("stronger", e, t)
                },
                getStrongerMax: function (e) {
                    return this.maxLevelObj[e]
                },
                lvUpStronger: function (e) {
                    null == this.strongLvObj[e] && (this.strongLvObj[e] = 0);
                    var t = this.getStrongerMax(e);
                    return this.strongLvObj[e] < t && (this.strongLvObj[e] += 1,
                        !0)
                },
                getStrongerPush: function () {
                    var e = getDicData("stronger");
                    for (var t in e)
                        if (1 == this.getStrongerTypePush(t))
                            return !0;
                    return !1
                },
                getStrongerTypePush: function (e) {
                    var t = this.getStrongerData(e);
                    return !(t.level >= this.getStrongerMax(e)) && heroData.diamond >= t.nextcost
                },
                getStrongAddValue: function (e) {
                    return this.getStrongerData(e).value
                },
                getSaveData: function () {
                    return this.strongLvObj
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameSurpriseLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "2f93c1PGttDg6D4xRThqzwL", "GameSurpriseLayer"),
            window.surpriseOpenTypeEm = cc.Enum({
                mainLayer: 0,
                other: 1,
                defeatBoss: 2
            }),
            cc.Class({
                extends: cc.Component,
                properties: {
                    initPosArr: null,
                    centerPos: null,
                    getRewardList: null,
                    openType: null,
                    cardComponentArr: null,
                    isCanClick: null,
                    curChoose: null,
                    isClickAll: null
                },
                onDestroy: function () {
                    bannerManager.hideBanner(bannerLayerNameOb.surprise, surpriseOpenTypeEm.defeatBoss === this.openType),
                        this.initPosArr = null,
                        this.centerPos = null,
                        this.getRewardList = null,
                        this.openType = null,
                        this.cardComponentArr = null,
                        this.isCanClick = null,
                        this.curChoose = null
                },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                addEvent: function () {
                    if (this.openType === surpriseOpenTypeEm.mainLayer)
                        (e = this.node.getChildByName("mainGiftBtn")).getChildByName("nobtn").on(cc.Node.EventType.TOUCH_END, this.clickNotBtn, this),
                            e.getChildByName("watchbtn").on(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this);
                    else if (this.openType === surpriseOpenTypeEm.defeatBoss) {
                        var e;
                        (e = this.node.getChildByName("bossGiftBtn")).getChildByName("nextbtn").on(cc.Node.EventType.TOUCH_END, this.clickNextBtn, this),
                            e.getChildByName("watchbtn").on(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this)
                    }
                },
                removeEvent: function () {
                    if (this.openType === surpriseOpenTypeEm.mainLayer)
                        (e = this.node.getChildByName("mainGiftBtn")).getChildByName("nobtn").off(cc.Node.EventType.TOUCH_END, this.clickNotBtn, this),
                            e.getChildByName("watchbtn").off(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this);
                    else if (this.openType === surpriseOpenTypeEm.defeatBoss) {
                        var e;
                        (e = this.node.getChildByName("bossGiftBtn")).getChildByName("nextbtn").off(cc.Node.EventType.TOUCH_END, this.clickNextBtn, this),
                            e.getChildByName("watchbtn").off(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this)
                    }
                },
                initialize: function (e) {
                    this.isCanClick = !1,
                        this.openType = e,
                        this.getPosConfig(),
                        this.getSurpriseReward(),
                        this.addCardNode(),
                        this.addEvent(),
                        this.turnOverBack(),
                        this.openType == surpriseOpenTypeEm.defeatBoss && fightControl.levelOverControl.customLevelEvent(),
                        bannerManager.refreshBanner(bannerLayerNameOb.surprise)
                },
                getPosConfig: function () {
                    this.initPosArr = [];
                    for (var e = 0; e < 6; e++) {
                        var t = e % 3 * 235 - 235
                            , i = 224 - 320 * Math.floor(e / 3);
                        this.initPosArr.push(cc.v2(t, i))
                    }
                    this.centerPos = cc.v2(0, -450)
                },
                getSurpriseReward: function () {
                    this.getRewardList = [];
                    var e = getDicData(dataJson.mysteriousgift_json)
                        , t = 0;
                    for (var i in e)
                        t += e[i].weight;
                    for (var n = 0; n < 6; n++) {
                        var a = GameTool.getRandomInt(1, t)
                            , o = 0;
                        for (var i in e) {
                            var r = e[i];
                            if (a <= (o += r.weight)) {
                                this.getRewardList.push(getItemConfig(r.item, r.num));
                                break
                            }
                        }
                    }
                },
                addCardNode: function () {
                    this.cardComponentArr = [];
                    for (var e = 0; e < 6; e++) {
                        var t = engine.memory.getPrefab(nextLoadPrefab.surprise_card_node_prefab)
                            , i = t.addComponent("GameSurpriseNode");
                        i.initialize(e, this),
                            t.setPosition(this.initPosArr[e]),
                            this.node.getChildByName("cardParentNode").addChild(t),
                            this.cardComponentArr.push(i)
                    }
                },
                turnOverBack: function () {
                    this.node.getChildByName("cardParentNode").scale = .4;
                    var e = this;
                    this.node.getChildByName("cardParentNode").runAction(cc.sequence(cc.scaleTo(.7, 1), cc.delayTime(.7), cc.callFunc(function () {
                        for (var t = 0; t < e.cardComponentArr.length; t++)
                            e.cardComponentArr[t].turnOverBack()
                    })))
                },
                mergeCard: function () {
                    var e = this;
                    this.node.runAction(cc.sequence(cc.delayTime(.1), cc.callFunc(function () {
                        for (var t = 0; t < e.cardComponentArr.length; t++)
                            e.cardComponentArr[t].mergeCard()
                    })))
                },
                shuffleAction: function () {
                    var e = this;
                    this.node.runAction(cc.sequence(cc.delayTime(.5), cc.callFunc(function () {
                        e.dealCard()
                    })))
                },
                dealCard: function () {
                    this.getRewardList.sort(function () {
                        return Math.random() - .5
                    });
                    for (var e = 0; e < this.cardComponentArr.length; e++)
                        this.cardComponentArr[e].dealCard(this.initPosArr[e])
                },
                actionEnd: function () {
                    this.isCanClick = !0
                },
                clickReward: function (e) {
                    if (null == this.curChoose) {
                        this.isCanClick = !1,
                            this.curChoose = e;
                        var t = this;
                        this.cardComponentArr[e].turnOverFront(function () {
                            t.showBtn(),
                                t.cardComponentArr[e].addChooseAction(),
                                t.openType === surpriseOpenTypeEm.defeatBoss && t.getOneGift()
                        })
                    }
                },
                showBtn: function () {
                    this.openType === surpriseOpenTypeEm.mainLayer ? this.node.getChildByName("mainGiftBtn").active = !0 : this.openType === surpriseOpenTypeEm.defeatBoss && (this.node.getChildByName("bossGiftBtn").active = !0)
                },
                turnAll: function () {
                    var e = this;
                    this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
                        sceneControl.showReward(e.getRewardList),
                            e.openType == surpriseOpenTypeEm.defeatBoss && engine.eventM.emit(event_id.GOTO_NEXT_CUSTOM),
                            e.destroyClass()
                    })))
                },
                clickWatchBtn: function () {
                    if (!this.isClickAll) {
                        this.isClickAll = !0;
                        var e = "\u5361\u724c"
                            , t = 1;
                        if (this.openType == surpriseOpenTypeEm.mainLayer ? (e = "\u5361\u724c",
                            t = 1) : this.openType == surpriseOpenTypeEm.defeatBoss && (e = "Boss\u5361\u724c",
                                t = fightControl.curLevel),
                            gaLogEvent.logByDate(e, t),
                            1 === openModuleValue.forFBCheck || 1 == debugtest.noAD)
                            this.successFun();
                        else {
                            var i = videoAdKeyList[parseInt(Math.random() * videoAdKeyList.length)];
                            gameSDK.faceBookAdvertisement.showRewardVideoAd(i, this.successFun.bind(this))
                        }
                    }
                },
                successFun: function () {
                    this.hideBtn(),
                        this.openType === surpriseOpenTypeEm.defeatBoss && this.getRewardList.splice(this.curChoose, 1),
                        heroData.addItemByObj(this.getRewardList),
                        this.openType == surpriseOpenTypeEm.mainLayer && heroData.rewardSurprise(),
                        heroData.saveData();
                    for (var e = 0, t = 0; t < this.cardComponentArr.length; t++)
                        t != this.curChoose && (5 == ++e ? this.cardComponentArr[t].turnOverFront(this.turnAll.bind(this)) : this.cardComponentArr[t].turnOverFront())
                },
                hideBtn: function () {
                    this.node.getChildByName("bossGiftBtn").active = !1
                },
                clickNotBtn: function () {
                    this.getOneGift(),
                        this.destroyClass()
                },
                clickNextBtn: function () {
                    engine.eventM.emit(event_id.GOTO_NEXT_CUSTOM),
                        this.destroyClass()
                },
                getOneGift: function () {
                    var e = "\u5361\u724c";
                    this.openType == surpriseOpenTypeEm.mainLayer ? e = "\u5361\u724c" : this.openType == surpriseOpenTypeEm.defeatBoss && (e = ""),
                        "" != e && gaLogEvent.logByDate(e, 2);
                    var t = this.getRewardList[this.curChoose];
                    heroData.addItemByObj([t]),
                        sceneControl.showReward([t]),
                        this.openType == surpriseOpenTypeEm.mainLayer && heroData.rewardSurprise(),
                        heroData.saveData()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameSurpriseNode: [function (e, t) {
        "use strict";
        cc._RF.push(t, "cd5dapJ4upAjomDP6TGlSL0", "GameSurpriseNode"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    index: null,
                    parentLayer: null
                },
                onDestroy: function () {
                    this.index = null,
                        this.parentLayer = null
                },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                addEvent: function () {
                    this.node.getChildByName("cardbg").on(cc.Node.EventType.TOUCH_END, this.clickGetBtn, this)
                },
                removeEvent: function () {
                    this.node.getChildByName("cardbg").off(cc.Node.EventType.TOUCH_END, this.clickGetBtn, this)
                },
                initialize: function (e, t) {
                    this.index = e,
                        this.parentLayer = t,
                        this.addEvent(),
                        this.node.getChildByName("cardbg").getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "card1"),
                        this.refreshLayer()
                },
                refreshLayer: function () {
                    var e = this.parentLayer.getRewardList[this.index];
                    this.node.getChildByName("itemicon").getComponent(cc.Sprite).spriteFrame = getItemSpriteFrame(e.id),
                        this.node.getChildByName("numword").getComponent(cc.Label).string = "" + e.num
                },
                turnOverBack: function () {
                    var e = this;
                    this.node.runAction(cc.sequence(cc.scaleTo(.3, 0, 1), cc.callFunc(function () {
                        e.node.getChildByName("itemicon").active = !1,
                            e.node.getChildByName("numword").active = !1,
                            e.node.getChildByName("cardbg").getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "card2")
                    }), cc.scaleTo(.3, 1, 1), cc.callFunc(function () {
                        5 == e.index && e.parentLayer.mergeCard()
                    })))
                },
                mergeCard: function () {
                    var e = this;
                    this.node.runAction(cc.sequence(cc.moveTo(.5, this.parentLayer.centerPos), cc.callFunc(function () {
                        5 == e.index && e.parentLayer.shuffleAction()
                    })))
                },
                dealCard: function (e) {
                    this.refreshLayer();
                    var t = this;
                    this.node.runAction(cc.sequence(cc.delayTime(.35 * this.index), cc.moveTo(.3, e), cc.callFunc(function () {
                        5 == t.index && t.parentLayer.actionEnd()
                    })))
                },
                turnOverFront: function (e) {
                    var t = this;
                    this.node.runAction(cc.sequence(cc.scaleTo(.3, 0, 1), cc.callFunc(function () {
                        t.node.getChildByName("itemicon").active = !0,
                            t.node.getChildByName("numword").active = !0,
                            t.node.getChildByName("cardbg").getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "card1")
                    }), cc.scaleTo(.3, 1, 1), cc.callFunc(function () {
                        null != e && e()
                    })))
                },
                addChooseAction: function () {
                    var e = new cc.Node
                        , t = e.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(t, nextLoadSpine.mysterious, "mysterious", 1, !0),
                        this.node.addChild(e, -1)
                },
                clickGetBtn: function () {
                    1 == this.parentLayer.isCanClick && this.parentLayer.clickReward(this.index)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameTextLanguage: [function (e, t) {
        "use strict";
        cc._RF.push(t, "b843axXZeZGULWgNuP8T98G", "GameTextLanguage"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    _txtKey: 0,
                    txtKey: {
                        set: function (e) {
                            this._txtKey = e
                        },
                        get: function () {
                            return this._txtKey
                        }
                    }
                },
                onLoad: function () {
                    if (null != engine) {
                        var e = engine.gameData.dataDic[dataJson.language_json];
                        null == e[this._txtKey] && (ccLog("\u8fd9\u4e2a\u8282\u70b9\u7684\u7ffb\u8bd1ID\u586b\u9519\u4e86  " + this.node.name),
                            ccLog("\u7236\u8282\u70b9\u662f\u8fd9\u4e2a  " + this.node._parent.name),
                            ccLog("\u5728\u8fd9\u4e2a\u9884\u5236\u4ef6\u91cc\u9762  " + this.node._prefab.root.name)),
                            this.node.getComponent(cc.Label).string = e[this._txtKey].content
                    }
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameTextureLoad: [function (e, t) {
        "use strict";
        cc._RF.push(t, "e8039KSOWJIp4XMprADSQM5", "GameTextureLoad"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    _textureRes: null,
                    textureUrl: {
                        type: cc.Texture2D,
                        set: function (e) {
                            this._textureRes = e
                        },
                        get: function () {
                            return this._textureRes
                        }
                    }
                },
                onLoad: function () {
                    this.loadTexture()
                },
                loadTexture: function () {
                    this.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this._textureRes)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameTime: [function (e, t) {
        "use strict";
        cc._RF.push(t, "87c99WRZvdMtrVqkIePM1hS", "GameTime"),
            window.timeFormatTypeEm = cc.Enum({
                secondType: 1,
                minuteType: 2,
                hourType: 3,
                dayType: 4,
                objectType: 5
            }),
            cc.Class({
                extends: cc.Component,
                properties: {
                    isInit: null,
                    localTime: null,
                    updateCount: null,
                    checkTime: null,
                    serverTime: null,
                    updateManageFun: null
                },
                initialize: function () {
                    if (1 != this.isInit) {
                        this.checkTime = 0,
                            this.serverTime = 0,
                            this.isInit = !0;
                        var e = new Date;
                        this.localTime = e.getTime(),
                            this.updateCount = 0,
                            this.setFrameRate(engineGlobal.gameFrame)
                    }
                },
                updateTime: function (e) {
                    if (this.localTime = this.localTime + parseInt(1e3 * e),
                        this.updateCount++,
                        this.updateCount > engineGlobal.gameFrame) {
                        this.updateCount = 0;
                        var t = new Date;
                        this.localTime = t.getTime()
                    }
                    null != this.updateManageFun && this.updateManageFun(this.localTime, e)
                },
                setFrameRate: function (e) {
                    this.updateCount = 0,
                        engineGlobal.gameFrame = e,
                        cc.game.setFrameRate(e),
                        this.unschedule(this.updateTime),
                        this.schedule(this.updateTime, 1 / e)
                },
                refreshLocal: function () {
                    var e = new Date;
                    this.localTime = e.getTime()
                },
                formatTime: function (e, t) {
                    var i = "";
                    if (e <= 0)
                        switch (t) {
                            case timeFormatTypeEm.dayType:
                                i = "0d 00:00:00";
                                break;
                            case timeFormatTypeEm.hourType:
                                i = "00:00:00";
                                break;
                            case timeFormatTypeEm.minuteType:
                                i = "00:00";
                                break;
                            case timeFormatTypeEm.secondType:
                                i = "00";
                                break;
                            case timeFormatTypeEm.objectType:
                                i = {
                                    day: 0,
                                    hour: 0,
                                    minute: 0,
                                    second: 0
                                };
                                break;
                            default:
                                i = "00:00:00"
                        }
                    else {
                        var n = Math.floor(e / 1e3)
                            , a = "0";
                        n > 86400 && (n -= 86400 * (a = Math.floor(n / 3600 / 24)));
                        var o = Math.floor(n / 3600);
                        o < 10 && (o = "0" + o);
                        var r = Math.floor(n % 3600 / 60);
                        r < 10 && (r = "0" + r);
                        var s = Math.floor(n % 60);
                        switch (s < 10 && (s = "0" + s),
                        t) {
                            case timeFormatTypeEm.dayType:
                                i = a + "d " + o + ":" + r + ":" + s;
                                break;
                            case timeFormatTypeEm.hourType:
                                i = o + ":" + r + ":" + s;
                                break;
                            case timeFormatTypeEm.minuteType:
                                i = r + ":" + s;
                                break;
                            case timeFormatTypeEm.secondType:
                                i = s;
                                break;
                            case timeFormatTypeEm.objectType:
                                i = {
                                    day: a,
                                    hour: o,
                                    minute: r,
                                    second: s
                                };
                                break;
                            default:
                                i = o + ":" + r + ":" + s
                        }
                    }
                    return i
                },
                getDayToString: function () {
                    var e = new Date;
                    return e.getFullYear().toString() + "-" + e.getMonth().toString() + "-" + e.getDate().toString()
                },
                getTimeDate: function (e) {
                    var t = null;
                    t = null == e ? new Date : new Date(e);
                    var i = {};
                    return i.year = t.getFullYear(),
                        i.monthNum = t.getMonth() + 1,
                        i.monthNum < 10 && (i.monthNum = "0" + i.monthNum),
                        i.dayNum = t.getDate(),
                        i.dayNum < 10 && (i.dayNum = "0" + i.dayNum),
                        i.hourNum = t.getHours(),
                        i.hourNum < 10 && (i.hourNum = "0" + i.hourNum),
                        i.minNum = t.getMinutes(),
                        i.minNum < 10 && (i.minNum = "0" + i.minNum),
                        i.second = t.getSeconds(),
                        i.second < 10 && (i.second = "0" + i.second),
                        i
                },
                setCheckTime: function (e) {
                    this.checkTime = this.localTime,
                        this.serverTime = e
                },
                getSeverTime: function () {
                    return this.serverTime + (this.localTime - this.checkTime) / 1e3
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GameTool: [function (e, t) {
        "use strict";
        cc._RF.push(t, "90c35QEXWtIhK6ryEGAZzqz", "GameTool");
        var i = e("GameExternalImage");
        window.GameTool = new Object,
            GameTool.getRandomInt = function (e, t) {
                return Math.floor(Math.random() * (t - e + 1)) + e
            }
            ,
            GameTool.createSpineSkeleton = function (e, t, i, n) {
                ccLog("spine\u52a8\u753b" + e);
                var a = new cc.Node
                    , o = a.addComponent(sp.Skeleton)
                    , r = engine.memory.getSpine(e);
                return o.skeletonData = r,
                    o.animation = t,
                    o.timeScale = i,
                    o.loop = n,
                {
                    node: a,
                    skeleton: o
                }
            }
            ,
            GameTool.setSkeleton = function (e, t, i, n, a) {
                var o = engine.memory.getSpine(t);
                e.skeletonData = o,
                    e.animation = i,
                    e.timeScale = n,
                    e.loop = a
            }
            ,
            GameTool.createSpirteNode = function (e, t) {
                var i = new cc.Node
                    , n = i.addComponent(cc.Sprite);
                return n.spriteFrame = engine.memory.getSpriteFrame(e, t),
                {
                    node: i,
                    sprite: n
                }
            }
            ,
            GameTool.createMotionStreakNode = function (e, t, i) {
                var n = new cc.Node
                    , a = n.addComponent(cc.MotionStreak);
                return a.texture = engine.memory.getTexture(e)._texture,
                    a.fadeTime = t || 1,
                    a.minSeg = i || 1,
                    n
            }
            ,
            GameTool.getAngleByPoint = function (e, t) {
                var i = 0
                    , n = t.x - e.x
                    , a = t.y - e.y;
                return i = Math.atan2(a, n),
                    (i *= 180 / Math.PI) < 0 && (i += 360),
                    i % 360
            }
            ,
            GameTool.getRadianByPoint = function (e, t) {
                var i = 0
                    , n = t.x - e.x
                    , a = t.y - e.y;
                return (i = Math.atan2(n, a)) < 0 && (i += 2 * Math.PI),
                    i
            }
            ,
            GameTool.getDirByPoint = function (e, t) {
                var i = 2
                    , n = GameTool.getAngleByPoint(e, t);
                return n >= 0 && n <= 45 && (i = 6),
                    n > 45 && n <= 135 && (i = 8),
                    n > 135 && n <= 225 && (i = 4),
                    n > 225 && n <= 315 && (i = 2),
                    n > 315 && n <= 360 && (i = 6),
                    i
            }
            ,
            GameTool.arrIsIndexOf = function (e, t, i) {
                for (var n = 0; n < e.length; n++)
                    if (null == i) {
                        if (e[n] == t)
                            return !0
                    } else if (e[n][i] == t)
                        return !0;
                return !1
            }
            ,
            GameTool.analysisJsonData = function (e) {
                for (var t = 0; t < e.length; t++)
                    engine.gameData.analysisJsonData(e[t], e[t])
            }
            ,
            GameTool.timeStrToData = function (e, t) {
                var i = "/";
                null != t && (i = t);
                var n = new Date(1e3 * e);
                return n.getFullYear().toString() + i + (n.getMonth() + 1).toString() + i + n.getDate().toString()
            }
            ,
            GameTool.getSortWeight = function (e, t, i, n) {
                for (var a = 0; a < i.length; a++)
                    if (e[i[a]] != t[i[a]])
                        return 1 == n ? e[i[a]] - t[i[a]] : t[i[a]] - e[i[a]];
                return 0
            }
            ,
            GameTool.loadUrl = function (e, t) {
                if ("" == e)
                    return "";
                var i = cc.resources.getInfoWithPath(cc.path.mainFileName(e));
                return i ? cc.assetManager.utils.getUrlWithUuid(i.uuid, {
                    isNative: !0,
                    nativeExt: t
                }) : ""
            }
            ,
            GameTool.removeDuplicateArr = function (e) {
                for (var t = 0; t < e.length; t++)
                    for (var i = t + 1; i < e.length; i++)
                        isSamePos(e[t], e[i]) && (e.splice(i, 1),
                            i--);
                return e
            }
            ,
            GameTool.getCropSpriteFrame = function (e, t, i, n, a) {
                var o = e.width / puzzleCellCol
                    , r = e.height / puzzleCellRow;
                return n = n || 0,
                    a = a || 0,
                    new cc.SpriteFrame(e, cc.rect(t * o, i * r, o - n, r - a))
            }
            ,
            GameTool.getPuzzleCellScale = function (e, t, i, n, a, o) {
                var r = cc.v2(1, 1);
                return a = a || 0,
                    o = o || 0,
                    r.x = (i - a * puzzleCellCol) / e,
                    r.y = (n - o * puzzleCellRow) / t,
                    r
            }
            ,
            GameTool.getPositionByXY = function (e, t, i, n, a) {
                var o = new cc.v2(0, 0);
                return o.x = e.width * (t - 1 * (n - 1) / 2),
                    o.y = -e.height * (i - 1 * (a - 1) / 2),
                    o
            }
            ,
            GameTool.addImage = function (e, t, n, a) {
                if (!e)
                    return console.error("url null");
                if (!t)
                    return console.error("url parent");
                t.removeAllChildren(),
                    n = t.width,
                    a = t.height;
                var o = new i;
                o.loadImage(e, null, n, a),
                    t.addChild(o)
            }
            ,
            GameTool.createHeadNode = function (e, t) {
                if (t.removeAllChildren(),
                    "testhead" === e) {
                    var n = new cc.Node;
                    n.addComponent(cc.Sprite),
                        n.setContentSize(t.getContentSize()),
                        t.addChild(n),
                        GameTool.setPic(n, e)
                } else {
                    if ("headimg/bot" !== e.substr(0, 11) && "headimg/pk_earth" !== e) {
                        var a = new i;
                        return a.loadImage(e, null, t.width, t.height),
                            a
                    }
                    var o = new cc.Node;
                    o.addComponent(cc.Sprite),
                        o.setContentSize(t.getContentSize()),
                        t.addChild(o),
                        GameTool.setPic(o, e)
                }
            }
            ,
            GameTool.setPic = function (e, t, i) {
                e || cc.error("setPic error:", e, t),
                    e.getComponent(cc.Sprite) || cc.error("setPic error:\u5bf9\u5e94\u8282\u70b9\u6ca1\u6709Sprite component", e),
                    null != t ? cc.resources.load(t, cc.SpriteFrame, function (t, n) {
                        t && cc.error("set pic error", t),
                            e.isValid && e.getComponent(cc.Sprite) && (e.getComponent(cc.Sprite).spriteFrame = n,
                                i && i())
                    }) : e.isValid && e.getComponent(cc.Sprite) && (e.getComponent(cc.Sprite).spriteFrame.setTexture(),
                        i && i())
            }
            ,
            cc._RF.pop()
    }
        , {
        GameExternalImage: "GameExternalImage"
    }],
    Game: [function (e, t) {
        "use strict";
        cc._RF.push(t, "5de12nkyL1NWbhEROXk9EJS", "Game");
        var i = e("HeroData")
            , n = e("SceneControl");
        window.isGameInit = !1,
            window.sceneControl = null,
            window.heroData = null,
            window.isLogin = !1,
            window.debugtest = {
                attckTime: 0,
                chooseLv: 0,
                parachute: 0,
                remainTime: 0,
                surpass: 0,
                cloud: 0,
                newElement: 0,
                newMode: 0,
                appointLevel: 0,
                starFly: 0,
                testBoss: 0,
                quickDead: 0,
                money: 0,
                showGridNum: 0,
                skinLevel: 0,
                itemMore: 1,
                gem1000: 0,
                noAD: 0,
                openLevel: 0,
                challengeRoom: 0,
                testNewPlayer: 0,
                clearSmallGameTime: 0
            },
            window.gameInit = function () {
                if (window.dataLayer = window.dataLayer || [],
                    window.gtag = window.gtag || function () {
                        dataLayer.push(arguments)
                    }
                    ,
                    gameSDKName == faceBookSDKTest) {
                    for (var e = [["new", "testNewPlayer", "\u6e05\u53f7"], ["gts", "clearSmallGameTime", "\u5c0f\u6e38\u620f\u6b21\u6570"]], t = "", a = 0; a < e.length; a++)
                        -1 != location.search.indexOf(e[a][0]) && (debugtest[e[a][1]] = 1),
                            t += e[a][0] + "     " + e[a][2] + "\n";
                    debugtest.showStr = t,
                        cc.error("debugtest.showStr", debugtest.showStr)
                }
                0 == isGameInit && (isGameInit = !0,
                    initEngine(),
                    initRes(),
                    initGameSDK(),
                    heroData = new i,
                    sceneControl = new n)
            }
            ,
            cc._RF.pop()
    }
        , {
        HeroData: "HeroData",
        SceneControl: "SceneControl"
    }],
    GradeLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "ee465ubiwJLeaLmEbUuVTRa", "GradeLayer");
        var i = e("PublicLayer");
        cc.Class({
            extends: i,
            properties: {},
            onDestroy: function () {
                bannerManager.hideBanner(bannerLayerNameOb.grade)
            },
            destroyClass: function () {
                null != this.node && (this.removeEvent(),
                    this.node.destroy())
            },
            initialize: function () {
                var e = {
                    bg: {
                        y: 0,
                        width: 652,
                        height: 891
                    },
                    bg2: {
                        y: 13,
                        width: 604,
                        height: 835
                    },
                    title: {
                        y: 442,
                        txt: getLanguageDic(1042)
                    },
                    close: {
                        x: 307,
                        y: 436
                    }
                };
                this.addEvent();
                var t = getDicData(dataJson.grade_json)
                    , i = 0;
                for (var n in t) {
                    var a = engine.memory.getPrefab(nextLoadPrefab.grade_node_prefab);
                    a.addComponent("GradeNode").initialize(n, this),
                        a.y = 297 - 256 * parseInt(i / 4),
                        a.x = 8 == i ? 0 : i % 4 * 147 - 220,
                        this.node.getChildByName("activenode").addChild(a),
                        i++
                }
                this._super(e),
                    bannerManager.refreshBanner(bannerLayerNameOb.grade)
            }
        }),
            cc._RF.pop()
    }
        , {
        PublicLayer: "PublicLayer"
    }],
    GradeNode: [function (e, t) {
        "use strict";
        cc._RF.push(t, "30818bvfUpH2ZQSWPWr1aLK", "GradeNode"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    gradeID: null,
                    parentLayer: null
                },
                onDestroy: function () {
                    this.gradeID = null,
                        this.parentLayer = null
                },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                addEvent: function () {
                    this.node.getChildByName("activebtn").on(cc.Node.EventType.TOUCH_END, this.clickActiveBtn, this)
                },
                removeEvent: function () {
                    this.node.getChildByName("activebtn").off(cc.Node.EventType.TOUCH_END, this.clickActiveBtn, this)
                },
                initialize: function (e, t) {
                    this.gradeID = e,
                        this.parentLayer = t,
                        this.addEvent();
                    var i = getDicData(dataJson.grade_json, this.gradeID);
                    this.node.getChildByName("gradeicon").getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(needLoadImage.mastloadimg1, "gradeicon" + this.gradeID);
                    var n;
                    n = "" == i.score2 || null == i.score2 ? i.score1 + "+" : i.score1 + "-" + i.score2,
                        this.node.getChildByName("scoretxt").getComponent(cc.Label).string = n,
                        this.refreshLayer()
                },
                refreshLayer: function () {
                    var e = this.node.getChildByName("activebtn")
                        , t = e.getChildByName("acsp").getComponent(cc.Sprite)
                        , i = heroData.gradeData.getRewardStateByID(this.gradeID)
                        , n = e.getComponent(cc.Button);
                    switch (i) {
                        case rewardStateEm.already:
                            e.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(loginLoadImage.publicimg1, "button1"),
                                t.spriteFrame = engine.memory.getSpriteFrame(loginLoadImage.publicimg1, "okimg"),
                                n.zoomScale = 1;
                            break;
                        case rewardStateEm.canReward:
                            e.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(loginLoadImage.publicimg1, "button2"),
                                t.spriteFrame = engine.memory.getSpriteFrame(needLoadLanguageImage.language1, "activation1"),
                                n.zoomScale = 1.2;
                            break;
                        case rewardStateEm.notCan:
                            e.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(loginLoadImage.publicimg1, "button3"),
                                t.spriteFrame = engine.memory.getSpriteFrame(needLoadLanguageImage.language1, "activation2"),
                                n.zoomScale = 1
                    }
                },
                clickActiveBtn: function () {
                    heroData.gradeData.getRewardStateByID(this.gradeID) == rewardStateEm.canReward && (gaLogEvent.logByDate("\u9886\u53d6\u8fdb\u9636", this.gradeID),
                        heroData.raceLampData.addRaceLampData(this.gradeID),
                        heroData.gradeData.gradeReward(this.gradeID),
                        heroData.saveData(),
                        this.refreshLayer(),
                        engine.eventM.emit(event_id.REFRESH_GRADE_PUSH))
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GradeUpLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "2e618EmSjBPirPl3D8lhtHI", "GradeUpLayer"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                onDestroy: function () { },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                addEvent: function () {
                    this.node.getChildByName("surpassbg").on(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this)
                },
                removeEvent: function () {
                    this.node.getChildByName("surpassbg").off(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this)
                },
                initialize: function () {
                    this.addEvent();
                    var e = heroData.gradeData.getCurGradeByScore();
                    this.node.getChildByName("gradeicon").getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(needLoadImage.mastloadimg1, "gradeicon" + e);
                    var t = this.node.getChildByName("des").getComponent(cc.Label)
                        , i = getDicData(dataJson.grade_json, e + 1);
                    if (null == i)
                        t.string = getLanguageDic(1044);
                    else {
                        var n = i.score1 + 1 - heroData.bestScore;
                        t.string = getLanguageDic(1041).replace("%d", n).replace("%l", i.name)
                    }
                    this.node.getChildByName("light1").runAction(cc.rotateBy(4, 360).repeatForever()),
                        this.node.getChildByName("light2").runAction(cc.spawn(cc.rotateBy(6, 360), cc.sequence(cc.fadeTo(1, 50), cc.fadeTo(1, 255))).repeatForever())
                },
                clickCloseBtn: function () {
                    isHaveSurpassLayer(),
                        this.destroyClass()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GridData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "a4af4e/bDhB56EMx/iBBr1s", "GridData"),
            window.gridTypeEm = {
                lock: -18,
                key2: -17,
                key1: -16,
                magic: -15,
                clawball4: -14,
                clawball3: -13,
                clawball2: -12,
                clawball1: -11,
                flower: -10,
                birdcage: -9,
                bonfire: -8,
                egg: -7,
                dragonfly: -6,
                demon: -5,
                rocket: -4,
                ice: -3,
                question: -2,
                iron: -1,
                normal: 0
            },
            window.specialGridTypeNum = {
                flower: 6
            },
            window.collectIdObj = {
                1: gridTypeEm.dragonfly,
                2: gridTypeEm.egg,
                3: gridTypeEm.bonfire,
                4: gridTypeEm.birdcage,
                5: gridTypeEm.flower
            },
            cc.Class({
                extends: cc.Component,
                properties: {
                    gridID: null,
                    gridPos: null,
                    otherType: null,
                    targetPos: null,
                    demonPosArr: null,
                    needCollectEggTimes: null,
                    curFireNum: null,
                    maxFireNum: null
                },
                initialize: function (e, t) {
                    this.gridID = e,
                        this.gridPos = t,
                        this.otherType = gridTypeEm.normal,
                        this.targetPos = null,
                        this.demonPosArr = null
                },
                updateInfo: function (e, t) {
                    this.refreshGridID(e),
                        this.refreshGridOther(t),
                        this.needCollectEggTimes = 0,
                        this.curFireNum = 0,
                        t === gridTypeEm.egg && (this.needCollectEggTimes = 3),
                        t === gridTypeEm.bonfire && (this.curFireNum = 0,
                            this.maxFireNum = 10),
                        this.clearDemonData(),
                        this.clearRocketData()
                },
                clear: function () {
                    this.gridID = 0
                },
                refreshGridID: function (e) {
                    this.gridID = e
                },
                refreshGridOther: function (e) {
                    this.otherType = e
                },
                isItem: function () {
                    return this.gridID === itemIDConfig.bomb || this.gridID === itemIDConfig.tips || this.gridID === itemIDConfig.resort || this.gridID === itemIDConfig.addTime
                },
                isParry: function () {
                    return this.otherType === gridTypeEm.ice || this.otherType === gridTypeEm.dragonfly || -1 === this.gridID
                },
                isSpecialGrid: function () {
                    return this.otherType === gridTypeEm.rocket || this.otherType === gridTypeEm.demon
                },
                isUsable: function () {
                    return this.gridID !== gridTypeEm.normal && this.otherType !== gridTypeEm.ice && this.gridID !== gridTypeEm.iron && (!this.isCollectGrid() || this.gridID > 0)
                },
                isEmpty: function () {
                    return 0 == this.gridID
                },
                clearDemonData: function () {
                    this.demonPosArr = null
                },
                clearRocketData: function () {
                    this.targetPos = null
                },
                isCanOperateGrid: function () {
                    return this.gridID !== gridTypeEm.normal && this.gridID !== gridTypeEm.dragonfly
                },
                collectGridEgg: function () {
                    this.needCollectEggTimes > 0 && (this.needCollectEggTimes--,
                        this.needCollectEggTimes <= 0 && (fightControl.mapData.deleteGrid(this.gridPos),
                            fightControl.collectData.collectTargetByType(collectTypeEm.egg, 1)))
                },
                refreshFireNum: function (e) {
                    this.otherType === gridTypeEm.bonfire && (1 === e ? (this.curFireNum <= 0 && fightControl.collectData.collectTargetByType(collectTypeEm.bonfire, 1),
                        this.curFireNum = this.maxFireNum) : this.curFireNum)
                },
                refreshBirdcageNum: function () {
                    if (this.gridID === gridTypeEm.birdcage) {
                        var e = fightControl.collectData.birdcageGridArr.pop();
                        this.refreshGridID(e),
                            fightControl.collectData.collectTargetByType(collectTypeEm.birdcage, 1)
                    }
                },
                refreshFlower: function () {
                    if (this.gridID === gridTypeEm.flower) {
                        var e = fightControl.collectData.flowerGridArr.pop();
                        this.refreshGridID(e)
                    }
                },
                refreshClawball: function () {
                    var e = this.getClawNum();
                    this.isClawball() && this.gridID !== gridTypeEm.normal && e > 0 && (this.refreshGridID(gridTypeEm.normal),
                        fightControl.collectData.collectTargetByType(collectTypeEm.clawball, e))
                },
                isCollectGrid: function () {
                    for (var e in collectIdObj)
                        if (this.otherType === collectIdObj[e])
                            return !0;
                    return !!this.isClawball()
                },
                isOtherShowGrid: function () {
                    return this.otherType === gridTypeEm.ice || this.otherType === gridTypeEm.question || this.otherType === gridTypeEm.lock
                },
                isClawball: function () {
                    return this.otherType === gridTypeEm.clawball1 || this.otherType === gridTypeEm.clawball2 || this.otherType === gridTypeEm.clawball3 || this.otherType === gridTypeEm.clawball4
                },
                isKey: function () {
                    return this.otherType === gridTypeEm.key1 || this.otherType === gridTypeEm.key2
                },
                getClawNum: function () {
                    if (!this.isClawball())
                        return 0;
                    var e = 0;
                    switch (this.otherType) {
                        case gridTypeEm.clawball1:
                            e = 1;
                            break;
                        case gridTypeEm.clawball2:
                            e = 2;
                            break;
                        case gridTypeEm.clawball3:
                            e = 1;
                            break;
                        case gridTypeEm.clawball4:
                            e = 2;
                            break;
                        default:
                            e = 0
                    }
                    return e
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GridNode: [function (e, t) {
        "use strict";
        cc._RF.push(t, "6dc57hUDrRFPryc7G/TY7LI", "GridNode");
        var i = cc.Enum({
            select: 1,
            move: 2,
            delete: 3,
            bossCreate: 4
        });
        cc.Class({
            extends: cc.Component,
            properties: {
                gridPos: null,
                parentLayer: null,
                isCanClick: null,
                iconNode: null,
                bgNode: null,
                otherShowNode: null,
                selectNode: null,
                specialGridCom: null,
                specialGridComName: null,
                isIce: null
            },
            onDestroy: function () {
                this.gridPos = null,
                    this.parentLayer = null,
                    this.isCanClick = null
            },
            destroyClass: function () {
                null != this.node && (this.removeEvent(),
                    this.node.destroy())
            },
            addEvent: function () {
                this.node.getChildByName("clicknode").on(cc.Node.EventType.TOUCH_END, this.clickGrid, this)
            },
            removeEvent: function () {
                this.node.getChildByName("clicknode").off(cc.Node.EventType.TOUCH_END, this.clickGrid, this)
            },
            initialize: function (e, t) {
                this.isCanClick = !0,
                    this.gridPos = e,
                    this.parentLayer = t,
                    this.iconNode = this.node.getChildByName("gridicon"),
                    this.bgNode = this.node.getChildByName("gridbg"),
                    this.otherShowNode = this.node.getChildByName("othershow"),
                    this.selectNode = this.node.getChildByName("select"),
                    this.addEvent(),
                    this.refreshView(),
                    this.refreshChoose(),
                    this.refreshGridBg(),
                    this.collectCom = this.addComponent("Grid_CollectCom")
            },
            updateInfo: function () {
                var e = fightControl.mapData.getGridDataByPos(this.gridPos);
                switch (this.isIce = !1,
                this.specialGridComName && (this.node.removeComponent(this.specialGridComName),
                    this.specialGridCom = null,
                    this.specialGridComName = null,
                    this.node.getChildByName("gridicon").removeAllChildren()),
                e.otherType) {
                    case gridTypeEm.egg:
                        this.specialGridComName = "Grid_Egg";
                        break;
                    case gridTypeEm.bonfire:
                        this.specialGridComName = "Grid_Bonfire";
                        break;
                    case gridTypeEm.birdcage:
                        this.specialGridComName = "Grid_Birdcage";
                        break;
                    case gridTypeEm.flower:
                        this.specialGridComName = "Grid_Flower";
                        break;
                    case gridTypeEm.clawball1:
                    case gridTypeEm.clawball2:
                        this.specialGridComName = "Grid_Clawball"
                }
                null != this.specialGridComName && (this.specialGridCom = this.addComponent(this.specialGridComName),
                    this.specialGridCom.initialize(this.gridPos, e.gridID)),
                    this.refreshView(),
                    this.refreshGridBg(),
                    this.refreshOtherShow(!1),
                    this.collectCom.refreshInfo()
            },
            deleteSpecialCom: function () {
                this.node.removeComponent("Grid_Egg"),
                    this.specialGridCom = null
            },
            refreshView: function () {
                var e = fightControl.mapData.getGridDataByPos(this.gridPos);
                !0 !== e.isEmpty() && e.isCanOperateGrid() ? this.node.active = !0 : this.node.active = !1;
                var t = this.node.getChildByName("gridicon");
                t.getComponent(cc.Sprite).spriteFrame = this.getGridIcon(),
                    e.gridID > 0 && t.removeAllChildren()
            },
            getGridIcon: function () {
                var e = fightControl.mapData.getGridDataByPos(this.gridPos);
                return e.gridID === gridTypeEm.iron || e.gridID === gridTypeEm.normal || e.isCollectGrid() ? e.gridID > 0 ? engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "grid_" + e.gridID) : "" : engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "grid_" + e.gridID)
            },
            isShow: function (e) {
                this.node.active = e
            },
            refreshGridBg: function () {
                var e, t = fightControl.mapData.getGridDataByPos(this.gridPos);
                e = t.isClawball() ? engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "gridbg_7") : t.otherType === gridTypeEm.flower ? engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "gridbg_6") : t.gridID === gridTypeEm.birdcage ? engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "gridbg_5") : !0 === t.isItem() || t.isSpecialGrid() ? engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "gridbg_2") : t.gridID === gridTypeEm.iron ? engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "gridbg_4") : t.isCollectGrid() ? t.gridID > 0 ? engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "gridbg_1") : "" : engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "gridbg_1"),
                    this.bgNode.getComponent(cc.Sprite).spriteFrame = e
            },
            createAction: function (e) {
                this.updateInfo(),
                    this.selectNode.active = !1,
                    !0 === this.node.active && (this.node.scale = .6,
                        this.node.runAction(cc.sequence(cc.scaleTo(.2, 1.1 * 1.1), cc.scaleTo(.1, .9 * 1.1), cc.scaleTo(.1, 1.1), cc.callFunc(function () {
                            e && e()
                        }))),
                        this.setZIndex())
            },
            refreshChoose: function () {
                isSamePos(this.gridPos, fightControl.gridPos1) || isSamePos(this.gridPos, fightControl.gridPos2) ? (this.refreshSelect(!0),
                    this.bgNode.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "gridbg_3")) : (this.refreshSelect(!1),
                        this.refreshGridBg()),
                    this.refreshOtherShow(this.selectNode.active)
            },
            showTipsType: function (e) {
                this.refreshSelect(e),
                    !0 === e ? this.bgNode.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "gridbg_3") : this.refreshGridBg(),
                    this.refreshOtherShow(e)
            },
            refreshOtherShow: function (e) {
                var t = fightControl.mapData.getGridDataByPos(this.gridPos);
                if (this.otherShowNode.active = t.isOtherShowGrid(),
                    this.node.active) {
                    var i = "";
                    t.otherType === gridTypeEm.question ? (this.otherShowNode.active = !e,
                        i = engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "question")) : t.otherType === gridTypeEm.ice ? (this.isIce = !0,
                            i = this.isIce ? engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "iceicon") : "") : i = "",
                        this.otherShowNode.getComponent(cc.Sprite).spriteFrame = i
                }
            },
            gridGray: function (e) {
                !0 === e ? (spriteSetGray(this.bgNode),
                    spriteSetGray(this.iconNode),
                    spriteSetGray(this.otherShowNode)) : (spriteGrayRecover(this.bgNode),
                        spriteGrayRecover(this.iconNode),
                        spriteGrayRecover(this.otherShowNode))
            },
            changeCanClick: function (e) {
                this.isCanClick = e
            },
            clickGrid: function (e) {
                if (engine.gameSound.playEffect(soundurl.clickgrid),
                    !0 === isHaveNewbie) {
                    var t = this.parentLayer.parentLayer;
                    if (!t.isNewbieNeedPos(this.gridPos))
                        return;
                    t.runNextNewbie()
                }
                if (!0 === this.isCanClick && !1 !== this.parentLayer.isCanClick) {
                    if (!fightControl.mapData.getGridDataByPos(this.gridPos).isUsable()) {
                        var i = e.getLocation();
                        i = this.node.convertToNodeSpaceAR(i);
                        var n = new cc.Node;
                        return n.position = i,
                            n.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "ban"),
                            this.node.addChild(n),
                            void n.runAction(cc.sequence(cc.delayTime(.25), cc.removeSelf()))
                    }
                    this.parentLayer.clickGrid(this.gridPos)
                }
            },
            showMoveAction: function (e, t, i) {
                var n = this;
                this.gridPos = t,
                    this.node.stopAllActions();
                var a = cc.moveTo(.2, e)
                    , o = cc.callFunc(function () {
                        n.refreshView(),
                            i && i()
                    });
                this.node.active ? this.node.runAction(cc.sequence(a, o)) : this.node.setPosition(e),
                    this.setZIndex()
            },
            setZIndex: function () {
                this.node.zIndex = fightZIndexConfig.gridZIndex + (fightControl.mapData.mapWight * this.gridPos.y + (fightControl.mapData.mapWight - this.gridPos.x)),
                    this.selectNode.active && (this.node.zIndex += 100)
            },
            runNewbieTipAction: function () {
                this.node.stopAllActions();
                var e = this.node.scale;
                this.node.runAction(cc.sequence(cc.scaleTo(.1, .9 * e), cc.scaleTo(.2, 1.1 * e), cc.scaleTo(.1, e)).repeat(2))
            },
            refreshArroundSpecialShow: function () {
                var e = fightControl.mapData.getGridDataByPos(this.gridPos);
                e.otherType === gridTypeEm.egg || e.otherType === gridTypeEm.bonfire || e.otherType === gridTypeEm.birdcage || e.otherType === gridTypeEm.flower ? this.specialGridCom && this.specialGridCom.refreshSpecialInfo && this.specialGridCom.refreshSpecialInfo() : this.isIce ? this.clearIceAnimation() : e.isClawball() && this.collectCom.showCollect(e.otherType)
            },
            clearIceAnimation: function () {
                if (!0 === this.isIce) {
                    this.isIce = !1,
                        this.refreshOtherShow();
                    var e = new cc.Node
                        , t = e.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(t, needLoadSpine.ice, "ice", .7, !1),
                        this.node.addChild(e, 1)
                }
            },
            refreshSelect: function (e) {
                if (this.selectNode.active !== e) {
                    this.node.stopActionByTag(i.select);
                    var t = null;
                    (t = e ? this.node.runAction(cc.sequence(cc.scaleTo(.1, 1.2 * gridScale), cc.scaleTo(.1, 1.05 * gridScale), cc.scaleTo(.1, 1.1 * gridScale))) : this.node.runAction(cc.scaleTo(.1, gridScale))) && t.setTag && t.setTag(i.select)
                }
                this.selectNode.active = e,
                    this.setZIndex()
            },
            showDeleteAction: function (e) {
                this.node.runAction(cc.sequence(cc.scaleTo(.3, 0), cc.callFunc(function (e) {
                    e.active = !1,
                        e.scale = gridScale
                }))),
                    e !== gridTypeEm.flower && this.addBombBhostAction()
            },
            showCollect: function () {
                var e = fightControl.mapData.getGridDataByPos(this.gridPos);
                this.collectCom.showCollect(e.otherType)
            },
            addBombBhostAction: function () {
                var e = this.iconNode.getComponent(cc.Sprite).spriteFrame;
                if (e) {
                    var t = e.clone && e.clone()
                        , i = new cc.Node;
                    i.addComponent(cc.Sprite).spriteFrame = t,
                        i.setPosition(this.node.getPosition()),
                        this.parentLayer.node.addChild(i, fightZIndexConfig.lineZIndex + 10),
                        i.scale = 0,
                        i.opacity = 150,
                        i.runAction(cc.sequence(cc.delayTime(.2), cc.scaleTo(.2, 1.8), cc.moveBy(.3, 0, 30), cc.scaleTo(.1, 0), cc.callFunc(function (e) {
                            e.destroy()
                        })))
                }
            },
            bossCreateAction: function (e) {
                var t = this;
                this.node.scale = gridScale,
                    this.refreshView(),
                    this.refreshOtherShow(),
                    this.refreshGridBg(),
                    this.node.setPosition(this.node.x, cc.winSize.height + this.node.height / 2);
                var i = this.parentLayer.getPosByGrid(this.gridPos);
                this.node.stopAllActions(),
                    this.node.runAction(cc.sequence(cc.moveTo(.4, i), cc.callFunc(function (i) {
                        i.active = !0,
                            t.parentLayer.isCanClick = !0,
                            e && e()
                    }))),
                    this.selectNode.active = !1,
                    this.setZIndex()
            },
            resetGrid: function (e) {
                e || this.node.stopAllActions(),
                    this.isIce = !1,
                    this.refreshView(),
                    this.refreshGridBg(),
                    this.refreshOtherShow(!1)
            }
        }),
            cc._RF.pop()
    }
        , {}],
    Grid_Birdcage: [function (e, t) {
        "use strict";
        cc._RF.push(t, "033b3dZjHNC9LInwZxf+myg", "Grid_Birdcage"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                initialize: function (e) {
                    this.gridPos = e;
                    var t = new cc.Node;
                    this.node.getChildByName("gridicon").addChild(t, 2),
                        t.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "grid_" + gridTypeEm.birdcage);
                    var i = new cc.Node;
                    this.node.getChildByName("gridicon").addChild(i, 1),
                        i.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "grid_bird")
                },
                refreshSpecialInfo: function () {
                    fightControl.mapData.getGridDataByPos(this.gridPos).otherType = gridTypeEm.normal,
                        this.node.getChildByName("gridicon").removeAllChildren(),
                        this.addBirdcageAnimation()
                },
                addBirdcageAnimation: function () {
                    for (var e = this.node.getComponent("GridNode"), t = [needLoadParticle.explode, needLoadParticle.fragment, needLoadParticle.feather], i = 0; i < t.length; i++) {
                        var n = new cc.Node
                            , a = n.addComponent(cc.ParticleSystem);
                        a.file = engine.memory.getParticle(t[i]),
                            a.autoRemoveOnFinish = !0,
                            n.setPosition(this.node.getPosition()),
                            this.node.parent.addChild(n, fightZIndexConfig.lineZIndex)
                    }
                    e.refreshView(),
                        e.refreshGridBg(),
                        this.showBirdFlyAction()
                },
                showBirdFlyAction: function () {
                    if (!(fightUILayer.mapLayer.curBirdcageNum <= 0)) {
                        var e = this
                            , t = this.node.getChildByName("gridicon")
                            , i = fightUILayer.bg1Node.getChildByName(collectTypeEm.birdcage).getChildByName("img")
                            , n = i.getPosition()
                            , a = new cc.Node
                            , o = a.addComponent(sp.Skeleton);
                        GameTool.setSkeleton(o, nextLoadSpine.fly, "fly", .7, !0),
                            fightUILayer.mapLayer.node.addChild(a, fightZIndexConfig.lineZIndex);
                        var r = fightUILayer.mapLayer.node.convertToNodeSpaceAR(t.parent.convertToWorldSpaceAR(n));
                        a.setPosition(r);
                        var s = a.parent.convertToNodeSpaceAR(i.parent.convertToWorldSpaceAR(n));
                        s.y += 20;
                        var c = .2 + Math.sqrt(Math.pow(s.x - r.x, 2) + Math.pow(s.y - r.y, 2)) / 820;
                        a.scaleX = s.x - r.x > 0 ? -1 : 1;
                        var l = cc.moveTo(c, s.x, s.y - 20);
                        a.runAction(cc.sequence(l, cc.callFunc(function (t) {
                            fightUILayer.mapLayer.curBirdcageNum--,
                                engine.eventM.emit(event_id.COLLECT_LEVEL_TARGET, {
                                    type: collectTypeEm.birdcage,
                                    num: fightUILayer.mapLayer.curBirdcageNum
                                }),
                                fightUILayer.mapLayer.curBirdcageNum <= 0 && (fightUILayer.mapLayer.hasCollectedOne(),
                                    ccLog("collectAll birdcage")),
                                e.addCollectAnimation(t.getPosition()),
                                t.destroy()
                        })))
                    }
                },
                addCollectAnimation: function (e) {
                    var t = new cc.Node;
                    t.setPosition(e),
                        fightUILayer.mapLayer.node.addChild(t, fightZIndexConfig.lineZIndex);
                    var i = t.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(i, nextLoadSpine.sparkle, "sparkle", .7, !1),
                        i.setCompleteListener(function () {
                            t.destroy()
                        })
                }
            }),
            cc._RF.pop()
    }
        , {}],
    Grid_Bonfire: [function (e, t) {
        "use strict";
        cc._RF.push(t, "600faYvl7pMIJF71kAsUZjQ", "Grid_Bonfire"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    gridPos: null,
                    bonfireLab: null,
                    fireNode: null
                },
                initialize: function () {
                    var e = this.node.getChildByName("gridicon");
                    this.fireNode = new cc.Node,
                        this.fireNode.y = -9,
                        this.fireNode.addComponent(cc.Sprite).spriteFrame = "",
                        e.addChild(this.fireNode),
                        this.initAnimation(),
                        this.refreshSpecialInfo()
                },
                initAnimation: function (e) {
                    this.gridPos = e;
                    var t = new cc.Node;
                    t.y = -6,
                        this.aniNode = t,
                        this.aniNode.active = !1,
                        this.fireNode.addChild(t, 1);
                    var i = t.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(i, needLoadSpine.bonfire, "bonfire", .7, !0),
                        this.spine = i
                },
                initFireLab: function () {
                    var e = new cc.Node;
                    e.color = cc.Color.WHITE,
                        this.aniNode.addChild(e, 2);
                    var t = e.addComponent(cc.Label);
                    t.font = engine.memory.getFont(needLoadFont.fntttf1_font),
                        t.fontSize = 20,
                        t.lineHeight = 20,
                        e.anchorX = 1;
                    var i = e.addComponent(cc.LabelOutline);
                    i.color = cc.color("#000000"),
                        i.width = 2,
                        this.bonfireLab = t,
                        e.setPosition(cc.v2(32, -5))
                },
                refreshSpecialInfo: function () {
                    fightUILayer.mapLayer.needLightFireNum <= 0 || (fightControl.mapData.getGridDataByPos(this.gridPos).curFireNum <= 0 ? (this.fireNode.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "firewood"),
                        this.aniNode.active = !1) : !1 === this.aniNode.active && (fightUILayer.mapLayer.needLightFireNum--,
                            this.aniNode.active = !0,
                            engine.eventM.emit(event_id.COLLECT_LEVEL_TARGET, {
                                type: collectTypeEm.bonfire,
                                num: fightUILayer.mapLayer.needLightFireNum
                            }),
                            this.fireNode.getComponent(cc.Sprite).spriteFrame = "",
                            fightUILayer.mapLayer.needLightFireNum <= 0 && setTimeout(function () {
                                fightUILayer.mapLayer.hasCollectedOne(),
                                    ccLog("getAll BONFIRE")
                            }, 800)))
                }
            }),
            cc._RF.pop()
    }
        , {}],
    Grid_Clawball: [function (e, t) {
        "use strict";
        cc._RF.push(t, "ec368NrG1ZKIaIBAzPzoMhY", "Grid_Clawball"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    isFrontal: null
                },
                initialize: function (e, t) {
                    this.gridPos = e,
                        this.id = t,
                        this.hasCollect = !1;
                    var i = this.node.getChildByName("gridicon")
                        , n = new cc.Node;
                    n.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "grid_" + t),
                        i.addChild(n, 2)
                },
                refreshSpecialInfo: function () {
                    this.node.active = !1,
                        this.showCollectAction()
                },
                showCollectAction: function () {
                    if (!this.hasCollect) {
                        this.hasCollect = !0;
                        var e = this
                            , t = fightUILayer.bg1Node.getChildByName(collectTypeEm.clawball).getChildByName("img")
                            , i = t.getPosition()
                            , n = this.node.getChildByName("gridicon")
                            , a = new cc.Node;
                        a.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "grid_" + this.id),
                            this.node.parent.addChild(a, fightZIndexConfig.lineZIndex + 1);
                        var o = []
                            , r = this.node.parent.convertToNodeSpaceAR(n.parent.convertToWorldSpaceAR(n.getPosition()));
                        a.setPosition(r);
                        var s = a.parent.convertToNodeSpaceAR(t.parent.convertToWorldSpaceAR(i))
                            , c = cc.moveBy(.2, 0, 20);
                        o.push(c),
                            o.push(cc.delayTime(.3));
                        var l = .2 + r.sub(s).mag() / 820
                            , h = cc.moveTo(l, s.x, s.y);
                        l > 0 && o.push(h);
                        var d = cc.callFunc(function (t) {
                            fightUILayer.mapLayer.curClawballNum--,
                                engine.eventM.emit(event_id.COLLECT_LEVEL_TARGET, {
                                    type: collectTypeEm.clawball,
                                    num: fightUILayer.mapLayer.curClawballNum
                                }),
                                fightUILayer.mapLayer.curClawballNum <= 0 && (fightUILayer.mapLayer.hasCollectedOne(),
                                    ccLog("collectAll clawball")),
                                e.addCollectAnimation(t.getPosition()),
                                t.destroy()
                        });
                        o.push(d),
                            a.runAction(cc.sequence(o))
                    }
                },
                getMidwayPositon: function (e, t) {
                    e.y += 50;
                    var i = e.clone();
                    i.x = t.x;
                    var n = Math.abs(t.x - e.x);
                    return t.y - e.y > n ? i.y += n : i.y = t.y,
                        i
                },
                addCollectAnimation: function (e) {
                    var t = new cc.Node;
                    t.setPosition(e),
                        fightUILayer.mapLayer.node.addChild(t, fightZIndexConfig.lineZIndex);
                    var i = t.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(i, nextLoadSpine.sparkle, "sparkle", .7, !1),
                        i.setCompleteListener(function () {
                            t.destroy()
                        })
                }
            }),
            cc._RF.pop()
    }
        , {}],
    Grid_CollectCom: [function (e, t) {
        "use strict";
        cc._RF.push(t, "f6e2amKbjlDXII4yeaXdBIC", "Grid_CollectCom"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    isCollect: null
                },
                refreshInfo: function () {
                    this.isCollect = !1
                },
                showCollect: function (e) {
                    if (!0 !== this.isCollect) {
                        this.isCollect = !0;
                        var t = null
                            , i = null;
                        switch (e) {
                            case gridTypeEm.flower:
                                t = collectTypeEm.flower,
                                    i = "grid_101";
                                break;
                            case gridTypeEm.clawball1:
                            case gridTypeEm.clawball2:
                            case gridTypeEm.clawball3:
                            case gridTypeEm.clawball4:
                                t = collectTypeEm.clawball,
                                    i = "grid_" + gridTypeEm.clawball1,
                                    this.node.active = !1
                        }
                        null != i && (this.addCollectAction(t, i, e),
                            this.addCollectParticle())
                    }
                },
                addCollectAction: function (e, t, i) {
                    var n = this
                        , a = fightUILayer.bg1Node.getChildByName(e).getChildByName("img")
                        , o = a.getPosition()
                        , r = this.node.getChildByName("gridicon")
                        , s = new cc.Node;
                    s.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.fightimg1, t),
                        this.node.parent.addChild(s, fightZIndexConfig.lineZIndex + 1);
                    var c = []
                        , l = this.node.parent.convertToNodeSpaceAR(r.parent.convertToWorldSpaceAR(r.getPosition()));
                    s.setPosition(l);
                    var h = s.parent.convertToNodeSpaceAR(a.parent.convertToWorldSpaceAR(o))
                        , d = cc.spawn(cc.scaleTo(.2, 1.2 * gridScale), cc.moveBy(.2, 0, 20));
                    c.push(d),
                        c.push(cc.delayTime(.3));
                    var u = .1 + l.sub(h).mag() / 2460
                        , m = cc.moveTo(u, h.x, h.y);
                    u > 0 && c.push(m);
                    var g = cc.callFunc(function (t) {
                        n.refreshCollectNum(e, i),
                            n.addCollectAnimation(t.getPosition()),
                            t.destroy()
                    });
                    c.push(g),
                        s.runAction(cc.sequence(c))
                },
                addCollectParticle: function () {
                    var e = new cc.Node
                        , t = e.addComponent(cc.ParticleSystem);
                    t.file = engine.memory.getParticle(needLoadParticle.explode),
                        t.autoRemoveOnFinish = !0,
                        e.setPosition(this.node.getPosition()),
                        this.node.parent.addChild(e, fightZIndexConfig.lineZIndex)
                },
                refreshCollectNum: function (e, t) {
                    var i = -1;
                    switch (t) {
                        case gridTypeEm.flower:
                            i = --fightUILayer.mapLayer.curFlowerNum;
                            break;
                        case gridTypeEm.clawball1:
                            i = --fightUILayer.mapLayer.curClawballNum
                    }
                    i > -1 && engine.eventM.emit(event_id.COLLECT_LEVEL_TARGET, {
                        type: e,
                        num: i
                    }),
                        0 === i && (fightUILayer.mapLayer.hasCollectedOne(),
                            ccLog("collectAll " + e))
                },
                addCollectAnimation: function (e) {
                    var t = new cc.Node;
                    t.setPosition(e),
                        fightUILayer.mapLayer.node.addChild(t, fightZIndexConfig.lineZIndex);
                    var i = t.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(i, nextLoadSpine.sparkle, "sparkle", .7, !1),
                        i.setCompleteListener(function () {
                            t.destroy(),
                                this.aniNode = null
                        })
                },
                getMidwayPositon: function (e, t) {
                    e.y += 50;
                    var i = e.clone();
                    i.x = t.x;
                    var n = Math.abs(t.x - e.x);
                    return t.y - e.y > n ? i.y += n : i.y = t.y,
                        i
                }
            }),
            cc._RF.pop()
    }
        , {}],
    Grid_Demon: [function (e, t) {
        "use strict";
        cc._RF.push(t, "3ca3aaTtNtAnqeXH1ZmdJfn", "Grid_Demon"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    demonNodeArr: null,
                    demonNum: null
                },
                onDestroy: function () {
                    this.demonNodeArr = null,
                        engine.eventM.off(event_id.CREATE_DEMON, this.createDemon, this)
                },
                start: function () {
                    this.demonNodeArr = [],
                        engine.eventM.on(event_id.CREATE_DEMON, this.createDemon, this)
                },
                createDemon: function (e) {
                    this.data = e,
                        this.demonNum = 0,
                        this.getComponent("FightMapLayer").isCanClick = !1,
                        this.addDemonAnimation(e)
                },
                addDemonAnimation: function () {
                    for (var e = this, t = this, i = (this.data.callback,
                        this.data.posArr), n = fightControl.mapData.getGridDataByPos(i[0]), a = fightControl.mapData.getGridDataByPos(i[1]), o = JSON.parse(JSON.stringify(n.demonPosArr)), r = this.getComponent("FightMapLayer"), s = function (i) {
                            var n = o[i]
                                , a = r.getPosByGrid(n)
                                , s = new cc.Node;
                            s._index = e.demonNodeArr.length + 1,
                                s.setPosition(a),
                                e.demonNodeArr.push(s);
                            var c = s.addComponent(sp.Skeleton);
                            GameTool.setSkeleton(c, needLoadSpine.demon, "demon", 1, !1),
                                e.node.addChild(s, fightZIndexConfig.lineZIndex),
                                c.setCompleteListener(function () {
                                    t.createSmokeAni(s, o[t.demonNum], t.demonNum++)
                                })
                        }, c = 0; c < o.length; c++)
                        s(c);
                    n.clearDemonData(),
                        a.clearDemonData()
                },
                createSmokeAni: function (e, t, i) {
                    var n = this
                        , a = e.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(a, needLoadSpine.smoke, "smoke", 1, !1),
                        a.setCompleteListener(function () {
                            n.createArroundGrid(t, i),
                                e.destroy()
                        })
                },
                pauseActions: function () {
                    for (var e = 0; e < this.demonNodeArr.length; e++)
                        this.demonNodeArr[e].getComponent("sp.Skeleton").clearTrack(0)
                },
                resumeActions: function () {
                    for (var e = 0; e < this.demonNodeArr.length; e++)
                        this.demonNodeArr[e].getComponent("sp.Skeleton").setAnimation(0, "demon", !1)
                },
                createArroundGrid: function (e, t) {
                    var i = this
                        , n = this.getComponent("FightMapLayer")
                        , a = fightControl.mapData.getGridDataByPos(e)
                        , o = n.getGridNodeComByPos(e);
                    o.isShow(!0),
                        o.refreshGridBg(),
                        o.refreshView(),
                        o.refreshChoose(),
                        t === this.demonNum - 1 && this.scheduleOnce(function () {
                            i.createDemonOver()
                        }
                            .bind(this), .2),
                        a.clearDemonData()
                },
                createDemonOver: function () {
                    var e = this.getComponent("FightMapLayer");
                    fightControl.isDelayModel() || (e.isCanClick = !0);
                    var t = e.checkGameStatus();
                    this.data.callback && this.data.callback(t, this.data.posArr)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    Grid_Dragonfly: [function (e, t) {
        "use strict";
        cc._RF.push(t, "bff2a/th/dGbI/SnOhehK/y", "Grid_Dragonfly"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    dragonflyNodeArr: null
                },
                onDestroy: function () {
                    this.gridPos = null
                },
                initialize: function () {
                    this.dragonflyNodeArr = [],
                        this.initDragonflyNode()
                },
                refreshDragonNode: function () {
                    this.initDragonflyNode();
                    for (var e = !1, t = 0; t < fightControl.mapData.mapWight; t++)
                        for (var i = 0, n = 0; n < fightControl.mapData.mapHeight; n++) {
                            var a = fightControl.mapData.gridArr[n][t];
                            if (a.gridID === gridTypeEm.dragonfly) {
                                e = !0;
                                var o = a.gridPos
                                    , r = new cc.Node
                                    , s = r.addComponent(sp.Skeleton);
                                GameTool.setSkeleton(s, needLoadSpine.dragonfly, "dragonfly", .3, !0),
                                    this.node.addChild(r, fightZIndexConfig.gridZIndex),
                                    r.setPosition(fightUILayer.mapLayer.getPosByGrid(o)),
                                    r.pos = JSON.parse(JSON.stringify(o)),
                                    r.colIndex = i++,
                                    this.dragonflyNodeArr.push(r),
                                    this.dragonflyNormalAction(r)
                            }
                        }
                    e && this.addDragonflyArrow()
                },
                initDragonflyNode: function () {
                    for (var e = 0; e < this.dragonflyNodeArr.length; e++) {
                        var t = this.dragonflyNodeArr[e];
                        cc.sys.isObjectValid(t) && t.destroy && t.destroy()
                    }
                    this.dragonflyNodeArr = [],
                        this.initArrow()
                },
                updateDragonNodeMove: function () {
                    for (var e = 0; e < this.dragonflyNodeArr.length; e++) {
                        var t = this.dragonflyNodeArr[e];
                        if (t.active) {
                            for (var i = {
                                x: t.pos.x,
                                y: t.pos.y
                            }, n = t.pos.y - 1; n >= 0; n--) {
                                var a = fightControl.mapData.gridArr[n][t.pos.x];
                                if (fightUILayer.mapLayer.getGridNodeComByPos(a.gridPos).node.active)
                                    break;
                                i.y = n
                            }
                            i.y > 0 && (i.y += t.colIndex),
                                isSamePos(i, t.targetPos) || (t.pos = i,
                                    (!t.targetPos || i.y < t.targetPos.y) && (t.targetPos = i,
                                        this.moveAction(t)))
                        }
                    }
                },
                moveAction: function (e) {
                    var t = this;
                    e.stopAllActions();
                    var i = fightUILayer.mapLayer.getPosByGrid(e.targetPos)
                        , n = .2 * (i.y - e.getPosition().y) / 82
                        , a = cc.callFunc(function (e) {
                            0 === e.targetPos.y ? t.showGetDragonflyAction(e) : t.dragonflyNormalAction(e)
                        });
                    e.runAction(cc.sequence(cc.moveTo(n, i), a))
                },
                showGetDragonflyAction: function (e) {
                    var t = fightUILayer.mapLayer;
                    if (!(t.curDragonflyNum <= 0)) {
                        var i = this
                            , n = fightUILayer.bg1Node.getChildByName("dragonfly").getChildByName("img")
                            , a = e.parent.convertToNodeSpaceAR(n.parent.convertToWorldSpaceAR(n.getPosition()))
                            , o = cc.moveTo(.6, a)
                            , r = cc.callFunc(function (e) {
                                e.active = !1,
                                    t.curDragonflyNum--,
                                    engine.eventM.emit(event_id.COLLECT_LEVEL_TARGET, {
                                        type: collectTypeEm.dragonfly,
                                        num: t.curDragonflyNum
                                    }),
                                    t.curDragonflyNum <= 0 && (t.hasCollectedOne(),
                                        ccLog("getAll DRAGONFLY")),
                                    i.addGetDragonflyAni(a)
                            });
                        e.runAction(cc.sequence(o, r))
                    }
                },
                addGetDragonflyAni: function (e) {
                    var t = new cc.Node;
                    t.setPosition(e),
                        this.node.addChild(t, fightZIndexConfig.scoreZIndex);
                    var i = t.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(i, nextLoadSpine.sparkle, "sparkle", 1, !1),
                        i.setCompleteListener(function () {
                            t.destroy()
                        })
                },
                dragonflyNormalAction: function (e) {
                    e.stopAllActions(),
                        e.runAction(cc.sequence(cc.moveBy(2, 0, 5), cc.moveBy(4, 0, -10), cc.moveBy(2, 0, 5)).repeatForever())
                },
                initArrow: function () {
                    if (null != this.dargonArrowArr) {
                        for (var e = 0; e < this.dargonArrowArr.length; e++)
                            this.dargonArrowArr[e] && (this.dargonArrowArr[e].destroy(),
                                this.dargonArrowArr[e] = null);
                        this.dargonArrowArr = []
                    } else
                        this.dargonArrowArr = []
                },
                addDragonflyArrow: function () {
                    this.initArrow();
                    for (var e = 0; e < fightControl.mapData.mapWight; e++) {
                        var t = new cc.Node;
                        t.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "up_arrow"),
                            this.node.addChild(t, fightZIndexConfig.lineZIndex);
                        var i = fightUILayer.mapLayer.getPosByGrid({
                            x: e,
                            y: 0
                        });
                        t.setPosition(i.x, i.y + 50),
                            this.addArrowAction(t),
                            this.dargonArrowArr.push(t)
                    }
                },
                addArrowAction: function (e) {
                    e.runAction(cc.sequence(cc.moveBy(.5, 0, 3), cc.moveBy(1, 0, -6), cc.moveBy(.5, 0, 3)).repeatForever())
                }
            }),
            cc._RF.pop()
    }
        , {}],
    Grid_Egg: [function (e, t) {
        "use strict";
        cc._RF.push(t, "9ae35iEAtRGgK9MmjJHxhGC", "Grid_Egg"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    gridPos: null,
                    needCollectEggTimes: null
                },
                initialize: function (e) {
                    this.gridPos = e;
                    var t = fightControl.mapData.getGridDataByPos(e);
                    this.needCollectEggTimes = t.needCollectEggTimes,
                        this.initAnimation()
                },
                initAnimation: function () {
                    var e = new cc.Node;
                    e.y = -20,
                        this.aniNode = e,
                        this.node.getChildByName("gridicon").addChild(e);
                    var t = e.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(t, needLoadSpine.egg, "phase1", .7, !0),
                        this.spine = t
                },
                refreshSpecialInfo: function () {
                    ccLog("this.gridPos", this.gridPos);
                    var e = fightControl.mapData.getGridDataByPos(this.gridPos);
                    e.otherType === gridTypeEm.egg && this.needCollectEggTimes !== e.needCollectEggTimes && (this.needCollectEggTimes = e.needCollectEggTimes,
                        this.refreshEggAni())
                },
                showCollectAction: function () {
                    if (!(fightUILayer.mapLayer.curEggNum <= 0)) {
                        var e = this
                            , t = fightUILayer.bg1Node.getChildByName(collectTypeEm.egg).getChildByName("img")
                            , i = t.getPosition()
                            , n = new cc.Node
                            , a = n.addComponent(sp.Skeleton);
                        GameTool.setSkeleton(a, nextLoadSpine.fly, "fly", .7, !0),
                            fightUILayer.mapLayer.node.addChild(n, fightZIndexConfig.lineZIndex);
                        var o = fightUILayer.mapLayer.node.convertToNodeSpaceAR(this.aniNode.parent.convertToWorldSpaceAR(i));
                        n.setPosition(o);
                        var r = n.parent.convertToNodeSpaceAR(t.parent.convertToWorldSpaceAR(i));
                        r.y += 20;
                        var s = .2 + Math.sqrt(Math.pow(r.x - o.x, 2) + Math.pow(r.y - o.y, 2)) / 820;
                        n.scaleX = r.x - o.x > 0 ? -1 : 1;
                        var c = cc.moveTo(s, r.x, r.y - 20);
                        n.runAction(cc.sequence(c, cc.callFunc(function (t) {
                            fightUILayer.mapLayer.curEggNum--,
                                engine.eventM.emit(event_id.COLLECT_LEVEL_TARGET, {
                                    type: collectTypeEm.egg,
                                    num: fightUILayer.mapLayer.curEggNum
                                }),
                                fightUILayer.mapLayer.curEggNum <= 0 && (fightUILayer.mapLayer.hasCollectedOne(),
                                    ccLog("getAll EGG")),
                                e.addCollectAnimation(t.getPosition()),
                                t.destroy()
                        })))
                    }
                },
                addCollectAnimation: function (e) {
                    var t = new cc.Node;
                    t.setPosition(e),
                        fightUILayer.mapLayer.node.addChild(t, fightZIndexConfig.lineZIndex);
                    var i = t.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(i, nextLoadSpine.sparkle, "sparkle", .7, !1),
                        i.setCompleteListener(function () {
                            t.destroy()
                        }),
                        this.aniNode.destroy(),
                        this.node.getComponent("GridNode").deleteSpecialCom()
                },
                refreshEggAni: function () {
                    var e = !1
                        , t = "";
                    switch (this.needCollectEggTimes) {
                        case 0:
                            this.node.active = !1,
                                this.showCollectAction();
                            break;
                        case 1:
                            e = !0,
                                t = "phase3";
                            break;
                        case 2:
                            e = !0,
                                t = "phase2";
                            break;
                        case 3:
                            e = !0,
                                t = "phase1"
                    }
                    t && this.spine.setAnimation(0, t, e)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    Grid_Flower: [function (e, t) {
        "use strict";
        cc._RF.push(t, "6fc4eXwOiRAN6DjFll7IcCA", "Grid_Flower"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    isFrontal: null
                },
                initialize: function (e) {
                    this.gridPos = e,
                        this.isFrontal = !0;
                    var t = this.node.getChildByName("gridicon")
                        , i = new cc.Node;
                    i.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "grid_" + gridTypeEm.flower),
                        t.addChild(i, 2)
                },
                refreshSpecialInfo: function () {
                    if (this.isFrontal) {
                        this.isFrontal = !1;
                        var e = this.node.getChildByName("gridicon")
                            , t = this.node.getComponent("GridNode");
                        t.isCanClick = !0,
                            t.refreshView(),
                            t.refreshGridBg(),
                            e.removeAllChildren(),
                            this.addAnimation()
                    }
                },
                addAnimation: function () {
                    var e = new cc.Node;
                    e.setPosition(this.node.getPosition());
                    var t = e.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(t, needLoadSpine.block, "block", .7, !1),
                        t.setCompleteListener(function () {
                            e.destroy()
                        }),
                        this.node.parent.addChild(e, fightZIndexConfig.lineZIndex)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    Grid_Ice: [function (e, t) {
        "use strict";
        cc._RF.push(t, "167f6drodNCKIz/UR7vtun5", "Grid_Ice"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    isIce: null
                },
                initialize: function () {
                    this.isIce = !0,
                        this.otherShowNode = this.node.getChildByName("othershow"),
                        this.otherShowNode.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "iceicon")
                },
                refreshOtherShow: function (e) {
                    e !== gridTypeEm.ice && this.isIce && (this.isIce = !1,
                        this.otherShowNode.getComponent(cc.Sprite).spriteFrame = "",
                        this.addDeicingAni())
                },
                addDeicingAni: function () {
                    this.node.getChildByName("othershow").active = !1;
                    var e = new cc.Node
                        , t = e.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(t, needLoadSpine.ice, "ice", .5, !1),
                        e.y = 0,
                        e.x = 3,
                        this.node.addChild(e, fightZIndexConfig.scoreZIndex),
                        t.setCompleteListener(function () {
                            e.destroy()
                        })
                }
            }),
            cc._RF.pop()
    }
        , {}],
    Grid_Lock: [function (e, t) {
        "use strict";
        cc._RF.push(t, "29ec4SFwWFIva5m/kkQquUq", "Grid_Lock"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    isLock: null
                },
                initialize: function () {
                    this.isLock = !0,
                        this.node.getChildByName("othershow").getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "lockicon")
                },
                refreshOtherShow: function (e) {
                    e !== gridTypeEm.lock && this.isLock && (this.isLock = !1,
                        this.node.getChildByName("othershow").getComponent(cc.Sprite).spriteFrame = "",
                        this.addUnlockAni())
                },
                addUnlockAni: function () {
                    ccLog("\u89e3\u95011111")
                }
            }),
            cc._RF.pop()
    }
        , {}],
    Grid_Magic: [function (e, t) {
        "use strict";
        cc._RF.push(t, "8a18afRJJJJbLsWW2uEkIff", "Grid_Magic"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    isFrontal: null
                },
                initialize: function (e) {
                    this.gridPos = e,
                        this.isFrontal = !0;
                    var t = new cc.Node;
                    this.node.getChildByName("gridicon").addChild(t, 1),
                        t.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "grid_" + gridTypeEm.flower)
                },
                refreshSpecialInfo: function () {
                    var e = this.node.getComponent("GridNode");
                    e.isCanClick = !0,
                        e.refreshView(),
                        e.refreshGridBg(),
                        this.node.getChildByName("gridicon").removeAllChildren()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    Grid_Rocket: [function (e, t) {
        "use strict";
        cc._RF.push(t, "a23dbteDutMTZpLwpJphir0", "Grid_Rocket"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    rocketNum: null,
                    rocketNodeArr: null,
                    rocketSightNodeArr: null
                },
                onDestroy: function () {
                    engine.eventM.off(event_id.CREATE_ROCKET, this.createRocket, this)
                },
                start: function () {
                    this.rocketNum = 0,
                        engine.eventM.on(event_id.CREATE_ROCKET, this.createRocket, this),
                        this.rocketNodeArr = [],
                        this.rocketSightNodeArr = []
                },
                createRocket: function (e) {
                    var t = this.getComponent("FightMapLayer");
                    null == t.bossLayer && (t.isCanClick = !1);
                    for (var i = 0; i < 2; i++)
                        this.rocketNum++,
                            this.addRocketAction(e, i)
                },
                addRocketAction: function (e, t) {
                    var i = this
                        , n = e.posArr
                        , a = n[t]
                        , o = this.getComponent("FightMapLayer")
                        , r = fightControl.mapData.getGridDataByPos(a)
                        , s = o.getRocketPosByGrid(a)
                        , c = r.targetPos
                        , l = o.getRocketPosByGrid(c, !0)
                        , h = this.getPosAngle(a, c)
                        , d = this.getRocketBombPos(l, h)
                        , u = new cc.Node;
                    u.name = "name" + this.rocketNum,
                        u.num = this.rocketNum,
                        u._index = t + 1,
                        u.posArr = JSON.parse(JSON.stringify(n)),
                        this["rocketAniNode" + this.rocketNum] = u,
                        this.rocketNodeArr.push(u),
                        u.setPosition(s),
                        u.scale = .7,
                        u.angle = h;
                    var m = u.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(m, needLoadSpine.rocket, "rocket", .7, !0),
                        this.node.addChild(u, fightZIndexConfig.lineZIndex + 10);
                    var g = cc.moveTo(.3, d)
                        , p = cc.callFunc(function (e) {
                            i.completeRocketAni(e.posArr, e.num, e._index, e)
                        }
                            .bind(u));
                    u.runAction(cc.sequence(g, p)),
                        null == o.bossLayer && this.addRocketSightAnimation(n[t], this.rocketNum)
                },
                addRocketSightAnimation: function (e, t) {
                    var i = this.getComponent("FightMapLayer")
                        , n = fightControl.mapData.getTargetPosByGrid(e)
                        , a = i.getRocketPosByGrid(n)
                        , o = new cc.Node;
                    this.rocketSightNodeArr.push(o),
                        this["sightAniNode" + t] = o,
                        o.setPosition(a);
                    var r = o.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(r, needLoadSpine.sight, "sight", 1, !0),
                        this.node.addChild(o, fightZIndexConfig.lineZIndex)
                },
                completeRocketAni: function (e, t, i, n) {
                    for (var a = this.getComponent("FightMapLayer"), o = [], r = 0; r < e.length; r++) {
                        var s = fightControl.mapData.getTargetPosByGrid(e[r]);
                        s && o.push(s)
                    }
                    if (this.clearRocketNode(n),
                        2 === i) {
                        var c = JSON.parse(JSON.stringify(e));
                        if (null != a.bossLayer)
                            a.bossLayer.bossBeatBack(attackBossTypeEm.rocket),
                                this.addRocketBombAni(n.getPosition());
                        else {
                            var l = fightControl.mapData.getGridDataByPos(o[0]).gridID;
                            l === gridTypeEm.rocket || fightControl.isDelayModel() || (a.isCanClick = !0);
                            var h = a.lineChangeData(o);
                            a.lineStarCom.addLineStar(o),
                                a.refreshFightShow(o[0], o[1]),
                                a.animationComplete(o[0], o[1], h, l)
                        }
                        this.clearRocketData(c)
                    }
                },
                addRocketBombAni: function (e) {
                    var t = this.getComponent("FightMapLayer")
                        , i = new cc.Node;
                    i.setPosition(e),
                        t.node.addChild(i, fightZIndexConfig.lineZIndex + 10);
                    var n = i.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(n, needLoadSpine.bomb, "bomb", .8, !1),
                        n.setCompleteListener(function () {
                            i.destroy()
                        })
                },
                clearRocketNode: function (e) {
                    e.destroy();
                    for (var t = 0; t < this.rocketNodeArr.length; t++)
                        null == this.rocketNodeArr[t] && this.rocketNodeArr.splice(t, 1);
                    for (var i = 0; i < this.rocketSightNodeArr.length; i++)
                        null != this.rocketSightNodeArr[i] && (this.rocketSightNodeArr[i].destroy(),
                            this.rocketSightNodeArr[i] = null);
                    this.rocketNodeArr = [],
                        this.rocketSightNodeArr = []
                },
                checkRocketAniOver: function () {
                    var e = !0;
                    return this.rocketNodeArr instanceof Array && this.rocketNodeArr.length > 0 && (e = !1),
                        e
                },
                clearRocketData: function (e) {
                    if (e instanceof Array)
                        for (var t = 0; t < e.length; t++) {
                            var i = fightControl.mapData.getGridDataByPos(e[t]);
                            i && i.clearRocketData()
                        }
                },
                getPosAngle: function (e, t) {
                    var i = this.getComponent("FightMapLayer")
                        , n = i.getRocketPosByGrid(e)
                        , a = i.getRocketPosByGrid(t, !0)
                        , o = cc.v2(n.x, n.y);
                    return -cc.v2(a.x, a.y).sub(o).signAngle(cc.v2(0, 1)) / Math.PI * 180
                },
                getRocketBombPos: function (e, t) {
                    var i = 50 * Math.cos((t + 90) / 180 * Math.PI)
                        , n = 50 * Math.sin((t + 90) / 180 * Math.PI);
                    return cc.v2(e.x - i, e.y - n)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    HelpLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "57761V+i+ZCRqFxYRe4uPzy", "HelpLayer");
        var i = e("PublicLayer");
        cc.Class({
            extends: i,
            properties: {},
            onDestroy: function () { },
            destroyClass: function () {
                null != this.node && (this.removeEvent(),
                    this.node.destroy())
            },
            initialize: function () {
                var e = {
                    bg: {
                        y: 0,
                        width: 585,
                        height: 697
                    },
                    bg2: {
                        y: 10,
                        width: 538,
                        height: 640
                    },
                    title: {
                        y: 348,
                        txt: getLanguageDic(1024)
                    },
                    close: {
                        x: 273,
                        y: 332
                    }
                };
                this.addEvent();
                for (var t = [itemIDConfig.addTime, itemIDConfig.tips, itemIDConfig.bomb, itemIDConfig.resort], i = 1; i <= 4; i++) {
                    var n = engine.memory.getPrefab(nextLoadPrefab.help_node_prefab);
                    n.getChildByName("itemicon").getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(needLoadImage.mastloadimg1, "itemicon" + getDicData(dataJson.item_json, t[i - 1], "icon")),
                        n.getChildByName("des").getComponent(cc.Label).string = getDicData(dataJson.item_json, t[i - 1], "describe"),
                        n.y = 210 - 140 * (i - 1),
                        this.node.getChildByName("activenode").addChild(n)
                }
                this._super(e)
            }
        }),
            cc._RF.pop()
    }
        , {
        PublicLayer: "PublicLayer"
    }],
    HeroData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "c9db65UF5hGdIzL7DpHH1T6", "HeroData");
        var i = e("GameStrongData")
            , n = e("GameAchievementData")
            , a = e("GameDailyTaskData")
            , o = e("GameGradeData")
            , r = e("RaceLampData")
            , s = e("LevelData")
            , c = e("FreindChallengeData");
        window.GameModelEnum = cc.Enum({
            normal: 1,
            challenge: 2
        }),
            cc.Class({
                properties: {
                    gold: null,
                    diamond: null,
                    isStopMusic: null,
                    itemObj: null,
                    levelData: null,
                    strongData: null,
                    achievementData: null,
                    gradeData: null,
                    dailyGift: null,
                    loginDay: null,
                    dailyTaskData: null,
                    isRewardSurprise: null,
                    lastRewardSurpriseTime: null,
                    taskRefreshTime: null,
                    gameConfig: null,
                    bestScore: null,
                    newElementObj: null,
                    newModeObj: null,
                    clearLv1: null,
                    curLevel: null,
                    maxLevel: null,
                    totalScore: null,
                    getStarBoxNum: null,
                    puzzleRewardObj: null,
                    puzzleImgObj: null,
                    raceLampData: null,
                    dailyGiftReward: null,
                    todayFirst: null,
                    curDayBeforeDawnTime: null,
                    surpriseCD: null,
                    dailyTaskCD: null,
                    smallGameTimes_date: -1,
                    smallGameTimes_zuma: 3,
                    smallGameTimes_qs: 3,
                    smallGame_show_red_date: -1,
                    gameMode: GameModelEnum.normal
                },
                initialize: function () {
                    this.todayFirst = !1
                },
                updateManageFun: function (e) {
                    if (e > this.curDayBeforeDawnTime) {
                        var t = new Date;
                        this.loginDay = 100 * t.getMonth() + t.getDate(),
                            this.isRefreshDay(!0),
                            this.getCurDayBeforeDawnTime()
                    }
                    this.refreshSurprise(),
                        this.refreshDailyTask(),
                        this.raceLampData.refreshRaceLamp()
                },
                initData: function (e) {
                    null == e && (e = {}),
                        ccLog("get data:"),
                        ccLog(e),
                        this.gold = null == e.gold ? 10 : e.gold,
                        this.diamond = null == e.diamond ? 10 : e.diamond,
                        1 == debugtest.money && (this.diamond = 1e11),
                        this.isStopMusic = null == e.isStopMusic ? 0 : e.isStopMusic,
                        this.itemObj = null == e.itemObj ? {} : e.itemObj,
                        this.dailyGift = null == e.dailyGift ? 0 : e.dailyGift,
                        this.isRewardSurprise = null == e.isRewardSurprise ? 0 : e.isRewardSurprise,
                        this.lastRewardSurpriseTime = null == e.lastRewardSurpriseTime ? engine.gameTime.localTime : e.lastRewardSurpriseTime,
                        this.taskRefreshTime = null == e.taskRefreshTime ? engine.gameTime.localTime : e.taskRefreshTime,
                        this.gameConfig = e.gameConfig,
                        null == e.clearLv1 ? (this.gameConfig = null,
                            this.clearLv1 = 1) : this.clearLv1 = e.clearLv1,
                        this.bestScore = null == e.bestScore ? 0 : e.bestScore,
                        this.totalScore = null == e.totalScore ? 0 : e.totalScore,
                        this.curLevel = null == e.curLevel ? 1 : e.curLevel,
                        this.maxLevel = null == e.maxLevel ? this.curLevel : e.maxLevel,
                        this.getStarBoxNum = null == e.getStarBoxNum ? 0 : e.getStarBoxNum,
                        this.newElementObj = null == e.newElementObj ? {} : e.newElementObj,
                        this.newModeObj = null == e.newModeObj ? {} : e.newModeObj,
                        this.puzzleRewardObj = null == e.puzzleRewardObj ? {} : e.puzzleRewardObj,
                        this.puzzleImgObj = null == e.puzzleImgObj ? {} : e.puzzleImgObj,
                        this.smallGameTimes_date = null == e.smallGameTimes_date ? -1 : e.smallGameTimes_date,
                        this.smallGameTimes_zuma = null == e.smallGameTimes_zuma ? 3 : e.smallGameTimes_zuma,
                        this.smallGameTimes_qs = null == e.smallGameTimes_qs ? 3 : e.smallGameTimes_qs,
                        this.smallGame_show_red_date = null == e.smallGame_show_red_date ? -1 : e.smallGame_show_red_date,
                        debugtest.clearSmallGameTime && (this.smallGameTimes_zuma = this.smallGameTimes_qs = 3),
                        (new Date).getDate() != this.smallGameTimes_date && (this.smallGameTimes_date = (new Date).getDate(),
                            this.smallGameTimes_zuma = 3,
                            this.smallGameTimes_qs = 3),
                        this.levelData = new s,
                        this.levelData.initialize(e.levelData),
                        this.strongData = new i,
                        this.strongData.initialize(e.strongData),
                        this.achievementData = new n,
                        this.achievementData.initialize(e.achievementData),
                        this.gradeData = new o,
                        this.gradeData.initialize(e.gradeData),
                        this.dailyTaskData = new a,
                        this.dailyTaskData.initialize(e.dailyTaskData),
                        this.raceLampData = new r,
                        this.raceLampData.initialize(),
                        1 == debugtest.openLevel && this.maxLevel < getGlobleDic(36) && (this.maxLevel = getGlobleDic(36),
                            this.levelData.supEmptyLevelData()),
                        this.challengeData = new c,
                        this.challengeData.initialize(e.challengeRoomData);
                    var t = new Date
                        , l = 100 * t.getMonth() + t.getDate()
                        , h = !1;
                    null == e.loginDay ? (this.loginDay = l,
                        h = !0) : (this.loginDay = e.loginDay,
                            this.loginDay != l && (this.loginDay = l,
                                h = !0)),
                        this.isRefreshDay(h),
                        this.getCurDayBeforeDawnTime(),
                        engine.gameTime.updateManageFun = this.updateManageFun.bind(this)
                },
                isRefreshDay: function (e) {
                    1 == e && (this.dailyGift = 0,
                        this.todayFirst = !0,
                        engine.eventM.emit(event_id.REFRESH_DAILY_GIFT_BTN, !0))
                },
                rewardSurprise: function () {
                    this.lastRewardSurpriseTime = engine.gameTime.localTime,
                        this.isRewardSurprise = 1,
                        engine.eventM.emit(event_id.REFRESH_SURPRISE_PUSH)
                },
                refreshSurprise: function () {
                    null != this.surpriseCD && 1 == this.isRewardSurprise && engine.gameTime.localTime >= this.lastRewardSurpriseTime + this.surpriseCD && (this.isRewardSurprise = 0,
                        engine.eventM.emit(event_id.REFRESH_SURPRISE_PUSH))
                },
                reWardBossGift: function () { },
                refreshDailyTask: function () {
                    null != this.dailyTaskCD && engine.gameTime.localTime >= this.taskRefreshTime + this.dailyTaskCD && (null != this.dailyTaskData && this.dailyTaskData.refreshTaskData(),
                        this.taskRefreshTime = engine.gameTime.localTime,
                        engine.eventM.emit(event_id.REFRESH_DAILY_TASK_PUSH),
                        engine.eventM.emit(event_id.REFRESH_DAILY_TASK_LAYER))
                },
                getCurDayBeforeDawnTime: function () {
                    var e = new Date;
                    e.setTime(engine.gameTime.localTime),
                        e.setDate(e.getDate() + 1),
                        e.setHours(0),
                        e.setMinutes(0),
                        e.setSeconds(0),
                        this.curDayBeforeDawnTime = e.getTime()
                },
                analysisDataByDic: function () {
                    this.dailyGiftReward = analysisItemInfoByDic(getGlobleDic(13)),
                        this.surpriseCD = 36e5 * getGlobleDic(14),
                        this.dailyTaskCD = 36e5 * getGlobleDic(20)
                },
                getSaveData: function () {
                    var e = {};
                    return e.gold = this.gold,
                        e.diamond = this.diamond,
                        e.isStopMusic = this.isStopMusic,
                        e.itemObj = this.itemObj,
                        e.dailyGift = this.dailyGift,
                        e.loginDay = this.loginDay,
                        e.strongData = this.strongData.getSaveData(),
                        e.achievementData = this.achievementData.getSaveData(),
                        e.dailyTaskData = this.dailyTaskData.getSaveData(),
                        e.gradeData = this.gradeData.getSaveData(),
                        e.levelData = this.levelData.getSaveData(),
                        e.puzzleRewardObj = this.levelData.getSavePuzzleReward(),
                        e.puzzleImgObj = this.levelData.getSavePuzzleImg(),
                        e.challengeRoomData = this.challengeData.getSaveData(),
                        e.isRewardSurprise = this.isRewardSurprise,
                        e.lastRewardSurpriseTime = this.lastRewardSurpriseTime,
                        e.taskRefreshTime = this.taskRefreshTime,
                        e.gameConfig = this.gameConfig,
                        e.bestScore = this.bestScore,
                        e.totalScore = this.totalScore,
                        e.curLevel = this.curLevel,
                        e.maxLevel = this.maxLevel,
                        e.getStarBoxNum = this.getStarBoxNum,
                        e.newElementObj = this.newElementObj,
                        e.newModeObj = this.newModeObj,
                        e.clearLv1 = this.clearLv1,
                        e.bossHp = this.bossHp,
                        e.smallGameTimes_date = this.smallGameTimes_date,
                        e.smallGameTimes_zuma = this.smallGameTimes_zuma,
                        e.smallGameTimes_qs = this.smallGameTimes_qs,
                        e.smallGame_show_red_date = this.smallGame_show_red_date,
                        e
                },
                saveData: function (e) {
                    var t = new Object;
                    t[fbSaveDataKey[0]] = this.getSaveData(),
                        gameSDK.saveUserData(t, e)
                },
                addItemNum: function (e, t) {
                    null == this.itemObj[e] && (this.itemObj[e] = 0),
                        this.itemObj[e] += t,
                        engine.eventM.emit(event_id.REFRESH_ITEM_NUM, {
                            index: e,
                            isID: !0
                        })
                },
                getItemNum: function (e) {
                    var t = 0;
                    return null != this.itemObj[e] && (t += this.itemObj[e]),
                        t
                },
                addGem: function (e) {
                    this.diamond += e,
                        engine.eventM.emit(event_id.REFRESH_GEM_NUMBER),
                        engine.eventM.emit(event_id.REFRESH_ACHIEVEMENT_OR_STRONGER_GEM),
                        engine.eventM.emit(event_id.REFRESH_STRONGER_NODE_PUSH)
                },
                addGold: function (e) {
                    this.gold += e,
                        engine.eventM.emit(event_id.REFRESH_GOLD_NUMBER)
                },
                addItemByObj: function (e) {
                    for (var t = 0; t < e.length; t++) {
                        var i = e[t];
                        switch (i.id) {
                            case itemIDConfig.gem:
                                this.addGem(i.num);
                                break;
                            default:
                                this.addItemNum(i.id, i.num)
                        }
                    }
                }
            }),
            cc._RF.pop()
    }
        , {
        FreindChallengeData: "FreindChallengeData",
        GameAchievementData: "GameAchievementData",
        GameDailyTaskData: "GameDailyTaskData",
        GameGradeData: "GameGradeData",
        GameStrongData: "GameStrongData",
        LevelData: "LevelData",
        RaceLampData: "RaceLampData"
    }],
    HttpSendData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "79997FCxHVJbZyB/pn5hb9e", "HttpSendData"),
            cc.Class({
                properties: {},
                sendHttp: function (e, t, i) {
                    var n = JSON.stringify(t)
                        , a = ((new Date).getTime(),
                            new XMLHttpRequest);
                    a.open("POST", e),
                        a.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"),
                        a.callfun = i,
                        a.jsonStr = n,
                        ccLog("jsonStr: " + n),
                        a.url = e,
                        ccLog("url: " + e),
                        a.onreadystatechange = function () {
                            if (4 == a.readyState && a.status >= 200 && a.status <= 207) {
                                ccLog(".........." + a.responseText);
                                var t = JSON.parse(a.responseText);
                                ccLog("\u534f\u8bae\u8fd4\u56de\uff1a" + e),
                                    ccLog(t),
                                    null != a.callfun && a.callfun(t)
                            }
                        }
                        ,
                        a.send(n)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    LevelData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "5f624k4+MZJmKdBmhQZIgyx", "LevelData"),
            cc.Class({
                properties: {
                    levelDataObj: null,
                    puzzleData: null,
                    puzzleRewardObj: null,
                    puzzleImgObj: null,
                    lockPuzzleGridObj: null
                },
                initialize: function (e) {
                    this.levelDataObj = {},
                        this.supEmptyLevelData(e),
                        this.fmtPuzzleData()
                },
                testPuzzleData: function () {
                    heroData.maxLevel = 500,
                        this.puzzleData.forEach(function (e) {
                            e.lightNum = 20,
                                e.data.forEach(function (e) {
                                    e.star = 2
                                })
                        })
                },
                getCulLevelData: function (e) {
                    var t = this.levelDataObj[e];
                    return null == t && (t = this.createNewLevelData(e, 0)),
                        t
                },
                supEmptyLevelData: function (e) {
                    null == e && (e = this.levelDataObj);
                    for (var t = heroData.maxLevel, i = 1; i <= t; i++)
                        null == e[i] ? i == t ? this.createNewLevelData(i, 0) : this.createNewLevelData(i, 3) : this.levelDataObj[i] = e[i]
                },
                createNewLevelData: function (e, t) {
                    var i = {};
                    return null == this.levelDataObj[e] && (i.level = e,
                        i.star = t || 0,
                        this.levelDataObj[e] = i),
                        i
                },
                setLevelStar: function (e, t) {
                    var i = this.getCulLevelData(e);
                    null == i.star ? i.star = t : i.star < t && (i.star = t),
                        this.updatePuzzleData(e, t)
                },
                getStarNumByLevel: function (e) {
                    return this.levelDataObj[e] && this.levelDataObj[e].star ? this.levelDataObj[e].star : 0
                },
                getLevelTotalStarNum: function () {
                    var e = 0;
                    for (var t in this.levelDataObj) {
                        var i = this.levelDataObj[t];
                        i && i.star && (e += i.star)
                    }
                    return e
                },
                getNextBoxNeedStar: function () {
                    var e = heroData.levelData.getLevelTotalStarNum()
                        , t = (heroData.getStarBoxNum,
                            getDicData(dataJson.treasurechest_json));
                    if (e >= getGlobleDic(38))
                        return e % getGlobleDic(37) == 0 ? e + getGlobleDic(37) : e + getGlobleDic(37) - (e - getGlobleDic(38)) % getGlobleDic(37);
                    for (var i in t)
                        if (!(t[i].weight > 0) && e < t[i].star)
                            return t[i].star;
                    return getGlobleDic(38)
                },
                getStarCanGetBox: function () {
                    var e = heroData.getStarBoxNum
                        , t = getDicData(dataJson.treasurechest_json)
                        , i = heroData.levelData.getLevelTotalStarNum()
                        , n = 0;
                    for (var a in t)
                        t[a].weight > 0 || i >= t[a].star && n++;
                    return i >= getGlobleDic(38) && (n += Math.ceil((i - getGlobleDic(38)) / getGlobleDic(37))),
                        n - e
                },
                getSaveData: function () {
                    return this.levelDataObj
                },
                getSavePuzzleReward: function () {
                    return this.puzzleRewardObj
                },
                getSavePuzzleImg: function () {
                    return this.puzzleImgObj
                },
                fmtPuzzleData: function () {
                    this.puzzleRewardObj = heroData.puzzleRewardObj,
                        this.puzzleImgObj = heroData.puzzleImgObj || {};
                    for (var e = [], t = heroData.maxLevel > 540 ? heroData.maxLevel : 540, i = puzzleCellRow * puzzleCellCol, n = 0; n < Math.ceil(t / i); n++) {
                        e[n] = {},
                            e[n].data = [];
                        for (var a = 0, o = 0; o < i; o++) {
                            var r = n * i + o
                                , s = {};
                            s.level = r + 1,
                                s.star = this.levelDataObj[r + 1] ? this.levelDataObj[r + 1].star : 0,
                                e[n].data.push(s),
                                s.star >= 3 && a++
                        }
                        e[n].lightNum = a,
                            this.setPuzzleImgDataByIndex(n)
                    }
                    this.puzzleData = e,
                        this.fmtPuzzleGridData()
                },
                fmtPuzzleGridData: function () {
                    this.lockPuzzleGridObj = {};
                    for (var e = 0; e < this.puzzleData.length; e++)
                        if (this.puzzleData[e].lightNum >= 30) {
                            var t = this.getPuzzleImgIndexByIndex(e);
                            this.lockPuzzleGridObj[t] || (this.lockPuzzleGridObj[t] = this.getPuzzleGridID(e))
                        }
                },
                updatePuzzleData: function (e, t) {
                    var i = this.getPuzzleIndexByLevel(e)
                        , n = (e - 1) % (puzzleCellRow * puzzleCellCol)
                        , a = this.puzzleData[i];
                    a || (a = this.createNewPuzzleData(i)),
                        a.data[n].star = t || 0,
                        this.refreshLightNum(a),
                        a.lightNum >= 30 && this.updatePuzzleGridData(i),
                        this.setPuzzleImgDataByLevel(e)
                },
                refreshLightNum: function (e) {
                    for (var t = e.data, i = 0, n = 0; n < t.length; n++)
                        t[n].star >= 3 && i++;
                    e.lightNum = i
                },
                updatePuzzleGridData: function (e) {
                    var t = this.getPuzzleImgIndexByIndex(e);
                    this.lockPuzzleGridObj[t] || (this.lockPuzzleGridObj[t] = this.getPuzzleGridID(e))
                },
                createNewPuzzleData: function (e) {
                    var t = this.puzzleData[e] = {};
                    t.data = [];
                    for (var i = 0; i < puzzleCellRow * puzzleCellCol; i++) {
                        var n = {
                            star: 0
                        };
                        n.level = e * puzzleCellRow * puzzleCellCol + i + 1,
                            t.data.push(n)
                    }
                    return t
                },
                getPuzzleIndexByLevel: function (e) {
                    return (e - 1) / (puzzleCellRow * puzzleCellCol) | 0
                },
                getPuzzleReward: function (e) {
                    this.puzzleRewardObj[e] = 1
                },
                getPuzzleGem: function () {
                    return 50
                },
                getPuzzleDataByLevel: function (e) {
                    var t = this.getPuzzleIndexByLevel(e);
                    return this.puzzleData[t]
                },
                setPuzzleImgDataByLevel: function (e) {
                    var t = (e - 1) / (puzzleCellRow * puzzleCellCol) | 0;
                    this.setPuzzleImgDataByIndex(t)
                },
                setPuzzleImgDataByIndex: function (e) {
                    if (this.puzzleImgObj[e],
                        e < 20)
                        this.puzzleImgObj[e] = e + 1;
                    else {
                        for (var t = [], i = e % 20 < 10 ? 0 : 10, n = e - e % 10, a = i; a < i + 10; a++)
                            t.push(a + 1);
                        t.sort(function () {
                            return Math.random() - .5
                        });
                        for (var o = 0; o < t.length; o++)
                            this.puzzleImgObj[n + o] = t[o]
                    }
                },
                getPuzzleImgIndexByLevel: function (e) {
                    var t = Math.floor((e - 1) / (puzzleCellRow * puzzleCellCol));
                    return this.getPuzzleImgIndexByIndex(t)
                },
                getPuzzleImgIndexByIndex: function (e) {
                    return this.puzzleData && !this.puzzleData[e] && this.createNewPuzzleData(e),
                        this.puzzleImgObj[e] || this.setPuzzleImgDataByIndex(e),
                        this.puzzleImgObj[e]
                },
                getPuzzleGridID: function (e) {
                    return 2e3 + this.getPuzzleImgIndexByIndex(e)
                },
                getPuzzlePush: function () {
                    for (var e = 0; e < this.puzzleData.length; e++)
                        if (this.puzzleData[e] && this.puzzleData[e].lightNum >= 30 && !this.puzzleRewardObj[e])
                            return !0;
                    return !1
                }
            }),
            cc._RF.pop()
    }
        , {}],
    LevelOverControl: [function (e, t) {
        "use strict";
        cc._RF.push(t, "fc182HuMB1DBqkXZxon+yri", "LevelOverControl"),
            cc.Class({
                properties: {},
                initialize: function () { },
                saveCustom: function () {
                    gaLogEvent.logByDate("\u5173\u5361\u6210\u529f", fightControl.curLevel),
                        gameSDK.logEvent("guankachenggong", fightControl.curLevel, {
                            guankachenggong: "guankachenggong"
                        })
                },
                customLevelEvent: function () {
                    heroData.gameMode === GameModelEnum.challenge ? this.saveChallengeScore() : (this.saveLevel(),
                        this.saveBestScore(),
                        this.saveTotalScore(),
                        ccLog("saveTotalScore", heroData.totalScore)),
                        this.saveCustom(),
                        this.saveAchievement(),
                        this.saveTask(),
                        fightControl.addScore = 0,
                        ccLog("saveBestScore", heroData.bestScore),
                        heroData.saveData()
                },
                saveAchievement: function () {
                    heroData.achievementData.addProgress(achievementTypeEm.passLevel, fightControl.curLevel),
                        heroData.achievementData.addProgress(achievementTypeEm.maxScore, fightControl.curScore)
                },
                saveLevel: function () {
                    heroData.curLevel = fightControl.curLevel,
                        heroData.maxLevel < heroData.curLevel + 1 && (heroData.maxLevel = heroData.curLevel + 1,
                            heroData.levelData.createNewLevelData(heroData.maxLevel, 0),
                            ccLog("\u4fdd\u5b58\u6700\u5927\u5173\u5361", heroData.maxLevel)),
                        heroData.levelData.setLevelStar(heroData.curLevel, fightControl.curLevelStar),
                        ccLog("\u7b2c " + heroData.curLevel + "\u5173  \u661f\u661f\u6570\u4e3a " + fightControl.curLevelStar),
                        ccLog("\u4fdd\u5b58\u5f53\u524d\u5173\u5361", heroData.curLevel)
                },
                saveTotalScore: function () {
                    heroData.totalScore = fightControl.curScore
                },
                saveBestScore: function () {
                    fightControl.curScore > heroData.bestScore && (heroData.bestScore = fightControl.curScore),
                        gameSDK.leaderboard.setScoreAsync(heroData.bestScore),
                        fightControl.curLevel > 2 && fightControl.curLevel % 2 > 0 && gameSDK.sendToFBBestScore(fightControl.curScore)
                },
                saveChallengeScore: function () {
                    fightControl.challengeScore > heroData.challengeData.maxChallengeScore && (heroData.challengeData.maxChallengeScore = fightControl.challengeScore),
                        fightControl.challengeScore > heroData.challengeData.getCurRoomScore() && heroData.challengeData.setMyScoreByRoom(fightControl.challengeScore),
                        gameSDK.challengeLeaderboard.setScoreAsync(heroData.challengeData.maxChallengeScore),
                        fightControl.curLevel > 2 && fightControl.curLevel % 2 > 0 && ccLog("\u63d0\u4ea4\u6700\u5927\u6311\u6218\u6392\u884c\u5206\u6570")
                },
                saveTask: function () {
                    heroData.dailyTaskData.addTaskPro(dailyTaskTypeEm.passLevel),
                        heroData.dailyTaskData.addTaskPro(dailyTaskTypeEm.getSort, fightControl.addScore)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    LevelPageNode: [function (e, t) {
        "use strict";
        cc._RF.push(t, "4f0b9k0YNRJNq+owzrCabZm", "LevelPageNode"),
            e("GameLoadTexture"),
            window.pagePuzzleRow = 3,
            window.pagePuzzleCol = 3,
            cc.Class({
                extends: cc.Component,
                properties: {
                    cellSize: null,
                    puzzleSize: null,
                    pageIndex: null
                },
                initialize: function (e) {
                    this.pageIndex = e,
                        this.puzzleSize = this.node.getContentSize(),
                        this.cellSize = cc.size(this.puzzleSize.width / puzzleCellCol, this.puzzleSize.height / puzzleCellRow);
                    for (var t = 0; t < pagePuzzleRow; t++)
                        for (var i = 0; i < pagePuzzleCol; i++) {
                            var n = engine.memory.getPrefab(nextLoadPrefab.puzzle_node_prefab);
                            this.node.addChild(n),
                                n.addComponent("LevelPuzzleNode").initialize(e, t, i),
                                n.setPosition(this.getPuzzlePosition(i, t))
                        }
                },
                fmtPuzzleData: function (e) {
                    var t = heroData.puzzleData[e];
                    t || (t = []);
                    for (var i = 0; i < pagePuzzleRow * pagePuzzleCol; i++)
                        t[i] = []
                },
                getPuzzlePosition: function (e, t) {
                    var i = new cc.v2(0, 0);
                    return i.x = 220 * (e - 1 * (pagePuzzleCol - 1) / 2),
                        i.y = -330 * (t - 1 * (pagePuzzleRow - 1) / 2) + 50,
                        i
                }
            }),
            cc._RF.pop()
    }
        , {
        GameLoadTexture: "GameLoadTexture"
    }],
    LevelPageView: [function (e, t) {
        "use strict";
        var i;
        cc._RF.push(t, "cf196+IQjFBtppbRL3QUE3P", "LevelPageView"),
            cc.Class({
                extends: cc.Component,
                properties: (i = {
                    curIndex: null,
                    curData: null,
                    moveLayer: null,
                    eachRowNum: 3,
                    maxPage: 20
                },
                    i.curIndex = null,
                    i.pageArr = null,
                    i.puzzleLayerPointArr = null,
                    i.curPuzzleLayerPoint = null,
                    i.curPageIndex = null,
                    i.lastPageIndex = null,
                    i),
                onDestroy: function () { },
                start: function () {
                    cc.director.getScene().getChildByName("main_prefab").active = !1
                },
                destroyClass: function () {
                    this.removeEvent(),
                        this.node.destroy()
                },
                addEvent: function () {
                    this.node.getChildByName("homebtn").on(cc.Node.EventType.TOUCH_END, this.clickHomeBtn, this),
                        this.node.getChildByName("giftSpineNode").getChildByName("clickNode").on(cc.Node.EventType.TOUCH_END, this.clickGiftBtn, this)
                },
                removeEvent: function () {
                    this.node.getChildByName("homebtn").off(cc.Node.EventType.TOUCH_END, this.clickHomeBtn, this),
                        this.node.getChildByName("giftSpineNode").getChildByName("clickNode").off(cc.Node.EventType.TOUCH_END, this.clickGiftBtn, this)
                },
                initialize: function () {
                    this.bgNode = this.node.getChildByName("bg"),
                        this.addEvent(),
                        this.initPageData();
                    var e = this.node.getChildByName("puzzleLayerPoint");
                    this.curPuzzleLayerPoint = e.getChildByName("curPuzzle"),
                        this.puzzleLayerPointArr = [];
                    for (var t = 0; t < e.childrenCount; t++) {
                        var i = e.children[t];
                        i.name.indexOf("point") > -1 && (this.puzzleLayerPointArr.push(i),
                            i.basePos = i.getPosition())
                    }
                    var n = this.node.getChildByName("pageview");
                    this.pageView = n.getComponent(cc.PageView);
                    for (var a = 0; a <= this.curIndex; a++)
                        this.addPageViewNode(this.pageArr[a], a);
                    this.pageView.scrollToRight(0),
                        this.pageView.setCurrentPageIndex(this.curIndex);
                    for (var o = this.curIndex + 1; o < this.pageArr.length; o++)
                        this.addPageViewNode(this.pageArr[o], o);
                    if (this.refreshStarBoxInfo(),
                        this.curPageIndex = this.lastPageIndex = this.curIndex,
                        this.curPageIndex < 3)
                        this.moveCurPagePoint(this.curPageIndex + 1);
                    else if (this.curPageIndex > this.pageNum - 3) {
                        var r = this.puzzleLayerPointArr.length - (this.pageNum - 1 - this.curPageIndex) - 2;
                        this.moveCurPagePoint(r)
                    }
                    this.addPageViewCallback(),
                        this.pageViewClick(this.pageView)
                },
                initPageData: function () {
                    this.pageArr = [];
                    for (var e = heroData.levelData.getPuzzleIndexByLevel(heroData.maxLevel), t = (this.curIndex = e,
                        0); t < heroData.levelData.puzzleData.length; t++)
                        this.pageArr.push(t);
                    this.getPageNum()
                },
                getPageNum: function () {
                    var e = heroData.levelData.puzzleData;
                    return this.pageNum = e.length,
                        this.pageNum
                },
                addPageViewCallback: function () {
                    var e = new cc.Component.EventHandler;
                    e.target = this.node,
                        e.component = "LevelPageView",
                        e.handler = "pageViewClick",
                        this.pageView.pageEvents.push(e)
                },
                pageViewClick: function (e) {
                    var t = e.node.getComponent(cc.PageView).getCurrentPageIndex();
                    this.pageView.getPages().forEach(function (e, i) {
                        Math.abs(t - i) <= 1 && (e.getChildByName("activenode").active,
                            e.getComponent("LevelPuzzleLayer").refreshUI()),
                            e.getChildByName("activenode").active = Math.abs(t - i) <= 1
                    }),
                        this.refreshLayerPoint()
                },
                addPageViewNode: function (e, t) {
                    var i = this.createPageNode(e);
                    this.pageView.insertPage(i, t)
                },
                createPageNode: function (e) {
                    var t = engine.memory.getPrefab(nextLoadPrefab.puzzle_layer_prefab);
                    return t.addComponent("LevelPuzzleLayer").initialize(e),
                        t
                },
                refreshStarBoxInfo: function () {
                    var e = heroData.levelData.getLevelTotalStarNum()
                        , t = heroData.levelData.getNextBoxNeedStar()
                        , i = this.node.getChildByName("starnum").getComponent(cc.Label);
                    i.string = e + "/" + t,
                        i._forceUpdateRenderData(!0),
                        this.node.getChildByName("starIcon").x = i.node.x + i.node.width / 2 + this.node.getChildByName("starIcon").width;
                    var n = heroData.levelData.getStarCanGetBox();
                    this.canGetBoxNum = n;
                    var a = this.node.getChildByName("giftSpineNode")
                        , o = this.node.getChildByName("qipao")
                        , r = this.node.getChildByName("giftIconNode");
                    o.stopAllActions(),
                        n > 0 ? (a.active = !0,
                            r.active = !1,
                            o.active = !0,
                            o.getChildByName("num").getComponent("GameArtWord").setString(n + "")) : (a.active = !1,
                                r.active = !0,
                                o.active = !1)
                },
                clickHomeBtn: function () {
                    cc.director.getScene().getChildByName("main_prefab").active = !0,
                        this.destroyClass()
                },
                clickGiftBtn: function () {
                    if (this.canGetBoxNum > 0) {
                        var e = {};
                        e.openType = starBoxOpenTypeEm.chooseLevel,
                            e.callback = this.refreshStarBoxInfo.bind(this),
                            openWindowLayer(openTypeEm.starBox, e)
                    }
                },
                refreshLayerPoint: function () {
                    var e = this.pageView.getCurrentPageIndex();
                    if (this.curPageIndex = e,
                        null !== this.lastPageIndex && this.curPageIndex !== this.lastPageIndex) {
                        var t = this.curPageIndex - this.lastPageIndex
                            , i = 3;
                        e < 2 && t < 0 || e < 3 && t > 0 ? (i = e + 1,
                            this.moveCurPagePoint(i)) : e > this.pageNum - 4 && t < 0 || e > this.pageNum - 3 && t > 0 ? (i = 4 - (this.pageNum - 1 - e) + 1,
                                this.moveCurPagePoint(i)) : this.moveAllPoint(this.curPageIndex - this.lastPageIndex, i)
                    }
                },
                moveAllPoint: function (e, t) {
                    var i = this
                        , n = e *= -50;
                    this.puzzleLayerPointArr.forEach(function (e, a) {
                        e.stopAllActions(),
                            a === i.puzzleLayerPointArr.length - 1 ? e.runAction(cc.sequence(cc.moveTo(.3, e.basePos.x + n, e.basePos.y), cc.callFunc(function () {
                                i.puzzleLayerPointArr.forEach(function (e) {
                                    e.setPosition(e.basePos)
                                }),
                                    i.moveCurPagePoint(t)
                            }))) : e.runAction(cc.moveTo(.3, e.basePos.x + n, e.basePos.y))
                    })
                },
                moveCurPagePoint: function (e) {
                    this.curPuzzleLayerPoint.setPosition(this.puzzleLayerPointArr[e].getPosition()),
                        this.lastPageIndex = this.curPageIndex
                }
            }),
            cc._RF.pop()
    }
        , {}],
    LevelPuzzleCellNode: [function (e, t) {
        "use strict";
        cc._RF.push(t, "a4ed6QAiUpLPbQkmHky7/3a", "LevelPuzzleCellNode"),
            window.puzzleStateEnum = cc.Enum({
                unlock: 0,
                unLight: 1,
                hasLight: 2
            }),
            cc.Class({
                extends: cc.Component,
                properties: {},
                onDestroy: function () {
                    this.removeEvent()
                },
                addEvent: function () {
                    this.node.on(cc.Node.EventType.TOUCH_END, this.chooseLevel, this)
                },
                removeEvent: function () {
                    this.node.off(cc.Node.EventType.TOUCH_END, this.chooseLevel, this)
                },
                initialize: function (e) {
                    this.data = e,
                        e && e.level <= heroData.maxLevel ? e.star < 3 && (this.setUnlockCell(),
                            this.addEvent()) : this.setLockCell()
                },
                setLockCell: function () {
                    var e = new cc.Node;
                    e.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.level, "unlockIcon"),
                        this.node.addChild(e)
                },
                setUnlockCell: function () {
                    var e = new cc.Node;
                    e.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.level, "icon_star" + this.data.star),
                        this.node.addChild(e, 1),
                        this.node.setContentSize(e.getContentSize()),
                        e.y = -25,
                        this.node.setContentSize(cc.size(100, 100))
                },
                chooseLevel: function () {
                    this.data && this.data.level === heroData.maxLevel ? (openModuleValue.chooseLv = this.data.level,
                        heroData.gameMode = GameModelEnum.normal,
                        sceneControl.turnFightScene()) : this.data && this.data.level < heroData.maxLevel && openWindowLayer(openTypeEm.levelWatch, this.data)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    LevelPuzzleLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "cb7fale1thOGbi9RjAfUvpn", "LevelPuzzleLayer");
        var i = {
            1: [-90, -50],
            2: [0, 0],
            3: [90, -30],
            4: [-150, -25],
            5: [115, -10],
            6: [15, -105],
            7: [-70, 50],
            8: [-60, -70],
            9: [-90, 12],
            10: [-10, -80],
            11: [75, -85],
            12: [140, 120],
            13: [-145, -50],
            14: [30, 155],
            15: [-65, -85],
            16: [65, -45],
            17: [40, 90],
            18: [-70, -115],
            19: [-10, -70],
            20: [30, 190]
        };
        cc.Class({
            extends: cc.Component,
            properties: {
                cellSize: null,
                isInit: null,
                isShowUpdate: null,
                showUpdate: null
            },
            addEvent: function () {
                this.getBtn.on(cc.Node.EventType.TOUCH_END, this.clickGetBtn, this)
            },
            removeEvent: function () {
                this.getBtn.off(cc.Node.EventType.TOUCH_END, this.clickGetBtn, this)
            },
            initialize: function (e) {
                var t = this.activenode = this.node.getChildByName("activenode")
                    , i = heroData.levelData.puzzleData[e];
                this.puzzleData = i.data,
                    this.puzzleIndex = e,
                    this.lightNum = i.lightNum,
                    this.bgNode = t.getChildByName("puzzlebg"),
                    this.getBtn = t.getChildByName("getbtn"),
                    this.progress = t.getChildByName("progress"),
                    this.progressNum = t.getChildByName("num"),
                    this.isGetReward = !1;
                var n = this.bgNode.getContentSize();
                this.cellSize = cc.size(105, 105),
                    this.puzzleSize = cc.size((n.width - 20) / puzzleCellCol, (n.height - 28) / puzzleCellRow)
            },
            refreshUI: function () {
                this.isInit || (this.isInit = !0,
                    this.addEvent(),
                    this.puzzleData[0].level > heroData.maxLevel ? this.lockUnlockPuzzle() : (this.loadPuzzleTexture(),
                        this.refreshRewardState()))
            },
            lockUnlockPuzzle: function () {
                this.activenode.getChildByName("puzzlebg").active = !0,
                    this.activenode.getChildByName("progress").active = !1,
                    this.activenode.getChildByName("num").active = !1,
                    this.activenode.getChildByName("getbtn").active = !1,
                    this.addPuzzleCell()
            },
            loadPuzzleTexture: function () {
                var e = puzzleBgImgUrl["puzzle_" + heroData.levelData.getPuzzleImgIndexByIndex(this.puzzleIndex)];
                this.addComponent("GameLoadTexture").initialize(e, this.loadTextureCallback.bind(this))
            },
            loadTextureCallback: function (e) {
                this.texture = e,
                    this.lightNum >= 30 ? this.addFullPuzzle() : this.addPuzzleCell()
            },
            addFullPuzzle: function () {
                var e = new cc.Node;
                e.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.texture),
                    this.bgNode.addChild(e, 1);
                var t = new cc.Node
                    , i = t.addComponent(sp.Skeleton);
                GameTool.setSkeleton(i, needLoadSpine.puzzleSelect, "select", .3, !0),
                    this.bgNode.addChild(t, 2),
                    t.setPosition(this.getPuzzleAniPosition())
            },
            addCellBg: function () {
                for (var e = 0; e < puzzleCellRow; e++)
                    for (var t = 0; t < puzzleCellCol; t++) {
                        var i = this.puzzleData[e * puzzleCellCol + t]
                            , n = new cc.Node
                            , a = "";
                        (!i || i.level > heroData.maxLevel) && (a = engine.memory.getSpriteFrame(nextLoadImage.level, "puzzle_cell_gray")),
                            n.addComponent(cc.Sprite).spriteFrame = a,
                            n.addComponent("LevelPuzzleCellNode").initialize(i),
                            this.bgNode.addChild(n, 2);
                        var o = new cc.Node;
                        o.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.level, "puzzle_kuang_1"),
                            n.setPosition(this.getCellPosition(t, e)),
                            n.addChild(o, 1)
                    }
            },
            addLevelLab: function () {
                for (var e = 0; e < puzzleCellRow; e++)
                    for (var t = 0; t < puzzleCellCol; t++) {
                        var i = this.puzzleData[e * puzzleCellCol + t];
                        if (i.level <= heroData.maxLevel && i.star < 3) {
                            var n = new cc.Node;
                            this.bgNode.addChild(n, 2);
                            var a = n.addComponent(cc.Label);
                            a.string = i.level,
                                a.fontSize = 35,
                                a.cacheMode = cc.Label.CacheMode.CHAR,
                                a.font = engine.memory.getFont(needLoadFont.fntttf1_font),
                                n.setPosition(this.getCellPosition(t, e)),
                                n.y += 5;
                            var o = n.addComponent(cc.LabelOutline);
                            o.width = 2,
                                o.color = cc.color("#492904")
                        }
                    }
            },
            addCellIcon: function () {
                for (var e = 0; e < puzzleCellRow; e++)
                    for (var t = 0; t < puzzleCellCol; t++) {
                        var i = this.puzzleData[e * puzzleCellCol + t];
                        if (i && i.level <= heroData.maxLevel) {
                            var n = new cc.Node
                                , a = this.getCropTexture(this.texture, t, e);
                            if (n.setPosition(this.getCellPosition(t, e)),
                                n.addComponent(cc.Sprite).spriteFrame = a,
                                this.bgNode.addChild(n, 1),
                                i.star < 3 && (n.opacity = 150),
                                i.level === heroData.maxLevel) {
                                var o = new cc.Node;
                                o.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.level, "newLevelIcon"),
                                    this.bgNode.addChild(o, 10);
                                var r = this.getCellPosition(t, e);
                                o.setPosition(r.x - 28, r.y + 28)
                            }
                        }
                    }
            },
            addPuzzleCell: function () {
                this.showUpdate = 0,
                    this.isShowUpdate = !0
            },
            getCropTexture: function (e, t, i) {
                return new cc.SpriteFrame(e, cc.rect(t * this.puzzleSize.width, i * this.puzzleSize.height, this.puzzleSize.width - 5, this.puzzleSize.height - 5))
            },
            getCellPosition: function (e, t) {
                var i = new cc.v2(0, 0);
                return i.x = (this.cellSize.width + 3) * (e - (puzzleCellCol - 1) / 2),
                    i.y = -(this.cellSize.height + 3) * (t - (puzzleCellRow - 1) / 2),
                    i
            },
            getPuzzleAniPosition: function () {
                var e = new cc.v2(0, 0)
                    , t = heroData.levelData.getPuzzleImgIndexByIndex(this.puzzleIndex)
                    , n = i[t];
                return e.x = n[0],
                    e.y = n[1],
                    e
            },
            refreshRewardState: function () {
                if (this.puzzleIndex >= 20)
                    return this.getBtn.active = !1,
                        this.progress.active = !1,
                        void (this.progressNum.active = !1);
                switch (this.getPuzzleRewardState(this.puzzleIndex)) {
                    case rewardStateEm.notCan:
                        this.getBtn.active = !1,
                            this.progress.active = !0,
                            this.progress.progress = this.lightNum / 30,
                            this.progressNum.active = !0,
                            this.progressNum.getComponent(cc.Label).string = this.lightNum + "/" + puzzleCellRow * puzzleCellCol,
                            this.progress.getComponent(cc.ProgressBar).progress = this.lightNum / (puzzleCellRow * puzzleCellCol),
                            this.isGetReward = !1;
                        break;
                    case rewardStateEm.canReward:
                        this.getBtn.active = !0,
                            this.progress.active = !1,
                            this.isGetReward = !1,
                            this.getBtn.getChildByName("img").active = !0,
                            this.activenode.getChildByName("num").active = !0,
                            this.getBtn.getChildByName("okimg").active = !1,
                            this.getBtn.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(loginLoadImage.publicimg1, "button2"),
                            this.progressNum.active = !1;
                        break;
                    case rewardStateEm.already:
                        this.getBtn.active = !1,
                            this.progress.active = !1,
                            this.isGetReward = !0,
                            this.getBtn.getChildByName("img").active = !1,
                            this.getBtn.getChildByName("num").active = !1,
                            this.getBtn.getChildByName("okimg").active = !0,
                            this.getBtn.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(loginLoadImage.publicimg1, "button1"),
                            this.progressNum.active = !1
                }
            },
            clickGetBtn: function () {
                if (!this.isGetReward) {
                    heroData.levelData.getPuzzleReward(this.puzzleIndex),
                        this.refreshRewardState(),
                        engine.eventM.emit(event_id.REFRESH_PUZZLE_PUSH);
                    var e = heroData.levelData.getPuzzleGem();
                    heroData.addGem(e),
                        heroData.saveData();
                    var t = [];
                    t.push(getItemConfig(itemIDConfig.gem, e)),
                        sceneControl.showReward(t),
                        heroData.saveData(),
                        this.puzzleIndex < 20 && gaLogEvent.logByDate("\u9886\u53d6\u62fc\u56fe\u5956\u52b1", this.puzzleIndex + 1)
                }
            },
            getPuzzleRewardState: function () {
                return heroData.levelData.puzzleRewardObj[this.puzzleIndex] ? rewardStateEm.already : this.lightNum < 30 ? rewardStateEm.notCan : rewardStateEm.canReward
            },
            update: function () {
                this.isShowUpdate && null !== this.showUpdate && this.show()
            },
            show: function () {
                switch (this.showUpdate >= 4 && !0 === this.isShowUpdate && (this.showUpdate = 0,
                    this.isShowUpdate = !1),
                this.showUpdate) {
                    case 1:
                        this.addCellBg();
                        break;
                    case 2:
                        this.addLevelLab();
                        break;
                    case 3:
                        this.addCellIcon()
                }
                this.showUpdate++
            }
        }),
            cc._RF.pop()
    }
        , {}],
    LevelPuzzleNode: [function (e, t) {
        "use strict";
        var i;
        cc._RF.push(t, "f7604JQflBHUJ+bROUIQt3j", "LevelPuzzleNode"),
            window.puzzleCellRow = 6,
            window.puzzleCellCol = 5,
            cc.Class(((i = {
                extends: cc.Component,
                properties: {
                    puzzleData: null,
                    puzzleIndex: null,
                    lightNum: null,
                    puzzleCellSize: null,
                    textureCellSize: null,
                    isUnLock: null,
                    isGetReward: null
                },
                onDestroy: function () {
                    this.removeEvent()
                },
                addEvent: function () {
                    this.getBtn.on(cc.Node.EventType.TOUCH_END, this.clickGetBtn, this),
                        this.bgNode.on(cc.Node.EventType.TOUCH_END, this.clickPuzzle, this)
                },
                removeEvent: function () {
                    this.getBtn.off(cc.Node.EventType.TOUCH_END, this.clickGetBtn, this),
                        this.bgNode.off(cc.Node.EventType.TOUCH_END, this.clickPuzzle, this)
                },
                initialize: function (e) {
                    this.puzzleIndex = e._index,
                        this.curPuzzleData = e.data.data,
                        this.lightNum = e.data.lightNum,
                        this.iconSize = cc.size(28, 30),
                        this.getBtn = this.node.getChildByName("getbtn"),
                        this.bgNode = this.node.getChildByName("bg2"),
                        this.progress = this.node.getChildByName("progress"),
                        this.progressNum = this.progress.getChildByName("num");
                    var t = this.bgNode.getContentSize();
                    this.bgSize = t,
                        this.puzzleCellSize = cc.size(t.width / puzzleCellCol, t.height / puzzleCellRow),
                        this.addEvent(),
                        this.getLightNum(),
                        this.loadPuzzleTexture(),
                        this.refreshShow()
                },
                getLightNum: function () {
                    this.lightNum = 0;
                    for (var e = 0; e < this.curPuzzleData.length; e++)
                        this.curPuzzleData[e] && 3 === this.curPuzzleData[e].star && this.lightNum++
                },
                loadPuzzleTexture: function () {
                    var e = puzzleBgImgUrl["puzzle_" + heroData.levelData.getPuzzleImgIndexByIndex(this.puzzleIndex)];
                    this.addComponent("GameLoadTexture").initialize(e, this.loadTextureCallback.bind(this))
                },
                addPuzzleCell: function (e) {
                    for (var t = 0; t < this.row; t++)
                        for (var i = 0; i < this.col; i++)
                            this.cropTexture(e, this.levelData[t][i])
                },
                loadTextureCallback: function (e) {
                    this.textureCellSize = cc.size(e.width / puzzleCellCol, e.height / puzzleCellRow),
                        this.curPuzzleData[0].level > heroData.maxLevel ? this.setUnlockPuzzle() : this.lightNum >= 30 ? (this.bgNode.active = !0,
                            this.addFullPuuzle(e)) : (this.bgNode.active = !0,
                                this.addPuzzleCell(e))
                },
                setUnlockPuzzle: function () {
                    this.isUnLock = !0,
                        this.bgNode.active = !1,
                        this.node.getChildByName("curtain").getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.level, "puzzle_curtain_close")
                },
                addFullPuuzle: function (e) {
                    var t = GameTool.getPuzzleCellScale(e.width, e.height, this.bgSize.width, this.bgSize.height)
                        , i = new cc.Node;
                    i.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(e),
                        this.bgNode.addChild(i, 1),
                        i.setScale(t)
                }
            }).addPuzzleCell = function (e) {
                for (var t = GameTool.getPuzzleCellScale(e.width, e.height, this.bgSize.width, this.bgSize.height, 2, 2), i = 0; i < puzzleCellRow; i++)
                    for (var n = 0; n < puzzleCellCol; n++) {
                        var a = this.curPuzzleData[i * puzzleCellCol + n]
                            , o = new cc.Node
                            , r = o.addComponent(cc.Sprite);
                        o.setPosition(this.getCellPosition(n, i)),
                            this.bgNode.addChild(o, 1),
                            !a || a.star < 3 ? r.spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.level, "puzzle_cell_gray") : r.spriteFrame = GameTool.getCropSpriteFrame(e, n, i, 2, 2),
                            o.setScale(t);
                        var s = new cc.Node;
                        s.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.level, "puzzle_kuang_1"),
                            o.addChild(s, 1)
                    }
            }
                ,
                i.getCropTexture = function (e, t, i) {
                    return new cc.SpriteFrame(e, cc.rect(t * this.textureCellSize.width, i * this.textureCellSize.height, this.textureCellSize.width - 10, this.textureCellSize.height - 10))
                }
                ,
                i.getCellPosition = function (e, t) {
                    var i = new cc.v2(0, 0);
                    return i.x = this.puzzleCellSize.width * (e - 1 * (puzzleCellCol - 1) / 2),
                        i.y = -this.puzzleCellSize.height * (t - 1 * (puzzleCellRow - 1) / 2),
                        i
                }
                ,
                i.refreshShow = function () {
                    switch (this.getPuzzleRewardState(this.puzzleIndex)) {
                        case rewardStateEm.notCan:
                            this.getBtn.active = !1,
                                this.progress.active = !0,
                                this.progressNum.getComponent(cc.Label).string = this.lightNum + "/" + puzzleCellRow * puzzleCellCol,
                                this.progress.getComponent(cc.ProgressBar).progress = this.lightNum / (puzzleCellRow * puzzleCellCol),
                                this.isGetReward = !1;
                            break;
                        case rewardStateEm.canReward:
                            this.getBtn.active = !0,
                                this.progress.active = !1,
                                this.isGetReward = !1,
                                this.getBtn.getChildByName("img").active = !0,
                                this.getBtn.getChildByName("num").active = !0,
                                this.getBtn.getChildByName("okimg").active = !1,
                                this.getBtn.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(loginLoadImage.publicimg1, "button2");
                            break;
                        case rewardStateEm.already:
                            this.getBtn.active = !0,
                                this.progress.active = !1,
                                this.isGetReward = !0,
                                this.getBtn.getChildByName("img").active = !1,
                                this.getBtn.getChildByName("num").active = !1,
                                this.getBtn.getChildByName("okimg").active = !0,
                                this.getBtn.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(loginLoadImage.publicimg1, "button1")
                    }
                }
                ,
                i.clickPuzzle = function () {
                    this.isUnLock || openWindowLayer(openTypeEm.puzzleLevel, {
                        puzzleData: this.curPuzzleData,
                        puzzleIndex: this.puzzleIndex,
                        lightNum: this.lightNum
                    })
                }
                ,
                i.clickGetBtn = function () {
                    if (!this.isGetReward) {
                        heroData.levelData.getPuzzleReward(this.puzzleIndex),
                            this.refreshShow(),
                            engine.eventM.emit(event_id.REFRESH_PUZZLE_PUSH);
                        var e = heroData.levelData.getPuzzleGem();
                        heroData.addGem(e),
                            heroData.saveData();
                        var t = [];
                        t.push(getItemConfig(itemIDConfig.gem, e)),
                            sceneControl.showReward(t),
                            heroData.saveData()
                    }
                }
                ,
                i.getPuzzleRewardState = function () {
                    return heroData.levelData.puzzleRewardObj[this.puzzleIndex] ? rewardStateEm.already : this.lightNum < 30 ? rewardStateEm.notCan : rewardStateEm.canReward
                }
                ,
                i)),
            cc._RF.pop()
    }
        , {}],
    LevelTargetLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "1c0deRM8hBKwr5wo9S6x0bX", "LevelTargetLayer"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                onDestroy: function () {
                    engine.eventM.emit(event_id.REFRESH_PAUSE, !1)
                },
                initialize: function (e) {
                    null != e && (this.callback = e.callback)
                },
                start: function () {
                    var e = this;
                    this.setLevelTargetInfo();
                    var t = this.node.getPosition()
                        , i = this.node.width / 2;
                    this.node.x = -i,
                        this.node.runAction(cc.sequence(cc.delayTime(.1), cc.scaleTo(0, 1), cc.moveTo(.3, t), cc.delayTime(1.6), cc.moveTo(.3, t.x + this.node.width, t.y), cc.callFunc(function () {
                            e.callback && e.callback(),
                                e.node.destroy()
                        })))
                },
                setLevelTargetInfo: function () {
                    var e = this.node.getChildByName("activenode")
                        , t = e.getChildByName("bg")
                        , i = []
                        , n = fightControl.collectData.collectObj;
                    for (var a in n)
                        n[a] && n[a].needNum > 0 && i.push({
                            type: a,
                            num: n[a].needNum
                        });
                    i.length < 1 && (null != fightControl.bossData ? i.push({
                        type: collectTypeEm.boss,
                        num: 1
                    }) : i.push({
                        type: collectTypeEm.grid,
                        num: fightControl.mapData.remainGrid
                    }));
                    for (var o = 0; o < i.length; o++)
                        this.addItem(i[o], o, i.length);
                    var r = heroData.gameMode === GameModelEnum.challenge ? "CHALLENGE" : "LV " + fightControl.curLevel;
                    t.getChildByName("timebgnode").getChildByName("timelab").getComponent(cc.Label).string = Math.ceil(fightControl.curTime) + "s",
                        e.getChildByName("titlebg").getChildByName("title").getComponent(cc.Label).string = r
                },
                addItem: function (e, t, i) {
                    var n, a = e.type, o = e.num;
                    n = 0 === t ? 2 === i ? -80 : 0 : 80;
                    var r = this.node.getChildByName("activenode").getChildByName("bg").getChildByName("targetbgnode")
                        , s = new cc.Node;
                    s.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.fightimg2, "target_" + a),
                        s.setPosition(cc.v2(n, -20)),
                        r.addChild(s);
                    var c = new cc.Node
                        , l = c.addComponent(cc.Label);
                    l.string = "x" + o,
                        l.font = engine.memory.getFont(needLoadFont.fntttf1_font),
                        l.fontSize = 22,
                        l.color = cc.color("#E9F5F3"),
                        l.lineHeight = 22,
                        c.setPosition(cc.v2(n, -80));
                    var h = c.addComponent(cc.LabelOutline);
                    h.width = 2,
                        h.color = cc.color("#311309"),
                        r.addChild(c)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    LevelWatchLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "4501a0hN+9ECJXfjND7uP+z", "LevelWatchLayer"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                destroyClass: function () {
                    this.removeEvent(),
                        this.node.destroy()
                },
                addEvent: function () {
                    this.node.getChildByName("watchbtn").on(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this),
                        this.node.getChildByName("close").on(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this)
                },
                removeEvent: function () {
                    this.node.getChildByName("watchbtn").off(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this),
                        this.node.getChildByName("close").off(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this)
                },
                initialize: function (e) {
                    this.data = e,
                        this.addEvent(),
                        this.node.getChildByName("title").getComponent(cc.Label).string = "LEVEL " + e.level
                },
                clickWatchBtn: function () {
                    if (1 === openModuleValue.forFBCheck || 1 == debugtest.noAD)
                        this.successFun();
                    else {
                        var e = videoAdKeyList[parseInt(Math.random() * videoAdKeyList.length)];
                        gameSDK.faceBookAdvertisement.showRewardVideoAd(e, this.successFun.bind(this))
                    }
                },
                successFun: function () {
                    gaLogEvent.logByDate("\u91cd\u73a9\u89c2\u770b\u5e7f\u544a", this.data.level),
                        debugtest.chooseLv = 0,
                        openModuleValue.chooseLv = this.data.level,
                        heroData.gameMode = GameModelEnum.normal,
                        sceneControl.turnFightScene()
                },
                clickCloseBtn: function () {
                    this.destroyClass()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    LineStarAction: [function (e, t) {
        "use strict";
        cc._RF.push(t, "7cab02TouNIM6sr7dKwdRkl", "LineStarAction"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                addLine: function (e, t, i) {
                    for (var n = 1; n < e.length; n++)
                        this.addLineSpine(e[n - 1], e[n], e.length - 1, n, e[0], e[e.length - 1], t, i);
                    var a = this.fmtWayData(e);
                    this.addLineStar(a)
                },
                addLineSpine: function (e, t, i, n, a, o, r, s) {
                    var c = this.getLineConfig(e, t)
                        , l = new cc.Node;
                    l.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.fightimg2, "line"),
                        l.angle = c.angle,
                        l.x = (c.startPos.x + c.endPos.x) / 2,
                        l.y = (c.startPos.y + c.endPos.y) / 2,
                        this.node.addChild(l, fightZIndexConfig.lineZIndex),
                        l.width = c.width,
                        l.height = 10,
                        l.runAction(cc.sequence(cc.delayTime(.7), cc.callFunc(function () {
                            ccLog("\u7ebf\u6d88\u9664"),
                                l.destroy(),
                                n === i && fightUILayer.mapLayer.animationComplete(a, o, r, s)
                        })))
                },
                getLineConfig: function (e, t) {
                    var i = {};
                    return i.startPos = fightUILayer.mapLayer.getPosByGrid(e),
                        i.endPos = fightUILayer.mapLayer.getPosByGrid(t),
                        t.x > e.x ? (i.angle = 0,
                            i.width = i.endPos.x - i.startPos.x) : e.x > t.x ? (i.angle = 180,
                                i.width = i.startPos.x - i.endPos.x) : t.y > e.y ? (i.angle = -90,
                                    i.width = i.startPos.y - i.endPos.y) : (i.angle = 90,
                                        i.width = i.endPos.y - i.startPos.y),
                        i
                },
                addLineStar: function (e) {
                    var t = this;
                    e[0].isGrid = !0,
                        e[e.length - 1].isGrid = !0,
                        e.forEach(function (e) {
                            var i = t.getStarMoveTime(e);
                            e.time = i
                        }),
                        e.sort(function (e, t) {
                            return e - t
                        });
                    var i = cc.v2(-247, 643);
                    heroData.gameMode == GameModelEnum.challenge && (i = cc.v2(0, 565));
                    for (var n = 0; n < e.length; n++) {
                        var a = new cc.Node;
                        a.scale = 0,
                            a.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "star_1"),
                            this.node.addChild(a, fightZIndexConfig.lineZIndex + 1),
                            a.setPosition(fightUILayer.mapLayer.getPosByGrid(e[n])),
                            a._index = n,
                            a.isGrid = e[n].isGrid,
                            a.runAction(cc.sequence(cc.callFunc(function (e) {
                                if (e.isGrid) {
                                    var i = new cc.Node;
                                    i.scale = .6,
                                        i.setPosition(e.getPosition());
                                    var n = i.addComponent(cc.ParticleSystem);
                                    n.file = engine.memory.getParticle(needLoadParticle.particle_stars),
                                        n.autoRemoveOnFinish = !0,
                                        t.node.addChild(i, fightZIndexConfig.scoreZIndex)
                                }
                            }), cc.scaleTo(.3, 1), cc.delayTime(.5), cc.moveTo(this.getStarMoveTime(e[n]), i), cc.callFunc(function (i) {
                                i._index === e.length - 1 && t.addStarSpine(i.getPosition(), e.length),
                                    i.destroy()
                            })))
                    }
                },
                addStarSpine: function (e, t) {
                    var i = new cc.Node
                        , n = i.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(n, nextLoadSpine.sparkle, "sparkle", .7, !1),
                        i.setPosition(e),
                        this.node.addChild(i, fightZIndexConfig.lineZIndex);
                    var a = fightControl.getScore(t);
                    fightControl.fightAddScore(a),
                        fightUILayer.refreshScore(),
                        n.setCompleteListener(function () {
                            i.destroy()
                        })
                },
                fmtWayData: function (e) {
                    for (var t = [], i = 0; i < e.length - 1; i++)
                        for (var n = e[i], a = e[i + 1], o = a.x - n.x == 0 ? a.y - n.y : a.x - n.x, r = 0 == i ? 0 : 1; r <= Math.abs(o); r++) {
                            var s = {
                                x: e[i].x,
                                y: e[i].y
                            };
                            a.x - n.x == 0 ? s.y += r * o / Math.abs(o) : s.x += r * o / Math.abs(o),
                                t.push(s)
                        }
                    return t
                },
                getStarMoveTime: function (e) {
                    return .05 * Math.sqrt(Math.pow(e.x - 1, 2) + Math.pow(e.y - 0, 2)) + .1
                }
            }),
            cc._RF.pop()
    }
        , {}],
    LoadControl: [function (e, t) {
        "use strict";
        cc._RF.push(t, "2bab7MQzoVBG4FYkRsCMASa", "LoadControl"),
            window.LoadStyleType = cc.Enum({
                json: 0,
                prefab: 1,
                spriteAtlas: 2,
                spine: 3,
                font: 4,
                particleAsset: 5,
                texture: 6,
                proto: 7
            }),
            window.LoadErrorMaxCountConfig = {
                Spine: 3,
                UI: 3,
                Sprite: 3,
                Prefab: 3
            },
            window.loadExternalImage = function (e, t) {
                var i = function (i, n) {
                    null != n && n instanceof cc.Texture2D && (engine.memory.addExternalImage(e, new cc.SpriteFrame(n)),
                        null != t && t())
                };
                gameSDKName != faceBookSDK || e.indexOf("headimg/") > -1 ? cc.resources.load(e, function (e, t) {
                    i(0, t)
                }) : cc.assetManager.loadRemote(e, function (e, t) {
                    i(0, t)
                })
            }
            ,
            cc.Class({
                properties: {
                    resources: null,
                    progres: null,
                    maxPercent: null,
                    minPercent: null,
                    nameUrlKeyDic: null,
                    analysisFun: null,
                    completeCallbackFun: null,
                    loadErrorCount: null,
                    loadErrorCallBackFun: null,
                    isFirstLoadComplete: null
                },
                initialize: function (e) {
                    for (var t in this.analysisFun = e.analysisFun,
                        this.completeCallbackFun = e.completeCallbackFun,
                        this.setLoadPercent = e.setLoadPercent,
                        this.nameUrlKeyDic = new Object,
                        this.loadErrorCount = 0,
                        this.isFirstLoadComplete = !0,
                        this.loadErrorCallBackFun = e.loadErrorCallBackFun,
                        this.loadCount = 0,
                        this.nowLoadTypeIndex = -1,
                        this.resources = [],
                        this.completedCount = 0,
                        this.totalCount = e.resources.length,
                        LoadStyleType)
                        this.resources.push([]);
                    null != e.maxPercent ? this.maxPercent = e.maxPercent : this.maxPercent = 100,
                        null != e.minPercent ? this.minPercent = e.minPercent : this.minPercent = 0,
                        null != e.loadErrorMaxCount ? this.loadErrorMaxCount = e.loadErrorMaxCount : this.loadErrorMaxCount = 11;
                    for (var i = 0; i < e.resources.length; i++) {
                        var n = e.resources[i].url
                            , a = e.resources[i].restype
                            , o = n.split("/")
                            , r = o[o.length - 1];
                        this.nameUrlKeyDic[r] = n,
                            0 == engine.memory.isExistRes(n, LoadStyleType.texture) && (this.loadCount++,
                                this.resources[a].push(n))
                    }
                },
                destroy: function () {
                    this.resources = null,
                        this.progres = null,
                        this.maxPercent = null,
                        this.nameUrlKeyDic = null,
                        this.analysisFun = null,
                        this.completeCallbackFun = null,
                        this.loadErrorCount = null,
                        this.loadErrorCallBackFun = null,
                        this.isFirstLoadComplete = null
                },
                loadRes: function () {
                    this.loadErrorCount >= this.loadErrorMaxCount ? null != this.loadErrorCallBackFun && (this.loadErrorCallBackFun(),
                        this.destroy()) : (this.loadErrorCount++,
                            this.loadCount <= 0 ? this.completeLoad() : this.loadResByType())
                },
                loadResByType: function () {
                    this.nowLoadTypeIndex++;
                    var e = this;
                    if (this.nowLoadTypeIndex < this.resources.length)
                        if (this.resources[this.nowLoadTypeIndex].length > 0) {
                            var t = this.getResLoadType(this.nowLoadTypeIndex);
                            cc.resources.load(this.resources[this.nowLoadTypeIndex], t, function (t, i) {
                                e.setLoadPercentFun(t, i)
                            }, function (t, i) {
                                if (null != t && ccLog("\u4e0b\u8f7d\u9519\u8bef\u4fe1\u606f" + t.message),
                                    null != i)
                                    for (var n = 0; n < i.length; n++) {
                                        var a = i[n];
                                        if (a instanceof cc.JsonAsset)
                                            engine.memory.addJsonDic(e.nameUrlKeyDic[a.name], a);
                                        else if (a instanceof cc.Texture2D) {
                                            var o = a.nativeUrl.split(".");
                                            o[0],
                                                engine.memory.addTexture(e.nameUrlKeyDic[o[0]], a)
                                        } else if (a instanceof cc.Prefab)
                                            engine.memory.addPrefabDic(e.nameUrlKeyDic[a.name], a);
                                        else if (a instanceof cc.SpriteAtlas) {
                                            var r = a.name.split(".");
                                            engine.memory.addSpriteAtlasDic(e.nameUrlKeyDic[r[0]], a)
                                        } else
                                            a instanceof sp.SkeletonData ? engine.memory.addSpine(e.nameUrlKeyDic[a.name], a) : a instanceof cc.Font ? engine.memory.addFont(e.nameUrlKeyDic[a.name], a) : a instanceof cc.ParticleAsset ? engine.memory.addparticleDic(e.nameUrlKeyDic[a.name], a) : a instanceof cc.TextAsset && engine.memory.addTextAssetDic(e.nameUrlKeyDic[a.name], a)
                                    }
                                e.loadResByType()
                            })
                        } else
                            this.loadResByType();
                    else
                        this.setLoadPercentFun(100, 100),
                            this.completeLoad()
                },
                getResLoadType: function (e) {
                    var t = cc.Prefab;
                    switch (e) {
                        case LoadStyleType.json:
                            t = cc.JsonAsset;
                            break;
                        case LoadStyleType.prefab:
                            t = cc.Prefab;
                            break;
                        case LoadStyleType.spriteAtlas:
                            t = cc.SpriteAtlas;
                            break;
                        case LoadStyleType.spine:
                            t = sp.SkeletonData;
                            break;
                        case LoadStyleType.font:
                            t = cc.Font;
                            break;
                        case LoadStyleType.particleAsset:
                            t = cc.ParticleAsset;
                            break;
                        case LoadStyleType.texture:
                            t = cc.Texture2D;
                            break;
                        case LoadStyleType.proto:
                            t = cc.TextAsset
                    }
                    return t
                },
                getLoadCompleteCount: function () {
                    for (var e = 0, t = 0; t <= this.nowLoadTypeIndex - 1; t++)
                        null != this.resources[t] && (e += this.resources[t].length);
                    return e
                },
                setLoadPercentFun: function (e, t) {
                    var i = 1;
                    if (this.nowLoadTypeIndex < this.resources.length && (i = this.getLoadCompleteCount() / this.loadCount + e / (this.loadCount * t / this.resources[this.nowLoadTypeIndex].length)),
                        i > this.progres && (this.progres = i),
                        null != this.setLoadPercent) {
                        var n = this.maxPercent - this.minPercent
                            , a = this.progres * n + this.minPercent;
                        a = 0 | Math.floor(a),
                            this.setLoadPercent(Math.min(a, 99))
                    }
                },
                completeLoad: function () {
                    null != this.analysisFun && this.analysisFun(),
                        null != this.completeCallbackFun && this.completeCallbackFun(),
                        this.destroy()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    LoadResLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "b75aejyqXdEtY4zsvhuK4el", "LoadResLayer"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    callFun: null,
                    openType: null
                },
                onDestroy: function () {
                    this.callFun = null,
                        this.openType = null
                },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                addEvent: function () {
                    this.node.getChildByName("homebtn").on(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this)
                },
                removeEvent: function () {
                    this.node.getChildByName("homebtn").off(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this)
                },
                initialize: function (e) {
                    this.openType = e.openType,
                        this.callFun = e.callFun,
                        this.addEvent(),
                        this.node.getChildByName("homebtn").active = !0,
                        this.node.getChildByName("circle").runAction(cc.rotateBy(1, 360).repeatForever());
                    var t = openDataConfig[this.openType]
                        , i = [];
                    i.push({
                        url: t.prefab,
                        restype: LoadStyleType.prefab
                    }),
                        null != t.otherPrefab && (t.otherPrefab instanceof Array ? t.otherPrefab.forEach(function (e) {
                            i.push({
                                url: e,
                                restype: LoadStyleType.prefab
                            })
                        }) : i.push({
                            url: t.otherPrefab,
                            restype: LoadStyleType.prefab
                        })),
                        null != t.otherSpine && i.push({
                            url: t.otherSpine,
                            restype: LoadStyleType.spine
                        }),
                        engine.CPUM.addCPUInfo([{
                            type: CPUStyleType.loadType,
                            data: i,
                            executeOrder: CPUExecuteOrder.curUIType,
                            timeOrder: engine.gameTime.localTime,
                            loadErrorMaxCount: LoadErrorMaxCountConfig.UI
                        }])
                },
                loadComplete: function () {
                    null != this.callFun && this.callFun(),
                        this.destroyClass()
                },
                update: function () {
                    1 == windowResIsExist(this.openType) && (null != this.callFun && this.callFun(),
                        this.destroyClass())
                },
                clickCloseBtn: function () {
                    this.destroyClass()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    LoadingLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "945c2RDSP1Elb0zHLM8v25/", "LoadingLayer"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    circleNode: null
                },
                destroyClass: function () {
                    this.circleNode.stopAllActions(),
                        this.node.destroy()
                },
                onDestroy: function () {
                    this.removeDataEvent(),
                        Global.needSoonRemoveLoadingCircle = !1,
                        this.circleNode = null
                },
                addDataEvent: function () {
                    engine.eventM.on(event_id.CLOSE_LOADING_LAYER, this.removeHandle, this)
                },
                removeDataEvent: function () {
                    engine.eventM.off(event_id.CLOSE_LOADING_LAYER, this.removeHandle, this)
                },
                initialize: function () {
                    this.addDataEvent(),
                        this.node.getChildByName("homebtn").active = !1,
                        this.circleNode = this.node.getChildByName("circle"),
                        this.circleNode.runAction(cc.rotateBy(1, 360).repeatForever()),
                        Global.needSoonRemoveLoadingCircle && this.removeHandle()
                },
                removeHandle: function () {
                    this.destroyClass()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    LoginFaceBookSDK: [function (e, t) {
        "use strict";
        cc._RF.push(t, "0b01cVQm8RBNpSafgjfsnyQ", "LoginFaceBookSDK"),
            window.gameRankData = null;
        var i = e("GameRankData")
            , n = e("LoadControl");
        window.isHaveNewbie = null,
            window.isNewPlayer = null,
            cc.Class({
                properties: {
                    userData: null
                },
                initialize: function () { },
                login: function () {
                    gaLogEvent.logByDate("\u5f00\u59cb\u52a0\u8f7d", 1);
                    var e = this;
                    gameSDK.getPlayInfo(function (t) {
                        ccLog("\u83b7\u53d6\u4fe1\u606f\u5b8c\u6bd5\uff0c\u5f00\u59cb\u52a0\u8f7d"),
                            debugtest.testNewPlayer && (t = null),
                            t ? (isHaveNewbie = !1,
                                gameSDK.logEventByString("oldPlayer"),
                                gaLogEvent.logByDate("\u8001\u73a9\u5bb6", 1),
                                isNewPlayer = !1) : (isHaveNewbie = !0,
                                    gameSDK.logEventByString("newPlayer"),
                                    gaLogEvent.logByDate("\u65b0\u73a9\u5bb6", 1),
                                    isNewPlayer = !0),
                            e.userData = t,
                            heroData.initialize(),
                            e.loadGameRes(),
                            gameRankData = new i,
                            gameRankData.initialize()
                    })
                },
                loadGameRes: function () {
                    var e = 0
                        , t = 0;
                    if (1 == openModuleValue.isApk) {
                        var i = cc.view.getFrameSize();
                        e = i.height,
                            t = i.width
                    } else
                        e = document.documentElement.clientHeight,
                            t = document.documentElement.clientWidth;
                    if (gameSDKName == faceBookSDK && t > 0 && e > 0) {
                        var a = e / t;
                        if (a > engineGlobal.viewGameHeigh / engineGlobal.viewGameWidth) {
                            var o = engineGlobal.viewGameWidth * a;
                            engineGlobal.offY = (o - engineGlobal.viewGameHeigh) / 2,
                                ccLog("\u4fee\u6539\u9ad8\u5ea6")
                        } else {
                            var r = engineGlobal.viewGameHeigh / a;
                            engineGlobal.offX = (r - engineGlobal.viewGameWidth) / 2,
                                ccLog("\u4fee\u6539\u5bbd\u5ea6")
                        }
                    }
                    ccLog("offY:" + engineGlobal.offY),
                        ccLog("offX:" + engineGlobal.offX);
                    var s = this
                        , c = new n
                        , l = new Object;
                    l.resources = gameLoginRes(),
                        l.setLoadPercent = function (e) {
                            s.setLoadPercent(e)
                        }
                        ,
                        l.analysisFun = function () {
                            s.analysis()
                        }
                        ,
                        l.completeCallbackFun = function () {
                            s.loadComplete()
                        }
                        ,
                        l.loadErrorCallBackFun = function () { }
                        ,
                        c.initialize(l),
                        c.loadRes()
                },
                analysis: function () {
                    GameTool.analysisJsonData(analysisJsonArr()),
                        engine.gameData.dataDic.stronger = {};
                    var e = getDicData(dataJson.stronger_json);
                    for (var t in e) {
                        var i = e[t];
                        null == engine.gameData.dataDic.stronger[i.type] && (engine.gameData.dataDic.stronger[i.type] = {}),
                            engine.gameData.dataDic.stronger[i.type][i.level] = i
                    }
                    for (var t in engine.gameData.dataDic.dailytask = {},
                        e = getDicData(dataJson.dailytask_json))
                        i = e[t],
                            null == engine.gameData.dataDic.dailytask[i.type] && (engine.gameData.dataDic.dailytask[i.type] = []),
                            engine.gameData.dataDic.dailytask[i.type].push(i);
                    for (var t in engine.gameData.dataDic.achievement = {},
                        e = getDicData(dataJson.achievement_json))
                        i = e[t],
                            null == engine.gameData.dataDic.achievement[i.type] && (engine.gameData.dataDic.achievement[i.type] = {}),
                            engine.gameData.dataDic.achievement[i.type][i.index] = i;
                    for (var t in engine.gameData.dataDic.level = {},
                        e = getDicData(dataJson.level_json)) {
                        for (var n = (i = e[t]).content.split("|"), a = 0, o = 0; o < n.length; o++) {
                            var r = parseInt(n[o]);
                            r != gridTypeEm.normal && r != gridTypeEm.iron && r != gridTypeEm.dragonfly && r != gridTypeEm.egg && r != gridTypeEm.bonfire && a++
                        }
                        a % 2 > 0 && (22 != t && 29 != t || ccLog(a),
                            cc.error("\u7b2c" + t + "\u5173\uff0c\u914d\u7f6e\u7684\u6570\u91cf\u662f\u5947\u6570" + a),
                            e[t].content = e[t].content.replace("1", "0"));
                        var s = (i.group + "").split("|");
                        for (o = 0; o < s.length; o++) {
                            var c = parseInt(s[o]);
                            null == engine.gameData.dataDic.level[c] && (engine.gameData.dataDic.level[c] = []),
                                engine.gameData.dataDic.level[c].push(i.id)
                        }
                    }
                    heroData.analysisDataByDic(),
                        heroData.initData(this.userData)
                },
                loadComplete: function () {
                    switch (gaLogEvent.logByDate("\u52a0\u8f7d\u5b8c\u6210", 1),
                    ccLog("\u52a0\u8f7d\u5b8c\u6210"),
                    gameSDKName) {
                        case faceBookSDK:
                            gameSDK.loadPlayerInfo(this.enterGame.bind(this));
                            break;
                        case faceBookSDKTest:
                            this.enterGame()
                    }
                },
                enterGame: function () {
                    var e = this;
                    gameSDK.challengeLeaderboard.createAllContext(),
                        gameSDK.challengeLeaderboard._updateEnter(function (t) {
                            ccLog("updateEnter contextData" + JSON.stringify(t)),
                                e.userData && !t ? sceneControl.turnMainScene() : (t && t.roomID && t.otherData && (heroData.gameMode = GameModelEnum.challenge,
                                    heroData.challengeData.updateData(t)),
                                    sceneControl.turnFightScene())
                        })
                },
                setLoadPercent: function (e) {
                    gameSDK.setLoadingProgress(e)
                }
            }),
            cc._RF.pop()
    }
        , {
        GameRankData: "GameRankData",
        LoadControl: "LoadControl"
    }],
    LoginSceneControl: [function (e, t) {
        "use strict";
        cc._RF.push(t, "0bdf8+xxslIra3V/D/cjz+K", "LoginSceneControl");
        var i = e("LoginFaceBookSDK");
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function () {
                if (gameInit(),
                    1 != isLogin) {
                    ccLog("\u7248\u672c\u53f7\uff1a" + gameVersions);
                    var e = new i;
                    e.initialize(),
                        e.login(),
                        isLogin = !0
                }
            }
        }),
            cc._RF.pop()
    }
        , {
        LoginFaceBookSDK: "LoginFaceBookSDK"
    }],
    LoseDetailLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "ae6e59fQC1GyJgmNQwYl9kO", "LoseDetailLayer"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                onDestroy: function () {
                    openWindowLayer(openTypeEm.resurgence)
                },
                destroyClass: function () {
                    null != this.node && this.node.destroy()
                },
                initialize: function () {
                    var e = this.node.getChildByName("youscore")
                        , t = this.node.getChildByName("scorelabel")
                        , i = this.node.getChildByName("targetscore")
                        , n = this.node.getChildByName("targetlabel")
                        , a = this.node.getChildByName("closeimg")
                        , o = this.node.getChildByName("line");
                    e.opacity = 0,
                        e.y = e.y - 30,
                        t.opacity = 0,
                        t.y = t.y - 30,
                        t.getComponent(cc.Label).string = fightControl.curScore,
                        i.scale = 0,
                        n.scale = 0,
                        n.getComponent(cc.Label).string = fightControl.targetScore,
                        a.opacity = 0,
                        a.scale = 10,
                        o.scaleX = 0,
                        e.runAction(this.myScoreAction()),
                        t.runAction(this.myScoreAction()),
                        i.runAction(this.targetAction()),
                        n.runAction(this.targetAction()),
                        a.runAction(cc.sequence(cc.delayTime(1.8), cc.fadeIn(.01), cc.scaleTo(.3, 1))),
                        o.runAction(cc.scaleTo(.3, 1, 1));
                    var r = this;
                    this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function () {
                        r.destroyClass()
                    })))
                },
                myScoreAction: function () {
                    var e = cc.spawn(cc.moveBy(.3, 0, 60), cc.fadeIn(.3));
                    return cc.sequence(e, cc.moveBy(.1, 0, -30))
                },
                targetAction: function () {
                    return cc.sequence(cc.delayTime(.8), cc.scaleTo(.25, 1.1), cc.scaleTo(.15, .9), cc.scaleTo(.1, 1))
                }
            }),
            cc._RF.pop()
    }
        , {}],
    MainSceneControl: [function (e, t) {
        "use strict";
        cc._RF.push(t, "7eab3h8s1hFkIfNNMnnksQK", "MainSceneControl");
        var i = e("GameScene");
        cc.Class({
            extends: i,
            properties: {
                gameLoadUICompent: null
            },
            onDestroy: function () {
                this._super(),
                    null != this.gameLoadUICompent && (this.gameLoadUICompent = null)
            },
            initialize: function () {
                this._super(),
                    sceneControl.resetTransitionData(),
                    engine.gameSound.playMusic(soundurl.bgMusic, !0),
                    openWindowLayer(openTypeEm.mainUI),
                    openWindowLayer(openTypeEm.raceLamp)
            },
            onEnable: function () { },
            onLoad: function () {
                1 == heroData.isStopMusic && engine.gameSound.stopMusic(),
                    this.gameLoadUICompent = this.node.addComponent("GameLoadUI"),
                    this._super({
                        maxPercent: 100
                    }),
                    sceneControl.curSceneType = SceneType.main
            },
            getRes: function () {
                for (var e = [], t = gameMainRes(), i = 0; i < t.length; i++)
                    e.push(t[i]);
                return e
            },
            loadComplete: function () {
                this._super(),
                    null != this.gameLoadUI && (this.gameLoadUI.destroyClass(),
                        this.gameLoadUI.destroy(),
                        this.gameLoadUI = null),
                    this.initialize(),
                    gameSDK.startGame(function () {
                        gameSDK.faceBookBot.canSubscribeBotAsync(function () {
                            gameSDK.faceBookBot.subscribeBotAsync()
                        }),
                            gameSDK.leaderboard.setScoreAsync(heroData.bestScore),
                            setTimeout(function () {
                                gameSDK.challengeLeaderboard.setScoreAsync(heroData.challengeData.maxChallengeScore)
                            }, 100)
                    })
            },
            setLoadPercent: function (e) {
                null != this.gameLoadUICompent && this.gameLoadUICompent.setLoadPercent(e)
            }
        }),
            cc._RF.pop()
    }
        , {
        GameScene: "GameScene"
    }],
    MainUILayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "27607R6V55ECpsokRGPZ1TX", "MainUILayer"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    timeTxt1: null,
                    timeTxt2: null,
                    updateCD: null,
                    timeStr2: null,
                    playWithFriendBtn: null
                },
                onDestroy: function () {
                    this.removeDataEvent(),
                        this.timeTxt2 = null,
                        this.timeTxt1 = null,
                        this.updateCD = null,
                        this.timeStr2 = null,
                        this.playWithFriendBtn = null
                },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                addDataEvent: function () {
                    engine.eventM.on(event_id.REFRESH_GEM_NUMBER, this.refreshGemNum, this),
                        engine.eventM.on(event_id.REFRESH_ACHIEVEMENT_PUSH, this.refreshAchievementPush, this),
                        engine.eventM.on(event_id.REFRESH_DAILY_GIFT_BTN, this.refreshDailyGift, this),
                        engine.eventM.on(event_id.REFRESH_DAILY_TASK_PUSH, this.refreshDailyTaskPush, this),
                        engine.eventM.on(event_id.REFRESH_SURPRISE_PUSH, this.refreshSurprisePush, this),
                        engine.eventM.on(event_id.REFRESH_GRADE_PUSH, this.refreshGradePush, this),
                        engine.eventM.on(event_id.REFRESH_PUZZLE_PUSH, this.refreshPuzzlePush, this)
                },
                removeDataEvent: function () {
                    engine.eventM.off(event_id.REFRESH_GEM_NUMBER, this.refreshGemNum, this),
                        engine.eventM.off(event_id.REFRESH_ACHIEVEMENT_PUSH, this.refreshAchievementPush, this),
                        engine.eventM.off(event_id.REFRESH_DAILY_GIFT_BTN, this.refreshDailyGift, this),
                        engine.eventM.off(event_id.REFRESH_DAILY_TASK_PUSH, this.refreshDailyTaskPush, this),
                        engine.eventM.off(event_id.REFRESH_SURPRISE_PUSH, this.refreshSurprisePush, this),
                        engine.eventM.off(event_id.REFRESH_GRADE_PUSH, this.refreshGradePush, this),
                        engine.eventM.off(event_id.REFRESH_PUZZLE_PUSH, this.refreshPuzzlePush, this)
                },
                addEvent: function () {
                    this.node.getChildByName("playbtn").on(cc.Node.EventType.TOUCH_END, this.clickPlayBtn, this),
                        this.node.getChildByName("continuebtn").on(cc.Node.EventType.TOUCH_END, this.clickContinueBtn, this),
                        this.node.getChildByName("cupbtn").on(cc.Node.EventType.TOUCH_END, this.clickCupBtn, this),
                        this.node.getChildByName("rankbtn").on(cc.Node.EventType.TOUCH_END, this.clickRankBtn, this),
                        this.node.getChildByName("strongbtn").on(cc.Node.EventType.TOUCH_END, this.clickStrongBtn, this),
                        this.node.getChildByName("daygiftbtn").on(cc.Node.EventType.TOUCH_END, this.clickDayGiftBtn, this),
                        this.node.getChildByName("gradebtn").on(cc.Node.EventType.TOUCH_END, this.clickGradeBtn, this),
                        this.node.getChildByName("mysticalbtn").on(cc.Node.EventType.TOUCH_END, this.clickMysticalBtn, this),
                        this.node.getChildByName("taskbtn").on(cc.Node.EventType.TOUCH_END, this.clickTaskBtn, this),
                        this.node.getChildByName("addgembtn").on(cc.Node.EventType.TOUCH_END, this.clickAddGemBtn, this),
                        this.node.getChildByName("puzzle").on(cc.Node.EventType.TOUCH_END, this.clickPuzzleBtn, this),
                        this.node.getChildByName("puzzlebtn").on(cc.Node.EventType.TOUCH_END, this.clickPuzzleBtn, this),
                        this.node.getChildByName("playWithFriendBtn").on(cc.Node.EventType.TOUCH_END, this.clickChallengeBtn, this),
                        this.node.getChildByName("gamebtn").on(cc.Node.EventType.TOUCH_END, this.clickGameBtn, this)
                },
                removeEvent: function () {
                    this.node.getChildByName("playbtn").off(cc.Node.EventType.TOUCH_END, this.clickPlayBtn, this),
                        this.node.getChildByName("continuebtn").off(cc.Node.EventType.TOUCH_END, this.clickContinueBtn, this),
                        this.node.getChildByName("cupbtn").off(cc.Node.EventType.TOUCH_END, this.clickCupBtn, this),
                        this.node.getChildByName("rankbtn").off(cc.Node.EventType.TOUCH_END, this.clickRankBtn, this),
                        this.node.getChildByName("strongbtn").off(cc.Node.EventType.TOUCH_END, this.clickStrongBtn, this),
                        this.node.getChildByName("daygiftbtn").off(cc.Node.EventType.TOUCH_END, this.clickDayGiftBtn, this),
                        this.node.getChildByName("gradebtn").off(cc.Node.EventType.TOUCH_END, this.clickGradeBtn, this),
                        this.node.getChildByName("mysticalbtn").off(cc.Node.EventType.TOUCH_END, this.clickMysticalBtn, this),
                        this.node.getChildByName("taskbtn").off(cc.Node.EventType.TOUCH_END, this.clickTaskBtn, this),
                        this.node.getChildByName("addgembtn").off(cc.Node.EventType.TOUCH_END, this.clickAddGemBtn, this),
                        this.node.getChildByName("puzzle").off(cc.Node.EventType.TOUCH_END, this.clickPuzzleBtn, this),
                        this.node.getChildByName("puzzlebtn").off(cc.Node.EventType.TOUCH_END, this.clickPuzzleBtn, this),
                        this.node.getChildByName("playWithFriendBtn").off(cc.Node.EventType.TOUCH_END, this.clickChallengeBtn, this),
                        this.node.getChildByName("gamebtn").off(cc.Node.EventType.TOUCH_END, this.clickGameBtn, this)
                },
                initialize: function () {
                    this.timeStr2 = getLanguageDic(1016),
                        this.addEvent(),
                        this.addDataEvent(),
                        this.refreshGemNum(),
                        this.refreshDailyGift(),
                        this.refreshPuzzlePush(),
                        this.refreshGradePush(),
                        this.refreshAchievementPush(),
                        this.refreshDailyTaskPush(),
                        this.refreshSurprisePush(),
                        this.refreshPuzzle(),
                        this.refreshChallenge(),
                        this.node.getChildByName("bestscorebg").getChildByName("txt").getComponent(cc.Label).string = getLanguageDic(1043) + heroData.bestScore,
                        this.timeTxt1 = this.node.getChildByName("tasktime").getComponent(cc.Label),
                        this.timeTxt2 = this.node.getChildByName("mysticaltime").getComponent(cc.Label),
                        this.refreshEndTime(),
                        this.refreshContinueBtn(),
                        1 == openModuleValue.forFBCheck && (this.node.getChildByName("mysticalbtn").active = !1,
                            this.node.getChildByName("mysticaltime").active = !1),
                        this.node.getChildByName("lvnum").active = !1,
                        debugtest.chooseLv > 0 && (this.node.getChildByName("lvnum").active = !0)
                },
                refreshPuzzlePush: function () {
                    this.node.getChildByName("puzzlebtn").getChildByName("push").active = heroData.levelData.getPuzzlePush()
                },
                refreshGradePush: function () {
                    this.node.getChildByName("gradebtn").getChildByName("push").active = heroData.gradeData.getGradePush()
                },
                refreshStrongerPush: function () {
                    this.node.getChildByName("strongbtn").getChildByName("push").active = heroData.strongData.getStrongerPush()
                },
                refreshAchievementPush: function () {
                    this.node.getChildByName("cupbtn").getChildByName("push").active = heroData.achievementData.getAchievementPush()
                },
                refreshDailyGift: function () {
                    var e = !1;
                    0 == heroData.dailyGift && (e = !0);
                    var t = this.node.getChildByName("daygiftbtn");
                    t.getChildByName("push").active = e,
                        t.stopAllActions(),
                        t.scale = 1,
                        1 == e && t.runAction(cc.sequence(cc.scaleTo(.5, 1.1), cc.scaleTo(.5, 1), cc.scaleTo(.5, .9), cc.scaleTo(.5, 1)).repeatForever())
                },
                refreshDailyTaskPush: function () {
                    this.node.getChildByName("taskbtn").getChildByName("push").active = heroData.dailyTaskData.getTaskPush()
                },
                refreshSurprisePush: function () {
                    this.node.getChildByName("mysticalbtn").getChildByName("push").active = 0 == heroData.isRewardSurprise
                },
                refreshPuzzle: function () {
                    this.node.getChildByName("puzzle").getChildByName("title").getComponent(cc.Label).string = "LEVEL " + heroData.maxLevel,
                        this.addComponent("GameLoadTexture").initialize(puzzleBgImgUrl["puzzle_" + heroData.levelData.getPuzzleImgIndexByLevel(heroData.maxLevel)], this.loadTextureCallback.bind(this))
                },
                loadTextureCallback: function (e) {
                    if (e) {
                        var t = heroData.levelData.getPuzzleDataByLevel(heroData.maxLevel).data
                            , i = this.node.getChildByName("puzzle").getChildByName("content")
                            , n = i.getContentSize();
                        n = cc.size(Math.round(n.width), Math.round(n.height));
                        for (var a = cc.size(Math.round(n.width / puzzleCellCol), Math.round(n.height / puzzleCellRow)), o = 0; o < puzzleCellRow; o++)
                            for (var r = 0; r < puzzleCellCol; r++) {
                                var s = new cc.Node
                                    , c = s.addComponent(cc.Sprite)
                                    , l = GameTool.getPuzzleCellScale(e.width, e.height, n.width, n.height, 2, 2);
                                if (t[o * puzzleCellCol + r] && t[o * puzzleCellCol + r].level <= heroData.maxLevel) {
                                    if (c.spriteFrame = GameTool.getCropSpriteFrame(e, r, o, 2, 2),
                                        t[o * puzzleCellCol + r].star < 3) {
                                        var h = new cc.Node;
                                        h.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.level, "puzzle_cell_gray"),
                                            s.addChild(h, 1),
                                            h.opacity = 180
                                    }
                                } else
                                    c.spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.level, "puzzle_cell_gray");
                                s.setScale(l),
                                    s.setContentSize(a);
                                var d = GameTool.getPositionByXY(a, r, o, puzzleCellCol, puzzleCellRow);
                                s.setPosition(d),
                                    i.addChild(s, 1)
                            }
                    }
                },
                refreshChallenge: function () {
                    var e = heroData.challengeData.roomData;
                    this.playWithFriendBtn = this.node.getChildByName("playWithFriendBtn");
                    var t = this.playWithFriendBtn.getChildByName("icon_me");
                    GameTool.addImage(gameSDK.sdkPlayInfo.photo, t);
                    var i = this.playWithFriendBtn.getChildByName("icon_other")
                        , n = 0
                        , a = function (t) {
                            if (e.length < 1)
                                GameTool.addImage("headimg/pk_earth", i);
                            else {
                                t = n % e.length;
                                var a = e[t].otherData;
                                a && a.photo ? GameTool.addImage(a.photo, i) : GameTool.addImage("headimg/pk_earth", i)
                            }
                        };
                    a(n),
                        this.schedule(function () {
                            a(++n)
                        }, 2)
                },
                refreshGemNum: function () {
                    this.node.getChildByName("gemword").getComponent("GameArtWord").setString("" + heroData.diamond),
                        this.refreshStrongerPush(),
                        this.node.getChildByName("gamebtn").getChildByName("push").active = heroData.smallGame_show_red_date != (new Date).getDate()
                },
                refreshEndTime: function () {
                    this.updateCD = engine.gameTime.localTime;
                    var e = heroData.taskRefreshTime + heroData.dailyTaskCD - engine.gameTime.localTime;
                    if (this.timeTxt1.string = engine.gameTime.formatTime(e),
                        0 == heroData.isRewardSurprise)
                        this.timeTxt2.string = this.timeStr2;
                    else {
                        var t = heroData.lastRewardSurpriseTime + heroData.surpriseCD - engine.gameTime.localTime;
                        this.timeTxt2.string = engine.gameTime.formatTime(t)
                    }
                },
                refreshContinueBtn: function () {
                    var e = this.node.getChildByName("continuebtn")
                        , t = e.getChildByName("txt").getComponent(cc.LabelOutline);
                    null == heroData.gameConfig ? (t.color = cc.color(114, 114, 114),
                        e.getComponent(cc.Button).interactable = !1) : (t.color = cc.color(85, 156, 23),
                            e.getComponent(cc.Button).interactable = !0)
                },
                update: function () {
                    null != this.updateCD && engine.gameTime.localTime - this.updateCD > 500 && this.refreshEndTime()
                },
                clickPlayBtn: function () {
                    heroData.gameMode = GameModelEnum.normal,
                        debugtest.chooseLv = parseInt(this.node.getChildByName("lvnum").getComponent(cc.EditBox).string),
                        debugtest.chooseLv > 0 ? sceneControl.turnFightScene() : (openModuleValue.chooseLv = heroData.maxLevel,
                            sceneControl.turnFightScene())
                },
                clickContinueBtn: function () {
                    heroData.gameMode = GameModelEnum.normal,
                        null != heroData.gameConfig && (gaLogEvent.logByDate("\u70b9\u51fb\u7ee7\u7eed", 1),
                            sceneControl.turnFightScene(heroData.gameConfig))
                },
                clickCupBtn: function () {
                    openWindowLayer(openTypeEm.achievementOrStrong, achiOpenTypeEm.achievement)
                },
                clickRankBtn: function () {
                    openWindowLayer(openTypeEm.rank)
                },
                clickStrongBtn: function () {
                    openWindowLayer(openTypeEm.achievementOrStrong, achiOpenTypeEm.strong)
                },
                clickDayGiftBtn: function () {
                    openWindowLayer(openTypeEm.watchAdvert, watchOpenTypeEm.dailyGift)
                },
                clickGradeBtn: function () {
                    openWindowLayer(openTypeEm.gradeUI)
                },
                clickMysticalBtn: function () {
                    heroData.isRewardSurprise > 0 ? openWindowLayer(openTypeEm.tipsLayer, {
                        des: getLanguageDic(1034)
                    }) : openWindowLayer(openTypeEm.surpriseLayer, surpriseOpenTypeEm.mainLayer)
                },
                clickTaskBtn: function () {
                    openWindowLayer(openTypeEm.dailyTask)
                },
                clickAddGemBtn: function () {
                    openWindowLayer(openTypeEm.watchAdvert, watchOpenTypeEm.getGem)
                },
                clickPuzzleBtn: function () {
                    openWindowLayer(openTypeEm.puzzlePageView)
                },
                clickChallengeBtn: function () {
                    heroData.challengeData.fmtData(),
                        heroData.challengeData.roomData.length > 0 ? openWindowLayer(openTypeEm.challenge) : openWindowLayer(openTypeEm.challengeInvite)
                },
                clickGameBtn: function () {
                    gtag("event", "Games_click"),
                        heroData.smallGame_show_red_date = (new Date).getDate(),
                        heroData.saveData(),
                        openWindowLayer(openTypeEm.gameSelectLevel)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    MapData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "1bfd3OpTQRNEaHIWBolNXZB", "MapData"),
            window.collcetTypeEm = cc.Enum({
                dragonfly: 1,
                egg: 2,
                bonfire: 3
            }),
            window.moveDirTypeEm = cc.Enum({
                up: 1,
                down: 2,
                left: 3,
                right: 4
            });
        var i = e("GridData");
        cc.Class({
            properties: {
                gridArr: null,
                mapWight: null,
                mapHeight: null,
                remainGrid: null,
                specialGridNum: null,
                fireGridPosArr: null,
                moveDir: null
            },
            initialize: function () {
                this.mapWight = getGlobleDic(1),
                    this.mapHeight = getGlobleDic(2),
                    this.gridArr = [],
                    this.remainGrid = 0,
                    this.specialGridNum = 0;
                for (var e = 0; e < this.mapHeight; e++) {
                    this.gridArr[e] = [];
                    for (var t = 0; t < this.mapWight; t++) {
                        var n = new i;
                        n.initialize(0, {
                            y: e,
                            x: t
                        }),
                            this.gridArr[e].push(n)
                    }
                }
            },
            refreshMapByConfig: function (e) {
                for (var t = [], i = 0; i < this.mapHeight; i++)
                    t.push([]);
                for (var n = e.split("|"), a = 0; a < n.length; a++)
                    t[Math.floor(a / this.mapWight)].push(parseInt(n[a]));
                this.remainGrid = 0,
                    this.specialGridNum = 0,
                    this.fireGridPosArr = [];
                for (var o = 0; o < t.length; o++)
                    for (var r = 0; r < t[o].length; r++) {
                        var s = t[o][r]
                            , c = 0
                            , l = 0;
                        s >= -1 ? (l = gridTypeEm.normal,
                            c = s) : s === gridTypeEm.ice || s === gridTypeEm.question ? (l = s,
                                s = c = 1) : c = l = s,
                            this.gridArr[o][r].updateInfo(c, l),
                            s > 0 && this.remainGrid++,
                            s !== gridTypeEm.rocket && s !== gridTypeEm.demon && s !== gridTypeEm.birdcage && s !== gridTypeEm.flower && s !== gridTypeEm.clawball1 && s !== gridTypeEm.clawball2 || (this.specialGridNum++,
                                this.remainGrid++),
                            s === gridTypeEm.bonfire && this.fireGridPosArr.push({
                                x: r,
                                y: o
                            })
                    }
            },
            deleteGrid: function (e) {
                var t = this.getGridDataByPos(e);
                null != t && ((t.gridID > 0 || t.isUsable()) && this.remainGrid--,
                    t.clear(),
                    this.clearRoundIce(e))
            },
            getHaveArr: function (e) {
                for (var t = [], i = 0; i < this.gridArr.length; i++)
                    for (var n = 0; n < this.gridArr[i].length; n++) {
                        var a = this.gridArr[i][n];
                        a.isEmpty() || a.gridID === gridTypeEm.iron || (e ? a.gridID > 0 && !a.isSpecialGrid() && t.push(a) : a.isUsable() ? t.push(a) : a.otherType !== gridTypeEm.ice && a.otherType !== gridTypeEm.lock || t.push(a))
                    }
                return t
            },
            getGridDataByPos: function (e) {
                return null == this.gridArr[e.y] || null == this.gridArr[e.y][e.x] ? null : this.gridArr[e.y][e.x]
            },
            clearRoundIce: function (e) {
                for (var t = [{
                    y: e.y - 1,
                    x: e.x
                }, {
                    y: e.y + 1,
                    x: e.x
                }, {
                    y: e.y,
                    x: e.x - 1
                }, {
                    y: e.y,
                    x: e.x + 1
                }], i = 0; i < t.length; i++) {
                    var n = t[i].y
                        , a = t[i].x;
                    if (null != this.gridArr[n] && null != this.gridArr[n][a]) {
                        var o = this.gridArr[n][a];
                        o.otherType === gridTypeEm.ice && o.refreshGridOther(gridTypeEm.normal)
                    }
                }
            },
            clearAllParry: function () {
                for (var e = 0; e < this.gridArr.length; e++)
                    for (var t = 0; t < this.gridArr[e].length; t++) {
                        var i = this.gridArr[e][t];
                        i.otherType === gridTypeEm.ice ? i.refreshGridOther(gridTypeEm.normal) : i.gridID === gridTypeEm.iron && (i.refreshGridID(gridTypeEm.normal),
                            i.refreshGridOther(gridTypeEm.normal))
                    }
            },
            getRocketTargetPosArr: function (e, t) {
                for (var i = [], n = [], a = [], o = JSON.parse(JSON.stringify(this.gridArr)), r = 0; r < o.length; r++)
                    for (var s = 0; s < o[r].length; s++) {
                        var c = o[r][s];
                        c.gridID === gridTypeEm.iron ? i.push(c) : isSamePos(c.gridPos, e.gridPos) || isSamePos(c.gridPos, t.gridPos) ? c.gridID = 0 : c.gridID === gridTypeEm.normal || this.isCollectGrid(c.gridID) || n.push(c)
                    }
                if (i.length > 1)
                    return a.concat(this.getRandomDataByArray(i, 2));
                n = this.spliceSingleGrid(n);
                var l = this.getRandomDataByArray(n, 1);
                if (null == l || l.length < 1)
                    return [];
                var h = l[0].gridID;
                return a = a.concat(this.getRandomDataByArray(n, 2, h)),
                    JSON.parse(JSON.stringify(a))
            },
            spliceSingleGrid: function (e) {
                for (var t = {}, i = 0; i < e.length; i++) {
                    var n = e[i];
                    t[n.gridID] ? t[n.gridID]++ : t[n.gridID] = 1
                }
                var a = [];
                for (var o in t)
                    1 === t[o] && a.push(o);
                for (var r = 0; r < a.length; r++)
                    for (var s = 0; s < e.length; s++)
                        if (a[r] == e[s].gridID) {
                            e.splice(s, 1);
                            break
                        }
                return e
            },
            getRandomDataByArray: function (e, t, i) {
                var n = []
                    , a = []
                    , o = JSON.parse(JSON.stringify(e));
                if (null != i)
                    for (var r = 0; r < o.length; r++) {
                        var s = o[r];
                        s.gridID === i && a.push(s)
                    }
                else
                    a = o;
                for (var c = 0; c < a.length && !(t < 1); c++) {
                    var l = Math.random() * a.length
                        , h = a.splice(Math.floor(l), 1);
                    n = n.concat(h),
                        t--,
                        c--
                }
                return n
            },
            getTargetPosByGrid: function (e) {
                if (null == e)
                    return null;
                var t = this.getGridDataByPos(e);
                return t.targetPos ? JSON.parse(JSON.stringify(t.targetPos)) : null
            },
            addDemonGridPos: function (e) {
                var t = this.getArroundEmptyGridPosArr(e[0])
                    , i = this.getArroundEmptyGridPosArr(e[1])
                    , n = t.length > i.length ? 2 * i.length : 2 * t.length
                    , a = this.concatDiffrentPosArray(t, i);
                return a.sort(function () {
                    return Math.random() - .5
                }),
                    a.length % 2 != 0 && a.splice(a.length - 1),
                    a.length > n && a.splice(n, a.length - n),
                    a
            },
            concatDiffrentPosArray: function (e, t) {
                for (var i, n = t.length, a = 0; a < e.length; a++) {
                    i = !1;
                    for (var o = 0; o < n; o++)
                        if (isSamePos(e[a], t[o])) {
                            i = !0;
                            break
                        }
                    i || (t = t.concat(e.splice(a, 1)),
                        a--)
                }
                return t
            },
            addGridData: function (e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = this.gridArr[t[i].y][t[i].x];
                    n.refreshGridID(e[i]),
                        e[i] > 0 ? n.refreshGridOther(gridTypeEm.normal) : n.refreshGridOther(e[i]),
                        this.remainGrid++
                }
            },
            getArroundEmptyGridPosArr: function (e) {
                var t = []
                    , i = 0;
                null != fightControl.bossData && (i = 4),
                    e.x > 0 && t.push({
                        y: e.y,
                        x: e.x - 1
                    }),
                    e.x < this.mapWight - 1 && t.push({
                        y: e.y,
                        x: e.x + 1
                    }),
                    e.y > i && t.push({
                        y: e.y - 1,
                        x: e.x
                    }),
                    e.y < this.mapHeight - 1 && t.push({
                        y: e.y + 1,
                        x: e.x
                    });
                for (var n = 0; n < t.length; n++)
                    this.getGridDataByPos(t[n]).gridID !== gridTypeEm.normal && (t.splice(n, 1),
                        n--);
                return t
            },
            getMapConfig: function () {
                for (var e = "", t = 0; t < this.gridArr.length; t++)
                    for (var i = 0; i < this.gridArr[t].length; i++)
                        e += this.gridArr[t][i].gridID + "|";
                return e.substr(0, e.length - 1)
            },
            mapMoveGrid: function () { },
            moveDragonGrid: function (e) {
                for (var t = 0; t < this.gridArr.length; t++)
                    for (var i = 0; i < this.gridArr[t].length; i++) {
                        var n = this.gridArr[t][i];
                        n.gridID === gridTypeEm.dragonfly && this.computeDirEmptyGrid(e, n)
                    }
            },
            computeDirEmptyGrid: function (e, t) {
                if (!t.isEmpty()) {
                    var i = JSON.parse(JSON.stringify(t.gridPos))
                        , n = 0;
                    switch (e) {
                        case 1:
                            for (var a = i.y - 1; a >= 0 && this.gridArr[a][i.x].isEmpty(); a--)
                                n++;
                            i.y -= n
                    }
                    n > 0 && (this.tempGridByPos(t.gridPos, i),
                        t.gridID === gridTypeEm.dragonfly && 0 === i.y && (fightControl.collectData.collectTargetByType(collectTypeEm.dragonfly, 1),
                            this.deleteGrid(i),
                            t.refreshGridOther(0)))
                }
            },
            tempGridByPos: function (e, t) {
                var i, n, a = this.getGridDataByPos(e), o = this.getGridDataByPos(t);
                i = null == o.lastPos ? t : o.lastPos,
                    n = null == a.lastPos ? e : a.lastPos,
                    i && (a.lastPos = n),
                    n && (o.lastPos = i);
                var r = this.gridArr[t.y][t.x];
                this.gridArr[t.y][t.x] = this.gridArr[e.y][e.x],
                    this.gridArr[e.y][e.x] = r;
                var s = this.gridArr[t.y][t.x].gridPos;
                this.gridArr[t.y][t.x].gridPos = this.gridArr[e.y][e.x].gridPos,
                    this.gridArr[e.y][e.x].gridPos = s
            },
            createTwoCollectGrid: function () {
                for (var e = [], t = 0; t < this.gridArr.length; t++)
                    for (var i = 0; i < this.gridArr[t].length; i++) {
                        var n = this.gridArr[t][i];
                        n.isCollectGrid() && (e = e.concat(this.getArroundPos(n.gridPos, gridTypeEm.normal)))
                    }
                if (!(e.length < 2)) {
                    var a = GameTool.removeDuplicateArr(e)
                        , o = fightControl.createElement(1)
                        , r = this.getRandomDataByArray(a, 2);
                    return this.addGridData(o, r),
                        r
                }
            },
            getArroundPos: function (e, t) {
                for (var i = [], n = e.y - 1; n <= e.y + 1; n++)
                    for (var a = e.x - 1; a <= e.x + 1; a++) {
                        var o = Math.abs(e.x - a + e.y - n);
                        if (null != this.gridArr[n] && null != this.gridArr[n][a] && 1 === o) {
                            var r = this.gridArr[n][a];
                            r.gridID === t && i.push(JSON.parse(JSON.stringify(r.gridPos)))
                        }
                    }
                return i
            },
            isCollectGrid: function (e) {
                for (var t in collectIdObj)
                    if (collectIdObj[t] === e)
                        return !0;
                if (e === gridTypeEm.clawball1 || e === gridTypeEm.clawball2 || e === gridTypeEm.clawball3 || e === gridTypeEm.clawball4)
                    return !1
            },
            moveGridByConfig: function (e) {
                var t = e || this.moveDir;
                if (t === moveDirTypeEm.up || t === moveDirTypeEm.down) {
                    for (var i = 0; i < this.mapWight; i++)
                        if (t === moveDirTypeEm.up)
                            for (var n = 1; n < this.mapHeight; n++)
                                this.computeDirEmptyGrid1(t, this.gridArr[n][i]);
                        else if (t === moveDirTypeEm.down)
                            for (var a = this.mapHeight - 2; a >= 0; a--)
                                this.computeDirEmptyGrid1(t, this.gridArr[a][i])
                } else if (t === moveDirTypeEm.left || t === moveDirTypeEm.right)
                    for (var o = 0; o < this.mapHeight; o++)
                        if (t === moveDirTypeEm.left)
                            for (var r = 1; r < this.mapWight; r++)
                                this.computeDirEmptyGrid1(t, this.gridArr[o][r]);
                        else if (t === moveDirTypeEm.right)
                            for (var s = this.mapWight - 2; s >= 0; s--)
                                this.computeDirEmptyGrid1(t, this.gridArr[o][s])
            },
            computeDirEmptyGrid1: function (e, t) {
                if (!t.isEmpty()) {
                    var i = JSON.parse(JSON.stringify(t.gridPos))
                        , n = 0;
                    switch (e) {
                        case 1:
                            for (var a = 0; a < i.y; a++)
                                this.gridArr[a][i.x].isEmpty() && n++;
                            i.y -= n;
                            break;
                        case 2:
                            for (var o = this.mapHeight - 1; o > i.y; o--)
                                this.gridArr[o][i.x].isEmpty() && n++;
                            i.y += n;
                            break;
                        case 3:
                            for (var r = 0; r < i.x; r++)
                                this.gridArr[i.y][r].isEmpty() && n++;
                            i.x -= n;
                            break;
                        case 4:
                            for (var s = this.mapWight - 1; s > i.x; s--)
                                this.gridArr[i.y][s].isEmpty() && n++;
                            i.x += n
                    }
                    this.tempGridByPos(t.gridPos, i)
                }
            }
        }),
            cc._RF.pop()
    }
        , {
        GridData: "GridData"
    }],
    NewElementTipsLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "8381aTNiKdK77itPF8K3su7", "NewElementTipsLayer");
        var i = e("PublicLayer");
        window.newElementConfig = {
            0: {
                lv: 15,
                des: 1037,
                textureArr: [bgImgUrl.cloudbg]
            },
            1: {
                lv: 8,
                des: 1036,
                textureArr: [bgImgUrl.ironbg]
            },
            2: {
                lv: 19,
                des: 1047,
                textureArr: [bgImgUrl.icebg]
            },
            3: {
                lv: 13,
                des: 1050,
                textureArr: [bgImgUrl.dragonflybg]
            },
            4: {
                lv: -1,
                des: 1055,
                textureArr: [bgImgUrl.eggbg]
            },
            5: {
                lv: -1,
                des: 1056,
                textureArr: [bgImgUrl.bonfirebg]
            },
            6: {
                lv: 38,
                des: 1057,
                textureArr: [bgImgUrl.birdcage]
            },
            7: {
                lv: 56,
                des: 1058,
                textureArr: [bgImgUrl.flower1, bgImgUrl.flower2]
            },
            8: {
                lv: 21,
                des: 1059,
                textureArr: [bgImgUrl.clawball]
            }
        },
            cc.Class({
                extends: i,
                properties: {
                    isAddSprite: null,
                    tipsType: null,
                    spriteNode: null
                },
                onDestroy: function () {
                    this.isAddSprite = null,
                        this.tipsType = null,
                        this.spriteNode = null,
                        engine.eventM.emit(event_id.CLOSE_NEW_ELEMENT)
                },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                initialize: function (e) {
                    this.isAddSpriteNum = 0,
                        this.tipsType = e,
                        this.tipConfig = newElementConfig[e];
                    var t = {
                        bg: {
                            width: 670,
                            height: 626 + 200 * (this.tipConfig.textureArr.length - 1)
                        },
                        title: {
                            txt: getLanguageDic(1035)
                        },
                        close: !0
                    };
                    this.bgHeight = t.bg.height;
                    var i = engine.memory.getFont(needLoadFont.fntttf1_font)
                        , n = new cc.Node;
                    n.anchorY = 1,
                        n.y = this.bgHeight / 2 - 60,
                        n.width = 600,
                        n.height = 120;
                    var a = n.addComponent(cc.Label);
                    a.overflow = cc.Label.Overflow.SHRINK,
                        a.enableWrapText = !0,
                        a.fontSize = 28,
                        a.lineHeight = 40,
                        a.horizontalAlign = cc.Label.HorizontalAlign.CENTER,
                        a.verticalAlign = cc.Label.VerticalAlign.TOP,
                        a.font = i,
                        a.string = getLanguageDic(newElementConfig[this.tipsType].des),
                        this.node.getChildByName("activenode").addChild(n);
                    var o = a.addComponent(cc.LabelOutline);
                    o.width = 2,
                        o.color = cc.color("#723B11"),
                        this.addEvent(),
                        this.existExistResArr = {},
                        this._super(t)
                },
                addNewElementSprite: function () {
                    for (var e = 0; e < this.tipConfig.textureArr.length; e++) {
                        var t = this.tipConfig.textureArr[e];
                        if (1 == engine.memory.isExistRes(t, !0) && 1 !== this.existExistResArr[e]) {
                            var i = new cc.Node
                                , n = 130 - 30 * this.tipConfig.textureArr.length;
                            i.addComponent(cc.Sprite).spriteFrame = engine.memory.getTexture(t),
                                this.node.getChildByName("activenode").addChild(i),
                                i.y = -this.bgHeight / 2 + n + (i.height + 30) * (this.tipConfig.textureArr.length - e - 1 + .5),
                                this.isAddSpriteNum++,
                                this.existExistResArr[e] = 1
                        }
                    }
                },
                update: function () {
                    this.isAddSpriteNum > this.tipConfig.textureArr.length || this.addNewElementSprite()
                }
            }),
            cc._RF.pop()
    }
        , {
        PublicLayer: "PublicLayer"
    }],
    NewModeLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "b8195l1RSxNepL6MoTcdv1O", "NewModeLayer");
        var i = e("PublicLayer");
        window.newModeTipsTypeEm = {
            combo: 0
        },
            window.newModeConfig = {},
            cc.Class({
                extends: i,
                properties: {
                    isAddSprite: null,
                    tipsType: null,
                    spriteNode: null
                },
                onDestroy: function () {
                    this.isAddSprite = null,
                        this.tipsType = null,
                        this.spriteNode = null,
                        engine.eventM.emit(event_id.CLOSE_NEW_ELEMENT)
                },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                initialize: function (e) {
                    this.isAddSpriteNum = 0,
                        this.tipsType = e,
                        this.tipConfig = newModeConfig[e];
                    var t = {
                        bg: {
                            width: 593,
                            height: 768
                        },
                        title: {
                            txt: getLanguageDic(1051)
                        },
                        close: !0
                    };
                    this.bgHeight = t.bg.height;
                    var i = engine.memory.getFont(needLoadFont.fntttf1_font)
                        , n = new cc.Node;
                    n.anchorY = 1,
                        n.y = this.bgHeight / 2 - 60,
                        n.width = 500,
                        n.height = 120;
                    var a = n.addComponent(cc.Label);
                    a.overflow = cc.Label.Overflow.SHRINK,
                        a.enableWrapText = !0,
                        a.fontSize = 22,
                        a.lineHeight = 26,
                        a.horizontalAlign = cc.Label.HorizontalAlign.CENTER,
                        a.verticalAlign = cc.Label.VerticalAlign.TOP,
                        a.font = i,
                        a.string = getLanguageDic(this.tipConfig.des),
                        this.node.getChildByName("activenode").addChild(n),
                        this.addEvent(),
                        this.existExistResArr = {},
                        this._super(t)
                },
                addNewModeSprite: function () {
                    for (var e = 0; e < this.tipConfig.textureArr.length; e++) {
                        var t = this.tipConfig.textureArr[e];
                        if (1 == engine.memory.isExistRes(t, !0) && 1 !== this.existExistResArr[e]) {
                            var i = new cc.Node;
                            i.addComponent(cc.Sprite).spriteFrame = engine.memory.getTexture(t),
                                this.node.getChildByName("activenode").addChild(i),
                                i.y = -this.bgHeight / 2 + 50 + (i.height + 30) * (this.tipConfig.textureArr.length - e - 1 + .5),
                                this.isAddSpriteNum++,
                                this.existExistResArr[e] = 1
                        }
                    }
                },
                update: function () {
                    this.isAddSpriteNum > this.tipConfig.textureArr.length || this.addNewModeSprite()
                }
            }),
            cc._RF.pop()
    }
        , {
        PublicLayer: "PublicLayer"
    }],
    NumBigUnit: [function (e, t) {
        "use strict";
        cc._RF.push(t, "f9fa3PrubNLk6r6QvPo03LW", "NumBigUnit");
        var i = cc.Class({
            properties: {
                num: null,
                numUnit: null,
                criticalNum: 9999999
            },
            onDestroy: function () {
                this.num = null,
                    this.numUnit = null
            },
            initialize: function (e) {
                "number" == typeof e && ((t = new Object).numUnit = 0,
                    t.num = e,
                    e = t);
                var t = this.isScientific(e.num);
                this.num = t.num,
                    this.numUnit = t.numUnit + e.numUnit,
                    this.formatNum()
            },
            formatNum: function () {
                if (this.num > this.criticalNum) {
                    var e = (t = parseInt(this.num).toString().length) - (i = this.criticalNum.toString().length);
                    this.num = this.num / Math.pow(10, e),
                        this.numUnit += e
                } else if (this.numUnit > 0) {
                    var t, i;
                    (t = parseInt(this.num).toString().length) < (i = this.criticalNum.toString().length) && ((e = i - t) > this.numUnit && (e = this.numUnit),
                        this.num = this.num * Math.pow(10, e),
                        this.numUnit -= e)
                }
            },
            isScientific: function (e) {
                var t = new Object
                    , i = e.toString()
                    , n = i.indexOf("e+")
                    , a = i.indexOf("E+");
                return a > n && (n = a),
                    n > -1 ? (t.num = 1e4 * parseFloat(i.substring(0, n)),
                        t.numUnit = parseInt(i.substring(n + 2, i.length)) - 4) : (t.num = e,
                            t.numUnit = 0),
                    t
            },
            getAddNum: function (e) {
                if ("number" == typeof e) {
                    var t = new i;
                    t.initialize({
                        num: e,
                        numUnit: 0
                    }),
                        e = t
                }
                var n = null
                    , a = new Object
                    , o = null;
                this.numUnit >= e.numUnit ? (n = this.num,
                    o = this.numUnit,
                    a.num = e.num,
                    a.numUnit = e.numUnit) : this.numUnit < e.numUnit && (n = e.num,
                        o = e.numUnit,
                        a.num = this.num,
                        a.numUnit = this.numUnit);
                var r = o - a.numUnit;
                r > 0 && (a.num = a.num / Math.pow(10, r)),
                    (n += a.num) > this.criticalNum && (n /= 10,
                        o++);
                var s = {
                    num: n,
                    numUnit: o
                }
                    , c = new i;
                return c.initialize(s),
                    c
            },
            getSubNum: function (e, t) {
                if ("number" == typeof e) {
                    var n = new i;
                    n.initialize({
                        num: e,
                        numUnit: 0
                    }),
                        e = n
                }
                if (e.numUnit > this.numUnit && 1 == t) {
                    var a = {
                        num: 0,
                        numUnit: 0
                    };
                    return (r = new i).initialize(a),
                        r
                }
                var o = new Object;
                o.num = e.num,
                    o.numUnit = e.numUnit;
                var r, s = this.numUnit - o.numUnit;
                return o.num = o.num / Math.pow(10, s),
                    o.num > this.num && 1 == t ? (a = {
                        num: 0,
                        numUnit: 0
                    },
                        (r = new i).initialize(a),
                        r) : (a = {
                            num: this.num - o.num,
                            numUnit: this.numUnit
                        },
                            (r = new i).initialize(a),
                            r)
            },
            getMultiplication: function (e) {
                var t = this.num
                    , n = this.numUnit;
                "number" == typeof e ? t *= e : (t *= e.num,
                    n += e.numUnit);
                var a = {
                    num: t,
                    numUnit: n
                }
                    , o = new i;
                return o.initialize(a),
                    o
            },
            getPercentage: function (e) {
                if ("number" == typeof e) {
                    var t = new Object;
                    t.numUnit = 0,
                        t.num = e,
                        e = t
                }
                var i = e.num
                    , n = e.numUnit
                    , a = parseInt(this.num).toString().length + this.numUnit
                    , o = parseInt(i).toString().length + n;
                if (a < o - 3)
                    return 0;
                if (a > o + 3)
                    return 100;
                var r = this.num
                    , s = this.numUnit
                    , c = s;
                return c > n && (c = n),
                    s -= c,
                    r *= Math.pow(10, s),
                    n -= c,
                    0 == (i *= Math.pow(10, n)) ? (cc.error("\u6ce8\u610f\uff1a\u9664\u6570\u4e3a0\u3002"),
                        0) : r / i
            },
            getDivide: function (e) {
                if ("number" == typeof e) {
                    var t = new i;
                    t.initialize({
                        num: e,
                        numUnit: 0
                    }),
                        e = t
                }
                if (0 == e.num) {
                    cc.error("\u6ce8\u610f\uff1a\u9664\u6570\u4e3a0\u3002");
                    var n = {
                        num: 0,
                        numUnit: 0
                    };
                    return (l = new i).initialize(n),
                        l
                }
                var a = this.num
                    , o = this.numUnit
                    , r = e.num
                    , s = e.numUnit
                    , c = o;
                if (c > s && (c = s),
                    o -= c,
                    (s -= c) > 100)
                    return n = {
                        num: 0,
                        numUnit: 0
                    },
                        (l = new i).initialize(n),
                        l;
                r *= Math.pow(10, s);
                var l, h = parseInt(r).toString().length, d = parseInt(a).toString().length, u = 3;
                return d < h + 3 && (u = u + h + 3 - d),
                    u > o && (u = o),
                    n = {
                        num: (a *= Math.pow(10, u)) / r,
                        numUnit: o -= u
                    },
                    (l = new i).initialize(n),
                    l
            },
            getNumText: function (e, t) {
                t = null == t ? 1 : t;
                var i = "k"
                    , n = 97
                    , a = ["m", "b", "t"];
                1 == e && (a = ["M", "B", "T"],
                    i = "K",
                    n = 65);
                var o = ""
                    , r = parseInt(this.num).toString().length + this.numUnit;
                if (this.num < 1e3)
                    o = this.num.toFixed(0);
                else {
                    var s = "";
                    if (r <= 6)
                        s = i;
                    else if (r <= 15)
                        s = a[c = Math.floor((r - 7) / 3)];
                    else {
                        var c;
                        if ((c = Math.floor((r - 16) / 3)) >= 676) {
                            var l = Math.floor(c / 676) + n - 1;
                            s = String.fromCharCode(l),
                                c %= 676
                        }
                        var h = Math.floor(c / 26) + n
                            , d = c % 26 + n;
                        s = s + String.fromCharCode(h) + String.fromCharCode(d)
                    }
                    var u = this.num
                        , m = 3 - this.numUnit % 3;
                    for (3 == m && (m = 0),
                        u = parseFloat((u / Math.pow(10, m)).toFixed(2)); u >= 1e3;)
                        u = parseFloat((u / 1e3).toFixed(t));
                    o = u.toString() + s
                }
                return o
            },
            getSaveData: function () {
                var e = new Object;
                return e.num = this.num,
                    e.numUnit = this.numUnit,
                    e
            },
            clone: function () {
                var e = new i;
                return e.initialize({
                    num: this.num,
                    numUnit: this.numUnit
                }),
                    e
            },
            isBiggerZero: function () {
                return this.num > 0
            },
            setZero: function () {
                this.num = 0,
                    this.numUnit = 0
            },
            compareWithNum: function (e) {
                if ("number" == typeof e) {
                    var t = new i;
                    t.initialize({
                        num: e,
                        numUnit: 0
                    }),
                        e = t
                }
                return this.numUnit > e.numUnit || !(this.numUnit < e.numUnit) && this.num >= e.num
            },
            equalWithNum: function (e) {
                if ("number" == typeof e) {
                    var t = new i;
                    t.initialize({
                        num: e,
                        numUnit: 0
                    }),
                        e = t
                }
                return this.numUnit == e.numUnit && this.num == e.num
            },
            getNum: function () {
                return this.num * Math.pow(10, this.numUnit)
            },
            getIntNum: function () {
                this.formatNum(),
                    0 == this.numUnit && (this.num = Math.ceil(this.num))
            }
        });
        window.getCalculateCritical = function (e) {
            return e > 2 ? 300 : e > 1.5 ? 1e3 : e > 1.2 ? 1700 : e > 1.1 ? 3800 : 7300
        }
            ,
            window.powerGuardBreak = function (e, t) {
                var n = new i;
                n.initialize({
                    num: 1,
                    numUnit: 0
                });
                for (var a = getCalculateCritical(e); t > a;) {
                    t -= a;
                    var o = Math.pow(e, a);
                    (new i).initialize({
                        num: o,
                        numUnit: 0
                    }),
                        n = n.getMultiplication(o)
                }
                var r = Math.pow(e, t)
                    , s = new i;
                return s.initialize({
                    num: r,
                    numUnit: 0
                }),
                    n.getMultiplication(s)
            }
            ,
            cc._RF.pop()
    }
        , {}],
    NumCalculate: [function (e, t) {
        "use strict";
        cc._RF.push(t, "af541boy7xN9r/9ae1/WeT1", "NumCalculate");
        var i = cc.Class({
            properties: {
                numArr: null
            },
            ctor: function () {
                this.initialize()
            },
            onDestroy: function () {
                this.isInit = null;
                for (var e = this.numArr.length - 1; e >= 0; e--)
                    this.numArr.splice(e, 1);
                this.numArr = null
            },
            initialize: function () {
                1 != this.isInit && (this.isInit = !0)
            },
            addNum: function (e) {
                for (var t = Math.max(this.numArr.length, e.numArr.length), i = 0; i < t; i++) {
                    null == this.numArr[i] && (this.numArr[i] = 0),
                        null == e.numArr[i] && (e.numArr[i] = 0),
                        this.numArr[i] = this.numArr[i] + e.numArr[i];
                    var n = this.numArr[i] / 1e9;
                    if (n > 1) {
                        var a = this.numArr[i] % 1e9;
                        null == this.numArr[i + 1] && (this.numArr[i + 1] = 0),
                            this.numArr[i + 1] = this.numArr[i + 1] + Math.floor(n),
                            this.numArr[i] = a
                    }
                }
                ccLog("\u8ba1\u7b97\u52a0\u6cd5\u503c\uff1a" + this.numArr)
            },
            subNum: function (e) {
                if (this.numArr.length < e.numArr.length)
                    return !1;
                if (this.numArr.length - e.numArr.length < 2)
                    for (var t = 0; t < this.numArr.length; t++)
                        if (null == e.numArr[t] && (e.numArr[t] = 0),
                            this.numArr[t] >= e.numArr[t])
                            this.numArr[t] = this.numArr[t] - e.numArr[t];
                        else {
                            if (null == this.numArr[t + 1])
                                return !1;
                            if (this.numArr[t + 1] > 0)
                                this.numArr[t + 1] = this.numArr[t + 1] - 1,
                                    this.numArr[t] = this.numArr[t] + 1e9,
                                    this.numArr[t] = this.numArr[t] - e.numArr[t];
                            else {
                                if (null == this.numArr[t + 2])
                                    return !1;
                                this.numArr[t + 2] = this.numArr[t + 2] - 1,
                                    this.numArr[t + 1] = this.numArr[t + 1] + 1e9,
                                    this.numArr[t + 1] = this.numArr[t + 1] - 1,
                                    this.numArr[t] = this.numArr[t] + 1e9,
                                    this.numArr[t] = this.numArr[t] - e.numArr[t]
                            }
                        }
                ccLog("\u8ba1\u7b97\u52a0\u6cd5\u503c\uff1a" + this.numArr)
            },
            multiplicationNum: function (e) {
                for (var t = [], n = 0; n < this.numArr.length; n++) {
                    for (var a = [], o = 0; o < e.numArr.length; o++) {
                        for (var r = this.numArr[n] * e.numArr[o], s = 0; s < o; s++)
                            a.push(0);
                        a.push(r)
                    }
                    t.push(a)
                }
                for (this.numArr = [],
                    n = 0; n < t.length; n++) {
                    var c = new i;
                    c.loadSaveData(t[n]),
                        this.addNum(c)
                }
                (new i).loadSaveData([]),
                    this.addNum(c)
            },
            getNumText: function () {
                this.deleteHighestNumArr();
                var e = [["", "K", "M", "B", "KB", "MB", "TB"], ["BB"], ["BBB"]][this.numArr.length - 1]
                    , t = ""
                    , i = 0;
                if (e.length > 1) {
                    var n = 0;
                    for (i = (i = this.numArr[0]).toFixed(2); i >= 1e3;)
                        i = (i / 1e3).toFixed(2),
                            n++;
                    t = e[n]
                } else {
                    t = e[0],
                        i = this.numArr[this.numArr.length - 1];
                    var a = this.numArr[this.numArr.length - 2] / 1e9;
                    a >= .01 && (i += parseFloat(a.toFixed(2)))
                }
                return i + t
            },
            deleteHighestNumArr: function () {
                return 0 == this.numArr[this.numArr.length - 1] ? (this.numArr.splice(this.numArr.length - 1, 1),
                    this.deleteHighestNumArr(),
                    !1) : (0 == this.numArr.length && this.numArr.push(0),
                        !0)
            },
            getSaveData: function () {
                return this.numArr
            },
            loadSaveData: function (e) {
                this.numArr = e
            }
        });
        cc._RF.pop()
    }
        , {}],
    PauseLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "2a925F11pxNN50pFel0osIE", "PauseLayer");
        var i = e("PublicLayer");
        cc.Class({
            extends: i,
            properties: {
                pauseNode: null
            },
            onDestroy: function () {
                this.pauseNode = null,
                    bannerManager.hideBanner(bannerLayerNameOb.pause)
            },
            destroyClass: function () {
                engine.eventM.emit(event_id.REFRESH_PAUSE, !1),
                    null != this.pauseNode && this.pauseNode.destroy(),
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
            },
            addEvent: function () {
                this._super(),
                    this.pauseNode.getChildByName("homebtn").on(cc.Node.EventType.TOUCH_END, this.clickHomeBtn, this),
                    this.pauseNode.getChildByName("helpbtn").on(cc.Node.EventType.TOUCH_END, this.clickHelpBtn, this)
            },
            removeEvent: function () {
                this._super(),
                    this.pauseNode.getChildByName("homebtn").on(cc.Node.EventType.TOUCH_END, this.clickHomeBtn, this),
                    this.pauseNode.getChildByName("helpbtn").on(cc.Node.EventType.TOUCH_END, this.clickHelpBtn, this)
            },
            initialize: function () {
                var e = {
                    bg: {
                        y: -12,
                        width: 585,
                        height: 580
                    },
                    bg2: {
                        y: -1,
                        width: 538,
                        height: 598
                    },
                    title: {
                        y: 310,
                        txt: getLanguageDic(1025)
                    },
                    close: {
                        x: 268,
                        y: 300
                    }
                };
                this.pauseNode = engine.memory.getPrefab(needLoadPrefab.pause_layer_prefab),
                    this.node.getChildByName("activenode").addChild(this.pauseNode),
                    this.addEvent(),
                    this._super(e),
                    bannerManager.refreshBanner(bannerLayerNameOb.pause)
            },
            clickHelpBtn: function () {
                openWindowLayer(openTypeEm.help)
            },
            clickHomeBtn: function () {
                heroData.gameConfig = fightControl.getGameConfig(),
                    heroData.saveData(),
                    sceneControl.turnMainScene()
            }
        }),
            cc._RF.pop()
    }
        , {
        PublicLayer: "PublicLayer"
    }],
    PublicLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "299c3rjmQ9KS6iGOqnSETCr", "PublicLayer"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                addEvent: function () {
                    this.node.getChildByName("activenode").getChildByName("bg").getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this)
                },
                removeEvent: function () {
                    this.node.getChildByName("activenode").getChildByName("bg").getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this)
                },
                initialize: function (e) {
                    var t = this.node.getChildByName("activenode");
                    if (null != e) {
                        var i = t.getChildByName("bg");
                        i.width = e.bg.width,
                            i.height = e.bg.height;
                        var n = i.getChildByName("bg2");
                        n.width = e.bg.width - 50,
                            n.height = e.bg.height - 60;
                        var a = t.getChildByName("titlebg");
                        a.active = !1;
                        var o = a.getChildByName("title");
                        null == e.title ? o.active = !1 : (a.active = !0,
                            o.y = 8,
                            a.y = i.height / 2 - 15,
                            o.getComponent(cc.Label).string = e.title.txt);
                        var r = i.getChildByName("closebtn");
                        null == e.close && (r.active = !1)
                    }
                    t.scale = .5,
                        t.runAction(cc.sequence(cc.delayTime(.02), cc.scaleTo(.2, 1.1), cc.scaleTo(.1, .9), cc.scaleTo(.1, 1)))
                },
                clickCloseBtn: function () {
                    this.destroyClass()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    RaceLampData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "e207ePgrsFMHqpnzCp5NEno", "RaceLampData"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    raceLampArr: null,
                    raceLampTime: null
                },
                initialize: function () {
                    this.raceLampArr = [],
                        this.getRaceLampTime()
                },
                refreshRaceLamp: function () {
                    engine.gameTime.localTime >= this.raceLampTime && (this.addRaceLampData(),
                        this.getRaceLampTime())
                },
                getRaceLampTime: function () {
                    this.raceLampTime = engine.gameTime.localTime + 1e3 * GameTool.getRandomInt(30, 60)
                },
                addRaceLampData: function (e) {
                    var t = ""
                        , i = 0;
                    if (null == e) {
                        var n = GameTool.getRandomInt(0, randomNameArr.length - 1);
                        t = randomNameArr[n],
                            i = GameTool.getRandomInt(1, 9)
                    } else
                        t = gameSDK.sdkPlayInfo.name,
                            i = e;
                    var a = getDicData(dataJson.grade_json, i, "name")
                        , o = getLanguageDic(1040).replace("%s", t).replace("%l", a);
                    this.raceLampArr.push(o)
                },
                getRaceLampData: function () {
                    return this.raceLampArr.length > 0 ? this.raceLampArr[0] : null
                },
                deleteRaceLampData: function () {
                    this.raceLampArr.length > 0 && this.raceLampArr.shift()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    Resource: [function (e, t) {
        "use strict";
        cc._RF.push(t, "a2c35h4cyNJTqVY0ZadmCUs", "Resource"),
            window.dataJson = {
                language_json: "language",
                item_json: "item",
                stronger_json: "stronger",
                globle_json: "globle",
                achievement_json: "achievement",
                dailytask_json: "dailytask",
                mysteriousgift_json: "mysteriousgift",
                level_json: "level",
                levelscore_json: "levelscore",
                grade_json: "grade",
                treasurechest_json: "treasurechest"
            },
            window.loginLoadPrefab = {},
            window.loginLoadImage = {
                publicimg1: "img/public/publicimg1",
                scaleimg1: "img/scale/scaleimg1"
            },
            window.loginLoadSpine = {},
            window.needLoadFont = {
                fntttf1_font: "font/fnt1"
            },
            window.needLoadTexture = {},
            window.needLoadPrefab = {
                fight_prefab: "prefab/fightui/fight_prefab",
                public_watch_prefab: "prefab/publicui/public_watch_prefab",
                main_prefab: "prefab/mainui/main_prefab",
                public_layer_prefab: "prefab/publicui/public_layer_prefab",
                loading_prefab: "prefab/publicui/loading_prefab",
                pause_layer_prefab: "prefab/fightui/pause_layer_prefab",
                grid_node_prefab: "prefab/fightui/grid_node_prefab",
                boss_layer_prefab: "prefab/fightui/boss_layer_prefab",
                target_layer_prefab: "prefab/fightui/target_layer_prefab",
                level_target_layer_prefab: "prefab/fightui/level_target_layer_prefab"
            },
            window.needLoadImage = {
                mastloadimg1: "img/mastloadimg/mastloadimg1"
            },
            window.needLoadLanguageImage = {
                language1: "language1"
            },
            window.needLoadSpine = {
                bomb: "spine/bomb",
                lightning: "spine/lightning",
                rearrange: "spine/rearrange",
                ice: "spine/ice",
                rocket: "spine/rocket",
                sight: "spine/sight",
                demon: "spine/demon",
                smoke: "spine/smoke",
                boss: "spine/fight/boss",
                egg: "spine/fight/egg",
                bonfire: "spine/fight/bonfire",
                dragonfly: "spine/fight/dragonfly",
                block: "spine/fight/block",
                puzzleSelect: "spine/main/select"
            },
            window.needLoadParticle = {
                rearrange_plz: "particle/rearrange_plz",
                feather: "particle/feather",
                explode: "particle/explode",
                fragment: "particle/fragment",
                particle_stars: "particle/particle_stars"
            },
            window.nextLoadPrefab = {
                achievement_stronger_prefab: "prefab/mainui/achievement_stronger_prefab",
                achievement_stronger_node_prefab: "prefab/mainui/achievement_stronger_node_prefab",
                daily_task_node_prefab: "prefab/mainui/daily_task_node_prefab",
                rank_prefab: "prefab/mainui/rank_prefab",
                rank_node_prefab: "prefab/mainui/rank_node_prefab",
                choose_messenger_prefab: "prefab/mainui/choose_messenger_prefab",
                grade_node_prefab: "prefab/mainui/grade_node_prefab",
                choose_level_layer_prefab: "prefab/mainui/choose_level_layer_prefab",
                page_view_layer_prefab: "prefab/mainui/level/page_view_layer_prefab",
                puzzle_layer_prefab: "prefab/mainui/level/puzzle_layer_prefab",
                watch_replay_level_Layer_prefab: "prefab/mainui/level/watch_replay_level_Layer_prefab",
                result_node_prefab: "prefab/fightui/result_node_prefab",
                help_node_prefab: "prefab/fightui/help_node_prefab",
                surpass_layer_prefab: "prefab/fightui/surpass_layer_prefab",
                tips_layer_prefab: "prefab/publicui/tips_layer_prefab",
                starGiftBox_layer_prefrab: "prefab/mainui/starGiftBox_layer_prefrab",
                surprise_layer_prefab: "prefab/mainui/surprise_layer_prefab",
                surprise_card_node_prefab: "prefab/mainui/surprise_card_node_prefab",
                custom_end_prefab: "prefab/fightui/custom_end_prefab",
                game_over_prefab: "prefab/fightui/game_over_prefab",
                result_prefab: "prefab/fightui/result_prefab",
                resurgence_layer_prefab: "prefab/fightui/resurgence_layer_prefab",
                grade_up_layer_prefab: "prefab/fightui/grade_up_layer_prefab",
                lose_detail_layer_prefab: "prefab/fightui/lose_detail_layer_prefab",
                starBox_node_prefab: "prefab/fightui/starBox_node_prefab",
                challenge_layer_prefab: "prefab/mainui/challenge_layer_prefab",
                challenge_node_prefab: "prefab/mainui/challenge_node_prefab",
                challengeInvite_layer_prefab: "prefab/mainui/challengeInvite_layer_prefab",
                challengeSurpass_layer_prefab: "prefab/fightui/challengeSurpass_layer_prefab",
                challengeOver_layer_prefab: "prefab/fightui/challengeOver_layer_prefab",
                smallgame_select_layer_prefab: "prefab/smallgame/smallgame_select_layer_prefab",
                smallgame_zuma_prefab: "prefab/smallgame/smallgame_zuma_prefab",
                smallgame_end_layer_prefab: "prefab/smallgame/smallgame_end_layer_prefab",
                smallgame_certain_exit_prefab: "prefab/smallgame/smallgame_certain_exit_prefab",
                smallgame_qs_prefab: "prefab/smallgame/smallgame_qs_prefab"
            },
            window.nextLoadImage = {
                nextloadimg1: "img/nextloadimg/nextloadimg1",
                fightimg1: "img/fightimg/fightimg1",
                fightimg2: "img/fightimg/fightimg2",
                level: "img/main/levelimg",
                levelGiftBoxImg: "img/fightimg/levelGiftBoxImg"
            },
            window.nextLoadSpine = {
                spread: "spine/spread",
                fly: "spine/fight/fly",
                sparkle: "spine/fight/sparkle",
                star: "spine/star",
                congratulations: "spine/congratulations",
                openthechest: "spine/fight/openthechest",
                mysterious: "spine/mysterious",
                select: "spine/select",
                thunder: "spine/fight/thunder",
                end_light: "spine/end_light"
            },
            window.nextLoadParticle = {
                xingxing: "particle/xingxing"
            },
            window.bgImgUrl = {
                surpassBg: "img/background/surpassbg",
                cloudBig: "img/background/clousbig",
                cloudbg: "img/background/cloudbg",
                ironbg: "img/background/ironbg",
                icebg: "img/background/icebg",
                combobg1: "img/background/combobg1",
                combobg2: "img/background/combobg2",
                dragonflybg: "img/background/dragonflybg",
                eggbg: "img/background/eggbg",
                bonfirebg: "img/background/bonfirebg",
                birdcage: "img/background/birdcage",
                flower1: "img/background/flower1",
                flower2: "img/background/flower2",
                clawball: "img/background/clawball"
            },
            window.puzzleBgImgUrl = {
                puzzle_1: "img/background/puzzle_1",
                puzzle_2: "img/background/puzzle_2",
                puzzle_3: "img/background/puzzle_3",
                puzzle_4: "img/background/puzzle_4",
                puzzle_5: "img/background/puzzle_5",
                puzzle_6: "img/background/puzzle_6",
                puzzle_7: "img/background/puzzle_7",
                puzzle_8: "img/background/puzzle_8",
                puzzle_9: "img/background/puzzle_9",
                puzzle_10: "img/background/puzzle_10",
                puzzle_11: "img/background/puzzle_11",
                puzzle_12: "img/background/puzzle_12",
                puzzle_13: "img/background/puzzle_13",
                puzzle_14: "img/background/puzzle_14",
                puzzle_15: "img/background/puzzle_15",
                puzzle_16: "img/background/puzzle_16",
                puzzle_17: "img/background/puzzle_17",
                puzzle_18: "img/background/puzzle_18",
                puzzle_19: "img/background/puzzle_19",
                puzzle_20: "img/background/puzzle_20"
            },
            window.soundurl = {
                cleargrid: "sound/cleargrid",
                clickgrid: "sound/clickgrid",
                combo10: "sound/combo10",
                combo15: "sound/combo15",
                combo20: "sound/combo20",
                gameover: "sound/gameover",
                rearrange: "sound/rearrange",
                timeend: "sound/timeend",
                victory: "sound/victory",
                bomb: "sound/bomb",
                bgMusic: "sound/bgmusic"
            },
            window.initRes = function () {
                for (var e in dataJson)
                    dataJson[e] = "language/" + engineGlobal.gamelanguage + "/data/" + dataJson[e];
                for (var t in needLoadLanguageImage)
                    needLoadLanguageImage[t] = "language/" + engineGlobal.gamelanguage + "/img/" + needLoadLanguageImage[t]
            }
            ,
            window.gameLoginRes = function () {
                var e = [];
                for (var t in dataJson)
                    e.push({
                        url: dataJson[t],
                        restype: LoadStyleType.json
                    });
                for (var i in loginLoadPrefab)
                    e.push({
                        url: loginLoadPrefab[i],
                        restype: LoadStyleType.prefab
                    });
                for (var n in loginLoadImage)
                    e.push({
                        url: loginLoadImage[n],
                        restype: LoadStyleType.spriteAtlas
                    });
                for (var a in loginLoadSpine)
                    e.push({
                        url: loginLoadSpine[a],
                        restype: LoadStyleType.spine
                    });
                for (var i in needLoadPrefab)
                    e.push({
                        url: needLoadPrefab[i],
                        restype: LoadStyleType.prefab
                    });
                for (var o in needLoadImage)
                    e.push({
                        url: needLoadImage[o],
                        restype: LoadStyleType.spriteAtlas
                    });
                for (var o in needLoadLanguageImage)
                    e.push({
                        url: needLoadLanguageImage[o],
                        restype: LoadStyleType.spriteAtlas
                    });
                for (var r in needLoadFont)
                    e.push({
                        url: needLoadFont[r],
                        restype: LoadStyleType.font
                    });
                for (var s in needLoadTexture)
                    e.push({
                        url: needLoadTexture[s],
                        restype: LoadStyleType.texture
                    });
                for (var s in needLoadSpine)
                    e.push({
                        url: needLoadSpine[s],
                        restype: LoadStyleType.spine
                    });
                for (var o in nextLoadImage)
                    e.push({
                        url: nextLoadImage[o],
                        restype: LoadStyleType.spriteAtlas
                    });
                for (var o in needLoadLanguageImage)
                    e.push({
                        url: needLoadLanguageImage[o],
                        restype: LoadStyleType.spriteAtlas
                    });
                for (var s in needLoadParticle)
                    e.push({
                        url: needLoadParticle[s],
                        restype: LoadStyleType.particleAsset
                    });
                return e
            }
            ,
            window.gameMainRes = function () {
                return []
            }
            ,
            window.gameFightRes = function () {
                var e = [];
                for (var t in nextLoadSpine)
                    e.push({
                        url: nextLoadSpine[t],
                        restype: LoadStyleType.spine
                    });
                for (var i in bgImgUrl)
                    e.push({
                        url: bgImgUrl[i],
                        restype: LoadStyleType.texture
                    });
                for (var n in nextLoadPrefab)
                    e.push({
                        url: nextLoadPrefab[n],
                        restype: LoadStyleType.prefab
                    });
                for (var a in nextLoadParticle)
                    e.push({
                        url: nextLoadParticle[a],
                        restype: LoadStyleType.particleAsset
                    });
                return e
            }
            ,
            window.analysisJsonArr = function () {
                var e = [];
                for (var t in dataJson)
                    e.push(dataJson[t]);
                return e
            }
            ,
            cc._RF.pop()
    }
        , {}],
    ResultLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "d04cahuAyVMm5AObiTaVPcJ", "ResultLayer");
        var i = e("GameListLayer");
        cc.Class({
            extends: i,
            properties: {
                isCanClick: null,
                curData: null,
                moveLayer: null,
                curFriendData: null,
                isShowRank: null
            },
            onDestroy: function () {
                this.isCanClick = null,
                    this.curData = null,
                    this.moveLayer = null,
                    this.curFriendData = null,
                    this.isShowRank = null
            },
            destroyClass: function () {
                null != this.node && (this.removeEvent(),
                    this.node.destroy())
            },
            addEvent: function () {
                var e = this.node.getChildByName("activenode");
                e.getChildByName("homebtn").on(cc.Node.EventType.TOUCH_END, this.clickHomeBtn, this),
                    e.getChildByName("againbtn").on(cc.Node.EventType.TOUCH_END, this.clickAgainBtn, this),
                    e.getChildByName("watch").on(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this),
                    e.getChildByName("invite").on(cc.Node.EventType.TOUCH_END, this.clickInviteBtn, this)
            },
            removeEvent: function () {
                var e = this.node.getChildByName("activenode");
                e.getChildByName("homebtn").off(cc.Node.EventType.TOUCH_END, this.clickHomeBtn, this),
                    e.getChildByName("againbtn").off(cc.Node.EventType.TOUCH_END, this.clickAgainBtn, this),
                    e.getChildByName("watch").off(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this),
                    e.getChildByName("invite").off(cc.Node.EventType.TOUCH_END, this.clickInviteBtn, this)
            },
            initialize: function () {
                gameSDK.sendToFBBestScore(fightControl.curScore),
                    heroData.bestScore < fightControl.curScore && (heroData.bestScore = fightControl.curScore);
                var e = this;
                gameSDK.leaderboard.getRankData(function (t) {
                    e.setCurFriendData(t)
                }),
                    this.isCanClick = !1,
                    this.addEvent();
                var t = this.node.getChildByName("activenode");
                this.moveLayer = t.getChildByName("scr").getComponent(cc.ScrollView).content,
                    t.getChildByName("score").getComponent(cc.Label).string = fightControl.curScore,
                    t.getChildByName("watch").active = !1,
                    this.runEnterAction()
            },
            setCurFriendData: function (e) {
                ccLog("\u8bbe\u7f6e\u597d\u53cb\u6392\u884c\u699c\u4fe1\u606f"),
                    this.curFriendData = e
            },
            runEnterAction: function () {
                var e = this.node.getChildByName("activenode");
                e.scale = .5;
                var t = this;
                e.runAction(cc.sequence(cc.scaleTo(.2, 1.1), cc.scaleTo(.1, .9), cc.scaleTo(.1, 1), cc.callFunc(function () {
                    t.isCanClick = !0,
                        e.getChildByName("watch").runAction(cc.sequence(cc.scaleTo(.5, 1.1), cc.scaleTo(.5, 1), cc.scaleTo(.5, .9), cc.scaleTo(.5, 1)).repeatForever())
                })))
            },
            refreshRankInfo: function () {
                var e = this.curFriendData;
                this.moveLayer.removeAllChildren(),
                    this.clear(),
                    this.curData = [];
                for (var t = 1, i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.rank = t,
                        this.curData.push(n),
                        t++
                }
                for (i = 0; i < this.curData.length; i++)
                    this.curData[i].pos = -70 - 146 * i;
                this.moveLayer.y = 0,
                    this.moveLayer.height = 146 * this.curData.length + 20;
                var a = this
                    , o = new Object;
                o.initPoint = 0,
                    o.borderPos1 = 70,
                    o.borderPos2 = -870,
                    o.nodeDatas = this.curData,
                    o.createUIFun = function (e) {
                        var t = engine.memory.getPrefab(nextLoadPrefab.result_node_prefab);
                        return t.addComponent("ResultNode").initialize(e, this),
                            t.y = e.pos,
                            a.moveLayer.addChild(t),
                            t
                    }
                    ,
                    this.setData(o)
            },
            update: function () {
                null != this.curData && this.curData.length > 0 && this.updateView(this.moveLayer.y),
                    this.showRankView()
            },
            showRankView: function () {
                1 != this.isShowRank && null != this.curFriendData && 0 != engine.memory.isExistRes(nextLoadPrefab.result_node_prefab) && (this.isShowRank = !0,
                    this.refreshRankInfo())
            },
            clickHomeBtn: function () {
                1 == this.isCanClick && sceneControl.turnMainScene()
            },
            clickAgainBtn: function () {
                1 == this.isCanClick && (engine.eventM.emit(event_id.REPLAY_CUR_LEVEL),
                    this.destroyClass())
            },
            clickWatchBtn: function () {
                if (1 == this.isCanClick)
                    if (1 === openModuleValue.forFBCheck || 1 == debugtest.noAD)
                        this.successFun();
                    else {
                        var e = videoAdKeyList[parseInt(Math.random() * videoAdKeyList.length)];
                        gameSDK.faceBookAdvertisement.showRewardVideoAd(e, this.successFun.bind(this))
                    }
            },
            successFun: function () { },
            clickInviteBtn: function () {
                1 == this.isCanClick && gameSDK.faceBookUpdateAsync.sendFaceBookFriend(getSendFriendData())
            }
        }),
            window.isHaveSurpassLayer = function () {
                var e = !1;
                null != fightControl.lastSurpass && (e = !0),
                    1 == e && 1 == engine.memory.isExistRes(nextLoadPrefab.surpass_layer_prefab) ? openWindowLayer(openTypeEm.surpass) : openWindowLayer(openTypeEm.resultLayer)
            }
            ,
            cc._RF.pop()
    }
        , {
        GameListLayer: "GameListLayer"
    }],
    ResultNode: [function (e, t) {
        "use strict";
        cc._RF.push(t, "d076f+VH6hMHrNOYDVAYP5O", "ResultNode");
        var i = e("GameExternalImage");
        cc.Class({
            extends: cc.Component,
            properties: {
                playerID: null
            },
            onDestroy: function () {
                this.playerID = null
            },
            destroyClass: function () {
                this.removeEvent(),
                    this.node.destroy()
            },
            addEvent: function () {
                this.node.getChildByName("sharebtn").on(cc.Node.EventType.TOUCH_END, this.clickShareBtn, this)
            },
            removeEvent: function () {
                this.node.getChildByName("sharebtn").off(cc.Node.EventType.TOUCH_END, this.clickShareBtn, this)
            },
            initialize: function (e) {
                this.playerID = e.playerID,
                    this.addEvent(),
                    this.initUI(e)
            },
            initUI: function (e) {
                var t = this.node.getChildByName("rankimg")
                    , n = this.node.getChildByName("ranknum");
                e.rank <= 3 ? (n.active = !1,
                    t.active = !0,
                    t.getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "rank_" + e.rank)) : (n.active = !0,
                        t.active = !1,
                        n.getComponent(cc.Label).string = e.rank);
                var a = this.node.getChildByName("headbg")
                    , o = new i;
                o.loadImage(e.photo, null, a.getContentSize().width - 6, a.getContentSize().height - 6),
                    a.addChild(o, -1),
                    this.node.getChildByName("name").getComponent(cc.Label).string = myGameGetShortName(e.name),
                    this.node.getChildByName("score").getComponent("GameArtWord").setString("" + e.score);
                var r = this.node.getChildByName("bg").getComponent(cc.Sprite)
                    , s = this.node.getChildByName("sharebtn").getComponent(cc.Sprite);
                e.playerID == gameSDK.sdkPlayInfo.playerID ? (r.spriteFrame = engine.memory.getSpriteFrame(loginLoadImage.scaleimg1, "scaleimg20"),
                    s.spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "share")) : (r.spriteFrame = engine.memory.getSpriteFrame(loginLoadImage.scaleimg1, "scaleimg19"),
                        s.spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "playgame"))
            },
            clickShareBtn: function () {
                this.playerID == gameSDK.sdkPlayInfo.playerID ? gameSDK.faceBookUpdateAsync.shareGame(getShareData()) : gameSDK.faceBookUpdateAsync.appointFaceBookFriendAndUpdateAsync(getAppointInviteData(this.playerID))
            }
        }),
            cc._RF.pop()
    }
        , {
        GameExternalImage: "GameExternalImage"
    }],
    ResurgenceLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "c58f8gEDMFBvZ0cb0gCssLm", "ResurgenceLayer"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    curTime: null,
                    totalTime: null,
                    timeTxt: null,
                    timePro: null,
                    isPause: null,
                    noWatchBtn: null
                },
                onDestroy: function () {
                    this.curTime = null,
                        this.totalTime = null,
                        this.timeTxt = null,
                        this.timePro = null,
                        this.isPause = null,
                        this.noWatchBtn = null
                },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                addEvent: function () {
                    var e = this.node.getChildByName("actionnode");
                    e.getChildByName("watchbtn").on(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this),
                        e.getChildByName("nowatch").on(cc.Node.EventType.TOUCH_END, this.clickNoWatchBtn, this)
                },
                removeEvent: function () {
                    var e = this.node.getChildByName("actionnode");
                    e.getChildByName("watchbtn").off(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this),
                        e.getChildByName("nowatch").off(cc.Node.EventType.TOUCH_END, this.clickNoWatchBtn, this)
                },
                initialize: function (e) {
                    this.data = e,
                        this.endType = e ? e.endType : null,
                        this.isPause = !0;
                    var t = this.node.getChildByName("actionnode");
                    if (this.noWatchBtn = t.getChildByName("nowatch"),
                        this.noWatchBtn.active = !1,
                        this.addEvent(),
                        this.totalTime = getGlobleDic(19),
                        this.curTime = this.totalTime,
                        this.timePro = t.getChildByName("timepro").getComponent(cc.ProgressBar),
                        this.timeTxt = t.getChildByName("times").getComponent(cc.Label),
                        this.timeTxt.string = Math.ceil(this.curTime),
                        this.refreshTime(),
                        this.runEnterAction(),
                        1 == fightControl.curResurgence && 1 != openModuleValue.isTimeOut) {
                        var i = fightControl.targetScore - fightControl.curScore;
                        t.getChildByName("continue").getComponent(cc.Label).string = getLanguageDic(1039).replace("%s", i)
                    }
                },
                runEnterAction: function () {
                    var e = this.node.getChildByName("actionnode");
                    e.scale = .5;
                    var t = this;
                    e.runAction(cc.sequence(cc.scaleTo(.2, 1.1), cc.scaleTo(.1, .9), cc.scaleTo(.1, 1), cc.callFunc(function () {
                        t.isPause = !1
                    })))
                },
                update: function (e) {
                    1 != this.isPause && (this.curTime -= e,
                        this.curTime < 0 && (this.curTime = 0),
                        this.timeTxt.string = Math.ceil(this.curTime),
                        this.refreshTime())
                },
                refreshTime: function () {
                    0 == this.noWatchBtn.active && this.curTime <= this.totalTime - 2 && (this.noWatchBtn.active = !0,
                        this.noWatchBtn.opacity = 0,
                        this.noWatchBtn.runAction(cc.fadeIn(.3))),
                        this.curTime <= 0 && (this.isPause = !0,
                            this.curTime = 0,
                            openWindowLayer(openTypeEm.gameOver),
                            this.destroyClass()),
                        this.timePro.progress = this.curTime / this.totalTime
                },
                clickWatchBtn: function () {
                    if (1 != this.isPause)
                        if (this.isPause = !0,
                            1 === openModuleValue.forFBCheck || 1 == debugtest.noAD)
                            this.successFun();
                        else {
                            var e = videoAdKeyList[parseInt(Math.random() * videoAdKeyList.length)];
                            gameSDK.faceBookAdvertisement.showRewardVideoAd(e, this.successFun.bind(this))
                        }
                },
                successFun: function () {
                    gaLogEvent.logByDate("\u5173\u5361\u590d\u6d3b", fightControl.curLevel),
                        gameSDK.logEvent("guankafuhuo", fightControl.curLevel, {
                            guankafuhuo: "guankafuhuo"
                        }),
                        fightControl.isWatch = !0,
                        fightControl.resurgenceData(this.endType),
                        engine.eventM.emit(event_id.RESURGENCE_REFRESH),
                        this.destroyClass()
                },
                clickNoWatchBtn: function () {
                    openWindowLayer(openTypeEm.gameOver),
                        this.destroyClass()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    SceneControl: [function (e, t) {
        "use strict";
        cc._RF.push(t, "fbbc7iTRGlLQpCS/Zx22dFR", "SceneControl"),
            window.SceneType = cc.Enum({
                login: 1,
                main: 2,
                fight: 3
            }),
            e("GameScene"),
            window.persistNodeConfig = {},
            cc.Class({
                properties: {
                    curSceneType: null,
                    nodeComponentList: [],
                    transitionData: null,
                    isLoadCompleteByLoginScene: !1
                },
                turnMainScene: function (e) {
                    engine.CPUM.stopCPU(),
                        this.removePersistNode("MainScene"),
                        engine.memory.cleanManagement(),
                        this.transitionData = e,
                        cc.director.loadScene("MainScene", function () {
                            ccLog(".....MainScene\u8f6c\u573a\u5b8c\u6bd5...."),
                                engine.CPUM.openCPU()
                        })
                },
                turnLoginScene: function () {
                    engine.CPUM.stopCPU(),
                        this.removePersistNode("LoginScene"),
                        engine.memory.cleanManagement(),
                        cc.director.loadScene("LoginScene", function () {
                            ccLog(".....LoginScene\u8f6c\u573a\u5b8c\u6bd5...."),
                                engine.CPUM.openCPU()
                        })
                },
                turnFightScene: function (e) {
                    engine.CPUM.stopCPU(),
                        this.removePersistNode("FightScene"),
                        engine.memory.cleanManagement(),
                        this.transitionData = e,
                        cc.director.loadScene("FightScene", function () {
                            ccLog(".....FightScene\u8f6c\u573a\u5b8c\u6bd5...."),
                                engine.CPUM.openCPU()
                        })
                },
                transitionComplete: function () {
                    null != this.transitionData && null != this.transitionData.completeFun && (this.transitionData.completeFun(),
                        this.transitionData.completeFun = null)
                },
                resetTransitionData: function () {
                    this.transitionData = null
                },
                addTips: function (e) {
                    var t = cc.director.getScene();
                    if (null != t) {
                        var i = t.getChildByName("Canvas");
                        null != i && null != i.addTips && i.addTips(e)
                    }
                },
                addChatMainNode: function () { },
                addPersistNode: function (e, t) {
                    var i = t.node;
                    if (1 == this.nodeIsPersistInScene(e, i)) {
                        cc.game.addPersistRootNode(i);
                        for (var n = !1, a = 0; a < this.nodeComponentList.length; a++)
                            if (this.nodeComponentList[a].node.name == i.name) {
                                n = !0;
                                break
                            }
                        0 == n && this.nodeComponentList.push(t)
                    }
                },
                removePersistNode: function (e) {
                    for (var t = this.nodeComponentList.length - 1; t >= 0; t--) {
                        var i = this.nodeComponentList[t].node;
                        0 == this.nodeIsPersistInScene(e, i) && (cc.game.removePersistRootNode(i),
                            this.nodeComponentList.splice(t, 1)[0].destroyClass())
                    }
                },
                nodeIsPersistInScene: function (e, t) {
                    var i = !1
                        , n = t.name
                        , a = persistNodeConfig[n];
                    if (null != a)
                        for (var o = 0; o < a.length; o++)
                            if (a[o] == e) {
                                i = !0;
                                break
                            }
                    return i
                },
                addTipsWindow: function (e) {
                    var t = cc.director.getScene();
                    if (null != t) {
                        var i = t.getChildByName("Canvas");
                        null != i && null != i.addTipsWindow && i.addTipsWindow(e)
                    }
                },
                addNewbieLayer: function (e) {
                    var t = cc.director.getScene();
                    if (null != t) {
                        var i = t.getChildByName("Canvas");
                        null != i && null != i.addNewbieLayer && i.addNewbieLayer(e)
                    }
                },
                removeNewbieLayer: function (e) {
                    var t = cc.director.getScene();
                    if (null != t) {
                        var i = t.getChildByName("Canvas");
                        null != i && null != i.removeNewbieLayer && i.removeNewbieLayer(e)
                    }
                },
                showReward: function (e) {
                    var t = cc.director.getScene();
                    if (null != t) {
                        var i = t.getChildByName("Canvas");
                        null != i && null != i.showReward && i.showReward(e)
                    }
                }
            }),
            cc._RF.pop()
    }
        , {
        GameScene: "GameScene"
    }],
    ScoreAction: [function (e, t) {
        "use strict";
        cc._RF.push(t, "a902e5O66xDCZt8dWoXKnAE", "ScoreAction"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                addScoreAction: function () { },
                addTimeScoreAction: function () {
                    var e = this
                        , t = fightControl.curTime
                        , i = Math.ceil(t / 5)
                        , n = 0
                        , a = 1800 / i;
                    a > 50 && (a = 50);
                    for (var o = 0; o < i; o++)
                        setTimeout(function () {
                            var t = new cc.Node;
                            t.scale = .8;
                            var a = [cc.v2(0, 710), cc.v2(GameTool.getRandomInt(-100, 100), 670 + GameTool.getRandomInt(-50, 50)), cc.v2(230, 640)];
                            heroData.gameMode === GameModelEnum.challenge && (a[2] = cc.v2(0, 565)),
                                cc.bezierTo(.7, a),
                                t.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.nextloadimg1, "star_1"),
                                e.node.addChild(t, fightControl.lineZIndex),
                                t.setPosition(cc.v2(0, 700)),
                                fightControl.curTime -= 5,
                                fightControl.curTime = fightControl.curTime < 0 ? 0 : fightControl.curTime,
                                fightUILayer.showTime(),
                                t.runAction(cc.sequence(cc.bezierTo(.7, a).easing(cc.easeOut(2)), cc.delayTime(.3), cc.callFunc(function (t) {
                                    fightControl.fightAddScore(1),
                                        fightUILayer.refreshScore(),
                                        ++n === i && e.starActionEnd(),
                                        t.destroy()
                                })))
                        }, a * o)
                },
                starActionEnd: function () {
                    heroData.gameMode === GameModelEnum.challenge ? fightUILayer.mapLayer.customEnd() : this.showStarAdd()
                },
                showStarAdd: function () {
                    var e = this.getComponent("FightMapLayer")
                        , t = this
                        , i = this.starNum = fightControl.getStarsNum()
                        , n = heroData.levelData.getStarNumByLevel(fightControl.curLevel)
                        , a = heroData.levelData.getLevelTotalStarNum()
                        , o = heroData.levelData.getNextBoxNeedStar()
                        , r = i - n;
                    if (r <= 0)
                        e.customEnd();
                    else {
                        var s = cc.callFunc(function (e) {
                            for (var i = 0; i < r; i++) {
                                var n = !1;
                                i == r - 1 && (n = !0),
                                    t.addFlyStarAction(i, n, r, e)
                            }
                        });
                        this.starBoxNode && this.starBoxNode.destroy();
                        var c = engine.memory.getPrefab(nextLoadPrefab.starBox_node_prefab);
                        this.starBoxNode = c,
                            c.totalStarNum = a,
                            c.nextBoxStarNum = o,
                            c.runAction(cc.sequence(cc.fadeIn(.5), s)),
                            this.node.addChild(c, fightZIndexConfig.scoreZIndex),
                            c.getChildByName("boxIcon").scale = .9;
                        var l = c.getChildByName("starNumBg").getChildByName("totalStarNum").getComponent(cc.Label);
                        l.string = a + "/",
                            l._forceUpdateRenderData(!0),
                            c.getChildByName("starNumBg").getChildByName("needStarNum").getComponent(cc.Label).string = o + "";
                        var h = c.getChildByName("starNumBg").getChildByName("starNode");
                        h.x = l.node.x - l.node.width - h.width / 2,
                            this.addComponent("GameLoadTexture").initialize(puzzleBgImgUrl["puzzle_" + heroData.levelData.getPuzzleImgIndexByLevel(fightControl.curLevel)], this.loadTextureCallback.bind(this))
                    }
                    fightControl.curLevel <= 200 && (3 === i ? gaLogEvent.logByDate("\u5173\u5361\u83b7\u53d6\u4e09\u661f", fightControl.curLevel) : gaLogEvent.logByDate("\u5173\u5361\u672a\u83b7\u53d6\u4e09\u661f", fightControl.curLevel))
                },
                loadTextureCallback: function (e) {
                    var t = this
                        , i = heroData.levelData.getPuzzleDataByLevel(heroData.curLevel + 1).data
                        , n = this.starBoxNode.getChildByName("puzzle").getChildByName("content")
                        , a = n.getContentSize();
                    a = cc.size(Math.round(a.width), Math.round(a.height));
                    for (var o = cc.size(Math.round(a.width / puzzleCellCol), Math.round(a.height / puzzleCellRow)), r = 0; r < puzzleCellRow; r++)
                        for (var s = function (s) {
                            var c = new cc.Node
                                , l = c.addComponent(cc.Sprite)
                                , h = GameTool.getPuzzleCellScale(e.width, e.height, a.width, a.height, 2, 2);
                            if (i[r * puzzleCellCol + s] && i[r * puzzleCellCol + s].level < heroData.maxLevel) {
                                if (l.spriteFrame = GameTool.getCropSpriteFrame(e, s, r, 2, 2),
                                    i[r * puzzleCellCol + s].star < 3 && fightControl.curLevel !== i[r * puzzleCellCol + s].level) {
                                    var d = new cc.Node;
                                    d.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.level, "puzzle_cell_gray"),
                                        c.addChild(d, 1),
                                        d.opacity = 180
                                }
                            } else
                                l.spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.level, "puzzle_cell_gray");
                            c.setContentSize(o);
                            var u = GameTool.getPositionByXY(o, s, r, puzzleCellCol, puzzleCellRow);
                            c.setPosition(u),
                                n.addChild(c, 1),
                                3 === t.starNum && i[r * puzzleCellCol + s] && i[r * puzzleCellCol + s].level === fightControl.curLevel ? (c.zIndex += 100,
                                    l.spriteFrame = GameTool.getCropSpriteFrame(e, s, r, 2, 2),
                                    setTimeout(function () {
                                        c.runAction(cc.scaleTo(.4, h.x, h.y))
                                    }, 800)) : c.setScale(h)
                        }, c = 0; c < puzzleCellCol; c++)
                            s(c)
                },
                addFlyStarAction: function (e, t, i, n) {
                    var a = this
                        , o = this.getComponent("FightMapLayer")
                        , r = []
                        , s = [];
                    switch (i) {
                        case 1:
                            r = [cc.v2(0, -260)],
                                s = [cc.v2(123, 83)];
                            break;
                        case 2:
                            r = [cc.v2(-200, -260), cc.v2(200, -260)],
                                s = [cc.v2(-304, 169), cc.v2(269, 174)];
                            break;
                        case 3:
                            r = [cc.v2(-200, -260), cc.v2(0, -260), cc.v2(200, -260)],
                                s = [cc.v2(-304, 169), cc.v2(123, 83), cc.v2(269, 174)]
                    }
                    var c = new cc.Node
                        , l = c.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(l, nextLoadSpine.star, "eject", 1, !1),
                        c.position = r[e],
                        this.node.addChild(c, fightZIndexConfig.scoreZIndex + 1),
                        l.setCompleteListener(function () {
                            var t = new cc.Node;
                            t.addComponent(cc.ParticleSystem).file = engine.memory.getParticle(nextLoadParticle.xingxing),
                                a.node.addChild(t, fightZIndexConfig.scoreZIndex),
                                t.position = c.position;
                            var r = [t.position, s[e], cc.v2(0, 370)];
                            t.runAction(cc.sequence(cc.bezierTo(.7, r), cc.callFunc(function () { }), cc.delayTime(.1), cc.callFunc(function () {
                                if (e == i - 1) {
                                    var a = cc.scaleTo(.3, 1.2)
                                        , r = cc.scaleTo(.1, 1)
                                        , s = n.getChildByName("starNumBg").getChildByName("totalStarNum").getComponent(cc.Label);
                                    s.string = n.totalStarNum + i + "/",
                                        n.getChildByName("starNumBg").runAction(cc.sequence(a, r)),
                                        s._forceUpdateRenderData(!0);
                                    var c = n.getChildByName("starNumBg").getChildByName("starNode");
                                    c.x = s.node.x - s.node.width - c.width / 2;
                                    var l = cc.scaleTo(.3, 1.1)
                                        , h = cc.scaleTo(.1, 1)
                                        , d = cc.callFunc(function (e) {
                                            e.parent.destroy()
                                        });
                                    n.getChildByName("boxIcon").runAction(cc.sequence(l, h, d)),
                                        n.totalStarNum + i >= n.nextBoxStarNum && sceneControl.showReward([{
                                            id: itemIDConfig.starBox,
                                            num: 1
                                        }]),
                                        setTimeout(function () {
                                            o.customEnd()
                                        }, 600)
                                }
                                t.destroy()
                            }))),
                                c.destroy()
                        })
                },
                createAddStarScore: function () {
                    var e = new cc.Node
                        , t = e.addComponent(sp.Skeleton);
                    GameTool.setSkeleton(t, nextLoadSpine.spread, "spread", 1, !1),
                        e.y = 607,
                        this.node.addChild(e, fightZIndexConfig.scoreZIndex),
                        t.setCompleteListener(function () { })
                }
            }),
            cc._RF.pop()
    }
        , {}],
    SmallGameCertainExitLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "26329grtwRJw6kS9/ZtNOu3", "SmallGameCertainExitLayer"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    yesFun: null
                },
                initialize: function (e) {
                    this.yesFun = e
                },
                onDestroy: function () {
                    this.btn_yes.off(cc.Node.EventType.TOUCH_END, this.clickYes, this),
                        this.btn_no.off(cc.Node.EventType.TOUCH_END, this.clickNo, this)
                },
                start: function () {
                    cc.director.pause(),
                        this.btn_yes = this.node.getChildByName("btn_yes"),
                        this.btn_yes.on(cc.Node.EventType.TOUCH_END, this.clickYes, this),
                        this.btn_no = this.node.getChildByName("btn_no"),
                        this.btn_no.on(cc.Node.EventType.TOUCH_END, this.clickNo, this)
                },
                clickYes: function () {
                    cc.director.resume(),
                        this.node.destroy(),
                        this.yesFun && this.yesFun()
                },
                clickNo: function () {
                    cc.director.resume(),
                        this.node.destroy()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    SmallGameEndLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "a2a3aVv91NJEYZ6Fr88hEG9", "SmallGameEndLayer"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    isCanClick: !1,
                    gem: 0,
                    type: ""
                },
                initialize: function (e) {
                    this.gem = SMALL_GAME.getDiamondNum,
                        this.type = e
                },
                onDestroy: function () {
                    this.getBtn.off(cc.Node.EventType.TOUCH_END, this.clickNextBtn, this),
                        this.doubleBtn.off(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this),
                        engine.eventM.emit(event_id.REFRESH_GEM_NUMBER)
                },
                start: function () {
                    var e = this
                        , t = this.node.getChildByName("actionnode");
                    this.getBtn = t.getChildByName("nextbtn"),
                        this.getBtn.on(cc.Node.EventType.TOUCH_END, this.clickNextBtn, this),
                        this.doubleBtn = t.getChildByName("watchbtn"),
                        this.doubleBtn.on(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this),
                        0 == this.gem && (this.doubleBtn.active = !1),
                        t.getChildByName("gemnum").getComponent(cc.Label).string = "x" + this.gem,
                        t.scale = .5,
                        t.runAction(cc.sequence(cc.scaleTo(.2, 1.1), cc.scaleTo(.1, .9), cc.scaleTo(.1, 1), cc.callFunc(function () {
                            e.isCanClick = !0
                        })))
                },
                clickNextBtn: function () {
                    "qs" == this.type ? gtag("event", "Quickspot_get") : gtag("event", "Zuma_get"),
                        !0 === this.isCanClick && (heroData.addGem(this.gem),
                            heroData.saveData(),
                            this.backToSelectLayer())
                },
                clickWatchBtn: function () {
                    var e = this;
                    if ("qs" == this.type ? gtag("event", "Quickspot_ad") : gtag("event", "Zuma_ad"),
                        !0 === this.isCanClick)
                        if (1 === openModuleValue.forFBCheck || 1 === debugtest.noAD)
                            this.successFun();
                        else {
                            var t = videoAdKeyList[Math.floor(Math.random() * videoAdKeyList.length)];
                            gameSDK.faceBookAdvertisement.showRewardVideoAd(t, this.successFun.bind(this), function () {
                                e.isCanClick = !0
                            }),
                                this.isCanClick = !1
                        }
                },
                successFun: function () {
                    var e = this;
                    heroData.addGem(2 * this.gem),
                        heroData.saveData();
                    var t = 2 * this.gem
                        , i = [];
                    i.push(getItemConfig(itemIDConfig.gem, t)),
                        sceneControl.showReward(i),
                        this.scheduleOnce(function () {
                            e.backToSelectLayer()
                        }, .5)
                },
                backToSelectLayer: function () {
                    this.node.destroy(),
                        MyGameEvent.emit(MyGameEvent.SMALLGAME_END_CLEAR),
                        openWindowLayer(openTypeEm.gameSelectLevel)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    SmallGameQsLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "80350fgnv1KZISg5miGIQNX", "SmallGameQsLayer");
        var i = [2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7]
            , n = 0
            , a = SMALL_GAME.qs_total_time
            , o = 0;
        cc.Class({
            extends: cc.Component,
            properties: {
                mapIndex: -1,
                fly_index: 0,
                newest_build_grid_state: null
            },
            onDestroy: function () {
                this.closeBtn.off(cc.Node.EventType.TOUCH_END, this.clickClose, this),
                    MyGameEvent.off(MyGameEvent.showGemFly, this.showGemFly, this),
                    MyGameEvent.off(MyGameEvent.SMALLGAME_QS_NEXT_LV, this.setNextLv, this),
                    MyGameEvent.off(MyGameEvent.SMALLGAME_END, this.stopBuild, this),
                    MyGameEvent.off(MyGameEvent.SMALLGAME_END_CLEAR, this.clearAndRemove, this),
                    cc.game.setFrameRate(50),
                    this.unscheduleAllCallbacks(),
                    this.closeBtn = null
            },
            start: function () {
                cc.game.setFrameRate(60),
                    this.closeBtn = this.node.getChildByName("closeBtn"),
                    MyGameEvent.on(MyGameEvent.showGemFly, this.showGemFly, this),
                    this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.clickClose, this),
                    MyGameEvent.on(MyGameEvent.SMALLGAME_QS_NEXT_LV, this.setNextLv, this),
                    MyGameEvent.on(MyGameEvent.SMALLGAME_END, this.stopBuild, this),
                    MyGameEvent.on(MyGameEvent.SMALLGAME_END_CLEAR, this.clearAndRemove, this),
                    cc.director.getScene().getChildByName("main_prefab").active = !1,
                    SMALL_GAME.getDiamondNum = 0,
                    n = 0,
                    a = SMALL_GAME.qs_total_time,
                    o = 0,
                    this.buildRandomGrids()
            },
            clearAndRemove: function () {
                this.node.destroy()
            },
            stopBuild: function () {
                this.unscheduleAllCallbacks()
            },
            initialize: function () { },
            setNextLv: function () {
                var e = this;
                o = 1,
                    this.scheduleOnce(function () {
                        for (var t = e.node.getChildByName("grids").children, i = 0; i < t.length; i++)
                            t[i].destroy();
                        n++,
                            e.node.getChildByName("grids").removeAllChildren(!0),
                            e.buildRandomGrids(),
                            o = 0
                    }, .6)
            },
            buildRandomGrids: function () {
                for (var e = i[n] || 8, t = ~~(36 * Math.random() + 1), a = [t, t], o = 0; o < e * e - 2; o++)
                    a.push(~~(36 * Math.random() + 1));
                a = this.shuffleArray(a);
                for (var r = 85 * (e - 1) / 2, s = 0; s < e; s++)
                    for (var c = 0; c < e; c++) {
                        var l = engine.memory.getPrefab(needLoadPrefab.grid_node_prefab);
                        l.setPosition(r, -r),
                            cc.tween(l).to(.5, {
                                position: cc.v2(85 * s, 85 * -c)
                            }).start(),
                            l.addComponent("qs_grid_click").setType(a.shift(), cc.v2(r, -r)),
                            this.node.getChildByName("grids").addChild(l)
                    }
                this.node.getChildByName("grids").setPosition(-r, r)
            },
            clickClose: function () {
                gtag("event", "Quickspot_close"),
                    openWindowLayer(openTypeEm.game_samll_exit_certain, function () {
                        o = 1,
                            MyGameEvent.emit(MyGameEvent.SMALLGAME_END),
                            openWindowLayer(openTypeEm.game_samll_end, "qs")
                    })
            },
            showGemFly: function (e) {
                var t = this.node.convertToNodeSpaceAR(e)
                    , i = new cc.Node;
                i.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(loginLoadImage.publicimg1, "gem1"),
                    i.setPosition(t),
                    this.node.addChild(i, fightZIndexConfig.lineZIndex + 10),
                    i.scale = 0;
                var n = this.fly_index ? cc.v2(100 * Math.random() - 300, 400) : cc.v2(200 + 100 * Math.random(), 400);
                this.fly_index = !this.fly_index,
                    cc.tween(i).parallel(cc.tween().to(.2, {
                        scale: .8
                    }), cc.tween().bezierTo(1, t, n, cc.v2(200, 600), {
                        easing: "expoInOut"
                    })).call(function () {
                        i.destroy(),
                            SMALL_GAME.getDiamondNum++
                    }).start()
            },
            update: function (e) {
                this.node.getChildByName("diamond_bg").getChildByName("num_label").getComponent(cc.Label).string = SMALL_GAME.getDiamondNum + "",
                    o || (a -= e,
                        this.node.getChildByName("pro").getComponent(cc.ProgressBar).progress = a / 60,
                        a <= 0 && (o = 1,
                            MyGameEvent.emit(MyGameEvent.SMALLGAME_END),
                            openWindowLayer(openTypeEm.game_samll_end, "qs")))
            },
            shuffleArray: function (e) {
                for (var t, i, n = e.length; n;)
                    i = Math.floor(Math.random() * n--),
                        t = e[n],
                        e[n] = e[i],
                        e[i] = t;
                return e
            }
        }),
            cc._RF.pop()
    }
        , {}],
    SmallGameSelectLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "0c2d076+5lDbo+dY3DANb91", "SmallGameSelectLayer"),
            window.SMALL_GAME = {
                zuma_state_minRunTime: 99,
                zuma_build_time: 1.2,
                qs_total_time: 60,
                getDiamondNum: 0
            },
            cc.Class({
                extends: cc.Component,
                properties: {},
                start: function () {
                    cc.director.getScene().getChildByName("main_prefab").active = !1
                },
                onDestroy: function () {
                    engine.eventM.emit(event_id.REFRESH_GEM_NUMBER),
                        this.closeBtn.off(cc.Node.EventType.TOUCH_END, this.clickClose, this),
                        this.zuma.off(cc.Node.EventType.TOUCH_END, this.clickZuma, this),
                        this.qs.off(cc.Node.EventType.TOUCH_END, this.clickQs, this),
                        this.zuma = null,
                        this.qs = null,
                        this.closeBtn = null
                },
                initialize: function () {
                    this.closeBtn = this.node.getChildByName("closeBtn"),
                        this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.clickClose, this),
                        this.zuma = this.node.getChildByName("zuma_panel").getChildByName("playbtn"),
                        this.zuma.on(cc.Node.EventType.TOUCH_END, this.clickZuma, this),
                        this.qs = this.node.getChildByName("qs_panel").getChildByName("playbtn"),
                        this.qs.on(cc.Node.EventType.TOUCH_END, this.clickQs, this)
                },
                clickClose: function () {
                    cc.director.getScene().getChildByName("main_prefab").active = !0,
                        this.node.destroy()
                },
                clickZuma: function () {
                    gtag("event", "Zuma_paly"),
                        heroData.smallGameTimes_zuma <= 0 ? openWindowLayer(openTypeEm.tipsLayer, {
                            des: getLanguageDic(1012)
                        }) : (this.node.destroy(),
                            heroData.smallGameTimes_zuma--,
                            heroData.saveData(),
                            openWindowLayer(openTypeEm.gameZuma))
                },
                clickQs: function () {
                    gtag("event", "Quickspot_paly"),
                        heroData.smallGameTimes_qs <= 0 ? openWindowLayer(openTypeEm.tipsLayer, {
                            des: getLanguageDic(1012)
                        }) : (this.node.destroy(),
                            heroData.smallGameTimes_qs--,
                            heroData.saveData(),
                            openWindowLayer(openTypeEm.gameQs))
                },
                update: function () {
                    this.node.getChildByName("qs_panel").getChildByName("times_rc").getComponent(cc.RichText).string = "Receive rewards:<color=#7bc933>" + heroData.smallGameTimes_qs + "/3</color>",
                        this.node.getChildByName("zuma_panel").getChildByName("times_rc").getComponent(cc.RichText).string = "Receive rewards:<color=#7bc933>" + heroData.smallGameTimes_zuma + "/3</color>",
                        (new Date).getDate() != heroData.smallGameTimes_date && (heroData.smallGameTimes_date = (new Date).getDate(),
                            heroData.smallGameTimes_zuma = 3,
                            heroData.smallGameTimes_qs = 3,
                            heroData.saveData())
                }
            }),
            cc._RF.pop()
    }
        , {}],
    SmallGameZumaLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "b3748PGY5pFeJi4cvX1Navi", "SmallGameZumaLayer");
        var i = -9;
        cc.Class({
            extends: cc.Component,
            properties: {
                mapIndex: -1,
                fly_index: 0,
                newest_build_grid_state: null
            },
            onDestroy: function () {
                MyGameEvent.off(MyGameEvent.showGemFly, this.showGemFly, this),
                    this.closeBtn.off(cc.Node.EventType.TOUCH_END, this.clickClose, this),
                    MyGameEvent.off(MyGameEvent.SMALLGAME_END, this.stopBuild, this),
                    MyGameEvent.off(MyGameEvent.SMALLGAME_END_CLEAR, this.clearAndRemove, this),
                    cc.game.setFrameRate(50),
                    this.unscheduleAllCallbacks(),
                    this.closeBtn = null
            },
            start: function () {
                var e = this;
                this.closeBtn = this.node.getChildByName("closeBtn"),
                    this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.clickClose, this),
                    MyGameEvent.on(MyGameEvent.showGemFly, this.showGemFly, this),
                    MyGameEvent.on(MyGameEvent.SMALLGAME_END, this.stopBuild, this),
                    MyGameEvent.on(MyGameEvent.SMALLGAME_END_CLEAR, this.clearAndRemove, this),
                    cc.director.getScene().getChildByName("main_prefab").active = !1,
                    SMALL_GAME.getDiamondNum = 0,
                    cc.game.setFrameRate(60),
                    this.schedule(function () {
                        e.createRandomGrid()
                    }, SMALL_GAME.zuma_build_time, cc.macro.REPEAT_FOREVER, -1)
            },
            clearAndRemove: function () {
                this.node.destroy()
            },
            stopBuild: function () {
                this.unscheduleAllCallbacks()
            },
            initialize: function () {
                do {
                    this.mapIndex = ~~(6 * Math.random())
                } while (this.mapIndex == i || 3 == Math.abs(this.mapIndex - i));
                i = this.mapIndex,
                    cc.warn("\u3010map index\u3011:", this.mapIndex);
                for (var e = 0; e < 6; e++)
                    this.node.getChildByName("path" + e).active = !1;
                this.node.getChildByName("path" + this.mapIndex).active = !0;
                var t = [cc.v2(-320, -375), cc.v2(-38, -6), cc.v2(23, 17), cc.v2(320, -375), cc.v2(38, -6), cc.v2(-23, 17)];
                this.node.getChildByName("blackhole").position = t[this.mapIndex]
            },
            createRandomGrid: function () {
                var e = this
                    , t = this.node.getComponent("Zuma_Path").path_all
                    , i = cc.instantiate(t)
                    , n = i.getComponent(cc.Animation);
                n.defaultClip = n.getClips()[this.mapIndex],
                    n.play("zuma_" + this.mapIndex),
                    n.on("finished", function () {
                        e.clickClose(1),
                            e.clickClose = function () { }
                    }, this);
                var a = engine.memory.getPrefab(needLoadPrefab.grid_node_prefab);
                a.name = "grid",
                    i.addChild(a),
                    i.setPosition(-1e3, -1e3),
                    i.addComponent("zuma_grid_click").setMapIndex(this.mapIndex),
                    this.node.addChild(i);
                var o = n.getAnimationState("zuma_" + this.mapIndex);
                this.newest_build_grid_state = o
            },
            clickClose: function (e) {
                1 == e ? (MyGameEvent.emit(MyGameEvent.SMALLGAME_END),
                    openWindowLayer(openTypeEm.game_samll_end, "zm")) : (gtag("event", "Zuma__close"),
                        openWindowLayer(openTypeEm.game_samll_exit_certain, function () {
                            MyGameEvent.emit(MyGameEvent.SMALLGAME_END),
                                openWindowLayer(openTypeEm.game_samll_end, "zm")
                        }))
            },
            update: function () {
                this.newest_build_grid_state && (SMALL_GAME.zuma_state_minRunTime = this.newest_build_grid_state.time),
                    cc.director.getTotalFrames() % 15 == 0 && (this.node.getChildByName("diamond_bg").getChildByName("num_label").getComponent(cc.Label).string = SMALL_GAME.getDiamondNum + "")
            },
            showGemFly: function (e) {
                var t = e.pos
                    , i = e.addGem
                    , n = this.node.convertToNodeSpaceAR(t)
                    , a = new cc.Node;
                a.addComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(loginLoadImage.publicimg1, "gem1"),
                    a.setPosition(n),
                    this.node.addChild(a, fightZIndexConfig.lineZIndex + 10),
                    a.scale = 0;
                var o = this.fly_index ? cc.v2(100 * Math.random() - 300, 400) : cc.v2(200 + 100 * Math.random(), 400);
                this.fly_index = !this.fly_index,
                    cc.tween(a).parallel(cc.tween().to(.2, {
                        scale: .8
                    }), cc.tween().bezierTo(1, n, o, cc.v2(200, 600), {
                        easing: "expoInOut"
                    })).call(function () {
                        a.destroy(),
                            i && SMALL_GAME.getDiamondNum++
                    }).start()
            }
        }),
            cc._RF.pop()
    }
        , {}],
    StarGiftBoxLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "15c1fEcMKtOg7bwqmqc89Nw", "StarGiftBoxLayer"),
            window.starBoxOpenTypeEm = cc.Enum({
                chooseLevel: 0,
                other: 1
            }),
            cc.Class({
                extends: cc.Component,
                properties: {
                    getRewardList: null,
                    isCanClick: null,
                    callback: null
                },
                onDestroy: function () {
                    this.getRewardList = null,
                        this.isCanClick = null
                },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                addEvent: function () {
                    this.node.getChildByName("getbtn").on(cc.Node.EventType.TOUCH_END, this.clickGetBtn, this),
                        this.node.getChildByName("watchbtn").on(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this)
                },
                removeEvent: function () {
                    this.node.getChildByName("getbtn").off(cc.Node.EventType.TOUCH_END, this.clickGetBtn, this),
                        this.node.getChildByName("watchbtn").off(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this)
                },
                initialize: function (e) {
                    var t = this
                        , i = this;
                    this.getRewardList = [],
                        this.getRewardListFunc(),
                        this.getBoxGift(),
                        this.refreshView(),
                        this.addEvent(),
                        this.node.getChildByName("itemParentNode").runAction(cc.sequence(cc.delayTime(.5), cc.scaleTo(.3, 1), cc.callFunc(function () {
                            i.isCanClick = !0
                        }))),
                        this.scheduleOnce(function () {
                            i.node.getChildByName("itemParentNode").runAction(cc.sequence(cc.moveBy(1, cc.v2(0, 10)), cc.moveBy(2, cc.v2(0, -20)), cc.moveBy(1, cc.v2(0, 10))).repeatForever())
                        }, 1),
                        e && e.callback && e.callback(),
                        (this.spine = this.node.getChildByName("giftBox").getComponent(sp.Skeleton)).setCompleteListener(function (e) {
                            "start" === (e.animation ? e.animation.name : "") && (t.spine.clearTrack(0),
                                t.spine.setAnimation(0, "ldle", !0))
                        })
                },
                getRewardListFunc: function () {
                    var e = heroData.getStarBoxNum
                        , t = getDicData(dataJson.treasurechest_json)
                        , i = t[e + 1];
                    if (null == i || i.weight > 0) {
                        var n = 0;
                        for (var a in t)
                            t[a].weight > 0 && (n += t[a].weight);
                        var o = GameTool.getRandomInt(0, n)
                            , r = 0;
                        for (var a in t)
                            if (t[a].weight > 0 && o < (r += t[a].weight)) {
                                i = t[a];
                                break
                            }
                        for (s = JSON.parse(i.item),
                            c = JSON.parse(i.num),
                            a = 0; a < c.length; a++)
                            this.getRewardList.push(getItemConfig(s[a], c[a]))
                    } else {
                        var s = JSON.parse(i.item)
                            , c = JSON.parse(i.num);
                        for (a = 0; a < s.length; a++)
                            this.getRewardList.push(getItemConfig(s[a], c[a]))
                    }
                },
                refreshView: function () {
                    for (var e = this.node.getChildByName("itemParentNode"), t = 0; t < 3; t++) {
                        var i = e.getChildByName("itemNode" + (t + 1))
                            , n = i.getComponent(cc.Sprite)
                            , a = e.getChildByName("itemNum" + (t + 1)).getComponent(cc.Label);
                        this.getRewardList[t] ? (n.spriteFrame = getItemSpriteFrame(this.getRewardList[t].id),
                            a.string = "x" + this.getRewardList[t].num) : i.active = !1
                    }
                },
                clickWatchBtn: function () {
                    if (this.isCanClick)
                        if (1 === openModuleValue.forFBCheck || 1 == debugtest.noAD)
                            this.successFun();
                        else {
                            var e = videoAdKeyList[parseInt(Math.random() * videoAdKeyList.length)];
                            gameSDK.faceBookAdvertisement.showRewardVideoAd(e, this.successFun.bind(this))
                        }
                },
                successFun: function () {
                    this.isCanClick = !1,
                        this.getWatchGift(),
                        this.spine.setAnimation(0, "start", !1),
                        sceneControl.showReward(this.getWatchGiftData(this.getRewardList)),
                        this.destroyClass()
                },
                clickGetBtn: function () {
                    this.isCanClick && (this.spine.setAnimation(0, "start", !1),
                        sceneControl.showReward(this.getRewardList),
                        this.destroyClass())
                },
                getBoxGift: function () {
                    gaLogEvent.logByDate("\u661f\u661f\u5b9d\u7bb1", 2),
                        heroData.addItemByObj(this.getRewardList),
                        heroData.getStarBoxNum++,
                        heroData.saveData()
                },
                getWatchGift: function () {
                    gaLogEvent.logByDate("\u661f\u661f\u5b9d\u7bb1", 1),
                        heroData.addItemByObj(this.getRewardList),
                        heroData.saveData()
                },
                getWatchGiftData: function () {
                    for (var e = JSON.parse(JSON.stringify(this.getRewardList)), t = 0; t < this.getRewardList.length; t++)
                        e[t].num *= 2;
                    return e
                }
            }),
            cc._RF.pop()
    }
        , {}],
    SurpassLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "1982a9GaYVMa7On28PV7cmt", "SurpassLayer");
        var i = e("GameExternalImage");
        cc.Class({
            extends: cc.Component,
            properties: {
                isCanClick: null
            },
            onDestroy: function () {
                this.isCanClick = null
            },
            destroyClass: function () {
                null != this.node && (this.removeEvent(),
                    this.node.destroy())
            },
            addEvent: function () {
                this.node.getChildByName("continuebtn").on(cc.Node.EventType.TOUCH_END, this.clickContinueBtn, this),
                    this.node.getChildByName("sharebtn").on(cc.Node.EventType.TOUCH_END, this.clickShareBtn, this)
            },
            removeEvent: function () {
                this.node.getChildByName("continuebtn").off(cc.Node.EventType.TOUCH_END, this.clickContinueBtn, this),
                    this.node.getChildByName("sharebtn").on(cc.Node.EventType.TOUCH_END, this.clickShareBtn, this)
            },
            initialize: function () {
                this.isCanClick = !1,
                    this.addEvent(),
                    this.showOwnInfo(),
                    this.showOtherInfo(),
                    this.lightAction(),
                    this.upAction(),
                    this.downAction(),
                    this.arrowUpAction(),
                    this.buttonAction(),
                    this.titleAction()
            },
            showOwnInfo: function () {
                var e = this.node.getChildByName("mynode");
                e.getChildByName("uparrows").getChildByName("txt").getComponent(cc.Label).string = ~~(90 * Math.random() + 10);
                var t = e.getChildByName("head")
                    , n = new i;
                n.loadImage(gameSDK.sdkPlayInfo.photo, null, t.width, t.height),
                    t.addChild(n),
                    e.getChildByName("name").getComponent(cc.Label).string = myGameGetShortName(gameSDK.sdkPlayInfo.name),
                    e.getChildByName("score").getComponent(cc.Label).string = fightControl.curScore;
                var a = heroData.gradeData.getCurGradeByScore();
                e.getChildByName("gradeicon").getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(needLoadImage.mastloadimg1, "gradeicon" + a)
            },
            showOtherInfo: function () {
                var e;
                e = null != fightControl.lastSurpass ? fightControl.lastSurpass : fightControl.getSurpassInfo();
                var t = this.node.getChildByName("othernode")
                    , n = t.getChildByName("head")
                    , a = new i;
                a.loadImage(e.photo, null, n.width, n.height),
                    n.addChild(a),
                    t.getChildByName("name").getComponent(cc.Label).string = myGameGetShortName(e.name),
                    t.getChildByName("score").getComponent(cc.Label).string = e.score;
                var o = heroData.gradeData.getCurGradeByScore(e.score);
                t.getChildByName("gradeicon").getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(needLoadImage.mastloadimg1, "gradeicon" + o)
            },
            lightAction: function () {
                var e = this.node.getChildByName("light");
                e.setScale(0),
                    e.runAction(cc.sequence(cc.scaleTo(7 / 24, 2.2), cc.scaleTo(7 / 24, 2), cc.rotateBy(800, 36e3)))
            },
            upAction: function () {
                var e = this.node.getChildByName("mynode");
                e.y = -90,
                    e.x = 201 + engineGlobal.offX;
                var t = cc.sequence(cc.delayTime(.5), cc.scaleTo(.125, 1.3), cc.scaleTo(.125, 1), cc.delayTime(.125), cc.moveTo(4 / 24, cc.v2(-201 - engineGlobal.offX, 466)), cc.scaleTo(.125, 1.03, .95), cc.scaleTo(.125, 1, 1), cc.callFunc(function () {
                    this.isCanClick = !0
                }
                    .bind(this)));
                e.runAction(t)
            },
            downAction: function () {
                var e = this.node.getChildByName("othernode");
                e.y = 466,
                    e.x = -201 - engineGlobal.offX;
                var t = cc.sequence(cc.delayTime(.5), cc.scaleTo(.125, 1.3), cc.scaleTo(.125, 1), cc.delayTime(.125), cc.moveTo(4 / 24, cc.v2(201 + engineGlobal.offX, -90)), cc.scaleTo(.125, 1.03, .95), cc.scaleTo(.125, 1, 1));
                e.runAction(t)
            },
            titleAction: function () {
                var e = this.node.getChildByName("rankup");
                e.scaleY = 0;
                var t = cc.sequence(cc.delayTime(.5), cc.scaleTo(7 / 24, 1, 1.3), cc.scaleTo(7 / 24, 1.03, .95), cc.scaleTo(7 / 24, 1, 1));
                e.runAction(t)
            },
            arrowUpAction: function () { },
            buttonAction: function () {
                var e = function () {
                    var e = cc.spawn(cc.moveBy(.4, 0, 40), cc.fadeIn(.4));
                    return cc.sequence(cc.delayTime(.7), e, cc.moveBy(.2, 0, -10))
                }
                    , t = this.node.getChildByName("continuebtn")
                    , i = this.node.getChildByName("sharebtn");
                t.y = -480,
                    t.opacity = 0,
                    i.y = t.y,
                    i.opacity = 0,
                    t.runAction(e()),
                    i.runAction(e())
            },
            clickContinueBtn: function () {
                1 == this.isCanClick && (openWindowLayer(openTypeEm.resultLayer),
                    this.destroyClass())
            },
            clickShareBtn: function () {
                1 == this.isCanClick && gameSDK.faceBookUpdateAsync.shareGame(getShareData())
            },
            actionEnd: function () {
                this.isCanClick = !0
            }
        }),
            cc._RF.pop()
    }
        , {
        GameExternalImage: "GameExternalImage"
    }],
    TargetLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "fc156mluptKDrE78xn4dfud", "TargetLayer");
        var i = e("GameExternalImage");
        cc.Class({
            extends: cc.Component,
            properties: {},
            onDestroy: function () {
                engine.eventM.emit(event_id.SHOW_TARGET_ACTION)
            },
            destroyClass: function () {
                null != this.node && this.node.destroy()
            },
            initialize: function () {
                var e = this.node.getChildByName("bgnode");
                e.active = !0;
                var t = cc.spawn(cc.moveBy(.5, 0, 100), cc.fadeOut(.5))
                    , n = this;
                e.runAction(cc.sequence(cc.delayTime(1), cc.moveBy(.5, 0, 100), t, cc.callFunc(function () {
                    n.destroyClass()
                })));
                var a = e.getChildByName("head")
                    , o = new i;
                a.addChild(o, -1),
                    heroData.gameMode === GameModelEnum.challenge ? heroData.challengeData.otherData && (o.loadImage(heroData.challengeData.otherData.photo, null, a.getContentSize().width - 6, a.getContentSize().height - 6),
                        e.getChildByName("score").getComponent(cc.Label).string = "" + heroData.challengeData.otherScore,
                        e.getChildByName("name").getComponent(cc.Label).string = myGameGetShortName(heroData.challengeData.otherData.name)) : (o.loadImage(fightControl.surpassInfo.photo, null, a.getContentSize().width - 6, a.getContentSize().height - 6),
                            e.getChildByName("score").getComponent(cc.Label).string = fightControl.surpassInfo.score + "",
                            e.getChildByName("name").getComponent(cc.Label).string = myGameGetShortName(fightControl.surpassInfo.name))
            }
        }),
            cc._RF.pop()
    }
        , {
        GameExternalImage: "GameExternalImage"
    }],
    TileMapData: [function (e, t) {
        "use strict";
        cc._RF.push(t, "5f035Dx3wJOpq+5iumzPP6F", "TileMapData"),
            cc.Class({
                properties: {
                    offsetX: null,
                    offsetY: null,
                    gridWidth: null,
                    gridHeight: null,
                    gridMaxX: null,
                    gridMaxY: null,
                    isInit: null,
                    gridArr: null,
                    defaultGridValue: null,
                    gridAngle: 90
                },
                destroy: function () {
                    this.offsetX = null,
                        this.offsetY = null,
                        this.gridWidth = null,
                        this.gridHeight = null,
                        this.gridMaxX = null,
                        this.gridMaxY = null,
                        this.isInit = null,
                        this.gridArr = null,
                        this.defaultGridValue = null,
                        this.gridAngle = null
                },
                initialize: function (e) {
                    if (1 != this.isInit) {
                        this.isInit = !0,
                            null != e.gridAngle && (this.gridAngle = e.gridAngle),
                            this.offsetX = e.offsetX,
                            this.offsetY = e.offsetY,
                            this.gridWidth = e.gridWidth,
                            this.gridHeight = e.gridHeight,
                            this.gridMaxX = e.gridMaxX,
                            this.gridMaxY = e.gridMaxY,
                            this.defaultGridValue = e.defaultGridValue,
                            this.gridArr = [];
                        for (var t = 0; t < this.gridMaxX; t++) {
                            for (var i = [], n = 0; n < this.gridMaxY; n++)
                                i.push(this.defaultGridValue);
                            this.gridArr.push(i)
                        }
                    }
                },
                setTileMapAttribute: function (e) {
                    this.offsetX = e.offsetX,
                        this.offsetY = e.offsetY,
                        this.gridWidth = e.gridWidth,
                        this.gridHeight = e.gridHeight,
                        this.gridMaxX = e.gridMaxX,
                        this.gridMaxY = e.gridMaxY,
                        this.defaultGridValue = e.defaultGridValue,
                        this.gridArr = [];
                    for (var t = 0; t < this.gridMaxX; t++) {
                        for (var i = [], n = 0; n < this.gridMaxY; n++)
                            i.push(this.defaultGridValue);
                        this.gridArr.push(i)
                    }
                },
                clearGridInfo: function (e, t) {
                    this.setGridInfo(e, t, this.defaultGridValue)
                },
                setGridInfo: function (e, t, i, n) {
                    if (null != i) {
                        if (i.gridX = e,
                            i.gridY = t,
                            1 == n) {
                            var a = this.getScenePointByGridPoint(e, t);
                            i.x = a.x,
                                i.y = a.y
                        }
                        i.setZIndex()
                    }
                    return this.gridArr[e][t] = i,
                        a
                },
                getGridInfoByGridPoint: function (e, t) {
                    return e < 0 || t < 0 || e >= this.gridMaxX || t >= this.gridMaxY ? null : this.gridArr[e][t]
                },
                getGridInfoByScenePoint: function (e, t) {
                    var i = this.getGridPointByScenePoint(e, t);
                    return this.getGridInfoByGridPoint(i.x, i.y)
                },
                getGridPointByScenePoint: function (e, t) {
                    var i, n;
                    return 90 == this.gridAngle ? (i = Math.floor((e - this.offsetX) / this.gridWidth),
                        n = this.gridMaxY - 1 - Math.floor((t - this.offsetY) / this.gridHeight)) : (e = e - this.offsetX + this.gridWidth / 2,
                            t -= this.offsetY,
                            i = Math.floor(e / this.gridWidth - t / this.gridHeight),
                            n = this.gridMaxY - 1 - Math.floor(e / this.gridWidth + t / this.gridHeight)),
                        cc.v2(i, n)
                },
                getScenePointByGridPoint: function (e, t) {
                    var i = cc.v2(0, 0);
                    return 90 == this.gridAngle ? (i.x = e * this.gridWidth + this.gridWidth / 2,
                        i.y = (this.gridMaxY - 1 - t) * this.gridHeight + this.gridHeight / 2) : (i.x = (e + (this.gridMaxY - 1 - t)) * this.gridWidth / 2,
                            i.y = (this.gridMaxY - 1 - t - e) * this.gridHeight / 2),
                        i.x = i.x + this.offsetX,
                        i.y = i.y + this.offsetY,
                        i
                },
                settingGridByAStar: function () {
                    for (var e = 0; e < this.gridArr.length; e++)
                        for (var t = 0; t < this.gridArr[e].length; t++) {
                            var i = this.gridArr[e][t];
                            if (null != i) {
                                var n = this.getGridPointByScenePoint(e, t);
                                i.x = n.x,
                                    i.y = n.y
                            }
                        }
                }
            }),
            cc._RF.pop()
    }
        , {}],
    TipsLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "26b03Krsp9FSY7Yw+49fK5Z", "TipsLayer"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    callFun: null
                },
                onDestroy: function () {
                    this.callFun = null,
                        bannerManager.hideBanner(bannerLayerNameOb.tip)
                },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                addEvent: function () {
                    this.node.getChildByName("okbtn").on(cc.Node.EventType.TOUCH_END, this.clickOkBtn, this),
                        this.node.getChildByName("nobtn").on(cc.Node.EventType.TOUCH_END, this.clickNoBtn, this)
                },
                removeEvent: function () {
                    this.node.getChildByName("okbtn").off(cc.Node.EventType.TOUCH_END, this.clickOkBtn, this),
                        this.node.getChildByName("nobtn").off(cc.Node.EventType.TOUCH_END, this.clickNoBtn, this)
                },
                initialize: function (e) {
                    this.addEvent(),
                        this.callFun = e.callFun;
                    var t = this.node.getChildByName("okbtn")
                        , i = this.node.getChildByName("nobtn")
                        , n = t.getChildByName("txt").getComponent(cc.Label);
                    1 == e.isNeedNo ? (t.x = -i.x,
                        i.active = !0,
                        n.string = getLanguageDic(1028)) : (t.x = 0,
                            i.active = !1,
                            n.string = getLanguageDic(1013)),
                        this.node.getChildByName("des").getComponent(cc.Label).string = e.des,
                        bannerManager.refreshBanner(bannerLayerNameOb.tip)
                },
                clickOkBtn: function () {
                    null != this.callFun && this.callFun(),
                        this.destroyClass()
                },
                clickNoBtn: function () {
                    this.destroyClass()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    WatchAdvertLayer: [function (e, t) {
        "use strict";
        cc._RF.push(t, "0327fPPfq9Mo437sQ5KQqDf", "WatchAdvertLayer"),
            window.watchOpenTypeEm = cc.Enum({
                getGem: 0,
                dailyGift: 1,
                parachute: 2,
                gemNoEnough: 4,
                scoreParachute: 5
            }),
            cc.Class({
                extends: cc.Component,
                properties: {
                    openType: null,
                    reward: null
                },
                onDestroy: function () {
                    bannerManager.hideBanner(bannerLayerNameOb.watch + this.openType),
                        engine.eventM.emit(event_id.REFRESH_PAUSE, !1),
                        this.openType = null,
                        this.reward = null
                },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                addEvent: function () {
                    this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this),
                        this.node.getChildByName("watchbtn").on(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this)
                },
                removeEvent: function () {
                    this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this),
                        this.node.getChildByName("watchbtn").off(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this)
                },
                initialize: function (e) {
                    this.openType = e,
                        this.addEvent(),
                        this.openType == watchOpenTypeEm.dailyGift ? this.showDailyGift() : this.openType == watchOpenTypeEm.scoreParachute ? this.showAddScoreParachute() : this.refreshLayer(),
                        bannerManager.refreshBanner(bannerLayerNameOb.watch + this.openType)
                },
                refreshLayer: function () {
                    this.node.getChildByName("dailygift").active = !1,
                        this.node.getChildByName("addscore").active = !1,
                        this.node.getChildByName("gift").active = !0,
                        this.node.getChildByName("count").active = !0,
                        this.node.getChildByName("light").active = !0;
                    var e = "";
                    switch (this.reward = [],
                    this.openType) {
                        case watchOpenTypeEm.getGem:
                            this.reward.push(getItemConfig(itemIDConfig.gem, getGlobleDic(11))),
                                e = getLanguageDic(1027);
                            break;
                        case watchOpenTypeEm.gemNoEnough:
                            this.reward.push(getItemConfig(itemIDConfig.gem, getGlobleDic(11))),
                                e = getLanguageDic(1020);
                            break;
                        case watchOpenTypeEm.parachute:
                            e = getLanguageDic(1021);
                            var t = [getItemConfig(itemIDConfig.gem, 50), getItemConfig(itemIDConfig.addTime, 1), getItemConfig(itemIDConfig.tips, 1), getItemConfig(itemIDConfig.bomb, 1), getItemConfig(itemIDConfig.resort, 1)]
                                , i = GameTool.getRandomInt(0, t.length - 1);
                            this.reward.push(t[i])
                    }
                    this.node.getChildByName("title").getComponent(cc.Label).string = e,
                        this.node.getChildByName("gift").getComponent(cc.Sprite).spriteFrame = getItemSpriteFrame(this.reward[0].id),
                        this.node.getChildByName("count").getComponent(cc.Label).string = "x" + this.reward[0].num
                },
                showAddScoreParachute: function () {
                    var e = this.node.getChildByName("titlebg")
                        , t = this.node.getChildByName("title");
                    t.y = e.y + 10;
                    var i = this.node.getChildByName("bg");
                    i.width = 671,
                        i.height = 661;
                    var n = this.node.getChildByName("bg2");
                    n.width = 621,
                        n.height = 466;
                    var a = this.node.getChildByName("closebtn");
                    a.x = 307,
                        a.y = 327,
                        this.node.getChildByName("watchbtn").y = -217;
                    var o = this.node.getChildByName("addscore");
                    t.getComponent(cc.Label).string = getLanguageDic(1021),
                        this.node.getChildByName("dailygift").active = !1,
                        this.node.getChildByName("gift").active = !1,
                        this.node.getChildByName("count").active = !1,
                        this.node.getChildByName("light").active = !1,
                        o.active = !0;
                    var r = fightControl.targetScore - fightControl.curScore;
                    o.getChildByName("scoretxt").getComponent(cc.Label).string = "+" + r
                },
                showDailyGift: function () {
                    var e = this.node.getChildByName("titlebg")
                        , t = this.node.getChildByName("title");
                    t.y = e.y + 12,
                        this.node.getChildByName("bg"),
                        this.node.getChildByName("bg2"),
                        this.node.getChildByName("closebtn"),
                        this.node.getChildByName("watchbtn");
                    var i = this.node.getChildByName("dailygift");
                    t.getComponent(cc.Label).string = getLanguageDic(1022),
                        this.node.getChildByName("gift").active = !1,
                        this.node.getChildByName("count").active = !1,
                        this.node.getChildByName("light").active = !1,
                        this.node.getChildByName("addscore").active = !1,
                        i.active = !0;
                    for (var n = 0; n < 3; n++) {
                        var a = heroData.dailyGiftReward[n]
                            , o = i.getChildByName("itemicon" + (n + 1));
                        o.getComponent(cc.Sprite).spriteFrame = getItemSpriteFrame(a.id),
                            o.getChildByName("num").getComponent(cc.Label).string = a.num
                    }
                    this.reward = heroData.dailyGiftReward
                },
                clickWatchBtn: function () {
                    if (this.openType != watchOpenTypeEm.dailyGift || 1 != heroData.dailyGift)
                        if (1 === openModuleValue.forFBCheck || 1 == debugtest.noAD)
                            this.successFun();
                        else {
                            var e = videoAdKeyList[parseInt(Math.random() * videoAdKeyList.length)];
                            gameSDK.faceBookAdvertisement.showRewardVideoAd(e, this.successFun.bind(this))
                        }
                    else
                        openWindowLayer(openTypeEm.tipsLayer, {
                            des: getLanguageDic(1012)
                        })
                },
                successFun: function () {
                    if (this.openType == watchOpenTypeEm.scoreParachute)
                        gaLogEvent.logByDate("\u9886\u53d6\u8865\u5206\u964d\u843d\u4f1e", 1),
                            engine.eventM.emit(event_id.REWARD_ADD_SCORE_PARACHUTE);
                    else {
                        switch (heroData.addItemByObj(this.reward),
                        sceneControl.showReward(this.reward),
                        this.openType) {
                            case watchOpenTypeEm.dailyGift:
                                heroData.dailyGift = 1,
                                    engine.eventM.emit(event_id.REFRESH_DAILY_GIFT_BTN, !1),
                                    gaLogEvent.logByDate("\u6bcf\u65e5\u793c\u5305", 1);
                                break;
                            case watchOpenTypeEm.getGem:
                            case watchOpenTypeEm.gemNoEnough:
                                gaLogEvent.logByDate("\u770b\u5e7f\u544a\u5f97\u94bb\u77f3", 1);
                                break;
                            case watchOpenTypeEm.parachute:
                                gaLogEvent.logByDate("\u964d\u843d\u4f1e\u9886\u53d6", 1)
                        }
                        heroData.saveData()
                    }
                    this.destroyClass()
                },
                clickCloseBtn: function () {
                    this.destroyClass()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    Zuma_Path: [function (e, t) {
        "use strict";
        cc._RF.push(t, "3fc4bsXkrxHb6MVk++MGITc", "Zuma_Path"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    path_all: {
                        default: null,
                        type: cc.Prefab
                    }
                }
            }),
            cc._RF.pop()
    }
        , {}],
    analytics_config: [function (e, t) {
        "use strict";
        cc._RF.push(t, "17be4iVuEpEm7Xc4pYKycBn", "analytics_config"),
            window.gaLogEvent = {
                logByDate: function () { }
            },
            cc._RF.pop()
    }
        , {}],
    example: [function (e, t) {
        "use strict";
        cc._RF.push(t, "6d7c51CdL1MrKAon4W2epiD", "example"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    test: null
                },
                onDestroy: function () {
                    this.test = null,
                        this.removeDataEvent()
                },
                destroyClass: function () {
                    null != this.node && (this.removeEvent(),
                        this.node.destroy())
                },
                addDataEvent: function () { },
                removeDataEvent: function () { },
                addEvent: function () {
                    this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this)
                },
                removeEvent: function () {
                    this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this)
                },
                initialize: function () {
                    this.addEvent(),
                        this.addDataEvent()
                },
                refreshLayer: function () { },
                clickCloseBtn: function () {
                    this.destroyClass()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    qs_grid_click: [function (e, t) {
        "use strict";
        cc._RF.push(t, "c51dcLKRNtGmqWV/mSFxVJQ", "qs_grid_click");
        var i = -1
            , n = -1
            , a = [];
        cc.Class({
            extends: cc.Component,
            properties: {
                gridType: -1,
                centerPos: null,
                clickAnyClear: 0
            },
            onDestroy: function () {
                MyGameEvent.off(MyGameEvent.SMALLGAME_QS_NEXT_LV, this.showMoveToCenter, this),
                    MyGameEvent.off(MyGameEvent.SMALLGAME_CHECK_NEXT, this.checkCanClear, this),
                    MyGameEvent.off(MyGameEvent.SMALLGAME_GRID_CLEAR_ALL_SELECT, this.hideSelect, this),
                    MyGameEvent.off(MyGameEvent.SMALLGAME_GRID_CLEAR_BY_UUID, this.clearByUUID, this),
                    MyGameEvent.off(MyGameEvent.SMALLGAME_END, this.stopMove, this),
                    MyGameEvent.off(MyGameEvent.SMALLGAME_END_CLEAR, this.clearAndRemove, this),
                    this.clickNode.off(cc.Node.EventType.TOUCH_END, this.clickGrid, this),
                    this.clickNode = null
            },
            start: function () {
                MyGameEvent.on(MyGameEvent.SMALLGAME_QS_NEXT_LV, this.showMoveToCenter, this),
                    MyGameEvent.on(MyGameEvent.SMALLGAME_CHECK_NEXT, this.checkCanClear, this),
                    MyGameEvent.on(MyGameEvent.SMALLGAME_GRID_CLEAR_ALL_SELECT, this.hideSelect, this),
                    MyGameEvent.on(MyGameEvent.SMALLGAME_GRID_CLEAR_BY_UUID, this.clearByUUID, this),
                    MyGameEvent.on(MyGameEvent.SMALLGAME_END, this.stopMove, this),
                    MyGameEvent.on(MyGameEvent.SMALLGAME_END_CLEAR, this.clearAndRemove, this),
                    this.clickNode = this.node.getChildByName("clicknode"),
                    this.clickNode.on(cc.Node.EventType.TOUCH_END, this.clickGrid, this),
                    this.node.getChildByName("othershow").active = !1
            },
            setType: function (e, t) {
                this.gridType = e,
                    this.centerPos = t,
                    this.node.getChildByName("gridicon").getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "grid_" + this.gridType)
            },
            clearAndRemove: function () {
                this.unscheduleAllCallbacks(),
                    this.node.destroy()
            },
            stopMove: function () {
                this.clickGrid = function () { }
            },
            setMapIndex: function (e) {
                mapIndex = e
            },
            clickGrid: function () {
                this.end || (MyGameEvent.emit(MyGameEvent.SMALLGAME_GRID_CLEAR_ALL_SELECT),
                    this.node.getChildByName("select").active = !0,
                    i != this.node.uuid && (n == this.gridType || this.clickAnyClear && -1 != n ? (this.end = 1,
                        this.addBombBhostAction(),
                        MyGameEvent.emit(MyGameEvent.SMALLGAME_GRID_CLEAR_BY_UUID, i),
                        i = -1,
                        n = -1) : (i = this.node.uuid,
                            n = this.gridType)))
            },
            hideSelect: function () {
                this.node.getChildByName("select").active = !1
            },
            clearByUUID: function (e) {
                if (this.node.uuid == e) {
                    this.addBombBhostAction(),
                        this.end = 1,
                        a = [],
                        MyGameEvent.emit(MyGameEvent.SMALLGAME_CHECK_NEXT);
                    for (var t = 0; t < a.length; t++)
                        if (a[t] > 1)
                            return;
                    setTimeout(function () {
                        MyGameEvent.emit(MyGameEvent.SMALLGAME_QS_NEXT_LV)
                    }, 300)
                }
            },
            checkCanClear: function () {
                this.end || (a[this.gridType] = a[this.gridType] || 0,
                    a[this.gridType]++)
            },
            update: function () { },
            showMoveToCenter: function () {
                cc.tween(this.node).to(.2, {
                    opacity: 0
                }).start()
            },
            addBombBhostAction: function () {
                var e = this;
                cc.tween(this.node).to(.2, {
                    scale: .01,
                    opacity: 0
                }).call(function () {
                    e.node.destroy(),
                        MyGameEvent.emit(MyGameEvent.showGemFly, e.node.parent.convertToWorldSpaceAR(e.node.position))
                }).start()
            }
        }),
            cc._RF.pop()
    }
        , {}],
    "use_v2.1-2.2.1_cc.Toggle_event": [function (e, t) {
        "use strict";
        cc._RF.push(t, "a1a49kUcFtBCYj6+zLCmL4u", "use_v2.1-2.2.1_cc.Toggle_event"),
            cc.Toggle && (cc.Toggle._triggerEventInScript_isChecked = !0),
            cc._RF.pop()
    }
        , {}],
    zuma_grid_click: [function (e, t) {
        "use strict";
        cc._RF.push(t, "9180b96yOBLbpTcS4/WBUJA", "zuma_grid_click");
        var i = []
            , n = []
            , a = new Map
            , o = -1
            , r = -1
            , s = 0;
        cc.Class({
            extends: cc.Component,
            properties: {
                gridType: -1,
                backTargetPos: null,
                backTime: -1,
                clickAnyClear: 0
            },
            onDestroy: function () {
                this.node.off(cc.Node.EventType.TOUCH_END, this.clickGrid, this),
                    MyGameEvent.off(MyGameEvent.SMALLGAME_GRID_CLEAR_ALL_SELECT, this.hideSelect, this),
                    MyGameEvent.off(MyGameEvent.SMALLGAME_GRID_CLEAR_BY_UUID, this.clearByUUID, this),
                    MyGameEvent.off(MyGameEvent.SMALLGAME_ZUMA_MOVE_BACK, this.moveBack, this),
                    MyGameEvent.off(MyGameEvent.SMALLGAME_END, this.stopMove, this),
                    MyGameEvent.off(MyGameEvent.SMALLGAME_END_CLEAR, this.clearAndRemove, this)
            },
            start: function () {
                i.unshift(this.node.uuid),
                    MyGameEvent.on(MyGameEvent.SMALLGAME_GRID_CLEAR_ALL_SELECT, this.hideSelect, this),
                    MyGameEvent.on(MyGameEvent.SMALLGAME_GRID_CLEAR_BY_UUID, this.clearByUUID, this),
                    MyGameEvent.on(MyGameEvent.SMALLGAME_ZUMA_MOVE_BACK, this.moveBack, this),
                    MyGameEvent.on(MyGameEvent.SMALLGAME_END, this.stopMove, this),
                    MyGameEvent.on(MyGameEvent.SMALLGAME_END_CLEAR, this.clearAndRemove, this),
                    this.node.on(cc.Node.EventType.TOUCH_END, this.clickGrid, this);
                var e = this.node.getChildByName("grid");
                e.getChildByName("othershow").active = !1;
                var t = ~~(20 * Math.random() + 1);
                this.gridType = t,
                    e.getChildByName("gridicon").getComponent(cc.Sprite).spriteFrame = engine.memory.getSpriteFrame(nextLoadImage.fightimg1, "grid_" + t)
            },
            clearAndRemove: function () {
                this.unscheduleAllCallbacks(),
                    this.node.destroy()
            },
            stopMove: function () {
                this.clickGrid = function () { }
                    ,
                    this.getComponent(cc.Animation).stop()
            },
            setMapIndex: function (e) {
                s = e
            },
            clickGrid: function () {
                if (!(this.end || this.getComponent(cc.Animation).getAnimationState("zuma_" + s).time < .3)) {
                    a = new Map,
                        MyGameEvent.emit(MyGameEvent.SMALLGAME_GRID_CLEAR_ALL_SELECT),
                        n = [];
                    for (var e = 0; e < i.length; e++)
                        n.push(a.get(i[e]));
                    this.node.getChildByName("grid").getChildByName("select").active = !0,
                        o != this.node.uuid && (r == this.gridType || this.clickAnyClear && -1 != r ? (i.splice(i.indexOf(this.node.uuid), 1),
                            this.addBombBhostAction(1),
                            MyGameEvent.emit(MyGameEvent.SMALLGAME_GRID_CLEAR_BY_UUID, o),
                            o = -1,
                            r = -1) : (o = this.node.uuid,
                                r = this.gridType))
                }
            },
            hideSelect: function () {
                this.node.getChildByName("grid").getChildByName("select").active = !1,
                    a.set(this.node.uuid, this.node.position)
            },
            clearByUUID: function (e) {
                this.node.uuid == e && (i.splice(i.indexOf(this.node.uuid), 1),
                    this.addBombBhostAction(0),
                    MyGameEvent.emit(MyGameEvent.SMALLGAME_ZUMA_MOVE_BACK))
            },
            moveBack: function () {
                if (this.node.isValid) {
                    var e = this.getComponent(cc.Animation)
                        , t = e.getAnimationState("zuma_" + s)
                        , a = i.indexOf(this.node.uuid);
                    if (-1 != a) {
                        var o = n[a];
                        if (o.sub(this.node.position).mag() > 1) {
                            e.pause();
                            var r = t.time;
                            t.wrapMode = cc.WrapMode.Reverse,
                                t.speed = .7,
                                this.backTargetPos = o,
                                this.backTime = +new Date,
                                e.play("zuma_" + s, t.duration - r)
                        }
                    }
                }
            },
            update: function () {
                var e = this.getComponent(cc.Animation).getAnimationState("zuma_" + s);
                if (this.backTargetPos) {
                    var t = this.node.position.sub(this.backTargetPos).mag()
                        , n = t / 5;
                    if (e.speed = Math.min(3, n),
                        t < 5) {
                        this.backTargetPos = null;
                        var a = this.getComponent(cc.Animation);
                        a.pause();
                        var o = a.getAnimationState("zuma_" + s);
                        o.wrapMode = cc.WrapMode.Normal,
                            o.speed = .32;
                        var r = i.indexOf(this.node.uuid);
                        a.play("zuma_" + s, SMALL_GAME.zuma_state_minRunTime + r * SMALL_GAME.zuma_build_time * .32)
                    }
                }
            },
            addBombBhostAction: function (e) {
                var t = this;
                this.end = 1,
                    cc.tween(this.node).to(.2, {
                        scale: .01,
                        opacity: 0
                    }).call(function () {
                        t.node.destroy();
                        var i = {
                            pos: t.node.parent.convertToWorldSpaceAR(t.node.position),
                            addGem: e
                        };
                        MyGameEvent.emit(MyGameEvent.showGemFly, i)
                    }).start()
            }
        }),
            cc._RF.pop()
    }
        , {}]
}, {}, ["Game", "GameGlobal", "Resource", "Engine", "GameTool", "FaceBookAdvertisement", "FaceBookBot", "FaceBookChallengeLeaderboard", "FaceBookLeaderboard", "FaceBookPayment", "FaceBookSDK", "FaceBookUpdateAsync", "GameAdapterInfo", "GameAnimation", "GameArtWord", "GameCustomImage", "GameData", "GameEventManager", "GameLanguageLabel", "GameLanguageSprite", "GameListLayer", "GameMemoryManagement", "GameMove", "GameSound", "GameSoundButton", "GameTextLanguage", "GameTextureLoad", "GameTime", "GameCPU", "GameCPUManagement", "GameLoadCPU", "CacheData", "GameArrayDic", "NumBigUnit", "NumCalculate", "TileMapData", "GameBackgroundLoad", "GameExternalImage", "GameLoadPrefabLayer", "GameLoadTexture", "GameLog", "HttpSendData", "GameLoadPrefab", "GameLoadSpine", "GameLoadSprite", "GameSoundLoad", "LoadControl", "GameScene", "GameEventConfig", "FreindChallengeData", "GameAnimationConfig", "GameConfigData", "GameRankData", "HeroData", "GameAchievementData", "GameAchievementOrStrong", "GameAchievementOrStrongNode", "GameStrongData", "GameDailyTaskData", "GameDailyTaskLayer", "GameDailyTaskNode", "example", "BossAnimation", "BossData", "BossLayer", "ChallengeOverLayer", "ChallengeOverNode", "ChallengeSurpassLayer", "CollectData", "CustomEndLayer", "FightControl", "ComboAction", "ConveyBeltCom", "ConveyBeltData", "FightMapLayer", "GridNode", "Grid_Birdcage", "Grid_Bonfire", "Grid_Clawball", "Grid_CollectCom", "Grid_Demon", "Grid_Dragonfly", "Grid_Egg", "Grid_Flower", "Grid_Ice", "Grid_Lock", "Grid_Magic", "Grid_Rocket", "LineStarAction", "ScoreAction", "FightUIChallengeLayer", "FightUILayer", "GameOverLayer", "GradeUpLayer", "GridData", "HelpLayer", "LevelOverControl", "LevelTargetLayer", "LoseDetailLayer", "MapData", "NewElementTipsLayer", "NewModeLayer", "PauseLayer", "ResultLayer", "ResultNode", "ResurgenceLayer", "SurpassLayer", "TargetLayer", "GameGradeData", "GradeLayer", "GradeNode", "ChooseLevelLayer", "ChooseLevelNode", "LevelData", "LevelPageNode", "LevelPageView", "LevelPuzzleCellNode", "LevelPuzzleLayer", "LevelPuzzleNode", "LevelWatchLayer", "StarGiftBoxLayer", "AdvertFail", "ChallengeInviteLayer", "ChallengeInviteNode", "ChallengeLayer", "ChallengeNode", "ChooseMessengerLayer", "MainUILayer", "BannerManager", "GameChatRaceLampLayer", "LoadResLayer", "LoadingLayer", "PublicLayer", "RaceLampData", "TipsLayer", "WatchAdvertLayer", "GameRankLayer", "GameRankNode", "SmallGameCertainExitLayer", "SmallGameEndLayer", "SmallGameSelectLayer", "SmallGameQsLayer", "qs_grid_click", "SmallGameZumaLayer", "Zuma_Path", "zuma_grid_click", "GameSurpriseLayer", "GameSurpriseNode", "FightSceneControl", "GameLoadUI", "LoginSceneControl", "MainSceneControl", "SceneControl", "FacebookSDKTestData", "LoginFaceBookSDK", "analytics_config", "use_v2.1-2.2.1_cc.Toggle_event"]);
