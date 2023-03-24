import { useEffect, useMemo, useState } from 'react'
import DrawChart from './drawChart'

interface IProps {
  width?: number
  height?: number
  data: { type: string; value: number; name: string }[]
}

/**
 * 绘制柱状图
 */
const ColumnChart: React.FC<IProps> = (props) => {
  const { height = 300 } = props
  const [toolTipData, setToolTipData] = useState<any>()
  const id = useMemo(() => {
    return String(Math.ceil(+new Date() + Math.random() * 100))
  }, [])

  useEffect(() => {
    new DrawChart({
      id,
      options: props,
      setToolTipData,
    })
  }, [id, setToolTipData])

  const toolTipWrap = useMemo(() => {
    return document.getElementById(`${id}_toolTip`)
  }, [id])

  useEffect(() => {
    const toolTipWrap = document.getElementById(`${id}_toolTip`)
    console.log('toolTipData', toolTipWrap)

    if (!toolTipWrap) return
    if (toolTipData) {
      const height = toolTipWrap.clientHeight
      console.log('height', height)

      const { offsetX, offsetY } = toolTipData
      toolTipWrap.style.left = offsetX + 'px'
      toolTipWrap.style.top = offsetY + 'px'
      toolTipWrap.style.display = 'block'
    } else {
      toolTipWrap.style.display = 'none'
    }
  }, [toolTipWrap, toolTipData])

  return (
    <div style={{ position: 'relative' }}>
      <canvas id={id} height={height} width={1000} />
      <div className="toolTip" id={`${id}_toolTip`}>
        <div>{toolTipData?.data[0]?.type}</div>
        {toolTipData?.data?.map((item: any) => {
          return (
            <div>
              {item.name}：{item.value}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ColumnChart
