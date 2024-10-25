import "../styles/FeedPage.css";
import React, { Component } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Form,
} from "react-bootstrap";

// examples
const posts = [
  {
    id: 1,
    user: "John Doe",
    userImage: "https://via.placeholder.com/50",
    content: "Enjoying a great day at the park!",
    postImage: "https://via.placeholder.com/500",
    time: "2 hours ago",
    likes: 23,
    comments: 5,
  },
  {
    id: 2,
    user: "Jane Smith",
    userImage: "https://via.placeholder.com/50",
    content: "Loving the new React updates!",
    postImage: "",
    time: "5 hours ago",
    likes: 15,
    comments: 3,
  },
];

const [postImage, setPostImage] = useState(null);

class FeedPage extends React.Component {
  render() {
    return (
      <Container className="mt-4">
        <Row>
          <Col md={8} className="mx-auto">
            <h2 className="mb-4 post-text">Here's what's new!</h2>

            {/* New Post Form */}
            <Card className="mb-4">
              <Card.Body>
                <Form>
                  <Form.Group controlId="newPost">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="What's on your mind?"
                    />
                  </Form.Group>
                  <Button variant="primary" className="mt-3">
                    Post
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
                  <div>
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
                    Comment ({post.comments})
                  </Button>
                  <Button variant="outline-success">Share</Button>
                </Card.Footer>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FeedPage;
