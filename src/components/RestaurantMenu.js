import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";


const RestaurantMenu = ()=>{
    const {resId} = useParams();
    //console.log(resId,"params");
    const resInfo = useRestaurantMenu(resId);

    //shimmer
if(resInfo ===null) return <Shimmer/>;


  

//destructure data for name ,cuisines avgRating
const {name, cuisines, costForTwoMessage, avgRating}  = resInfo?.cards[0]?.card?.card?.info;
 
//destructuring data for menu items
const { itemCards } = resInfo.cards[2].groupedCard.cardGroupMap.REGULAR.cards[1].card.card;
//console.log(itemCards,"itemCards");
  
    return (  
        <div className="menu">
            <h1>{name}</h1>
            <p>{cuisines.join(" , ")}- {costForTwoMessage}</p>
            <h3>{avgRating}</h3>
            <h2>Menu</h2>
             
            <ul>
                {itemCards.map((item) => (
                    <li key={item.card.info.id}>
                        {item.card.info.name} - {"Rs."}
                        {item.card.info.price/100 || item.card.info.defaultPrice} 
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default RestaurantMenu;