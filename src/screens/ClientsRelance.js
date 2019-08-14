import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Icon } from 'react-native-elements';
import call from 'react-native-phone-call';

export default class ClientsRelance extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tableHead: ['Numero', 'Societe', 'Actions'],
          tableData: [[]],
          fetching_from_server: false
        }
    }
    
    componentDidMount(){
      const GLOBAL = require('../../Global');
      fetch(GLOBAL.BASE_URL_REG+"WSClient/clientsARelancer?ent_num=500002")
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          tableData: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
    }

    _alertIndex(data) {
      Alert.alert(data);
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
        const state = this.state;
        const element = (data) => (         
            <View style={styles.action}>
                <TouchableOpacity onPress={() => this._alertIndex(data)}>
                <Icon type='ionicon' name='md-eye'/>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:20}} onPress={() => this._alertIndex(data)}>
                <Icon name='mail'/>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:20}} onPress={() => this._call(data)}>
                    <Icon  name='call'/> 
                 </TouchableOpacity>
            </View>         
        );

        return (
          <View style={styles.container}>
            <Table borderStyle={{borderColor: 'transparent'}}>
              <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
              {
                 state.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}  > 
                       <Cell key={0} data={rowData.clt_numero} textStyle={styles.text}/>
                       <Cell key={1} data={rowData.clt_societe} textStyle={styles.text}/>
                       <Cell key={2} data={ element(rowData.clt_tel) } textStyle={styles.text} />
                  </TableWrapper>
                ))
              }
            </Table>
            <View style={styles.footer}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this._alertIndex('load more data')}
                //On Click of button calling loadMoreData function to load more data
                style={styles.loadMoreBtn}>
                <Text style={styles.btnText}>Suivant</Text>
                {this.state.fetching_from_server ? (
                  <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                ) : null}
              </TouchableOpacity>
            </View>
          </View>
        )
  }
}
     
    const styles = StyleSheet.create({
      container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
      head: { height: 40, backgroundColor: '#808B97' },
      text: { margin: 6 },
      row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
      action: { width: 58, height: 18,flexDirection: 'row' },
      footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      loadMoreBtn: {
        padding: 10,
        backgroundColor: '#800000',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
      }
    });