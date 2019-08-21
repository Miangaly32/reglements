import React, { Component } from 'react';
import { StyleSheet, View,ScrollView, TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Icon,SearchBar ,Text } from 'react-native-elements';
import call from 'react-native-phone-call';
import {Actions} from 'react-native-router-flux';
import { Linking } from 'react-native';

export default class FacturesImpayees extends Component {

    constructor(props) {
        super(props);
        this.state = {
          tableHead: ['Client', 'N° facture', 'Date limite','Reste à payer','Actions'],
          tableData: [[]],
          fetching_from_server_prev: false,
          fetching_from_server_next: false,
          start :0,
          search: ''
        }
        global.currentScreenIndex = 1;
    }

    componentDidMount(){
        const GLOBAL = require('../../Global');
        fetch(GLOBAL.BASE_URL_REG+"WSFacture/listeFactures?type=2&ent_num=500002&etat=0&start="+this.state.start)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            tableData: responseJson
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    prev = () => {
        const GLOBAL = require('../../Global');
        this.setState({ fetching_from_server_prev: true , start : this.state.start - 20}, () => {
        fetch(GLOBAL.BASE_URL_REG+"WSFacture/listeFactures?type=2&ent_num=500002&etat=0&start="+this.state.start+"&search="+this.state.search)
            .then(response => response.json())
            .then(responseJson => {
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
          const GLOBAL = require('../../Global');
          this.setState({ fetching_from_server_next: true , start : this.state.start + 20}, () => {
          fetch(GLOBAL.BASE_URL_REG+"WSFacture/listeFactures?type=2&ent_num=500002&etat=0&start="+this.state.start+"&search="+this.state.search)
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
        const GLOBAL = require('../../Global');
          this.setState({start : 0}, () => {
          fetch(GLOBAL.BASE_URL_REG+"WSFacture/listeFactures?type=2&ent_num=500002&etat=0&start="+this.state.start+"&search="+search)
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

      _openMail(clt_mail){
        Linking.openURL('mailto:'+clt_mail)
      }
  
      _voirFacture(data){
        Actions.facture({fac_id: data})
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
        const element = (clt_tel,fac_id,clt_mail) => (         
            <View style={styles.action}>
                 <TouchableOpacity onPress={() => this._voirFacture(fac_id)}>
                <Icon type='ionicon' name='md-eye'/>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:5}} onPress={() => this._openMail(clt_mail)}>
                <Icon name='mail'/>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:5}} onPress={() => this._call(clt_tel)}>
                    <Icon  name='call'/> 
                </TouchableOpacity>
            </View>         
        );

        return(
            <ScrollView >
            <View style={styles.container}>
                <SearchBar
                    placeholder="Rechercher"
                    onChangeText={this._search}
                    value={this.state.search}
                />
                <Table borderStyle={{borderColor: 'transparent'}}>
                <Row widthArr={[80,65,75,110,80]} data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                {
                    state.tableData.map((rowData, index) => (
                    <TableWrapper key={index} style={styles.row}  > 
                        <Cell width={80} key={0} data={rowData.clt_societe} textStyle={styles.text}/>
                        <Cell width={65} key={1} data={rowData.fac_numero} textStyle={styles.text}/>
                        {rowData.date_limite_payement == null && rowData.fac_datelimitepaiement == null ? (
                        <Cell width={75} key={2} data={'-'} textStyle={styles.text}/>) : rowData.date_limite_payement != null ?  <Cell key={2}  width={75} data={rowData.date_limite_payement} textStyle={styles.text}/> : <Cell  width={75} key={2} data={rowData.fac_datelimitepaiement} textStyle={styles.text}/>}   
                        <Cell width={110}  key={3} data={rowData.reste} textStyle={styles.text}/>      
                        <Cell width={80}  key={4} data={ element(rowData.clt_tel,rowData.fac_id,rowData.clt_mail) } textStyle={styles.text} />
                    </TableWrapper>
                    ))
                }
                </Table>

                <View style={styles.footer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.prev()}
                    style={styles.loadMoreBtn}>
                    <Text style={styles.btnText}>Precedent</Text>
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
    head: { height: 40, backgroundColor: '#808B97' },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    text: { margin: 6 ,textAlign:'center'},
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