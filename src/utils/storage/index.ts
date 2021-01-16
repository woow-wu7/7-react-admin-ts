/**
 * 代理模式的应用
 */
class Storage {
  type: string
  expires: number
  storageType: { local: string; sesstion: string }

  constructor(type: string, expires: number) {
    this.type = type
    this.expires = expires
    this.storageType = {
      local: 'localStorage',
      sesstion: 'sesstionStorage'
    }
  }

  // 存
  // 代理原生的 setItem() 方法，添加缓存开始时间
  setItem = (key: string, value: any) => {
    window[this.storageType[this.type]]['setItem'](key, JSON.stringify({
      value,
      setTimes: +new Date()
    }))
  }

  // 取
  // 代理原生的 getItem() 方法，判断是否过期，过期则返回null，并清除 Storage
  getItem = (key: string) => {
    const now = +new Date()
    const { value, setTimes } = JSON.parse(window[this.storageType[this.type]]['getItem'](key))
    if (now - setTimes > this.expires) {
      window[this.storageType[this.type]]['removeItem'](key)
      return null
    }
    return value
  }
  
  // 原生 Storage
  getNativeStorage = () => window[this.storageType[this.type]]
}

export default Storage