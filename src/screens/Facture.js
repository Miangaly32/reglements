import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default class Facture extends Component {
    constructor(props) {
        super(props);
    }

	render() {
        return(
            <View style={styles.container}>
                <Text>Facture {this.props.fac_id}</Text>
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