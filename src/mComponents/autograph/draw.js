const preHandler = (e) => {
  const event = e || window.event
  if (event.preventDefault) e.preventDefault()
  e.returnValue = !1
}

export default class Draw {
  constructor(el, content) {
    this.el = el
    this.canvas = document.getElementById(this.el)
    this.content = document.getElementById(content)
    this.cxt = this.canvas.getContext('2d')
    this.stage_info = this.canvas.getBoundingClientRect()
    this.path = {
      beginX: 0,
      beginY: 0,
      endX: 0,
      endY: 0,
      minX: 99999,
      maxX: 0,
      minY: 99999,
      maxY: 0,
    }
    this.isSign = false
    this.save = this.onSave
    this.clear = this.onClear
    this.maxX = ''
  }
  init(btn) {
    this.initCanvasContainer()
    this.canvas.addEventListener('touchstart', (event) => {
      document.addEventListener('touchstart', preHandler, false);
      this.drawBegin(event)
    })
    this.canvas.addEventListener('touchend', () => {
      document.addEventListener('touchend', preHandler, false);
      this.drawEnd()
    })
    this.canvas.addEventListener('touchmove', () => {
      document.addEventListener('touchmove', preHandler, false);
    })
    this.clear(btn)
  }
  moveleft() {
    const oLeft = this.content.scrollLeft - 60
    this.content.scrollLeft = oLeft
  }
  moveright() {
    const oLeft = this.content.scrollLeft + 60
    this.content.scrollLeft = oLeft
  }
  initCanvasContainer() {
    const oWidth = this.content.offsetWidth;
    const oHeight = this.content.offsetHeight;
    console.log(oWidth, oHeight)
    this.canvas.width = parseInt(oWidth * 2) || 300;
    this.canvas.height = parseInt(oHeight) || 300;
  }
  drawBegin(e) {
    const that = this;
    if (window.getSelection()) {
      window.getSelection().removeAllRanges()
    } else {
      document.selection.empty()
    }
    const oLeft = (e.changedTouches[0].clientX + this.content.scrollLeft) - this.stage_info.left
    const oTop = e.changedTouches[0].clientY - this.stage_info.top

    this.cxt.strokeStyle = '#000'
    this.cxt.lineWidth = 6
    this.cxt.beginPath()
    this.cxt.moveTo(oLeft, oTop)
    this.path.beginX = oLeft
    this.path.beginY = oTop
    this.canvas.addEventListener('touchmove', () => {
      that.drawing(event)
      document.addEventListener('touchmove', preHandler, false);
    })
  }
  drawEnd() {
    this.maxX = 1
    document.removeEventListener('touchstart', preHandler, false)
    document.removeEventListener('touchend', preHandler, false)
    document.removeEventListener('touchmove', preHandler, false)
  }
  drawing(e) {
    const oLeft = (e.changedTouches[0].clientX + this.content.scrollLeft) - this.stage_info.left
    const oTop = e.changedTouches[0].clientY - this.stage_info.top
    if (oLeft > this.path.maxX) {
      this.path.maxX = oLeft
    }
    if (oLeft < this.path.minX) {
      this.path.minX = oLeft
    }

    if (oTop > this.path.maxY) {
      this.path.maxY = oTop
    }
    if (oTop < this.path.minY) {
      this.path.minY = oTop
    }
    this.isSign = true
    this.cxt.lineTo(oLeft, oTop)
    this.path.endX = oLeft
    this.path.endY = oTop
    this.cxt.stroke()
  }
  onClear() {
    this.path.beginX = 0
    this.path.minX = 99999
    this.path.maxX = 0
    this.path.minY = 99999
    this.path.maxY = 0
    this.isSign = false
    this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
  onSave() {
    const star = this.path.minX
    const end = this.path.minY
    const width = this.path.maxX - this.path.minX
    const height = this.path.maxY - this.path.minY
    console.log(star, end, width, height)
    if (this.path.beginX === 0) return false
    const imageDataTmp = this.cxt.getImageData(star, end, width, height)
    return this.getSignData(imageDataTmp)
    // return this.canvas.toDataURL('image/png')
  }
  getSignData(imageDataTmp) {
    this.maxX = 2
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    // const ratio = window.devicePixelRatio ? window.devicePixelRatio : 1;

    const originWidth = imageDataTmp.width
    const originHeight = imageDataTmp.height
    // 最大尺寸限制，可通过国设置宽高来实现图片压缩程度
    const maxWidth = 300
    const maxHeight = 100
    // 目标尺寸
    let targetWidth = originWidth
    let targetHeight = originHeight
    // 图片尺寸超过400x400的限制
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > maxWidth / maxHeight) {
        // 更宽，按照宽度限定尺寸
        targetWidth = maxWidth;
        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
      } else {
        targetHeight = maxHeight;
        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
      }
    }
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    context.scale(1 / (originWidth / targetWidth), 1 / (originWidth / targetWidth));

    const canvas2 = document.createElement('canvas');
    canvas2.width = imageDataTmp.width
    canvas2.height = imageDataTmp.height
    canvas2.getContext('2d').putImageData(imageDataTmp, 0, 0)

    // 清除画布
    context.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    context.drawImage(canvas2, 0, 0);

    const canvasImage = canvas.toDataURL('image/png')

    return canvasImage
  }
}

