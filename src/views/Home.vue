<template>
  <el-container>
    <el-aside width="auto">
      <Sidebar :collapse="layoutStore.getCollapse"/>
    </el-aside>
    <el-container>
      <el-header height="50px">
        <Header/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer height="30px">
        <Footer/>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Sidebar from '../components/layout/sidebar/Index.vue'
import Header from '../components/layout/header/Index.vue'
import Footer from '../components/layout/footer/Index.vue'
import {useLayoutStore} from "../store/layout"

const layoutStore = useLayoutStore()

</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}

.el-aside {
}

.el-header {
  padding: 0;
  margin: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.el-main {
}

.el-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>