"use client"
import ReactTimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/fr";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const formatter = buildFormatter(frenchStrings);


export default function TimeAgo({createdAt}){
    return (
        <>
            <ReactTimeAgo date={createdAt}/>
        </>
    )
}