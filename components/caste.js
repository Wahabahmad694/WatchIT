import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { tailwind } from "react-native-tailwindcss";

const CasteList = (props) => {
    let list = props.cast;
    let navi = props.navigation;
    return (
        <View style={{ marginVertical: 10 }}>
            <Text style={[tailwind.textWhite, tailwind.textXl, tailwind.mB5, tailwind.mX4, tailwind.fontSemibold]}>Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            >
                {
                    list && list.map((person, index) => {

                        return (
                            <TouchableOpacity onPress={() => navi.navigate("Person", person)} key={index} style={[tailwind.mR4, tailwind.itemsCenter]}>

                                <Image source={{ uri: `https://image.tmdb.org/t/p/w185${person?.profile_path}` }} style={[tailwind.w20, tailwind.h24, { borderRadius: 50 }]} />
                                <Text style={[tailwind.textWhite, tailwind.textXs, tailwind.mT1]}>

                                    {
                                        person?.character.length > 10 ? person?.character.slice(0, 10) + '...' : person?.character
                                    }
                                </Text>
                                <Text style={[tailwind.textXs, tailwind.mT1, { color: '#c5c6c7' }]}>

                                    {
                                        person?.original_name.length > 10 ? person?.original_name.slice(0, 10) + '...' : person?.original_name
                                    }
                                </Text>

                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>

        </View>
    );
}



export default CasteList;