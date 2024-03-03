import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../components/dashboard-layout';
import { Box, Button, Dialog, Typography } from '@mui/material';
import { Widget } from '@uploadcare/react-widget';
import { useRouter } from 'next/router';



const Images = () => {
  // im going to look back at this and laugh, you fucking clown it's 1am and im getting paid less than 100 bucks lol
  const [open,setOpen] = useState(false)
  const [open2,setOpen2] = useState(false)
  const [open3,setOpen3] = useState(false)
  const [open4,setOpen4] = useState(false)
  const [open5,setOpen5] = useState(false)
  const [open6,setOpen6] = useState(false)
  const [open7,setOpen7] = useState(false)
  const [open8,setOpen8] = useState(false)
  const [ok,setOk] = useState('')
  const router= useRouter()

  const [imgs,setImgs] = useState({
    MainCarousel: [
      {
        img: "uploadcarecdn3f3fde0c-4880-4830-ace9-9e82b0c94808/",
        text: ""
      },
      {
        img: "uploadcarecdna0dbc2bd-4ec6-415a-b2f5-71835cac1d43/",
        text: ""
      },
      {
        img: "uploadcarecdn83a8bf45-08fd-4f49-b066-a416e245fe72/",
        text: ""
      },
      {
        img: "uploadcarecdn723de3db-6d49-4113-be3b-fa130eebd561/",
        text: ""
      }
    ],
    first: "uploadcarecdne79d337c-b709-4ea4-aec0-6f3403afff1e/WhatsAppImage20230824at191717.jpeg",
    second: "uploadcarecdn3a54db45-c216-4076-996c-3ec4524be8f0/WhatsAppImage20230824at191727.jpeg",
    third: "uploadcarecdn3a54db45-c216-4076-996c-3ec4524be8f0/WhatsAppImage20230824at191727.jpeg",
    fourth: "uploadcarecdn3a54db45-c216-4076-996c-3ec4524be8f0/WhatsAppImage20230824at191727.jpeg",
    fifth: "uploadcarecdn3a54db45-c216-4076-996c-3ec4524be8f0/WhatsAppImage20230824at191727.jpeg",
    categoryImage: [
      {
        img: "uploadcarecdn4635c19f-1ac8-454f-aaf7-8c67adfe4fd0/WhatsAppImage20230824at191722.jpeg",
        category: ""
      },
      {
        img: "https://4.bp.blogspot.com/-Jt0CZBa0r6s/WQoWgzdYryI/AAAAAAAAuE4/WNVqO4RNJEoJZeWAGCCDtT-YdkxV-JaPwCPcB/s640/wholesale%2Bcraft%2Bblanks.JPG",
        category: ""
      },

    ]

  })
  const fetcher = async () => {
    const req = await fetch(`https://getpantry.cloud/apiv1/pantry/pantrykey/basket/Images`)
    let res : any = await  req.json() ;
    if (res) {
      setImgs(res)
    }
  }
  const saver = async () => {
    try {
      setOk('')

    if (!imgs) return;

    const req = await fetch(`https://getpantry.cloud/apiv1/pantry/pantrykey/basket/Images`,{
      method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },

body :JSON.stringify(imgs),
})
  if (req?.ok) {
    setOk('Saved')
  }
// console.log('req: ', req);
// let res : any = await  req.json() ;
    // console.log('resy: ', res);
  }
  catch(e){
    console.log('saver err: ', e);
    setOk('ERROR')
  }
  }

  useEffect(() => {
    const tknjwt = localStorage.getItem('tknsite');
    if (!tknjwt || tknjwt === null) {
      router.push('/')
    }
    fetcher()
  }, [])

  return (
   <Box sx={{margin:2}}>
        <Typography sx={{fontSize:25,fontWeight:600,borderBottom:'1px solid gray',pb:.5}}>First Section</Typography>
        <Typography sx={{fontSize:25,color:'green',fontWeight:600,borderBottom:'1px solid gray',pb:.5}}>{ok}</Typography>
        <Box>
          <Button
          disabled={Boolean(imgs?.MainCarousel?.length > 10)}

          sx={{width:'100%'}}
            onClick={()=>setOpen(true)}
          >Add New Image</Button>
          <Dialog
          sx={{padding:'2em'}}
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Widget
                                    clearable
                                    imagesOnly
                                    // values={imgs}
                                    onChange={(e) => {
                                      const cdnUrl= e?.cdnUrl;
                                      const allCateImages = [...imgs?.MainCarousel]
                                      if (cdnUrl) {
                                        allCateImages.push({img:cdnUrl,text:''})
                                          setImgs({...imgs,MainCarousel:allCateImages})
                                      }
                                    // setProduct({
                                    //     ...product,
                                    //     images: imgs
                                    // })

                                }}

                                // publicKey="uploadcarekey"
                                publicKey="uploadcarekey"


                                    />
                                       <Button
          sx={{width:'100%'}}
            onClick={()=>setOpen(false)}
          >Done - أغلق</Button>
      </Dialog>
      <Box sx={{display:'flex',flexWrap:'wrap'}}>
        {
           imgs?.MainCarousel && imgs?.MainCarousel.map(img=>{
            return <Box key={img?.img} sx={{display:'flex',margin:1,maxWidth:400,border:'1px solid'}}>
              <Button
              onClick={()=>{
                const filtered = imgs?.MainCarousel?.filter(x=> x?.img !== img?.img )

                setImgs({...imgs,MainCarousel:filtered})
              }}
              sx={{color:'red'}}>Delete</Button>
              <Box sx={{width:300,height:200}}>

              <img src={img?.img || ''} className=' img contain' alt=''/>
              </Box>
            </Box>
          })
        }
      </Box>
      <Button
      onClick={saver}
      sx={{color:'green'}}>{'Save Changes - حفظ التغييرات'} </Button>
        </Box>


        <Typography sx={{fontSize:25,fontWeight:600,borderBottom:'1px solid gray',pb:.5,mt:4}}>2 Pics </Typography>
        <Typography sx={{fontSize:25,color:'green',fontWeight:600,borderBottom:'1px solid gray',pb:.5}}>{ok}</Typography>
         <Box>
          <Button
          disabled={imgs?.categoryImage?.length >= 2}
          sx={{width:'100%'}}
            onClick={()=>setOpen2(true)}
          >Add New Image</Button>
          <Dialog
          sx={{padding:'2em'}}
        open={open2}
        onClose={()=>setOpen2(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Widget
                                    clearable
                                    imagesOnly

                                    onChange={(e) => {
                                      const cdnUrl= e?.cdnUrl;
                                      const allCateImages = [...imgs?.categoryImage]
                                      if (cdnUrl) {
                                        allCateImages.push({img:cdnUrl,category:''})
                                          setImgs({...imgs,categoryImage:allCateImages})
                                      }


                                }}


                                publicKey="uploadcarekey"


                                    />
                                       <Button
          sx={{width:'100%'}}
            onClick={()=>setOpen2(false)}
          >Done</Button>
      </Dialog>
      <Box sx={{display:'flex',flexWrap:'wrap'}}>
        {
           imgs?.categoryImage && imgs?.categoryImage.map(img=>{
            return <Box key={img?.img} sx={{display:'flex',margin:1,maxWidth:300,border:'1px solid'}}>
              <Button
              onClick={()=>{
                const filtered = imgs?.categoryImage?.filter(x=> x?.img !== img?.img )

                setImgs({...imgs,categoryImage:filtered})
              }}
              sx={{color:'red'}}>Delete</Button>
              <Box sx={{width:200,height:150}}>

              <img src={img?.img || ''} className=' img contain' alt=''/>
              </Box>
            </Box>
          })
        }
      </Box>
      <Button
      onClick={saver}
      sx={{color:'green'}}>{'Save Changes - حفظ التغييرات'} </Button>
        </Box>


       {/* <Typography sx={{fontSize:25,fontWeight:600,borderBottom:'1px solid gray',pb:.5,mt:4}}> حد أقصى 3 صورة </Typography>
        <Typography sx={{fontSize:25,color:'green',fontWeight:600,borderBottom:'1px solid gray',pb:.5}}>{ok}</Typography>
        <Box>
          <Button
          disabled={imgs?.categoryImage?.length > 3 || imgs?.categoryImage?.length === 3}
          sx={{width:'100%'}}
            onClick={()=>setOpen3(true)}
          >Add New Image - أضف صورة جديدة</Button>
          <Dialog
          sx={{padding:'2em'}}
        open={open3}
        onClose={()=>setOpen3(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Widget
                                    clearable
                                    imagesOnly

                                    onChange={(e) => {
                                      const cdnUrl= e?.cdnUrl;
                                      const allCateImages = [...imgs?.third]
                                      if (cdnUrl) {
                                        allCateImages.push({img:cdnUrl,category:''})
                                          setImgs({...imgs,third:allCateImages})
                                      }


                                }}


                                publicKey="uploadcarekey"


                                    />
                                       <Button
          sx={{width:'100%'}}
            onClick={()=>setOpen3(false)}
          >Done - أغلق</Button>
      </Dialog>
      <Box sx={{display:'flex',flexWrap:'wrap'}}>
        {
           imgs?.third && imgs?.third.map((img:any)=>{
            return <Box key={img?.img} sx={{display:'flex',margin:1,maxWidth:300,border:'1px solid'}}>
              <Button
              onClick={()=>{
                const filtered = imgs?.third?.filter(x=> x?.img !== img?.img )

                setImgs({...imgs,third:filtered})
              }}
              sx={{color:'red'}}>Delete</Button>
              <Box sx={{width:200,height:150}}>

              <img src={img?.img || ''} className=' img contain' alt=''/>
              </Box>
            </Box>
          })
        }
      </Box>
      <Button
      onClick={saver}
      sx={{color:'green'}}>{'Save Changes - حفظ التغييرات'} </Button>
        </Box>  */}



       <Typography sx={{fontSize:25,fontWeight:600,borderBottom:'1px solid gray',pb:.5,mt:4}}>Cricut Machines</Typography>
        <Typography sx={{fontSize:25,color:'green',fontWeight:600,borderBottom:'1px solid gray',pb:.5}}>{ok}</Typography>
        <Box>
          <Button
          disabled={Boolean(imgs?.first?.length > 0)}
          sx={{width:'100%'}}
            onClick={()=>setOpen3(true)}
          >Add New Image</Button>
          <Dialog
          sx={{padding:'2em'}}
        open={open3}
        onClose={()=>setOpen3(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Widget
                                    clearable
                                    imagesOnly

                                    onChange={(e) => {

                                      const cdnUrl= e?.cdnUrl;

                                      if (cdnUrl) {

                                          setImgs({...imgs,first:`${cdnUrl}`})
                                      }
                                }}


                                publicKey="uploadcarekey"


                                    />
                                       <Button
          sx={{width:'100%'}}
            onClick={()=>setOpen3(false)}
          >Done - أغلق</Button>
      </Dialog>
      <Box sx={{display:'flex',flexWrap:'wrap'}}>
        {

             <Box sx={{display:'flex',margin:1,maxWidth:300,border:'1px solid'}}>
              <Button
              onClick={()=>{


                setImgs({...imgs,first:''})
              }}
              sx={{color:'red'}}>Delete</Button>
              <Box sx={{width:200,height:150}}>

              <img src={imgs?.first || ''} className=' img contain' alt=''/>
              </Box>
            </Box>
          }

      </Box>
      <Button
      onClick={saver}
      sx={{color:'green'}}>{'Save Changes'} </Button>
        </Box>


        <Typography sx={{fontSize:25,fontWeight:600,borderBottom:'1px solid gray',pb:.5,mt:4}}>Customizable Blanks</Typography>
        <Typography sx={{fontSize:25,color:'green',fontWeight:600,borderBottom:'1px solid gray',pb:.5}}>{ok}</Typography>
        <Box>
          <Button
          disabled={Boolean(imgs?.second?.length > 0)}
          sx={{width:'100%'}}
            onClick={()=>setOpen4(true)}
          >Add New Image</Button>
          <Dialog
          sx={{padding:'2em'}}
        open={open4}
        onClose={()=>setOpen4(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Widget
                                    clearable
                                    imagesOnly

                                    onChange={(e) => {

                                      const cdnUrl= e?.cdnUrl;

                                      if (cdnUrl) {

                                          setImgs({...imgs,second:`${cdnUrl}`})
                                      }
                                }}


                                publicKey="uploadcarekey"


                                    />
                                       <Button
          sx={{width:'100%'}}
            onClick={()=>setOpen4(false)}
          >Done - أغلق</Button>
      </Dialog>
      <Box sx={{display:'flex',flexWrap:'wrap'}}>
        {

             <Box sx={{display:'flex',margin:1,maxWidth:300,border:'1px solid'}}>
              <Button
              onClick={()=>{


                setImgs({...imgs,second:''})
              }}
              sx={{color:'red'}}>Delete</Button>
              <Box sx={{width:200,height:150}}>

              <img src={imgs?.second || ''} className=' img contain' alt=''/>
              </Box>
            </Box>
          }

      </Box>
      <Button
      onClick={saver}
      sx={{color:'green'}}>{'Save Changes'} </Button>
        </Box>

        <Typography sx={{fontSize:25,fontWeight:600,borderBottom:'1px solid gray',pb:.5,mt:4}}>Hot Offers</Typography>
        <Typography sx={{fontSize:25,color:'green',fontWeight:600,borderBottom:'1px solid gray',pb:.5}}>{ok}</Typography>
        <Box>
          <Button
          disabled={Boolean(imgs?.third?.length > 0)}
          sx={{width:'100%'}}
            onClick={()=>setOpen8(true)}
          >Add New Image</Button>
          <Dialog
          sx={{padding:'2em'}}
        open={open8}
        onClose={()=>setOpen8(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Widget
                                    clearable
                                    imagesOnly

                                    onChange={(e) => {

                                      const cdnUrl= e?.cdnUrl;

                                      if (cdnUrl) {

                                          setImgs({...imgs,third:`${cdnUrl}`})
                                      }
                                }}


                                publicKey="uploadcarekey"


                                    />
                                       <Button
          sx={{width:'100%'}}
            onClick={()=>setOpen8(false)}
          >Done - أغلق</Button>
      </Dialog>
      <Box sx={{display:'flex',flexWrap:'wrap'}}>
        {

             <Box sx={{display:'flex',margin:1,maxWidth:300,border:'1px solid'}}>
              <Button
              onClick={()=>{


                setImgs({...imgs,third:''})
              }}
              sx={{color:'red'}}>Delete</Button>
              <Box sx={{width:200,height:150}}>

              <img src={imgs?.third || ''} className=' img contain' alt=''/>
              </Box>
            </Box>
          }

      </Box>
      <Button
      onClick={saver}
      sx={{color:'green'}}>{'Save Changes'} </Button>
        </Box>


        <Typography sx={{fontSize:25,fontWeight:600,borderBottom:'1px solid gray',pb:.5,mt:4}}>New Arrivals</Typography>
        <Typography sx={{fontSize:25,color:'green',fontWeight:600,borderBottom:'1px solid gray',pb:.5}}>{ok}</Typography>
        <Box>
          <Button
          disabled={Boolean(imgs?.fourth?.length > 0)}
          sx={{width:'100%'}}
            onClick={()=>setOpen6(true)}
          >Add New Image</Button>
          <Dialog
          sx={{padding:'2em'}}
        open={open6}
        onClose={()=>setOpen6(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Widget
                                    clearable
                                    imagesOnly

                                    onChange={(e) => {

                                      const cdnUrl= e?.cdnUrl;

                                      if (cdnUrl) {

                                          setImgs({...imgs,fourth:`${cdnUrl}`})
                                      }
                                }}


                                publicKey="uploadcarekey"


                                    />
                                       <Button
          sx={{width:'100%'}}
            onClick={()=>setOpen6(false)}
          >Done - أغلق</Button>
      </Dialog>
      <Box sx={{display:'flex',flexWrap:'wrap'}}>
        {

             <Box sx={{display:'flex',margin:1,maxWidth:300,border:'1px solid'}}>
              <Button
              onClick={()=>{


                setImgs({...imgs,fourth:''})
              }}
              sx={{color:'red'}}>Delete</Button>
              <Box sx={{width:200,height:150}}>

              <img src={imgs?.fourth || ''} className=' img contain' alt=''/>
              </Box>
            </Box>
          }

      </Box>
      <Button
      onClick={saver}
      sx={{color:'green'}}>{'Save Changes'} </Button>
        </Box>
        <Typography sx={{fontSize:25,fontWeight:600,borderBottom:'1px solid gray',pb:.5,mt:4}}>Materials</Typography>
        <Typography sx={{fontSize:25,color:'green',fontWeight:600,borderBottom:'1px solid gray',pb:.5}}>{ok}</Typography>
        <Box>
          <Button
          disabled={Boolean(imgs?.fifth?.length > 0)}
          sx={{width:'100%'}}
            onClick={()=>setOpen7(true)}
          >Add New Image</Button>
          <Dialog
          sx={{padding:'2em'}}
        open={open7}
        onClose={()=>setOpen7(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Widget
                                    clearable
                                    imagesOnly

                                    onChange={(e) => {

                                      const cdnUrl= e?.cdnUrl;

                                      if (cdnUrl) {

                                          setImgs({...imgs,fifth:`${cdnUrl}`})
                                      }
                                }}


                                publicKey="uploadcarekey"


                                    />
                                       <Button
          sx={{width:'100%'}}
            onClick={()=>setOpen7(false)}
          >Done - أغلق</Button>
      </Dialog>
      <Box sx={{display:'flex',flexWrap:'wrap'}}>
        {

             <Box sx={{display:'flex',margin:1,maxWidth:300,border:'1px solid'}}>
              <Button
              onClick={()=>{


                setImgs({...imgs,fifth:''})
              }}
              sx={{color:'red'}}>Delete</Button>
              <Box sx={{width:200,height:150}}>

              <img src={imgs?.fifth || ''} className=' img contain' alt=''/>
              </Box>
            </Box>
          }

      </Box>
      <Button
      onClick={saver}
      sx={{color:'green'}}>{'Save Changes'} </Button>
        </Box>

   </Box>
  )
}

Images.getLayout = (page:any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
export default Images;
