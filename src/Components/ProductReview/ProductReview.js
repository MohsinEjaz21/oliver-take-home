import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { axios } from '../../utils/axios';
import Rating from '../Rating';
import './ProductReview.scss';

function ProductReview() {
  const history = useHistory();
  const [product, setProduct] = useState({})
  const { productId } = useParams();
  const [reviewForm, setReviewForm] = useState({
    star_rating: -1,
    author: '',
    headline: '',
    body: ''
  });


  const setReviewFormHandler = (key, value) => {
    setReviewForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const findProductById = async (productId) => {
    const response = await axios.get({ url: `/products/${productId}` })
    const product = response?.data || {}
    console.log({ product });
    setProduct(product)
  }

  useEffect(() => {
    findProductById(productId);
    return () => {
    };
  }, [productId]);


  const handleSubmit = () => {
    const payload = { productId, ...reviewForm }
    let isPayloadCorrect = true;
    Object.values(payload).forEach(value => {
      if (!value) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill the form For Review Submission!',
        })
        isPayloadCorrect = false;
        return;
      }
    })

    if (isPayloadCorrect === true) {
      try {
        const response = axios.post({ data: payload, url: '/reviews' })
        console.log({ response })
        history.push("/reviews");

      } catch (e) {

      }
    }

  }

  return (
    <div className="product_review_section">
      <h1 className='heading'>Product Review</h1>
      <div className='review_form'>

        <div className="product_name">
          <label htmlFor="">Product Name</label>
          <input className='product_name' value={product.name} disabled />
        </div>

        <div className="author">
          <label htmlFor="author">Enter Your Name</label>
          <input placeholder='Enter Your Name' id="author" onChange={(e) => setReviewFormHandler('author', e.target.value)} ></input>
        </div>

        <div className="headingReview">
          <label htmlFor="reviewHeading">Enter Review Title</label>
          <input placeholder='Enter Your Name' id="reviewHeading" onChange={(e) => setReviewFormHandler('headline', e.target.value)} ></input>
        </div>

        <div className="headingReview">
          <label htmlFor="reviewBody">Enter Review Body</label>
          <textarea placeholder='Enter Your Name' id="reviewBody" onChange={(e) => setReviewFormHandler('body', e.target.value)} ></textarea>
        </div>


        <div className="rating-star">
          <Rating
            rating={reviewForm.rating}
            setRating={(rating) => setReviewFormHandler('star_rating', rating)} />
        </div>

        <button onClick={() => handleSubmit()} > Submit</button>
      </div>
    </div>
  )
}

export default ProductReview