import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import TaroParser from "../../index";
import markdown from "./markdown";

export default class Index extends Component {

  config: Config = {
    navigationBarTitleText: '首页'
  }

  options = {
    addGlobalClass: true
  }

  onImgClick = (src) => {
    Taro.previewImage({ urls: src }).then(() => {
    })
  }

  linkClick = (href) => {
    Taro.setClipboardData({ data: href }).then(() => {
      Taro.showToast({ title: '链接已复制' }).then(() => {
      })
    })

  }

  render() {
    const content = markdown
    return (
      <View className='index'>
        <TaroParser
          theme='light'
          onImgClick={this.onImgClick}
          onLinkClick={this.linkClick}
          yumlApi='https://md.werfei.com/?yuml'
          latexApi='https://md.werfei.com/?tex'
          content={content}
        />
      </View>
    )
  }
}
