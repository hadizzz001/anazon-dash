import Head from 'next/head';
import {
    Box,
    Container,
    Button,
    Grid,
    Pagination,
    Typography,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import {ProductListToolbar} from '../components/product/product-list-toolbar';
import {ProductCard} from '../components/product/product-card';
import {DashboardLayout} from '../components/dashboard-layout';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react'
import DatePicker from 'react-date-picker';
let voucher_codes = require('voucher-code-generator');
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import CardCoupon from '../components/CardCoupon';

const Page = () => {
    const [isAuthed,
        setIsAuthed] = useState(false);
    const [init,
        setInit] = useState({
        code: '',
        discountType: 'percentage',
        discountValue: 10,
        usageCount:0,
        expirationDate: '',
        isReusable: true,
        usageLimit: 1,
        isActive: true,
        description: '',
        excludedCates: [],
        minimumOrderAmount: 0,
        createdAt: new Date()
    });
    const router = useRouter();

    const [value,
        onChange] = useState < any > ('');
    const [data,
      setData] = useState<any>([]);

    const handleChange = (e : any) => {
        let val = e.target.value
        if (val !== null) {
            setInit({
                ...init,
                [e.target.name]: val
            })
        }
    }

    const handleCustomCoupon = (e:any) => {
      let val = e.target.value?.toUpperCase()?.replace(/\s/g, '')
        setInit({...init, code: val})
    }

    const Delete= async (id:string) => {
      // console.log('id: ', id);
      let proceed = confirm("Delete Coupon?");
      if (proceed) {
        //proceed
        const jwt = localStorage.getItem('tknsite')
        if (jwt) {
            const req = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/delete-coupon`,{
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
    const generate = () => {
        let code = voucher_codes.generate({length: 6, count: 1});
        if (code)
            setInit({
                ...init,
                code: `${code}`
                    ?.toUpperCase()?.replace(/\s/g, '')
            })
    }

    const fetchAll = async() => {
        const jwt = localStorage.getItem('tknsite');
        if (jwt) {
            const req = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/get-all-coupons`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const res = await req.json();
            if (res
                ?.success) {
                setData(res.products);
            }
        }
    };

    const createCoupon = async () => {
      const jwt = localStorage.getItem('tknsite');
      if (jwt && init) {
          const req = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/save-coupon`, {
              method: 'Post',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
        body: JSON.stringify({init})

          });
           await req.json();
           setData([...data, init])

           setInit({
            code: '',
            discountType: 'percentage',
            discountValue: 10,
            usageCount:0,
            expirationDate: '',
            isReusable: true,
            usageLimit: 1,
            isActive: true,
            description: '',
            excludedCates: [],
            minimumOrderAmount: 0,
            createdAt: new Date()
        })

      }
    }

    useEffect(() => {
        const tkn = localStorage.getItem('tknsite') !== undefined && localStorage.getItem('tknsite') !== null;
        if (tkn) {
            setIsAuthed(true);
            fetchAll();
        } else {
            router.push('/');
        }
    }, []);



    // useEffect(() => {
    //     setInit((prevInit) => ({
    //         ...prevInit,
    //         expirationDate: value
    //     }));
    // }, [value]);

    return (

        <div>
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
            }}>
                <Container maxWidth={false}>
                    <Box>
                        <Typography
                            sx={{
                            fontWeight: 700,
                            fontSize: '2em'
                        }}>
                            Active Coupons:
                        </Typography>
                        {data?.length < 1 ?<Box
                            sx={{
                            display: 'flex',
                            mt: 1
                        }}>
                            There are no active Coupons!
                        </Box>
                      :
                      <Box
                            sx={{
                            display: 'flex',
                            flexDirection:'row',
                            flexWrap:'wrap !important',
                            gap:1,
                            mt: 1
                        }}>
                          {data && data?.map((i:any)=>{
                            return <CardCoupon
                            minimumOrderAmount={i?.minimumOrderAmount}
                            key={i?.code}
                            _id={i?._id}
                            Delete={Delete}
                            example={i?.expirationDate}
                            usageCount={i?.usageCount}
                            word={i?.code} definition={`${i?.discountValue}${i?.discountType === 'percentage' ? '%':'$'}`} partOfSpeech={ i?.isReusable ? i?.usageLimit : 1}/>
                          })}
                        </Box>

                      }
                    </Box>
                </Container>

                <Container sx={{
                    mt: 8
                }}>
                    <Box>
                        <Typography
                            sx={{
                            fontWeight: 700,
                            fontSize: '2em'
                        }}>
                            Create Coupon:
                        </Typography>
                        <Box
                            component='form'
                            sx={{
                            flexDirection: 'column',
                            gap: 1,
                            display: 'flex',
                            width: '400px',
                            mt: 1
                        }}>
                            <Box
                                sx={{
                                display: 'flex'
                            }}>

                                <TextField
                                    required
                                    fullWidth
                                    label={"Coupon Code"}
                                    margin="normal"
                                    name="title"
                                    onChange={(e)=>handleCustomCoupon(e)}
                                    type="text"

                                    value={init?.code?.toUpperCase()?.replace(/\s/g, '')?.slice(0,15)}
                                    variant="filled"/>
                                <Button onClick={() => generate()}>
                                    Generate
                                </Button>
                            </Box>



                            <> <InputLabel id="demo-simple-discountType-label">Discount Type</InputLabel>
                            <Select
                                sx={{
                                textTransform: 'capitalize'
                            }}
                                variant='filled'
                                labelId="demo-simple-discountType-label"
                                id="demo-discountType-select"
                                name='discountType'
                                value={init
                                .discountType
                                .toLocaleLowerCase()}
                                label={"discountType"}
                                fullWidth
                                defaultValue={'sale'}
                                onChange={handleChange}>
                                <MenuItem value={'percentage'}>percentage</MenuItem>
                                <MenuItem value={'fixed'}>fixed</MenuItem>

                            </Select>
                        </>
                        <TextField
                            required
                            fullWidth
                            label={"discountValue (in % or USD$)"}
                            margin="normal"
                            name="discountValue"
                            onChange={handleChange}
                            type="number"
                            value={init.discountType === 'percentage' && init.discountValue >= 100 ? 99 :
                            init.discountType === 'fixed' && init.discountValue > 1000 ? 1 :
                              init.discountValue < 0 ? 1 : init.discountValue}
                            variant="filled"/>

                        <> <Typography>

                            Ends at (Leave Empty if not expirable):
                        </Typography>

                        <DatePicker onChange={onChange} value={value}/>
                    </>



<TextField
                            required
                            fullWidth
                            label={"usage Limit "}
                            margin="normal"
                            name="usageLimit"
                        disabled={!init?.isReusable }

                            onChange={handleChange}
                            type="number"
                            value={init.usageLimit > 0 ? init.usageLimit : 1}
                            variant="filled"/>


<TextField
                            required
                            fullWidth
                            label={"minimumOrderAmount"}
                            margin="normal"
                            name="minimumOrderAmount"
                            onChange={handleChange}
                            type="number"
                            value={init.minimumOrderAmount > 0 ? init.minimumOrderAmount : 1}

                            variant="filled"/>




{/* <> <InputLabel id="demo-simple-discountType-label">*EXCLUDED* Categories</InputLabel>
                            <Select
                                sx={{
                                textTransform: 'capitalize'
                            }}
                                variant='filled'
                                labelId="demo-simple-discountType-label"
                                id="demo-discountType-select"
                                name='discountType'
                                value={init
                                .discountType
                                .toLocaleLowerCase()}
                                label={"discountType"}
                                fullWidth
                                defaultValue={'sale'}
                                onChange={handleChange}>
                                  {
                                    [`Hot offers`,
                                    `Cricut machines`,
                                    `Heat presses`,
                                    `Materials`,
                                    `Tools and Accessories` ,
                                    `Printers`,
                                    `Customizable Blanks`,
                                    `Art supplies`,
                                    ].map(i=>{
                                      return <MenuItem key={i} value={i.toLocaleLowerCase()}>{i}</MenuItem>
                                    })
                                  }


                            </Select>
                        </> */}






<FormControlLabel
                        label={`is Reusable?`}
                        name="isReusable"
                        defaultChecked
                        onChange={() => {
                        setInit({
                            ...init,
                            isReusable: !init.isReusable
                        })
                    }}
                        checked={Boolean(init.isReusable)}
                        control={< Checkbox value = {
                        Boolean(init.isReusable)
                    } />}/>

<FormControlLabel
                        label={`is Active?`}
                        name="isActive"
                        defaultChecked
                        onChange={() => {
                        setInit({
                            ...init,
                            isActive: !init.isActive
                        })
                    }}
                        checked={Boolean(init.isActive)}
                        control={< Checkbox value = {
                        Boolean(init.isActive)
                    } />}/>


                    <Button

                    disabled={!init.code || !init?.discountValue}
                    onClick={()=>createCoupon()}>
                      Create Coupon Code
                    </Button>
                </Box>

            </Box>
        </Container>
    </Box>}
        </div>
    )

};

Page.getLayout = (page : any) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
