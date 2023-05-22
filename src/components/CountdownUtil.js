import { Date } from 'react';

// get timestamp as formatted string 


export function getSecond (seconds) {

    let s = seconds % 60;
    let sStr = "";

    if ( s >= 0  && s < 10 ){
        sStr = "0"
    }
    sStr = sStr+JSON.stringify(s)
    
    return sStr;
    
}

// get timestamp as formatted string 


export function getMinute (seconds) {

    let m = Math.floor(seconds / 60);
    let mStr = "";

    if ( m >= 0  && m < 10 ){
        mStr = "0"
    }
    mStr = mStr+JSON.stringify(m)
    
    return mStr;
}