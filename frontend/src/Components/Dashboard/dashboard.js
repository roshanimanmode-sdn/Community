import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllUsersList } from '../../Services/service';
import { requestUser } from '../../Services/socketService';
import { SideBar } from '../SideBar/sideBar';

export function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [allUser, setAllUser] = useState([]);

    // Filter out the logged-in user from the list
    const logInUserId = useSelector((state) => state.auth.data.result._id);
    const filteredUsers = allUser.filter(user => user._id !== logInUserId);

    useEffect(() => {
        const getData = async () => {
            const response = await getAllUsersList(dispatch);
            setAllUser(response);
        };
        getData();
    }, [dispatch]);

    const handleRequest = async (recevingRequestID) => {
        await requestUser(recevingRequestID, logInUserId);
        navigate("/notification");
    };

    return (
        <>
            <div className="container-fluid mt-4">
                <div className="row content">
                    <SideBar/>
                    <br />

                    <div className="col-sm-9">
                        <div className="well">
                            <h4>Dashboard</h4>
                            <p>Some text..</p>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="well">
                                    <h4>Users Count</h4>
                                    <p>02</p>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="well">
                                    <h4>Requests Count</h4>
                                    <p>02</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="well">
                                    <p>List of Users</p>
                                    <ul className="list-group">
                                        {filteredUsers.map((data) => (
                                            <li key={data?._id} className="list-group-item">
                                                {data?.name}{" "}
                                                <button className='btn btn-secondary btn-sm' onClick={() => handleRequest(data?._id)}>Request</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
