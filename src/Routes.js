import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Login from '../src/screens/Login';
import Accueil from '../src/screens/Accueil';
import Factures from '../src/screens/Facture/Factures';
import Facture from '../src/screens/Facture/Facture';
import FacturesImpayees from '../src/screens/Facture/FacturesImpayees';
import FacturesPayees from '../src/screens/Facture/FacturesPayees';
import FacturesRetards from '../src/screens/Facture/FacturesRetards';
import FacturesAvoirs from '../src/screens/Facture/FacturesAvoirs';
import Clients from '../src/screens/Client/Clients';
import ClientsRelance from '../src/screens/Client/ClientsRelance';
import Reglements from '../src/screens/Reglement/Reglements';
import Reglement from '../src/screens/Reglement/Reglement';

import SituationClient from '../src/screens/Client/SituationClient';

import DrawerContent from './components/DrawerContent';

import {ActivityIndicator, AsyncStorage} from 'react-native';

export default class Routes extends Component {
    constructor() {
        super();
        this.state = { loggedIn: false, isLoaded: false };
      }
    
      componentDidMount() {
        AsyncStorage.getItem('util_id').then((util_id) => {
            this.setState({ loggedIn: util_id !== null })
        });
        AsyncStorage.getItem('ent_default').then((ent_default) => {
            this.setState({ isLoaded: true })
            if( ent_default !== null){
                global.currentEnt = ent_default
            }
        });
      }

    render() {
        if (!this.state.isLoaded) {
            return (
              <ActivityIndicator />
            )
        }else {
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
                            initial={!this.state.loggedIn}
                            />                
                        <Scene 
                            key="accueil"
                            component={Accueil}
                            title="Accueil"
                            initial={this.state.loggedIn}
                        /> 
                        <Scene 
                            key="factures"
                            component={Factures}
                            title="Factures"
                        /> 
                        <Scene 
                            key="facturesImpayees"
                            component={FacturesImpayees}
                            title="Factures impayées"
                        /> 
                        <Scene 
                            key="facturesPayees"
                            component={FacturesPayees}
                            title="Factures payées"
                        /> 
                        <Scene 
                            key="facturesRetards"
                            component={FacturesRetards}
                            title="Factures en retard de paiement"
                        /> 
                        <Scene 
                            key="facturesAvoirs"
                            component={FacturesAvoirs}
                            title="Factures d'avoir à regler"
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
                            title="Règlements"
                        /> 
                        <Scene 
                            key="reglement"
                            component={Reglement}
                            title="Règlement"
                        /> 
                    </Scene>
                    </Scene>
                </Router>
            )
        }
    }
}

const styles = {
    barButtonIconStyle: {
        color:'#fff'
    },
    navBar : {
        backgroundColor: '#13b5b4'
    }
}