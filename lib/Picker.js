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
    FlatList,
} from 'react-native';

import {CSS} from './CSS'

export default class Picker extends Component {
    constructor (props) {
        super(props);
        let data = props.data;
        this.state = {
            data: data,
            initIndex: props.initIndex || 0,
        };
    }

    setDataSource (data) {
        if(this.refs._FlatList) {
            this.refs._FlatList.scrollToOffset({offset: 0, animated: false});
        }
        this.setState({data: data});
    }

    getItem (size, {item}) {
        return (
            <View style={{height: 25, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: size == 'big' ? CSS.pixel(28) : CSS.pixel(22), color: size == 'big' ? '#4a4a4a' : '#a0a0a0', backgroundColor: 'rgba(0,0,0,0)'}}>
                    {this.props.name ? item[this.props.name] : item}
                </Text>
            </View>
        );
    }

    _onScrollEndDrag (e) {
        console.log('_onScrollEndDrag');
        let y = e.nativeEvent.contentOffset.y;
        this._onScrollEnd(y);
    }

    _onMomentumScrollEnd (e) {
        console.log('_onMomentumScrollEnd');
        let y = e.nativeEvent.contentOffset.y;
        this._onScrollEnd(y);
    }

    _onScroll (e) {
        console.log('_onScroll');
        let y = e.nativeEvent.contentOffset.y;
        if(this.refs._FlatList2) {
            this.refs._FlatList2.scrollToOffset({offset: y, animated: false});
        }
    }

    _onScrollEnd (y) {
        let y1 = y-(y%25);
        if(y%25 > 12.5) {y1 = y1+25;}
        let index = y1/25;
        if(this.refs._FlatList) {
            this.refs._FlatList.scrollToOffset({offset: y1, animated: false});
        }
        if(this.refs._FlatList2) {
            this.refs._FlatList2.scrollToOffset({offset: y1, animated: false});
        }
        if (this.props.onRowChange) {
            this.props.onRowChange(index);
        }
    }

    _selectTo (index) {
        if(this.refs._FlatList) {
            this.refs._FlatList.scrollToIndex({index, animated: false});
        }
    }

    componentDidMount () {
        if(this.props.selectTo) {
            this._selectTo(this.props.selectTo);
        }
    }

    render () {
        return (
            <View style={{position: 'relative', height: 255, flex: 1}}>
                <FlatList
                    style={{flex: 1, backgroundColor: '#ffffff'}}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={32}
                    snapToInterval={25}
                    snapToAlignment='start'
                    scrollsToTop={false}
                    onScrollEndDrag={(e) => {this._onScrollEndDrag(e)}}
                    onMomentumScrollEnd={(e) => {this._onMomentumScrollEnd(e)}}
                    onScroll={(e) => {this._onScroll(e)}}
                    ref='_FlatList'
                    contentContainerStyle={{paddingVertical: 100}}
                    data={this.state.data}
                    renderItem={this.getItem.bind(this, 'small')}
                    initialNumToRender={9}
                    initialScrollIndex={this.state.initIndex}
                    getItemLayout={(data, index) => (
                        {length: 25, offset: 25 * index, index}
                    )}
                />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    pointerEvents='none'
                    scrollEnabled={false}
                    ref='_FlatList2'
                    snapToInterval={25}
                    snapToAlignment='start'
                    scrollsToTop={false}
                    style={{
                        position: 'absolute',
                        top: 100 - CSS.pixel(1),
                        width: '100%',
                        height: 25,
                        backgroundColor: '#ffffff',
                        borderTopWidth: CSS.pixel(1),
                        borderTopColor: '#a2a2a2',
                        borderBottomWidth: CSS.pixel(1),
                        borderBottomColor: '#a2a2a2',
                    }}
                    initialNumToRender={1}
                    initialScrollIndex={this.state.initIndex}
                    data={this.state.data}
                    renderItem={this.getItem.bind(this, 'big')}
                    getItemLayout={(data, index) => (
                        {length: 25, offset: 25 * index, index}
                    )}
                />
            </View>
        )
    }
}
