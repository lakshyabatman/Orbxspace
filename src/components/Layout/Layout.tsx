import React, { PropsWithChildren } from 'react'
import Navbar from '../Navbar/Navbar'
import SideMenu from '../SideMenu/SideMenu'


  
const LayoutPage: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className='h-screen flex flex-col'>
        <Navbar/>
        <div className="flex-grow bg-[#FCF6FF] grid grid-cols-4 ">
            <SideMenu/>
            <div className="col-span-3 p-3">{children}</div>
        </div>
    </div>
  )
}

export default LayoutPage

