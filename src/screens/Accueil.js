import React, { Component } from 'react';
import { StyleSheet, View,  Picker ,Alert} from 'react-native';
import FacturesChart from '../components/FacturesChart';
import { Badge} from 'react-native-elements';
import {Text,Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

export default class Accueil extends Component {
    constructor(props) {
        super(props);
        this.state = {
          state: 'php'
        }
      }
    _alertIndex(index) {
        Alert.alert(`hellooo`);
    }
 
    render() {
        return (
        <View style={styles.container}>
            <Text h2>Vos factures</Text>
            <View style={styles.row}>
                <Picker
                    style={{width: 100}}
                    selectedValue={this.state.language}
                    onValueChange={(lang) => this.setState({language: lang})}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="PHP" value="php" />
                </Picker>
                <Picker
                    style={{width: 100}}
                    selectedValue={this.state.language}
                    onValueChange={(lang) => this.setState({language: lang})}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="PHP" value="php" />
                </Picker>
            </View>
            <FacturesChart/>
            <View style={styles.legend}>
                <Badge value="Impayees" onPress={() => this._alertIndex()} containerStyle={{margin:10}} textStyle={{fontSize:15}} badgeStyle={{ padding:4,backgroundColor:'#f59c00'}}/>
                <Badge value="Payees" textStyle={{fontSize:15}} containerStyle={{margin:10}} badgeStyle={{  padding:4,backgroundColor:'#5cb85c'}}/>  
                <Badge value="En retard de paiement" textStyle={{fontSize:15}} containerStyle={{margin:10}} badgeStyle={{  padding:4,backgroundColor:'#db5400'}}/>  
            </View>  
            <View style={styles.clients}>
                <Text h3>4 clients à relancer</Text>
                <Text h3 style={{color:'#f0ad4e'}}>9.596.160,00 MGA</Text>
                <Button
                onPress={Actions.clientsRelance}
                title="Voir details"
                buttonStyle = {{width:100}}
                />
            </View>  
            <View style={styles.clients}>
                <Text h3>6 factures d'avoir à régler</Text>
                <Text h3 style={{color:'#d9534f'}}>10.200.160,00 MGA</Text>
                <Button
                title="Voir details"
                buttonStyle = {{width:100}}
                />
            </View>  
        </View>
        )
    }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  row: { flexDirection: 'row' },
  legend: { flexDirection: 'row',justifyContent  : 'center'},
  clients:{alignItems:'center', paddingTop: 30 }
});