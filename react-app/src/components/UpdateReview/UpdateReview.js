import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { updateReview } from "../../store/review"
import { getReview } from "../../store/review"

function UpdateReview(){
  const dispatch = useDispatch()
  const { reviewId } = useParams()
  let reviewEdit


  const history = useHistory()
  let product = useSelector(state => state.products)
  product = Object.values(product)[0].reviews

  product.forEach(ele => {
    if (ele.id == reviewId){
      return reviewEdit = ele
    }
  })
  const user = useSelector(state => state.session.user)


  const [validationErrors, setValidationErrors] = useState([])
  const errors = []

  const [stars, setStars] = useState(reviewEdit.stars)
  const [review, setReview] = useState(reviewEdit.review)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stars) errors.push("Stars are Required.")
    if (isNaN(stars) || (stars > 5 || stars < 1)) errors.push("Stars must be an integer between 1 and 5")
    if (!review) errors.push("Review is Required.")

    if (errors.length) return setValidationErrors(errors)

    const payload = {
      id: reviewId,
      productId: reviewEdit.productId,
      userId: user.id,
      stars: Number(stars),
      review
    }

    let updatedReview = await dispatch(updateReview(reviewId, payload))
    await history.push(`/products/${reviewEdit.productId}`)
  }


  return (
    <div className="ReviewForm">
      <form onSubmit={handleSubmit}>
      <ul className="errors">
        {validationErrors.length > 0 && validationErrors.map((error, idx) => (
            <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
          ))}
        </ul>
        <div className='inputDiv'>
          <label htmlFor="Review" className='inputName'>Review</label>
          <input
            className='inputArea'
            name='review'
            type='text'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            />
        </div>
        <div className='inputDiv'>
          <label htmlFor="stars" className='inputName'>Stars</label>
          <input
            className='inputArea'
            name="stars"
            type="textarea"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            />
        </div>
        <div className='btnDiv'>
        <button id='submitBtn'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateReview
