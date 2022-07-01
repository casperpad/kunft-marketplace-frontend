import React from 'react'

interface UserMenuItemProps {
  children?: React.ReactElement | React.ReactElement[]
}

export default function UserMenuItem(props: UserMenuItemProps) {
  const { children } = props
  return (
    <div className="flex flex-row px-[30px] py-[17px] justify-between items-center">
      {children}
    </div>
  )
}
