import { HomeIcon, ListBulletIcon, UserIcon, ChatBubbleLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline'


export const navRoutes = [
    {
        id: '1',
        path: '/projects',
        title: 'Projects',
        icon: <HomeIcon className='size-5' />
    },
    {
        id: '2',
        path: '/messages',
        title: 'Messages',
        icon: <ChatBubbleLeftIcon className='size-5' />
    },
    {
        id: '3',
        path: '/purchases',
        title: 'Purchases',
        icon: <ListBulletIcon className='size-5' />
    },
    {
        id: '4',
        path: '/account',
        title: 'Account',
        icon: <UserIcon className='size-5' />
    },
    {
        id: '5',
        path: '/documentation',
        title: 'Documentation',
        icon: <DocumentTextIcon className='size-5' />
    }
]