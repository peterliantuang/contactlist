import { StyleSheet, Text, View, Dimensions, Button  } from 'react-native'
import React from 'react'
import LineBreak from '../utils/LineBreak';


const MainScreen = ({navigation}) => {
    const height = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {/* <Text>MainScreen</Text> */}
        <LineBreak size={20}/>
        <Button title="Click" onPress={()=> navigation.navigate("UseStateContactList")}/>
        
      </View>
    </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({
    container:{
        // flexDirection:'row',
        flex:1,
        alignItems:'center',
    },
    box:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }


})