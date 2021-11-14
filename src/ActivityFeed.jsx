import React, {useEffect, useState} from 'react';

import Moment from 'react-moment';
import axios from 'axios';

import DetailModal from './DetailModal.jsx';

export default function ActivityFeed(props) {

    const [activityFeed, setActivityFeed] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showingArchived, setShowingArchived] = useState(false);
    const [detailData, setDetailData] = useState([]);

    //will be called right after mount
    useEffect(()=>{
      getActivityFeed();
    },[])
  
    //Get Activity Feed
    function getActivityFeed(){
      axios.get('https://aircall-job.herokuapp.com/activities')
      .then(res=>{
        //sort all calls by date, showing the latest call first
        res.data.sort((a,b)=>{
          return new Date(b.created_at) - new Date(a.created_at);
        })
        setActivityFeed(res.data);
      })
      .catch(err=>{
          console.log(err);
      })
    }

    //Refresh all Archived Calls
    function refreshArchivedState(){
        axios.get('https://aircall-job.herokuapp.com/reset')
            .then(res=>{
                // setShowingArchived(!showingArchived);
                getActivityFeed();
            })
            .catch(err=>{
                console.log(err);
            })
    }

    //this function will open the detail screen
    function openDetail(id){
        // console.log(id);
        setShowModal(!showModal);
        // console.log(activityFeed.filter((item)=> item.id === id)[0]);
        setDetailData(activityFeed.filter((item)=> item.id === id)[0]);
        // console.log(id);
    }

    //Archive / Unarchive a call
    function handleArchive(id){
        console.log(activityFeed);
        activityFeed[activityFeed.findIndex(el => el.id === id)].is_archived = !showingArchived;
        if (activityFeed.length > 0) {
            //spreading the array is not the best idea for larger data sets, but we I wanted to avoid extra API calls at all costs
            setActivityFeed([...activityFeed]);
        }
    }

    //Archive certain call
    function archive(id){
        axios.post(`https://aircall-job.herokuapp.com/activities/${id}`, {
            is_archived: true
          })
          .then(function (res) {
            handleArchive(id);
          })
          .catch(function (err) {
            console.log(err);
          });
    }

    //toggle to swtich between showing archived and unarchived calls
    function showArchived(){
        setShowingArchived(!showingArchived);
        console.log(showingArchived);
        // setActivityFeed(sortActivityFeed(activityFeed));
    }

    // function sortActivityFeed(data){
    //     if(showingArchived)
    //     {
    //         return data.filter((item) => item.is_archived === true);
    //     }else{
    //         return data.filter((item) => item.is_archived === false);
    //     }
    // }

    //variables used for tracking unique time groups
    var prevDate = "";
    var showDateGroup = true;

    return (
        <div className="activityFeed">
            <div className={`${"modal-view"} ${showModal === false ? "hidden" : ""}`}>
                <DetailModal data={detailData} onClick={()=>{setShowModal(!showModal)}}></DetailModal>
            </div>
            <div className="refresh-archived-container row">
                <div onClick={refreshArchivedState}>
                    <i className="fas fa-box"></i>
                    <h1>Reset Archived Calls</h1>
                </div>
                {
                    !showingArchived ? <button className="btn btn-sm btn-outline-success" onClick={showArchived}>Show Archived</button>
                    : <button className="btn btn-sm btn-outline-success" onClick={showArchived}>Hide Archived</button>
                }
                
            </div>
            {
                //will render call data for each instance in activity feed
                activityFeed.map((val,indx)=>{
                    //checking for unique time groups
                        if(prevDate !== val.created_at.split('T')[0] && val.is_archived === showingArchived)
                        {
                            prevDate = val.created_at.split('T')[0];
                            showDateGroup = true;
                        }else{
                            showDateGroup = false;
                        }

                    if(val.is_archived === showingArchived)
                    {
                        return (
                            <div key={indx}>
                                {showDateGroup ? 
                                <div className="time-group">
                                    <span className="dots"/><Moment format="MMMM, DD YYYY">{val.created_at}</Moment> <span className="dots"/>
                                </div> 
                                : null  }
                                {/* <Moment className="time-group" format="MMMM,DD YYYY">{tmp}</Moment> */}
                                <div className="activity-container row" id={val.id}>
                                    
                                    <div className="col-1">
                                    {
                                        val.call_type === "missed" ?( 
                                        <i className="fas fa-phone-alt"></i>)
                                        : (
                                            val.call_type === "voicemail" ?
                                            <i className="fas fa-voicemail"></i>
                                            :
                                            <i className="fas fa-phone"></i>
                                            )
                                    }
                                    </div>
                                    <div className="col-8">
                                        <h1 onClick={()=>openDetail(val.id)}>{val.from}</h1>
                                        <h2 className="detail">tried to call on <span className="caller-style">{val.to}</span></h2>
                                    </div>
                                    
                                    <div className="col time">
                                        {
                                            !showingArchived ?
                                            <i className="fas fa-box archive" onClick={()=>archive(val.id)}></i> : 
                                            <i className="fas fa-box-open archive" onClick={()=>archive(val.id)}></i>
                                        }
                                        <Moment format="LT">{val.created_at}</Moment>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })
            }
        </div>
    )
}
