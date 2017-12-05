import React from 'react';
import { Router, Scene, Modal } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './src/reducers';
import configureStore from './src/store/configureStore';


import Landing from './src/containers/App';
import Photos from './src/containers/Photos';
import Map from './src/containers/Map';
import Tutorial from './src/containers/Tutorial'
import CameraRoll from './src/containers/CameraRoll'
import Camera from './src/containers/Camera'
import EditImage from './src/containers/EditImage'
import ActionSelect from './src/containers/ActionSelect'
import mainWrapper from './src/containers/MainWrapper'


const store = configureStore()
const RouterWithRedux = connect()(Router);


export default App = () => (
    <Provider store={ store }>
        <RouterWithRedux>
            <Modal>
                <Scene key='root'>
                    <Scene hideNavBar key="landing" component={Landing} title="Landing" initial={true} gestureEnabled={false} panHandlers={null} />
                    <Scene hideNavBar key="tutorial" component={Tutorial} title="Tutorial" gestureEnabled={false} panHandlers={null} />
                    <Scene hideNavBar key="editImage" component={EditImage} title="EditImage"/>
                    <Scene hideNavBar key='main' component={mainWrapper} title='Main' gestureEnabled={false} panHandlers={null} />
                    <Scene hideNavBar key="cameraRoll" component={CameraRoll} title="CameraRoll" modal={true}/>
                    <Scene hideNavBar key="camera" component={Camera} title="Camera" modal={true}/>
                </Scene>
            </Modal>
        </RouterWithRedux>
    </Provider>
);
