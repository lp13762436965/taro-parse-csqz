import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Props, State } from "types/Parser";
import { Data } from "types/Data";
import Decode from "../Decode/decode";
import convert from '../../utils/parser'
import config from '../../utils/config'

export default class TaroParser extends Component<Props, State> {

  static options = {
    addGlobalClass: true
  }

  imgClick = (src) => {
    Taro.previewImage({ urls: [src] })
  }

  linkClick = (href) => {
    if (this.props.onLinkClick) {
      this.props.onLinkClick(href)
    }
  }

  render() {
    const { content, latexApi, yumlApi, theme } = this.props
    const nodes = convert(content || '', 'html') as unknown as Data
    const imgList = []
    this.findAllImgUrl(nodes, imgList)
    const className = `${config.classPrefix}h2w ${config.classPrefix}h2w-` + (theme ? theme : 'light')
    return (
      <View className={className}>
        <View className={config.classPrefix + 'h2w__main'}>
          {nodes &&
            <Decode latexApi={latexApi} yumlApi={yumlApi} onImgClick={(src) => {
              this.imgClick(src)
            }} onLinkClick={this.linkClick}
              nodes={nodes}
            />}
        </View>
      </View>
    )
  }

  findAllImgUrl(node, imgList) {
    if ((node.tag === 'image' || node.tag === 'img') && node.attr && node.attr.src) {
      imgList.push(node.attr.src)
    }
    if (node.child) {
      node.child.forEach((o, i) => {
        o.index = i
        this.findAllImgUrl(o, imgList)
      })
    }
  }
}
