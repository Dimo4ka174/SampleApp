import React, { Fragment } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { useState } from 'react';
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, ButtonGroup, FormLayout, FormItem, Input, PopoutWrapper, ActionSheet, CellButton, Snackbar } from '@vkontakte/vkui';
import { Icon16ErrorCircleFill } from '@vkontakte/icons';
import qr from '@vkontakte/vk-qr';





const Vendor = ({id, go, fetchedUser, setThisPanel, setQrCode}) => {

    const [snackbar, setSnackbar] = React.useState(null);

    const routeNumber = React.createRef();
    const fare = React.createRef();

    const openErrorSnackbar = () => {
        if(snackbar) {
            return;
        }
        setSnackbar(<Snackbar before={<Icon16ErrorCircleFill/>} onClose={() => setSnackbar(null)}>Ошибка! Не все поля были заполнены.</Snackbar>)
    }

    const showQrCode = () => {
        const driverId = fetchedUser.id;
        console.log(driverId);
        if(fare.current.value.trim() == '' || routeNumber.current.value.trim() == '') {
            openErrorSnackbar();
            return;
        }

        const options = {};
        options.isShowLogo = true;
        options.isShowBackground = false;

        setQrCode(qr.createQR(JSON.stringify({user: driverId, cost: parseInt(fare.current.value)}), 256, 'qr-code-class', options));

        setThisPanel('qrCode');
    }

    return <Panel id={id} popout={snackbar}>
        <PanelHeader>
            Vendor
        </PanelHeader>
        <Fragment>
            <Group>
                <h2>Текст {fetchedUser.first_name}</h2>
                <CellButton onClick={go} data-to='home'>Back to home page</CellButton>
            </Group>
            <Group>
                <FormLayout stretched="true">
                        <FormItem stretched="true" top="Укажите номер маршрута">
                            <Input stretched="true" getRef={routeNumber} type="text"></Input>
                        </FormItem>
                        <FormItem stretched="true" top="Укажите стоиомость проезда">
                            <Input stretched="true" getRef={fare} type="number"></Input>
                        </FormItem>
                        <FormItem stretched="true">
                            <Button size="m" stretched="true" onClick={showQrCode} data-to='qrCode'>Сделать QR код</Button>
                        </FormItem>
                </FormLayout>
            </Group>
        </Fragment>
    </Panel>
}

export default Vendor