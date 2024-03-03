import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../mongodb';

// fake data
// import products from '../../utils/data/products';

export default async (_req: NextApiRequest, res: NextApiResponse) => {

  // const product = _req.body.product
  if (_req.method === 'GET') {
    const a = _req?.body;
    const {page} = _req?.query || '1';
    try {
      const ProductsCollection = await client.db('CRAFT').collection('Coupons');
      // const pageNb = parseInt(`${page}`) || 1;
      // const pageSize = parseInt('20') || 12; // Default to 20 items per page
      // const skip = (pageNb - 1) * pageSize;


      const totalCount = await ProductsCollection.countDocuments();

      const docs = await ProductsCollection.find({})
        .sort({ _id: -1 })
        // .skip(skip)
        // .limit(pageSize)
        .toArray();


      if (docs.length > 0) {
        return res.status(200).json({
          success: true,
          products: docs,
          // totalCount,
          // totalPages: Math.ceil(totalCount / pageSize),
          // currentPage: page,
        });
      }

      return res.status(404).json({ success: false, message: 'No Coups found.' });
    } catch (e) {
      console.error('Error:', e);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
        }
return res.status(404).json({success:false});
    // return res.status(200).send(products)


  }
