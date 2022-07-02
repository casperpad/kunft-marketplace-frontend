import Image from 'next/image'

import UserMenuDivider from './UserMenuDivider'
import UserMenuItem from './UserMenuItem'

import { IoSettingsOutline, FiCopy, RiLogoutBoxRLine } from 'react-icons/all'

interface UserMenuProps {
  avatar?: string
  copySvg: string
  settingSvg: string
  logSvg: string
}

export default function UserMenu(props: UserMenuProps) {
  const { avatar, copySvg, settingSvg, logSvg } = props
  return (
    <div className="rounded-l-[10px] bg-gray-900 w-[330px] text-[14px] text-white border-black border-b pb-[5px]">
      <UserMenuItem>
        <Image
          src={props.avatar ?? '/assets/images/Avatar/Default.svg'}
          alt="image"
          width={73}
          height={74}
          className="rounded-full overflow-hidden"
        />
        <div>
          <div className="items-center">
            <span className="mr-2 text-[10px] text-gray-300/60">
              0202994438940iu38a...8cf93739c45
            </span>
            <FiCopy className="w-5 h-5" />
          </div>
          <span className="text-[12px] text-white">Profile</span>
        </div>
      </UserMenuItem>
      <UserMenuDivider />
      <UserMenuItem>
        <div>Settings</div>
        <IoSettingsOutline className="w-[23px] h-[23px]" />
      </UserMenuItem>
      <UserMenuDivider />
      <UserMenuItem>
        <div>Log Out</div>
        <RiLogoutBoxRLine className="w-[23px] h-[21px]" />
      </UserMenuItem>
    </div>
  )
}
