// import './edit-profile-form.css';
// import { Form, Button, Col } from 'react-bootstrap';
// import { Formik } from 'formik';
// import { editProfileSchema } from '../../utils/form/yup-schemas';
// import { useDispatch, useSelector } from 'react-redux';
// import { editPublisherProfile } from '../../redux/user/userReducer';
// import { unwrapResult } from '@reduxjs/toolkit';
// // import { closeVerticalModalDisplay } from '../../redux/vertical-modal/verticalModalReducer';
// // import {
// //   resetBillboardFormData,
// //   showLgaData,
// // } from '../../redux/form/billboardFormReducer';
// import { overheadModalContainer } from '../../redux/overhead-modal/overheadModalReducer';
// import { setAlertContent } from '../../redux/alert/alertPopupReducer';
// // import { mutate } from 'swr';
// // import billboardDataApi, {
// //   billboardRoute,
// // } from '../../utils/billboard-table/billboard-api';

// const EditProfileForm = () => {
//   const userState = useSelector((state) => state.user);
//   // eslint-disable-next-line
//   const dispatch = useDispatch();
//   return (
//     <Formik
//       validationSchema={editProfileSchema}
//       initialValues={{
//         first_name: userState.first_name,
//         last_name: userState.last_name,
//         email: userState.email,
//       }}
//       onSubmit={async (values, { setSubmitting }) => {
//         // console.log(values);
//         setSubmitting(true);
//         dispatch(
//           editPublisherProfile({
//             publisherId: userState._id,
//             ...values,
//           })
//         )
//           .then(unwrapResult)
//           .then((data) => {
//             dispatch(setAlertContent('alert-success-edit-profile'));
//             dispatch(overheadModalContainer('alert'));
//           })
//           .catch((err) => {
//             setSubmitting(false);
//           });
//       }}
//     >
//       {({
//         handleSubmit,
//         handleChange,
//         handleBlur,
//         values,
//         touched,
//         isValid,
//         errors,
//         isSubmitting,
//       }) => (
//         <>
//           <Form noValidate onSubmit={handleSubmit}>
//             <Form.Row>
//               <Form.Group as={Col} controlId="formBasicFirstName">
//                 <Form.Label>First Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="first_name"
//                   value={values.first_name}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="First Name"
//                   className="formfont"
//                 />
//                 <Form.Text className="text-danger">
//                   {touched.first_name && errors.first_name
//                     ? errors.first_name
//                     : null}
//                 </Form.Text>
//               </Form.Group>
//             </Form.Row>
//             <Form.Row>
//               <Form.Group as={Col} controlId="formBasicLastName">
//                 <Form.Label>Last Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="last_name"
//                   value={values.last_name}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="Last Name"
//                   className="formfont"
//                 />
//                 <Form.Text className="text-danger">
//                   {touched.last_name && errors.last_name
//                     ? errors.last_name
//                     : null}
//                 </Form.Text>
//               </Form.Group>
//             </Form.Row>
//             <Form.Row>
//               <Form.Group as={Col} controlId="formBasicEmail">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   value={values.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="Email"
//                   className="formfont"
//                   disabled
//                 />
//                 <Form.Text className="text-danger">
//                   {touched.email && errors.email ? errors.email : null}
//                 </Form.Text>
//               </Form.Group>
//             </Form.Row>

//             <Button
//               type="submit"
//               block
//               className="billboard-update-btn"
//               disabled={isSubmitting}
//             >
//               update
//             </Button>
//           </Form>
//         </>
//       )}
//     </Formik>
//   );
// };

// export default EditProfileForm;
