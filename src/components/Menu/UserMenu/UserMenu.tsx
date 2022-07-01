import Image from 'next/image'

import UserMenuDivider from './UserMenuDivider'
import UserMenuItem from './UserMenuItem'

interface UserMenuProps {
  avatar?: string
}

export default function UserMenu(props: UserMenuProps) {
  return (
    <div className="rounded-l-[10px] bg-gray-900 max-w-[330px] text-white border-[0.5px]">
      <UserMenuItem>
        <Image
          src={props.avatar ?? '/assets/images/UserMenu/DefaultAvatar.svg'}
          alt="image"
          width={73}
          height={74}
          className="rounded-full overflow-hidden"
        />
        <div>
          <div className="items-center">
            <span className="mr-2 text-[10px]">
              0202994438940iu38a...8cf93739c45
            </span>
            <Image
              src="/assets/images/UserMenu/Copy.svg"
              alt="1"
              width={21}
              height={21}
            />
          </div>
          <span>Profile</span>
        </div>
      </UserMenuItem>
      <UserMenuDivider />
      <UserMenuItem>
        <div>Settings</div>
        <Image
          src="/assets/images/UserMenu/Settings.svg"
          alt="1"
          width={30}
          height={30}
        />
      </UserMenuItem>
      <UserMenuDivider />
      <UserMenuItem>
        <div>Log Out</div>
        <Image
          src="/assets/images/UserMenu/LogOut.svg"
          alt="1"
          width={30}
          height={30}
        />
      </UserMenuItem>
    </div>
  )
}
