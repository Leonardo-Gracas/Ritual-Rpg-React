import React from "react";
import { useEffect } from "react";

export default props => {

    let element = (<button onClick={() => { props.p.way = props.way; props.func() }}
        style={props.p.way == props.id
            ? { border: '3px solid #ffffff' }
            : { border: "1px solid white" }
        }
    > {props.name}</ button>)
    if (props.target != undefined) {
        element = (<button onClick={() => { props.p.target = props.target; props.func() }}
            style={props.p.target == props.id
                ? { border: '3px solid #ffffff' }
                : { border: "1px solid white" } 
            }
        >{props.name}</button>)
    }

    return (
        <>
            {element}
        </>
    );
}