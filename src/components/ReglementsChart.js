import React from 'react'
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import { View } from 'react-native'

class ReglementChart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
    }

    componentWillReceiveProps(props){
        const GLOBAL = require('../../Global');
        fetch(GLOBAL.BASE_URL_REG+"WSReglement/reglementChart?ent_num="+global.currentEnt+"&exe_id="+props.exe_id)
        .then(response => response.json())
        .then((responseJson)=> {
            this.setState({
                data : responseJson
            })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    render() {
        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 100
        return (
            <View style={{ height: 300, flexDirection: 'row' }}>
                {/* <YAxis
                    data={this.state.data}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                    yAccessor={({ item }) => item.value}
                /> */} 
                <View style={{ flex: 1,padding:10, marginLeft: 5 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={this.state.data}
                        yAccessor={({ item }) => item.value}
                        contentInset={verticalContentInset}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                    >
                        <Grid/>
                    </LineChart>
                    <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                        data={this.state.data}
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                        formatLabel={(_, index) => this.state.data[ index ].label}
                    />
                </View>
            </View>
        )
    }
}

export default ReglementChart