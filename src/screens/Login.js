import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
 
import {Actions} from 'react-native-router-flux';


export default class Login extends Component {
  constructor(props){        
		super(props);        
		this.state={            
			email:'',
			password: ''        
		}   
  }
    
  login = async() =>{
    const {email,password} = this.state;
     if (email != null && password != null)
    {
      Actions.accueil()
    }
  }

	render() {
        return(
                <View style={styles.container}>
                <Image
                  style={{width: 100, height: 100}}
                  source={require('../../assets/REGLEMENT.png')}
                />
                <Text style={{padding:20}}>MANAO REGLEMENT</Text>
                
                <TextInput style={styles.inputBox}
                onChangeText={(email) => this.setState({email})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Identifiant"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
                onSubmitEditing={()=> this.password.focus()}/>
                
                <TextInput style={styles.inputBox}
                onChangeText={(password) => this.setState({password})} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Mot de passe"
                secureTextEntry={true}
                placeholderTextColor = "#002f6c"
                ref={(input) => this.password = input}
                />
 
                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.login}>Connexion</Text>
                </TouchableOpacity>

            </View>
        )
	}
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  inputBox: {
      width: 300,
      backgroundColor: '#eeeeee', 
      borderRadius: 25,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#002f6c',
      marginVertical: 10
  },
  button: {
      width: 300,
      backgroundColor: '#12799f',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12
  },
  buttonText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#ffffff',
      textAlign: 'center'
  }
});