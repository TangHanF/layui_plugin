layui.define(['element'], function (exports) {
    let element = layui.element;
    const $ = layui.jquery;

    let MOD_NAME = 'rightmenu';
    let RIGHTMENUMOD = function () {
        this.v = '1.0.0';
        this.author = 'TangHanF';
        this.email = 'guofu_gh@163.com';
        this.rightmenuStyle = `
            /**右键菜单*/
            .rightmenu {
                position: absolute;
                width: 110px;
                z-index: 9999;
                display: none;
                background-color: #fff;
                padding: 2px;
                color: #333;
                border: 1px solid #eee;
                border-radius: 2px;
                cursor: pointer;
            }
    
            .rightmenu li {
                text-align: center;
                display: block;
                height: 30px;
                line-height: 32px;
            }
    
            .rightmenu li:hover {
                background-color: #666;
                color: #fff;
            }
        `
    };

    /**
     * 初始化
     */
    RIGHTMENUMOD.prototype.render = function (opt) {
        let defaultNavArr = [
            {dataType: 'closethis', title: '关闭当前'},
            {dataType: 'closeall', title: '关闭所有'},
            {dataType: 'closeothers', title: '关闭其它'},
            {dataType: 'closeleft', title: '关闭左侧所有'},
            {dataType: 'closeright', title: '关闭右侧所有'},
            {dataType: 'refresh', title: '刷新当前页'},
        ];
        opt = opt || {};
        opt.navArr = opt.navArr || defaultNavArr;
        CreateRightMenu(opt.navArr);
    };


    /**
     * 创建右键菜单项目
     * @param rightMenuConfig
     * @constructor
     */
    function CreateRightMenu(rightMenuConfig) {
        $("<style></style>").text(rightmenu.rightmenuStyle).appendTo($("head"));
        let li = '';
        $.each(rightMenuConfig, function (index, conf) {
            li += '<li data-type="' + conf.dataType + '">' + conf.title + '</li>';
        })
        $(".nav-body").after('<ul class="rightmenu">' + li + '</ul>');
        _CustomRightClick();
    }


    /**
     * 绑定右键菜单
     * @constructor
     */
    function _CustomRightClick() {
        //屏蔽Tab右键
        $('.layui-tab-title li').on('contextmenu', function () {
            return false;
        })
        $('.layui-tab-title,.layui-tab-title li').click(function () {
            $('.rightmenu').hide();
        });
        $('.layui-tab-title li').on('contextmenu', function (e) {
            let popupmenu = $(".rightmenu");
            let leftValue = ($(document).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
            let topValue = ($(document).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
            popupmenu.css({left: leftValue, top: topValue}).show();
            return false;
        });
        // 点击空白处隐藏弹出菜单
        $(document).click(function (event) {
            event.stopPropagation();
            $(".rightmenu").hide();
        });

        /**
         * 注册tab右键菜单点击事件
         */
        $(".rightmenu li").click(function () {
            let currentActiveTabID = $("li[class='layui-this']").attr('lay-id');// 获取当前激活的选项卡ID
            let tabtitle = $(".layui-tab-title li");
            let allTabIDArr = [];
            $.each(tabtitle, function (i) {
                allTabIDArr[i] = $(this).attr("lay-id");
            })

            // 事件处理
            switch ($(this).attr("data-type")) {
                case "closethis"://关闭当前，如果开始了tab可关闭，实际意义不大
                    tabDelete(currentActiveTabID);
                    break;
                case "closeall"://关闭所有
                    tabDeleteAll(allTabIDArr);
                    break;
                case "closeothers"://关闭非当前
                    $.each(allTabIDArr, function (i) {
                        let tmpTabID = allTabIDArr[i];
                        if (currentActiveTabID != tmpTabID)
                            tabDelete(tmpTabID);
                    })
                    break;
                case "closeleft"://关闭左侧全部
                    let indexCloseleft = allTabIDArr.indexOf(currentActiveTabID);
                    tabDeleteAll(allTabIDArr.slice(0, indexCloseleft));
                    break;
                case "closeright"://关闭右侧全部
                    let indexCloseright = allTabIDArr.indexOf(currentActiveTabID);
                    tabDeleteAll(allTabIDArr.slice(indexCloseright + 1));
                    break;
                case "refresh":
                    // 重新加载iFrame，实现更新。注意：如果你不是使用的iFrame则无效，具体刷新实现自行处理
                    // document.getElementById(currentActiveTabID).contentWindow.location.reload(true);
                    refreshiFrame();
                    break;
                default:
                    $('.rightmenu').hide();

            }
            $('.rightmenu').hide();
        })
    }

    let tabDelete = function (id) {
        console.log("删除的TabID：" + id)
        element.tabDelete("main-tab", id);//删除
    }
    let tabDeleteAll = function (ids) {
        $.each(ids, function (i, item) {
            element.tabDelete("main-tab", item);
        })
    }
    /**
     * 重新加载iFrame，实现更新
     * @returns {boolean}
     */
    let refreshiFrame = function () {
        let $curFrame = $('iframe:visible');
        $curFrame.attr("src", $curFrame.attr("src"));
        return false;
    }

    let rightmenu = new RIGHTMENUMOD();
    exports(MOD_NAME, rightmenu);
})