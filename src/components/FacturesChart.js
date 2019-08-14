import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import {Actions} from 'react-native-router-flux';

class FacturesChart extends React.PureComponent {
    render() {

        const data = [
            {
                key: 1,
                amount: 60,
                svg: { fill: '#db5400' }
            },
            {
                key: 2,
                amount: 50,
                svg: { fill: '#f59c00' }
            },
            {
                key: 3,
                amount: 40,
                svg: { fill: '#5cb85c', onPress: () => Actions.clients() },
                
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
                    fill={'white'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={24}
                    stroke={'black'}
                    strokeWidth={0.2}
                    onPress={() => alert('Press on Txt '+index)}
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