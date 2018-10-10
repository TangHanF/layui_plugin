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

### 效果图
![](https://ws1.sinaimg.cn/large/006tNbRwly1fw2ur3xxrhj30uk0f20tu.jpg)

### 示例地址：[点此进入](https://tanghanf.github.io/layui_plugin/rightmenu_demo.html)


### 调用说明

#### html部分

Tab选项卡使用官方提供模板： https://www.layui.com/doc/element/tab.html 
然后简单修改如下：

```html
<div class="nav-body">
    <div class="layui-tab" lay-filter="main-tab">
        <ul class="layui-tab-title">
            <li lay-id="0" class="layui-this">网站设置</li>
            <li lay-id="1">用户管理</li>
            <li lay-id="2">权限分配</li>
            <li lay-id="3">商品管理</li>
            <li lay-id="4">订单管理</li>
        </ul>
        <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">内容1</div>
            <div class="layui-tab-item">内容2</div>
            <div class="layui-tab-item">内容3</div>
            <div class="layui-tab-item">内容4</div>
            <div class="layui-tab-item">内容5</div>
        </div>
    </div>
</div>
```
**注意：**
> - 使用&lt;div class=&quot;nav-body&quot;&gt;&lt;/div&gt;对“layui-tab”选项卡进行包裹。
> - 为class为“layui-tab”的div加入：lay-filter="main-tab"。
> - 为各个选项卡加入“lay-id”属性进行唯一标识。
> 
> 其它内容自行处理即可！

#### JavaScript部分
```javascript
layui.config({
    base: 'module/',
}).use(['element', 'rightmenu'], function () {
    let element = layui.element;
    let rightmenu_ = layui.rightmenu;

    // 默认方式渲染全部：关闭当前（closethis）、关闭所有（closeall）、关闭其它（closeothers）、关闭左侧所有（closeleft）、关闭右侧所有（closeright）、刷新当前页（refresh）
    // rightmenu_.render();

    // 默认渲染部分弹出项
    rightmenu_.render({
        navArr:[
            {dataType: 'closethis', title: '关闭当前'},
            {dataType: 'closeall', title: '关闭所有'},
            {dataType: 'closeothers', title: '关闭其它'},
        ]
    })

});
```