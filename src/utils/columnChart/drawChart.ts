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
  maskX: number | undefined

  constructor(props: IProps) {
    const { id, options, setToolTipData } = props
    this.canvas = document.getElementById(id) as HTMLCanvasElement
    this.context = this.canvas?.getContext('2d')
    this.options = options
    this.setToolTipData = setToolTipData
    this.formatData()
    this.init()
  }
  init() {
    if (this.context && this.canvas) {
      this.context.beginPath()
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.fillStyle = '#fff'
      this.context?.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.strokeStyle = '#666'
      this.context.fillStyle = '#666'
      this.context.lineWidth = 0.5
      this.drawXAxis()
      this.drawYAxis()
      this.drawRectChart()
      this.drawValueText()
      this.initEvent()
    }
  }

  formatData() {
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
      const width =
        (this.canvas?.width ?? 300) -
        2 * this.leftPadding -
        (dataMap.size + 1) * this.span
      const groupWidth = Math.ceil(width / dataMap.size)
      this.columnWidth = groupWidth < 60 ? 60 : groupWidth
    }
    if (this.canvas) {
      this.canvas.width =
        dataMap.size * (this.columnWidth + this.span) + 2 * this.leftPadding
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

      const width = (this.canvas?.width ?? 300) - this.leftPadding * 2
      const chartHeight = bottomY - this.topPadding
      for (let i = 0; i < 5; i++) {
        const y = bottomY - (chartHeight / 4) * i
        this.context?.fillText(
          String(Math.ceil((maxValue / 4) * i)),
          this.leftPadding - 10,
          y,
        )
        this.context?.fillRect(this.leftPadding, y, width, 0.5)
      }
    }
  }
  drawRectChart() {
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

  getToolTipData(e: MouseEvent) {
    if (!this.setToolTipData || !this.canvas) return
    const { offsetX, offsetY } = e
    const curX = offsetX - this.leftPadding
    const curY = offsetY - this.topPadding
    const maxX = this.canvas.width - 2 * this.leftPadding
    const maxY = this.canvas.height - 2 * this.topPadding
    if (curX > 0 && curX < maxX && curY > 0 && curY < maxY) {
      const index = Math.floor(curX / (this.columnWidth + this.span))
      const { data } = this.options
      const size = data.length / this.data.dataMap.size
      const curData = data.slice(index * size, index * size + size)
      if (curData.length) {
        this.setToolTipData({
          data: curData,
          offsetX: offsetX + 20,
          offsetY: offsetY - 20,
        })
        const maskX =
          this.leftPadding +
          this.span / 2 +
          index * (this.columnWidth + this.span)
        if (maskX !== this.maskX) {
          if (this.maskX) this.renderTipMask()
          this.renderTipMask(maskX)
        }
      }
    } else {
      this.setToolTipData()
      if (this.maskX) {
        this.renderTipMask()
      }
    }
  }

  renderTipMask(x?: number) {
    if (this.canvas && this.context) {
      const width = this.columnWidth + this.span
      const height = this.canvas?.height - 2 * this.topPadding
      if (x) {
        if (x !== this.maskX) {
          this.context.fillStyle = 'rgba(28,169,230,.2)'
          this.context.fillRect(x, this.topPadding, width, height)
          this.maskX = x
        }
      } else if (this.maskX) {
        this.init()
        this.maskX = undefined
      }
    }
  }

  initEvent() {
    this.canvas?.addEventListener('mousemove', (e) => {
      this.getToolTipData(e)
    })
  }
}

export default DrawChart
