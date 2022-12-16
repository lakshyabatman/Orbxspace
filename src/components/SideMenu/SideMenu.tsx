import React, { useContext } from 'react'
import { Menu, MenuProps } from 'antd'
import { AppContext } from '../../context/AppContext';


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



const SideMenu = () => {

    const context = useContext(AppContext);

    if(context == null) return <h1>ERROR</h1>

    

    const items: MenuProps['items'] = [
        getItem('Channels', 'grp', null, [...context.groupDetails?.channels.map(channel => getItem(channel.content.name, channel.stream_id)) ?? []], 'group'),
      ];


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