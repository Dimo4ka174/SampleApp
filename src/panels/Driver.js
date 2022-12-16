import React from 'react';
import { Input, Snackbar, FormItem, SplitLayout, SplitCol, Placeholder, View, Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, ButtonGroup, FormLayout, PopoutWrapper, ActionSheet, CellButton } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import qr from '@vkontakte/vk-qr'
import { useState } from 'react';
import { Icon16ErrorCircleFill } from '@vkontakte/icons';

const Driver = (fetchedUser, props) => {
    bridge.send('VKWebAppGetGeodata')
        .then((data) => { 
            if (data.available) {
                console.log(data);
            }
        })
        .catch((error) => {
            console.log(error);
        });

    console.log(props);

    const [text, setText] = React.useState("");
    const [snackbar, setSnackbar] = React.useState(null);        
    const [activePanel, setActivePanel] = useState('driver-fields');
    const [qrCode, setQrCode] = useState(null);

    const routeNumber = React.createRef();
    const fare = React.createRef();

    const openErrorSnackbar = () => {
        if(snackbar) {
            return;
        }
        setSnackbar(<Snackbar before={<Icon16ErrorCircleFill/>} onClose={() => setSnackbar(null)}>Ошибка! Не все поля были заполнены.</Snackbar>)
    }

    const showQrCode = () => {
        let driverId = fetchedUser.fetchedUser.id;
        if(fare.current.value.trim() == '' || routeNumber.current.value.trim() == '') {
            openErrorSnackbar();
            return;
        }

        let options = {};
        options.isShowLogo = true;
        options.isShowBackground = false;
        console.log();
        setQrCode(qr.createQR(JSON.stringify({user: driverId, cost: parseInt(fare.current.value)}), 256, 'qr-code-class', options));
    }

    return <View style={{width: "100%"}} activePanel={activePanel} popout={snackbar}>
                <Panel stretched="true" id="driver-fields" centered="true">
                    <PanelHeader>Заголовок панели</PanelHeader>
                    <FormLayout stretched="true">
                        <FormItem stretched="true" top="Укажите номер маршрута">
                            <Input stretched="true" getRef={routeNumber} type="text"></Input>
                        </FormItem>
                        <FormItem stretched="true" top="Укажите стоиомость проезда">
                            <Input stretched="true" getRef={fare} type="number"></Input>
                        </FormItem>
                        <FormItem stretched="true">
                            <Button size="m" stretched="true" onClick={showQrCode}>Сделать QR код</Button>
                        </FormItem>
                    </FormLayout>
                </Panel>
                <Panel id="qr-code" centered="true">
                    <Div id='qr-code' dangerouslySetInnerHTML={{__html: qrCode}}></Div>
                </Panel>
            </View>
};
export default Driver;