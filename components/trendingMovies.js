
import { Dimensions, Text, Image, TouchableWithoutFeedback, View } from "react-native";
import { tailwind } from "react-native-tailwindcss";
import Carousel from 'react-native-new-snap-carousel';
import { useNavigation } from "@react-navigation/native";
import { image342, image500 } from "../api/moviedb";

var { width, height } = Dimensions.get('window');
const TrendingMovieComponents = (props) => {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate("Movie", item);
    }

    return (
        <View style={{ marginBottom: 10 }}>
            <Text style={[tailwind.textWhite, tailwind.mX4, tailwind.textXl, tailwind.mB5]}>Trending</Text>
            <Carousel
                data={props.data}
                renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.62}
                layout={'default'}
                slideStyle={{ display: "flex", alignItems: 'center' }} />


        </View>
    );

}


const MovieCard = ({ item, handleClick }) => {
    // console.log(image500(item.poster_path));
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={{ width: width * 0.6, height: height * 0.4, borderRadius: 30 }}
            />
        </TouchableWithoutFeedback>

    );


}


export default TrendingMovieComponents;
