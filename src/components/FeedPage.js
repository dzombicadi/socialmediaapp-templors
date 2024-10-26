import "../styles/FeedPage.css";
import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.tsx";
import { serverTimestamp } from "firebase/firestore";
import { FeedService } from "../services/FeedService.ts";
import SidebarNav from "./SidebarNav"; // Import the SidebarNav component
import { getUserData } from "../services/UserProvider.ts";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [newCommentContent, setNewCommentContent] = useState({});
  const { uid } = useAuth();
  const feedService = useMemo(() => new FeedService(uid), [uid]);

  const fetchPosts = async () => {
    const posts = await feedService
      .getAllPosts()
      .catch((err) => "Error fetching posts: " + err);
    const fetched = posts.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      comments: doc.data().comments || [],
    })).sort((a, b) => b.time - a.time)
    .map((sortedDoc) => ({
      ...sortedDoc,
      time: new Date(sortedDoc.time.toDate()).toLocaleString()
    }));

    setPosts(fetched);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostChange = (event) => {
    setNewPostContent(event.target.value);
  };

  const handlePostSubmit = async () => {
    if (newPostContent || newPostImage) {
      const userData = await getUserData(uid);
      var newpost;
      if (!userData) {
        newpost = {
          firstName: uid,
          lastName: uid,
          userImage: "https://via.placeholder.com/50",
          content: newPostContent,
          time: serverTimestamp(),
          likes: 0,
          comments: [],
        };
      } else {
        newpost = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          userImage: "https://via.placeholder.com/50",
          content: newPostContent,
          time: serverTimestamp(),
          likes: 0,
          comments: [],
        };
      }
      await feedService
        .feedPost(newpost)
        .catch((err) => console.log("Caught post error: " + err));
        setNewPostContent("");
      await fetchPosts();
    }
  };

  const handleCommentChange = (postId, event) => {
    setNewCommentContent((prev) => ({
      ...prev,
      [postId]: event.target.value,
    }));
  };

  const handleCommentSubmit = async (postId) => {
    const commentContent = newCommentContent[postId];
    if (commentContent) {
      try {
        await feedService.addComment(postId, {
          user: uid,
          content: commentContent,
        });
        setNewCommentContent((prev) => ({ ...prev, [postId]: "" }));
      } catch (err) {
        console.log("Error adding comment: " + err);
      }
    }
  };

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={3}>
          <SidebarNav />
        </Col>

        {/* Post feed */}
        <Col md={9}>
          <h2 className="mb-4 post-text">Here's what's new!</h2>

          <Card className="mb-4">
            <Card.Body>
              <Form>
                <Form.Group controlId="newPost">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="What's on your mind?"
                    value={newPostContent}
                    onChange={handlePostChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={handlePostSubmit}
                >
                  Post
                </Button>

                <Button
                  variant="primary"
                  className="mt-3 upload-button"
                  onClick={handlePostSubmit}
                  disabled={uploading}
                  /*onChange={handleImageUpload}*/
                >
                  {uploading ? "Uploading..." : "Upload Photo"}
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {posts.map((post) => (
            <Card className="mb-4" key={post.id}>
              <Card.Header className="d-flex align-items-center">
                <Image
                  src={post.userImage}
                  roundedCircle
                  className="mr-3"
                  style={{ width: "50px" }}
                />
                <div className="userInfo">
                  <strong>{post.firstName + " " + post.lastName}</strong>
                  <p className="text-muted mb-0">{post.time}</p>
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Text>{post.content}</Card.Text>
                {post.postImage && (
                  <Card.Img
                    src={post.postImage}
                    alt="Post image"
                    className="mb-3"
                  />
                )}
                <div className="comments-section">
                  {post.comments &&
                    post.comments.map((comment, index) => (
                      <div key={index} className="comment">
                        <strong>{comment.user}: </strong>
                        <span>{comment.content}</span>
                      </div>
                    ))}
                  <Form.Group className="d-flex" style={{ width: "100%" }}>
                    <Form.Control
                      type="text"
                      placeholder="Add a comment..."
                      value={newCommentContent[post.id] || ""}
                      onChange={(e) => handleCommentChange(post.id, e)}
                      className="flex-fill me-2"
                    />

                    <Button
                      variant="outline-primary"
                      onClick={() => handleCommentSubmit(post.id)}
                      className="comment-button"
                    >
                      Comment
                    </Button>
                  </Form.Group>
                </div>
              </Card.Body>
              <Card.Footer>
                <Button
                  id="button-like"
                  variant="outline-primary"
                  className="mr-2"
                >
                  Like ({post.likes})
                </Button>
                <Button
                  id="button-comment"
                  variant="outline-secondary"
                  className="mr-2"
                >
                  Comments ({post.comments && post.comments.length})
                </Button>
                <Button variant="outline-success">Share</Button>
              </Card.Footer>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default FeedPage;
