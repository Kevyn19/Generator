import React, {Component} from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import uuid from 'react-native-uuid';
import CommonStyles from '../CommonStyles';

const initialState = {
   toogle: false
 }

export default class Accordion extends Component{

    state = {
        ...initialState,
       
    }

    render (){
        return (
            <View style={{}} >
                <TouchableOpacity onPress={() => this.setState({toogle : !this.state.toogle})}  style={{ 
                    height: Math.ceil(((80/ 100) * this.props.height)),
                    width:   Math.ceil(((80/ 100) * this.props.width)),
                    paddingRight:5,
                    alignItems:'flex-end',
                    justifyContent:'center',
                    backgroundColor:'white',
                    borderRadius:6}}>
                    
                    
                    <Icon name={this.state.toogle ? 'caret-up' : 'caret-down'} size={30} color={'gray'} />
                </TouchableOpacity>

                

                    {this.state.toogle
                        ? <View style={{height: this.props.height * this.props.data.length , backgroundColor: 'white', zIndex:9, borderRadius:6}}> 
                            <FlatList style={{}}
                                data={this.props.data}
                                keyExtractor={item => uuid.v4()} 
                                numColumns={1}
                                scrollEnabled={true}
                                renderItem={({item, index}) => 
                                    <TouchableOpacity activeOpacity={0.6} onPress={() => this.props.selectEnumField(item.label)} 
                                        style={{height: this.props.height, justifyContent:'center', backgroundColor: item.checked ? CommonStyles.colors.darkBlue : 'white' }}>
                                        <Text style={{marginLeft: 5, fontSize: 16, color: item.checked ? 'white' : 'black' }}>{item.label}</Text>
                                    </TouchableOpacity>
                                    
                                }/>
                            </View>

                        : ''
                    }
                

            </View>
        )
    }
}
