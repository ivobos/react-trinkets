# React Trinkets

[![npm version](https://badge.fury.io/js/react-trinkets.svg)][npm_url]
[![downloads](https://img.shields.io/npm/dt/react-trinkets.svg)][npm_url]
[![license](https://img.shields.io/npm/l/react-trinkets.svg)][npm_url]

[npm_url]: https://www.npmjs.org/package/react-trinkets

A collection of React.js components to decorate your site with.

## Installation

With Yarn:

```bash
yarn add react-trinkets
```

With npm:

```bash
npm install --save-dev react-trinkets
```

# Usage
Each trinket has their own default properties. You can overwrite the defaults by passing props into the component.

## Last Visited
This component welcomes users to your website and remembers their last visit. It displays a personalized message depending on how recently they visited. For example, it might say "Welcome back!" if they visited yesterday or "Hey there! It's been a while" if it's been a longer time.

### Example

```tsx
import { LastVisited } from "react-trinkets";

function App() {

  return (
    <div>
        <ReactTrinkets>
    <div>
  );
}

export default App;
```
