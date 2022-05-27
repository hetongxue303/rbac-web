<template>
  <el-menu
      :collapse="props.collapse"
      :default-active="active"
      :router="true"
      :unique-opened="false"
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="menu"
      text-color="#fff"
  >
    <MenuItem :data="menuList"/>
  </el-menu>
</template>

<script lang="ts" setup>
import MenuItem from './MenuItem.vue'
import {onMounted, PropType, ref, watch} from "vue"
import {useRoute} from "vue-router"
import {menuItem} from "../types"
import {menuListData} from "../data"

const props = defineProps({
  collapse: {
    type: Boolean as PropType<boolean>,
    required: true
  }
})
// 菜单默认选中
const route = useRoute()
const active = ref<string>('/dashboard')
const changeDefaultActive = () => active.value = route.path
// 请求数据
const menuList: menuItem[] = menuListData
// 监听路由变化设置菜单
watch(() => route.path, () => changeDefaultActive())
onMounted(() => changeDefaultActive())
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;

  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>