import React, { Component } from 'react';
import { StyleSheet, View, Dimensions} from 'react-native';
import { CardViewWithIcon } from "react-native-simple-card-view";
import {Text} from 'react-native-elements';
import { Linking } from 'react-native';
import call from 'react-native-phone-call';

export default class Facture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facture: ''
        }
        global.currentScreenIndex = 1;
    }

    componentDidMount(){
        const GLOBAL = require('../../../Global');
        fetch(GLOBAL.BASE_URL_REG+"WSFacture/getFacture?ent_num="+global.currentEnt+"&fac_id="+this.props.fac_id)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            facture: responseJson
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    _openMail(clt_mail){
        Linking.openURL('mailto:'+clt_mail)
    }

    _call(number){
        if(number!==''){
          const args = {
            number: number, // String value with the number to call
            prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
          }
          call(args).catch(console.error)
        }else{
          this._alertIndex('Aucun numero de telephone fourni')
        }
      }

	render() {
        const facture = this.state.facture;
        const cardStyle = {
            shadowColor       : '#000000',
            shadowOffsetWidth : 2,
            shadowOffsetHeight: 2,
            shadowOpacity     : 0.1,
            hadowRadius       : 5,
            bgColor           : '#ffffff',
            padding           : 5,
            margin            : 5,
            borderRadius      : 6,
            elevation         : 3,
            width             : (Dimensions.get("window").width / 3) - 10
        };

        return(
            <View style={styles.container}>
                <View>
                    {facture.typf_id==1 ? (<Text h4>Facture due N° {facture.fac_numero}</Text> ) : (<Text h4>Facture d'avoir N° {facture.fac_numero}</Text> )}
                    <Text h4>Date : {facture.fac_date}</Text>
                </View>
               
                <View style={{marginTop:20}}>
                    <View style={{flexDirection: 'row'}}> 
                        <Text h4>Code client : {facture.clt_numero}</Text> 
                    </View>
                    <Text h4>Société : {facture.clt_societe}</Text>
                    <Text h4>Mail : {facture.clt_mail}</Text>
                    <Text h4>Tel :  {facture.clt_tel}</Text>
                </View>
 
                <View style={{marginTop:20}}>
                    <Text h4>Montant de la facture : {facture.montantTTC}</Text>
                    <Text h4>Etat : {facture.etatregfac_id==1 && facture.dateDernierPayement ? 'Payé par règlement' : facture.etatregfac_id==1 && !facture.dateDernierPayement ? 'Payé par initialisation' : facture.etatregfac_id==0 && facture.dateDernierPayement ? 'Payé partiellement' : 'Impayé'}</Text>
                    <Text h4>Montant payé : {facture.totalmontantpaye}</Text>
                    <Text h4>Date de dernier paiement : {facture.dateDernierPayement ? facture.dateDernierPayement : '-' }</Text>
                    <Text h4>Reste à payer : {facture.reste}</Text>
                    <Text h4>Date limite de paiement : {facture.date_limite_payement == null && facture.fac_datelimitepaiement == null ? '-' : facture.date_limite_payement != null ? facture.date_limite_payement  : facture.fac_datelimitepaiement}</Text>
                </View>
                 
                <View style={{flexDirection: 'row', marginTop:20,alignItems:'center',justifyContent  : 'center'}}>
                     <CardViewWithIcon
                        withBackground={ false }
                        androidIcon={ 'ios-mail' }
                        iconHeight={ 30 }
                        iconColor={ 'red' }
                        title={ 'Contacter le client par email' }
                        titleFontSize={ 20 }
                        style={ cardStyle }
                        onPress={() => this._openMail(facture.clt_mail)}
                    />
                    <CardViewWithIcon
                        withBackground={ false }
                        androidIcon={ 'ios-call' }
                        iconHeight={ 30 }
                        iconColor={ 'green' }
                        title={ 'Appeler le client' }
                        titleFontSize={ 20 }
                        style={ cardStyle }
                        onPress={() => this._call(facture.clt_tel)}
                    />
                </View>
            </View>
        )
	}
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding:5
    }
});