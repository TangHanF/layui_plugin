layui.define(['element'], function (exports) {
    var element = layui.element;
    var $ = layui.jquery;
    var currentActiveTabID = undefined;
    var currentActiveTabTitle = undefined;
    var MOD_NAME = 'tabrightmenu';
    var RIGHTMENUMOD = function () {
        this.v = '1.0.1';
        this.author = 'TangHanF';
        this.email = 'guofu_gh@163.com';
        this.filter = '';//Tab选项卡的事件过滤

    };
    String.prototype.format = function () {
        if (arguments.length == 0) return this;
        var param = arguments[0];
        var s = this;
        if (typeof (param) == 'object') {
            for (var key in param) s = s.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
            return s;
        } else {
            for (var i = 0; i < arguments.length; i++) s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
            return s;
        }
    }

    function createStyle(ulClassName, width) {
        var style = '.{name} {position: absolute;width: {width_}px;z-index: 9999;display: none;background-color: #fff;padding: 2px;color: #333;border: 1px solid #eee;border-radius: 2px;cursor: pointer;}.{name} li {text-align: center;display: block;height: 30px;line-height: 32px;}.{name} li:hover {background-color: #666;color: #fff;}'
            .format({name: ulClassName, width_: width});
        return style;
    }

    /**
     * 初始化
     */
    RIGHTMENUMOD.prototype.render = function (opt) {
        if (!opt.container) {
            console.error("[ERROR]使用rightmenu组件需要制定'container'属性！");
            return;
        }
        if (!opt.filter) {
            console.error("[ERROR]使用rightmenu组件需要制定'filter'属性！");
            return;
        }
        this.filter = opt.filter;
        this.isClickMidCloseTab = opt.isClickMidCloseTab || false;
        this.width = opt.width ? opt.width : 110;// 右键弹出框的宽度，一般100~110即可

        // pinTabTitles和pintabIDs作用一样，只是便于开发使用考虑加入标题和ID形式进行两种方式的过滤
        this.pinTabTitles = opt.pinTabTitles;//固定标签的标题集合
        this.pintabIDs = opt.pintabIDs;//固定标签的ID集合

        var defaultNavArr = [
            {eventName: 'refresh', title: '刷新当前页'},
            {eventName: 'closeallbutpin', title: '关闭所有但固定'},
            {eventName: 'closethis', title: '关闭标签'},
            {eventName: 'closeothersbutpin', title: '关闭其它但固定'},
            {eventName: 'closeleftbutpin', title: '关闭左侧标签但固定'},
            {eventName: 'closerightbutpin', title: '关闭右侧标签但固定'}
        ];
        opt = opt || {};
        opt.navArr = opt.navArr || defaultNavArr;
        CreateRightMenu(opt);
        registClickMidCloseTab(this.isClickMidCloseTab,opt);
    };


    /**
     * 注册点击鼠标中间关闭选项卡事件
     * @param isClose
     * @param rightMenuConfig
     */
    function registClickMidCloseTab(isClose,rightMenuConfig) {
        if (!isClose) {
            return;
        }

        $("#" + rightmenuObj.filter).on('mousedown', 'li', function (e) {
            currentActiveTabID = $(e.target).attr('lay-id'); // 获取当前激活的选项卡ID,当前ID改为右键菜单弹出时就获取
            currentActiveTabTitle = $.trim($(e.target).text()); //获取当前激活选项卡的标题
            if (rightMenuConfig.pinTabTitles && rightMenuConfig.pinTabTitles.indexOf(currentActiveTabTitle) != -1 || currentActiveTabTitle == undefined) { //特殊ID，弹出默认的右键菜单
                return true;
            }
            if (rightMenuConfig.pintabIDs && rightMenuConfig.pintabIDs.indexOf(currentActiveTabID) != -1 || currentActiveTabID == undefined) { //特殊ID，弹出默认的右键菜单
                return true;
            }
            if (e.which != 2) {
                return true;
            }
            //鼠标中键关闭指定标签页
            element.tabDelete(rightMenuConfig.filter, currentActiveTabID);
            //隐藏菜单(如果有)
            $("." + rightMenuConfig.filter).hide();
            return false;
        });
    }


    /**
     * 创建右键菜单项目
     * @param rightMenuConfig
     * @constructor
     */
    function CreateRightMenu(rightMenuConfig) {
        // 使用"filter"属性作为css样式名称
        $("<style></style>").text(createStyle(rightMenuConfig.filter, rightMenuConfig.width)).appendTo($("head"));
        var li = '';
        $.each(rightMenuConfig.navArr, function (index, conf) {
            if (conf.eventName === 'line')
                li += '<hr/>';
            else
                li += '<li data-type="{eventName}"><i class="layui-icon {icon}"></i>{title}</li>'
                    .format({eventName: conf.eventName, icon: conf.icon ? conf.icon : "", title: conf.title});
        })
        var tmpHtml = '<ul class="{className}">{liStr} </ul>'.format({liStr: li, className: rightMenuConfig.filter})
        $(rightMenuConfig.container).after(tmpHtml);
        _CustomRightClick(rightMenuConfig);
    }


    /**
     * 绑定右键菜单
     * @constructor
     */
    function _CustomRightClick(rightMenuConfig) {
        //屏蔽Tab右键
        //$("#" + rightmenuObj.filter + ' li').on('contextmenu', function (e) {
        //    return false;
        //})
        $('#' + rightmenuObj.filter + ',' + rightmenuObj.filter + ' li').click(function () {
            $('.' + rightMenuConfig.filter).hide();
        });
        //事件委托，处理动态添加的li
        $("#" + rightmenuObj.filter).on('contextmenu', 'li', function (e) {
            currentActiveTabID = $(e.target).attr('lay-id');// 获取当前激活的选项卡ID,当前ID改为右键菜单弹出时就获取
            currentActiveTabTitle = $.trim($(e.target).text());//获取当前激活选项卡的标题

            if (rightMenuConfig.pinTabTitles && rightMenuConfig.pinTabTitles.indexOf(currentActiveTabTitle) != -1 || currentActiveTabTitle == undefined) {   //特殊ID，弹出默认的右键菜单
                return true;
            }
            if (rightMenuConfig.pintabIDs && rightMenuConfig.pintabIDs.indexOf(currentActiveTabID) != -1 || currentActiveTabID == undefined) {   //特殊ID，弹出默认的右键菜单
                return true;
            }
            var popupmenu = $("." + rightMenuConfig.filter);
            var leftValue = ($(document).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
            var topValue = ($(document).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
            popupmenu.css({left: leftValue, top: topValue}).show();
            return false;
        });

        // 点击空白处隐藏弹出菜单
        $(document).click(function (event) {
            event.stopPropagation();
            $("." + rightMenuConfig.filter).hide();
        });

        /**
         * 注册tab右键菜单点击事件
         */
        $('.' + rightMenuConfig.filter + ' li').click(function (e) {
            var tabs = $("#" + rightMenuConfig.filter + " li");
            var allTabIDArrButPin = [];//所有非固定选项卡集合
            var allTabIDArr = [];// 所有选项卡集合
            var idIndexButPin = 0;
            var idIndex = 0;
            $.each(tabs, function (i) {
                var id = $(this).attr("lay-id");
                var title = $(this).text();
                if (rightMenuConfig.pinTabTitles == undefined || rightMenuConfig.pintabIDs == undefined) {
                    allTabIDArrButPin[idIndexButPin] = id;
                    idIndexButPin++;
                } else if ((rightMenuConfig.pinTabTitles && rightMenuConfig.pinTabTitles.indexOf(title) == -1) &&
                    ((rightMenuConfig.pintabIDs && rightMenuConfig.pintabIDs.indexOf(id) == -1) || id == undefined))  //去除特殊ID
                {
                    allTabIDArrButPin[idIndexButPin] = id;
                    idIndexButPin++;
                }
                allTabIDArr[idIndex] = id;
                idIndex++;
            })

            // 事件处理
            switch ($(this).attr("data-type")) {
                case "closethis"://关闭当前，如果开始了tab可关闭，实际意义不大
                    tabDelete(currentActiveTabID, rightMenuConfig.filter);
                    break;
                case "closeallbutpin"://关闭所有但固定
                    tabDeleteAll(allTabIDArrButPin, rightMenuConfig.filter);
                    break;
                case "closeothersbutpin"://关闭非当前但固定
                    $.each(allTabIDArrButPin, function (i) {
                        var tmpTabID = allTabIDArrButPin[i];
                        if (currentActiveTabID != tmpTabID)
                            tabDelete(tmpTabID, rightMenuConfig.filter);
                    })
                    break;
                case "closeleftbutpin"://关闭左侧全部但固定
                    var indexCloseleft = allTabIDArrButPin.indexOf(currentActiveTabID);
                    console.log(allTabIDArrButPin.slice(0, indexCloseleft));
                    tabDeleteAll(allTabIDArrButPin.slice(0, indexCloseleft), rightMenuConfig.filter);
                    break;
                case "closerightbutpin"://关闭右侧全部但固定
                    var indexCloseright = allTabIDArrButPin.indexOf(currentActiveTabID);
                    tabDeleteAll(allTabIDArrButPin.slice(indexCloseright + 1), rightMenuConfig.filter);
                    break;

                case "closeall"://关闭所有
                    tabDeleteAll(allTabIDArr, rightMenuConfig.filter);
                    break;
                case "closeothers"://关闭非当前
                    $.each(allTabIDArr, function (i) {
                        var tmpTabID = allTabIDArr[i];
                        if (currentActiveTabID != tmpTabID)
                            tabDelete(tmpTabID, rightMenuConfig.filter);
                    })
                    break;
                case "closeleft"://关闭左侧全部
                    var indexCloseleft = allTabIDArr.indexOf(currentActiveTabID);
                    tabDeleteAll(allTabIDArr.slice(0, indexCloseleft), rightMenuConfig.filter);
                    break;
                case "closeright"://关闭右侧全部
                    var indexCloseright = allTabIDArr.indexOf(currentActiveTabID);
                    tabDeleteAll(allTabIDArr.slice(indexCloseright + 1), rightMenuConfig.filter);
                    break;
                case "refresh":
                    refreshiFrame();
                    break;
                default:
                    var currentTitle = $("#" + rightMenuConfig.filter + ">li[class='layui-this']").text();
                    rightMenuConfig.registMethod[$(this).attr("data-type")](currentActiveTabID, currentTitle, rightMenuConfig.container, $(this)[0]);
            }
            $('.rightmenu').hide();
        })
    }

    var tabDelete = function (id, currentNav) {
        element.tabDelete(currentNav, id);//删除
    }
    var tabDeleteAll = function (ids, currentNav) {
        $.each(ids, function (i, item) {
            element.tabDelete(currentNav, item);
        })
    }
    /**
     * 重新加载iFrame，实现更新
     * @returns {boolean}
     */
    var refreshiFrame = function () {
        var $curFrame = $('iframe:visible');
        $curFrame.attr("src", $curFrame.attr("src"));
        return false;
    }

    var rightmenuObj = new RIGHTMENUMOD();
    exports(MOD_NAME, rightmenuObj);
})