import React,{Fragment} from 'react';
import { StyleSheet, Text, View,Dimensions,Animated,ScrollView,Image,ImageBackground} from 'react-native';
import {Video} from 'expo-av';
import { createStackNavigator, createAppContainer, createDrawerNavigator} from "react-navigation";
import styled from "styled-components/native";
import { TextInput,Button ,Card,Title,Paragraph} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const size = Dimensions.get('window').height
   export default class About extends React.Component {
    static navigationOptions = {
      title: 'About',
    };
  
    render() {
      return (
        
        <View style={styles.container}>
        <ImageBackground
        source={require('./media/homeback.jpg')}
        style={styles.image}
        >
         <ScrollView >  
          
        <Image source={require('./assets/splash.png')} style={{height:150,width:150,alignSelf:'center',marginTop:10}}/>
        <Text style={{color:'white',fontSize:30,marginTop:10,alignSelf:'center',fontWeight:'bold',textShadowColor:'black',textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 15,letterSpacing:3}}>SPECTRUM</Text>
  <Card style={{margin:15,borderRadius:10}}> 
  <ImageBackground source={require('./media/space.jpg')}
style={styles.cardimage}>
  <Card.Content >
  <Title style={{color:'white',textAlign:'justify',fontSize:20,marginTop:10,marginLeft:10,marginRight:10,alignSelf:'center'}}>About Us</Title>
  <View
  style={{
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    margin:10
  }}
/>
        <Text style={{color:'white',textAlign:'justify',fontSize:20,marginTop:10,marginLeft:10,marginRight:10}}>SPECTRUM ,Technical society of COLLEGE OF ENGINEERING AND TECHNOLOGY, BHUBANESWAR,a place for all technical enthusiasts to learn, discover and innovate new things in the field of Technology and Design. The name of the club " SPECTRUM ", a contribution of our alumni of 2015 batch, is particularly used to describe the characteristic colors of visible light after passing through a prism, similarly students of CET consist of different skills within them and Spectrum acts like a prism, Spectrum recognises their skills helps them to strengthen it.


</Text>


<Text style={{color:'white',textAlign:'justify',fontSize:20,margin:10}}>This club was established by " Bikram Keshari Panda (2015 batch) ".Spectrum got its recognition in the year 2016 and got its workspace, funding and other facilities. Primarily this was his idea to have an electronics society in our college but with the efforts of other members we established two other wings - Software and Design.The other seniors who had their valuable contribution for this initiative were: Ankit Mishra, Zighnesh Biswal, Abhishek Dash, Avinash Nayak, Tapan Kumar Pal, Krutikesh Sahoo, Abhilash Das.</Text>
</Card.Content>
</ImageBackground>
</Card>
</ScrollView>
        </ImageBackground>
        </View>
       
       
      );
    }
  }
  
   
 
  
   
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#303F9F',
     
    },
    image:{
      flex:1,
      resizeMode: "cover",
      
      
    },
    cardimage:{
   
      resizeMode:'cover',
     
      
    },
})