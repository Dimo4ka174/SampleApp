import React from 'react';
import { SplitLayout, SplitCol, Placeholder, View, Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, ButtonGroup, FormItem } from '@vkontakte/vkui';
import Driver from './Driver'
import Passenger from './Driver'
import { Icon56MoneyCircleFillBlue, Icon24CarOutline, Icon24Qr } from '@vkontakte/icons';

const getBack = () => {
    console.log('test')
}

const Home = ({id, go}) => {
    return <Panel id={id} centered="true">
                <PanelHeader>
                    Маршрутное такси
                </PanelHeader>
                <Placeholder
                    icon={<Icon56MoneyCircleFillBlue/>} 
                    header="Маршрутное такси">
                </Placeholder>
                <ButtonGroup gap="m" align="center" mode="vertical" stretched="true">
                        <Button mode='outline' onClick={go} data-to="passenger" size="m" stretched="true" before={<Icon24Qr />}>Оплатить по QR-коду</Button>
                        <Button mode='outline' onClick={go} data-to="vendor" size="m" stretched="true" before={<Icon24CarOutline />}>Я Продавец</Button>
                </ButtonGroup>
            </Panel>
};

export default Home;