import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Login from '../src/screens/Login';
import Accueil from '../src/screens/Accueil';
import Factures from '../src/screens/Factures';
import Facture from '../src/screens/Facture';
import Clients from '../src/screens/Clients';
import ClientsRelance from '../src/screens/ClientsRelance';
import Reglements from '../src/screens/Reglements';
import SituationClient from '../src/screens/SituationClient';

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
                <Scene key="root">
                    <Scene key="login"
                        component={Login}
                        title="Login"
                        type="reset"
                        hideNavBar
                        drawerLockMode = {'locked-closed'}
                        initial
                         />                
                    <Scene 
                        key="accueil"
                        component={Accueil}
                        title="Accueil"
                    /> 
                    <Scene 
                        key="factures"
                        component={Factures}
                        title="Factures"
                    /> 
                     <Scene 
                        key="facture"
                        component={Facture}
                        title="Facture"
                    /> 
                     <Scene 
                        key="clients"
                        component={Clients}
                        title="Clients"
                    /> 
                     <Scene 
                        key="clientsRelance"
                        component={ClientsRelance}
                        title="Clients à relancer"
                    /> 
                     <Scene 
                        key="situationClient"
                        component={SituationClient}
                        title="Situation client"
                    /> 
                    <Scene 
                        key="reglements"
                        component={Reglements}
                        title="Reglements"
                    /> 
                </Scene>
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