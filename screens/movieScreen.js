import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon, } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import LinearGradient from "react-native-linear-gradient";
import { tailwind } from "react-native-tailwindcss";
import CasteList from "../components/caste";
import MovieList from "../components/movieLIst";
import LoadingComponent from "../components/loading";
import { baseUrl } from "../api/moviedb";



var { width, height } = Dimensions.get('window');


const MovieDetailScreen = () => {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFav, setIsfav] = useState(false);
    const [cast, setCast] = useState([]);
    const [similiarMovies, setSimiliarMovies] = useState([]);
    const [movie, setMovie] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //call movie detail  
        setLoading(true);
        getMovieDetail();
        getMovieCredits();
        getSimiliarMovies();

    }, [item])


    const getMovieDetail = async () => {
        const movieDetailEndPoint = `${baseUrl}/movie/${item.id}`;

        let result = await fetch(movieDetailEndPoint, {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTUwMDY4OTJiODczNGU4OTY2ZDg0ZTZiYTFkNjJjYiIsIm5iZiI6MTcyNjgyNzczOS4wMTM5MTcsInN1YiI6IjY2ZWQ0NTcyMmRjYjc1OGJiZmFkYmM3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nwh94vH99jIFBQhbz6f4bRFzozOnck2lK0mi6umT8S8'
            },
        });
        result = await result.json();
        if (result) setMovie(result)
        setLoading(false);

    }

    const getMovieCredits = async () => {
        const movieCreditsEndPoints = `${baseUrl}/movie/${item.id}/credits`;

        let result = await fetch(movieCreditsEndPoints, {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTUwMDY4OTJiODczNGU4OTY2ZDg0ZTZiYTFkNjJjYiIsIm5iZiI6MTcyNjgyNzczOS4wMTM5MTcsInN1YiI6IjY2ZWQ0NTcyMmRjYjc1OGJiZmFkYmM3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nwh94vH99jIFBQhbz6f4bRFzozOnck2lK0mi6umT8S8'
            },
        });
        result = await result.json();
        if (result && result.cast) setCast(result.cast);

    }

    const getSimiliarMovies = async () => {
        const similiarMoviesEndPoints = `${baseUrl}/movie/${item.id}/similar`;

        let result = await fetch(similiarMoviesEndPoints, {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTUwMDY4OTJiODczNGU4OTY2ZDg0ZTZiYTFkNjJjYiIsIm5iZiI6MTcyNjgyNzczOS4wMTM5MTcsInN1YiI6IjY2ZWQ0NTcyMmRjYjc1OGJiZmFkYmM3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nwh94vH99jIFBQhbz6f4bRFzozOnck2lK0mi6umT8S8'
            },
        });
        result = await result.json();
        if (result && result.results) setSimiliarMovies(result.results);

    }
    return (
        <View style={{ flex: 1, backgroundColor: 'rgb(38 38 38)' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}>

                {/* back button and movie poster */}
                <View style={[tailwind.wFull]}>
                    <SafeAreaView
                        style={[tailwind.absolute, tailwind.z20, tailwind.wFull, tailwind.flexRow, tailwind.justifyBetween, tailwind.itemsCenter, tailwind.pX4]}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ borderRadius: 15, padding: 3, marginTop: 15, backgroundColor: 'orange', alignItems: 'center' }}>
                            <ChevronLeftIcon size={30} strokeWidth={2.5} color="white" />
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => setIsfav(!isFav)}
                            style={{ borderRadius: 15, padding: 3, marginTop: 15, alignItems: 'center' }}>
                            <HeartIcon size={40} color={isFav ? "orange" : "white"} />
                        </TouchableOpacity>
                    </SafeAreaView>

                    {
                        loading ?
                            (
                                <LoadingComponent />

                            ) :
                            (
                                <View>
                                    <Image
                                        source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
                                        style={{ width, height: height * 0.55 }}
                                    />
                                    <LinearGradient
                                        colors={['transparent', 'transparent', '#262626']}
                                        style={[{ width, height: height * 0.85 }, tailwind.absolute, tailwind.bottom0,]}
                                        start={{ x: 0.5, y: 0 }}
                                        end={{ x: 0.5, y: 1 }}
                                    />
                                </View>
                            )
                    }

                </View>

                {/* movie details */}
                <View style={{ marginTop: -(height * 0.01), paddingVertical: 10 }}>
                    {/* title */}
                    <Text style={[tailwind.textWhite, tailwind.textCenter, tailwind.text3xl, tailwind.fontBold, tailwind.trackingWider,]}>
                        {movie?.title}
                    </Text>

                    {/* status, release,runtime */}
                    {
                        movie?.id ? (
                            <Text style={[tailwind.fontSemibold, tailwind.textBase, tailwind.textCenter, { color: '#c5c6c7', paddingTop: 10 }]}>
                                {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min
                            </Text>
                        ) : null
                    }


                    {/* genres */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, }}>

                        {
                            movie?.genres?.map((genres, index) => {
                                let showDot = index + 1 != movie?.genres.length;
                                return (
                                    <Text key={index} style={[tailwind.fontSemibold, tailwind.textBase, tailwind.textCenter, { color: '#c5c6c7' }]}>
                                        {genres?.name} {showDot ? "•" : null}
                                    </Text>
                                )
                            })
                        }
                    </View>

                    {/* description */}
                    <Text style={[tailwind.trackingWide, { color: '#c5c6c7', marginHorizontal: 14, marginTop: 10 }]}>
                        {movie?.overview}
                    </Text>

                </View>

                {/* caste members */}
                {cast.length > 0 && <CasteList navigation={navigation} cast={cast} />}

                {/* similiar movies */}
                {similiarMovies.length > 0 && <MovieList title="Similiar Movies" hideSeeAll={true} data={similiarMovies} />}
            </ScrollView>
        </View>

    )
}


export default MovieDetailScreen;