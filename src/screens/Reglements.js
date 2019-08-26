import React, { Component } from 'react';
import { StyleSheet, View,ScrollView, TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Icon,SearchBar ,Text } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

export default class Reglements extends Component {

    constructor(props) {
        super(props);
        this.state = {
          tableHead: ['Client', 'N° facture', 'Montant','Montant disponible','Actions'],
          tableData: [[]],
          fetching_from_server_prev: false,
          fetching_from_server_next: false,
          start :0,
          search: ''
        }
        global.currentScreenIndex = 3;
    }

    componentDidMount(){
        const GLOBAL = require('../../Global');
        fetch(GLOBAL.BASE_URL_REG+"WSReglement/listeReglements?ent_num="+global.currentEnt+"&start="+this.state.start)
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
        fetch(GLOBAL.BASE_URL_REG+"WSReglement/listeReglements?ent_num="+global.currentEnt+"&start="+this.state.start+"&search="+this.state.search)
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
          fetch(GLOBAL.BASE_URL_REG+"WSReglement/listeReglements?ent_num="+global.currentEnt+"&start="+this.state.start+"&search="+this.state.search)
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
          fetch(GLOBAL.BASE_URL_REG+"WSReglement/listeReglements?ent_num="+global.currentEnt+"&start="+this.state.start+"&search="+search)
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

      _alertIndex(data) {
        Alert.alert(data);
      }
  
    _voir(data){
    Actions.reglement({regc_id: data})
    }

    style(data){
      if(data.reg_erreur!=null){
        if(data.reg_erreur.length == 0){
            return {
                margin: 6 ,textAlign:'center'
            }           
        }else{
            return {
                margin: 6 ,textAlign:'center',color:'red'
            } 
        }
      }
    }
  
	render() {
        const state = this.state;
       
        const element = (regc_id) => (         
            <View style={styles.action}>
                <TouchableOpacity onPress={() => this._voir(regc_id)}>
                    <Icon type='ionicon' name='md-eye'/>
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
                <Row widthArr={[80,65,105,105,60]} data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                {
                    state.tableData.map((rowData, index) => (
                    <TableWrapper key={index} style={styles.row}  > 
                        <Cell width={80} key={0} data={rowData.clt_societe} textStyle={this.style(rowData)}/>
                        <Cell width={65} key={1} data={rowData.facture} textStyle={this.style(rowData)}/>
                        <Cell width={105}  key={2} data={rowData.regc_montant} textStyle={this.style(rowData)}/>     
                        <Cell width={105}  key={3} data={rowData.montant_disponible} textStyle={this.style(rowData)}/>   
                        <Cell width={60}  key={4} data={ element(rowData.regc_id) } />                  
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
    textred: { margin: 6 ,textAlign:'center',color:'red'},
    action: { width: 58, height: 18,flexDirection: 'row',alignItems:'center',justifyContent  : 'center' },
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
      margin:10
    },
    btnText: {
      color: 'white',
      fontSize: 15,
      textAlign: 'center',
    }
  });

  const style = styles.text;