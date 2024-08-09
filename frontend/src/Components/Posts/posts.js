import React, { useEffect } from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import handleEmoji from "../../Features/HandleEmoji";
import { handleLike, likePost, postComment } from "../../Slice/PostData";
import { saveAllPost } from "../../Slice/PostSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import TelegramIcon from "@material-ui/icons/Telegram";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import DefaultPic from "../../assets/img/default_image.png"
import {
    focusOnComment,
    handleShowMore,
    handleCommentLike
} from "../../Features/PostActionMethods";
import { fetchAllUsers } from '../../Services/Auth.service';
import archieveIcon from "../../assets/sidebar/archieve.svg";
import { archieveUserAPI } from '../../Services/Archieve.service';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Posts() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state);
    // console.log("user--",user);
    
    const [allPosts, setAllPosts] = useState([]);
    const [archeive, setArchieve] = useState(false);

    useEffect(() => {
      const fetchAllUserData = async () => {
          try {
              const getData = await fetchAllUsers(dispatch);
              if (getData?.status) {
                  setAllPosts(getData?.data);
                  // console.log("allPosts",getData?.data);
              } else {
                console.log("Error:",getData?.message);
                
              }
          } catch (error) {
              console.error('Failed to fetch user data:', error);
          }
      };
  
      fetchAllUserData();
  }, []);

    const [comment, setComment] = useState("");

    const handleCommentPost = (event, id) => {
        event.preventDefault();
        dispatch(postComment([comment, id]));
        setComment("");
    };

    const handleArchieve = async(userId) => {
      setArchieve(!archeive);
      if(archeive) {
        const response = await archieveUserAPI({userId: userId});
        console.log("archieve user res--",response);
        if(response?.status) {
          toast.success(response?.message);
        }
      }
    }

    return (
        <>
            <Container>
                {allPosts?.length !== 0 ? (
                    allPosts.map((postData) => {
                        return (
                            <UserPost
                                key={postData._id}
                                className={`post-${postData.postID}`}
                            >
                                <UserInfo>
                                    <div className="post-info">
                                        <div className="icon">
                                            <img src={postData?.profilePic ? postData?.profilePic : DefaultPic} alt="icon" />
                                        </div>
                                        <div className="id-location">
                                            <p className="user owner-id">
                                                <Link to={`/profile/${postData?._id}`}>
                                                    {postData?.fullName}
                                                </Link>
                                            </p>
                                            <p className="location">{postData?.address ? postData?.address : "Nagpur"}</p>
                                        </div>
                                    </div>
                                    <MoreHorizIcon />
                                </UserInfo>
                                <Media onDoubleClick={() => dispatch(likePost(postData?._id))}>
                                    <FavoriteIcon className={"like-post-" + postData?._id} />
                                    <img src={postData?.profilePic ? postData?.profilePic : DefaultPic} alt="post" />
                                </Media>
                                <PostInfo>
                                    <PostActionIcons>
                                        <div className="actions">
                                            <FavoriteIcon
                                                className={`like-icon ${postData?.isLiked ? "liked" : ""}`}
                                                onClick={() => dispatch(handleLike(postData?._id))}
                                            />
                                            <ChatBubbleOutlineOutlinedIcon
                                                onClick={() => focusOnComment(postData.postID)}
                                            />
                                            <TelegramIcon />
                                        </div>
                                        <div className="save" onClick={() => handleArchieve(postData._id)}>
                                            {archeive ? <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>}
                                        </div>
                                    </PostActionIcons>
                                    <Likes>{postData?.likes ? postData?.likes : 999} likes</Likes>
                                    {/* About Yourself */}
                                    <Caption>
                                        <div className={`content-${postData?._id} hideContent`}>
                                            <span className="user owner-id">
                                                <Link to={`/profile/${postData?._id}`}>
                                                    {postData?.fullName}
                                                </Link>
                                            </span>
                                            {postData?.aboutYourself ? postData?.aboutYourself : ""}
                                        </div>
                                        <span
                                            onClick={(e) => handleShowMore(e, `${postData?._id}`)}
                                            className="show-more"
                                        >
                                            <a href="#">...more</a>
                                        </span>
                                    </Caption>

                                    <Comments>
                                        {postData?.comments?.length !== 0 ? (
                                            postData?.comments?.map((comment) => {
                                                return (
                                                    <li key={comment[1]}>
                                                        <div>
                                                            <Link to={`/profile/${comment[0]}`}>
                                                                <p className="user">{comment[0]}</p>
                                                            </Link>
                                                            <p className="comment">{comment[1]}</p>
                                                        </div>
                                                        <div>
                                                            <FavoriteIcon
                                                                onClick={handleCommentLike}
                                                                style={{ fontSize: 11 }}
                                                            />
                                                        </div>
                                                    </li>
                                                );
                                            })
                                        ) : (
                                            <p className="empty-comment-box">No Comments Yet!</p>
                                        )}
                                    </Comments>

                                    <CommentInput>
                                        <SentimentSatisfiedOutlinedIcon
                                            onClick={(event) =>
                                                handleEmoji(event, `${postData.postID}`)
                                            }
                                        />
                                        <form onSubmit={(e) => handleCommentPost(e, postData.postID)}>
                                            <input
                                                className={`comment-input-${postData.postID}`}
                                                type="text"
                                                placeholder="Add a comment..."
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            />
                                        </form>
                                        <a
                                            href="#"
                                            onClick={(e) => handleCommentPost(e, postData.postID)}
                                        >
                                            Post
                                        </a>
                                    </CommentInput>
                                </PostInfo>
                            </UserPost>
                        );
                    })
                ) : (
                    <h1>No Posts Yet!</h1>
                )}
            </Container>
        </>
    )
}

const Container = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 0 40px;
  }
`;

const UserPost = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  border: 1px solid hsl(147, 7%, 75%);
  font-size: 14px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  a,
  .user {
    text-decoration: none;
    color: black;
    font-weight: bold;
    margin-right: 5px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  svg {
    cursor: pointer;
    margin-right: 7px;
    color: #2f2d2d;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const UserInfo = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;

  .post-info {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .icon {
      margin-right: 10px;
    }
  }
`;

const Media = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    position: absolute;
    background: transparent;
    color: tomato;
    transform: scale(0);
    opacity: 0;
    font-size: 80px;
    transition: all 0.2s ease-in;
  }

  svg.active {
    transform: scale(1);
    opacity: 1;
  }

  img {
    width: 100%;
    border-bottom: 1px solid hsl(147, 7%, 75%);
  }
`;

const PostInfo = styled.div`
  padding: 10px 15px;
`;

const PostActionIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .like-icon.liked {
    color: tomato;
  }
`;

const Likes = styled.p`
  font-weight: bold;
  margin: 5px 0;
`;

const Caption = styled.section`
  .hideContent {
    overflow: hidden;
    height: 1.3em;
  }
  .showContent {
    line-height: auto;
    height: auto;
  }
`;

const Comments = styled.div`
  margin: 10px 0;

  li {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      display: flex;
    }
  }

  .empty-comment-box {
    color: grey;
  }
`;

const CommentInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid hsl(147, 7%, 75%);
  padding: 8px 0;

  form,
  input {
    border: none;
    outline: none;
    font-size: 15px;
    width: 100%;
  }

  a {
    margin: 0 10px;
    font-size: 15px;
    font-weight: bold;
    color: royalblue;
    text-decoration: none;
  }
`;
