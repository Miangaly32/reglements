import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

export default class Facture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facture: ''
        }
        global.currentScreenIndex = 1;
    }

    componentDidMount(){
        const GLOBAL = require('../../Global');
        fetch(GLOBAL.BASE_URL_REG+"WSFacture/getFacture?ent_num=500002&fac_id="+this.props.fac_id)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            facture: responseJson
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }


	render() {
        const facture = this.state.facture;
        return(
            <View style={styles.container}>
                <View>
                    {facture.typf_id==1 ? (<Text h4>Facture due N° {facture.fac_numero}</Text> ) : (<Text h4>Facture d'avoir N° {facture.fac_numero}</Text> )}
                    <Text h4>Date : {facture.fac_date}</Text>
                </View>
               
                <View style={{marginTop:20}}>
                    <View style={{flexDirection: 'row'}}> <Text h5>Code client:</Text> <Text>{facture.clt_numero}</Text> </View>
                    <Text h5>Société: {facture.clt_societe}</Text>
                    <Text h5>Mail: {facture.clt_mail}</Text>
                    <Text h5>Tel:  {facture.clt_tel}</Text>
                </View>

                <View style={{marginTop:20}}>
                    <Text h5>Montant de la facture: {facture.montantTTC}</Text>
                    <Text h5>Etat: {facture.etatregfac_id && facture.dateDernierPayement ? 'Payé par règlement' : facture.etatregfac_id && facture.dateDernierPayement ? 'Payé par initialisation' : 'Impayé'}</Text>
                    <Text h5>Montant payé: {facture.totalmontantpaye}</Text>
                    <Text h5>Reste à payer: {facture.reste}</Text>
                    <Text h5>Date limite de paiement: {facture.date_limite_payement == null && facture.fac_datelimitepaiement == null ? '-' : facture.date_limite_payement != null ? facture.date_limite_payement  : facture.fac_datelimitepaiement}</Text>
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