import Colors from "@app/assets/colors/Colors"
import { IC_CLOSE } from "@app/assets/icons"
import { FontFamily } from "@app/constants"
import {
  HomeScreen,
} from "@app/screens"
import { moderateScale, scale } from "@app/utils/scale"
import { Storage, StorageKeys } from "@app/utils/storage"
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useLayoutEffect, useState } from "react"
import { StyleSheet, TouchableHighlight, View } from "react-native"
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Routes from "./Routes"
import { useSelector } from "react-redux"
import { RootState } from "@app/app-reduxs/store"

const BottomTabStack = createBottomTabNavigator()
const getTabIcon = (index: number, isFocused: boolean) => {
  switch (index) {
    case 0:
      return <IC_CLOSE isActive={isFocused} />
    case 1:
      return <IC_CLOSE isActive={isFocused} />
    case 2:
      return <IC_CLOSE isActive={isFocused} />
    // case 2:
    //   return <IC_NOTICE isActive={isFocused} />
    // case 3:
    //   return <IC_PERSONAL isActive={isFocused} />
  }
}

const ICON_ACTIVE_SIZE = scale(40)
const ICON_INACTIVE_SIZE = scale(24)
function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets()
  const accessToken = useSelector((state: RootState) => state.appReducer.accessToken);
  return (
    <View style={{ backgroundColor: Colors.background }}>
      <View
        style={[
          styles.tabBarContainer,
          {
            paddingBottom: insets.bottom,
            height: scale(66) + insets.bottom,
          },
        ]}
      >
        {state.routes.map((route: any, index: number) => {
          const [labelPerson, setLabelPerson] = useState(
            JSON.parse(Storage.getString(StorageKeys.userInfo) || "{}")
              ?.first_name || "Cá nhân",
          )
          const { options } = descriptors[route.key]
          const label =
            index == 2
              ? labelPerson
              : options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name
          const isFocused = state.index === index
          const Icon = getTabIcon(index, isFocused)
          const anim = useSharedValue(0)
          const textWidth = useSharedValue(0)

          useLayoutEffect(() => {
            anim.value = withTiming(isFocused ? 1 : 0, { duration: 400 })
          }, [isFocused])

          useLayoutEffect(() => {
            if (index != 2) return
            const listener = Storage.addOnValueChangedListener((key) => {
              if (key === StorageKeys.userInfo) {
                const info = JSON.parse(Storage.getString(key) || "{}")
                if (info.first_name) {
                  setLabelPerson(info.first_name)
                }
              }
            })

            return () => {
              listener.remove()
            }
          }, [])

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            })
            if (index == 2 && !accessToken) {
              return navigation.navigate(Routes.LOGIN)
            }
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              //@ts-ignore
              navigation.navigate({ name: route.name, merge: true })
            }
          }

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            })
          }

          const tabAnimStyles = useAnimatedStyle(() => {
            const flex = interpolate(anim.value, [0, 1], [2.5, 5])
            return { flex }
          })

          const iconAnimStyles = useAnimatedStyle(() => {
            const size = interpolate(
              anim.value,
              [0, 1],
              [ICON_INACTIVE_SIZE, ICON_ACTIVE_SIZE],
            )
            const backgroundColor = interpolateColor(
              anim.value,
              [0, 1],
              [Colors.transparent, "#CC1D2E"],
            )
            return {
              width: size,
              height: size,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor,
            }
          })

          const labelAnimStyles = useAnimatedStyle(() => {
            const width = interpolate(anim.value, [0, 1], [0, textWidth.value])
            return { width }
          })

          return (
            <Animated.View key={route.key} style={tabAnimStyles}>
              <TouchableHighlight
                key={route.key}
                underlayColor="white"
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabContainer}
              >
                <View style={styles.vCenter}>
                  <Animated.View
                    style={[{ borderRadius: scale(15) }, iconAnimStyles]}
                  >
                    {Icon}
                  </Animated.View>
                  <Animated.View
                    style={[{ marginLeft: scale(10) }, labelAnimStyles]}
                  >
                    <MulishText
                      numberOfLines={1}
                      ellipsizeMode={index != 2 ? "clip" : "tail"}
                      style={[
                        styles.tabItemLabel,
                        index == 2 && { maxWidth: scale(110) },
                        { opacity: isFocused ? 1 : 0 },
                      ]}
                    >
                      {label}
                    </MulishText>
                  </Animated.View>
                  <MulishText
                    onLayout={(event) => {
                      textWidth.value = event.nativeEvent.layout.width
                    }}
                    style={[
                      styles.tabItemLabel,
                      index == 2 && { maxWidth: scale(110) },
                      { position: "absolute", opacity: 0, zIndex: 0 },
                    ]}
                  >
                    {label}
                  </MulishText>
                </View>
              </TouchableHighlight>
            </Animated.View>
          )
        })}
      </View>
    </View>
  )
}
const HomeStack = createNativeStackNavigator()
const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName={Routes.HOME_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name={Routes.HOME_SCREEN} component={HomeScreen} />
    </HomeStack.Navigator>
  )
}

// const NoticeNavigator = () => {
//   return (
//     <HomeStack.Navigator
//       initialRouteName={Routes.NOTICE_LIST}
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <HomeStack.Screen name={Routes.NOTICE_LIST} component={NoticeList} />
//       <HomeStack.Screen name={Routes.NOTICE_DETAIL} component={NoticeDetail} />
//     </HomeStack.Navigator>
//   )
// }

const ProfileNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName={Routes.PROFILE}
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name={Routes.PROFILE} component={Profile} />
      <HomeStack.Screen name={Routes.PROFILE_EDIT} component={ProfileEdit} />
      <HomeStack.Screen
        name={Routes.MY_COURSES_LIST}
        component={MyCoursesList}
      />
      <HomeStack.Screen name={Routes.MY_SETTING} component={MySetting} />
    </HomeStack.Navigator>
  )
}

const PracticeStack = createNativeStackNavigator()
const PracticeNavigator = () => {
  return (
    <PracticeStack.Navigator
      initialRouteName={Routes.HOME_COURSE_LIST}
      screenOptions={{
        headerShown: false,
      }}
    >
      <PracticeStack.Screen
        name={Routes.HOME_COURSE_LIST}
        component={CourseList}
      />
      {/* <PracticeStack.Screen
        name={Routes.PRACTICE_ROOM}
        component={PracticeRoom}
      /> */}
    </PracticeStack.Navigator>
  )
}

const BottomTabNavigator = () => {
  return (
    <>
      <BottomTabStack.Navigator
        initialRouteName={Routes.HOME_NAVIGATOR}
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <BottomTabStack.Screen
          options={{
            tabBarShowLabel: false,
            tabBarLabel: "Home",
          }}
          name={Routes.HOME_NAVIGATOR}
          component={HomeNavigator}
        />
        <BottomTabStack.Screen
          options={{
            tabBarShowLabel: false,
            tabBarLabel: "Luyện tập",
          }}
          name={Routes.PRACTICE_NAVIGATOR}
          component={PracticeNavigator}
        />
        {/* <BottomTabStack.Screen
          options={{
            tabBarShowLabel: false,
            tabBarLabel: "Thông báo",
          }}
          name={Routes.NOTICE_NAVIGATOR}
          component={NoticeNavigator}
        /> */}
        <BottomTabStack.Screen
          options={{
            tabBarShowLabel: false,
            tabBarLabel: "Cá nhân",
          }}
          name={Routes.USER_NAVIGATOR}
          component={ProfileNavigator}
        />
      </BottomTabStack.Navigator>
    </>
  )
}

export default BottomTabNavigator
const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: scale(30),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    shadowColor: "#903636",
    shadowOffset: {
      width: scale(2),
      height: -scale(2),
    },
    shadowOpacity: 0.08,
    shadowRadius: scale(24),
    elevation: 24,
  },
  tabContainer: {
    flex: 2.5,
    justifyContent: "center",
    alignItems: "center",
  },
  vCenter: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tabItemLabel: {
    fontFamily: FontFamily.Mulish500,
    fontSize: moderateScale(16),
    color: "#CC1D2E",
  },
})
