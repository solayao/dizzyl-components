<template>
  <div ref="fuwenben" class="fuwenben">
    <quill-editor
      ref="QuillEditor"
      v-model="content"
      :options="editorOption"
      :style="editorStyle"
    ></quill-editor>
  </div>
</template>

<script>
import { Quill, quillEditor } from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import { ImageResize } from 'quill-image-resize-module'

// 自定义插入a链接
const Link = Quill.import('formats/link')
class FileBlot extends Link {
  // 继承Link Blot
  static create(value) {
    let node = null
    if (value && !value.href) {
      // 适应原本的Link Blot
      node = super.create(value)
    } else {
      // 自定义Link Blot
      node = super.create(value.href)
      // node.setAttribute('download', value.innerText);  // 左键点击即下载
      node.innerText = value.innerText
      node.download = value.innerText
    }
    return node
  }
}
FileBlot.blotName = 'link'
FileBlot.tagName = 'A'
Quill.register(FileBlot)

// 自定义行高
const Parchment = Quill.import('parchment')
const AvailableLineHeights = [...Array(110).keys()].map(x => `${(80 + x * 5) / 100}`)
const lineHeightConfig = {
  scope: Parchment.Scope.INLINE,
  whitelist: AvailableLineHeights
}
const lineHeightStyle = new Parchment.Attributor.Style('line-height', 'line-height', lineHeightConfig)
Quill.register(lineHeightStyle, true)

// 自定义字体种类
const fontList = ['serif', 'sans-serif', 'monospace', 'cursive']
const fontListConfig = {
  scope: Parchment.Scope.INLINE,
  whitelist: fontList
}
class FontStyleAttributor extends Parchment.Attributor.Style {
  value(node) {
    return super.value(node).replace(/["']/g, '')
  }
}
// const FontClass = new Parchment.Attributor.Class('font', 'ql-font', fontListConfig)
const FontStyle = new FontStyleAttributor('font', 'font-family', fontListConfig)
Quill.register(FontStyle, true)
// Quill.register(FontClass, true)

// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  ['blockquote', 'code-block'], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  [{ indent: '-1' }, { indent: '+1' }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
  [{ font: [false, ...fontList] }], // 字体种类
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ 'line-height': [...AvailableLineHeights, false] }], // 行高
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ align: [] }], // 对齐方式
  ['clean'], // 清除文本格式
  ['link', 'image', 'video', 'upload'] // 链接、图片、视频
]

/**
 * @description 富文本编译器
 * @url https://github.com/surmon-china/vue-quill-editor
 */
export default {
  components: { quillEditor },
  props: {
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      content: '',
      editorStyle: {},
      editorOption: {
        placeholder: '请输入内容...',
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              upload: hadClick => {
                if (hadClick) {
                  // 点击附件上传操作
                  
                }
              }
            }
          }
        }
      }
    }
  },
  computed: {},
  watch: {
    content(newVal) {
      this.$emit('getVal', { title: this.title, content: newVal })
    },
    readonly(newVal) {
      this.$refs.QuillEditor.quill.enable(!newVal)
    }
  },
  mounted() {
    this.editorStyle = {
      height: this.$refs.fuwenben.clientHeight * 0.7 + 'px'
    }
    this.$refs.QuillEditor.quill.enable(!this.readonly)
  },
  methods: {
    setDefault(content) {
      this.content = content
    }
  }
}
</script>

<style lang="scss" scoped>
.fuwenben {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;

  @mixin toolbar-btn-title($title) {
    position: relative;
    &:hover {
      &::after {
        content: $title;
        position: absolute;
        bottom: -20px;
        left: 10px;
        padding: 5px;
        color: white;
        background: black;
        border-radius: 5px;
        font-size: 10px;
        white-space: nowrap;
        opacity: 0.8;
      }
    }
  }

  // 内容文字替换为中文
  /deep/ .ql-toolbar {
    // 工具箱悬浮提示信息
    .ql-formats {
      .ql-expanded {
        &:hover {
          &::after {
            display: none !important;
          }
        }
      }
      .ql-bold {
        @include toolbar-btn-title('加粗');
      }

      .ql-italic {
        @include toolbar-btn-title('斜体');
      }

      .ql-underline {
        @include toolbar-btn-title('下划线');
      }

      .ql-strike {
        @include toolbar-btn-title('删除线');
      }

      .ql-blockquote {
        @include toolbar-btn-title('块引用');
      }

      .ql-code-block {
        @include toolbar-btn-title('代码引用');
      }

      .ql-header[value='1'] {
        @include toolbar-btn-title('标题1');
      }

      .ql-header[value='2'] {
        @include toolbar-btn-title('标题2');
      }

      .ql-list[value='ordered'] {
        @include toolbar-btn-title('数字编号');
      }

      .ql-list[value='bullet'] {
        @include toolbar-btn-title('编号');
      }

      .ql-script[value='sub'] {
        @include toolbar-btn-title('下标');
      }

      .ql-script[value='super'] {
        @include toolbar-btn-title('上标');
      }

      .ql-indent[value='-1'] {
        @include toolbar-btn-title('减少缩进量');
      }

      .ql-indent[value='+1'] {
        @include toolbar-btn-title('增加缩进量');
      }

      .ql-size {
        @include toolbar-btn-title('字体大小');
      }

      .ql-header {
        @include toolbar-btn-title('文本类型');
      }

      .ql-line-height {
        @include toolbar-btn-title('行高');
      }

      .ql-color {
        @include toolbar-btn-title('字体颜色');
      }

      .ql-background {
        @include toolbar-btn-title('背景颜色');
      }

      .ql-font {
        @include toolbar-btn-title('字体类型');
      }

      .ql-align {
        @include toolbar-btn-title('对齐方式');
      }

      .ql-clean {
        @include toolbar-btn-title('清除格式');
      }

      .ql-link {
        @include toolbar-btn-title('链接');
      }

      .ql-image {
        @include toolbar-btn-title('图片');
      }

      .ql-video {
        @include toolbar-btn-title('视频');
      }

      .ql-upload {
        @include toolbar-btn-title('上传附件');
      }
    }

    // 文本汉化
    .ql-snow {
      .ql-tooltip[data-mode='link']::before {
        content: '请输入链接地址:';
      }
      .ql-editing a.ql-action::after {
        border-right: 0px;
        content: '保存';
        padding-right: 0px;
      }
      .ql-tooltip[data-mode='video']::before {
        content: '请输入视频地址:';
      }
    }

    .ql-size {
      .ql-picker-label::before,
      .ql-picker-item::before {
        content: '14px';
      }
      .ql-picker-label[data-value='small']::before,
      .ql-picker-item[data-value='small']::before {
        content: '10px';
      }
      .ql-picker-label[data-value='large']::before,
      .ql-picker-item[data-value='large']::before {
        content: '18px';
      }
      .ql-picker-label[data-value='huge']::before,
      .ql-picker-item[data-value='huge']::before {
        content: '32px';
      }
    }

    .ql-header {
      .ql-picker-label::before,
      .ql-picker-item::before {
        content: '文本';
      }
      @for $i from 1 through 6 {
        .ql-picker-label[data-value='#{$i}']::before,
        .ql-picker-item[data-value='#{$i}']::before {
          content: '标题#{$i}';
        }
      }
    }

    .ql-line-height {
      width: 98px;

      .ql-picker-label::before,
      .ql-picker-item::before {
        content: '默认行高';
      }

      @for $i from 0 to 110 {
        .ql-picker-label[data-value='#{(80 + $i * 5) / 100}']::before,
        .ql-picker-item[data-value='#{(80 + $i * 5) / 100}']::before {
          content: '#{(80 + $i * 5) / 100}';
        }
      }
    }

    .ql-font {
      .ql-picker-label::before,
      .ql-picker-item::before {
        content: '标准字体';
      }
      .ql-picker-label[data-value='serif']::before,
      .ql-picker-item[data-value='serif']::before {
        content: '衬线字体';
      }
      .ql-picker-label[data-value='sans-serif']::before,
      .ql-picker-item[data-value='sans-serif']::before {
        content: '无衬线字体';
      }
      .ql-picker-label[data-value='monospace']::before,
      .ql-picker-item[data-value='monospace']::before {
        content: '等宽字体';
      }
      .ql-picker-label[data-value='cursive']::before,
      .ql-picker-item[data-value='cursive']::before {
        content: '草书';
      }
      .ql-picker-label[data-value='Microsoft Yahei']::before,
      .ql-picker-item[data-value='Microsoft Yahei']::before {
        content: '微软雅黑';
      }
      .ql-picker-label[data-value='SimSun']::before,
      .ql-picker-item[data-value='SimSun']::before {
        content: '宋体';
      }
      .ql-picker-label[data-value='KaiTi']::before,
      .ql-picker-item[data-value='KaiTi']::before {
        content: '楷体';
      }
      .ql-picker-label[data-value='NSimSun']::before,
      .ql-picker-item[data-value='NSimSun']::before {
        content: '新宋体';
      }
      .ql-picker-label[data-value='FangSong']::before,
      .ql-picker-item[data-value='FangSong']::before {
        content: '仿宋';
      }
    }

    // 自定义工具箱按钮样式
    .ql-picker-options {
      overflow: auto;
      max-height: 200px;
    }
    .ql-upload {
      &::before {
        content: '附';
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}
</style>
