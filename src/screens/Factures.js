import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default class Factures extends Component {
    componentDidMount(){
        fetch("http://192.168.43.68:83/index.php/ws/WSFacture/listeFactures?ent_num=500002")
        .then(response => response.json())
        .then((responseJson)=> {
          console.log(responseJson);
          this.setState({
           loading: false,
           dataSource: responseJson
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

	render() {
        return(
            <View style={styles.container}>
                <Text>Factures</Text>
            </View>
        )
	}
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    }
});