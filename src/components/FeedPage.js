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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext.tsx";
import { serverTimestamp } from "firebase/firestore";
import { FeedService } from "../services/FeedService.ts";

const initialPosts = [
  {
    id: 1,
    user: "John Doe",
    userImage: "https://via.placeholder.com/50",
    content: "Enjoying a great day at the park!",
    postImage: "https://via.placeholder.com/500",
    time: "2 hours ago",
    likes: 23,
    comments: [],
  },
  {
    id: 2,
    user: "Jane Smith",
    userImage: "https://via.placeholder.com/50",
    content: "Loving the new React updates!",
    postImage: "",
    time: "5 hours ago",
    likes: 15,
    comments: [],
  },
];

const FeedPage = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [newCommentContent, setNewCommentContent] = useState({});
  const { uid } = useAuth();
  const feedService = useMemo(() => new FeedService(uid), [uid]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await feedService
        .getAllPosts()
        .catch((err) => "Error fetching posts: " + err);
      const fetched = posts.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        time: new Date(doc.data().time).toLocaleString(),
        comments: doc.data().comments || [],
      }));

      setPosts(fetched);
    };

    fetchPosts();
  });

  const handlePostChange = (event) => {
    setNewPostContent(event.target.value);
  };

  // OVDJE NAPRAVITI FETCH IMENA, PREZIMENA I PORUKE
  const handlePostSubmit = async () => {
    if (newPostContent || newPostImage) {
      const newpost = {
        user: uid,
        userImage: "https://via.placeholder.com/50",
        content: newPostContent,
        time: serverTimestamp(),
        likes: 0,
        comments: [],
      };
      await feedService
        .feedPost(newpost)
        .catch((err) => console.log("Caught post error: " + err));
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

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Save the file to state
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8} className="mx-auto">
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
                  <strong>{post.user}</strong>
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
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Add a comment..."
                      value={newCommentContent[post.id] || ""}
                      onChange={(e) => handleCommentChange(post.id, e)}
                    />
                  </Form.Group>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleCommentSubmit(post.id)}
                  >
                    Comments
                  </Button>
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
                  Comment ({post.comments && post.comments.length})
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
