# layui_plugin
LayUI扩展模块，持续增加中...

-------

[TOC]

-----

# 一、Tab选项卡右键弹出菜单
**组件名称：** `tabrightmenu`

**实例方法：**`render`

> tabrightmenu.render(options)

## 1.1 options说明

|   属性名称   | 属性说明               | 备注                                                         | 类型                    |
| :----------: | :--------------------- | :----------------------------------------------------------- | ----------------------- |
|  container   | 选项卡外部容器ID       | 例如：`container: '#nav1'`                                   | String,''               |
|    filter    | 过滤值                 | div的”lay-filter“属性。<br />注意：ul的id值要和lay-filter属性一致，参考下面实例即可 | String,''               |
| pinTabTitles | 固定标签的标题集合     | 通过指定的标签标题集合告诉组件哪些标签是固定的<br />从而在一些操作事件中进行相应处理，<br />例如”关闭其它但固定“等操作 | Array,[]                |
|  pintabIDs   | 固定标签的ID集合       | 与`pinTabTitles`属性类似，只不过变为指定ID集合。<br />二者之中可以二选一（建议）也可以都保留，<br />只是便于开发使用考虑加入标题和ID形式进行两种方式的过滤 | Array,[]                |
|    width     | 弹出菜单的宽度         | 一般情况下100~110即可                                        | int                     |
|    navArr    | 导航标签页配置对象集合 | 对象配置分两大类：<br />1、{eventName: 'xxx', title: 'xxx', icon: 'xxx'}或者{eventName: 'xxx', title: 'xxx'},即`eventName`和`title`是必选项<br />2、{eventName: 'xxx'},只有`eventName`一项，目前取值仅为`line`表示分割线<br />**eventName默认取值：**<br />1) closethis:关闭当前<br />2) closeallbutpin:关闭所有但固定<br />3) closeothersbutpin:关闭非当前但固定<br />4) closeleftbutpin:关闭左侧全部但固定<br />5) closerightbutpin:关闭右侧全部但固定<br />6) closeall:关闭所有<br />7) closeothers:关闭非当前<br />8) closeleft:关闭左侧全部<br />9) closeright:关闭右侧全部<br /> | Array，[{'xx':'xx1'}]   |
| registMethod | 自定义事件注册         | 在`navArr`配置对象的`eventName`非默认取值时需要使用``registMethod`进行注册，以便组件能够顺利回调方法 | Object,[{{'xx':'xx1'}}] |

**完整示例：**

```javascript
rightmenu_.render({
    container: '#nav2',
    filter: 'main_tab2',
    // navArr：对象数组，每个对象包含dataType、title、method属性
    navArr: [
        {eventName: 'closethis', title: '关闭当前', icon: 'layui-icon-close'},
        {eventName: 'closeallbutpin', title: '关闭所有但固定'},
        {eventName: 'closeothersbutpin', title: '关闭其它但固定'},
        {eventName: 'line'},// 创建分割线

        {eventName: 'closeall', title: '关闭所有'},
        {eventName: 'closeothers', title: '关闭其它'},
        {eventName: 'closeleftbutpin', title: '关闭左侧'},
        {eventName: 'closerightbutpin', title: '关闭右侧'},
        {eventName: 'line'},// 创建分割线

        //自定义菜单项，此时dataType属性表示自定义事件
        {title: "测试", eventName: 'test'},
        {title: "测试2", eventName: 'test2'},
    ],
    // 注册自定义事件
    registMethod: {'test': testMethod, 'test2': test2Method}
})

function testMethod(id, title, currentNavGroup, dom) {
    changeCurrentTabContent(currentNavGroup, "[测试]触发,触发的ID：" + id + "，标题：" + title);
}

function test2Method(id, title, currentNavGroup, dom) {
    changeCurrentTabContent(currentNavGroup, "[测试2]触发,触发的ID：" + id + "，标题：" + title);
}

function changeCurrentTabContent(currentNavGroup, content) {
    $(currentNavGroup + " div[class='layui-tab-item layui-show']").html(content);

}
```

> 以上基本就是一个完整的组件内部属性使用示例，可以适当拆分组合属性已达到预期效果。

## 1.2 效果图

- 一个页面一个Tab选项卡情况

![](https://ws1.sinaimg.cn/large/006tNbRwly1fw2ur3xxrhj30uk0f20tu.jpg)

- 一个页面多个选项卡情况

![](https://ws2.sinaimg.cn/large/006tNbRwly1fw565a2ledj311o0i00un.jpg)

![](https://ws1.sinaimg.cn/large/006tNbRwly1fw568pduerj30zo0mgwgf.jpg)

## 1.3 示例地址

[点此进入](https://tanghanf.github.io/layui_plugin/rightmenu_demo.html)

## 1.4 更新历史

- **V1.0.0** 2018年10月12日

    初始版本

- **V1.0.1** 2018年10月19日

    > 感谢LayUI社区：[未闻花名0821](https://fly.layui.com/u/19689936/)提供建议以及代码，在其基础之后又做了调整，可参考我原帖地址以及采纳的答案，[点此直达](https://fly.layui.com/jie/24715/)

    1.增加对固定标签页的处理，关闭时默认不关闭已固定的标签页（也提供eventName类型提供关闭固定标签页）。

    2.把let和const改为var，兼容低版本IE浏览器（唉😌，无奈.....）

    3.弹出项支持配置分割线（navArr集合对象修改为`eventName:'line'`即可）

-----

> 为Tab选项卡增加右键弹出菜单，例如：关闭当前、关闭其它....
>
> 默认右键菜单弹出项有:
> - 关闭当前（closethis）
> - 关闭所有但固定（closeallbutpin）
> - 关闭其它但固定（closeothersbutpin）
> - 关闭左侧所有但固定（closeleftbutpin）
> - 关闭右侧所有但固定（closerightbutpin）
> - 刷新当前页（refresh）
>
> 额外的默认事件（非默认弹出，需要自己根据实际情况制定）：
>
> - 关闭所有（closeall）
> - 关闭其它（closeother）
> - 关闭左侧所有（closeleft）
> - 关闭右侧所有（closeright）
>
> 当然，可以根据实际情况自动选择部分内容进行渲染（调用方式下文有描述）

## 1.5 名词定义

> - **自定义弹出项**:除组件默认提供的6个右键菜单弹出项外其它所有新增加的菜单项都为`自定义弹出项`

## 1.6 功能支持

- 支持页面多个Tab选项卡弹出菜单单独定义
- 支持自定义弹出项和弹出事件（使用`registMethod`属性进行注册）

- 支持自定义图标（目前仅支持LayUI默认图标）

## 1.7 调用说明

### 1.7.1 一个页面一个Tab选项卡情况

**html部分**

Tab选项卡使用官方提供模板： https://www.layui.com/doc/element/tab.html 
然后简单修改如下：

```html
<div id="nav1">
    <!-- 顶部切换卡 -->
    <!--ul的id要和lay-filter一致-->
    <div class="layui-tab" lay-filter="main_tab1">
        <ul id="main_tab1" class="layui-tab-title">
            <li lay-id="0" class="layui-this">网站设置</li>
            <li lay-id="1">用户管理</li>
            <li lay-id="2">权限分配</li>
            <li lay-id="3">商品管理</li>
            <li lay-id="4">订单管理</li>
        </ul>
        <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">这是 网站设置 内容</div>
            <div class="layui-tab-item">这是 用户管理 内容</div>
            <div class="layui-tab-item">这是 权限分配 内容</div>
            <div class="layui-tab-item">这是 商品管理 内容</div>
            <div class="layui-tab-item">这是 订单管理 内容</div>
        </div>
    </div>
</div>
```
**注意：**
> - 需要在class="layui-tab"的div外层包裹一层div并指定该div的id，**该id也是组件“`container`”的属性值**
> - ul的“id”要和父div的“lay-filter”一致
> - ”lay-filter“属性即组件的”`filter`“属性
> - 为各个选项卡菜单项（li元素）加入“lay-id”属性进行唯一标识。
>
> 其它内容自行处理即可！

**JavaScript部分**

> ##### 默认渲染

```javascript
layui.config({
    base: 'module/',
}).use(['element', 'tabrightmenu'], function () {
    let element = layui.element;
    let rightmenu_ = layui.tabrightmenu;

    // 默认方式渲染全部：关闭当前（closethis）、关闭所有但固定（closeallbutpin）、关闭其它但固定（closeothersbutpin）、关闭左侧所有但固定（closeleftbutpin）、关闭右侧所有但固定（closerightbutpin）、刷新当前页（refresh）
    rightmenu_.render({
        container: '#nav1',
        filter: 'main_tab1',
    });
});
```

> 自定义渲染项

```javascript
layui.config({
    base: 'module/',
}).use(['element', 'tabrightmenu'], function () {
    let element = layui.element;
    let rightmenu_ = layui.tabrightmenu;

    // 默认方式渲染全部：关闭当前（closethis）、关闭所有但固定（closeallbutpin）、关闭其它但固定（closeothersbutpin）、关闭左侧所有但固定（closeleftbutpin）、关闭右侧所有但固定（closerightbutpin）、刷新当前页（refresh）
    rightmenu_.render({
        container: '#nav1',
        filter: 'main_tab1',
        navArr: [
            {eventName: 'closethis', title: '关闭当前', icon: 'layui-icon-close'},
            {eventName: 'closeallbutpin', title: '关闭所有'},
            {eventName: 'closeothersbutpin', title: '关闭其它'},
            //自定义菜单项，此时dataType属性表示自定义事件
            {title: "测试", eventName: 'test'},
            {title: "测试2", eventName: 'test2'},
        ],
        //注册自定义事件
        registMethod: {'test': testMethod, 'test2': test2Method}
    });
    
    
    
    function testMethod(id, title, currentNavGroup, dom) {
            changeCurrentTabContent(currentNavGroup, "[测试]触发,触发的ID：" + id + "，标题：" + title);
        }

    function test2Method(id, title, currentNavGroup, dom) {
            changeCurrentTabContent(currentNavGroup, "[测试2]触发,触发的ID：" + id + "，标题：" + title);
        }

    function changeCurrentTabContent(currentNavGroup, content) {
            $(currentNavGroup + " div[class='layui-tab-item layui-show']").html(content);

        }
});
```

> - 使用`自定义弹出项`最重要的就是`navArr`属性。该属性是一个对象集合，每一个对象描述了菜单项的一些基本信息（eventName：事件类型、title：菜单项标题、icon：图标class类名）
> - 使用`自定义弹出项`需要定义`registMethod`属性，以便对`eventName`属性指定的事件进行注册

### 1.7.2 一个页面多个Tab选项卡情况

该情景与上述定义、调用差不多，唯一需要注意的就是HTML部分。

```html
<h1>选项卡1</h1>
<div id="nav1">
    <!-- 顶部切换卡 -->
    <!--ul的id要和lay-filter一致-->
    <div class="layui-tab" lay-filter="main_tab1">
        <ul id="main_tab1" class="layui-tab-title">
            <li lay-id="0" class="layui-this">网站设置</li>
            <li lay-id="1">用户管理</li>
            <li lay-id="2">权限分配</li>
            <li lay-id="3">商品管理</li>
            <li lay-id="4">订单管理</li>
        </ul>
        <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">这是 网站设置 内容</div>
            <div class="layui-tab-item">这是 用户管理 内容</div>
            <div class="layui-tab-item">这是 权限分配 内容</div>
            <div class="layui-tab-item">这是 商品管理 内容</div>
            <div class="layui-tab-item">这是 订单管理 内容</div>
        </div>
    </div>
</div>


<h1>选项卡2</h1>
<div id="nav2">
    <!-- 顶部切换卡 -->
    <div class="layui-tab" lay-filter="main_tab2">
        <ul id="main_tab2" class="layui-tab-title">
            <li lay-id="11" class="layui-this">权限管理</li>
            <li lay-id="12">机构管理</li>
            <li lay-id="21">字典管理</li>
            <li lay-id="31">用户管理</li>
            <li lay-id="41">物流管理</li>
        </ul>
        <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">这是 权限管理 内容</div>
            <div class="layui-tab-item">这是 机构管理 内容</div>
            <div class="layui-tab-item">这是 字典管理 内容</div>
            <div class="layui-tab-item">这是 用户管理 内容</div>
            <div class="layui-tab-item">这是 物流管理 内容</div>
        </div>
    </div>
</div>
```

> 注意，我们定义了两个div，id分别为”nav1“、”nav2“。假如我们现在实现id为”nav1“的Tab选项卡弹出默认菜单项，id为”nav2“的Tab选项卡弹出一些自定义菜单项，JavaScript代码如下：

```javascript
layui.config({
    base: 'module/',
}).use(['tabrightmenu'], function () {
    let element = layui.element;
    let rightmenu_ = layui.tabrightmenu;

    // 默认方式渲染全部：关闭当前（closethis）、关闭所有但固定（closeallbutpin）、关闭其它但固定（closeothersbutpin）、关闭左侧所有但固定（closeleftbutpin）、关闭右侧所有但固定（closerightbutpin）、刷新当前页（refresh）
    // 渲染nav1
    rightmenu_.render({
        container: '#nav1',
        filter: 'main_tab1',
    });

    // 渲染nav2，渲染默认部分弹出项+自定义弹出项
    rightmenu_.render({
        container: '#nav2',
        filter: 'main_tab2',
        // navArr：对象数组，每个对象包含dataType、title、method属性
        navArr: [
            {eventName: 'closethis', title: '关闭当前', icon: 'layui-icon-close'},
            {eventName: 'closeallbutpin', title: '关闭所有'},
            {eventName: 'closeothersbutpin', title: '关闭其它'},
            //自定义菜单项，此时dataType属性表示自定义事件
            {title: "测试", eventName: 'test'},
            {title: "测试2", eventName: 'test2'},
        ],
        // 注册自定义事件
        registMethod: {'test': testMethod, 'test2': test2Method}
    })

    function testMethod(id, title, currentNavGroup, dom) {
        changeCurrentTabContent(currentNavGroup, "[测试]触发,触发的ID：" + id + "，标题：" + title);
    }

    function test2Method(id, title, currentNavGroup, dom) {
        changeCurrentTabContent(currentNavGroup, "[测试2]触发,触发的ID：" + id + "，标题：" + title);
    }

    function changeCurrentTabContent(currentNavGroup, content) {
        $(currentNavGroup + " div[class='layui-tab-item layui-show']").html(content);

    }
});
```

以上就可以实现一个页面多个选项卡进行不同处理，实用性更强。

### 1.7.3 混合示例

#### 1.7.3.1 指定固定标签页

```javascript
rightmenu_.render({
    container: '#nav1',
    filter: 'main_tab1',

    // pinTabTitles和pintabIDs作用一样，可以二选一（建议）也可以都保留，只是便于开发使用考虑加入标题和ID形式进行两种方式的过滤
    pinTabTitles:['网站设置'],//表示标题为“网站设置”的标签为固定标签
    pintabIDs:['0','1'],//表示id为“0”、"1"的标签为固定标签
});
```

#### 1.7.3.2 设置弹出菜单宽度

```javascript
rightmenu_.render({
    container: '#nav1',
    filter: 'main_tab1',

    width:160,// 右键弹出框的宽度，一般100~110即可
});
```

#### 1.7.3.3 设置分割线

```javascript
rightmenu_.render({
    container: '#nav2',
    filter: 'main_tab2',
    // navArr：对象数组，每个对象包含dataType、title、method属性
    navArr: [
        {eventName: 'closethis', title: '关闭当前', icon: 'layui-icon-close'},
        {eventName: 'closeallbutpin', title: '关闭所有但固定'},
        {eventName: 'closeothersbutpin', title: '关闭其它但固定'},
        
        {eventName:'line'},// 创建分割线

        {eventName: 'closeall', title: '关闭所有'},
        {eventName: 'closeothers', title: '关闭其它'},
        {eventName: 'closeleftbutpin', title: '关闭左侧'},
        {eventName: 'closerightbutpin', title: '关闭右侧'},
        
        {eventName:'line'},// 创建分割线

        //自定义菜单项，此时dataType属性表示自定义事件
        {title: "测试", eventName: 'test'},
        {title: "测试2", eventName: 'test2'},
    ],
    // 注册自定义事件
    registMethod: {'test': testMethod, 'test2': test2Method}
})
```

