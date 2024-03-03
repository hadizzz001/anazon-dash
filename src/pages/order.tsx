import React , {useEffect, useState} from 'react';
// import ReactDOM from 'react-dom';
// import DisplayTable from '../components/dashboard/display-table';
import { DashboardLayout } from '../components/dashboard-layout';
import OrderTable, { createData } from '../components/OrderTable';
import { useRouter } from 'next/router';
// import Page from './add';

// if (typeof window !== "undefined") {
//   ReactDOM.render(
//   <DisplayTable />,
//   document.getElementById('root')
//   );
// }

function Order(){
  const router= useRouter()
  useEffect(() => {
    const tknjwt = localStorage.getItem('tknsite');
    if (!tknjwt || tknjwt === null) {
      router.push('/')
    }
}, [])
  const [orders,setOrders] = useState<any[]>([])
  const items: { FullName: string; Phone: string; City: string; Address: string; history: any; }[] = [
    // {
      // FullName : order[0].
    // }

  ]


  function calculateOrderTotal(order: any): number {
    let orderTotal = 0;
    if (!order || order?.length < 1) return 0
    for (const product of order) {
      // Check if "newPrice" exists, if it does, use it, otherwise use "price"
      const price = product?.newPrice ? Number(product?.newPrice) : Number(product?.price);

      // Calculate the total price for the product
      const productTotal = price * Number(product?.qty || 1);

      // Add the product total to the order total
      orderTotal += productTotal;
    }

    return orderTotal;
  }

  const getOrders = async () => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/getallorders`);
    const res = await req.json()
    if (!res ){
       return};
     res.forEach((item:any) =>{
      // console.log('item: ', item);
      // const pro =   {
      //   id : item._id,
      //   total: item.total,
      //   FullName : `${item.info.firstName} ${item.info.lastName}`,
      //   Phone : `${item.info.phone}`,
      //   Email : `${item.info.email}`,
      //  Address : `${item.info.address1, item.info.address2}`,

      //   history : [
      //    item.products.map((product:any)=>  {
      //     return  {title : product.title,
      //       id : product._id,
      //       qty: product.qty,
      //       price : product.price,}
      //    })

      //   ]
      //  }




      const pro = createData(`${item?.orderID || 'NULL'}`,`(${item?.uploadDate}) ${item.info?.firstName} ${item.info.lastName}`, `${item.info.phone}`,

      `${item.info.email}`,
      `${item.info.address1}, ${item.info.address2}`
      ,
      `${item?.info?.city}`,


    // item.products.map((product:any)=>  {
      //  {title : product.title,
      //  id : item.products._id,
      //  qty: product.qty,
      //  price : product.price,}
    // })

 item.products,
 item._id,
 calculateOrderTotal(item?.products)
  // [
  //   item.products.map((product:any)=>  {
  //    return  {title : product.title,
  //      id : product._id,
  //      qty: product.qty,
  //      price : product.price,}
  //   })

  // ]
  )

      items.push(
            pro

       )
     })
     setOrders(items)
  }
  useEffect(() => {
    getOrders()


  }, [])


//   createData('Full Name', '97125122', 'email@gmail.com', 'address',[{title:'Product name',id:'fooer',qty:1,price:200},{title:'Product name',id:'fooer',qty:1,price:200}]),




 return (
  <OrderTable rows={orders}/>
 )
}
Order.getLayout = (page:any) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
export default Order;
