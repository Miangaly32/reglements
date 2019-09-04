import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import {Actions} from 'react-native-router-flux';
import { AsyncStorage} from 'react-native';

class FacturesChart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            nbEnRetard: 0,
            nbPayees : 0,
            nbImpayees:0
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('ent_default').then((ent_default) => {
            if( global.currentEnt  == null && ent_default !== null){
                global.currentEnt = ent_default
            }
            
            const GLOBAL = require('../../Global');
            fetch(GLOBAL.BASE_URL_REG+"WSFacture/factureChart?ent_num="+global.currentEnt)
            .then(response => response.json())
            .then((responseJson)=> {
              this.setState({
                nbPayees : responseJson.nbPayees,
                nbEnRetard : responseJson.nbEnRetard,
                nbImpayees : responseJson.nbImpayees
              })
            })
            .catch(error=>console.log(error)) //to catch the errors if any
        });       
    }

    render() {

        const data = [
            {
                key: 1,
                amount: this.state.nbEnRetard,
                svg: { fill: '#db5400' , onPress: () => Actions.facturesRetards()}
            },
            {
                key: 2,
                amount: this.state.nbImpayees,
                svg: { fill: '#f59c00' , onPress: () => Actions.facturesImpayees()}
            },
            {

                key: 3,
                amount: this.state.nbPayees,
                svg: { fill: '#5cb85c', onPress: () => Actions.facturesPayees() },
            }
        ]
        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <Text
                    key={index} 
                    x={pieCentroid[ 0 ]}
                    y={pieCentroid[ 1 ]}
                    fill={'black'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={20}
                    stroke={'black'}
                    strokeWidth={0.2}
                    >
                        {data.amount}
                    </Text>
                )
            })
        }

        return (
            <PieChart
                style={{ height: 200 }}
                valueAccessor={({ item }) => item.amount} // onPress={() => alert('Press on Txt '+index)}
                data={data}
                spacing={0}
                outerRadius={'95%'}
            >
                <Labels />
                
            </PieChart>
            
        )
    }

}

export default FacturesChart