# layui_plugin
LayUI扩展模块，持续增加中...

# Tab选项卡右键弹出菜单

> 为Tab选项卡增加右键弹出菜单，例如：关闭当前、关闭其它....
>
> 默认右键菜单弹出项有:
> - 关闭当前（closethis）
> - 关闭所有（closeall）
> - 关闭其它（closeothers）
> - 关闭左侧所有（closeleft）
> - 关闭右侧所有（closeright）
> - 刷新当前页（refresh）
>
> 当然，可以根据实际情况自动选择部分内容进行渲染（调用方式下文有描述）

## 名词定义

> - **自定义弹出项**:除组件默认提供的6个右键菜单弹出项外其它所有新增加的菜单项都为`自定义弹出项`

## 功能支持

- 支持页面多个Tab选项卡弹出菜单单独定义
- 支持自定义弹出项和弹出事件（使用`registMethod`属性进行注册）

- 支持自定义图标（目前仅支持LayUI默认图标）

### 效果图

- 一个页面一个Tab选项卡情况

![](https://ws1.sinaimg.cn/large/006tNbRwly1fw2ur3xxrhj30uk0f20tu.jpg)

- 一个页面多个选项卡情况

![](https://ws2.sinaimg.cn/large/006tNbRwly1fw565a2ledj311o0i00un.jpg)

![](https://ws1.sinaimg.cn/large/006tNbRwly1fw568pduerj30zo0mgwgf.jpg)

### 示例地址：[点此进入](https://tanghanf.github.io/layui_plugin/rightmenu_demo.html)

### 调用说明

> #### 一个页面一个Tab选项卡情况

##### html部分

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

##### JavaScript部分

> 默认渲染

```javascript
layui.config({
    base: 'module/',
}).use(['element', 'rightmenu'], function () {
    let element = layui.element;
    let rightmenu_ = layui.rightmenu;

    // 默认方式渲染全部：关闭当前（closethis）、关闭所有（closeall）、关闭其它（closeothers）、关闭左侧所有（closeleft）、关闭右侧所有（closeright）、刷新当前页（refresh）
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
}).use(['element', 'rightmenu'], function () {
    let element = layui.element;
    let rightmenu_ = layui.rightmenu;

    // 默认方式渲染全部：关闭当前（closethis）、关闭所有（closeall）、关闭其它（closeothers）、关闭左侧所有（closeleft）、关闭右侧所有（closeright）、刷新当前页（refresh）
    rightmenu_.render({
        container: '#nav1',
        filter: 'main_tab1',
        navArr: [
            {eventName: 'closethis', title: '关闭当前', icon: 'layui-icon-close'},
            {eventName: 'closeall', title: '关闭所有'},
            {eventName: 'closeothers', title: '关闭其它'},
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

> #### 一个页面一个Tab选项卡情况

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
}).use(['rightmenu'], function () {
    let element = layui.element;
    let rightmenu_ = layui.rightmenu;

    // 默认方式渲染全部：关闭当前（closethis）、关闭所有（closeall）、关闭其它（closeothers）、关闭左侧所有（closeleft）、关闭右侧所有（closeright）、刷新当前页（refresh）
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
            {eventName: 'closeall', title: '关闭所有'},
            {eventName: 'closeothers', title: '关闭其它'},
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