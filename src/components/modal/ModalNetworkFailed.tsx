import { FontFamily } from "@app/constants";
import { moderateScale, scale } from "@app/utils/scale";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../button";

const ModalNetworkFailed = () => {
    const [visible, setVisible] = useState(false);
    const netInfo = useNetInfo();

    useEffect(() => {
        if (netInfo?.isConnected != null) {
            setVisible(!netInfo?.isConnected);
        }
    }, [netInfo?.isConnected]);

    return (
        <Modal
            visible={visible}
            animationType="fade"
            statusBarTranslucent={true}
            transparent
        >
            <View style={styles.viewContain}>
                <View style={styles.viewModal}>
                    <Text style={styles.textTitle1}>
                        {`Kết nối thất bại`}
                    </Text>
                    <Text style={styles.textTitle2}>
                        {'Vui lòng kiểm tra lại đường truyền'}
                    </Text>
                    <View
                        style={{
                            width: '100%',
                        }}
                    >
                        <PrimaryButton
                            title="Xác nhận"
                            style={{ width: scale(163), height: scale(48) }}
                            onPress={() => {
                                setVisible(false)
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBtn: {
        color: '#007AFF',
        fontSize: moderateScale(25),
        lineHeight: moderateScale(33),
        fontFamily: 'ヒラギノ角ゴ PRO W6',
        fontWeight: '600',
    },
    vBtn: {
        height: scale(62),
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
        flexDirection: 'row',
    },
    textTitle: {
        fontFamily: FontFamily.Manrope700,
        fontSize: moderateScale(20),
        lineHeight: moderateScale(33),
        marginLeft: scale(10),
    },
    textTitle1: {
        marginBottom: scale(8),
        fontSize: moderateScale(20),
        lineHeight: moderateScale(33),
        fontFamily: FontFamily.Manrope700,
        textAlign: 'center',
        color: '#1E1E1E'
    },
    textTitle2: {
        marginBottom: scale(24),
        fontFamily: FontFamily.Manrope400,
        fontSize: moderateScale(18),
        lineHeight: moderateScale(25),
        textAlign: 'center',
        color: '#1E1E1E'
    },
    viewModal: {
        backgroundColor: '#FFFFFF',
        width: scale(400),
        alignItems: 'center',
        borderRadius: scale(30),
        padding: scale(24),
    },
    viewContain: {
        flex: 1,
        backgroundColor: '#101C2D66',
        alignItems: 'center',
        paddingHorizontal: scale(20),
        justifyContent: 'center',
    },
});
export default ModalNetworkFailed;