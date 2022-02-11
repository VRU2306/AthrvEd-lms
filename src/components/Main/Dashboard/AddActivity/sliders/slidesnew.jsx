// total people on leave tomorrow leave card details
import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import "./styles.css";
import PeopleIcon from "../../../../../Icons/peopleicon.svg"

function Slidesnew() {


    // today leave
    let istodayleavefetching = useStoreState((state) => state.authMod.istodayleavefetching)
    let todayleave = useStoreActions((action) => action.authMod.FETCH_TODAYLEAVE)
    let cleartodayleave = useStoreActions((action) => action.authMod.CLEAR_TODAYLEAVE)

    useEffect(() => {
        if (istodayleavefetching) todayleave();
        return () => cleartodayleave();
    }, [todayleave, cleartodayleave]);
    let todayleaves = useStoreState(state => state.authMod.todayleave.count)
    //console.logtodayleaves)


    // tomorrow leave
    let istomleavefetching = useStoreState((state) => state.authMod.istomleavefetching);
    let tomleave = useStoreActions((action) => action.authMod.FETCH_TOMLEAVE);
    let cleartomleave = useStoreActions((action) => action.authMod.CLEAR_TOMLEAVE);

    useEffect(() => {
        if (istomleavefetching) tomleave();
        return () => cleartomleave();
    }, [tomleave, cleartomleave]);
    let tomleaves = useStoreState(state => state.authMod.tomleave.count);
    //console.logtomleaves);


    //total members
    let users = useStoreState(state => state.authMod.users);
    //console.logusers)
    let isunblockedusersfetching = useStoreState((state) => state.authMod.isunblockedusersfetching)
    let getunBlockedusers = useStoreActions((action) => action.authMod.FETCH_ALL_UNBLOCKEDSERS)
    let clearunBlockedUsers = useStoreActions((action) => action.authMod.CLEAR_UNBLOCKED)

    useEffect(() => {
        if (isunblockedusersfetching) getunBlockedusers(users);
        return () => clearunBlockedUsers();
    }, [getunBlockedusers, clearunBlockedUsers, users]);


    let unblocked = useStoreState(state => state.authMod.unblocked.length);

    // console.log(unblockeds)
    // 


    return (
        <div style={{ padding: "32px 10px 32px 40px" }}>
            <div className="activitieshead">Total Members <img src={PeopleIcon} className="imagescard" /></div>
            <div className="activitiescount">{unblocked}</div>
            <div>
                <span className="leavetoday">On Leave</span>
                <span className="leavetomorrow" style={{ marginLeft: "61px" }}>Tommorow On Leave</span>
            </div>
            <div>
                <span className="leavetodaycount">{todayleaves}</span>
                <span className="leavetomorrowcount" style={{ marginLeft: "120px" }}>{tomleaves}</span>
            </div>
        </div>
    );
}
export default Slidesnew;