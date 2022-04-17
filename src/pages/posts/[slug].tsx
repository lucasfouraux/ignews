import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic"
import styles from './post.module.scss'

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updated: string;
  }
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updated}</time>
          <div 
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
  const session = await getSession({ req })
  const { slug } = params;

  const prismic = await getPrismicClient()
  const response = await prismic.getByUID('Post', slug.toString())
  

  const post = {
    slug,
    title: response.data.title,
    content: response.data.content.map(content => '<p>' + content.text.replace('\n', '<br/> <br/>') + '</p>'),
    updated: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post
    }
  }
}