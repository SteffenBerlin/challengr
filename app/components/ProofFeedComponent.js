import React, { 
 View,
 Text,
 ListView,
 StyleSheet,
 TouchableHighlight,
 ScrollView,
 RefreshControl,
 TouchableOpacity,
 Image
} from 'react-native'

import Proof from './Proof'


const ProofFeedComponent = ({currentUserId, allClosedChallenges, getClosedChallenges, voteOnChallenge, refreshingClosedChallenges}) => {
  console.log('these are the challenges', allClosedChallenges)

  let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  let dataSource = ds.cloneWithRows(allClosedChallenges)

  return (
    <View style={styles.container}>
    <View style={styles.header}>
    <TouchableOpacity onPress={()=>Alert.alert("Check out all the completed challenges and vote on them! Pull down to get the latest challenges")}>
      <Image source={{uri: 'https://s3-us-west-1.amazonaws.com/challengrproof/Drawing-layerExport+(3).jpeg'}} style={{width:50, height:50}} resizeMode={Image.resizeMode.contain} />
    </TouchableOpacity>
    </View>


    <View style={styles.body}>
      <View style={styles.titleBar}>
         <Text style ={styles.titleText}>
           Completed Challenge Feed
         </Text>
     </View>
    <ScrollView 
    ref={(scrollView) => { _scrollView = scrollView; }}
    automaticallyAdjustContentInsets={false}
    scrollEventThrottle={200}
    refreshControl={
          <RefreshControl
            refreshing={refreshingClosedChallenges}
            onRefresh={()=>{getClosedChallenges(1, allClosedChallenges.length+10)}}
            tintColor="#ff0000"
            title={"Loading newly completed challenges"}
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
      }>
    	<ListView
        dataSource={dataSource}
        renderRow={(row) => <Proof {...row} currentUserId={currentUserId} listLength={allClosedChallenges.length} voteOnChallenge={voteOnChallenge}/>}
      />
    </ScrollView>
    </View>
    </View>
    )
}

var styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: 'white'
 },
 header: {
   flex: 0.1,
   alignItems: 'center',
   justifyContent: 'center'
 },
 body: {
   flex: 0.6,
   backgroundColor: '#f5f5f5'
 },
 titleText:{
  fontSize: 20,
  fontWeight: "600",
  color: 'white'
 },
  titleBar: {
   flex: 0.1,
   justifyContent: 'center',
   alignItems: 'center',
   marginBottom: 5,
   backgroundColor: '#ff005f'
 },
})

export default ProofFeedComponent