## 0.2.2
1、修复 int、float 验证成功后不会自动转换的问题

## 0.2.1
1、修复 Rules.length 验证规则兼容性问题
2、增加 lint 规则

## [重大更新] 0.2.0
1、项目已改变使用 rollup.js 进行开发（未来会增加 typescript 支持）
2、项目已经支持 cjs、mjs 导出，分别对应前后端
3、项目使用 mocha、power-assert 进行测试
4、升级基础验证库 validator 的版本
4、[重要API调整] 修改验证方法、改动了参数传入与验证完成返回结果的对象、调整了验证核心逻辑
5、验证不会修改原对象（params、rules）验证结果会返回已验证完成的数据对象（自动过滤未验证的字段）
6、增加严格模式
7、增加对象、数组深层验证的支持
8、增加国际化方案

## 0.1.0
    [新增] allowNull 字段，允许 null 值，仅 json 格式支持，仅拥有 ctx 后端支持
    [新增] placeholder 字段在免检字段中
    
## 0.0.7
    调整 array 方法的验证不规范,和错误提示    
    [新增] test 测试文件

## 0.0.6
如果是空参数（空字符串），在 rule.string = true 规则成立时会设置为 '', 其他情况下会以 undefined 处理
在 int float 等与 length 混用时，若验证失败应该返回更为精确的错误信息
    - 以增加规则，但是需要修改字符串

## 0.0.5
增加 - dateRange
增加 - datetimeRange

## 0.0.4
调整 - 调整 date 的规则
新增 - 新增 time 的规则
新增 - 新增 datetime 的规则

## 0.0.3
修复 array 方式验证引发的错误

## 0.0.2
修复 regexp 方式验证引发的错误

## 0.0.1
表单验证插件，支持前端、后端（koa体系）验证