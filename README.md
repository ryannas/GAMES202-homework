# GAMES 202

## Assignment0
![Phong Shader](imgs/assignment0.gif)

## 如何跑起来：
1. 安装nodejs(如果你没有安装)
2. 安装 npm 包管理工具(通常安装完nodejs就自动安装了npm)
3. 进入当前项目的文件夹运行
```
npm i
```
如果出现了难以安装的情况，尝试换源，如果还是不能解决问题，尝试
```
npm config set strict-ssl false
```
...安装完毕后

4. 仍然在当前项目文件夹运行
```
npm run dev
```
...几秒钟后

在浏览器中访问 `http://localhost:3000/` 这时候你应该能看到本次作业所提供的作业框架对应的效果。

以上流程跑通之后，下一次再起项目就**只需要运行**第4步的 `npm run dev` 就可以了。
