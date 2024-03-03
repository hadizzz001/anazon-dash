import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../mongodb';

// fake data
// import products from '../../utils/data/products';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { page, search } = req.query || { page: '1', search: '' };
    try {
      const ProductsCollection = await client.db('CRAFT').collection('Products');
      const pageNb = parseInt(`${page}`) || 1;
      const pageSize = parseInt('20') || 12; // Default to 20 items per page
      const skip = (pageNb - 1) * pageSize;

      let query = {};
      if (search) {
        query = { title: { $regex: search, $options: 'i' } };
      }

      const totalCount = await ProductsCollection.countDocuments(query);

      const docs = await ProductsCollection.find(query)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(pageSize)
        .toArray();

      if (docs.length > 0) {
        return res.status(200).json({
          success: true,
          products: docs,
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
          currentPage: page,
        });
      }

      return res.status(404).json({ success: false, message: 'No products found.' });
    } catch (e) {
      console.error('Error:', e);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  }

  return res.status(404).json({ success: false });
};
