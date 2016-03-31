import React, {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  Image
} from 'react-native'

//possible Error: bc voting is not updated in realtime, it could be that both yes and no are above 2.
//depending on what hit 2 first, this will decide, BUT: here the function assumes that only hit 2.

const Proof = ({currentUserId, id, UserId, createdBy, userChallenged, challengeText, proofUrl, points, voteCountNo, voteCountYes, listLength, voteOnChallenge}) => {
  
  const voteSection = () => {
    if(currentUserId === UserId) {
      userChallenged = 'you'
    }
    if(voteCountYes < 2 && voteCountNo < 2) {
      if(currentUserId === UserId) {
        return (
          <View>
            <Text style={styles.smallText}>You can't vote on your own challenges!</Text>
          </View>
        )
      } else {
        return (
          <View style={styles.buttons}>
            <TouchableHighlight disabled={false} onPress={() => {voteOnChallenge(id, 1, 1, listLength)}}>
              <Text style={styles.smallText}>YES</Text>
            </TouchableHighlight>
            <TouchableHighlight disabled={false} onPress={() => {voteOnChallenge(id, 0, 1, listLength)}}>
              <Text style={styles.smallText}>NO</Text>
            </TouchableHighlight>
          </View>
        )
      }
    } else if (voteCountYes >= 2) {
      return (
        <View>
          <Text style={styles.smallText}>This Challenge was accepted!</Text>
        </View>
      )
    } else {
      return (
        <View>
          <Text style={styles.smallText}>This Challenge was denied!</Text>
        </View>
      )
    }
  }

  const pointsInfoSection = () => {
    if(currentUserId === UserId) {
      userChallenged = 'you'
    }
    let approach = (points === 1)? 'Sumo point' : 'Sumo points'
    if(voteCountYes < 2 && voteCountNo < 2) {
      return (
        <View>
          <Text style={styles.smallText}>{userChallenged} will get {points} {approach} if challenge accepted!</Text>
        </View>
      )
    } else if (voteCountYes >= 2) {
      return (
        <View>
          <Text style={styles.smallText}>Challenge accepted! {userChallenged} got {points} {approach}!</Text>
        </View>
      )
    } else {
      return (
        <View>
          <Text style={styles.smallText}>Challenge denied! {userChallenged} got {Math.ceil(points / 5)} Chickn Point!</Text>
        </View>
      )
    }
  }


  return (
    <View style={styles.listItem}>
      <View style={styles.itemHeadline}>
        <Text style={styles.challengeText}>{createdBy} challenged {userChallenged}:</Text>
      </View>
      <View style={styles.itemBody}>
        <View style={styles.itemHeadBody}>
          <View style={styles.textWrap}>
            <Text style={styles.smallText}>{challengeText}</Text>
          </View>
          {voteSection()}
        </View>
        <TouchableHighlight style={styles.thumbnail}>
          <Image source={{uri: proofUrl}} style = {{width: 350, height: 350}}  resizeMode={Image.resizeMode.contain} />
        </TouchableHighlight>
        {pointsInfoSection()}
      </View>
    </View>
  )
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    margin: 4,
    backgroundColor:"#a9a9a9"
  },
  textWrap: {
    flex: 1
  },
  itemHeadline: {
    // borderColor: 'green',
    // borderWidth: 2,
    backgroundColor: '#696969'
  },
  itemHeadBody: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemBody: {
    // borderColor: 'pink',
    // borderWidth: 1
  },
  challengeText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    padding: 5 
  },
  smallText: {
    color: 'white',
    fontWeight: '500',
    padding: 10
  },
  buttons: {
    flexDirection: 'row',
  },
  thumbnail: {
    borderColor: 'lightblue'
  }
})

export default Proof