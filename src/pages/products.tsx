import Head from 'next/head';
import { Box, Container,Button, Grid, Pagination ,Typography} from '@mui/material';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useRouter } from 'next/router';
import {useEffect,useState} from 'react'


const Page = () => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [pageSize] = useState(12); // Number of items per page
  const [q, setQ] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const handleChange = (e : any) => {
    setQ(e.target.value);
  };

  const fetchAll = async () => {
    const jwt = localStorage.getItem('tknsite');
    if (jwt) {
      const req = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/getall?page=${page}&pageSize=${pageSize}&q=${q}&search=${q}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const res = await req.json();
      if (res?.success) {
        setData(res.products);
        setTotalCount(res?.totalCount || 0)
        setTotalPages(Math.ceil(res?.totalCount / pageSize));
      }
    }
  };

  useEffect(() => {
    const value = localStorage.getItem('tknsite') !== undefined && localStorage.getItem('tknsite') !== null;
    if (value) {
      setIsAuthed(true);
      fetchAll();
    } else {
      router.push('/');
    }
  }, [page, pageSize, q]);

  const handlePageChange = (event : any, newPage : number) => {
    setPage(newPage);
  };

  const Delete= async (id:string) => {
    // console.log('id: ', id);
    let proceed = confirm("Delete Product?");
    if (proceed) {
      //proceed
      const jwt = localStorage.getItem('tknsite')
      if (jwt) {
          const req = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/delete`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({jwt, id})
          })
          const res = await req.json()
          // console.log('res: ', res);
          if (res?.success) {
            let a = data.filter((x:any) => `${x._id}` !== id)
            // console.log('a: ', a);
            setData(a)
            // window.reload()
          }
      }
    } else {
     alert('Failed To Delete Product!')
      //don't proceed
    }
  }
  return (

  <>
    <Head>
      <title>
        Products | The Craft Room | onbeirut.com
      </title>
    </Head>
   {isAuthed && <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <ProductListToolbar q={q} totalCount={totalCount} handleChange={handleChange} />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
          {data && data.length > 0 ? data.filter((item:any)=>item.title.includes(q)).map((product:any) => {
            if (!product?._id) return;

            return(  <Grid
                item
                key={product._id}
                lg={4}
                md={4}
                xs={6}
                sm={4}
              >
                  <Box sx={{width:'100%'}}>
                    <Box sx={{width:'100%',background:'white',height:'300px'}}>
                    <img src={`${product?.images[0]}-/resize/200x200/` || ''} className='img cover' alt=''/>
                    </Box>
                    <Box sx={{px:'.35em',py:'.5em',textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>

                      <Typography sx={{fontWeight:'500'}}>
                                {product?.title || 'Product Name'}
                      </Typography>
                      <Typography sx={{fontWeight:'200'}}>
                                {product?.category}
                      </Typography>
                      <Typography sx={{color:'green',fontWeight:'500'}}>
                                ${product?.price }
                      </Typography>
                    </Box>
                      <Box className='flex gap-3' sx={{mt:'.35em'}}>
                        {/* <Button sx={{border:'1px solid',py:'.25em'}}>View</Button> */}
                        <Button sx={{border:'1px solid',py:'.25em'}}
                        onClick={()=>router.push(`/add?id=${product?._id}&mode=edit`)}
                        >Edit | تعديل</Button>
                        <Button
                        onClick={()=>Delete(product?._id)}
                        sx={{border:'1px solid red',py:'.25em',color:'red'}}>Delete | حذف</Button>
                      </Box>

                  </Box>
                {/* <ProductCard product={product} /> */}
              </Grid>
            )}):
            <Typography sx={{textAlign:'center'}}>
              Loading...
            </Typography>
            }

          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
                color="primary"
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                size="small"
              />
        </Box>
      </Container>
    </Box>}
  </>
  )

};

Page.getLayout = (page:any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
