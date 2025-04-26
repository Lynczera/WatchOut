import { api } from "@/services/api";
import { Game, GamesResponse } from "@/types/game";
import { GameEvent } from "@/types/event";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Keyboard,
    ImageSourcePropType,
    Image,
    Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface OwnerEventModalProps {
    visible: boolean;
    onClose: () => void;
    logo: ImageSourcePropType;
    title: string;
    gameTime: string;
    Gid: number;
}

const GameInfoModal = ({ visible, onClose, logo, title, gameTime, Gid }: OwnerEventModalProps) => {
    const handleConfirm = (id: number) => {
        onClose()
        router.push(`/gameEvents/${id}`);

    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.background}>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.closeButton}
                    >
                        <Icon name="close" size={30} color="black" />
                    </TouchableOpacity>
                    <View style={styles.TitleContainer}>
                        <Text style={styles.titleText}>{title}</Text>
                        <Image source={logo} style={styles.imageStyle} resizeMode="contain" />
                    </View>
                    <View style={styles.modalTitleView}>
                        <Text>{gameTime}</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.createBtnStyle} onPress={() => handleConfirm(Gid)}>
                            <Text style={styles.CreateBtnTextStyle}>See events for this game</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    background: {
        // display: "flex",
        flex: 1,
        backgroundColor: "rgba(0,0,30,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        width: "85%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        paddingTop: 5,
        alignItems: "flex-start",
        minHeight: "55%",
        maxHeight: "85%",
    },
    closeButton: {
        alignSelf: "flex-end",
        padding: 5,
    },
    btnContainer: {
        width: "100%",
        marginTop: 16,
    },
    modalTitleView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    modalTitle: {
        fontSize: 32,
    },
    TitleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    titleText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 16
    },
    imageStyle: {
        width: 100,
        height: 100,
    },
    eventDescription: {
        width: '100%',
        height: 100,
        borderWidth: 1,
        alignSelf: 'center'
    },
    descContainer: {
        width: '100%',
        gap: 4
    },
    createBtnStyle: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        width: "100%",
        height: 50,
        backgroundColor: "black",
        marginBlock: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
    },
    cancelBtnStyle: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        width: "100%",
        height: 50,
        backgroundColor: "white",
        marginBlock: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        borderWidth: 1,
    },
    CreateBtnTextStyle: {
        color: "white",
    },
    CancelBtnTextStyle: {
        color: "black",
    },
});

export default GameInfoModal;
