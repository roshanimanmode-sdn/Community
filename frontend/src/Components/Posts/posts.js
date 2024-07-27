import React from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import handleEmoji from "../../Features/HandleEmoji";
import { handleLike, likePost, postComment } from "../../Slice/PostData";
import { useState } from "react";
import { Link } from "react-router-dom";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import TelegramIcon from "@material-ui/icons/Telegram";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";

import {
    focusOnComment,
    handleShowMore,
    handleCommentLike
} from "../../Features/PostActionMethods";
import SideBar from '../SideBar/sideBar';

export default function Posts(props) {
    const dispatch = useDispatch();
    // const allPosts = useSelector((state) => state.postData);
    const allPosts = [
      {
        "profilePic": "data:image/jpeg;base64,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",
        "userID": "carryminati",
        "location": "Delhi, India",
        "postLink": "https://img.mensxp.com/media/content/2020/Sep/Image-1-Facebook-CarryMinati_5f621859f1b73.jpeg?w=500&h=625",
        "likes": 9999,
        "isLiked": false,
        "caption": "If the mountains bow in reverence so will I ~ Hillsong",
        "comments": [
            [
                "beerbiceps",
                "🔥🔥"
            ],
            [
                "rohitdhas_11",
                "💖🔥"
            ]
        ],
        "postID": 1,
        "community": "Brahmin",
        "qualification": "Engineer"
    }
    ]
    const [comment, setComment] = useState("");

    const handleCommentPost = (event, id) => {
        event.preventDefault();
        dispatch(postComment([comment, id]));
        setComment("");
    };

    return (
        <>
            <Container>
                {allPosts.length !== 0 ? (
                    allPosts.map((postData) => {
                        return (
                            <UserPost
                                key={postData.postID}
                                className={`post-${postData.postID}`}
                            >
                                <UserInfo>
                                    <div className="post-info">
                                        <div className="icon">
                                            <img src={postData.profilePic} alt="icon" />
                                        </div>
                                        <div className="id-location">
                                            <p className="user owner-id">
                                                <Link to={`/profile/${postData.userID}`}>
                                                    {postData.userID}
                                                </Link>
                                            </p>
                                            <p className="location">{postData.location}</p>
                                        </div>
                                    </div>
                                    <MoreHorizIcon />
                                </UserInfo>
                                <Media onDoubleClick={() => dispatch(likePost(postData.postID))}>
                                    <FavoriteIcon className={"like-post-" + postData.postID} />
                                    <img src={postData.postLink} alt="post" />
                                </Media>
                                <PostInfo>
                                    <PostActionIcons>
                                        <div className="actions">
                                            <FavoriteIcon
                                                className={`like-icon ${postData.isLiked ? "liked" : ""}`}
                                                onClick={() => dispatch(handleLike(postData.postID))}
                                            />
                                            <ChatBubbleOutlineOutlinedIcon
                                                onClick={() => focusOnComment(postData.postID)}
                                            />
                                            <TelegramIcon />
                                        </div>
                                        <div className="save">
                                            <BookmarkBorderIcon />
                                        </div>
                                    </PostActionIcons>
                                    <Likes>{postData.likes} likes</Likes>
                                    <Caption>
                                        <div className={`content-${postData.postID} hideContent`}>
                                            <span className="user owner-id">
                                                <Link to={`/profile/${postData.userID}`}>
                                                    {postData.userID}
                                                </Link>
                                            </span>
                                            {postData.caption}
                                        </div>
                                        <span
                                            onClick={(e) => handleShowMore(e, `${postData.postID}`)}
                                            className="show-more"
                                        >
                                            <a href="#">...more</a>
                                        </span>
                                    </Caption>
                                    <Comments>
                                        {postData.comments.length !== 0 ? (
                                            postData.comments.map((comment) => {
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
