import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

export default class Facture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facture: ''
        }
    }

    componentDidMount(){
        const GLOBAL = require('../../Global');
        fetch(GLOBAL.BASE_URL_REG+"WSFacture/getFacture?ent_num=500002&fac_id="+this.props.fac_id)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            facture: responseJson
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }


	render() {
        return(
            <View style={styles.container}>
                <Text h2>Facture numéro {this.state.facture.fac_numero}</Text>
                
            </View>
        )
	}
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    }
});