# SoybeanJS 三大生态包商业化调研报告

> **调研目的**：为 `@soybeanjs/editor`（富文本/块编辑器）、`@soybeanjs/table`（高级数据表格）、`@soybeanjs/form`（Schema 驱动表单）三个外围生态包寻找可落地的商业变现方向。
> **调研日期**：2026-08-14（本地时区 Asia/Shanghai）。所有价格/许可信息基于 2025–2026 年公开资料核实，**价格可能随时变动**，下文对每条事实均标注来源与「已核实/待核实」状态。
> **方法**：以 WebSearch + WebFetch 抓取一手来源（官方定价页、许可页、公司官网、GitHub 官方仓库）；二手来源（第三方对比文、行业综述）仅作佐证并明确标注。

---

## 1. 调研范围与结论摘要

### 1.1 结论摘要（TL;DR）

1. **「免费核心 + 付费高级能力」是最被验证的组件库商业模式**：AG Grid（社区 MIT / 企业版 $999 每开发者）、Handsontable（非商业免费 / 商业 $999）、Tiptap（编辑器 MIT / Cloud $49–$999 月）三个最接近 SoybeanUI 定位的先例全部采用此模型，且**「收费的恰恰是那些难做、可量化、面向企业级场景的高级功能」**——协同、文档转换、服务端渲染、AI、导出。
2. **三个生态中，editor 的变现路径最清晰**（直接对标 Tiptap Cloud / Pro 扩展），**table 的变现天花板最高**（对标 AG Grid，$999/开发者、对 Fortune 500 渗透），**form 的差异化机会在「托管表单设计器 SaaS + 低代码联动」**（对标 Jotform/Retool 与 Formily Designable）。
3. **商业化必须与「开源免费边界」严格切割**：SoybeanUI 核心（headless/ui/theme）保持 MIT；外围包的**基础能力保持 MIT**，**付费能力放入独立包/独立子路径**（如 `*-pro` 或 `*/pro` 子路径），用 license key 本地校验（参考 Handsontable/Zeta 先例），不破坏开源信任。
4. **中国背景 = 差异化机会也是约束**：中国政企市场（私有化部署、信创、等保、发票合规、source escrow）是国外商业组件库服务不到/服务不好的空白；同时中国市场对「开源免费」的支付意愿低于欧美，需要**本地化定价（人民币）+ 企业服务**补足（参考 Univer 与 Element Plus 赞助模式）。
5. **「赞助 + 生态位」只能作为起步收入**：Element Plus / Naive UI / TanStack 的赞助收入规模有限（Element Plus GitHub Sponsors 当前仅 3 个 sponsor 在档），TanStack 依赖企业合作赞助；真正的可持续收入必须来自企业付费产品/服务，而不是捐赠。
6. **AI 是 2025–2026 年所有先例都在追加的付费点**：AG Grid 新出 AI Toolkit/MCP Server（企业版内）、Tiptap 的 AI Toolkit 为 add-on、Retool 卖 AI credits、Jotform 卖 AI Agent——SoybeanUI 可复用既有 `@soybeanjs/ui-x` 的流式 AI 能力，把「AI 功能订阅」作为横切付费项。
7. **风险预警**：头部先例（Tiptap）已在 2025-06 移除免费云计划并持续抬高付费墙（二手来源）；组件库赛道同质化严重，免费替代品（Lexical/BlockNote 等）众多；付费产品一旦上线，维护承诺（SLA、安全补丁、source escrow）会显著抬高运营成本，**需要先验证需求信号再投入**。

### 1.2 先例商业模式汇总表

| 先例                    | 免费层                                               | 付费层                                                                                          | 关键计价单位                    | 核心付费点                                           | 来源                                                                                                                                                   |
| :---------------------- | :--------------------------------------------------- | :---------------------------------------------------------------------------------------------- | :------------------------------ | :--------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| AG Grid                 | 社区版（MIT）                                        | Enterprise 从 $999/开发者；Enterprise Bundle $1,498                                             | 开发者数 + 单/多应用 + 部署许可 | 分组/透视/服务端行模型/图表/AI/导出                  | [官方定价页](https://www.ag-grid.com/license-pricing/)                                                                                                 |
| Tiptap                  | 编辑器 MIT + 8 个原 Pro 扩展开源                     | Start $49 / Team $149 / Business $999（月付年缴）                                               | Cloud 文档数 + 开发者席位数     | 协作、文档历史、转换、AI、官方 UI 组件               | [官方定价页](https://tiptap.dev/pricing)                                                                                                               |
| Handsontable            | Hobby（非商业）免费                                  | Standard $999 / Priority $1,299 / Enterprise                                                    | 开发者数（可转让）+ 支持等级    | 全部高级功能 + 支持/维护/SLA                         | [官方购买页](https://dev.handsontable.com/pricing)                                                                                                     |
| Syncfusion              | Community License（收入<$1M 且 ≤5 开发者）           | JS 套件 $995/开发者·年；Essential Studio $2,495/开发者·年；Project License $495/月              | 开发者数 或 项目团队            | 1,600+ 控件、季度更新、24/5 支持                     | [官网](https://www.syncfusion.com/jquery-ui-widgets)、[EULA](https://www.syncfusion.com/license/studio/20.1.0.47/syncfusion_essential_studio_eula.pdf) |
| DevExpress / DevExtreme | 无（仅试用 30 天；开源项目可申请免费授权）           | Universal $2,299.99；DXperience $1,699.99；ASP.NET+Blazor(含 DevExtreme) $1,099.99              | 开发者数（多买打折 5%–15%）     | 全套件 + 年度更新 + 支持                             | [官网](https://www.devexpress.com/products/net/controls/asp/)                                                                                          |
| Kendo UI (Progress)     | 无                                                   | Kendo UI $999；DevCraft UI $1,299 / Complete $1,499 / Ultimate $2,199（每开发者，royalty-free） | 开发者数                        | 全套件 + 优先支持                                    | [TrustRadius（二手）](https://www.trustradius.com/compare-products/kendo-ui-vs-trigger-dev)                                                            |
| Formily / Designable    | 全 MIT                                               | 无直接收费（阿里内部工具 + 生态资产）                                                           | —                               | 以 OSS 换取生态位，变现靠围绕它的企业服务/低代码平台 | [GitHub](https://github.com/alibaba/formily)                                                                                                           |
| shadcn/ui 生态          | 全 MIT（registry 复制源码）                          | 第三方付费：Figma 套件、blocks、模板、私有 registry                                             | 一次性或订阅                    | 组件源码之外的设计资产与服务                         | [分析](https://www.shadcndesign.com/blog/is-shadcn-ui-free)、[Zeta](https://github.com/rbadillap/zeta/)                                                |
| TanStack                | 全免费（"forever free"）                             | 无付费产品                                                                                      | —                               | 赞助 + 企业合作（Cloudflare/Netlify/Webflow 赞助）   | [官方](https://tanstack.com/ads)、[Cloudflare](https://blog.cloudflare.com/cloudflare-astro-tanstack/)                                                 |
| Element Plus / Naive UI | MIT                                                  | 无                                                                                              | —                               | 赞助商位（白金/金牌）+ GitHub Sponsors               | [官网](https://element-plus.org/zh-CN/)、[Ant Design 赞助页](https://ant-design.antgroup.com/docs/react/sponsor-cn)                                    |
| Keenthemes / Metronic   | 无（模板不是开源）                                   | Solo $99 / Team $299 一次性；ThemeForest Standard / All-in 等许可                               | 项目数 / 开发者数（一次性）     | 后台管理模板 + 免费更新 + 6 个月支持                 | [官网](https://keenthemes.com/products/metronic-composer)                                                                                              |
| Jotform（表单 SaaS）    | Starter 免费（5 表单/100 提交/月）                   | Bronze $34 / Silver $39 / Gold $99（月付年缴）                                                  | 表单数 + 提交数 + 存储          | 托管表单、支付、电子签名、HIPAA                      | [官网定价](https://www.jotform.com/pricing/)                                                                                                           |
| Retool（低代码）        | Free                                                 | Team $12/构建者/月 + $7/内部用户；Business $65 + $18；外部用户 $10→$5                           | 构建者数 + 用户数 + AI credits  | 托管 App 构建 + 工作流 + AI                          | [官网定价](https://retool.com/pricing)                                                                                                                 |
| Univer / Luckysheet     | Luckysheet MIT（已归档）；Univer Apache-2.0 基础功能 | Univer 非 OSS 功能（透视、协同）付费升级                                                        | 按功能分版                      | 高级表格能力（中国 OSS 商业化代表）                  | [GitHub](https://github.com/dream-num/Luckysheet/)、[二手综述](https://www.aipuzi.cn/ai-news/univer.html)                                              |

> 注：表中「已核实」指直接来自官方页面；标注「二手」的条目来自第三方聚合站，仅作参考，价格可能有滞后。

---

## 2. 商业模式先例分析

### 2.1 AG Grid — MIT 社区 + 商业 Enterprise（数据表格双轨制标杆）

**事实（已核实，官方页面 2026-08 抓取）**：

- **双版本**：`ag-grid-community` 为 MIT 免费；`ag-grid-enterprise` 为商业许可 [GitHub README](https://github.com/ag-grid/ag-grid)（注：搜索返回的是 fork，内容与官方一致）。
- **定价**：Enterprise 从 **$999/开发者**；Enterprise Bundle（AG Grid + AG Charts Enterprise）从 **$1,498/开发者** [官方定价页](https://www.ag-grid.com/license-pricing/)、[landing page](https://www.ag-grid.com/landing-pages/enterprise-data-grid/)。
- **许可维度**：按「开发者数」+「单应用 / 多应用」计价；构建客户可见/对外售卖的应用需**额外购买 Deployment License Add-on**；**项目上所有前端 JS 开发者都要持许可**（不只是直接写 grid 的人）；不允许把软件再包装成自定义组件对外分发 [许可配置页](https://www.ag-grid.com/ecommerce/)。
- **企业版 gating 的高级功能**：AI Toolkit + MCP Server、集成图表（Integrated Charts）、Sparklines、AG Charts Enterprise、Set Filter / Multi Filter / Advanced Filter、单元格范围选择与填充柄、公式（Formulas）、查找（Find）、单元格批注（Cell Notes）、行分组与聚合、透视（Pivoting）、Master/Detail、服务端行模型（Server-Side Row Model）、Excel 导出、右键上下文菜单 [官方对比表](https://www.ag-grid.com/landing-pages/enterprise-data-grid/)。
- **市场数据（官方自述）**：90% 的 Fortune 500 使用、每周 1M+ npm 下载、GitHub 13K+ stars [官方定价页](https://www.ag-grid.com/license-pricing/)。

**对 SoybeanUI 的启示**：

- 数据表格是**企业级采购意愿最高**的组件品类之一（Fortune 500 渗透），按开发者收费被市场验证多年。
- 「免费做基础（排序/过滤/分页/编辑），收费做高级（分组/透视/服务端/导出/AI）」是成熟可照搬的 gating 模板。
- **关键提醒**：AG Grid 许可条款明确禁止「把我们的软件包装成自定义 UI 组件再分发」——这意味着若我们基于第三方付费内核（如 AG Grid）做 `@soybeanjs/table` 并对外售卖，会有许可冲突；因此 table 必须**自建内核**（基于 STable 原语），而非套壳 AG Grid。

### 2.2 Tiptap — MIT 内核 + 付费 Cloud Platform（编辑器商业化的最直接对标）

**事实（已核实，官方页面 2026-08 抓取）**：

- **定位原话**："The Tiptap Editor is open source (MIT) and free. Only platform features and Cloud documents are priced." [官方 feature-comparison](https://tiptap.dev/feature-comparison)。
- **付费档位（月付/年缴 8 折）**：
  - Start **$49/月**（年缴 $588）：500 Cloud 文档、2 环境、2 开发者许可
  - Team **$149/月**（年缴 $1,788）：5,000 Cloud 文档、3 环境、5 开发者许可
  - Business **$999/月**（年缴 $11,988）：50,000 Cloud 文档、5 环境、10 开发者许可
  - Enterprise 定制（云或本地、自有 auth/存储/AI 模型、SLA、SOC 2）[官方定价页](https://tiptap.dev/pricing)、[feature-comparison](https://tiptap.dev/feature-comparison)
- **开发者许可 add-on**：从 $39/开发者/月起 [feature-comparison](https://tiptap.dev/feature-comparison)。
- **付费能力清单**：实时协作 + 评论 + 文档历史（需要 Cloud Documents）；Content AI / In-line AI；Conversion（DOCX/Markdown 导入、多格式导出、注释往返）；**官方 UI Components**；Tracked Changes（add-on）；AI Toolkit（联系销售）[官方定价页](https://tiptap.dev/pricing)、[editor.md 调研](../ecosystem/editor.md)。
- **计价核心 = Cloud 文档数**：只有存在 Tiptap 平台的文档才计入配额，「文档存在自己数据库不计入」[官方 FAQ](https://tiptap.dev/docs/pricing)。
- **Pro 扩展需订阅**：`@tiptap-pro/extension-*`（AI、FileHandler、NodeRange、UniqueID 等）需有效付费订阅；AI/Pro 扩展「需要订阅验证，但可不依赖 Cloud 文档运行」[二手综述](https://eddyter.com/blogs/tiptap-alternative)、[foresightiq 情报](https://www.foresightiq.co/competitive-landscape/tiptap)。
- **历史变化（二手）**：免费 Cloud 计划于 2025-06 移除，仅剩 30 天试用 [二手综述](https://eddyter.com/blogs/tiptap-vs-quill-2026)；2024 年营收约 $2.3M、团队规模小（二手情报，置信度标记 UNCERTAIN）[inkeep 证据文档](https://github.com/inkeep/open-knowledge-legacy/blob/bffda4d6c330c65b84f7b732520ea077b428b4b8/reports/tiptap-2026-direction-overlap/evidence/d1-product-business.md)。

**对 SoybeanUI 的启示**：

- Tiptap 证明**「MIT 编辑器 + 收费的托管协同/转换/AI/官方 UI」能同时成立**——且 2025-06 把 8 个原 Pro 扩展转 MIT 后，UI 层（正是我们要自建的部分）成为官方唯一保留的付费 UI 资产，这给了我们**自建 Vue3 + UnoCSS UI 层的市场空间**（详见 `docs/ecosystem/editor.md` §1.1）。
- 计价上「文档数/连接数」适合托管服务；「开发者席位 add-on」适合工具型订阅。
- **风险警示**：Tiptap 正不断把曾经免费的 Pro 功能转为付费，且官方 UI Components 与我们正面竞争——必须差异化（Vue3/UnoCSS/中文文档/免费 AI 集成路径）。

### 2.3 Syncfusion / Kendo UI / DevExtreme — 商业组件库订阅制

**事实（已核实 / 部分二手）**：

- **Syncfusion**（已核实）：
  - JavaScript 套件（155+ 控件）**$995/开发者·首年**；Developer Platform / Essential Studio（1,600+ 控件）**$2,495/开发者·首年**；另有 **Project License $495/月**（覆盖整个项目团队，最多 5 开发者，年度折扣）[官网](https://www.syncfusion.com/jquery-ui-widgets)、[Project License datasheet PDF](https://syncfusion.info/wp-content/uploads/2026/01/Project-License-Datasheet-Limited-plan-FINAL.pdf)。
  - **Community License 免费**：年收入 < $1M 且 ≤ 5 开发者 [EULA](https://www.syncfusion.com/license/studio/20.1.0.47/syncfusion_essential_studio_eula.pdf)。
  - **纯订阅制**：不续费则需从系统移除产品（强制续费机制）；所有「接触/依赖产品」的开发者都必须持证、许可不可共享 [datasheet](https://syncfusion.info/wp-content/uploads/2026/01/Project-License-Datasheet-Limited-plan-FINAL.pdf)。
  - 每年 4 次大版本更新 + 24/5 支持 [datasheet](https://syncfusion.info/wp-content/uploads/2026/01/Project-License-Datasheet-Limited-plan-FINAL.pdf)。
- **DevExpress / DevExtreme**（已核实）：
  - Universal **$2,299.99**、DXperience **$1,699.99**、ASP.NET and Blazor（**含 DevExtreme**）**$1,099.99**，均为每开发者首年价；续费价显著更低（如 Universal 续费 $1,149.99，2025-07-11 生效）[WinForms 页](https://www.devexpress.com/products/net/controls/winforms/)、[ASP.NET 页](https://www.devexpress.com/products/net/controls/asp/)。
  - 多开发者折扣：2–5 张 5%、6–10 张 10%、11+ 张 15% [ASP.NET 页](https://www.devexpress.com/products/net/controls/asp/)。
  - 60 天无条件退款保证；每位开发者须单独购证 [ASP.NET 页](https://www.devexpress.com/products/net/controls/asp/)。
  - 开源项目（MIT/Apache）可申请免费授权（二手转述，未在本轮直接核实）[二手](https://wenku.csdn.net/answer/55zpz5wt0c)。
- **Kendo UI（Progress）**（二手，TrustRadius 聚合）：Kendo UI with Priority Support **$999/开发者（royalty-free）**；DevCraft UI $1,299 / Complete $1,499 / Ultimate $2,199 [TrustRadius](https://www.trustradius.com/compare-products/kendo-ui-vs-trigger-dev)。

**为什么团队愿意付费（归纳）**：一次性买到「大量成熟控件 + 年度更新 + 官方支持 + 合规（EULA/发票）」，省下自研数月的成本；「每个开发者都要持证 + 纯订阅 + 强制续费」保证了可持续收入。

**对 SoybeanUI 的启示**：纯商业套件模式收入天花板高但社区信任成本高（无免费层）；SoybeanUI 应走「有免费层的混合模式」，但在企业客户侧可借鉴 Syncfusion 的「项目级订阅（覆盖整个团队）」与 DevExpress 的「多开发者阶梯折扣」。

### 2.4 Handsontable — 非商业免费 + 商业订阅（license key 校验范本）

**事实（已核实）**：

- **两许可**：非商业（Hobby）许可免费，限个人/探索/非商业用途；商业许可按开发者购买（可转让）[购买页](https://dev.handsontable.com/pricing)、[文档 software-license](https://handsontable.com/docs/15.0/javascript-data-grid/software-license)。
- **定价**：Standard **$999/开发者**；Priority **$1,299/开发者**；Enterprise 定制 [购买页](https://dev.handsontable.com/pricing)。
- **付费差异 = 支持/维护等级，而非功能 gating**（与 AG Grid 相反）：Standard 每月 2 个支持请求、Priority 5 个、Enterprise 无限 + 专属 CSM + 可选 source code escrow + 安全补丁 + SLA [购买页](https://dev.handsontable.com/pricing)。
- **license key 机制**：客户端传入 licenseKey 字符串，本地校验（比较 build date 与 key creation date，**不联网**）；缺失/过期会显示水印与 console 警告；非商业用固定 key `'non-commercial-and-evaluation'` [文档](https://handsontable.com/docs/15.1/react-data-grid/license-key)。
- **历史**：2018-12-19 的 6.2.2 是最后一个 MIT 版本，之后转为专有双许可 [文档](https://handsontable.com/docs/15.0/javascript-data-grid/software-license)。
- **支持计划细节**：支持版本范围（Standard/Priority 12 个月、Enterprise 24 个月）、代码评审小时数（2h/5h 每年）、转卖商网络 [购买页](https://dev.handsontable.com/pricing)。

**对 SoybeanUI 的启示**：

- **「免费功能 + 付费支持」也是一种可行模型**，且实现成本最低（不 gate 功能，只 gate 支持）。
- **license key 本地校验（不联网）**是实现付费功能的低成本、隐私友好、离线可用的机制——非常适合开源项目做 Pro 门控，SoybeanUI 可参考（配合 sbean registry 分发）。
- 警示：从 MIT 转为专有的先例（Handsontable、部分 Tiptap Pro 扩展）会引发社区反弹，SoybeanUI 若要做 Pro，应在**立项时就明确免费/付费边界**，避免「事后收窄」。

### 2.5 Formily / form-create / Formily Designable — 阿里系 OSS 表单生态

**事实（已核实 / 部分二手）**：

- **Formily** 是阿里巴巴开源的跨端表单解决方案，MIT 许可 [GitHub](https://github.com/alibaba/formily)。分层：`@formily/core`（状态/校验/联动内核）→ `@formily/react` / `@formily/vue`（框架适配）→ `@formily/antd`、`@formily/element-plus`、`@formily/next`、`@formily/vant` 等（UI 适配）[综述](https://jishuzhan.net/article/1903766617417396226)。
- **Designable** 是可视化表单设计器引擎（`@designable/core` / `@designable/react` / `@designable/formily-antd`），模块化可替换、无硬编码插槽 [综述](https://jishuzhan.net/article/1903766617417396226)。
- 社区衍生包 `@formily-design/formily-designer` 提供开箱即用的 React 表单设计器组件（拖拽 + Schema 编辑 + 预览三视图）[npm](https://www.npmjs.com/package/@formily-design/formily-designer)。
- **Monetization 观察（推断 + 二手）**：Formily 本身**无直接收费**——它是阿里「低代码/中后台体系」的生态资产，价值在内部复用与对外品牌，变现落在**基于它的企业服务、低代码平台（如钉钉宜搭类产品）与咨询**上。这是「大厂 OSS = 生态飞轮，而非收入中心」的典型形态。

**对 SoybeanUI 的启示**：

- **表单 Schema 本身几乎无法直接收费**（MIT 竞争激烈：Formily、React Hook Form、VueUse form 生态皆免费）——价值在**设计器体验、渲染能力、联动复杂度、与后台/工作流集成**。
- 中国低代码/表单市场巨大（Jotform 类产品本地化弱），**「开源 Formily 式内核 + 商业化托管表单设计器 SaaS」**是已验证的组合（详见 §3.3）。
- 复用 Formily 生态经验：UI 适配层多、协议标准（JSON Schema 扩展）是生态护城河；SoybeanUI 的 `@soybeanjs/form` 应以标准 Schema + 强类型为核心卖点。

### 2.6 shadcn/ui registry / Radix UI / TanStack — headless 开源生态

**事实（已核实 / 部分二手）**：

- **shadcn/ui**：MIT，免费商用、无 Pro 档位、无席位限制；通过 CLI 把源码复制进你的仓库（`npx shadcn@latest add button`），用户「拥有代码」；作者现在 Vercel 工作、由 Vercel 赞助开发 [二手分析](https://www.shadcndesign.com/blog/is-shadcn-ui-free)。
- **围绕 shadcn 长出的付费生态（第三方）**：Figma 套件、premium blocks、模板、设计系统工具——都是**第三方**（非项目本体）在收费 [同上](https://www.shadcndesign.com/blog/is-shadcn-ui-free)。
- **registry 商业模式雏形**：`Zeta`（开源私有/高级组件 registry）集成 **Polar.sh 做 license key 管理与校验**——即「registry 分发 + 付费条目 + 自动发 key」的基础设施已存在 [GitHub](https://github.com/rbadillap/zeta/)；Kibo UI（约 41 组件 + 1,000+ blocks，MIT，2025-10 被 Shadcnblocks 收购）证明「高级组件 registry」本身有商业价值 [二手](https://designrevision.com/alternatives/kibo-ui)。
- **TanStack**：明确「forever free、无 VC、无付费产品」；收入 = 企业合作赞助 + GitHub Sponsors + 直接企业协作；2025-10 Cloudflare/Netlify/Webflow 联合赞助（Netlify 赞助 TanStack）[官方](https://tanstack.com/ads)、[ethos](https://tanstack.com/ethos)、[Cloudflare 公告](https://blog.cloudflare.com/cloudflare-astro-tanstack/)。
- **Radix UI**：MIT 开源（WorkOS 团队维护），本身不收费（本调研未直接核实其财务结构，列为一般性观察）。

**对 SoybeanUI 的启示**：

- **registry = 分发与商业化的天然载体**：SoybeanUI 已有 `sbean` registry 且已命名空间化（见 `docs/ecosystem.md` §6），可扩展为「免费条目 + 付费条目（license key 校验）」两级 registry——这是 shadcn 生态（Zeta/Polar）已验证、但国内尚无玩家做到位的位点。
- 「免费做基础组件/源码，收费做设计资产/模板/高级 registry 内容」对 headless-first 项目尤其顺滑——因为用户已习惯「源码进仓库」，付费点自然落在「更高级的源码包与配套服务」。
- 纯赞助（TanStack 路线）只适合极少数头部项目，不适合作为 SoybeanUI 的长期收入支柱。

### 2.7 Element Plus / Ant Design Pro / Naive UI — 免费 Vue 生态的资金来源

**事实（已核实）**：

- **Element Plus**：MIT 免费；首页设**白金赞助商**（JNPF 低代码、CRMEB 开源商城）与**金牌赞助商**（Fantastic-admin、UnAIMyText、bit.dev）[官网](https://element-plus.org/zh-CN/)；GitHub Sponsors 当前 3 位 sponsor 在档、目标 10 位/月（收入规模很小）[GitHub Sponsors](https://github.com/sponsors/element-plus)。
- **Ant Design**：MIT 永久免费；通过 **OpenCollective + GitHub Sponsors + IssueHunt** 接受赞助，主张「社区与赞助支持长期可持续发展」[官方赞助页](https://ant-design.antgroup.com/docs/react/sponsor-cn)。
- **Naive UI**：MIT；核心维护者（如 Talljack）开放 GitHub Sponsors（档位 $5–$256/月，含优先修 bug、1:1 咨询）[GitHub Sponsors](https://github.com/sponsors/Talljack)。
- **免费 Vue 后台模板**（vue-element-admin、Naive Ui Admin、SoybeanAdmin、vue-vben-admin 等）均为 MIT 免费商用 [二手清单](https://blog.csdn.net/weixin_33087827/article/details/148572788)。

**归纳**：头部免费 Vue 生态的资金来源 = **大厂赞助/雇工（Ant/Element 背后是蚂蚁与社区）+ 赞助商位 + 个人 Sponsors**，规模普遍不大；「模板类」生态靠免费引流、不直接收费。

**对 SoybeanUI 的启示**：

- 赞助只能作为「品牌与运营收入的补充」，不能作为商业计划的支柱。
- 但**赞助商位**对国内 SaaS/低代码厂商有真实投放价值（Element Plus 的 JNPF/CRMEB 即为明证）——可作为早期收入与生态联动。
- 免费的「中后台模板 + 生态包」可大量引流（SoybeanAdmin 已是国内知名模板），引流后的转化点应在「企业服务 / Pro 能力 / 模板市场」而非赞助。

### 2.8 Keenthemes / 管理后台模板市场（ThemeForest 风格）

**事实（已核实）**：

- **Metronic Composer**：Solo Developer License **$99**（1 开发者、无限项目、终身访问、免费更新、6 个月 48/5 支持）；Team License **$299**（≤15 开发者）；另有 All-Access 打包 [官方](https://keenthemes.com/products/metronic-composer)。
- **许可分层**：ThemeForest Standard（单项目）、Keenthemes **All-in License**（无限终端产品含 SaaS、可转移给客户、不可开源）、Getbootstrap 系（Standard/Multisite/Extended）[同上](https://keenthemes.com/products/metronic-composer)。
- 一次买断、无订阅、30 天退款保证；卖的是**完整源码** [同上](https://keenthemes.com/products/metronic-composer)。

**对 SoybeanUI 的启示**：

- 模板市场是「一次性收入 + 大量长尾客户」的成熟形态；SoybeanUI 的 `@soybeanjs/admin` 生态（SAppLayout 等）天然可产出「基于 SoybeanUI 的中后台壳模板」售卖给想快速起盘的中小团队。
- 定价参考：单项目 $19–$99、全许可 $99–$299（一次性）——**远低于组件库订阅**，但适合作为生态包的冷启动收入与品牌曝光。
- 注意：模板市场客户对「开源免费」高度敏感，SoybeanUI 的免费核心 + 付费模板/壳产品是可行组合（很多用户愿为「开箱即用的完整壳 + 免费更新」买单）。

### 2.9 开发者工具商业模式（hosted SaaS / per-seat / design-to-code / AI builder）

**事实（已核实）**：

- **Hosted 表单 SaaS**：Jotform（2006 年创立，宣称 15M–35M 用户）免费 Starter（5 表单/100 提交/月），付费 Bronze **$34** / Silver **$39** / Gold **$99**（月付年缴），Enterprise 定制；按**表单数 + 提交数 + 存储**计费；Gold 起支持 HIPAA；另有 AI Agent 功能与 20,000+ 模板 [官网定价](https://www.jotform.com/pricing/)、[二手评测](https://formester.com/blog/jotform-review/)。
- **低代码平台**：Retool Free → Team **$12/构建者/月 + $7/内部用户/月** → Business $65 + $18 → Enterprise 定制；外部用户按量 $10→$5/月；**AI credits** 作为叠加计费单元 [官网定价](https://retool.com/pricing)。
- **design-to-code / AI builder**：Figma 官方 MCP 正在吞并独立 design-to-code 插件的市场（第三方图库作者观点）；付费 kits 主打「design-to-code 插件、主题适配、pro blocks、视频教程」[Obra 分析](https://shadcn.obra.studio/blog/our-business-model-a-few-words-about-other-shadcn-ui-kits)。

**对 SoybeanUI 的启示**：

- **per-seat（IDE/构建者席位）与 usage（提交数/文档数/credits）是开发者工具的两种成熟计费**；SoybeanUI 的付费产品可混合使用（Pro 席位 + 用量额度）。
- **hosted SaaS 是「组件库知识资产」的第二变现曲线**：组件免费引流 → 托管服务（表单托管、表格数据托管、编辑器协同）按用量收费——这正是 Jotform/Retool/Tiptap Cloud 的路径，且与开源免费边界不冲突（卖的是托管与运维，不是代码）。
- AI builder / design-to-code 是当前增量热点，但竞争激烈（Figma MCP、Vercel v0 等），SoybeanUI 应把 AI 作为**付费附加能力**而非主卖点。

### 2.10 补充案例：Univer（中国 OSS 商业化）与 Novel（Tiptap 之上的编辑器）

- **Univer / Luckysheet**（中国 OSS 商业化代表，二手 + GitHub）：Luckysheet（dream-num，MIT）已进入维护期/归档，团队转向商业化更强的 Univer；Univer 以 **Apache-2.0** 开放基础办公能力，**数据透视、协同编辑等高级能力放入非 OSS 版本付费升级** [GitHub](https://github.com/dream-num/Luckysheet/)、[二手综述](https://www.aipuzi.cn/ai-news/univer.html)。→ 启示：中国团队完全可以在「宽松开源（Apache-2.0/MIT）+ 高级功能闭源收费」上走通，Univer 是直接同乡先例。
- **Novel**（shadcn + Tiptap 的 Notion 风格编辑器）：Apache-2.0（一说是 MIT），Next.js + Tiptap + OpenAI + Vercel AI SDK，AI 用 BYOK（自带 OpenAI key）[二手对比](https://eddyter.com/blogs/tiptap-alternative)、[二手解析](https://blog.csdn.net/gitblog_01265/article/details/143036210)。→ 启示：编辑器 UI 层开源免费 + AI 带 key（BYOK）可做「免后端成本」的免费方案；Novel 本身未跑出独立商业模式，说明**纯开源编辑器 UI 层较难直接收费，价值要靠托管/AI/企业服务**。

---

## 3. 分生态商业化方向

> 每个方向给出：方向名 / 目标客户 / 价值主张 / 定价模式建议 / 与开源免费边界的关系 / 风险。
> 免费边界总原则：**核心与基础能力永久 MIT**；付费 = 高级能力（Pro 包）、托管服务、企业服务、模板资产、AI 用量。全部方向均为**建议**，需结合需求信号（GitHub issue/讨论、企业询单）验证。

### 3.1 `@soybeanjs/editor` — 富文本/块编辑器

**方向 E1：Editor Pro 高级能力模块订阅（对标 Tiptap Pro 扩展）**

- 目标客户：SaaS 产品中要嵌入富文本/文档编辑的中型及以上团队（知识库、CMS、协作工具、HR/法务文书）。
- 价值主张：基础编辑器免费 MIT（对标 Tiptap MIT 内核）；Pro 提供「协作（Y.js/Hocuspocus 托管或自托管方案）、DOCX/PDF 转换、修订跟踪、目录/数学/拖拽增强」等难做能力，一次集成。
- 定价建议：类 Tiptap Pro 扩展按**订阅**（如 $49/$149/$999 三档，按开发者席位或项目数），或一次性 per-project（$500–$5,000）；参考 Tiptap [官方定价](https://tiptap.dev/pricing) 与 AG Grid 开发者计价 [官方定价页](https://www.ag-grid.com/license-pricing/)。
- 免费边界：SEditor/SEditorToolbar/SEditorBubbleMenu/图片上传/Markdown 双向等 P0–P1 能力保持 MIT（见 `docs/ecosystem/editor.md` §2.4）；Pro = 协同、转换、修订跟踪、AI 等 P2+ 能力。
- 风险：Tiptap 官方已把同类能力定价且 2025-06 起收紧（免费云计划移除，二手）[二手](https://eddyter.com/blogs/tiptap-vs-quill-2026)；用户可能直接用 Tiptap Cloud 而不买我们——需以「Vue3 + UnoCSS + 中文 + 免费 UI 层」差异化。

**方向 E2：Editor Cloud 托管协作服务（对标 Tiptap Cloud）**

- 目标客户：不想自建协同后端的开发者/SaaS 团队。
- 价值主张：Y.js + Hocuspocus 托管协同、文档存储、历史版本、评论通知、Webhook——按需付费，开发者免运维。
- 定价建议：按「Cloud 文档数 + 连接数 + 开发者席位」订阅（参考 Tiptap Start $49 → Business $999/月 [官方](https://tiptap.dev/pricing)；也可按 MAU 文档量计费）。
- 免费边界：本地单机编辑器免费；**只有托管文档/协同连接计入配额**（复制 Tiptap「本地文档不计入」规则 [FAQ](https://tiptap.dev/docs/pricing)）。
- 风险：需要运营云基础设施（SLA、数据驻留、合规），成本高；与 Tiptap/Hocuspocus 官方竞争激烈；**建议先做企业自托管版（on-prem）再上云**，规避合规与带宽成本。

**方向 E3：AI 写作/编辑功能订阅（对接 `@soybeanjs/ui-x` 流式能力）**

- 目标客户：内容密集型产品（文档、博客、客服、法务）团队。
- 价值主张：AI 续写/改写/翻译/摘要/校对，走免费集成点（slash 命令 + 流式渲染，复用 ui-x 的 SxSender/use-x-stream），BYOK（自带 key）免费档 + 托管 AI 档。
- 定价建议：BYOK 免费（参考 Novel [二手](https://eddyter.com/blogs/tiptap-alternative)）；托管 AI 按 **credits/月**（参考 Retool AI credits [官网](https://retool.com/pricing)），如 $19/$49/$199/月；AI Toolkit 级能力（面向 Agent 的文档读写）联系销售（参考 Tiptap add-on [官方](https://tiptap.dev/pricing)）。
- 免费边界：AI 交互组件（菜单、流式渲染、命令面板）MIT；**AI 模型调用与用量计费**为付费。
- 风险：AI 成本 pass-through 难定价（需防滥用）；OpenAI/各家 SDK 与 v0 类工具降价竞争；合规（内容安全、个保法）在中国市场是硬要求。

**方向 E4：企业定制集成 + 专业支持服务**

- 目标客户：政企、知识库/CMS 厂商、需要深度定制（自定义块、业务 schema、私有化）的团队。
- 价值主张：实施、定制扩展开发、a11y/性能优化、培训、SLA 响应、私有化部署支持——按项目 + 年维护。
- 定价建议：实施项目一次性 $5k–$50k（参考第三方「Tiptap 定制 UI build $20,000、维护 $2,400/年」的二手报价 [二手](https://eddyter.com/blogs/tiptap-vs-quill-2026)）；年维护合同 = 首年费用 20%–30%（参考 DevExpress 续费率形态 [官网](https://www.devexpress.com/products/net/controls/winforms/)）。
- 免费边界：全部编辑器组件 MIT；**服务与定制产物**付费。
- 风险：人力密集型、规模化难；需建立可复用的定制模板/预设库来摊薄成本。

**方向 E5：行业模板/预设市场（编辑器壳产品）**

- 目标客户：需要「开箱即用编辑器页面」的中小团队、模板买家。
- 价值主张：简历编辑器、合同/文书编辑器、Markdown 文档、博客写作台、政务表单文书等**行业化预设 + 中文排版主题**，配 `SEditor` 一键嵌入。
- 定价建议：单模板 $19–$99、全量包 $199–$299（一次性，参考 Keenthemes Metronic $99–$299 [官方](https://keenthemes.com/products/metronic-composer)）。
- 免费边界：预设的通用 base（basic/docs/full preset）MIT；行业化模板/主题为付费资产（可走 sbean registry 付费条目，见 §4.3）。
- 风险：模板市场利润低、易被复制；需与免费开源模板竞争——靠「持续更新 + 与主题 token 深度集成」维持付费意愿。

### 3.2 `@soybeanjs/table` — 高级数据网格/Pro 表格

**方向 T1：Table Pro 高级功能模块（对标 AG Grid Enterprise gating）**

- 目标客户：数据密集型产品（金融、ERP、BI、运营中后台）与需要百万行渲染的团队。
- 价值主张：在 STable 原语之上提供**分组/聚合、树形、服务端行模型、虚拟滚动、透视、Excel 导出、单元格范围选择/公式**等企业级能力；免费版做基础排序/过滤/分页/编辑（对标 AG Grid Community）。
- 定价建议：**每开发者 $499–$999 + 部署许可**（参考 AG Grid Enterprise $999、Bundle $1,498 [官方定价页](https://www.ag-grid.com/license-pricing/)）；或按项目一次性 $1k–$5k。多开发者阶梯折扣（参考 DevExpress 5%/10%/15% [官网](https://www.devexpress.com/products/net/controls/asp/)）。
- 免费边界：STable + 基础表格能力 MIT；Pro = 分组/透视/服务端行模型/导出/AI 等。
- 风险：**自建内核成本极高**（虚拟滚动/服务端模型/透视是硬骨头，AG Grid 花了数年）；必须验证 STable 能否承载；若做不出 AG Grid 级性能，「Pro」定位会被免费替代品（TanStack Table、el-table-v2）击穿。建议 Pro 边界先从**较易的导出/树形/分组**切入，逐步加码。

**方向 T2：Table Cloud 托管数据服务**

- 目标客户：不想自建服务端分页/排序/过滤/实时推送的团队。
- 价值主张：托管的数据代理层（sort/filter/paginate/virtualization on server）、实时数据推送（WebSocket）、权限与审计——表格组件免费，云端数据服务付费。
- 定价建议：按 **QPS/月 或 行数/月 或 连接数** 订阅（参考 Retool 外部用户/用量计价 [官网](https://retool.com/pricing)）。
- 免费边界：组件 MIT；**数据服务与带宽/存储**付费。
- 风险：与后端无关性矛盾（表格是纯前端组件，托管数据服务需要强后端能力，超出组件库团队基因）；建议作为远期选项，优先做 on-prem 数据服务（企业内网）以契合政企。

**方向 T3：企业性能与定制服务（对标 Handsontable 付费支持）**

- 目标客户：已用免费版但有性能/合规诉求的政企客户。
- 价值主张：不 gate 功能、gate **支持与维护**：大表性能优化、定制渲染器、专属支持通道、代码评审、source escrow、SLA（参考 Handsontable Standard/Priority/Enterprise 支持分级 [官方](https://dev.handsontable.com/pricing)）。
- 定价建议：Standard $999/开发者·年 → Priority $1,299 → Enterprise 定制（含 SLAs、escrow、CSM）。
- 免费边界：全部功能 MIT；**支持/维护/安全补丁/escrow** 付费。
- 风险：中国团队对「为支持付费」接受度低（更愿为功能付费）；需绑定合规（等保、信创、私有化）来抬升付费价值。

**方向 T4：行业套件包（金融/供应链/BI 中后台预配置）**

- 目标客户：金融、供应链、政务、电商等有固定表格形态的行业团队。
- 价值主张：预配置列方案、行情/财务/权限等渲染器、行业字段字典、导出版式、主题——围绕 `STable` 的行业化「盒装表格」。
- 定价建议：行业包一次性 $999–$4,999 + 年维护（类 E5 模板逻辑，但单价更高）。
- 免费边界：通用表格能力 MIT；行业套件/渲染器资产付费（可走 registry 付费条目）。
- 风险：行业碎片化、需持续跟进法规/字段变化；先聚焦 1–2 个高付费行业（金融/政务）验证。

**方向 T5：AI 数据网格（对标 AG Grid AI Toolkit）**

- 目标客户：报表/BI 与运营分析团队。
- 价值主张：自然语言→查询/聚合、AI 洞察生成、异常标注、智能列建议、MCP Server 集成（参考 AG Grid AI Toolkit/MCP [官方](https://www.ag-grid.com/landing-pages/enterprise-data-grid/)）；复用 ui-x 流式能力。
- 定价建议：AI credits/月（参考 Retool [官网](https://retool.com/pricing)）或并入 Table Pro 高级档。
- 免费边界：AI 交互组件 MIT；模型调用与用量付费。
- 风险：AI 分析与数据安全在政企场景敏感（数据不出域）；大厂（Copilot/各家 BI）挤压。

### 3.3 `@soybeanjs/form` — Schema 驱动表单

**方向 F1：托管表单设计器 SaaS（对标 Jotform + Formily Designable）**

- 目标客户：需要「可视化设计 + 托管收集 + 通知/存储」但不想要重型低代码平台的团队与非技术运营。
- 价值主张：拖拽表单设计器（基于 `SForm` + Schema）→ 生成 JSON Schema → 前端用 `@soybeanjs/form` 渲染；托管提交存储、邮件/Webhook 通知、统计、电子签名对接；**开源内核免费，托管服务付费**（参考 Jotform 免费 5 表单/100 提交 → 付费 $34–$99/月 [官网](https://www.jotform.com/pricing/)）。
- 定价建议：按「表单数 + 提交数 + 存储」订阅：Free（5 表单/100 提交）→ $19/$49/$99/月（参考 Jotform Bronze/Silver/Gold 档）；Enterprise 定制（SSO/SLA/数据驻留）。
- 免费边界：`SForm`/`useForm`/Schema 渲染 100% MIT；设计器（若做成 Pro 能力）与**托管服务**付费。
- 风险：SaaS 运营重（存储/通知/合规/防滥用）；国内「表单 SaaS」已有玩家（问卷星、金数据等），差异化在**面向开发者/低代码集成**而非大众问卷。

**方向 F2：Form Pro 高级能力模块**

- 目标客户：复杂表单（多步、动态增删、条件联动、跨字段校验）的开发者。
- 价值主张：Pro = 复杂联动引擎增强、动态渲染优化、可视化校验规则构建器、自动生成代码/TS 类型、布局（FormGrid/分组折叠）——对标 Formily 的深度但以 **SoybeanUI 类型安全 + UnoCSS 主题** 差异化。
- 定价建议：订阅 $49–$299/月（按席位）或一次性 per-project（参考 AG Grid/Tiptap 形态 [官方](https://www.ag-grid.com/license-pricing/)、[官方](https://tiptap.dev/pricing)）。
- 免费边界：基础 Schema 渲染 + 常见组件映射 MIT；Pro = 联动/动态/设计器/代码生成。
- 风险：Formily（MIT）能力覆盖深、社区强，免费替代竞争激烈——需在**类型安全 + Vue3 一等公民 + 中文生态**上做深护城河。

**方向 F3：企业表单/低代码集成服务（BPM/后台联动）**

- 目标客户：政企、需要「表单 + 审批流 + 后台管理」一体的团队（`@soybeanjs/admin` 生态联动）。
- 价值主张：将 `SForm`/`useForm` 与后台壳（SAppLayout）、工作流引擎（审批流）集成，交付「业务表单应用」；含权限、审计、私有化部署。
- 定价建议：项目制 $10k–$100k + 年维护（类 E4）；或「表单+表格+后台」生态企业订阅（参考 Syncfusion Project License $495/月 [datasheet](https://syncfusion.info/wp-content/uploads/2026/01/Project-License-Datasheet-Limited-plan-FINAL.pdf)）。
- 免费边界：组件 MIT；**集成方案、工作流适配、私有化交付**付费。
- 风险：项目制重、交付周期长；需要样板工程（starter kit）降低重复成本。

**方向 F4：行业表单方案包（政务申报/金融 KYC/HR 入职/供应链）**

- 目标客户：有固定合规表单形态的行业团队。
- 价值主张：预置表单模板 + 校验规则 + 合规字段（个保法/等保/KYC）+ 中文场景化组件（身份证、银行、发票、地址联动）——开箱即用。
- 定价建议：行业包 $499–$2,999 一次性 + 年维护（模板市场形态）。
- 免费边界：通用表单能力 MIT；行业模板/校验库/合规组件付费。
- 风险：法规变动需持续维护；模板易被复制（registry 付费 + 授权条款可部分缓解）。

**方向 F5：AI 表单生成与智能校验（横切付费点）**

- 目标客户：希望「一句话建表 / 从数据库 Schema 自动出表单」的团队。
- 价值主张：自然语言/字段清单 → 生成 JSON Schema + 校验规则 + 联动；AI 校验规则补全、错误提示润色、自动填充组件选择——复用 ui-x 流式能力。
- 定价建议：AI credits/月 或并入 Pro 档（参考 Retool [官网](https://retool.com/pricing)、Jotform AI Agent [官网](https://www.jotform.com/pricing/)）。
- 免费边界：生成结果渲染 MIT；**模型调用与用量**付费。
- 风险：AI 生成 Schema 的可信度（需人工复核兜底）；与低代码大厂（钉钉宜搭等）竞争。

---

## 4. 横向建议（cross-cutting）

### 4.1 许可策略（面向中国背景的 OSS 项目）

- **核心保持 MIT / Apache-2.0**：`headless` / `ui` / `theme` / `ui-unocss` 维持宽松许可以最大化采用与信任（对齐 Ant Design「MIT 永久免费」[官方](https://ant-design.antgroup.com/docs/react/sponsor-cn) 与 shadcn [二手](https://www.shadcndesign.com/blog/is-shadcn-ui-free) 的先例）。**不建议 AGPL**——会劝退企业用户。
- **付费能力独立成包/子路径**：`editor-pro` / `table-pro` / `form-pro`（或同包 `*/pro` 子路径），与免费包同 lockstep 版本但**源码分离**（私有 registry 或遮蔽），避免把付费逻辑混入 MIT 包（混入会破坏「MIT = 干净」的品牌）。
- **license key 本地校验**（不联网）：参考 Handsontable 的 build-date vs key-date 本地校验 [文档](https://handsontable.com/docs/15.1/react-data-grid/license-key)，成本低、离线可用、隐私友好；配合 sbean registry 分发（§4.3）。
- **尽早明确边界，避免「事后收窄」**：Handsontable 从 MIT 转专有（2018）与 Tiptap 移除免费云档（2025-06，二手）都引发反弹 [官方](https://handsontable.com/docs/15.0/javascript-data-grid/software-license)、[二手](https://eddyter.com/blogs/tiptap-vs-quill-2026)。**建议从立项第一天就在 README/文档写明免费/付费边界**，并承诺已开源能力永久免费。
- **中国市场特化**：私有化部署、信创适配（麒麟/统信/国产化浏览器）、等保/个保法合规、发票/合同流程、source escrow（参考 Handsontable Enterprise escrow [官方](https://dev.handsontable.com/pricing)）——这些国外竞品服务不好，是本土差异化。

### 4.2 lockstep 版本与双轨发布

- 沿用现有 **lockstep 单版本 + 单 tag 全包发布**（`docs/ecosystem.md` §9）：免费包与付费包同版本号，`pnpm publish -r` 一次发布；付费包可用**独立 npm scope/tag（如 `next-pro`）或私有 registry**，避免误引。
- **CI 依赖审计**（延续 `docs/ecosystem/editor.md` §6 的 OPT-F1 思路）：免费包 CI 中强制检查依赖闭包不含付费能力/收费内核（如 `ag-grid-enterprise`、`@tiptap/pro-*`），防止「免费包误绑定付费能力」与许可风险（AG Grid 禁止包装再分发 [官方](https://www.ag-grid.com/ecommerce/)）。
- 付费包需要**双轨维护承诺**：免费包社区维护节奏；付费包 SLA（响应时效、安全补丁、支持窗口 12–24 个月，参考 Handsontable 支持政策 [官方](https://dev.handsontable.com/pricing)）。

### 4.3 sbean registry + 付费内容分发

- 现有 registry 已命名空间化（`ui/*`、`ui-x/*`、`admin/*`、`chart/*`，`docs/ecosystem.md` §6）。扩展两级模式：
  - **免费条目**：现有形态，`sbean add <ns>/<name>` 直接拉源码。
  - **付费条目**：`type: "registry:ui-paid"` + 元数据（price/license 类型/支持窗口），`sbean add` 时触发 license key 校验（本地校验，参考 Handsontable [文档](https://handsontable.com/docs/15.1/react-data-grid/license-key)）；可复用 Zeta + Polar 的「registry + 自动发 key」思路 [GitHub](https://github.com/rbadillap/zeta/)。
- **文档站付费内容区**：docs 命名空间下新增 Pro 徽章与对比页（免费 vs 付费 feature matrix，参考 AG Grid Community vs Enterprise 对比 [官方](https://www.ag-grid.com/landing-pages/enterprise-data-grid/)），公开透明地展示边界。
- **注意**：付费条目源码一旦进用户仓库，防拷贝极难（shadcn 模型下用户本就「拥有代码」）——所以付费点应放在**托管服务 / 支持 / AI 用量 / 持续更新承诺**，而不是单纯卖源码本身（源码资产可加授权条款但不指望防复制）。

### 4.4 企业服务运营

- **分三步走**：
  1. **阶段一（0→1）**：赞助 + 商位 + 模板市场（Metronic 式 $99–$299 一次性 [官方](https://keenthemes.com/products/metronic-composer)）+ 早期企业询单定制——验证付费信号。
  2. **阶段二（1→10）**：Pro 能力订阅（AG Grid/Tiptap 式每开发者/月或项目）+ license key；同步积累付费用户支持 SLA。
  3. **阶段三（10→100）**：托管服务（Editor Cloud / Table Cloud / 表单 SaaS）与 AI credits——复用 ui-x 能力，边际成本可控。
- **价格建议**：美元 + 人民币双轨（国内开发者对美元订阅敏感，人民币+发票合规是采购门槛）；提供「社区免费 / 小团队 Pro / 企业年订阅」三档（参考 Tiptap Start/Team/Business [官方](https://tiptap.dev/pricing)）。
- **支持与信任**：早期宁可「少承诺多交付」——SLA、escrow、私有化要从客户真正要求时才签（避免过重运维负担）。
- **生态联动**：editor/table/form 三个 Pro 可打包「生态企业订阅」（类似 Syncfusion Essential Studio 全家桶 $2,495 或 Project License $495/月 [官方](https://www.syncfusion.com/jquery-ui-widgets)），提高客单价与留存。

### 4.5 风险与合规提示

- **法律**：不要基于第三方商业内核（AG Grid Enterprise / Kendo / DevExtreme）做「再分发套壳」——AG Grid 条款明确禁止 [官方](https://www.ag-grid.com/ecommerce/)；`@soybeanjs/editor` 仅用 Tiptap MIT 部分、勿抄官方付费 UI 组件代码（`docs/ecosystem/editor.md` §2.4 已列硬约束）。
- **市场**：免费替代品（TanStack Table、el-table-v2、Formily、Lexical/BlockNote）免费且活跃——付费产品必须有**性能/类型安全/Vue3 一等公民/中文生态/合规**上的真实差距。
- **运营**：托管服务与 AI 用量的成本（存储、带宽、模型 token）会侵蚀利润——用「免费额度 + 用量上限」防滥用（参考 Jotform 提交上限 [官方](https://www.jotform.com/pricing/)）。
- **信任**：商业化宣传要透明（README 放「商业版与免费版」对比表），避免社区反噬；先开源后商业，商业收益反哺开源维护，形成正循环（TanStack ethos [官方](https://tanstack.com/ethos)）。

---

## 5. 参考来源

### 官方一手来源（定价/许可）

- AG Grid — 官方定价页：https://www.ag-grid.com/license-pricing/
- AG Grid — 许可配置（开发者数/部署许可/许可条款）：https://www.ag-grid.com/ecommerce/
- AG Grid — Enterprise landing（功能对比）：https://www.ag-grid.com/landing-pages/enterprise-data-grid/
- AG Grid — GitHub README（Community MIT / Enterprise 商业）：https://github.com/ag-grid/ag-grid
- Tiptap — 官方定价：https://tiptap.dev/pricing
- Tiptap — 功能对比（MIT 边界、开发席位 add-on、AI Toolkit）：https://tiptap.dev/feature-comparison
- Tiptap — 定价 FAQ（Cloud 文档计费口径）：https://tiptap.dev/docs/pricing
- Handsontable — 购买页（$999/$1299/支持分级/escrow）：https://dev.handsontable.com/pricing
- Handsontable — license key 文档（本地校验）：https://handsontable.com/docs/15.1/react-data-grid/license-key
- Handsontable — 软件许可（MIT→专有历史）：https://handsontable.com/docs/15.0/javascript-data-grid/software-license
- Syncfusion — JS 套件定价（$995/$2,495）：https://www.syncfusion.com/jquery-ui-widgets
- Syncfusion — Essential Studio EULA（Community License 条款）：https://www.syncfusion.com/license/studio/20.1.0.47/syncfusion_essential_studio_eula.pdf
- Syncfusion — Project License datasheet（$495/月、纯订阅）：https://syncfusion.info/wp-content/uploads/2026/01/Project-License-Datasheet-Limited-plan-FINAL.pdf
- DevExpress — WinForms 定价（Universal $2,299 等、续费价）：https://www.devexpress.com/products/net/controls/winforms/
- DevExpress — ASP.NET+Blazor 含 DevExtreme（$1,099、多开发者折扣）：https://www.devexpress.com/products/net/controls/asp/
- Keenthemes — Metronic Composer 定价与许可（Solo $99/Team $299）：https://keenthemes.com/products/metronic-composer
- Jotform — 官方定价：https://www.jotform.com/pricing/
- Retool — 官方定价（per-builder/用户/AI credits）：https://retool.com/pricing
- TanStack — Ads & Partnerships（赞助+合作模式）：https://tanstack.com/ads
- TanStack — Ethos：https://tanstack.com/ethos
- Cloudflare — 赞助 Astro 与 TanStack 公告：https://blog.cloudflare.com/cloudflare-astro-tanstack/
- Element Plus — 官网（白金/金牌赞助商位）：https://element-plus.org/zh-CN/
- Element Plus — GitHub Sponsors：https://github.com/sponsors/element-plus
- Ant Design — 官方赞助页（MIT + OpenCollective + GitHub Sponsors + IssueHunt）：https://ant-design.antgroup.com/docs/react/sponsor-cn
- Naive UI 维护者 — GitHub Sponsors（Talljack）：https://github.com/sponsors/Talljack
- alibaba/formily — GitHub（MIT）：https://github.com/alibaba/formily
- @formily-design/formily-designer — npm：https://www.npmjs.com/package/@formily-design/formily-designer
- dream-num/Luckysheet — GitHub（MIT，已归档）：https://github.com/dream-num/Luckysheet/
- Zeta — 安全 shadcn registry（Polar license key）：https://github.com/rbadillap/zeta/

### 二手来源（佐证/综述，价格可能滞后，仅作参考）

- DZone — 表格库许可综述（AG Grid/Handsontable）：https://dzone.com/articles/5-popular-standalone-javascript-spreadhsheet-libra
- TrustRadius — Kendo UI 定价对比：https://www.trustradius.com/compare-products/kendo-ui-vs-trigger-dev
- inkeep — Tiptap 产品与商业情报（2024 营收 $2.3M）：https://github.com/inkeep/open-knowledge-legacy/blob/bffda4d6c330c65b84f7b732520ea077b428b4b8/reports/tiptap-2026-direction-overlap/evidence/d1-product-business.md
- foresightiq — Tiptap 竞品情报（Pro 扩展收费、产品线）：https://www.foresightiq.co/competitive-landscape/tiptap
- eddyter — TipTap vs Quill 2026（免费云计划移除、AI Toolkit 价格估计）：https://eddyter.com/blogs/tiptap-vs-quill-2026
- eddyter — TipTap 替代品对比（Novel/BlockNote 许可）：https://eddyter.com/blogs/tiptap-alternative
- shadcndesign — shadcn/ui 是否免费（MIT + 生态收费）：https://www.shadcndesign.com/blog/is-shadcn-ui-free
- Obra — shadcn 生态商业模式观察（design-to-code/赞助）：https://shadcn.obra.studio/blog/our-business-model-a-few-words-about-other-shadcn-ui-kits
- designrevision — Kibo UI 与 shadcn registry 综述（registry 商业模式）：https://designrevision.com/alternatives/kibo-ui
- formester — Jotform 评测与定价：https://formester.com/blog/jotform-review/
- aipuzi — Univer 开源与商业化综述：https://www.aipuzi.cn/ai-news/univer.html
- 技术站 — Formily/Designable 综述：https://jishuzhan.net/article/1903766617417396226
- CSDN — 免费 Vue 后台模板清单：https://blog.csdn.net/weixin_33087827/article/details/148572788
- CSDN — DevExpress 付费/免费政策（开源授权）综述：https://wenku.csdn.net/answer/55zpz5wt0c
- CSDN — Novel 技术栈解析：https://blog.csdn.net/gitblog_01265/article/details/143036210

### 仓库内既有资料

- `docs/ecosystem.md` — SoybeanUI 生态架构与 sbean registry 命名空间方案
- `docs/ecosystem/editor.md` — `@soybeanjs/editor` 技术方案（含 Tiptap 收费边界调研）
- `docs/adr/0001-peripheral-package-layering.md` — 外围包分层模型 ADR
