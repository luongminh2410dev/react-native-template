import { isAndroid } from "@app/utils/scale";
import notifee, {
  AndroidImportance,
  EventType,
  Notification,
} from "@notifee/react-native";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { Alert, Linking, PermissionsAndroid } from "react-native";

export default () => {
  async function requestUserPermission() {
    let statusAndroid;
    if (isAndroid) {
      statusAndroid = await PermissionsAndroid.request("android.permission.POST_NOTIFICATIONS");
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled || statusAndroid == "granted") {
      // console.console.log("Authorization status:", authStatus)
    } else if (
      statusAndroid == "denied" ||
      messaging.AuthorizationStatus.DENIED
    ) {
      Alert.alert("", "Notification permission not enable", [
        {
          text: "Open setting",
          onPress: () => {
            Linking.openSettings();
          },
        },
        {
          text: "Cancel",
        },
      ]);
    }
  }

  useEffect(() => {
    requestUserPermission();
    (async () => {
      if (isAndroid) {
        await notifee.createChannel({
          id: "Base.main",
          name: "Base",
          badge: false,
          importance: AndroidImportance?.HIGH!,
        });
      }
    })();

    messaging().onNotificationOpenedApp(message => {
      console.log("onNotificationOpenedApp", message);
      // switchScreen(message.data);
      // handleDeepLink(message.data?.url)
    });

    messaging()
      .getInitialNotification()
      .then(res => {
        console.log("getInitialNotification", res);
        initialNotification(res);
      });

    const unsubscribe = messaging().onMessage(onDisplayNotification);
    //@ts-ignore
    messaging().setBackgroundMessageHandler(() => {
      console.log("setBackgroundMessageHandler");
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          onDismissNotification(detail.notification);
          break;
        case EventType.PRESS:
          onPressNotification(detail.notification);
          break;
        default:
          break;
      }
    });
  }, []);

  const initialNotification = (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage | null,
  ) => {
    console.log("data initialNotification:", remoteMessage);
    // handleDeepLink(remoteMessage?.data?.url)
  };

  const onPressNotification = (notification: Notification | undefined) => {
    console.log("onPressNotification:", notification);
    // handleDeepLink(notification?.data?.url)
  };

  const onDismissNotification = (data: Notification | undefined) => {
    console.log("onDismissNotification", data);
  };

  async function onDisplayNotification(
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) {
    console.log("remoteMessage", remoteMessage);
    const channelId = "Base.main";
    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage?.notification?.title! || "Base",
      body: remoteMessage?.notification?.body! || "Base",
      android: {
        channelId,
        smallIcon: "ic_launcher",
        color: "#00b136",
        colorized: true,
        badgeCount: 0,
        importance: AndroidImportance?.HIGH!,
        pressAction: {
          id: "default",
          mainComponent: "App",
        },
      },
      data: remoteMessage?.data!,
    });
  }

  return {};
};
