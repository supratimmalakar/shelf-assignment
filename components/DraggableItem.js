import React, { useRef, useCallback, } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Animated } from 'react-native';
import { DraxView } from 'react-native-drax';

function DraggableItem({ item, index, setProducts, products }) {
    const anim = useRef(new Animated.Value(0));

    const shake = useCallback((start) => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(anim.current, {
                    toValue: -2,
                    duration: 50,
                }),
                Animated.timing(anim.current, {
                    toValue: 2,
                    duration: 50,
                }),
                Animated.timing(anim.current, {
                    toValue: 0,
                    duration: 50,
                }),
            ]),
        )
        if (start) animation.start();
        else animation.stop()
    }, []);

    return (
        <DraxView
            style={[styles.centeredContent, styles.draggableBox]}
            draggingStyle={styles.dragging}
            dragReleasedStyle={styles.dragging}
            hoverDraggingStyle={styles.hoverDragging}
            dragPayload={index}
            longPressDelay={150}
            onDragStart={(data) => {
                shake(true)
            }}
            onDragEnd={(data) => {
                setProducts(prev => prev.filter((item, index) => index !== data.dragged.payload))
                shake(false)
            }}
            key={index}
        >
            <Animated.View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center', transform: [{ translateX: anim.current }] }}>
                <Image
                    style={styles.images}
                    src={item.thumbnail}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.productTitle} >{item.title}</Text>
                </View>
            </Animated.View>
        </DraxView>
    )
}

export default DraggableItem

const styles = StyleSheet.create({
    productTitle: {
        color: "white",
        textAlign: "center",
        fontSize: 16
    },
    textContainer: {
        position: 'absolute',
        bottom: 5,
        backgroundColor: "rgba(0,0,0,0.2)",
        width: "90%",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        borderRadius: 5
    },
    images: {
        width: (Dimensions.get('window').width / 2) - 10,
        height: (Dimensions.get('window').width / 2) - 10,
        borderRadius: 10,
        // margin: 20,
    },
    centeredContent: {
        borderRadius: 10,
    },
    draggableBox: {
        width: (Dimensions.get('window').width / 2) - 5,
        height: (Dimensions.get('window').width / 2) - 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    dragging: {
        opacity: 0,
    },
    hoverDragging: {

    },
});
