# DDSBLink for NodeBB

将帖子中的外部链接替换为 DD.SB 短链接

# 开始

1. 克隆本项目至本地。
2. 删除项目中的 `.git` 文件夹
3. 使用 `git init` 初始化一个属于你的新仓库。
4. 执行 `yarn` 安装依赖（推荐使用 `yarn`)
5. 修改... 提交

# 调试

1. 编写插件，保存。
2. `yarn link` 来软链接插件
3. 在 NodeBB 目录下执行 `yarn link nodebb-plugin-ddsb-link` 来引入插件
4. `./nodebb build && ./nodebb dev` 启动 NodeBB 开发环境
