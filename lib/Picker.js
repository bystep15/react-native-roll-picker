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

const ROW_HEIGHT = 30;

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
        let text = '';
        if (this.props.getItemText) {
            text = this.props.getItemText(item);
        } else {
            text = this.props.name ? item[this.props.name] : item;
        }
        return (
            <View style={{height: ROW_HEIGHT, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: size == 'big' ? 18 : 16, color: size == 'big' ? '#4a4a4a' : '#a0a0a0', backgroundColor: 'rgba(0,0,0,0)'}}>
                    {text}
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
        let y1 = y-(y%ROW_HEIGHT);
        if(y%ROW_HEIGHT > (ROW_HEIGHT / 2)) {y1 = y1+ROW_HEIGHT;}
        let index = y1/ROW_HEIGHT;
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
            <View style={{position: 'relative', height: ROW_HEIGHT * 7, flex: 1}}>
                <FlatList
                    style={{flex: 1, backgroundColor: '#ffffff'}}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={32}
                    snapToInterval={ROW_HEIGHT}
                    snapToAlignment='start'
                    scrollsToTop={false}
                    onScrollEndDrag={(e) => {this._onScrollEndDrag(e)}}
                    onMomentumScrollEnd={(e) => {this._onMomentumScrollEnd(e)}}
                    onScroll={(e) => {this._onScroll(e)}}
                    ref='_FlatList'
                    contentContainerStyle={{paddingVertical: ROW_HEIGHT * 3}}
                    data={this.state.data}
                    renderItem={this.getItem.bind(this, 'small')}
                    initialNumToRender={7}
                    initialScrollIndex={this.state.initIndex}
                    getItemLayout={(data, index) => (
                        {length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index}
                    )}
                />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    pointerEvents='none'
                    scrollEnabled={false}
                    ref='_FlatList2'
                    snapToInterval={ROW_HEIGHT}
                    snapToAlignment='start'
                    scrollsToTop={false}
                    style={{
                        position: 'absolute',
                        top: ROW_HEIGHT * 3 - CSS.pixel(1),
                        width: '100%',
                        height: ROW_HEIGHT,
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
                        {length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index}
                    )}
                />
            </View>
        )
    }
}
