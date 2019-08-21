import React, { Component } from 'react';
import { StyleSheet, ScrollView,View,Dimensions} from 'react-native';
import { CardViewWithIcon } from "react-native-simple-card-view";
import {Text} from 'react-native-elements';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Linking } from 'react-native';
import call from 'react-native-phone-call';

export default class SituationClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            client : '',
            situation:'',
            tableHead: ['Numero', 'Date limite', 'Montant', 'Reste à payer'],
            tableData: [[]]
        }
        global.currentScreenIndex = 2;
    }

    componentDidMount(){
        const GLOBAL = require('../../Global');
        fetch(GLOBAL.BASE_URL_REG+"WSClient/situationClient?ent_num=500002&clt_id="+this.props.clt_id)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            situation: responseJson
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any

        fetch(GLOBAL.BASE_URL_REG+"WSClient/getClient?ent_num=500002&clt_id="+this.props.clt_id)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            client: responseJson
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any

        fetch(GLOBAL.BASE_URL_REG+"WSFacture/listeFactures?ent_num=500002&clt_id="+this.props.clt_id+"&etat=1")
        .then(response => response.json())
        .then((responseJson)=> {
            this.setState({
                tableData: responseJson
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
        const cardStyle = {
            shadowColor       : '#000000',
            shadowOffsetWidth : 2,
            shadowOffsetHeight: 2,
            shadowOpacity     : 0.1,
            hadowRadius      : 5,
            bgColor           : '#ffffff',
            padding           : 5,
            margin            : 5,
            borderRadius      : 6,
            elevation         : 3,
            width             : (Dimensions.get("window").width / 2) - 10
        };

        return(
            <ScrollView >
            <View style={styles.container}>
                <Text h2 style={{textAlign:'center'}}>Client : {this.state.client.clt_numero} {this.state.client.clt_societe}</Text>
                <View style={styles.situation}>
                    <CardViewWithIcon
                        withBackground={ false }
                        androidIcon={ 'md-list' }
                        iconHeight={ 30 }
                        iconColor={ '#1e88e5' }
                        title={ 'Factures' }
                        contentFontSize={ 20 }
                        titleFontSize={ 18 }
                        style={ cardStyle }
                        content={this.state.situation.totalMontantFactures}
                    />
                    <CardViewWithIcon
                        withBackground={ false }
                        androidIcon={ 'md-copy' }
                        iconHeight={ 30 }
                        iconColor={ '#7460ee' }
                        title={ 'Règlements ventilés' }
                        contentFontSize={ 20 }
                        titleFontSize={ 18 }
                        style={ cardStyle }
                        content={this.state.situation.totalMontantReglements}
                    />
                </View>
                <View style={styles.situation}>
                    <CardViewWithIcon
                        withBackground={ false }
                        androidIcon={ 'md-copy' }
                        iconHeight={ 30 }
                        iconColor={ '#1e88e5' }
                        title={ 'Règlements non ventilés' }
                        contentFontSize={ 20 }
                        titleFontSize={ 18 }
                        style={ cardStyle }
                        content={this.state.situation.totalMontantReglements}
                    />
                    <CardViewWithIcon
                        withBackground={ false }
                        androidIcon={ 'logo-usd' }
                        iconHeight={ 30 }
                        iconColor={ '#1e88e5' }
                        title={ 'Solde' }
                        contentFontSize={ 20 }
                        titleFontSize={ 18 }
                        style={cardStyle }
                        content={this.state.situation.solde}
                    />
                </View>
                <View style={styles.situation}>
                    <CardViewWithIcon
                        withBackground={ false }
                        androidIcon={ 'ios-mail' }
                        iconHeight={ 30 }
                        iconColor={ 'red' }
                        title={ 'Contacter par email' }
                        titleFontSize={ 20 }
                        style={ cardStyle }
                        onPress={() => this._openMail(this.state.client.clt_mail)}
                    />
                    <CardViewWithIcon
                        withBackground={ false }
                        androidIcon={ 'ios-call' }
                        iconHeight={ 30 }
                        iconColor={ 'green' }
                        title={ 'Appler' }
                        titleFontSize={ 20 }
                        style={ cardStyle }
                        onPress={() => this._call(this.state.client.clt_tel)}
                    />
                </View>
                <Text h3 style={{textAlign:'center'}}>Factures impayées</Text>
                <Table borderStyle={{borderColor: 'transparent'}}>
                    <Row widthArr={[70,75,140,140]} data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                    {
                        this.state.tableData.map((rowData, index) => (
                        <TableWrapper key={index} style={styles.row}  > 
                            <Cell width={70} key={0} data={rowData.fac_numero} textStyle={styles.text}/>
                            {rowData.date_limite_payement == null && rowData.fac_datelimitepaiement == null ? (
                            <Cell width={75} key={1} data={'-'} textStyle={styles.text}/>) : rowData.date_limite_payement != null ?  <Cell width={75} key={1} data={rowData.date_limite_payement} textStyle={styles.text}/> : <Cell width={75} key={1} data={rowData.fac_datelimitepaiement} textStyle={styles.text}/>}   
                            <Cell width={140} key={2} data={rowData.montantTTC} textStyle={styles.text}/>
                            <Cell width={140} key={3} data={rowData.reste} textStyle={styles.text}/>                        
                        </TableWrapper>
                        ))
                    }
                </Table>
            </View>
         </ScrollView>
        )
	}
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 3, backgroundColor: '#fff' },
    situation: { flexDirection: 'row', marginTop:20,alignItems:'center',justifyContent  : 'center' },
    text: { margin: 6 ,textAlign:'center'},
    head: { height: 40, backgroundColor: '#808B97' },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' }
});