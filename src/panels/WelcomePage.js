import React, { Fragment } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Panel, FixedLayout, PanelHeader, Header, Button, Group, Cell, Div, Avatar, ButtonGroup, FormLayout, PopoutWrapper, ActionSheet, CellButton } from '@vkontakte/vkui';
import { Icon56MoneyCircleFillBlue } from '@vkontakte/icons';
import { Icon28BusOutline } from '@vkontakte/icons';

const WelcomePage = ({go, fetchedUser, seenWelcomePage}) => {
    return <Panel id="welcome_page" centered={true}>
    {(!seenWelcomePage && fetchedUser) &&
            <Div className='Intro'>
                <Icon56MoneyCircleFillBlue/>
                <h3>Привет, {fetchedUser.first_name}!</h3>
                <p className='home-main-panel__hint'>Оплачивайте проезд в маршрутном такси с помощью QR-кода не выходя ВКонтакте, или принимайте платежи, будучи водителем</p>
        <FixedLayout vertical='bottom'>
            <Div>
                <Button size='l' stretched='true' onClick={go} data-to='home'>Вперёд!</Button>
            </Div>
        </FixedLayout>
        </Div>
    }
    </Panel>
}


export default WelcomePage