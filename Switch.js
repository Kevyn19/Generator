
import React, {useState} from 'react';

import {
  Switch,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform
} from 'react-native';

const CustomSwitch = (props) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Switch
            style={{marginRight: Platform.OS === 'ios'  ? 10 : 0}}
            trackColor={{ true:'#3e8ed0'}}
            thumbColor={'white'}
            onValueChange={props.toggleFunction}
            value={props.value}
        />
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    flexDirection:'row',
    marginLeft: 5
    
  },
  text:{
    marginRight:  5,
    fontSize:12
  }
});

export default CustomSwitch;
