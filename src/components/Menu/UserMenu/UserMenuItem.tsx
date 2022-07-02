interface UserMenuItemProps {
  children?: React.ReactElement | React.ReactElement[]
}

export default function UserMenuItem(props: UserMenuItemProps) {
  const { children } = props

  return (
    <div className="flex flex-row px-[30px] py-[17px] justify-between items-center cursor-pointer fill-white hover:text-orange-600 hover:fill-orange-600 transition-colors duration-150">
      {children}
    </div>
  )
}
