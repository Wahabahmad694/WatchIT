import { Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { tailwind } from "react-native-tailwindcss";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";

import { useEffect, useState } from "react";
import TrendingMovieComponents from "../components/trendingMovies";
import MovieList from "../components/movieLIst";
import { useNavigation } from "@react-navigation/native";
import LoadingComponent from "../components/loading";
import { fetchTrendingMovies, fetchUpcomingMovies } from "../api/moviedb";


const android = Platform.OS == 'android';
const HomeScreen = () => {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [rated, setRated] = useState([]);
    const [Loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const baseUrl = 'https://api.themoviedb.org/3';


    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();

    }, [])


    const getTrendingMovies = async () => {
        const trendingMovieENdPoint = `${baseUrl}/trending/movie/day`;

        let result = await fetch(trendingMovieENdPoint, {
            method: "GET",
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTUwMDY4OTJiODczNGU4OTY2ZDg0ZTZiYTFkNjJjYiIsIm5iZiI6MTcyNjgyNzczOS4wMTM5MTcsInN1YiI6IjY2ZWQ0NTcyMmRjYjc1OGJiZmFkYmM3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nwh94vH99jIFBQhbz6f4bRFzozOnck2lK0mi6umT8S8'
            },
        });
        result = await result.json();
        // console.log("trending movies : " + result)
        if (result && result.results) setTrending(result.results);
        setLoading(false);

    }

    const getUpcomingMovies = async () => {

        const upcomingMovieEndPoint = `${baseUrl}/movie/upcoming`;
        let result = await fetch(upcomingMovieEndPoint, {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTUwMDY4OTJiODczNGU4OTY2ZDg0ZTZiYTFkNjJjYiIsIm5iZiI6MTcyNjgyNzczOS4wMTM5MTcsInN1YiI6IjY2ZWQ0NTcyMmRjYjc1OGJiZmFkYmM3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nwh94vH99jIFBQhbz6f4bRFzozOnck2lK0mi6umT8S8'
            },
        });
        result = await result.json();
        // console.log("upcoming movies : " + result)
        if (result && result.results) setUpcoming(result.results);
    }

    const getTopRatedMovies = async () => {
        const topRatedMovieEndPOint = `${baseUrl}/movie/top_rated`;

        let result = await fetch(topRatedMovieEndPOint, {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTUwMDY4OTJiODczNGU4OTY2ZDg0ZTZiYTFkNjJjYiIsIm5iZiI6MTcyNjgyNzczOS4wMTM5MTcsInN1YiI6IjY2ZWQ0NTcyMmRjYjc1OGJiZmFkYmM3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nwh94vH99jIFBQhbz6f4bRFzozOnck2lK0mi6umT8S8'
            },
        });
        result = await result.json();
        // console.log("top rated movies : " + result)
        if (result && result.results) setRated(result.results);
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'rgb(38 38 38)' }}>
            {/* Search bar */}
            <SafeAreaView style={[android ? tailwind.mB3 : tailwind._mB2]}>
                <StatusBar barStyle={"light-content"} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 15 }}>
                    <Bars3CenterLeftIcon size={"30"} strokeWidth={2} color="white" />
                    <Text style={[tailwind.text3xl, tailwind.textWhite, tailwind.fontBold]}>
                        Watch<Text style={{ color: "orange", fontStyle: 'italic', fontWeight: "600" }}>IT</Text></Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                        <MagnifyingGlassIcon size={"30"} strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {
                Loading ?
                    (
                        <LoadingComponent />
                    ) :
                    (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 10 }}>

                            {/* Treading Movie Carosuel */}
                            {trending.length > 0 && < TrendingMovieComponents data={trending} />}
                            {/* upcoming movie name on title */}
                            <MovieList title="Upcoming" data={upcoming} />

                            {/* top rated movie name */}
                            <MovieList title="Top Rated" data={rated} />


                        </ScrollView>
                    )

            }



        </View >
    );

}


export default HomeScreen;