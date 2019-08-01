<template lang="pug">
  div#SOP.full
    //- Modal( :type="setModal.type", :isVisible="setModal.isVisible", :headerText="setModal.title")
    div.ui.basepage
      Header
      div.container
        router-view
    RunSOPList
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '@/components/Header'
import RunSOPList from '@/components/RunSOPList'
import Modal from '@/components/Modal.vue'

export default {
  name: 'default',
  data () {
    return {
      title: 'Default'
    }
  },
  components: {
    Header,
    RunSOPList,
    Modal
  },
  computed: {
    ...mapGetters([
      'setModal'
    ])
  }

}
</script>

<style lang="less">

// transition mixin
.transition (@type: all, @duration: 250ms, @Function: ease-out) {
  -webkit-transition: @arguments;
  -moz-transition: @arguments;
  -ms-transition: @arguments;
  -o-transition: @arguments;
  transition: @arguments;
}
// border-radius mixin
.border-radius (@tl: 0px, @bl: 0px, @tr: 0px, @br: 0px) {
  border-top-left-radius: @tl;
  border-bottom-left-radius: @bl;
  border-top-right-radius: @tr;
  border-bottom-right-radius: @br;
}

.ellipse {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// Reset css
h1, h2 {
  font-weight: normal;

}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #2c3e50;
  &:hover {
    color: #2c3e50;
  }
}
.clear {
  clear: both;
}

img {
  width: 100%;
}
i {
  margin-top: 3px;
}
.ui.label,
.ui.button {
  border-radius: 0 !important;
}

.ui.form {
  .readonly {
    border: 0 !important;
  }
  select {
    cursor: pointer;
    word-wrap: break-word;
    line-height: 1em;
    white-space: normal;
    outline: 0;
    min-width: 14em;
    min-height: 2.71428571em;
    background: #fff;
    display: inline-block;
    padding: .5em 2.1em .5em 1em;
    color: rgba(0,0,0,.87);
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid rgba(34,36,38,.15);
    border-radius: .28571429rem;
  }
}

// base css
#SOP {
  display: flex;
  height: 100%;
  // min-width: 1280px;
}
.basepage {
  width:100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  background-color: #f3f2f2;
  .container {
    overflow:hidden;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    & > div {
      height: 100%;
    }
    .home {
      width: 100%;
    }
  }
  > .header {
    width:100%;
  }
}
// Dialog Style
.vue-dialog {
  .dialog-content {
    padding: 0;
    .dialog-c-title {
      background-color: #5d5e68;
      color: #fff;
      padding: .8em 1.2em;
    }
    .dialog-c-text {
      padding:20px;
    }
    .dialog-c-buttons {

    }
  }
}
@subHeaderHeight: 50px;
.main-container,.sub-container {
  width: 100%;
  height: 100%;
  padding: 20px 35px 20px 20px;
  display: flex;
  flex-direction: column;
  .sub-wrapper {
    flex-grow: 1;
    display:flex;
    flex-direction: column;
    .sub-header {
      min-height: @subHeaderHeight;
      position: relative;
      // display: none;
      .title {
        font-size: 1.6rem;
        padding: 0 0 10px 0;
        font-weight: bold;
      }
    }
    .sub-content {
      // flex-grow: 1;
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      height: calc(100% - @subHeaderHeight);
      > .header {
        height: 30px;
      }
      > .content {
        height: 90%;
        flex-grow: 1;
        background-color: #fff;
        border:1px solid rgba(0, 0, 0, .15);
        // box-shadow: 0 0 10px 0px rgba(0, 0, 0, .15);
        padding: 25px;
        .section{
          overflow-y: auto;
          padding: 20px;
          &.left-section {
            width: 25%;
            min-width: 400px;
            background-color: #454545;
          }
          &.right-section {
            flex-grow: 1;
          }
        }
        &.row {
          padding:0;
          display:flex;
        }
      }
      > .section {
        height: 100%;
      }
      .footer {
        // padding: 20px 0;
      }
      &.column {
          padding:0;
          flex-direction: row;
          > .content {
            &.section {
              width: 40%;
              margin-right: 20px
            }
            &.section:last-child {
              flex-grow: 1;
              margin:0;
            }
          }
        }
    }
    .sub-footer {
      padding: 20px 0;
    }
    .divide {
      display: none;
      border-top: 1px solid #ccc;
      border-bottom: 2px solid #f2f2f2;
    }
  }
  .btnSet {
    display:flex;
    justify-content: space-between;
    padding-top: 15px;
    &.center {
      justify-content: center;
    }
    &.right {
      justify-content: flex-end;
    }
  }
}

.main-container {
  background-color: #ededed;
  height: 88%
}
@modalHeader: 40px;
@modalFooter: 60px;
.modal {
    background-color: #fff;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .modal-header {
      background-color: #5d5e68;
      color: #fff;
      padding: .8em 1.2em;
      font-weight: 700;
      height: @modalHeader;
    }
    .modal-content {
      height: calc(100% - @modalHeader - @modalFooter);
      padding: 15px;
      .content-header {
        width: 100%;
        padding-bottom: 10px;
      }
      .content-wrapper {
        height: 100%;
        padding: 0;
        .list-content {
          height: 100%;
          .ui.list .item {
            .lh.title, .ld.title {
              width: 80%;
            }
          }
        }
      }
    }
    .modal-footer {
      position: relative;
      width: 100%;
      height: @modalFooter;
      padding: 10px 0;
      .btnSet {
        position:absolute;
        padding: 15px !important;
        width: 100%;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: flex-end;
        .ui.button {
          border-radius: 0 !important;
        }
        &.center {
          justify-content: center;
        }
      }
      &.inverted {
        background-color: #454545;
      }
    }
    .modal-close {
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 2px 4px;
      border-radius: 3px;
      color: #fff;
      // background-color: #fff;
      font-size: 1rem;
      width: 20px;
      text-align: center;
      i {
        margin:0;
      }
      &:hover {
        background-color: #fff;
        color: #5d5e68;
      }
    }
    .msgError {
      text-align: center;
      font-size: 0.8rem;
    }
    .error {
      color: #9f3a38;
    }
}
// base mediaquery
 @media only screen
  and (max-width : 1600px)
  // and (max-device-width : 1024px)
  // and (orientation : portrait)
  {
    #app {
      display: block;
      padding-right: 5.5rem;
      #SopList {
        position: absolute;
        top:0;
        right: 0;
      }
    }
  }
 @media only screen
  and (max-height : 1000px)
  // and (orientation : portrait)
  {
    body {
      overflow: hidden;
    }
    #app {
      min-height: 900px;
    }
  }

</style>
