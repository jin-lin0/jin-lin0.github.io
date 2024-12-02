---
title: NPM常用包学习
tags:
  - npm
categories:
  - 前端
hidden: true
abbrlink: 32026
date: 2024-06-03 19:56:38
---
NPM的常用包学习以及NPM相关知识的学习。

<!--more-->

## npm指令

```bash
npm link // 将包软链接到全局
npm remove -g xxx // 将软链接的包删除
```



## package.js

```json
{
  "name": "special-components",		// 包的名称
  "version": "0.0.2",							// 包的版本号
  "files": ["dist"],							// 发布时只发布dist目录的文件
  "main": "./dist/index.umd.js",  // CommonJS 模块的入口文件
  "browser": "lib/main.browser.js"// 提供客户端模块，浏览器中如fs等API不可用，替代的实现 
  "module": "./dist/index.es.js", // ESM 模块的入口文件
  "exports": { 										// 存在子路径需要自定义导出规则，优先级高于main/module，针对不同的模块格式指定不同的文件路径
    ".": {												// .代表包的根模块，直接导入这个包会使用此路径
      "types": "./dist/types/index.d.ts", // 使得typescript正确解析类声明文件
      "import": "./dist/index.es.js",
      "require": "./dist/index.umd.js"
    },
    "./style": "./dist/style.css"
  },
  "type": "module",								// 所有.js文件将被视为EsModule类型文件
  
}
```



## styled-components

使用 `styled-components` 处理多个层级的样式时，会遇到将所有样式都作为 props 传递的挑战。为了解决这个问题，同时保留用户对各个层级的定制能力，可以采用以下几种策略：

1. **暴露特定的子组件**：
   - 将需要定制的子组件暴露出来，让用户能够单独对其进行样式定制。

2. **使用类名和属性选择器**：
   - 为不同层级的元素设置类名或自定义属性，允许用户通过这些选择器进行样式定制。

3. **样式重写（Style Override）**：
   - 允许用户传递一个自定义的 `className`，并在全局样式中使用该 `className` 进行样式覆盖。

以下是这几种策略的具体实现方式：

### 1. 暴露特定的子组件（推荐）

将需要定制的子组件暴露出来，让用户能够单独对其进行样式定制。

```typescript
import styled from "styled-components";
import React from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${(props) => props.theme.colors.primary};
`;

const Content = styled.div`
  padding: 16px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const CardTitle = Title; // 暴露子组件
export const CardContent = Content; // 暴露子组件

const Card = ({ title, children, className }) => {
  return (
    <Container className={className}>
      <CardTitle>{title}</CardTitle>
      <CardContent>{children}</CardContent>
    </Container>
  );
};

export default Card;
```

使用时：

```typescript
import Card, { CardTitle, CardContent } from './Card';

const CustomTitle = styled(CardTitle)`
  color: red;
`;

const CustomCard = () => (
  <Card title={<CustomTitle>My Title</CustomTitle>}>
    <CardContent>Custom Content</CardContent>
  </Card>
);
```

### 2. 使用类名和属性选择器

为不同层级的元素设置类名或自定义属性，允许用户通过这些选择器进行样式定制。

```typescript
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonLabel = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
`;

const ButtonIcon = styled.span`
  margin-right: 8px;
  color: ${(props) => props.theme.colors.primary};
`;

const Button = ({ label, icon, className }) => {
  return (
    <ButtonContainer className={className}>
      <ButtonIcon>{icon}</ButtonIcon>
      <ButtonLabel>{label}</ButtonLabel>
    </ButtonContainer>
  );
};

export default Button;
```

使用时：

```typescript
import styled from 'styled-components';
import Button from './Button';

const CustomButton = styled(Button)`
  .icon {
    color: green;
  }
  .label {
    font-size: 16px;
  }
`;

const App = () => (
  <CustomButton icon={<Icon className="icon" />} label={<span className="label">Click Me</span>} />
);
```

### 3. 样式重写（Style Override）

允许用户传递一个自定义的 `className`，并在全局样式中使用该 `className` 进行样式覆盖。

```typescript
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &.custom-button {
    .icon {
      color: green;
    }
    .label {
      font-size: 16px;
    }
  }
`;

const ButtonLabel = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
`;

const ButtonIcon = styled.span`
  margin-right: 8px;
  color: ${(props) => props.theme.colors.primary};
`;

const Button = ({ label, icon, className }) => {
  return (
    <ButtonContainer className={className}>
      <ButtonIcon className="icon">{icon}</ButtonIcon>
      <ButtonLabel className="label">{label}</ButtonLabel>
    </ButtonContainer>
  );
};

export default Button;
```

使用时：

```typescript
import Button from './Button';

const App = () => (
  <Button className="custom-button" icon={<Icon />} label="Click Me" />
);
```

