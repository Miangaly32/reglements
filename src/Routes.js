import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Login from '../src/screens/Login';
import Accueil from '../src/screens/Accueil';
import Factures from '../src/screens/Factures';
import Clients from '../src/screens/Clients';
import Reglements from '../src/screens/Reglements';

import DrawerContent from './components/DrawerContent';

export default class Routes extends Component {
    render() {
        return (
            <Router 
            hideNavBar={false} 
            navigationBarStyle={styles.navBar} 
            titleStyle={{color: 'white'}}
            >
                <Scene key='drawer'
                drawer={true}
                contentComponent={DrawerContent}
                hideBackImage
                drawerImage = {
                    require('../assets/hamburger.png')
                    }
                hideNavBar>    
                    <Scene key="login"
                        component={Login}
                        title="Login"
                        type="reset"
                        hideNavBar
                        drawerLockMode = {'locked-closed'}
                        initial />                
                    <Scene 
                        key="accueil"
                        component={Accueil}
                        title="Accueil"
                    /> 
                    <Scene 
                        key="factures"
                        component={Factures}
                        title="Factures impayees"
                    /> 
                     <Scene 
                        key="clients"
                        component={Clients}
                        title="Clients"
                    /> 
                     <Scene 
                        key="reglements"
                        component={Reglements}
                        title="Reglements"
                    /> 
                </Scene>
            </Router>
        )
    }
}

const styles = {
    barButtonIconStyle: {
        color:'#fff'
    },
    navBar : {
        backgroundColor: '#0DEADA'
    }
}