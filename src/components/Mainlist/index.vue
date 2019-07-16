<template>
  <div>
    <div >
      <h2 class="text-center">插槽页面主要技术点slot,主要用于大量的重复的样式,或者重复业务逻辑</h2>
      <h2 style="text-align:center">
        {{tableName}}
      </h2>
      <div class="outslider">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
name:"Mainlist",
props:{
  tableName:String
}
}
</script>
<style lang="scss" scoped>
.outslider{
  border: 1px solid #ccc;
}
</style>

