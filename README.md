# Station Web SDK

## 构建

```bash
# clone the project
git clone https://github.com/CrossEevery/station-web-sdk.git

# enter the project directory
cd station-web-sdk

# install dependency
npm install

# develop
npm run dev

# build for production environment
npm run build
```

## 使用方法

1. import plugin

   ```javascript
   import StationWebSDK from 'station-web-sdk';
   ```

   或 script 标签引入

   ```javascript
   <script type="text/javascript" src="./station-web-sdk.js"></script>
   ```

2. 详细用法

   - 启动游戏界面

     ```javascript
     StationWebSDK.init({
       uuid: '',
       ticket: '',
       stationId: 0, // 空间站id
       mount: 'station', // 加载节点
       api: '', // api地址
     });
     StationWebSDK.load();
     ```

   - api 使用，例如：

     ```javascript
     StationWebSDK.stationApi.getCharacterList(...params);
     ```

     详细接口可查看 /src/api/station.ts 文件
