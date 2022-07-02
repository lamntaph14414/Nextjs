import { GetServerSideProps, GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router'
import React from 'react'

type ProductProps = {
  product: any
}

const ProductDetail = ({product}:ProductProps) => {
  if(!product) return null;
  return(
    <div>{product.name}</div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await (await fetch(`https://6110f09bc38a0900171f0ed0.mockapi.io/products`)).json();
  const paths = data.map((product: any) => (
    {params: {id: product.id}}
  ))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<ProductProps> = async (context: GetStaticPropsContext) => {
  console.log('context', context);
  const product = await (await fetch(`https://6110f09bc38a0900171f0ed0.mockapi.io/products/${context.params?.id}`)).json();
  return {
  props: {product},
  revalidate: 10
}
}


export default ProductDetail