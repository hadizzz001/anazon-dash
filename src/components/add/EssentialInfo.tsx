// import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Select, Link, TextField,
  Typography, Checkbox, FormControlLabel, InputLabel, MenuItem, OutlinedInput, SelectChangeEvent, ListItemText } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddImage from './AddImage';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { CustomSelect } from '../dashboard/CustomSelect';
import MultipleSelect from './CustomSelect';
// import { Facebook as FacebookIcon } from '../icons/facebook';
// import { Google as GoogleIcon } from '../icons/google';


interface IInit {

    title: string;
    price: string;
    newPrice: string;
    size: string;
    description: string;
    type : string;
    inStock: boolean;
    isFeatured: boolean;
    brand : string,
    // additionalInfo : {
    //     size?: string;
    // };
    colors : string[] | [];
    category: string;

}
  const Index = ({setDisabled}:{setDisabled:any}) => {
    const [imgs, setImgs] = useState([''])
    const [selectedColors, setSelectedColors] = useState<string[]>([]);

    const [itemToEDIT,setItemToEdit]= useState<any>({})
    const [init,setInit]= useState<IInit>({
      title: '',
      price : '',
      type : '',
      newPrice:'',
      size: '',
      brand:'',
      inStock : true,
      colors : selectedColors,
      description:'',
      isFeatured : false,
      // additionalInfo : {
      //   size:'',

      // },
      category : 'sale',
      // inStock: false,
      // Manufacturer
      // additionalInfo:'',
      // password: 'Password123'
      })
    const [load,setLoad]= useState<any>(false)

    const router = useRouter()
    const mode = router.query.mode;
    const id = router.query.id;
//     const Catearray =  [
//       'jacket',
//       'set',
//       'shirt',
//       'shorts',
//       'shoes',
//       'socks',
// 't-shirt',
// 'top',
// 'pyjama',
// 'coat',
// 'dress',
// 'skirt'

//     ]
   const brands = ["Teckwrap", "Cricut", "Armour Products", "Sizzix", "We R Memory Keepers", "EK Tools", "Silhouette", "Mod Podge"]

    const getItem = async () => {
      try {

    const req= await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/getbyid?pid=${id}`)
    const res = await req.json()
    if (res) {
      console.log('res: ', res);

      setItemToEdit(res)
      setLoad(false)
      // init.title = res.title;
      setInit({
        ...init,
        title: res.title,
        description: res.description,
        price: res.price,
        brand : res?.brand,
        newPrice : res?.newPrice,
        type : res?.type,
        inStock : res?.inStock == undefined  || res?.inStock == null ? true : res?.inStock,
        category: res.category,
        isFeatured: res.isFeatured,
        size: res?.size,
        colors : res?.colors || []
      })
      setSelectedColors(res?.colors)
      setImgs(res.images)
    }
    setLoad(false)

  }
  catch(e){
    setLoad(false)

    console.log('e: ', e);

  }
    }
    useEffect(() => {
      if(!router.isReady || !id) return;
      if (mode === 'edit' && id) {
        setLoad(true)
        getItem()
      }
    },[mode])
  const handleImgChange = (url:string[] | any) => {
    if (url) {

      setImgs(url);
    }
  }
const resetForm = () => {
  setSelectedColors([])

  setInit({ title: '',
  price : '',
  newPrice: '',
  size: '',
  type : '',
  description:'',
 colors : selectedColors,
  isFeatured : false,
  inStock : true,
  brand: '',
  category : 'sale'})
}
const onSubmit = async (e:any)=>{
  e.preventDefault();
  setDisabled(true)
  const token = localStorage.getItem('tknsite');
  if (!token ) {
    setDisabled(false)
    return
  };


const req = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/${id && mode === 'edit' ? `update?pid=${id}`: `save`}`,{
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({state:{...init,images:imgs,colors:selectedColors}})
})
const res = await req.json()
if (res?.success) {
  setSelectedColors([])

    resetForm();
    // setSubmitting(false)
    setDisabled(false)

    // router.push('/products')

    return
}
setDisabled(false)

}

  const handleChange = async (e:any) => {
    let val = e.target.value
    if (val !== null) {
      setInit({...init,
      [e.target.name]: val
    })
    }
  }
  const TypeArray =     init?.category === 'materials' ? [
    `Craft Adhesive Vinyls`,
    `Smart Adhesive Vinyls`,
    `Adhesive Vinyls`,
    `Specialty Adhesive Vinyls`,
  `Heat Transfer Vinyls`,
  `Transfer Tape`,
`Papers and Cards`,
`Other Materials`,
    ] :init?.category === 'tools and accessories' ? ['Crafting Tools','Machine Blades','Cutting mats'] : ['Paints','Pen & Markers','Other Art Supplies']
  return (
    <>

      <Box
        component="main"
      className='essential'
        sx={{
          maxWidth:'sm'

        }}
      >

       {!load &&   <form id='add-form' onSubmit={onSubmit}>


            <TextField
            required
              // error={Boolean(formik.touched.title && formik.errors.title)}
              fullWidth
              // helperText={formik.touched.title && formik.errors.title}
              label={"Title* اسم المنتج"}
              margin="normal"
              name="title"
              onChange={handleChange}
              type="text"
              value={init.title}
              variant="filled"
            />
                        <TextField
          required

              fullWidth
              // helperText={formik.touched.price && 'Price should be at least 0.1 '}
              label={"Price* in $ | السعر بالدولار"}
              margin="normal"
              name="price"
              // onBlur={formik.handleBlur}
              onChange={handleChange}
              type="number"
              value={init.price}
              variant="filled"
            />
                         <TextField


              fullWidth
              // helperText={formik.touched.price && 'Price should be at least 0.1 '}
              label={"New Price Offer"}
              margin="normal"
              name="newPrice"
              // onBlur={formik.handleBlur}
              onChange={handleChange}
              type="number"
              value={init?.newPrice}
              variant="filled"
            />
            <TextField
              // error={Boolean(formik.touched.price && formik.errors.price)}
              fullWidth
              multiline
              required

              rows={4}
              // helperText={formik.touched.description && formik.errors.description}
              label={"Description | تفصيل | معلومات" }
              margin="normal"
              name="description"
              // onBlur={formik.handleBlur}
              onChange={handleChange}
              type="text"
              value={init.description}
              variant="filled"
            />

            <>
  <InputLabel id="demo-simple-select-label">Category</InputLabel>
  <Select
  sx={{textTransform:'capitalize'}}
  variant='filled'
    labelId="demo-simple-select-label"
    id="demo-simple-select"
     name='category'
    value={init.category.toLocaleLowerCase()}
    label={"Category"}
    fullWidth
    defaultValue={'sale'}
    onChange={handleChange}
  >
    <MenuItem  value={'new arrivals'}>New arrivals</MenuItem>
    {[



`Hot offers`,
`Cricut machines`,
`Heat presses`,
`Materials`,
`Tools and Accessories` ,
`Printers`,
`Customizable Blanks`,
`Art supplies`,


    ].map((item:string) =>{

return    <MenuItem
key={item}
value={`${item.toLocaleLowerCase()}`}>{item}</MenuItem>
    })}
  </Select>
  </>

 {init?.category === 'materials' || init?.category === 'tools and accessories' || init?.category === 'art supplies' ?   <>
  <InputLabel id="demo-simple-type-label">Type</InputLabel>
  <Select
  sx={{textTransform:'capitalize'}}
  variant='filled'
    labelId="demo-simple-type-label"
    id="demo-type-select"
     name='type'
    value={init?.type.toLocaleLowerCase()}
    label={"Type"}
    fullWidth
    defaultValue={'other'}
    onChange={handleChange}
  >
    <MenuItem  value={'other'}>other</MenuItem>
    {


    TypeArray.map((item:string) =>{

return    <MenuItem
key={item}
value={`${item.toLowerCase()}`}>{item}</MenuItem>
    })}
  </Select>
  </> : ''}


  <InputLabel id="demo-simple-select-label">Brand Name</InputLabel>
  <Select
  sx={{textTransform:'capitalize'}}
  variant='filled'
    labelId="demo-brand-select-label"
    id="demo-brand-select"
     name='brand'
    value={init?.brand?.toLocaleLowerCase()}
    label={"brand"}
    fullWidth
    defaultValue={''}
    onChange={handleChange}
  >
   {brands.map(br=>{

   return  <MenuItem  key={br} value={br.toLocaleLowerCase()}>{br}</MenuItem>
   })
   }
  </Select>

<TextField
              // error={Boolean(formik.touched.weight && formik.errors.weight)}
              fullWidth
              // helperText={formik.touched.weight && formik.errors.weight}
              label={"Product Sizes (Add Unit ex: 2-5 years ) "}
              margin="normal"
              name="size"
              // onBlur={formik.handleBlur}
              onChange={handleChange}
              type="text"
              value={init.size.toLocaleLowerCase()}
              variant="filled"
            />
<MultipleSelect selectedColors={selectedColors} setSelectedColors={setSelectedColors}/>

            <FormControlLabel
            // helperText={formik.touched.isFeatured && formik.errors.isFeatured}
            label={`Show On Homepage? `}
            // error={Boolean(formik.touched.isFeatured && formik.errors.isFeatured)}
            name="isFeatured"
            // onBlur={formik.handleBlur}
            onChange={(val)=>{
              setInit({...init,isFeatured:!init.isFeatured})
            }}
            checked={Boolean(init.isFeatured)}
            control={<Checkbox
            // margin="normal"
            // fullWidth
            value={Boolean(init.isFeatured)}  />}  />

<FormControlLabel
            // helperText={formik.touched.isFeatured && formik.errors.isFeatured}
            label={`in Stock?`}
            // error={Boolean(formik.touched.isFeatured && formik.errors.isFeatured)}
            name="inStock"
            defaultChecked
            // onBlur={formik.handleBlur}
            onChange={(val)=>{
              setInit({...init,inStock:!init.inStock})
            }}
            checked={Boolean(init.inStock)}
            control={<Checkbox
            // margin="normal"
            // fullWidth
            value={Boolean(init.inStock)}  />}  />

              <AddImage   HandleImagesChange={handleImgChange}/>
              {mode === 'edit' && <Typography>Note: adding new images might replace the old ones</Typography>}
          </form>}

      </Box>
    </>
  );
};

export default Index;
