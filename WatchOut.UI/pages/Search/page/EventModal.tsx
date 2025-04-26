import React from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity, ImageSourcePropType,
    Image
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface EventModalProps {
    visible: boolean;
    onClose: () => void;
    logo: ImageSourcePropType;
    title: string;
    gameTime: string;
    description: string;
    game: string;
    Eid: number;
}

const EventModal = ({ visible, onClose, logo, title, game, gameTime, description, Eid }: EventModalProps) => {

    const handleCancelCreate = () => {
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={handleCancelCreate}
        >
            <View style={styles.background}>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={handleCancelCreate}
                        style={styles.closeButton}
                    >
                        <Icon name="close" size={30} color="black" />
                    </TouchableOpacity>
                    <View style={styles.TitleContainer}>
                        <Text style={styles.titleText}>{title}</Text>
                        <Image source={logo} style={styles.imageStyle} resizeMode="contain" />
                    </View>
                    <View style={styles.modalTitleView}>
                        <Text style={styles.modalTitle}>{game}</Text>
                        <Text>{gameTime}</Text>
                    </View>
                    <View style={styles.descContainer}>
                        <Text>Event description</Text>
                        <View style={styles.eventDescription}>
                            <Text>{description}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
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
    deleteBtnStyle: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        width: "100%",
        height: 50,
        backgroundColor: "darkred",
        marginBlock: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
    },
    deleteBtnTextStyle: {
        color: "white",
        fontWeight: 'bold'
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
        alignSelf: 'center',
        padding: 4
    },
    descContainer: {
        width: '100%',
        gap: 4,
    }
});

export default EventModal;
