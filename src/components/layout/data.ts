// 菜单数据
import {menuItem} from "./types";

// 菜单数据
export const menuListData: Array<menuItem> = [
    {
        name: '首页',
        path: '/dashboard',
        icon: 'location'
    },
    {
        name: '系统管理',
        path: '/system',
        icon: 'setting',
        children: [
            {
                name: '用户管理',
                path: '/system/user',
                icon: 'document'
            }
        ]
    }
]