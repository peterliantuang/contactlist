import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CallingScreen = () => {
  return (
    <>
    <View style={styles.container}>
      {/* <Text style={styles.title}>CallingScreen</Text> */}
      <View style={styles.box1}>
        <Text>Box 1</Text>
      </View>
      <View style={styles.box2}>
        <Text>Box 1</Text>
      </View>
    </View>
    <View style={styles.container}>
      {/* <Text style={styles.title}>CallingScreen</Text> */}
      <View style={styles.box1}>
        <Text>Box 1</Text>
      </View>
      <View style={styles.box2}>
        <Text>Box 1</Text>
      </View>
    </View>
    </>
  )
}

export default CallingScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',

    },box1:{
        flex:1,
        backgroundColor:'pink',
        margin:10,
        alignItems:'center'
    },box2:{
        flex:2,
        backgroundColor:'pink',
        margin:10,
        alignItems:'center'
    },
    title:{
        color:'red'
    }
})