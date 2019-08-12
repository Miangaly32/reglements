import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert,FlatList } from 'react-native';
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
    
    componentDidMount(){
      fetch("http://reglements_local.manao.eu:83/index.php/ws/WSClient/clientsARelancer?ent_num=500002")
      // fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
         loading: false,
         dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
    }

    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
           backgroundColor:"rgba(0,0,0,0.5)",
      }}
      />
      );
      }
      renderItem=(data)=>
      <TouchableOpacity style={styles.list}>
      <Text style={styles.lightText}>{data.item.clt_numero}</Text>
      <Text style={styles.lightText}>{data.item.clt_societe}</Text></TouchableOpacity>
     
      render() {
        if(this.state.loading){
        return( 
          <View style={styles.loader}> 
            <ActivityIndicator size="large" color="#0c9"/>
          </View>
          )}

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

            <FlatList
              data= {this.state.dataSource}
              ItemSeparatorComponent = {this.FlatListItemSeparator}
              renderItem= {item=> this.renderItem(item)}
              keyExtractor= {item=>item.clt_id.toString()}
          />
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
      btnText: { textAlign: 'center', color: '#fff' },
      list:{paddingVertical: 4, margin: 5,backgroundColor: "#fff"}
    });