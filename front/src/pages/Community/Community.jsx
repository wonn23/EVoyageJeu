import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserState } from "../../UserContext";
import Paging from "./Paging";
import * as Api from "../../api";
import {
  Container,
  TitleContainer,
  TypeContainer,
  TypeButton,
  IndexContainer,
  ListContainer,
  ButtonContainer,
} from "./Community.style";
import { ROUTE } from "../../routes";

const Community = () => {
  const navigate = useNavigate();
  const { user } = useUserState();
  // 전체 || (여행&전기차) 구분을 위한 state
  const [activeTab, setActiveTab] = useState(true);
  // 여행 || 전기차 구분을 위한 state
  const [activeSpecificTab, setActiveSpecificTab] = useState(false);
  // 전체 조회한 post 저장
  const [posts, setPosts] = useState([]);
  // 탭 전환 시 postType에 맞게 post 저장
  const [travel, setTravel] = useState([]);
  const [elec, setElec] = useState([]);

  const [allCurrentPage, setAllCurrentPage] = useState(1);
  const [travelCurrentPage, setTravelCurrentPage] = useState(1);
  const [elecCurrentPage, setElecCurrentPage] = useState(1);

  const [postsPerPage, setPostsPerPage] = useState(5);

  const updateCommunity = async () => {
    try {
      const res = await Api.get("community");
      const dataWithAuthor = await Promise.all(
        res.data.map(async (post) => {
          const userRes = await Api.get(`users/${post.userId}`);
          const likeRes = await Api.get(`likes/${post.postId}`);
          return {
            ...post,
            author: userRes.data.userNickname,
            likeCount: likeRes.data.length,
          };
        })
      );
      setPosts(dataWithAuthor);
    } catch (err) {
      console.log("에러 발생 :", err);
    }
  };

  useEffect(() => {
    updateCommunity();
  }, [activeTab, activeSpecificTab]);

  const handleAllTab = async () => {
    setActiveTab(true);
    setAllCurrentPage(1);
  };

  const handleTravelTab = async () => {
    const travelList = posts.filter((post) => post.postType === "여행");
    setActiveTab(false);
    setActiveSpecificTab(false);
    setTravel(travelList);
    setTravelCurrentPage(1);
  };

  const handleElecTab = async () => {
    const elecList = posts.filter((post) => post.postType === "전기차");
    setActiveTab(false);
    setActiveSpecificTab(true);
    setElec(elecList);
    setElecCurrentPage(1);
  };

  let activePosts = [];
  let currentPage;
  if (activeTab) {
    activePosts = posts;
    currentPage = allCurrentPage;
  } else if (activeSpecificTab) {
    activePosts = elec;
    currentPage = elecCurrentPage;
  } else {
    activePosts = travel;
    currentPage = travelCurrentPage;
  }
  console.log("activePosts", activePosts);
  // 전체 페이지에서 현재 페이지로 자르기 위함
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = activePosts.slice(indexOfFirstPost, indexOfLastPost);
  console.log("indexOfLastPost", indexOfLastPost);
  console.log("indexOfFirstPost", indexOfFirstPost);
  console.log("currentPosts", currentPosts);
  return (
    <Container>
      <TitleContainer>
        <p>게시판</p>
      </TitleContainer>
      <TypeContainer>
        <div>
          <TypeButton disabled={activeTab} onClick={handleAllTab}>
            전체
          </TypeButton>
          <TypeButton
            disabled={!activeTab && activeSpecificTab === false}
            onClick={handleTravelTab}
          >
            여행
          </TypeButton>
          <TypeButton
            disabled={!activeTab && activeSpecificTab === true}
            onClick={handleElecTab}
          >
            전기차
          </TypeButton>
        </div>
      </TypeContainer>
      <div>
        <IndexContainer>
          <div>
            <p className="index">글 번호</p>
            <p className="title">제목</p>
            <p className="author">글쓴이</p>
            <p className="type">구분</p>
            <p className="date">등록일</p>
            <p className="likeCount">좋아요</p>
          </div>
        </IndexContainer>
        <ListContainer>
          {activeTab
            ? currentPosts.map((post) => (
                <div key={post.id}>
                  <p className="index">{post.postId}</p>
                  <Link to={`/community/${post.postId}`} className="title">
                    {post.postTitle}
                  </Link>
                  <p className="author">{post.author}</p>
                  <p className="type">{post.postType}</p>
                  <p className="date">{post.createdAt.substr(0, 10)}</p>
                  <p className="likeCount">{post.likeCount}</p>
                </div>
              ))
            : activeSpecificTab
            ? elec.map((post) => (
                <div key={post.id}>
                  <p className="index">{post.postId}</p>
                  <Link to={`/community/${post.postId}`} className="title">
                    {post.postTitle}
                  </Link>
                  <p className="author">{post.author}</p>
                  <p className="type">{post.postType}</p>
                  <p className="date">{post.createdAt.substr(0, 10)}</p>
                  <p className="likeCount">{post.likeCount}</p>
                </div>
              ))
            : travel.map((post) => (
                <div key={post.id}>
                  <p className="index">{post.postId}</p>
                  <Link to={`/community/${post.postId}`} className="title">
                    {post.postTitle}
                  </Link>
                  <p className="author">{post.author}</p>
                  <p className="type">{post.postType}</p>
                  <p className="date">{post.createdAt.substr(0, 10)}</p>
                  <p className="likeCount">{post.likeCount}</p>
                </div>
              ))}
        </ListContainer>
      </div>
      <ButtonContainer>
        <div>
          {user ? (
            <button onClick={() => navigate(ROUTE.COMMUNITYWRITE.link)}>
              글쓰기
            </button>
          ) : (
            <button onClick={() => alert("로그인 후 이용해 주세요.")}>
              글쓰기
            </button>
          )}
        </div>
      </ButtonContainer>
      {activeTab ? (
        <Paging
          page={allCurrentPage}
          count={Math.ceil(posts.length / postsPerPage)}
          setPage={setAllCurrentPage}
        />
      ) : activeSpecificTab ? (
        <Paging
          page={elecCurrentPage}
          count={Math.ceil(elec.length / postsPerPage)}
          setPage={setElecCurrentPage}
        />
      ) : (
        <Paging
          page={travelCurrentPage}
          count={Math.ceil(travel.length / postsPerPage)}
          setPage={setTravelCurrentPage}
        />
      )}
    </Container>
  );
};

export default Community;
