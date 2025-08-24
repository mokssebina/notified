import { HomeIcon, ListBulletIcon, UserIcon, ChatBubbleLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline'


export const navRoutes = [
    {
        id: '1',
        path: '/projects',
        title: 'Projects',
        icon: <HomeIcon className='text-base' />
    },
    {
        id: '2',
        path: '/messages',
        title: 'Messages',
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
    },
    {
        id: '5',
        path: '/documentation',
        title: 'Documentation',
        icon: <DocumentTextIcon fontSize={24} />
    }
]