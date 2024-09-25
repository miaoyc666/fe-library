# My Code Library

## Installation

```bash
npm install fe-library
```


### 1. 初始化项目
#### 1.1 创建项目目录
首先，创建一个新的项目目录并进入该目录。
```bash 
mkdir my-code-library
cd my-code-library
```

#### 1.2 初始化npm
通过 npm 初始化一个新的项目，这会生成一个 package.json 文件。
```bash
npm init -y
```
### 2. 安装依赖
根据选择的技术栈安装必要的依赖。例如，如果你使用 React，可以执行以下命令：
```bash
npm install react react-dom
如果使用其他库，如 Vue、Angular 或其他工具，根据需要安装相应的库。
```

### 3. 设定项目结构
设计一个清晰的项目结构，以便于管理和扩展。例如：
```bash
my-code-library/
├── src/
│   ├── components/        # 组件目录
│   ├── hooks/             # 自定义Hooks目录
│   ├── styles/            # 样式文件目录
│   ├── utils/             # 工具函数目录
│   ├── index.js           # 入口文件
│   └── lib.js             # 导出文件
├── public/                # 公共资源目录
├── tests/                 # 测试文件目录
├── .gitignore             # Git忽略文件
├── package.json           # 项目配置文件
└── webpack.config.js      # Webpack配置文件
```
### 4. 创建基础组件
在 src/components 目录下创建基础组件。例如，一个简单的按钮组件：

#### 4.1 创建Button组件
```jsx
// src/components/Button.jsx
import React from 'react';
import './Button.css';  // 引入样式

const Button = ({ label, onClick }) => {
    return (
        <button className="button" onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
```

### 4.2 添加样式
创建对应的样式文件：

```css
/* src/components/Button.css */
.button {
    padding: 10px 20px;
    background-color: blue;
    color: white;
    border: none;
    cursor: pointer;
}

.button:hover {
    background-color: darkblue;
}
```

### 5. 设置项目入口
在 src/index.js 中导出所有组件，以便在其他项目中轻松引用。
```javascript
// src/index.js
export { default as Button } from './components/Button';
```
### 6. 配置Webpack
如果你需要使用Webpack来打包项目，请创建一个 webpack.config.js 文件：
```javascript
// webpack.config.js
const path = require('path');

module.exports = {
entry: './src/index.js',
output: {
path: path.resolve(__dirname, 'dist'),
filename: 'bundle.js',
libraryTarget: 'umd', // 支持CommonJS和ES模块
},
module: {
rules: [
{
test: /\.jsx?$/,
exclude: /node_modules/,
use: {
loader: 'babel-loader',
},
},
{
test: /\.css$/,
use: ['style-loader', 'css-loader'],
},
],
},
resolve: {
extensions: ['.js', '.jsx'],
},
devServer: {
contentBase: './dist',
},
};
```

### 7. 运行项目
你可以使用 webpack 来打包项目，并使用 webpack-dev-server 进行开发：
```bash
npx webpack serve --config webpack.config.js
```
### 8. 编写测试
为确保代码质量，可以使用 Jest 和 Testing Library 编写测试。首先安装：
```bash
npm install --save-dev jest @testing-library/react
```
然后在 tests 目录下编写测试文件：

```javascript
// tests/Button.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../src';

test('renders button with correct label', () => {
render(<Button label="Click Me" />);
const buttonElement = screen.getByText(/Click Me/i);
expect(buttonElement).toBeInTheDocument();
});
```
### 9. 文档和示例
为您的代码库编写文档，包括使用说明、示例代码和贡献指南。可以在项目根目录下创建一个 README.md 文件，说明如何使用和安装。
```bash
# My Code Library

## Installation

npm install my-code-library
```

Usage
```javascript
import { Button } from 'my-code-library';

<Button label="Click Me" onClick={() => alert('Button clicked!')} />;
```
### 10. 发布到npm
最后，您可以将项目发布到npm（如果希望共享给其他开发者）：

1. 确保您有一个npm账号。
2. 在终端中登录到您的npm账号：
```bash
npm login
```

发布您的库：
```bash
npm publish
```
这些步骤就是构建自己的前端代码库的基本流程。随着项目的发展，您可以继续添加功能、组件和文档，使其更加完善。
