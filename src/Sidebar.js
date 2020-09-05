import React from 'react';
import './Sidebar.css';
import SidebarChat from './SidebarChat';

import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import Chat from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar 
                    src='https://cdnb.artstation.com/p/assets/images/images/007/150/089/large/sunniva-myster-wolf-face-for-web.jpg?1504040306'
                />
                <div className='sidebar__headerRight'>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className='sidebar__search'>
                <div className='sidebar__searchContainer'>
                    <SearchOutlinedIcon />
                    <input
                        placeholder='Search or start new chat'
                        type='text'
                    />
                </div>
            </div>
            <div className='sidebar__chats'>
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar;
