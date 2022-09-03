import React, { useEffect, useState } from 'react';
import { axios } from '../../utils/axios';
import './Reviews.scss';

function Reviews() {
  const [reviews, setReviews] = useState([])

  const findAllReviews = async () => {
    const reviews = (await axios.get({ url: '/reviews' }))?.data || []
    const products = (await axios.get({ url: '/products' }))?.data || []
    const _reviews = reviews.map((review) => {
      const product = products.filter(e => e.id == review.productId)?.[0];
      if (product) {
        review['product'] = product;
      }
      return review;
    })
    console.log({ _reviews })
    setReviews(_reviews);
  }


  useEffect(() => {
    findAllReviews();
    return () => {
    };
  }, []);

  return (

    // {
    //   "productId": "1",
    //   "star_rating": "5",
    //   "author": "Mohsin Ejaz",
    //   "headline": "Awsome",
    //   "body": "Lorem 1233",
    //   "id": 3
    // }


    <div className="review_section">
      <h1 className='heading'>Reviews</h1>
      <div className='products'>
        {reviews.map((e, index) => (
          <div className="product">
            <p className="product_name">ProductName : {e?.product?.name}</p>
            <p className="star_rating">StarRating : {e?.['star_rating']}</p>
            <p className="author">Author : {e?.['author']}</p>
            <p className="headline">Headline : {e?.['headline']}</p>
            <p className="body">body : {e?.['body']}</p>

            {/* {JSON.stringify(e)} */}
            {/* id={`comp-${index}`} */}

          </div>
        ))}
      </div>
    </div>
  )
}

export default Reviews