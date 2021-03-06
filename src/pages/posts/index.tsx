import { useAllPrismicDocumentsByType, usePrismicDocumentsByType } from '@prismicio/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss'

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          { posts.map(post => (
            <Link key={ post.slug } href={`/posts/${post.slug}`}>
              <a href="#">
                <time>{ post.updatedAt }</time>
                <strong>{ post.title }</strong>
                <p>{ post.excerpt }</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async() => {
  const prismic = await getPrismicClient()

  const response = await prismic.getByType('Post', { pageSize: 100})

  const posts = response.results.map(post => {
    const content = post.data.content.find(content => content.type === 'paragraph')?.text ?? ''
    return {
      slug: post.uid,
      title: post.data.title,
      excerpt: content.substring(0, content.search('\n')),
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return  {
    props: { posts }
  }

}