import { HomeIcon, ListBulletIcon, UserIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'


export const navRoutes = [
    {
        id: '1',
        path: '/projects',
        title: 'Projects',
        icon: <HomeIcon className='text-base' />
    },
    {
        id: '2',
        path: '/notifications',
        title: 'Notifications',
        icon: <ChatBubbleLeftIcon fontSize={24} />
    },
    {
        id: '3',
        path: '/subscriptions',
        title: 'Subscriptions',
        icon: <ListBulletIcon fontSize={24} />
    },
    {
        id: '4',
        path: '/account',
        title: 'Account',
        icon: <UserIcon fontSize={24} />
    }
]