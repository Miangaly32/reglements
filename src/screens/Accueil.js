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
          exercice_reg: '',
          nbAvoir : 0,
          nbClientRelance : 0,
          montantAvoir:'',
          montantRelance:'',  
          nbEnRetard: 0,
          nbPayees : 0,
          nbImpayees:0,
          exercices : []
        }
        global.currentScreenIndex = 0;
    }

    componentDidMount(){
        const GLOBAL = require('../../Global');
        fetch(GLOBAL.BASE_URL_REG+"WSFacture/dashboard?ent_num="+global.currentEnt)
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

        fetch(GLOBAL.BASE_URL_REG+"WSFacture/factureChart?ent_num="+global.currentEnt)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            nbPayees : responseJson.nbPayees,
            nbEnRetard : responseJson.nbEnRetard,
            nbImpayees : responseJson.nbImpayees
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any

        fetch(GLOBAL.BASE_URL_REG+"WSExercice/getExercices?ent_num="+global.currentEnt)
        .then(response => response.json())
        .then((responseJson)=> {
            if(responseJson.length>0){
                this.setState({
                    exercices : responseJson,
                    exercice_reg : responseJson[0].exe_id
                }) 
            }
        })
        .catch(error=>console.log(error)) //to catch the errors if any

    }

    _alertIndex(index) {
        Alert.alert(`hellooo`);
    }

    render() {
        global.currentScreenIndex = 0;
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
                    onPress={Actions.facturesAvoirs}
                />
            </View>

            <View style={styles.factures}>
            <Text h2 style={{textAlign:'center'}}>Factures dues</Text>
            <FacturesChart/>
            <View style={styles.legend}>
                <Badge value={this.state.nbImpayees+" Impayées"} onPress={Actions.facturesImpayees} containerStyle={{margin:10}} textStyle={{fontSize:15}} badgeStyle={{ padding:4,backgroundColor:'#f59c00'}}/>
                <Badge value={this.state.nbPayees+" Payées"} onPress={Actions.facturesPayees} textStyle={{fontSize:15}} containerStyle={{margin:10}} badgeStyle={{  padding:4,backgroundColor:'#5cb85c'}}/>  
                <Badge value={this.state.nbEnRetard+" En retard de paiement"} onPress={Actions.facturesRetards} textStyle={{fontSize:15}} containerStyle={{margin:10}} badgeStyle={{  padding:4,backgroundColor:'#db5400'}}/>  
            </View>  
            </View>

            <View style={styles.factures}>
                <Text h2 style={{textAlign:'center'}}>Règlements par an</Text>
                <View style={styles.row}>
                <Picker
                    style={{width:100}}
                    selectedValue={this.state.exercice_reg}
                    onValueChange={(exe) => this.setState({exercice_reg: exe})}>
                    {this.state.exercices.map((item) =>{
                        return(
                        <Picker.Item  label={item.exe_libelle} value={item.exe_id} key={item.exe_id}/>
                        );
                    })}
                </Picker>
                </View>
                <ReglementsChart exe_id={this.state.exercice_reg}/>
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