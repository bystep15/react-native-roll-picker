/**
 * Created by yjy on 16/8/3.
 *
 * props:
 *  data: 数据
 *  name: rowData[name] 返回列表数据
 *  onRowChange: (index) => {} 被选中的index
 *
 * method:
 *  setDataSource(data): 刷新数据
 *
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';

import {CSS} from './CSS'

export default class Picker extends Component {
    constructor(props) {
        super(props);
        let data = props.data;
        this.state = {
            data: data
        };
    }

    setDataSource(data) {
        if(this.refs._ScrollView) {
            this.refs._ScrollView.scrollTo({y: 0, animated: false});
        }
        this.setState({data: data});
    }

    getItem(size) {
        if(this.state.data.length == 0) {
            return false;
        }
        let arr = this.state.data;
        return arr.map((item, i) => {
            return (
                <View key={i} style={{height: 25, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: size == 'big' ? CSS.pixel(28) : CSS.pixel(22), color: size == 'big' ? '#4a4a4a' : '#a0a0a0', backgroundColor: 'rgba(0,0,0,0)'}}>
                        {this.props.name ? item[this.props.name] : item}
                    </Text>
                </View>
            )
        })
    }

    _onScrollEndDrag(e) {
        console.log('_onScrollEndDrag');
        let y = e.nativeEvent.contentOffset.y;
        this._onScrollEnd(y);
    }

    _onMomentumScrollEnd(e) {
        console.log('_onMomentumScrollEnd');
        let y = e.nativeEvent.contentOffset.y;
        this._onScrollEnd(y);
    }

    _onScroll(e) {
        console.log('_onScroll');
        let y = e.nativeEvent.contentOffset.y;
        if(this.refs._ScrollView2) {
            this.refs._ScrollView2.scrollTo({y: y, animated: false});
        }
    }

    _onScrollEnd(y) {
        let y1 = y-(y%25);
        if(y%25 > 12.5) {y1 = y1+25;}
        let index = y1/25;
        if(this.refs._ScrollView) {
            this.refs._ScrollView.scrollTo({y: y1, animated: false});
        }
        if (this.props.onRowChange) {
            this.props.onRowChange(index);
        }
    }

    _selectTo(index) {
        let y = index*25;
        if(this.refs._ScrollView) {
            this.refs._ScrollView.scrollTo({y, animated: false});
        }
    }

    componentDidMount() {
        if(this.props.selectTo) {
            this._selectTo(this.props.selectTo);
        }
    }

    render() {
        return (
            <View style = {{flex: 1}}>
                <View style = {{height: 225, backgroundColor: '#ffffff'}}>
                    <ScrollView
                        bounces = {false}
                        showsVerticalScrollIndicator = {false}
                        scrollEventThrottle = {16}
                        snapToInterval={25}
                        snapToAlignment='start'
                        scrollsToTop={false}
                        onScrollEndDrag = {(e) => {this._onScrollEndDrag(e)}}
                        onMomentumScrollEnd = {(e) => {this._onMomentumScrollEnd(e)}}
                        onScroll = {(e) => {this._onScroll(e)}}
                        ref = '_ScrollView'
                    >
                        <View style = {{height: 100}} />
                        {this.getItem('small')}
                        <View style = {{height: 100}} />
                    </ScrollView>
                </View>
                <View style = {{height: 25, marginTop: -125, backgroundColor: '#ffffff'}} pointerEvents = 'none' >
                    <View style = {{height: CSS.pixel(1), backgroundColor: '#a2a2a2'}} />
                    <ScrollView
                        showsVerticalScrollIndicator = {false}
                        ref = '_ScrollView2'
                        snapToInterval={25}
                        snapToAlignment='start'
                        scrollsToTop={false}
                    >
                        {this.getItem('big')}
                    </ScrollView>
                    <View style = {{height: CSS.pixel(1), backgroundColor: '#a2a2a2'}} />
                </View>
                <View style = {{height: 100}}  pointerEvents = 'none' />
            </View>
        )
    }
}
