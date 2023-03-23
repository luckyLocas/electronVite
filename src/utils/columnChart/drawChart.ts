interface IProps {
  id: string
  options: { data: { type: string; value: number; name: string }[] } & Record<
    string,
    any
  >
  setToolTipData?: (data?: any) => void
}

class DrawChart {
  canvas: HTMLCanvasElement | null
  context: CanvasRenderingContext2D | null | undefined
  options: Record<string, any>
  data: { dataMap: Map<string, any[]>; maxValue: number } = {
    dataMap: new Map(),
    maxValue: 1,
  }
  topPadding = 40 // 图表上下边距
  leftPadding = 60 // 图表左右边距
  span = 20 // 每个柱状图group间隔距离
  columnWidth = 60 // 每个柱状图group所占的宽度
  colorArr = [
    '#1ca9e6',
    '#f88c24',
    '#0487FF',
    '#F6BD16',
    '#6F5EF9',
    '#6DC8EC',
    '#945FB9',
    '#FF9845',
    '#1E9493',
    '#FF99C3',
  ]
  setToolTipData: ((data?: any) => void) | undefined

  constructor(props: IProps) {
    const { id, options, setToolTipData } = props
    this.canvas = document.getElementById(id) as HTMLCanvasElement
    this.context = this.canvas?.getContext('2d')
    this.options = options
    this.setToolTipData = setToolTipData
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (this.context) {
      this.context.fillStyle = '#fff'
      this.context?.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.strokeStyle = '#666'
      this.context.fillStyle = '#666'
      this.context.lineWidth = 0.5
      this.renderdata()
      this.drawXAxis()
      this.drawYAxis()
      this.drawData()
      this.drawValueText()
      this.initEvent()
    }
  }
  renderdata() {
    const { data } = this.options
    const dataMap = new Map()
    let maxValue = 1
    data.map((item: { type: string; value: number }) => {
      const { type, value } = item
      const arr = dataMap.get(type) ?? []
      arr.push(item)
      dataMap.set(type, arr)
      if (value > maxValue) maxValue = value
    })
    if (dataMap.size) {
      this.columnWidth =
        Math.floor((this.canvas?.width ?? 300) / dataMap.size) < 60
          ? 60
          : Math.floor((this.canvas?.width ?? 300) / dataMap.size)
    }
    this.data = {
      dataMap,
      maxValue,
    }
  }
  drawXAxis() {
    if (this.context) {
      const y = (this.canvas?.height ?? 300) - this.topPadding + 1
      const chartWidth = (this.canvas?.width ?? 300) - this.leftPadding
      this.context.moveTo(this.leftPadding, y)
      this.context.lineTo(chartWidth, y)
      this.context.stroke()
      let index = 1
      this.context.textAlign = 'center'
      this.data.dataMap.forEach((_data, type) => {
        const x =
          this.leftPadding +
          index * this.span +
          (index - 1) * this.columnWidth +
          this.columnWidth / 2
        const textWidth = this.context?.measureText(type).width ?? 0
        if (textWidth * 2 > this.columnWidth) {
          type = type.substring(0, 5) + '...'
        }
        this.context?.fillText(type, x, y + 20, this.columnWidth)
        index++
      })
    }
  }
  drawYAxis() {
    if (this.context) {
      const bottomY = (this.canvas?.height ?? 300) - this.topPadding + 1
      this.context.moveTo(this.leftPadding, this.topPadding)
      this.context.lineTo(this.leftPadding, bottomY)
      this.context.stroke()
      const { maxValue } = this.data
      this.context.textAlign = 'right'
      this.context.lineWidth = 0.5
      const width = (this.canvas?.width ?? 300) - this.leftPadding * 2
      const chartHeight = bottomY - this.topPadding
      for (let i = 0; i < 5; i++) {
        const y = bottomY - (chartHeight / 4) * i
        this.context?.fillText(
          String(Math.ceil((maxValue / 4) * i)),
          this.leftPadding - 10,
          y,
        )
        this.context?.fillRect(this.leftPadding, y, width, 1)
      }
    }
  }
  drawData() {
    if (this.context) {
      const height = this.canvas?.height ?? 300
      const chartHeight = height - this.topPadding * 2
      let index = 1
      const { maxValue } = this.data
      this.data.dataMap.forEach((data) => {
        const barWidth = data.length ? this.columnWidth / data.length : 30
        data.map((item: { value: number }, i: number) => {
          const { value } = item
          if (this.context) {
            this.context.fillStyle = this.colorArr[i] ?? this.colorArr[0]
            const currentX =
              this.leftPadding +
              index * this.span +
              this.columnWidth * (index - 1)
            const columnHeight = (value / maxValue) * chartHeight
            this.context.fillRect(
              currentX + barWidth * i,
              height - this.topPadding - columnHeight,
              barWidth,
              columnHeight,
            )
          }
        })
        index++
      })
    }
  }
  drawValueText() {
    if (this.context) {
      const height = this.canvas?.height ?? 300
      const y = height - this.topPadding * 2
      let index = 1
      const { maxValue } = this.data
      this.context.textAlign = 'center'
      let prevTextY: number | undefined
      this.data.dataMap.forEach((data) => {
        const barWidth = data.length ? this.columnWidth / data.length : 30
        data.map((item: { value: number }, i: number) => {
          const { value } = item
          if (this.context) {
            this.context.fillStyle = this.colorArr[i] ?? this.colorArr[0]
            const currentX =
              this.leftPadding +
              index * this.span +
              this.columnWidth * (index - 1)
            let currentTextY =
              height - this.topPadding - (value / maxValue) * y - 10
            if (prevTextY !== undefined) {
              // 数值显示的y轴坐标位置通过算法控制，以免发生文字重叠
              if (Math.abs(currentTextY - prevTextY) < 10) {
                if (currentTextY > prevTextY) {
                  currentTextY += 9
                } else {
                  currentTextY -= 9
                }
              }
            }
            this.context.fillText(
              String(value),
              currentX + barWidth * i + barWidth / 2,
              currentTextY,
            )
            prevTextY = currentTextY
          }
        })
        index++
      })
    }
  }

  getFormatData(e: MouseEvent) {
    if (!this.setToolTipData) return
    const { offsetX, offsetY } = e
    const curX = offsetX - this.leftPadding
    const curY = offsetY - this.topPadding

    if (curX > 0 && curY > 0 && this.data.dataMap.size) {
      const index = Math.floor(curX / (this.columnWidth + this.span))
      const { data } = this.options
      const size = data.length / this.data.dataMap.size
      const curData = data.slice(index * size, index * size + size)
      this.setToolTipData({
        data: curData,
        offsetX: offsetX,
        offsetY: offsetY + 30,
      })
      console.log('curData', size, curData)
    } else {
      this.setToolTipData()
    }
  }

  initEvent() {
    let timer: string | number | NodeJS.Timeout | undefined
    this.canvas?.addEventListener('mousemove', (e) => {
      console.log('e', e)
      // if (timer) clearTimeout(timer)
      this.getFormatData(e)
    })
  }
}

export default DrawChart
