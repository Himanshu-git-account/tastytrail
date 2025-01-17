import RestaurantCard from "./RestaurantCard";
//import resList from "../utils/mockData";
import {useState,useEffect} from 'react';
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";



const Body = () =>{

    //local state variable
    const [listofRestaurant,setlistofRestaurant] = useState([]);
    const[filteredRestaurant,setfilteredRestaurant] = useState([]);

    const [searchText,setSearchText] =useState("");

    useEffect(()=>{
       fetchData();
    },[]);
    const fetchData = async () =>{
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );

        const json = await data.json();

        console.log(json,"json load");

        //optional chaining 
        setlistofRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setfilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        //console.log("mydata",json);
        //console.log(json, "json data api");
        //console.log(json,"json");
        console.log (json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants,"new data")
    };

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false) return (
    
    <h1>Looks like you are offline !!!</h1>
    );






    //shimmer ui
    //if (listofRestaurant.length === 0) {
     //   return <Shimmer/>;
    //}


    //conditional rendering with ternary operator
    return listofRestaurant.length === 0 ? <Shimmer/> :(
        <div className="body">
            <div className="filter">
                <div className="search m-4 p-4">
                    <input type="text" className="border border-solid border-black" value={searchText} 
                    onChange={(e)=> {
                        setSearchText(e.target.value);

                        }}
                    />
                    <button className= "px-4  py-2 bg-green-100 m-4" onClick={()=>{

                        const filteredRestaurant= listofRestaurant.filter(
                            (res)=> res.info.name.toLowerCase().includes(searchText.toLowerCase()) );

                            setfilteredRestaurant (filteredRestaurant);


                    }}>
                        Search
                    </button>
                </div>
                <button 
                className="filter-btn" 
                onClick={()=>{
                    
                  
                    const filteredList = listofRestaurant.filter(
                        (res)=>res.info.avgRating > 4.4
                        );
                        console.log(listofRestaurant);
                        setlistofRestaurant(filteredList);
                    }}
                >
                    Top Rated Restaurants
                </button>
             </div>
            <div className="res-container">
                {
                    filteredRestaurant.map((restaurant)=>
                    (
                    <Link key={restaurant.info.id} 
                    to={"/restuarants/"+restaurant.info.id}
                    >
                        <RestaurantCard resData={restaurant}/>
                    </Link>
                    ))}
                
               
            </div>
        </div>
    );
};

export default Body;