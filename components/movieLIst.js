import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ScrollView, Dimensions, TouchableWithoutFeedback, Image } from "react-native";
import { tailwind } from "react-native-tailwindcss";

var { width, height } = Dimensions.get('window');


const MovieList = (props) => {
    let list = props.data;
    let seeAll = props.hideSeeAll;
    const navigation = useNavigation();
    return (
        <View style={{ marginBottom: 10, paddingVertical: 5 }}>
            <View style={[tailwind.mX4, tailwind.flexRow, tailwind.justifyBetween, tailwind.itemsCenter, { marginTop: 10 }]}>
                <Text style={[tailwind.textWhite, tailwind.textXl]}>{props.title}</Text>
                {
                    !seeAll ? <TouchableOpacity>
                        <Text style={{ color: 'orange', fontSize: 15 }}>See all</Text>
                    </TouchableOpacity>
                        : null
                }

            </View>
            {/* movie row */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 9, marginTop: 15 }}>
                {
                    list.map((item, index) => {
                        // console.log("item -poster path: " + item.poster_path)
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.push("Movie", item)}
                            >
                                <View style={{ paddingVertical: 4, marginHorizontal: 7 }} >
                                    <Image
                                        source={{ uri: `https://image.tmdb.org/t/p/w185${item.poster_path}` }}
                                        style={{ borderRadius: 30, width: width * 0.33, height: height * 0.22 }}
                                    />
                                    <Text style={{ color: 'white', marginLeft: 3, marginTop: 15 }}>
                                        {
                                            item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title
                                        }
                                    </Text>

                                </View>
                            </TouchableWithoutFeedback>
                        )


                    })
                }

            </ScrollView>


        </View>
    );
}


export default MovieList;