import React, { Fragment } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { useState } from 'react';
import { Panel, FixedLayout, PanelHeader, Header, Button, Group, Cell, Div, Avatar, ButtonGroup, FormLayout, PopoutWrapper, ActionSheet, CellButton } from '@vkontakte/vkui';

const WelcomePage = ({go, fetchedUser, seenWelcomePage}) => {
    return <Panel id="welcome_page" centered={true}>
    <PanelHeader>
        Маршрутное такси
    </PanelHeader>
    {(!seenWelcomePage && fetchedUser) &&
            <Div className='Intro'>
                <h2>Привет {fetchedUser.first_name}</h2>
                <h3>Оплачивайте проезд на маршрутном такси с помощью ВКонтакте, или принимайте платежи, будучи водителем</h3>
        <FixedLayout vertical='bottom'>
            <Div>
                <Button mode='outline' size='l' stretched='true' onClick={go} data-to='home'>Всё понятно!</Button>
            </Div>
        </FixedLayout>
        </Div>
    }
    </Panel>
}


export default WelcomePage