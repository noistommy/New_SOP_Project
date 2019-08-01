<template lang="pug">
  div.ui.active.dimmer
    div.extheader 404
    div.content
      div.center
        h1.ui.icon.header.center.inverted
          i.settings.icon
          div.content Page Not Found
          div.sub.header Error!! Find issue Hero!!!!
          button.ui.inverted.button
            a(href="/")  Home
</template>

<script>
export default {
  name: 'error'
}
</script>

<style lang="less">
.extheader {
  font-size: 15em;
  padding: 20px;
  font-weight: bold;
  color: #ffffff;
  margin-top: -100px
}
</style>
