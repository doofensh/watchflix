import React from "react";

function Cards(props){
    return(
        <>
            <div className="cards">
                <div className="card">
                    <img className="card_img" src={props.img} alt="img not avl"></img>
                    <div className="card_info">
                        <h3 className="card_name">{props.name}</h3>
                        <a href={props.link} target="_new">
                            <button>Watch Now</button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cards;