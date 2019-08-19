import React, { Component } from 'react';
import { StyleSheet, Text,View,ScrollView,TouchableOpacity,Image} from 'react-native';
import { Icon } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

export default class DrawerContent extends Component {

    constructor() {
        super();

        this.items = [
            {
                key : 0,
                navOptionThumb: 'home',
                navOptionName: 'Accueil',
                screenToNavigate: 'accueil',
            },
            {
                key : 1,
                navOptionThumb: 'list',
                navOptionName: 'Factures',
                screenToNavigate: 'factures',
            },
            {
                key : 2,
                navOptionThumb: 'person',
                navOptionName: 'Clients',
                screenToNavigate: 'clients',
            },
            {
                key : 3,
                navOptionThumb: 'content-copy',
                navOptionName: 'Règlements',
                screenToNavigate: 'reglements',
            }
          ];
    }

    _navigate(screen){
        // Actions.screen;
        Actions[screen]();
    }

	render() { 

        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        {/*Top Large Image */}
                        <Image
                        source={require('../../assets/photo_default.png')}
                        style={styles.sideMenuProfileIcon}
                        />
                        <Text style={styles.textCenter}>Miangaly Manao</Text>
                        <Text style={styles.textCenter}>miangaly.manao@gmail.com</Text>
                    </View>

                    {/*Divider between Top Image and Sidebar Option*/}
                    <View
                        style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#e2e2e2',
                            marginTop: 15,
                        }}
                    />

                    <View style={{ width: '100%' }}>
                        {this.items.map((item, key) => (
                            <View
                            key = {key}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: 10,
                                paddingBottom: 10,
                                backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
                            }}>
                                <View style={{ marginRight: 10, marginLeft: 20 }}>
                                <Icon name={item.navOptionThumb} size={25} color="#808080" />
                                </View>
                                <Text
                                    style={{
                                    fontSize: 15,
                                    // color: global.currentScreenIndex === key ? 'red' : 'black',
                                    }}
                                    onPress={() => {
                                        global.currentScreenIndex = key;
                                        this._navigate(item.screenToNavigate);
                                    }}>
                                    {item.navOptionName}
                                </Text>
                            </View>
                         ))}
                    </View>
                </ScrollView>
            </View>
            // <ScrollView style={styles.container}>
            //      <TouchableOpacity style={styles.button} onPress={Actions.accueil}>
            //         <Text style={styles.controlText}>Accueil</Text>
            //     </TouchableOpacity>
            //     <TouchableOpacity style={styles.button} onPress={Actions.factures}>
            //         <Text style={styles.controlText}>Factures</Text>
            //     </TouchableOpacity>
            //     <TouchableOpacity style={styles.button} onPress={Actions.clients}>
            //         <Text style={styles.controlText}>Clients</Text>
            //     </TouchableOpacity>
            //     <TouchableOpacity style={styles.button} onPress={Actions.reglements}>
            //         <Text style={styles.controlText}>Reglements</Text>
            //     </TouchableOpacity>
            //     <TouchableOpacity style={styles.button}>
            //         <Text style={styles.controlText}>Deconnexion</Text>
            //     </TouchableOpacity>
            // </ScrollView>
        )
	}
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      paddingTop: 30
    },
    textCenter: {
      textAlign: 'center',
    },
    button: {
      // borderWidth: 1,
      backgroundColor: 'white',
      padding: 10,
    },
    sideMenuProfileIcon: {
        // resizeMode: 'center',
        width: 150,
        height: 150,
        // marginTop: 20,
        borderRadius: 150 / 2
    }
});