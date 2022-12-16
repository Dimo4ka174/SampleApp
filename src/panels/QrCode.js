import React from 'react';
import qr from '@vkontakte/vk-qr';
import { useState } from 'react';
import { Panel, PanelHeader, CellButton, FixedLayout, Div, Button } from '@vkontakte/vkui';

const QrCode = ({id, go, qrCode}) => {

    return <Panel id={id} className='qrCodeBox'>
            <PanelHeader>
                Маршрутное такси
            </PanelHeader>
            <CellButton  onClick={go} data-to='vendor'>Назад</CellButton>
            <Div className='qrCode' dangerouslySetInnerHTML={{__html: qrCode}}></Div>
            <FixedLayout vertical='bottom'>
            <Div>
                <Button mode='outline' size='l' stretched='true' onClick={go} data-to='home'>Скачать</Button>
            </Div>
            </FixedLayout>
        </Panel>
}

export default QrCode;