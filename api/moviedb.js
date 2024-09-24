import axios from "axios";
import { apiKey } from "../contants/constants";


//endpoints
export const baseUrl = 'https://api.themoviedb.org/3';
const trendingMovieENdPoint = `${baseUrl}/trending/movie/day`;
const upcomingMovieEndPoint = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMovieEndPOint = `${baseUrl}/movie/top_rated?api_key=${apiKey}`



const apiCall = async (endPoints, params) => {
    const option = {
        method: 'GET',
        url: endPoints,
        params: { language: 'en-US', params: params },
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTUwMDY4OTJiODczNGU4OTY2ZDg0ZTZiYTFkNjJjYiIsIm5iZiI6MTcyNjgyNzczOS4wMTM5MTcsInN1YiI6IjY2ZWQ0NTcyMmRjYjc1OGJiZmFkYmM3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nwh94vH99jIFBQhbz6f4bRFzozOnck2lK0mi6umT8S8'
        }
    }
    const response = await axios.request(option);
    console.log(response.data);

    // try {
    //     console.log("options: " + option)
    //     const response = await axios.request(option);
    //     console.log(response.data);
    // } catch (error) {
    //     console.log()
    // }

}




export const fetchTrendingMovies = () => {
    return apiCall(trendingMovieENdPoint)
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMovieEndPoint);
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMovieEndPOint);
}