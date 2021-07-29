import React,{useEffect} from 'react'
import authApi from 'api/authUser'
import {useDispatch, useSelector} from 'react-redux'
import { course,setLoading} from 'store/userSlice'
import loading from 'assets/image/loading.svg'
import {Container,Form, Row,Col,InputGroup,Button,
} from 'react-bootstrap'
import { Editor } from "react-draft-wysiwyg";

import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required(),
  category: yup.string(),
  originPrice: yup.number().positive().required(),
  avatar: yup.string(),
  fullDescription: yup.string(),
  // appliedPromotions: yup.string().required(),
  shortDescription: yup.string(),
  longDescription: yup.string(),
});
function EditCourse(props) {
  const dispatch = useDispatch()
  const cousrse=useSelector(state=>state.user.course)
  const isLoading = useSelector((state) => state.user.loading)

  useEffect(() => {
    if(cousrse==null){
      dispatch(setLoading(true))
      authApi.getCourseById(props.match.params.id).then(res=>{
        if(res.success===true){
          dispatch(setLoading(false))
          dispatch(course(res.course))
        }
      })
    }
  }, [cousrse,props.match.params.id,dispatch])
  return (
    <div>
      {!isLoading&&
      <Container>
        <h2>Edit Course</h2>
        <Formik
          validationSchema={schema}
          onSubmit={async (data) => {
            data.shortDescription = 'asd'
            data.fullDescription = 'qe'
            if (data.avatar) {
              console.log('asd')
              // const uploadRes = await teacherApi.upLoad(data.avatar);
              // data.avatar = uploadRes.files[0].filename;
            }
          }}
          initialValues={{
            title: "",
            originPrice: "",
            avatar: "",
            shortDescription: "",
            fullDescription: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            setFieldValue,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationFormik101"
                  className="position-relative"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    isValid={touched.title && !errors.title}
                    isInvalid={!!errors.title}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="5"
                  controlId="validationFormikUsername2"
                >
                  <Form.Label>Origin Price</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="number"
                      placeholder="Origin Price"
                      aria-describedby="inputGroupPrepend"
                      name="originPrice"
                      value={values.originPrice}
                      onChange={handleChange}
                      isValid={touched.originPrice && !errors.originPrice}
                      isInvalid={!!errors.originPrice}
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Form.Group className="position-relative mb-3">
                <Form.Label style={{ marginRight:'10px'}}>Videos:</Form.Label>
                <input
                  type="file"
                  name="avatar"
                  multiple
                  onChange={(event) => {
                    setFieldValue("avatar", event.target.files[0]);
                  }}
                />
              </Form.Group>
  
              <Form.Label> Short Descriptions:</Form.Label>
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                // onChange={(e) => setshort(e.blocks[0].text)}
              >
                <Form.Control
                  type="text"
                  placeholder="shortDescription"
                  name="shortDescription"
                  // value={short}
                  onChange={handleChange}
                  isValid={touched.shortDescription && !errors.shortDescription}
                  isInvalid={!!errors.shortDescription}
                />
              </Editor>
              <Form.Label> Full Descriptions:</Form.Label>
              <Editor
                value={values.fullDescription}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                // onChange={(e) => setLong(e.blocks[0].text)}
              >
                <Form.Control
                  type="text"
                  placeholder="fullDescription"
                  name="fullDescription"
                  // value={long}
                  onChange={handleChange}
                  isValid={touched.fullDescription && !errors.fullDescription}
                  isInvalid={!!errors.fullDescription}
                />
              </Editor>
              <Button type="submit">Submit form</Button>
            </Form>
          )}
        </Formik>
      </Container>}
      {isLoading&&
      <div className="userloading">
        <img src={loading} className="loading" alt="loading" />
      </div>}
    </div>
  )
}
export default EditCourse
