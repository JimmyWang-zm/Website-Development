# KWC Motor — 东莞市鑫惠展机电官方网站

精密微型电机制造商鑫惠展机电（KWC Motor）的企业官网，深耕微电机产业 20 年，提供直流无刷电机、有刷电机、齿轮箱、交流电机及 ODM/OEM 服务。

## 🌐 在线预览

**Netlify：** [https://luxury-eclair-69ddf5.netlify.app/](https://luxury-eclair-69ddf5.netlify.app/)

## 📁 项目结构

```
kwc-motor/
├── index.html              # 首页
├── about/
│   ├── index.html          # 关于我们
│   └── history.html        # 企业沿革
├── products/
│   ├── index.html          # 产品总览
│   ├── AC_motor.html       # 交流电机
│   ├── DC_brushed_motor.html    # 直流有刷电机
│   ├── DC_brushless_motor.html  # 直流无刷电机
│   ├── external_rotor.html # 外转子电机
│   └── gearbox.html        # 齿轮箱
├── news/
│   └── index.html          # 最新动态
├── article/
│   └── index.html          # 技术文章
├── guide/
│   └── index.html          # 选型指南
├── exploded/
│   └── index.html          # 爆炸图
├── download/
│   └── catalog.html        # 产品目录下载
├── contact/
│   └── index.html          # 联系我们
├── css/
│   ├── style.css           # 主样式
│   └── components.css      # 组件样式
├── js/
│   └── main.js             # 主脚本
└── images/                 # 图片资源
```

## 🚀 本地开发

本项目为纯静态网站，无需构建工具，直接用任意静态服务器启动即可。

### 使用 VS Code Live Server

1. 安装 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 扩展
2. 右键 `index.html` → **Open with Live Server**

### 使用 Python

```bash
python -m http.server 8080
```

然后访问 [http://localhost:8080](http://localhost:8080)

## 🛠️ 技术栈

- 纯 HTML5 / CSS3 / JavaScript（无框架依赖）
- Google Fonts（Inter + Noto Sans SC）
- 响应式布局，支持移动端

## 📦 部署

本站通过 [Netlify](https://netlify.com) 持续部署，将代码推送到 `main` 分支后自动触发更新。
