import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import Moment from 'react-moment';

export default function DetailModal(props) {

    return (
        
        <div className="container">
           <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>{props.data.direction} call</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="row">
                    <div className="col">
                        ID:
                    </div>
                    <div className="col">
                        {props.data.id}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Created At:
                    </div>
                    <div className="col">
                        <Moment format="MMMM, DD YYYY LT">{props.data.created_at}</Moment>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        From:
                    </div>
                    <div className="col">
                        {props.data.from}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        To:
                    </div>
                    <div className="col">
                        {props.data.to}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Via:
                    </div>
                    <div className="col">
                        {props.data.via}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Duration:
                    </div>
                    <div className="col">
                        {props.data.duration} Seconds
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Is Archived:
                    </div>
                    <div className="col">
                        {props.data.is_archived}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Call Type:
                    </div>
                    <div className="col">
                        {props.data.call_type}
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onClick} variant="primary">Close</Button>
            </Modal.Footer>
            </Modal.Dialog>
            {
                ()=>{
                    // if(props.data.length > 0)
                    // console.log(props.data[0].id)
                }
            }
            
            {/* <h1>Modal here</h1>
            <h1>{props.data[0].id}</h1> */}
        </div>
    )
}
