import { Dimensions, Platform, ScrollView, Text, View, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { tailwind } from "react-native-tailwindcss";
import { ChevronLeftIcon, } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/movieLIst";
import LoadingComponent from "../components/loading";
import { baseUrl } from "../api/moviedb";

var { width, height } = Dimensions.get('window');
const android = Platform.OS == 'android';


const PersonScreen = () => {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFav, setIsfav] = useState(false);
    const [personDetail, setPersonDetail] = useState({});
    const [personMovieList, setPersonMovieList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getPersonDetail();
        getPersonMovieList();

    }, [item])


    const getPersonDetail = async () => {
        const movieDetailEndPoint = `${baseUrl}/person/${item.id}`;

        let result = await fetch(movieDetailEndPoint, {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTUwMDY4OTJiODczNGU4OTY2ZDg0ZTZiYTFkNjJjYiIsIm5iZiI6MTcyNjgyNzczOS4wMTM5MTcsInN1YiI6IjY2ZWQ0NTcyMmRjYjc1OGJiZmFkYmM3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nwh94vH99jIFBQhbz6f4bRFzozOnck2lK0mi6umT8S8'
            },
        });
        result = await result.json();
        if (result) setPersonDetail(result);
        setLoading(false);

    }

    const getPersonMovieList = async () => {
        const movieDetailEndPoint = `${baseUrl}/person/${item.id}/movie_credits`;

        let result = await fetch(movieDetailEndPoint, {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTUwMDY4OTJiODczNGU4OTY2ZDg0ZTZiYTFkNjJjYiIsIm5iZiI6MTcyNjgyNzczOS4wMTM5MTcsInN1YiI6IjY2ZWQ0NTcyMmRjYjc1OGJiZmFkYmM3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nwh94vH99jIFBQhbz6f4bRFzozOnck2lK0mi6umT8S8'
            },
        });
        result = await result.json();
        if (result && result.cast) setPersonMovieList(result.cast);


    }

    return (
        <View style={{ flex: 1, backgroundColor: 'rgb(38 38 38)' }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

                {/* back button */}
                <SafeAreaView
                    style={[tailwind.z20, tailwind.wFull, tailwind.flexRow, tailwind.justifyBetween, tailwind.itemsCenter, tailwind.pX4]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ borderRadius: 15, padding: 3, marginTop: 15, backgroundColor: 'orange', alignItems: 'center' }}>
                        <ChevronLeftIcon size={30} strokeWidth={2.5} color="white" />
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => setIsfav(!isFav)}
                        style={{ borderRadius: 15, padding: 3, marginTop: 15, alignItems: 'center' }}>
                        <HeartIcon size={40} color={isFav ? "red" : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>
                {/* Person detail */}
                {
                    loading ?
                        (
                            <LoadingComponent />
                        ) :
                        (
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <View style={[tailwind.border2, tailwind.roundedFull, tailwind.itemsCenter, tailwind.h72, tailwind.w72, tailwind.overflowHidden, { borderColor: '#575759', borderWidth: 2, marginTop: 20 }]}>
                                        <Image
                                            source={{ uri: `https://image.tmdb.org/t/p/w342${personDetail?.profile_path}` }}
                                            style={{ height: height * 0.35, width: width * 0.74 }}
                                        />
                                    </View>
                                </View>
                                <View style={{ marginTop: 25 }}>
                                    <Text style={[tailwind.textWhite, tailwind.fontBold, tailwind.textCenter, tailwind.text3xl]}>
                                        {personDetail?.name}
                                    </Text>
                                    <Text style={[tailwind.textGray500, tailwind.textCenter, tailwind.textBase, { marginTop: 10 }]}>
                                        {personDetail?.place_of_birth}
                                    </Text>
                                </View>

                                {/* stats for actor */}

                                <View style={[tailwind.mX3, tailwind.mT10, tailwind.flexRow, tailwind.justifyBetween, tailwind.itemsCenter, tailwind.roundedFull, { backgroundColor: '#404040', padding: 12 }]}>
                                    <View style={[tailwind.pX2, tailwind.itemsCenter, , tailwind.pR2, { borderRightWidth: 3, borderRightColor: '#a3a3a3', paddingRight: 15 }]}>
                                        <Text style={[tailwind.textWhite, tailwind.fontSemibold]}>Gender</Text>
                                        <Text style={[{ color: '#d4d4d4' }, tailwind.fontNormal]}>
                                            {
                                                personDetail?.gender == 1 ? "Female" : "Male"
                                            }
                                        </Text>
                                    </View>
                                    <View style={[tailwind.pX2, tailwind.itemsCenter, , tailwind.pR2, { borderRightWidth: 3, borderRightColor: '#a3a3a3', paddingRight: 15 }]}>
                                        <Text style={[tailwind.textWhite, tailwind.fontSemibold]}>Birthday</Text>
                                        <Text style={[{ color: '#d4d4d4' }, tailwind.fontNormal]}>{personDetail?.birthday}</Text>
                                    </View>
                                    <View style={[tailwind.pX2, tailwind.itemsCenter, , tailwind.pR2, { borderRightWidth: 3, borderRightColor: '#a3a3a3', paddingRight: 15 }]}>
                                        <Text style={[tailwind.textWhite, tailwind.fontSemibold]}>Known For</Text>
                                        <Text style={[{ color: '#d4d4d4' }, tailwind.fontNormal]}>{personDetail?.known_for_department}</Text>
                                    </View>
                                    <View style={[tailwind.pX2, tailwind.itemsCenter, tailwind.pR2]}>
                                        <Text style={[tailwind.textWhite, tailwind.fontSemibold]}>Popularity</Text>
                                        <Text style={[{ color: '#d4d4d4' }, tailwind.fontNormal]}>{personDetail?.popularity}</Text>
                                    </View>
                                </View>

                                {/* biography for actor */}
                                <View style={[tailwind.mY4, tailwind.mX4, tailwind.p2]}>
                                    <Text style={[tailwind.textWhite, tailwind.textLg]}>Biography</Text>
                                    <Text style={[tailwind.trackingWide, { color: '#a3a3a3', marginTop: 4 }]}>
                                        {personDetail?.biography || "N/A"}
                                    </Text>
                                </View>


                                {/* movie list of particular actor */}
                                <MovieList title="Movies" hideSeeAll={true} data={personMovieList} />


                            </View>
                        )
                }



            </ScrollView >
        </View >
    );
}


export default PersonScreen;