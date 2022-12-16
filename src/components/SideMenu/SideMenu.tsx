import React from 'react'
import { Menu, MenuProps } from 'antd'


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}


const items: MenuProps['items'] = [
    getItem('Channels', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
  ];

const SideMenu = () => {
  return (
    <div className='p-4'>
                <Menu
                onClick={() => {}}
                style={{ width: 325 }}
                className="rounded"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
                />
    </div>
  )
}

export default SideMenu