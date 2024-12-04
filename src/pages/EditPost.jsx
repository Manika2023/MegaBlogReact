import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from "../appwrite/config";
import { useParams, useNavigate } from 'react-router-dom';

export default function EditPost() {
  const [post, setPost] = useState(null); // Initial state as null
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          console.log("new Fetched Post:", post.content); // Debug: Log post data
          setPost(post); // Update state
        } else {
          navigate("/"); // Navigate if post not found
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null; // Return null until post is loaded
}
