import Image from 'next/image'

interface NavbarProps {
  logo: string
  menuItems: string[]
  avatar?: string
}

function MenuItem({ item }: { item: string }) {
  return (
    <div className="mr-8 cursor-pointer text-black hover:text-orange-600 transition-colors duration-150">
      {item}
    </div>
  )
}

export default function Navbar(props: NavbarProps) {
  const { logo, menuItems, avatar } = props
  const menuAvatar = avatar ?? '/assets/images/Avatar/NotConnectedWallet.svg'

  return (
    <div className="fixed h-[65px] w-full top-0 left-0 border-b border-black flex flex-row justify-between items-center px-9 py-1 font-Castle">
      <div>
        <Image src={logo} alt="logo" width={101} height={57} />
      </div>
      <div className="flex flex-row items-center">
        {menuItems.map((item, index) => {
          return <MenuItem item={item} key={item} />
        })}
        <Image src={menuAvatar} alt="" width={30} height={30} />
      </div>
    </div>
  )
}
