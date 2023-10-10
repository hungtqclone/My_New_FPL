import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
  Clipboard,
} from "react-native";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  MediaStream,
  RTCView,
  Constants,
} from "@videosdk.live/react-native-sdk";
import { createMeeting, authToken } from "../../api";
import Video from "react-native-video";
import { Image } from "react-native-animatable";
import { AppStyle, windowWidth } from "../constants/AppStyle";
import { COLOR } from "../constants/Theme";
import { useNavigation } from '@react-navigation/native';
function JoinScreen({ getMeetingAndToken, setMode }) {
  const [meetingVal, setMeetingVal] = useState("");
  const navigation = useNavigation();
  const JoinButton = ({ value, onPress }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: COLOR.bgButton2,
          padding: 12,
          marginVertical: 8,
          borderRadius: 6,
        }}
        onPress={onPress}
      >
        <Text style={{ color: "white", alignSelf: "center", fontSize: 18, fontWeight: '700' }}>
          {value}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        paddingHorizontal: 6 * 10,
      }}
    >
      <TouchableOpacity style={[AppStyle.row, { alignItems: 'center', alignSelf: 'flex-start',left:-60,top:-80, paddingHorizontal: 8, paddingVertical: 12 }]} onPress={() => { navigation.goBack() }}>
        <Image style={[AppStyle.icon, { tintColor: 'white' }]} source={require('../assets/icons/ic_back_black.png')} />
        <Text style={[AppStyle.titleMedium, { backgroundColor: 'black', color: 'white' }]}> Quay lại </Text>
      </TouchableOpacity>
      <Image style={{ alignSelf: "center", width: windowWidth - 100, height: 100, marginBottom: 10 }} source={require('../assets/images/logoFPL.png')} />
      <Text style={[AppStyle.titleBig, { color: COLOR.primary, fontStyle: 'italic', fontWeight: '700', fontSize: 30, alignSelf: 'center', marginBottom: 50 }]}>MEETING</Text>
      <TextInput
        value={meetingVal}
        onChangeText={setMeetingVal}
        placeholder={"XXXX-XXXX-XXXX"}
        placeholderTextColor={"grey"}
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 6,
          color: "white",
          marginBottom: 16,
        }}
      />
      <JoinButton
        onPress={() => {
          getMeetingAndToken(meetingVal);
        }}
        value={"Tham gia như chủ phòng"}
      />
      <JoinButton
        onPress={() => {
          setMode("VIEWER");
          getMeetingAndToken(meetingVal);
        }}
        value={"Tham gia như người xem"}
      />
      <Text
        style={{
          alignSelf: "center",
          fontSize: 16,
          marginVertical: 16,
          fontStyle: "italic",
          color: "grey",
        }}
      >
        ------------- hoặc -------------
      </Text>

      <JoinButton
        onPress={() => {
          getMeetingAndToken();
        }}
        value={"Tạo phòng mới"}
      />
    </SafeAreaView>
  );
}

// Responsible for managing participant video stream
function ParticipantView({ participantId }) {
  const { webcamStream, webcamOn } = useParticipant(participantId);
  return webcamOn && webcamStream ? (
    <RTCView
      streamURL={new MediaStream([webcamStream.track]).toURL()}
      objectFit={"cover"}
      style={{
        height: 300,
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 8,
      }}
    />
  ) : (
    <View
      style={{
        backgroundColor: "grey",
        height: 280,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 8
      }}
    >
      <Text style={{ fontSize: 16 }}>NO MEDIA</Text>
    </View>
  );
}

// Responsible for managing meeting controls such as toggle mic / webcam and leave
function Controls() {
  const [onMic, setOnMic] = useState(true)
  const [onCam, setOnCam] = useState(true)
  const { toggleWebcam, toggleMic, startHls, stopHls, hlsState } = useMeeting(
    {}
  );

  const _handleHLS = async () => {
    if (!hlsState || hlsState === "HLS_STOPPED") {
      startHls({
        layout: {
          type: "GRID",
          priority: "PIN",
          gridSize: 4,
        },
        theme: "DARK",
        orientation: "portrait",
      });
    } else if (hlsState === "HLS_STARTED" || hlsState === "HLS_PLAYABLE") {
      stopHls();
    }
  };

  return (
    <View
      style={{
        padding: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        top: -70
      }}
    >
      <TouchableOpacity style={[AppStyle.buttonVideo, { backgroundColor: onMic ? "#1178F8" : 'gray' }]} onPress={() => {
        toggleWebcam(), setOnMic(!onMic);
      }}>
        <Image style={[AppStyle.icon, { tintColor: COLOR.white }]} source={require('../assets/icons/ic_camera.png')} />
        <Text style={[AppStyle.titleSmall, { color: COLOR.white, marginLeft: 4 }]}>Tắt/Mở Cam</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[AppStyle.buttonVideo, { backgroundColor: onCam ? "#1178F8" : 'gray' }]} onPress={() => {
        toggleMic(), setOnCam(!onCam);
      }}>
        <Image style={[AppStyle.icon, { tintColor: COLOR.white }]} source={require('../assets/icons/ic_micro.png')} />
        <Text style={[AppStyle.titleSmall, { color: COLOR.white, marginLeft: 4 }]}>Tắt/Mở Mic</Text>
      </TouchableOpacity>

      {hlsState === "HLS_STARTED" ||
        hlsState === "HLS_STOPPING" ||
        hlsState === "HLS_STARTING" ||
        hlsState === "HLS_PLAYABLE" ? (
        <Button
          onPress={() => {
            _handleHLS();
          }}
          buttonText={
            hlsState === "HLS_STARTED"
              ? `Live Starting`
              : hlsState === "HLS_STOPPING"
                ? `Live Stopping`
                : hlsState === "HLS_PLAYABLE"
                  ? `Stop Live`
                  : `Go Live`
          }
          backgroundColor={"#FF5D5D"}
        />
      ) : (
        <Button
          onPress={() => {
            _handleHLS();
          }}
          buttonText={`Phát trực tiếp`}
          backgroundColor={"#1178F8"}
        />
      )}
    </View>
  );
}

// Responsible for Speaker side view, which contains Meeting Controls(toggle mic/webcam & leave) and Participant list
function SpeakerView() {
  // Get the Participant Map and meetingId
  const { meetingId, participants } = useMeeting({});

  // For getting speaker participant, we will filter out `CONFERENCE` mode participant
  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()].filter(
      (participant) => {
        return participant.mode == Constants.modes.CONFERENCE;
      }
    );
    return speakerParticipants;
  }, [participants]);

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      {/* Render Header for copy meetingId and leave meeting*/}
      <HeaderView />

      {/* Render Participant List */}
      {speakers.length > 0 ? (
        <FlatList
          data={speakers}
          renderItem={({ item }) => {
            return <ParticipantView participantId={item.id} />;
          }}
        />
      ) : null}

      {/* Render Controls */}
      <Controls />
    </SafeAreaView>
  );
}

function HeaderView() {
  const { meetingId, leave } = useMeeting();
  const navigation = useNavigation();

  const goProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 12,
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => { goProfile() }}>
        <Image style={[AppStyle.icon, { tintColor: COLOR.white }]} source={require('../assets/icons/ic_left.png')} />
      </TouchableOpacity>
      <Text style={{ fontSize: 24, color: "white" }}>{meetingId}</Text>
      <Button
        btnStyle={{
          borderWidth: 1,
          borderColor: "white",
        }}
        onPress={() => {
          Clipboard.setString(meetingId);
          alert("Copy code thành công");
        }}
        buttonText={"Copy code"}
        backgroundColor={"transparent"}
      />

      <TouchableOpacity style={{ backgroundColor: "#FF0000", borderRadius: 8, paddingVertical: 6, paddingHorizontal: 16 }} onPress={() => {
        leave();
      }}>
        <Image style={[AppStyle.icon, { tintColor: COLOR.white }]} source={require('../assets/icons/ic_logout.png')} />
      </TouchableOpacity>

    </View>
  );
}

// Responsible for Viewer side view, which contains video player for streaming HLS and managing HLS state (HLS_STARTED, HLS_STOPPING, HLS_STARTING, etc.)
function ViewerView({ }) {
  const { hlsState, hlsUrls } = useMeeting();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      {hlsState == "HLS_PLAYABLE" ? (
        <>
          {/* Render Header for copy meetingId and leave meeting*/}
          <HeaderView />

          {/* Render VideoPlayer that will play `downstreamUrl`*/}
          <Video
            controls={true}
            source={{
              uri: hlsUrls.downstreamUrl,
            }}
            resizeMode={"stretch"}
            style={{
              flex: 1,
              backgroundColor: "black",
            }}
            onError={(e) => console.log("error", e)}
          />
        </>
      ) : (
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>
            HLS is not started yet or is stopped
          </Text>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

// Responsible for managing two view (Speaker & Viewer) based on provided mode (`CONFERENCE` & `VIEWER`)
function Container() {
  const { join, changeWebcam, localParticipant } = useMeeting({
    onError: (error) => {
      console.log(error.message);
    },
  });

  return (
    <View style={{ flex: 1 }}>
      {localParticipant?.mode == Constants.modes.CONFERENCE ? (
        <SpeakerView />
      ) : localParticipant?.mode == Constants.modes.VIEWER ? (
        <ViewerView />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'black',
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>
            Nhấn tham gia để bắt đầu cuộc họp
          </Text>
          <Button
            btnStyle={{
              marginTop: 8,
              paddingHorizontal: 22,
              padding: 12,
              borderWidth: 1,
              marginTop: 40,
              borderColor: "white",
              borderRadius: 8,
            }}
            buttonText={"Tham gia"}
            onPress={() => {
              join();
              setTimeout(() => {
                changeWebcam();
              }, 300);
            }}
          />
        </View>
      )}
    </View>
  );
}

// Common Component which will also be used in Controls Component
const Button = ({ onPress, buttonText, backgroundColor, btnStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...btnStyle,
        backgroundColor: backgroundColor,
        padding: 10,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: "white", fontSize: 12 }}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

function VideoCall() {
  const [meetingId, setMeetingId] = useState(null);

  //State to handle the mode of the participant i.e. CONFERNCE or VIEWER
  const [mode, setMode] = useState("CONFERENCE");

  //Getting MeetingId from the API we created earlier
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "sonnvps24943",
        //These will be the mode of the participant CONFERENCE or VIEWER
        mode: mode,
      }}
      token={authToken}
    >
      <Container />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} setMode={setMode} />
  );
}

export default VideoCall;
