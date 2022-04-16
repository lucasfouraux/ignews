import * as prismic from '@prismicio/client'

export async function getPrismicClient() {
  const client = await prismic.createClient(
    process.env.PRISMIC_ENDPOINT,
    {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    }
  )

  return client;
}