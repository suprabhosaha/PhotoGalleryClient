import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';



export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-08-21',
  token: process.env.REACT_APP_SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source);