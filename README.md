# 都道府県別の総人口推移グラフを表示する SPA

React + HighCharts で都道府県別の総人口推移グラフを表示するアプリを構築した

> Netlify で公開中
> https://react-resas-population.netlify.app/

## イメージ

イメージ ①

<img width="1078" alt="Photo1" src="https://user-images.githubusercontent.com/96119096/168610318-860885dd-611f-48a6-a619-0be3a3e5b160.png">

イメージ ②

<img width="1080" alt="Photo2" src="https://user-images.githubusercontent.com/96119096/168610557-a6f0dbae-4d15-446e-897f-303261d42186.png">

## 環境

- node v16.13.1
- create-react-app v5.0.1
- react v18.0.4
- typescript v4.6.4
- Highcharts：https://www.highcharts.com/

## 要件

- [RESAS(地域経済分析システム)](https://opendata.resas-portal.go.jp) API の「都道府県一覧」から API を取得する
- API レスポンスから都道府県一覧のチェックボックスを動的に生成する
- 都道府県にチェックを入れると、RESAS API から選択された都道府県の「人口構成」を取得する
- 人口構成 API レスポンスから、X 軸:年、Y 軸:人口数の折れ線グラフを動的に生成して表示する
- 都道府県一覧および総人口情報は RESAS API のデータを用いる
- グラフは[Highcharts](https://www.highcharts.com)を用いて描画する
- グラフライブラリは任意のものを用いる
- Google Chrome 最新版で正しく動くこと

## API Key

- プロジェクト直下に`.env.local`ファイルを作成し、取得した API を書き込む
  `REACT_APP_RESAS_API_KEY=<取得したAPI_KEY>`

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
