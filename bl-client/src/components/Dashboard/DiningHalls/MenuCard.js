import React, { useState, useEffect } from 'react';
import ItemCard from "./ItemCard"


function MenuCard(props) {
    const diningHallMenu = props.menu;

    return (
        <div class="menuSection" id="DeNeve">
          {diningHallMenu.map(item => {
            return (
              <ItemCard
                name={item}
                favorites={props.favorites}
                setFavorites={props.setFavorites}
                id={props.id}
                setReviewPopShow={props.setReviewPopShow}
                setReviewItemName={props.setReviewItemName}
              />
            );
          })}
        </div>
    );
}


export default MenuCard;