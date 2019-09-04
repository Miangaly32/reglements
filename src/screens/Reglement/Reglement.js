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
        global.currentScreenIndex = 3;
    }

    componentDidMount(){
        const GLOBAL = require('../../../Global');
        fetch(GLOBAL.BASE_URL_REG+"WSReglement/getReglement?ent_num="+global.currentEnt+"&regc_id="+this.props.regc_id)
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

        const erreurinfo = (erreur)=>(
            <View style={{marginTop:10}}>
                <Text h4>Détails sur l'erreur de règlement</Text>
                <Text>Date erreur : {erreur.reg_err_date}</Text>
                <Text>Motif : {erreur.reg_err_motif}</Text>
                <Text>Saisi par : {erreur.utilisateur.util_prenom+' '+erreur.utilisateur.util_nom}</Text>
            </View>
        )

        return(
            <View style={styles.container}>
                <View style={{marginTop:10}}>
                    <Text h4>Informations sur le règlement</Text>
                    <Text>Libelle du règlement : {state.reglement.regc_libelle}</Text>
                    <Text>Mode du règlement : {state.reglement.mod_libelle}</Text>
                    <Text>Date de l'opération : {state.reglement.regc_dateoperation}</Text>
                </View>
                <View style={{marginTop:10}}>
                    <Text h4>Détails des paiements</Text>
                    <Table borderStyle={{borderColor: '#f9f9f9'}}>
                    <Row  data={state.tableHead} style={styles.head} textStyle={styles.textHead}/>
                    {
                        state.tableData.map((ventilation, index) => (
                            <TableWrapper key={index} style={styles.row}  >  
                                {ventilation.facture != null ? ( <Cell key={0} data={ventilation.facture.fac_numero} textStyle={styles.text}/>):<Cell key={0} data='-' textStyle={styles.text}/>}
                                {ventilation.facture != null ? ( <Cell key={1} data={ventilation.facture.montantTTC} textStyle={styles.text}/>):<Cell key={1} data='-' textStyle={styles.text}/>}
                                <Cell key={2} data={ventilation.ventc_montant} textStyle={styles.text}/> 
                            </TableWrapper>
                        ))
                    }
                    </Table>
                </View>
            {state.reglement.erreur != null ? ( erreurinfo(state.reglement.erreur)) : <View></View>}               
            </View>
        )
	}
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding:5
    },
    head: { height: 40, backgroundColor: '#000'},
    textHead: { margin: 6,color:'#fff' },
    text: { margin: 6 ,textAlign:'center'},
    row: { flexDirection: 'row', backgroundColor: '#fff' }
});