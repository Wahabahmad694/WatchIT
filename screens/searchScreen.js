import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { tailwind } from "react-native-tailwindcss";
import LoadingComponent from "../components/loading";
import { debounce } from "lodash"
import { baseUrl } from "../api/moviedb";


const { width, height } = Dimensions.get('window');


const SearchScreen = () => {
    const navigation = useNavigation();
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    let movieName = "Avengers: Endgame ";

    const handleSearchQuery = value => {
        if (value && value.length > 2) {
            setLoading(true);
            searchMovie(value)
        } else {
            setLoading(false);
            setResult([]);
        }

    }

    const handleTextBounceRate = useCallback(debounce(handleSearchQuery, 400), [])

    const searchMovie = async (query) => {
        const movieSearchEndPoint = `${baseUrl}/search/movie?query=${query}&include_adult=false`;


        let result = await fetch(movieSearchEndPoint, {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTUwMDY4OTJiODczNGU4OTY2ZDg0ZTZiYTFkNjJjYiIsIm5iZiI6MTcyNjgyNzczOS4wMTM5MTcsInN1YiI6IjY2ZWQ0NTcyMmRjYjc1OGJiZmFkYmM3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nwh94vH99jIFBQhbz6f4bRFzozOnck2lK0mi6umT8S8'
            },
        });
        result = await result.json();
        if (result && result.results) setResult(result.results);
        setLoading(false);


    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(38 38 38)' }}>
            <View style={[tailwind.mX4, tailwind.mB3, tailwind.flexRow, tailwind.justifyBetween, tailwind.itemsCenter, tailwind.roundedFull, { backgroundColor: 'black ', marginTop: 20, borderColor: '#575759', borderWidth: 2 }]}>
                <TextInput
                    placeholder="Search Movie"
                    placeholderTextColor={'white'}
                    onChangeText={handleTextBounceRate}
                    style={[tailwind.pB1, tailwind.pL6, tailwind.flex1, tailwind.textBase, tailwind.fontSemibold, tailwind.textWhite, tailwind.trackingWider]}
                />
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Home') }}
                    style={[tailwind.roundedFull, tailwind.p3, tailwind.m1, { backgroundColor: 'white', marginRight: 5 }]}
                >
                    <XMarkIcon size={20} color="black" />
                </TouchableOpacity>
            </View>


            {/* Search result list */}
            {
                loading ?
                    (
                        <LoadingComponent />
                    ) :

                    result.length > 0
                        ?
                        (
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 5 }}>

                                <Text style={[tailwind.textWhite, tailwind.fontSemibold, tailwind.mL1, tailwind.textBase]}>
                                    Results ({result.length})
                                </Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 10 }}>
                                    {
                                        result.map((item, index) => {
                                            return (
                                                <TouchableWithoutFeedback key={index} onPress={() => navigation.push("Movie", item)}>
                                                    <View style={[tailwind.mB4, { paddingVertical: 5 }]}>
                                                        <Image
                                                            source={{ uri: `https://image.tmdb.org/t/p/w185${item?.poster_path}` }}
                                                            style={{ width: width * 0.44, height: height * 0.3, borderRadius: 30 }} />

                                                        <Text style={[tailwind.mL1, { color: 'white', marginTop: 10 }]}>
                                                            {item?.title.length > 10 ? item?.title.slice(0, 10) + '...' : item?.title}
                                                        </Text>

                                                    </View>

                                                </TouchableWithoutFeedback>
                                            )
                                        })
                                    }

                                </View>
                            </ScrollView>
                        ) :
                        (
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={require('../assets/noResult.png')}
                                    style={{ height: 300, width: 300, marginTop: 150 }}

                                />
                            </View>
                        )
            }





        </SafeAreaView>
    );

}


export default SearchScreen;