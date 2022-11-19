import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { CommentContext } from '../component/CommentContext'
import Comments from '../component/Comments'
import styles from '../styles/Home.module.css'

export default function Home({commentList}) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    setComments(commentList);
  }, [commentList])

  return (
    <div className={styles.container}>
      <Head>
        <title>Commenting</title>
        <meta name="description" content="Commenting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <CommentContext.Provider value={{comments, setComments}} >
        <Comments />
      </CommentContext.Provider>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://github.com/cory-sydn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>{"  "}Koray Soydan</h2>
        </a>
      </footer>
    </div>
  )
}

export const getServerSideProps = async() => {
  const response = await axios.get("https://commenting-app.vercel.app/api/comments")
  return {
    props:{
      commentList:response.data,
    },
  };
}