import userAPi from 'api/userApi';
import { generateURLGetImageResource, getDayAgo } from 'helpers';
import React from 'react';
import { Badge, Button, Card, Col } from 'react-bootstrap';
import { BiBookReader } from 'react-icons/bi';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { course as CourseRedux, updateUserFavoriteCourses } from 'store/userSlice';
import RatingStars from '../RatingStars';
import './index.css';

export default function CourseCard({ course, isOpenNewTab, column }) {
  const user = useSelector((state) => state.user);
  const courses = useSelector((state) => state.teacher.courses);
  const history = useHistory();
  const { avatar, title, lecturer, category, _id, rating, feedbacks, totalPrice, originPrice } = course;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const favoriteCourses = useSelector((state) => state.user.userInfo?.favoriteCourses);

  const isFavorite = favoriteCourses && favoriteCourses.includes(course._id);

  const handleAddToFavorite = async () => {
    if (!token) {
      return toast.info('Please login to use this feature!');
    }

    const { success, msg, updatedFavoriteCourses } = await userAPi.addCoursesToFavorite({
      courseId: course._id,
    });

    if (success) {
      toast.success('Successfully add to favorite');
      dispatch(updateUserFavoriteCourses(updatedFavoriteCourses));
    }
    msg && toast.error(msg);
  };

  const handleRemoveFromFavorite = async () => {
    const { success, msg, updatedFavoriteCourses } = await userAPi.deleteCoursesFromFavorite(course._id);
    if (success) {
      toast.success('Successfully Remove.');
      dispatch(updateUserFavoriteCourses(updatedFavoriteCourses));
    }
    msg && toast.error(msg);
  };

  const isNew = getDayAgo(course.createdAt) < 5;

  return (
    <Col sm={column ? column : 4} style={{ padding: '20px' }} className="CourseCard">
      <Card>
        <Card.Body>
          <Card.Img
            variant="top"
            style={{ width: '100%', height: '200px' }}
            src={generateURLGetImageResource(avatar)}
          />
          {user.userInfo !== null && user.userInfo.role === 2 && window.location.href.includes('teacher/courses') && (
            <Button
              onClick={() => {
                let temp = courses.filter((item) => item._id === course._id);
                dispatch(CourseRedux(temp[0]));
                history.push(`/teacher/editcourse/${course._id}`);
              }}
              className="editbtncss"
            >
              Edit course
            </Button>
          )}
          <div className="d-flex justify-content-between align-items-center">
            <Link to={`/web?category=${category._id}`} className="card__category mt-3 mb-2">
              {category.name}
            </Link>
            <div>
              {isNew && (
                <Badge
                  style={{
                    marginRight: '5px',
                    fontWeight: '400',
                    padding: ' 10px 13px',
                    height: 'fit-content',
                    backgroundColor: 'rgb(228 21 21)',
                  }}
                >
                  New
                </Badge>
              )}
              {course.students.length > 1 && (
                <Badge
                  style={{
                    fontWeight: '400',
                    padding: ' 10px 13px',
                    height: 'fit-content',
                    backgroundColor: 'rgb(11 166 191)',
                  }}
                >
                  Best Seller
                </Badge>
              )}
            </div>
          </div>

          <Card.Title>
            <Link className="card__title" to={`/course/${_id}`} target={isOpenNewTab ? '_blank' : '_self'}>
              {title}
            </Link>
          </Card.Title>
          <div className="reviews d-flex justify-content-between align-items-center mb-4">
            <div className="rating d-flex align-items-center">
              <RatingStars point={rating} color="#FFC78B" size={16} className="mr-1" />

              <div className="card__statistics ml-3">
                {rating} ({feedbacks?.length} reviews)
              </div>
            </div>

            <div className="fav">
              <Link to={'#'}>
                {token && isFavorite ? (
                  <BsHeartFill
                    className="fav_icon"
                    color="rgb(220 73 52)"
                    size={20}
                    onClick={handleRemoveFromFavorite}
                  />
                ) : (
                  <BsHeart className="fav_icon" color="rgb(220 73 52)" size={20} onClick={handleAddToFavorite} />
                )}
              </Link>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div className="card__lecture d-flex align-items-center">
              <BiBookReader color="gray" size={18} />
              <span className="ml-2 text-capitalize">{lecturer.firstName + ' ' + lecturer.lastName}</span>
            </div>
            <div className="card__prices">
              {originPrice !== totalPrice && <del className="mr-2">${originPrice}</del>}

              <span>${totalPrice}</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
