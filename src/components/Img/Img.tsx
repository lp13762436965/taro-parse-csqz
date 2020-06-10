import { Component } from '@tarojs/taro'
import { Image } from '@tarojs/components'
import { Props, State } from 'types/Img'
import config from '../../utils/config'

export default class Img extends Component<Props, State> {

  state = {
    size: {
      width: 0,
      height: 0
    },
    attr: {
      className: '',
      src: '',
      style: ''
    }
  }

  componentWillMount(): void {
    const { data } = this.props
    if (!data) {
      return
    }
    //获取图片的宽高
    Taro.getImageInfo({
      src: data.attr.src,
    }).then((res: { width: number, height: number }) => {
      this.setState({
        size: res
      })
    })
    // 设置公式图片
    this.setState({
      attr: {
        src: data.attr.src,
        className: data.attr.class
      }
    });
  }

  options = {
    addGlobalClass: true
  }

  imgClick = (src) => {
    if (this.props.onImgClick) {
      this.props.onImgClick(src)
    }
  }

  render() {
    const { attr, size } = this.state
    const { width, height } = size;
    const { data } = this.props

    return (
      data && <Image
        className={config.classPrefix + attr.className}
        onClick={() => { this.imgClick(attr.src) }}
        lazy-load='true'
        src={attr.src}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    )
  }
}
