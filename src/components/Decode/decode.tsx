import Taro, { Component } from '@tarojs/taro'
import { Block, Button } from '@tarojs/components'
import { Props } from 'types/Decode'
import { styleToObj } from "../../utils/dom"
import Table from "../Table/table";
import Img from "../Img/Img";
import DecodeA from "./decodeA";
import config from '../../utils/config'

export default class DecodeB extends Component<Props, {}> {
  options = {
    addGlobalClass: true
  }

  imgClick = (src) => {
    if (this.props.onImgClick) {
      this.props.onImgClick(src)
    }
  }

  linkClick = (href) => {
    if (this.props.onLinkClick) {
      this.props.onLinkClick(href)
    }
  }

  buildChildView() {
    const { nodes, latexApi, yumlApi } = this.props
    if (nodes && nodes.child) {
      return nodes.child.map(item => {
        const tag = item.tag || 'undefined'
        const style = styleToObj(item.attr && item.attr.style ? item.attr.style : '')
        if (item.attr && item.attr.width) {
          style.width = item.attr.width
        }
        let childView;
        if (tag === 'undefined') {
          childView = <Block key={item.index}>{item.text}</Block>
        } else if (tag === 'button') {
          childView =
            <Button key={item.index} className={config.classPrefix + item.attr.class} style={style}>{item.child &&
              <DecodeA latexApi={latexApi} yumlApi={yumlApi} onImgClick={this.imgClick} onLinkClick={this.linkClick}
                nodes={item}
              />}</Button>
        } else if (tag === 'table') {
          childView = <Table key={item.index} data={item} />
        } else if (tag === 'img') {
          childView = <Img onImgClick={this.imgClick} key={item.index} data={item} />
        }
        return childView
      })
    }
    return <Block />
  }

  render() {
    const node = this.buildChildView()
    return (
      <Block>{node}</Block>
    )
  }
}
