# HubWeb-template

> [!important]
>
> 该项目改编自原作者 [Hello8693](https://github.com/hello8693) 的 [classisland-hub-web](https://github.com/ClassIsland/classisland-hub-web)，改编时间：2026 年 8 月 12 日。

一个最小可用的 hub-web 画廊模板，基于 Vue 3 + Vite + [vue-waterfall-plugin-next](https://github.com/heikaimu/vue3-waterfall-plugin)。

## 项目结构

```
hub-web/
├── public/
│   └── imgs/                  # 构建时从 Hub 仓库拉取的图片
├── src/
│   ├── assets/
│   │   └── imageList.json     # 自动生成的图片路径列表
│   ├── views/
│   │   └── HomeView.vue       # 画廊主页面
│   ├── App.vue                # 根组件
│   └── main.ts                # 入口
├── generateImageList.cjs      # 生成 imageList.json 的脚本
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 前置条件

- Node.js 18+
- 一个已创建好的 Hub 仓库

## 快速开始

1. 克隆本仓库
2. 修改 `package.json` 中的 `getphotos` 脚本，将 `YOUR-USERNAME/YOUR-HUB-REPO` 替换为你的 Hub 仓库地址
3. 安装依赖

   ```bash
   npm install
   ```

4. 本地开发

   ```bash
   npm run dev
   ```

5. 构建

   ```bash
   npm run build
   ```

## 脚本说明

| 脚本                    | 说明                                                 |
| ----------------------- | ---------------------------------------------------- |
| `npm run getphotos`     | 从 Hub 仓库 clone 图片到 `public/imgs/`              |
| `npm run generate-list` | 扫描 `public/imgs/` 生成 `src/assets/imageList.json` |
| `npm run dev`           | 拉取图片、生成列表并启动开发服务器                   |
| `npm run build`         | 类型检查并构建生产产物到 `dist/`                     |
| `npm run preview`       | 预览生产构建                                         |
| `npm run type-check`    | 运行 TypeScript 类型检查                             |
| `npm run format`        | 使用 Prettier 格式化代码                             |
| `npm run test`          | 运行类型检查并构建                                   |

## 部署

构建产物位于 `dist/` 目录，可直接部署到 Cloudflare Pages / Vercel / Netlify。

| 配置         | 值              |
| ------------ | --------------- |
| 构建命令     | `npm run build` |
| 输出目录     | `dist`          |
| Node.js 版本 | 18 或更高       |

> `getphotos` 脚本在构建时需要 `git`，主流 CI 环境默认均已提供。

## 自定义

### 修改画廊标题

编辑 `src/views/HomeView.vue` 中的 `<h1>` 标签：

```vue
<h1 class="hubname">你的 Hub 名称</h1>
```

### 使用镜像拉取图片

如果 CI 环境无法直连 GitHub，可修改 `getphotos` 脚本使用镜像：

```json
"getphotos": "shx rm -rf temp_repo public/imgs && (git clone --depth 1 https://gh-proxy.org/https://github.com/YOUR-USERNAME/YOUR-HUB-REPO temp_repo && shx mkdir -p public/imgs && shx cp -r temp_repo/images/* public/imgs/ && shx rm -rf temp_repo) || shx mkdir -p public/imgs"
```
