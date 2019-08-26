import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';
import {Text} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import { AsyncStorage} from 'react-native';

export default class Login extends Component {
  constructor(props){        
		super(props);        
		this.state={            
			login:'',
			password: ''        
    }   
  
  }
  
  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  login = async() =>{
    const {login,password} = this.state;
    const GLOBAL = require('../../Global');
    fetch(GLOBAL.BASE_URL_COMPTE+"WSAuth/login", {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: "login="+login+"&password="+password 
    }).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson!=null){
        fetch(GLOBAL.BASE_URL_REG+"WSAuth/obtenirInfoUtilisateur", {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
          body: "ent_num="+responseJson.ent_default+"&util_id="+responseJson.util_id 
        }).then((response) => response.json())
        .then((responseData) => {
            if(responseData==1){
              this.saveItem('util_id', responseJson.util_id)
              this.saveItem('ent_default', responseJson.ent_default)
              this.saveItem('cli_num', responseJson.cli_num)
              this.saveItem('util_nom', responseJson.util_prenom+" "+responseJson.util_nom)
              this.saveItem('util_mail', responseJson.util_mail)

              Actions.accueil()
            }else if(responseData==4){
              alert("L'entreprise n'a pas accès au logiciel")
            }else{
              alert("L'utilisateur n'a pas accès au logiciel")
            }
          } 
        )
        .catch((error) => {
          console.error(error);
        })
      }
      else{
        alert("Vérifiez votre identifiant ou mot de passe")
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

	render() {
        return(
                <View style={styles.container}>
                <Image
                  style={{width: 100, height: 100}}
                  source={require('../../assets/REGLEMENT.png')}
                />
                <Text h4 style={{margin:10}}>MANAO REGLEMENT</Text>
                
                <TextInput style={styles.inputBox}
                onChangeText={(login) => this.setState({login})}
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