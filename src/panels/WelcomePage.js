import React, { Fragment } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { useState } from 'react';
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, ButtonGroup, FormLayout, PopoutWrapper, ActionSheet } from '@vkontakte/vkui';

import './WelcomePage.css'
const WelcomePage = ({go, fetchedUser, seenWelcomePage}) => {
    return <Panel id="welcome_page" centered={true}>
    <PanelHeader>
        Welcome
    </PanelHeader>
    {(seenWelcomePage && fetchedUser) &&
    <Fragment>
        <Group>
            <Div className='Intro'>
                <h2>Привет {fetchedUser.first_name}</h2>
                <h3>Ещё немного описания</h3>
            </Div>
        </Group>
    </Fragment>
    }
    </Panel>
}


export default WelcomePage