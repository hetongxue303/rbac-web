import {App} from 'vue'

import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import * as Icons from '@element-plus/icons-vue'

export default {
    install(app: App) {
        app.use(ElementPlus, {
            locale,
            size: 'small' || 'default' || 'large'
        })

        // 循环遍历所有图标(全局注册)
        Object.keys(Icons).forEach((key: string) => {
            app.component(key, Icons[key as keyof typeof Icons]);
        })
    }
}
