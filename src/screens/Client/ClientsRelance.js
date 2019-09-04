import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Icon } from 'react-native-elements';
import call from 'react-native-phone-call';
import {Actions} from 'react-native-router-flux';
import { Linking } from 'react-native';

export default class ClientsRelance extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tableHead: ['Numéro', 'Société', 'Actions'],
          tableData: [[]]
        }
        global.currentScreenIndex = 2;
    }
    
    componentDidMount(){
      const GLOBAL = require('../../../Global');
      fetch(GLOBAL.BASE_URL_REG+"WSFacture/clientsARelancer?ent_num="+global.currentEnt)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          tableData: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
    }
    
    _voirClient(data){
      Actions.situationClient({clt_id: data})
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

    _openMail(clt_mail){
      Linking.openURL('mailto:'+clt_mail)
    }

    render() {
        const state = this.state;
        const element = (tel,clt_id,mail) => (         
            <View style={styles.action}>
                <TouchableOpacity style={{marginLeft:5}} onPress={() => this._voirClient(clt_id)}>
                <Icon type='ionicon' name='md-eye'/>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:20}} onPress={() => this._openMail(mail)}>
                <Icon type='ionicon' name='md-mail' color='red'/>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:20}} onPress={() => this._call(tel)}>
                    <Icon type='ionicon' name='md-call' color='green'/> 
                 </TouchableOpacity>
            </View>         
        );

        return (
          <View style={styles.container}>
            <View style={{margin:10}}>
                <Text h4>Liste des clients ayant des factures en retard de paiement ou dont l'échéance est bientôt</Text>
            </View>
            
            <Table borderStyle={{borderColor: '#f9f9f9'}}>
              <Row widthArr={[75,200,150]} data={state.tableHead} style={styles.head} textStyle={styles.textHead}/>
              {
                 state.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}  > 
                      <Cell width={75} key={0} data={rowData.clt_numero} textStyle={styles.text}/>
                       <Cell width={200} key={1} data={rowData.clt_societe} textStyle={styles.text}/>
                       <Cell width={150} key={2} data={ element(rowData.clt_tel,rowData.clt_id,rowData.clt_mail) } textStyle={styles.text} />
                  </TableWrapper>
                ))
              }
            </Table>
          </View>
        )
  }
}
     
    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: '#fff' },
      head: { height: 40, backgroundColor: '#000'},
      textHead: { margin: 6,color:'#fff' },
      text: { margin: 6 ,textAlign:'center'},
      row: { flexDirection: 'row', backgroundColor: '#fff' },
      action: { width: 58, height: 18,flexDirection: 'row'},
      footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
      }
    });