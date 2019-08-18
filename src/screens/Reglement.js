import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

export default class Reglement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reglement: '',
            tableHead: ['N° facture', 'Date facture','Montant payé'],
            tableData: [[]],
        } 
    }

    componentDidMount(){
        const GLOBAL = require('../../Global');
        fetch(GLOBAL.BASE_URL_REG+"WSReglement/getReglement?ent_num=500002&regc_id="+this.props.regc_id)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            reglement: responseJson,
            tableData:responseJson.ventilations
          })
         
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }


	render() {
        const state = this.state;
        return(
            <View style={styles.container}>
                <Text>Mode du règlement {state.reglement.mod_libelle}</Text>
                <Text>Date de l'opération {state.reglement.regc_dateoperation}</Text>
                <Table borderStyle={{borderColor: 'transparent'}}>
                {ventilation.facture != null ? '' :''}
                {/* widthArr={[80,65,105,105,60]} */}
                <Row  data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                {
                    state.tableData.map((ventilation, index) => (
                        <TableWrapper key={index} style={styles.row}  >  
                            {ventilation.facture != null ? ( <Cell key={0} data={ventilation.facture.fac_numero} textStyle={styles.text}/>):<Cell key={0} data='-' textStyle={styles.text}/>}
                            {ventilation.facture != null ? ( <Cell key={1} data={ventilation.facture.montantTTC} textStyle={styles.text}/>):<Cell key={1} data='-' textStyle={styles.text}/>}
                            <Cell key={2} data={ventilation.ventc_montant} textStyle={styles.text}/> 
                        </TableWrapper>
                    ))
                    // state.tableData.map((rowData, index) => (console.log(rowData)
                    //     // <TableWrapper key={index} style={styles.row}  > 
                    //     //     <Cell key={0} data={rowData.facture.fac_numero} textStyle={styles.text}/>
                    //     //     <Cell key={1} data={rowData.facture.montantTTC} textStyle={styles.text}/>
                    //     //     <Cell key={2} data={rowData.ventc_montant} textStyle={styles.text}/> 
                    //     // </TableWrapper>
                    // ))
                }
                </Table>
            </View>
        )
	}
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 ,textAlign:'center'},
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' }
});