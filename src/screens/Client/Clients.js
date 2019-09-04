import React, { Component } from 'react';
import { StyleSheet, View,ScrollView, Text, TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Icon,SearchBar  } from 'react-native-elements';
import call from 'react-native-phone-call';
import {Actions} from 'react-native-router-flux';
import { Linking } from 'react-native';

export default class Clients extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
          tableHead: ['Numéro', 'Société', 'Actions'],
          tableData: [[]],
          fetching_from_server_prev: false,
          fetching_from_server_next: false,
          start :0,
          search: ''
        }
        global.currentScreenIndex = 2;
    }
    
    componentDidMount(){
      const GLOBAL = require('../../../Global');
      fetch(GLOBAL.BASE_URL_REG+"WSClient/listeClients?ent_num="+global.currentEnt+"&start="+this.state.start)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          tableData: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
    }

    prev = () => {
      const GLOBAL = require('../../../Global');
      this.setState({ fetching_from_server_prev: true , start : this.state.start - 20}, () => {
      fetch(GLOBAL.BASE_URL_REG+"WSClient/listeClients?ent_num="+global.currentEnt+"&start="+this.state.start+"&search="+this.state.search)
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson.length);
            this.setState({
              tableData: responseJson,
              fetching_from_server_prev: false
            });
          })
          .catch(error => {
            console.error(error);
          });
      });
    };

    next = () => {
        const GLOBAL = require('../../../Global');
        this.setState({ fetching_from_server_next: true , start : this.state.start + 20}, () => {
        fetch(GLOBAL.BASE_URL_REG+"WSClient/listeClients?ent_num="+global.currentEnt+"&start="+this.state.start+"&search="+this.state.search)
            .then(response => response.json())
            .then(responseJson => {
              this.setState({
                tableData: responseJson,
                fetching_from_server_next: false
              });
            })
            .catch(error => {
              console.error(error);
            });
      });
    };

    _search = search => {
      this.setState({ search:search });
      const GLOBAL = require('../../../Global');
        this.setState({start : 0}, () => {
        fetch(GLOBAL.BASE_URL_REG+"WSClient/listeClients?ent_num="+global.currentEnt+"&start="+this.state.start+"&search="+search)
            .then(response => response.json())
            .then(responseJson => {
              this.setState({
                tableData: responseJson
              });
            })
            .catch(error => {
              console.error(error);
            });
      });
    };

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
        const element = (clt_tel,clt_id,clt_mail) => (         
            <View style={styles.action}>
                 <TouchableOpacity style={{marginLeft:20}} onPress={() => this._voirClient(clt_id)}>
                <Icon type='ionicon' name='md-eye'/>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:20}} onPress={() => this._openMail(clt_mail)}>
                <Icon type='ionicon' name='md-mail' color='red' />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:20}} onPress={() => this._call(clt_tel)}>
                    <Icon type='ionicon' name='md-call' color='green' /> 
                </TouchableOpacity>
            </View>         
        );

        return (
          <ScrollView >
          <View style={styles.container}>
            <SearchBar
              placeholder="Rechercher"
              onChangeText={this._search}
              value={this.state.search}
            />
            <Table borderStyle={{borderColor: '#f9f9f9'}} style={{marginTop:10}} >
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
            <View style={styles.footer}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.prev()}
                style={styles.loadMoreBtn}>
                <Text style={styles.btnText}>Précédent</Text>
                {this.state.fetching_from_server_prev ? (
                  <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.next()}
                style={styles.loadMoreBtn}>
                <Text style={styles.btnText}>Suivant</Text>
                {this.state.fetching_from_server_next ? (
                  <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                ) : null}
              </TouchableOpacity>
            </View>
            </View>
          </ScrollView>
        )
  }
}
     
    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: '#fff' },
      head: { height: 40, backgroundColor: '#000', },
      textHead: { margin: 6,color:'#fff' },
      text: { margin: 6 ,textAlign:'center'},
      row: { flexDirection: 'row', backgroundColor: '#fff' },
      action: { width: 58, height: 18,flexDirection: 'row' },
      list:{paddingVertical: 4, margin: 5,backgroundColor: "#fff"},
      footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      loadMoreBtn: {
        padding: 10,
        backgroundColor: '#13b5b4',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin:10
      },
      btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
      }
    });