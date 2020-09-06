import React from 'react';
import { Avatar } from '@material-ui/core';

import './SidebarChat.css';

function SidebarChart() {
    return (
        <div className='sidebarChat'>
            <Avatar />
            <div className='sidebarChat__info'>
                <h2>Chat A</h2>
                <p>This is the last message</p>
            </div>

        </div>
    )
}

export default SidebarChart;
