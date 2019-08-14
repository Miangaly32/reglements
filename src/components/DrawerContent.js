import React, { Component } from 'react';
import { StyleSheet, Text,ScrollView,TouchableOpacity} from 'react-native';;
import {Actions} from 'react-native-router-flux';
export default class DrawerContent extends Component {
	render() {
        return(
            <ScrollView style={styles.container}>
                 <TouchableOpacity style={styles.button} onPress={Actions.accueil}>
                    <Text style={styles.controlText}>Accueil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={Actions.factures}>
                    <Text style={styles.controlText}>Factures</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={Actions.clients}>
                    <Text style={styles.controlText}>Clients</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={Actions.reglements}>
                    <Text style={styles.controlText}>Reglements</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.controlText}>Deconnexion</Text>
                </TouchableOpacity>
            </ScrollView>
        )
	}
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 50
    },
    controlText: {
      color: 'black',
    },
    button: {
      // borderWidth: 1,
      backgroundColor: 'white',
      padding: 10,
    }
});