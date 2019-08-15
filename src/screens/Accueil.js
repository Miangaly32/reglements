import React, { Component } from 'react';
import { StyleSheet, View,  ScrollView,Picker ,Alert,Dimensions} from 'react-native';
import FacturesChart from '../components/FacturesChart';
import ReglementsChart from '../components/ReglementsChart';
import { Badge} from 'react-native-elements';
import {Text,Button,Icon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import { CardViewWithIcon } from "react-native-simple-card-view";

export default class Accueil extends Component {
    constructor(props) {
        super(props);
        this.state = {
          state: 'php',
          nbAvoir : 0,
          nbClientRelance : 0,
          montantAvoir:'',
          montantRelance:'',  
           nbEnRetard: 0,
          nbPayees : 0,
          nbImpayees:0
        }
    }

    componentDidMount(){
        const GLOBAL = require('../../Global');
        fetch(GLOBAL.BASE_URL_REG+"WSFacture/dashboard?ent_num=500002")
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            nbAvoir : responseJson.nbAvoir,
            nbClientRelance : responseJson.nbClientRelance,
            montantAvoir : responseJson.montantAvoir,
            montantRelance : responseJson.montantRelance
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any

        fetch(GLOBAL.BASE_URL_REG+"WSFacture/factureChart?ent_num=500002")
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            nbPayees : responseJson.nbPayees,
            nbEnRetard : responseJson.nbEnRetard,
            nbImpayees : responseJson.nbImpayees
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    _alertIndex(index) {
        Alert.alert(`hellooo`);
    }

    render() {
        const miniCardStyle = {
            shadowColor       : '#000000',
            shadowOffsetWidth : 2,
            shadowOffsetHeight: 2,
            shadowOpacity     : 0.1,
            hadowRadius      : 5,
            bgColor           : '#ffffff',
            padding           : 5,margin            : 5,
            borderRadius      : 3,elevation         : 3,
            width             : (Dimensions.get("window").width / 2) - 10
        };

        return (
        <ScrollView >   
            <View style={styles.container}> 
            <View style={ {flexDirection: "row"} }>
                <CardViewWithIcon
                    withBackground={ false }
                    androidIcon={ 'md-person' }
                    iconHeight={ 30 }
                    iconColor={ '#333' }
                    title={ this.state.nbClientRelance+' clients à relancer' }
                    contentFontSize={ 20 }
                    titleFontSize={ 18 }
                    style={ miniCardStyle }
                    // content={<Text style={{color:'#f0ad4e'}}>9.596.160,00 MGA</Text>}
                    content={this.state.montantRelance}
                    onPress={Actions.clientsRelance}
                />
                <CardViewWithIcon
                    withBackground={ false }
                    androidIcon={ 'md-paper' }
                    iconHeight={ 30 }
                    iconColor={ '#ff0000' }
                    title={ this.state.nbAvoir+' factures d\'avoir à régler' }
                    // content={<Text style={{color:'#d9534f'}}>10.200.160,00 MGA</Text>}
                    content={this.state.montantAvoir}
                    contentFontSize={ 20 }
                    titleFontSize={ 18}
                    style={ miniCardStyle }
                />
            </View>

            <View style={styles.factures}>
            <Text h2 style={{textAlign:'center'}}>Factures</Text>
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
                <Badge value={this.state.nbImpayees+" Impayees"} onPress={() => this._alertIndex()} containerStyle={{margin:10}} textStyle={{fontSize:15}} badgeStyle={{ padding:4,backgroundColor:'#f59c00'}}/>
                <Badge value={this.state.nbPayees+" Payees"} textStyle={{fontSize:15}} containerStyle={{margin:10}} badgeStyle={{  padding:4,backgroundColor:'#5cb85c'}}/>  
                <Badge value={this.state.nbEnRetard+" En retard de paiement"} textStyle={{fontSize:15}} containerStyle={{margin:10}} badgeStyle={{  padding:4,backgroundColor:'#db5400'}}/>  
            </View>  
            </View>

            <View style={styles.factures}>
                <Text h2 style={{textAlign:'center'}}>Règlements</Text>
                <ReglementsChart/>
            </View>

        </View>    
        </ScrollView>
        )
    }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 3, backgroundColor: '#fff' },
  row: { flexDirection: 'row',alignItems:'center',justifyContent  : 'center' },
  legend: { flexDirection: 'row',justifyContent  : 'center'},
  clients:{alignItems:'center', paddingTop: 30 },
  factures:{ marginTop:20 }
});