import React from 'react';
import qr from '@vkontakte/vk-qr';
import { CellButton, Div } from '@vkontakte/vkui';
import { useState } from 'react';
import { Panel, PanelHeader } from '@vkontakte/vkui';

const QrCode = ({id, go, qrCode}) => {

    return <Panel id={id} className='qrCodeBox'>
            <PanelHeader>
                QR CODE
            </PanelHeader>
            <CellButton onClick={go} data-to='vendor'>Назад</CellButton>
            <Div className='qrCode' dangerouslySetInnerHTML={{__html: qrCode}}></Div>
        </Panel>
}

export default QrCode;