import React, { Component } from 'react';
import { Alert, View, StyleSheet } from 'react-native';

import Picker from './lib/Picker';
import CityPicker from './demo/CityPicker';

export default class App extends Component {
    componentDidMount () {
        //const data = {[{a: 'bbb'}]};
        // this.refs._Picker.setDataSource(data);
    }

    render() {
        return (
            <View style = {{flex: 1}}>
                <View style = {{height: 450, flexDirection: 'row'}}>
                    <View style = {{height: 350, flex: 1}}>
                        <Picker
                            data = {[{a: 'aaa'} , {a: 'bbb'}, {a: 'ccc'}]}
                            ref = '_Picker'
                            name = 'a'
                            onRowChange = {index => {
                            }}
                        />
                        <CityPicker />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
