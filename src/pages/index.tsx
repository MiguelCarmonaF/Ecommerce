import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../comp/layout";
import ProductItem from "../comp/product";
import { productRouter } from "../server/trpc/router/productRouter";
import data from "../utils/data";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  
  return (
    
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem product={product} key={product.slug}></ProductItem>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
