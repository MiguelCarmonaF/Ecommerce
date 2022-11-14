import { product } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Layout from "../comp/layout";
import ProductItem from "../comp/product";
import { productRouter } from "../server/trpc/router/productRouter";
import { trpc } from "../utils/trpc";
import AddItemModal from "../comp/AddItemModal";
import EditItemModal from "../comp/EditProductModal";

const Home: NextPage = () => {
  
  const [items, setItems] = useState<product[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalOpen2, setModalOpen2] = useState<boolean>(false)
  const [items2, setItems2] = useState<product[]>([])
  
  
  let x;
  const {data: itemsData, isLoading} = trpc.product.getAllProducts.useQuery(void x,{
    onSuccess(items) {
      setItems(items)
    },
  });

  

  const {mutate: deleteItem} = trpc.product.deletItem.useMutation({
    onSuccess(product){
      setItems((prev) => prev.filter((item) => item.slug !==product.slug))
    }
  })

  if (!itemsData || isLoading) return <p>Loading...</p>
  
 return (
  <>
      {(modalOpen  && <AddItemModal setModalOpen={setModalOpen} setProducts={setItems}/>) ||(modalOpen2 && <EditItemModal setModalOpen2={setModalOpen2} setProducts2={setItems2}/>)}

  
      <Layout title="Home Page">
        <div>
          <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded-md bg-violet-500 p2 text-sm text-white transition hover:bg-violet-600">
            Add a product
          </button>
        </div>
        <div>
          <button
          type="button"
          onClick={() => setModalOpen2(true)}
          className="rounded-md bg-violet-500 p2 text-sm text-white transition hover:bg-violet-600">
            Edit a product (Check the slug)
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <ProductItem product={product} key={product.slug}></ProductItem>
          ))}
        </div>
        <div className="mb-5 block rounded-lg border border-gray-200 shadow-md"><h1>Eliminate Products</h1> 
          {items.map((product)=>{
            const {slug, name} = product
            return (
              <button className="px-12" onClick={()=>deleteItem({slug})}> 
                <img key={slug} className="h-10 w-10 cursor-pointer"  
                  src="../../images/Xcicrle.png"
                />{name}
                </button>
            )
          })}
        </div>
      </Layout>
  </>
  );
};

export default Home;
