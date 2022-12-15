import React from 'react';
import qr from '@vkontakte/vk-qr';
import { Div } from '@vkontakte/vkui';
import { useState } from 'react';

const QrCode = (svg) => {
    let options = {};
    options.isShowLogo = true;
    options.isShowBackground = false;

    return <Div id='qr-code' dangerouslySetInnerHTML={{__html: qr.createQR("TEXT", 256, 'qr-code-class', options)}}></Div>;
}

export default QrCode;