import { SerialPort } from 'serialport'

export default class WeighUtil {
  port?: SerialPort
  constructor() {
    console.log('建立串口连接', SerialPort)

    this.port = new SerialPort({
      path: 'COM4',
      baudRate: 9600,
      lock: false,
      stopBits: 1,
      parity: 'none',
      dataBits: 8,
    })
    this.port.on('data', (data: any) => {
      console.log('data', data)
    })
  }
}
