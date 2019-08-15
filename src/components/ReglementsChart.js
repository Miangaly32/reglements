import React from 'react'
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import { View } from 'react-native'

class ReglementChart extends React.PureComponent {
 
    render() {
 
        
        const data = [
            {
                value: 50,
                label: 'One',
            },
            {
                value: 10,
                label: 'Two',
            },
            {
                value: 40,
                label: 'Three',
            },
            {
                value: 95,
                label: 'Four',
            },
            {
                value: 85,
                label: 'Five',
            },
            {
                value: 85,
                label: 'Five',
            },
            {
                value: 85,
                label: 'Five',
            },
            {
                value: 85,
                label: 'Five',
            },
            {
                value: 85,
                label: 'Five',
            },
            {
                value: 85,
                label: 'Five',
            },
            {
                value: 85,
                label: 'Five',
            },
            {
                value: 85,
                label: 'Five',
            }
        ]


        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30

        return (
            <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
                {/* <YAxis
                    data={data}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                    yAccessor={({ item }) => item.value}
                /> */}
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={data}
                        yAccessor={({ item }) => item.value}
                        contentInset={verticalContentInset}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                    >
                        <Grid/>
                    </LineChart>
                    <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                        data={data}
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                        formatLabel={(_, index) => data[ index ].label}
                    />
                </View>
            </View>
        )
    }
}

export default ReglementChart