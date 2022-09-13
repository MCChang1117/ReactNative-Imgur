import { useState } from 'react';
import { getImage } from '../util/http';
import { parseImageResponse } from '../util/imgur';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image } from 'react-native';

const RESULT_COUNT = 10;

export function ImageInfos(){

    const [enteredImageSearchWord, setEnteredImageSearchWord] = useState('');
    const [galleries, setGalleries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    function ImageSearchHandler(enteredText){
        setEnteredImageSearchWord(enteredText);
    }
  
    async function addImageHandler(){
        setIsLoading(true);
        let galleries = await getImage(enteredImageSearchWord);
        if (galleries == null){
            // Do not have response or no result
            console.log("Result Not Found!");
            setGalleries([]);
            setIsLoading(false);
            return
        }
        let galleries_map = await parseImageResponse(galleries, RESULT_COUNT);
        setGalleries(galleries_map);
        setIsLoading(false);
    }

    if (isLoading) {
        return <Text style={styles.titleText}>Loading Result of {enteredImageSearchWord}...</Text>
    }

    return (<><View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder='Type some word to search!' onChangeText={ImageSearchHandler} />
                <Button title="Search Image" disabled={isLoading} onPress={addImageHandler}></Button>
            </View>
            <View style={styles.imageInfoContainer}>
                <ScrollView alwaysBounceVertical={false}>
                    {/* Load data from imgur api */}
                    {galleries.map((gallery) => (
                        <>
                            <View style={styles.galleryContainer}>
                                <View style={{alignItems: "center"}}>
                                    {gallery.get('urls').map((imgUrl) => {
                                        return <Image key={imgUrl} source={{uri: imgUrl}} style={{width: '80%', height: undefined, aspectRatio: 1}}></Image>
                                    })}
                                </View>
                                <Text style={styles.titleText}>Author: {gallery.get('author')}</Text>
                                <Text style={styles.titleText}>Points: {gallery.get('points')}</Text>
                                <Text style={styles.titleText}>Comments:</Text>
                                {gallery.get('comments').map((comment) => (
                                    <View style={styles.commentsBlock}>
                                        <Text style={styles.commentsText} key={comment}>
                                            {comment}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </>
                    ))}
                </ScrollView>
            </View></>
            );

}

const styles = StyleSheet.create({
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc'
    },
    textInput:{
      flex: 1,
      borderWidth: 1,
      borderColor: '#cccccc',
      width: '70%',
      marginRight: 8,
      padding: 8
    },
    imageInfoContainer: {
      flex: 6
    },
    commentsBlock: {
      margin: 8,
      padding: 8,
      borderRadius: 6,
      backgroundColor: '#5e0acc'
    },
    commentsText: {
        color: 'white'
    },
    titleText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    galleryContainer: {
        borderWidth: 5,
        padding: 5,
        marginBottom: 5
    }
  });