import React,{useEffect,useState} from 'react'
import { Container,PostForm } from '../components'
import appwriteService from "../appwrite/config"
import { useParams,useNavigate } from 'react-router-dom'

export default function EditPost() {
     const [post,setPosts]=useState([])
     // it returns url
     const {slug}=useParams()
     const navigate=useNavigate()

     useEffect(() => {
          if (slug) {
              appwriteService.getPost(slug).then((post) => {
                  if (post) {
                      console.log("Fetched Post:", post); // Debug: Log post data
                      setPosts(post);
                  } else navigate("/");
              });
          } else navigate("/");
      }, [slug, navigate]);

  return post? (
     <div className='py-8'>
          <Container>
              <PostForm post={post} />
          </Container>
     </div>
  ): null
}
