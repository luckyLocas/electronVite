import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import WeighUtil from './weighUtil'
import ColumnChart from './utils/columnChart'

declare global {
  interface Window {
    electronMain: { getPrinter: () => object[] }
  }
}

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // new WeighUtil()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <button
          onClick={async () => {
            const res = await window.electronMain.getPrinter()
            console.log('打印机列表', res)
          }}
        >
          获取打印机列表
        </button>
        <div
          style={{ width: '1000px', marginBottom: '20px', overflow: 'auto' }}
        >
          <ColumnChart
            data={[
              {
                name: '设计方量',
                value: 12359.47,
                type: '福建鹏杰建筑劳务有限公司',
              },
              {
                name: '完成方量',
                value: 159.47,
                type: '福建鹏杰建筑劳务有限公司',
              },
              {
                name: '设计方量',
                value: 564,
                type: '福建省涵泰建设工程有限公司',
              },
              {
                name: '完成方量',
                value: 564,
                type: '福建省涵泰建设工程有限公司',
              },
              {
                name: '设计方量',
                value: 252.49,
                type: '四川励峰建设工程有限公司',
              },
              {
                name: '完成方量',
                value: 252.49,
                type: '四川励峰建设工程有限公司',
              },
              {
                name: '设计方量',
                value: 6.8,
                type: '成都蜀通鼎盛工程建设有限公司',
              },
              {
                name: '完成方量',
                value: 6.8,
                type: '成都蜀通鼎盛工程建设有限公司',
              },
              {
                name: '设计方量',
                value: 1706.65,
                type: '湖南力轩建筑劳务有限责任公司',
              },
              {
                name: '完成方量',
                value: 1706.65,
                type: '湖南力轩建筑劳务有限责任公司',
              },
              {
                name: '设计方量',
                value: 41.66,
                type: '四川建发恒信建设工程有限公司',
              },
              {
                name: '完成方量',
                value: 41.66,
                type: '四川建发恒信建设工程有限公司',
              },
              {
                name: '设计方量',
                value: 904.6,
                type: ' 重庆市圣飞建筑工程有限责任公司',
              },
              {
                name: '完成方量',
                value: 904.6,
                type: ' 重庆市圣飞建筑工程有限责任公司',
              },
              {
                name: '设计方量',
                value: 821.71,
                type: '北京亚核通顺基础工程有限公司',
              },
              {
                name: '完成方量',
                value: 821.71,
                type: '北京亚核通顺基础工程有限公司',
              },
              {
                name: '设计方量',
                value: 115.2,
                type: '重庆市宇明建筑劳务有限公司',
              },
              {
                name: '完成方量',
                value: 115.2,
                type: '重庆市宇明建筑劳务有限公司',
              },
              {
                name: '设计方量',
                value: 22.71,
                type: '重庆航铁建设有限公司',
              },
              {
                name: '完成方量',
                value: 22.71,
                type: '重庆航铁建设有限公司',
              },
              {
                name: '设计方量',
                value: 330,
                type: '四川省鑫裕鸿运建筑工程有限公司',
              },
              {
                name: '完成方量',
                value: 330,
                type: '四川省鑫裕鸿运建筑工程有限公司',
              },
              {
                name: '设计方量',
                value: 5456.43,
                type: '重庆市建高建设工程有限公司',
              },
              {
                name: '完成方量',
                value: 5456.43,
                type: '重庆市建高建设工程有限公司',
              },
              {
                name: '设计方量',
                value: 667.82,
                type: '福建中泰劳务有限公司',
              },
              {
                name: '完成方量',
                value: 667.82,
                type: '福建中泰劳务有限公司',
              },
              {
                name: '设计方量',
                value: 1313.92,
                type: '天津星昊建筑工程有限公司',
              },
              {
                name: '完成方量',
                value: 1313.92,
                type: '天津星昊建筑工程有限公司',
              },
              {
                name: '设计方量',
                value: 8069.92,
                type: '重庆正信高建设工程有限公司',
              },
              {
                name: '完成方量',
                value: 8069.92,
                type: '重庆正信高建设工程有限公司',
              },
              {
                name: '设计方量',
                value: 1358.55,
                type: '重庆岷富沅建筑劳务有限公司',
              },
              {
                name: '完成方量',
                value: 1358.55,
                type: '重庆岷富沅建筑劳务有限公司',
              },
              {
                name: '设计方量',
                value: 146.8,
                type: '蓉发建设有限公司',
              },
              {
                name: '完成方量',
                value: 146.8,
                type: '蓉发建设有限公司',
              },
              {
                name: '设计方量',
                value: 1874.92,
                type: '四川九略建设工程有限公司',
              },
              {
                name: '完成方量',
                value: 1874.92,
                type: '四川九略建设工程有限公司',
              },
              {
                name: '设计方量',
                value: 132.85,
                type: '四川西恒鑫盛建筑劳务有限公司',
              },
              {
                name: '完成方量',
                value: 132.85,
                type: '四川西恒鑫盛建筑劳务有限公司',
              },
              {
                name: '设计方量',
                value: 15826.36,
                type: '重庆文童路桥工程有限公司',
              },
              {
                name: '完成方量',
                value: 15826.36,
                type: '重庆文童路桥工程有限公司',
              },
              {
                name: '设计方量',
                value: 4759.74,
                type: '陕西安顺达隧道工程有限公司',
              },
              {
                name: '完成方量',
                value: 4759.74,
                type: '陕西安顺达隧道工程有限公司',
              },
              {
                name: '设计方量',
                value: 237.21,
                type: '西藏汇鑫公路工程有限公司',
              },
              {
                name: '完成方量',
                value: 237.21,
                type: '西藏汇鑫公路工程有限公司',
              },
              {
                name: '设计方量',
                value: 24944.6,
                type: '重庆奋达建设有限公司',
              },
              {
                name: '完成方量',
                value: 24944.6,
                type: '重庆奋达建设有限公司',
              },
              {
                name: '设计方量',
                value: 198,
                type: '贵州丰邦建设有限公司',
              },
              {
                name: '完成方量',
                value: 198,
                type: '贵州丰邦建设有限公司',
              },
              {
                name: '设计方量',
                value: 636.27,
                type: '四川泸州红圆建筑劳务有限公司',
              },
              {
                name: '完成方量',
                value: 636.27,
                type: '四川泸州红圆建筑劳务有限公司',
              },
              {
                name: '设计方量',
                value: 64.93,
                type: '湖南浩宇建筑工程有限公司',
              },
              {
                name: '完成方量',
                value: 64.93,
                type: '湖南浩宇建筑工程有限公司',
              },
              {
                name: '设计方量',
                value: 1258.25,
                type: '西藏晟丰建筑工程劳务有限公司',
              },
              {
                name: '完成方量',
                value: 1258.25,
                type: '西藏晟丰建筑工程劳务有限公司',
              },
              {
                name: '设计方量',
                value: 2108.87,
                type: '福建享昌源建筑工程有限公司',
              },
              {
                name: '完成方量',
                value: 2108.87,
                type: '福建享昌源建筑工程有限公司',
              },
              {
                name: '设计方量',
                value: 640.42,
                type: '上海长凯岩土工程有限公司',
              },
              {
                name: '完成方量',
                value: 640.42,
                type: '上海长凯岩土工程有限公司',
              },
              {
                name: '设计方量',
                value: 498.51,
                type: '福建路顺建设劳务有限公司',
              },
              {
                name: '完成方量',
                value: 498.51,
                type: '福建路顺建设劳务有限公司',
              },
              {
                name: '设计方量',
                value: 115.94,
                type: '华蓥山隧道及引道项目-工地试验室',
              },
              {
                name: '完成方量',
                value: 115.94,
                type: '华蓥山隧道及引道项目-工地试验室',
              },
              {
                name: '设计方量',
                value: 821.36,
                type: '平潭综合实验区浩启建筑有限公司',
              },
              {
                name: '完成方量',
                value: 821.36,
                type: '平潭综合实验区浩启建筑有限公司',
              },
              {
                name: '设计方量',
                value: 10596.01,
                type: '成都友祥建筑劳务有限公司',
              },
              {
                name: '完成方量',
                value: 10596.01,
                type: '成都友祥建筑劳务有限公司',
              },
              {
                name: '设计方量',
                value: 10810.42,
                type: '重庆能特岩土工程有限公司',
              },
              {
                name: '完成方量',
                value: 10810.42,
                type: '重庆能特岩土工程有限公司',
              },
              {
                name: '设计方量',
                value: 2322.15,
                type: '贵州浩启环宇建筑劳务有限公司',
              },
              {
                name: '完成方量',
                value: 2322.15,
                type: '贵州浩启环宇建筑劳务有限公司',
              },
              {
                name: '设计方量',
                value: 6265.7,
                type: '重庆渝佑建设有限公司',
              },
              {
                name: '完成方量',
                value: 6265.7,
                type: '重庆渝佑建设有限公司',
              },
              {
                name: '设计方量',
                value: 13278.93,
                type: '四川欣平建筑工程有限公司',
              },
              {
                name: '完成方量',
                value: 13278.93,
                type: '四川欣平建筑工程有限公司',
              },
              {
                name: '设计方量',
                value: 1508.43,
                type: '成都鑫汇丰建筑劳务有限公司',
              },
              {
                name: '完成方量',
                value: 1508.43,
                type: '成都鑫汇丰建筑劳务有限公司',
              },
            ]}
          />
        </div>
        <div>
          <ColumnChart
            data={[
              {
                name: '设计方量',
                value: 7320,
                type: '临建',
              },
              {
                name: '完成方量',
                value: 20,
                type: '临建',
              },
              {
                name: '设计方量',
                value: 436600.23,
                type: '路基',
              },
              {
                name: '完成方量',
                value: 45918.46,
                type: '路基',
              },
              {
                name: '设计方量',
                value: 18863.36,
                type: '路面',
              },
              {
                name: '完成方量',
                value: 545.76,
                type: '路面',
              },
              {
                name: '设计方量',
                value: 386502.42,
                type: '桥梁',
              },
              {
                name: '完成方量',
                value: 35972.12,
                type: '桥梁',
              },
              {
                name: '设计方量',
                value: 44895.71,
                type: '涵洞',
              },
              {
                name: '完成方量',
                value: 18944.96,
                type: '涵洞',
              },
              {
                name: '设计方量',
                value: 1740110.77,
                type: '隧道',
              },
              {
                name: '完成方量',
                value: 19437.3,
                type: '隧道',
              },
            ]}
          />
        </div>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
