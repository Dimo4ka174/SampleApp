import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, Panel, PanelHeader, ButtonGroup, Placeholder, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, Button, Header } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home'
import { object } from 'prop-types';
import WelcomePage from './panels/WelcomePage';
import Vendor from './panels/Vendor';
import QrCode from './panels/QrCode';

import './panels/appStyle.css';


const STORAGE_KEYS = {
	STATUS: 'status',
}

const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState('welcome_page');
	const [fetchedUser, setUser] = useState(null);
	const [userHasSeenWelcomePage, setUserHasSeenWelcomePage] = useState(false);
	const [qrCode, setQrCode] = useState(null);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const storageData = await bridge.send("VKWebAppStorageGet", {keys: Object.values(STORAGE_KEYS)});

			const data = {};
			storageData.keys.forEach(({key, value}) => {
				try{
					data[key] = value ? JSON.parse(value) : {};
					switch(key){
						case STORAGE_KEYS.STATUS:
							if(data[key].hasSeenWelcomePage){
								setActivePanel("home");
								setUserHasSeenWelcomePage(true);
							}
							break;
						default:
							break;
					}
				}
				catch(error){

				}
			})
			setUser(user);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to)
	}

	const setThisPanel = (id) =>{
		setActivePanel(id);
	}

	const seenWelcomePage = async function(){
		await bridge.send("VKWebAppStorageSet", {
			key: STORAGE_KEYS.STATUS, 
			value: JSON.stringify({
				hasSeenWelcomePage: true
			})
		});
		setActivePanel("home");
	}

	return <ConfigProvider scheme={scheme}>
			<AdaptivityProvider>
				<AppRoot>
					<View style={{justifyContent: "center"}} activePanel={activePanel}>
						<WelcomePage id='welcome_page' 
						seenWelcomePage={userHasSeenWelcomePage} 
						fetchedUser={fetchedUser} 
						go={seenWelcomePage}/>
						<Home id='home' go={go}/>
						<Vendor id='vendor' go={go} setThisPanel={setThisPanel} fetchedUser={fetchedUser} setQrCode={setQrCode}></Vendor>
						<QrCode id='qrCode' go={go} qrCode={qrCode}></QrCode>
					</View>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>;
}

export default App;
