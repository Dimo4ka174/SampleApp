import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import { useState } from 'react';
import { ScreenSpinner, Input, Snackbar, FormItem, SplitLayout, SplitCol, Placeholder, View, Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, ButtonGroup, FormLayout, PopoutWrapper, ActionSheet } from '@vkontakte/vkui';

const Passenger = () => {
    const [qrResult, setQrResult] = useState(null);
    bridge.send('VKWebAppOpenCodeReader')
    .then((data) => { 
        let result = JSON.parse(data.code_data);
        setQrResult(result);
        bridge.send('VKWebAppOpenPayForm', {
                app_id: 51502488,
                action: 'pay-to-user',
                params: {
                    user_id: result.user,
                    amount: result.cost,
                    description: "test"
                }})
                .then((data) => {
                if (data.status) {
                    setQrResult("YRA");
                }
                })
                .catch((error) => {
                // Ошибка
                    setQrResult("ERROR");
                });
            })
            .catch((error) => {
                setQrResult("ERROR");
            });
    return <Panel centered="true">{qrResult}</Panel>
};
export default Passenger;