import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Icon } from 'react-native-elements';

export default class Clients extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tableHead: ['Numero', 'Societe', 'Actions'],
          tableData: [
            ['00001', 'Manao', '3' ],
            ['00002', 'Go Travel', 'c'],
            ['00003', 'Association Fanamby', '3']
          ]
        }
      }
     
    _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
    }
     
    render() {
        const state = this.state;
        const element = (data, index) => (
         
            <View style={styles.action}>
                <TouchableOpacity onPress={() => this._alertIndex(index)}>
                <Icon name='mail'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._alertIndex(index)}>
                    <Icon style={{margin:50}} name='call'/> 
                 </TouchableOpacity>
            </View>
         
        );
     
        return (
          <View style={styles.container}>
            <Table borderStyle={{borderColor: 'transparent'}}>
              <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
              {
                state.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    {
                      rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 2 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                      ))
                    }
                  </TableWrapper>
                ))
              }
            </Table>
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
      btnText: { textAlign: 'center', color: '#fff' }
    });