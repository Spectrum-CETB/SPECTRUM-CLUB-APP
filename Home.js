import React,{ useState, useEffect } from 'react';
import { StyleSheet,View,TouchableOpacity,ScrollView,Image,ImageBackground, Dimensions,Linking, Alert} from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator,SafeAreaView,DrawerItems} from "react-navigation";
import { Card,Paragraph,Button} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import About from './Components'
import Team from './Team'
import Events from './Events'
import Projects from './Projects'
import Scanner from './Scanner'
import Contact from './Contact'
import Mozilla from './Mozilla'
import * as firebase from 'firebase'
import {firebaseConfig} from './config'
import LoginPage from './LoginPage'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons'; 
const screenHeight = Dimensions.get('window').height
class Hidden extends React.Component {
  render() {
    return null;
  }
}

class Home extends React.Component{
 
  constructor() {
    super();
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
      photoURL:firebase.auth().currentUser.photoURL,
      value:"",
      image:''
    }   
    
  }
  //ADD PERMISSIONS FOR IOS
display(){
  const img =  firebase.database().ref("image").child(this.state.displayName);
  img.on("value",datasnap=>{
    //console.log(Object.values(datasnap.val()))
    this.setState({value:Object.values(datasnap.val())})
  })
}


  usersignout(){
    firebase.auth().signOut()
    .then((rev)=>{
      console.log(rev);
      console.log("logged out")
      this.props.navigation.navigate('Login')
    })
    .catch(error=>{
      Alert.alert(error)
    })
  }
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({image:result.uri});
      const imageuri =  firebase.database().ref("image");
      imageuri.child(this.state.displayName).set({
        image:this.state.image
      });
    }
  };
    render(){
     
     console.log(this.state.photoURL)
     console.log(this.state.value)
        return(
<View style={styles.container}>
<ImageBackground
source={require('./media/homeback.jpg')}
style={styles.image}
>


<Card
style={{margin:10,opacity:0.9,borderRadius:10,marginTop:20}}

>
<ImageBackground source={require('./media/back1.png')}
style={styles.cardimage}>
    
    <Card.Content>
     <Image style={{height:110,width:110,alignSelf:'center',marginTop:10,borderRadius:150,
     borderWidth:3,borderColor:'grey'}} source={{ uri: this.state.photoURL }} />
    
    <Paragraph style={{fontSize:20,alignSelf:'center',marginTop:20,fontWeight:'bold',textShadowColor:'black',color:"white", textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 15}} >SPECTRUM ID</Paragraph>
    <Paragraph style={{color:"white",fontSize:15.5,textShadowColor:'black',textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 15,marginTop:27,letterSpacing:2,textTransform:'uppercase',marginBottom:2}} >{this.state.displayName}</Paragraph>
   <Paragraph style={{color:"white",fontSize:12,textShadowColor:'black',textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 15,letterSpacing:1}}>{this.state.uid}</Paragraph>
    <Paragraph style={{color:"white",fontSize:13,textShadowColor:'black',textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 15,textAlign:'right',marginBottom:10,marginTop:-21,letterSpacing:2}} >MEMBER</Paragraph>
       </Card.Content>
    </ImageBackground>
  </Card>
  <View style={{flexDirection:"row",marginLeft:10,marginRight:10,alignSelf:'center'}}>
    
  <Button  mode="contained" 
   onPress={() => this.usersignout()}
color="red"
icon="logout"
labelStyle={{color:"white",letterSpacing:3}}
 style ={{margin:5, height:50,padding:8,width:150,borderRadius:30,opacity:0.7,borderColor
 :"black",borderWidth:3,padding:5,marginTop:22} }>
    LOGOUT
  </Button>
      </View>
  
</ImageBackground>
</View>

        );
    }
}

const LoginNav = createStackNavigator({
  Login:{
    screen:()=><LoginPage/>
  }},{
    headerMode:"none"
  }
)

const HomeNav = createStackNavigator({
  Home:{
    screen:Home
  }, 
  
 },{
   defaultNavigationOptions:(props)=> {
     return{
       headerTintColor: '#fff',
     headerStyle: {
       backgroundColor: '#02020c',     
     },
     title: "Home",
     headerLeft: <Ionicons name="md-menu" size={32} style={{padding:5,marginLeft:5}} color="white" onPress={()=>props.navigation.toggleDrawer()}/>
     ,headerRight:<Ionicons name="md-menu" size={32} style={{padding:5,marginLeft:5}} color="white" />,
     headerRight:<Ionicons name="scan-circle-outline" size={32} style={{padding:5,marginRight:15}} color="white" onPress={()=>props.navigation.navigate('Scanner')}/>
     }},});
     const ScannerNav = createStackNavigator({
      Scanner:{
        screen:()=><Scanner/>
      }, 
     },{
       defaultNavigationOptions:(props)=> {
         return{
           headerTintColor: '#fff',
         headerStyle: {
           backgroundColor: '#02020c',     
         },
         title: "Scanner",
         headerLeft: <Ionicons name="md-menu" size={32} style={{padding:5,marginLeft:5}} color="white" onPress={()=>props.navigation.toggleDrawer()}/>
         ,
         headerRight: <Ionicons name="scan-circle-outline" size={32} style={{padding:5,marginRight:15}} color="white" onPress={()=>props.navigation.navigate('Scanner')}/>,}},});
         const AboutNav = createStackNavigator({
          About:{
            screen:()=><About/>
          }, 
         },{
           defaultNavigationOptions:(props)=> {
             return{
               headerTintColor: '#fff',
             headerStyle: {
               backgroundColor: '#02020c',     
             },
             title: "About",
             headerLeft: <Ionicons name="md-menu" size={32} style={{padding:5,marginLeft:5}} color="white" onPress={()=>props.navigation.toggleDrawer()}/>
             ,
             headerRight:  <Ionicons name="scan-circle-outline" size={32} style={{padding:5,marginRight:15}} color="white" onPress={()=>props.navigation.navigate('Scanner')}/>,}},});
             const TeamNav = createStackNavigator({
              Team:{
                screen:()=><Team/>
              }, 
             },{
               defaultNavigationOptions:(props)=> {
                 return{
                   headerTintColor: '#fff',
                 headerStyle: {
                   backgroundColor: '#02020c',     
                 },
                 title: "Team",
                 headerLeft: <Ionicons name="md-menu" size={32} style={{padding:5,marginLeft:5}} color="white" onPress={()=>props.navigation.toggleDrawer()}/>
                 ,
                 headerRight: <Ionicons name="scan-circle-outline" size={32} style={{padding:5,marginRight:15}} color="white" onPress={()=>props.navigation.navigate('Scanner')}/>,}},});
                 const EventsNav = createStackNavigator({
                  Events:{
                    screen:()=><Events/>
                  }, 
                 },{
                   defaultNavigationOptions:(props)=> {
                     return{
                       headerTintColor: '#fff',
                     headerStyle: {
                       backgroundColor: '#02020c',     
                     },
                     title: "Events",
                     headerLeft: <Ionicons name="md-menu" size={32} style={{padding:5,marginLeft:5}} color="white" onPress={()=>props.navigation.toggleDrawer()}/>
                     ,
                     headerRight: <Ionicons name="scan-circle-outline" size={32} style={{padding:5,marginRight:15}} color="white" onPress={()=>props.navigation.navigate('Scanner')}/>,}},});
                     const ProjectsNav = createStackNavigator({
                      Projects:{
                        screen:()=><Projects/>
                      }, 
                     },{
                       defaultNavigationOptions:(props)=> {
                         return{
                           headerTintColor: '#fff',
                         headerStyle: {
                           backgroundColor: '#02020c',     
                         },
                         title: "Projects",
                         headerLeft: <Ionicons name="md-menu" size={32} style={{padding:5,marginLeft:5}} color="white" onPress={()=>props.navigation.toggleDrawer()}/>
                         ,
                         headerRight: <Ionicons name="scan-circle-outline" size={32} style={{padding:5,marginRight:15}} color="white" onPress={()=>props.navigation.navigate('Scanner')}/>,}},});
                             const ContactNav = createStackNavigator({
                              Contact:{
                                screen:()=><Contact/>
                              }, 
                             },{
                               defaultNavigationOptions:(props)=> {
                                 return{
                                   headerTintColor: '#fff',
                                 headerStyle: {
                                   backgroundColor: '#02020c',     
                                 },
                                 title: "Contact",
                                 headerLeft: <Ionicons name="md-menu" size={32} style={{padding:5,marginLeft:5}} color="white" onPress={()=>props.navigation.toggleDrawer()}/>
                                 ,
                                 headerRight: <Ionicons name="scan-circle-outline" size={32} style={{padding:5,marginRight:15}} color="white" onPress={()=>props.navigation.navigate('Scanner')}/>,}},});
                                 const MozillaNav = createStackNavigator({
                                  Mozilla:{
                                    screen:()=><Mozilla/>
                                  }, 
                                 },{
                                   defaultNavigationOptions:(props)=> {
                                     return{
                                       headerTintColor: '#fff',
                                     headerStyle: {
                                       backgroundColor: '#02020c',     
                                     },
                                     title: "Mozilla",
                                     headerLeft: <Ionicons name="md-menu" size={32} style={{padding:5,marginLeft:5}} color="white" onPress={()=>props.navigation.toggleDrawer()}/>
                                     ,
                                     headerRight: <Ionicons name="scan-circle-outline" size={32} style={{padding:5,marginRight:15}} color="white" onPress={()=>props.navigation.navigate('Mozilla')}/>,}},});
const DrawerNavigator = createDrawerNavigator(
  {
    Home: 
    { screen: HomeNav,
      navigationOptions: {
        title: 'Home',
        drawerLabel: 'Home',
        drawerIcon: <Ionicons name="md-home" size={20} color="white"/>
      }
    },Scanner:{screen:ScannerNav,
      navigationOptions: {
        title: 'Scanner',
        drawerLabel: 'Scanner',
        drawerIcon: <Ionicons name="scan-circle-outline" size={20} color="white"/>
      }},
    About:{screen:AboutNav,
      navigationOptions: {
        title: 'About',
        drawerLabel: 'About',
        drawerIcon: <Ionicons name="md-information-circle-outline" size={20} color="white"/>
      }},
    Team:{screen:TeamNav,
      navigationOptions: {
        title: 'Team',
        drawerLabel: 'Team',
        drawerIcon: <Ionicons name="md-people" size={20} color="white"/>
      }},
    Events:{screen:EventsNav,
      navigationOptions: {
        title: 'Events',
        drawerLabel: 'Events',
        drawerIcon: <Ionicons name="md-calendar" size={20} color="white"/>
      }},
    Projects:{screen:ProjectsNav,navigationOptions: {
      title: 'Projects',
      drawerLabel: 'Projects',
      drawerIcon: <Ionicons name="md-construct" size={20} color="white"/>
    }},
    Contact:{screen:ContactNav,
      navigationOptions: {
        title: 'Contact',
        drawerLabel: 'Contact',
        drawerIcon: <Ionicons name="md-phone-portrait" size={20} color="white"/>
      }},
      Login:{
        screen:LoginNav,
        navigationOptions: {
          drawerLabel: <Hidden />,
        }
      }
  },
  
  {
    hideStatusBar: true,
    drawerBackgroundColor: 'rgba(66,66,66,0.98)',
    overlayColor:'rgba(0,0,0,0.83)',
    contentComponent:(props) => (
      <SafeAreaView >
          <View style={{height: 100,alignItems: 'center', justifyContent: 'center'}}>
  
            <Image  source={require('./assets/splash.png')} style={{height:95,width:95,marginTop:14}}/>
          </View>
        <ScrollView style={{marginTop:15}}>
          <DrawerItems {...props} />
        </ScrollView>
      </SafeAreaView>
     ),
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: 'grey',
      labelStyle:{color:"white"}
      
    },
  }
);

  
  const AppContainer= createAppContainer(DrawerNavigator);
  export default class App extends React.Component {
    render() {
      return <AppContainer />;
    }
  }
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#303F9F',
      height:screenHeight,
      
      
      
    },
    image:{
      flex:1,
      resizeMode: "cover",
    
      
    },
    cardimage:{
   
      resizeMode:'cover',
      
      
    },
    fontstyle:{
   
      color:'white'
     
      
    },
})