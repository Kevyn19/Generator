import React, {Component} from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";
import Switch from "../components/Switch";
import uuid from 'react-native-uuid';

import Icon from "react-native-vector-icons/FontAwesome";


import Accordion from "../components/Accordion";
import CommonStyles from "../CommonStyles";
import Structures from "../Structures";




const initialState = {
   structure: {},
   columnWidth: 0,
   data: [],
   showTable: true
}


export default class BlueSquare extends Component{

    state = {
        ...initialState,
       
    }

    componentDidMount = () => {
    
        const windowWidth = Dimensions.get('window').width; 
        tableWidth = Math.ceil(((95/ 100) * windowWidth)) 
    

        // depois vai receber via props
        let structure = this.props.structure


        let currentStructure = ''
        if(structure === 'documentsAlert'){
            currentStructure = Structures.documentsAlert
        }else if(structure === 'events'){
            currentStructure = Structures.events
        }else if(structure === 'locations'){
            currentStructure = Structures.locations
        }else if(structure === 'users'){
            currentStructure = Structures.users
        }else if(structure === 'organizations' ){
            currentStructure = Structures.organizations
        }else if(structure === 'contractors' ){
            currentStructure = Structures.contractors
        }else if(structure === 'disciplines'){
            currentStructure = Structures.disciplines
        }else if(structure === 'contracts'){
            currentStructure = Structures.contracts
        }

        let numOfColumns = currentStructure.columns.length
        if(currentStructure.sideButtons.length > 0){
            numOfColumns++
        }
        this.setState({structure: currentStructure}, this.setState({columnWidth: tableWidth/numOfColumns}) )
      
        // substituir pela requisicao ao endpoint correto
        let data = []
        for(let i = 0; i < 15; i++){
            data.push(currentStructure.semple)
        }
       this.setState({data:data})
       // **************************** */


    }

    toggleButton = (label) => {
        let structure = this.state.structure
       
        for(var button of structure.toggleButtons){
            if(button.label === label){
                button.value = !button.value
            }
        }
        
        this.setState({structure})
    }

    // depois isso aqui vai ser uma function vinda via props
    fetchNextPage = () => {
        let data = this.state.data
        for(var i = 0; i < 20; i++){
            data.push(this.state.structure.semple)
          
        }
        this.setState({data: data})
    }

    getEnumColor = (values, label) => {
        let color = ''
        for(value of values){
            if(value.label === label){
                color = value.color
            }
       }

       return color === '' ? 'gray' : color
    }

    selectEnumField = (label) => {
        
        let structure = this.state.structure
        
        
        for( column of structure.columns){
            if(column.type === 'enum'){
                for( item of column.value ){
                    if(item.label === label){
                        item.checked = !item.checked
                    }
                }
            }
        }
       
        this.setState({structure : structure})
    }
  

    render (){
        let title = this.state.structure.title
        let icon = this.state.structure.icon
        let headerButtons = this.state.structure.headerButtons
        let toggleButtons = this.state.structure.toggleButtons
        return (
            <View style={styles.container}>
                <View style={{width:'95%'}}>
                    {/* blue line */}
                    <TouchableOpacity style={styles.header} onPress={() => this.setState({showTable: !this.state.showTable})}>
                        {/* title and icon */}
                        <View style={styles.headerArea}>
                            {icon !== ''  ?  <Icon style={styles.icon} name={icon} color={'white'} size={22} />  : '' }
                            <Text style={styles.headerText}>{title}</Text>
                        </View>

                        {/* header buttons */}
                        <View style={styles.headerButtonArea}>
                            {headerButtons && headerButtons.map(button => (
                                <TouchableOpacity style={styles.headerButtons}>
                                    {button.icon !== ''  
                                        ? <View style={{flexDirection:'row'}}>
                                            <Icon style={styles.buttonIcon} name={button.icon} color={'gray'} size={18} />  
                                            <Text style={styles.buttonText}>{button.text}</Text> 
                                         </View> 
                                        
                                        : <Text style={styles.buttonText}>{button.text}</Text> 
                                    }
                                    
                                </TouchableOpacity>
                            ))}
                        </View>
                    </TouchableOpacity>
                    {/* white line with toggle buttons */}
                    {toggleButtons &&  toggleButtons.length > 0
                        ?   <View style={styles.toggleArea}>
                                {toggleButtons.map(button => (
                                    <Switch title={button.label} value={button.value} toggleFunction={() => this.toggleButton(button.label)}/>
                                ))}
                               
                            </View>
                        : ''
                    }
                    {/* table name columns and filter fields */}
                    <View style={styles.tableArea}>
                        
                        {this.state.structure.columns && this.state.structure.columns.map(column => (
                           <View>
                                <View style={[styles.tableColumns,  {width:this.state.columnWidth}]}>
                                    <Text style={styles.tableColumnsText}>{column.label}</Text>
                                </View>
                                <View style={[styles.tableFilters ,{width:this.state.columnWidth}]}>

                                    {column.type === 'text'
                                        ?   <TextInput placeholder="" value={column.value} onChangeText={value =>  {
                                                    let newStructure = {...this.state.structure}
                                                    newStructure.columns.forEach(element => {
                                                        if(element.label === column.label){
                                                            element.value = value
                                                        }
                                                    });
                                                    this.setState({structure: newStructure}) 
                                                }
                                            } 
                                            style={styles.textInputFilter} />
                                        : ''
                                    }

                                    {column.type === 'bool'
                                        ?    <TouchableOpacity activeOpacity={0.3} onPress={() => {
                                                        let newStructure = {...this.state.structure}
                                                        newStructure.columns.forEach(element => {
                                                            if(element.label === column.label){
                                                                element.value = !element.value
                                                            }
                                                        });
                                                        this.setState({structure: newStructure}) 
                                                    }
                                                }>
                                                <Icon name={column.value ? 'check-square' : 'square'} size={28} color={ column.value ? CommonStyles.colors.opaqueBlue :'gray'} />
                                            </TouchableOpacity>
                                        : ''
                                    }

                                    {column.type === 'enum'
                                        ? <Accordion width={this.state.columnWidth} height={50} data={column.value} selectEnumField={this.selectEnumField}/>
                                        : ''
                                    }

                                </View>
                           </View> 
                        ))}
                    </View>
                    
                    {/* table content */ }
                    {this.state.showTable
                        ? <View style={{height:this.props.tableSize, zIndex:-1, borderWidth:1, borderColor: CommonStyles.colors.lightGray, borderBottomLeftRadius:6, borderBottomRightRadius:6}}>
                       
                            {this.state.data && this.state.structure && this.state.structure.columns
                                ?   <FlatList 
                                        style={{flex:1}}
                                        onEndReached={this.fetchNextPage}
                                        onEndReachedThreshold={0.8}
                                        keyExtractor={item => uuid.v4()}  
                                        scrollEnabled={true}
                                        data={this.state.data}
                                        renderItem={({item}) => 
                                            <View style={{flexDirection:'row'}}>
                                                {item.map((element, index) => {

                                                    let type = this.state.structure.columns[index].type;
                                                    
                                                    if(type === 'text'){
                                                    
                                                        return  <View style={[styles.textField, {width:this.state.columnWidth}]}>
                                                                    <TouchableOpacity><Text style={{}}>{element.toString().length > 20 
                                                                                ? element.toString().substring(0,20) + '...' 
                                                                                :  element.toString()}</Text></TouchableOpacity>
                                                                </View>
                                                    }
                                                    if(type === 'bool'){
                                                        return  <View style={[styles.BoolField, {width:this.state.columnWidth}]}>
                                                                    <Icon style={{}}
                                                                    name={element? 'check-square' : 'square'} size={28} color={ element ? CommonStyles.colors.opaqueBlue :'gray'} />
                                                                </View>
                                                    }

                                                   
                                                    if(type == 'enum'){
                                                        return <View style={[styles.enumArea, {width:this.state.columnWidth}]}>
                                                                    {element.map(e => (
                                                                        <View style={[styles.enumField,
                                                                             {backgroundColor: this.getEnumColor(this.state.structure.columns[index].value, e)}] }>
                                                                            <Text style={styles.enumText}>{e}</Text>
                                                                        </View>
                                                                       
                                                                    ))}
                                                                </View> 
                                                    }

                                                    if(type === 'date' && element){

                                                        return  <View style={[styles.dateArea, {width:this.state.columnWidth}]}>
                                                                  <Text style={styles.dateText}>{element.toISOString().slice(0,10).replace(/-/g,"")}</Text> 
                                                                </View>
                                                    }
                                                    
                                                }) }
                                                {this.state.structure.sideButtons &&  this.state.structure.sideButtons.length > 0
                                                    ? <View style={[styles.sideButtonArea, {width:this.state.columnWidth}]}>
                                                            {this.state.structure.sideButtons.map(button => (
                                                                <TouchableOpacity style={[styles.sideButton, {backgroundColor:button.color}]} >
                                                                    <Icon style={{}}
                                                                     name={button.icon} size={12} color={'white'} />
                                                                </TouchableOpacity>
                                                            ))}
                                                     </View>
                                                    : ''
                                                }
                                            </View> 
                                            }
                                                        
                                    />
                                : ''
                            }   
                        
                    </View> 
                    : ''}
                </View>
            </View>
        )
    }   
}

const styles = StyleSheet.create({
    container:{
       // flex:1, 
        alignItems:'center',
        marginTop: 10
    },
    header:{
        height:50,
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'space-between', 
        backgroundColor: CommonStyles.colors.headerBlue, 
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    },
    headerArea:{
        flexDirection:'row', 
        justifyContent:'flex-start'
    },
    icon:{
        marginLeft:15
    },
    headerText:{
        marginLeft:5, 
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    },
    headerButtonArea: {
        height:50, 
        flexDirection:'row'
    },
    headerButtons:{
        margin:5,  
        backgroundColor:'#edf7fd', 
        borderRadius:6, 
        alignItems:'center', 
        justifyContent:'center', 
        height:'80%'
    },
    buttonIcon:{
        marginLeft:10
    },
    buttonText:{
        marginHorizontal:10
    },
    toggleArea: {
        height:50, 
        flexDirection: "row", 
        alignItems:'center', 
        justifyContent:'flex-start', 
        backgroundColor:'white'
    },
    tableArea:{
        flexDirection:"row", 
        backgroundColor: '#d3d3d3'
    },
    tableColumns: { 
        height: 50, 
        alignItems:'center', 
        justifyContent:'center'
    },
    tableColumnsText:{
        fontWeight:'bold'
    },
    tableFilters:{
        height: 50, 
        alignItems:'center', 
        justifyContent:'flex-start'
    },
    textInputFilter:{
        height: '80%', 
        width:'80%', 
        borderRadius:6,
        backgroundColor:'white'
    },
    textField:{
        height:50, 
        alignItems:'center', 
        justifyContent:'center'
    },
    BoolField:{
        height:50,
        alignItems:'center', 
        justifyContent:'center'
    },
    enumArea: {
        flexWrap:"wrap",
        height:50, 
        flexDirection:'row'
    },
    enumField:{
        borderRadius:3, 
        height:'40%',
        marginHorizontal: 5, 
        marginTop:5
    },
    enumText:{
        fontSize: 10, 
        marginHorizontal: 5, 
        color:'white'
    },
    dateArea:{
        height:50,
        alignItems:'center', 
        justifyContent:'center'
    },
    dateText:{

    },
    sideButtonArea:{
        height:50,
        alignItems:'center', 
        justifyContent:'center', 
        flexDirection:'row'
    },
    sideButton:{
        marginHorizontal:2, 
        alignItems:'center',
        justifyContent:'center', 
        borderRadius:3,
        height:25, 
        width:25
    }
})
