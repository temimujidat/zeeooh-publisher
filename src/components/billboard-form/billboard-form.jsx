import { Form, Button, Col, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import axios from 'axios';
import './billboard-form.css';
import { createBillboardSchema } from '../../utils/form/yup-schemas';
import { useDispatch, useSelector } from 'react-redux';
import { closeVerticalModalDisplay } from '../../redux/vertical-modal/verticalModalReducer';
import {
  resetBillboardFormData,
  showStateData,
  showLgaData,
  showCityData,
} from '../../redux/form/billboardFormReducer';
import { overheadModalContainer } from '../../redux/overhead-modal/overheadModalReducer';
import { setAlertContent } from '../../redux/alert/alertPopupReducer';
import { mutate } from 'swr';
import billboardDataApi, {
  billboardRoute,
} from '../../utils/billboard-table/billboard-api';
import { useBillboardData } from '../../hooks/billboard-data-hook';
import { useRef, useState, useEffect } from 'react';

const BillboardForm = () => {
  const { _id } = useSelector((state) => state.user);
  const fileInputRef = useRef(null);
  const [uploadImage, setImageUpload] = useState(false);
  const [isuploadingImage, setIsUploadingImage] = useState(false);
  const [billboardImageUrl, setBillboardImageUrl] = useState('');
  const [imageUploadSuccess, setImageUploadSuccess] = useState('');
  const { billboardData } = useBillboardData();
  const formDataState = useSelector((state) => state.billboardForm);
  const { isEditing, formData, stateData, lgaData, cityData } = formDataState;
  const dispatch = useDispatch();
  useEffect(
    () => {
      if (isEditing && formData.image) {
        setBillboardImageUrl(formData.image);
        setImageUpload(true);
      }
    },
    // eslint-disable-next-line
    []
  );
  const handleFileUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const onImageDrop = async (e) => {
    setIsUploadingImage(true);
    try {
      if (e.target.files?.length) {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('upload_preset', 'xled2csv');
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/adesanza/image/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        if (res.data.secure_url) {
          setIsUploadingImage(false);
          setImageUploadSuccess('success');
          setImageUpload(true);
          setBillboardImageUrl(res.data.secure_url);
        }
      }
    } catch (error) {
      console.log('error-uploadBtn', error);
      setImageUploadSuccess('failure');
      setIsUploadingImage(false);
      // setImageUpload(false);
    }
  };
  return (
    <Formik
      validationSchema={createBillboardSchema}
      initialValues={formData}
      onSubmit={async (values, { setSubmitting }) => {
        // console.log(values);
        setSubmitting(true);
        values = { ...values, image: billboardImageUrl };
        // console.log(values);
        let updatedBillboardData = [...billboardData];
        if (isEditing) {
          try {
            const updatedBillboard = await billboardDataApi.edit(
              _id,
              formData._id,
              values
            );
            const idx = billboardData.findIndex(
              (billboard) => billboard._id === updatedBillboard._id
            );
            if (idx >= 0) {
              updatedBillboardData.splice(idx, 1, updatedBillboard);
              const mutated = await mutate(
                `${billboardRoute.url}${_id}/billboard`,
                { billboardData: updatedBillboardData },
                false
              );
              console.log('mutaded', mutated);
              dispatch(resetBillboardFormData());
              dispatch(closeVerticalModalDisplay());
              dispatch(setAlertContent('alert-success-edit-billboard'));
              dispatch(overheadModalContainer('alert'));
            }
          } catch (err) {
            console.log('mutate-error-edit-billboard', err);
            setSubmitting(false);
            alert('Failed to update billboard');
          }
        } else {
          try {
            const createdBillboard = await billboardDataApi.create(_id, values);
            updatedBillboardData.push(createdBillboard.billboardData);
            await mutate(
              `${billboardRoute.url}${_id}/billboard`,
              { billboardData: updatedBillboardData },
              false
            );
            dispatch(closeVerticalModalDisplay());
            dispatch(setAlertContent('alert-success-create-billboard'));
            dispatch(overheadModalContainer('alert'));
          } catch (err) {
            console.log('mutate-error-create-billboard', err);
            setSubmitting(false);
            alert('Failed to create billboard');
          }
        }
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
        isSubmitting,
      }) => (
        <>
          <Form>
            <input
              className="hide"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={onImageDrop}
            />
            <button
              className={`billboardimage-update-btn ${
                uploadImage ? 'billboardimage-upload-btn' : ''
              }`}
              style={
                uploadImage && billboardImageUrl
                  ? { backgroundImage: `url(${billboardImageUrl})` }
                  : null
              }
              type="button"
              onClick={handleFileUpload}
            >
              {isuploadingImage ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="md"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Loading...</span>
                </>
              ) : isEditing ? (
                'change billboard image'
              ) : (
                'upload billboard image'
              )}
            </button>
            <div className="row error-state">
              <div>
                {imageUploadSuccess ? (
                  <>
                    <img
                      src={
                        imageUploadSuccess === 'success'
                          ? 'https://res.cloudinary.com/adesanza/image/upload/v1622031599/billboard-images/Group_2125_xfhjic.svg'
                          : 'https://res.cloudinary.com/adesanza/image/upload/v1622118775/billboard-images/Group_2168_aciq1f.svg'
                      }
                      alt=""
                    />
                    <span className="success-state-text">
                      {imageUploadSuccess === 'success'
                        ? 'Image successfully uploaded'
                        : imageUploadSuccess === 'failure'
                        ? 'Image failed to upload'
                        : 'Image deleted'}
                    </span>
                  </>
                ) : null}
              </div>
              <img
                className="image-delete-icon"
                onClick={() => {
                  setImageUpload(false);
                  setBillboardImageUrl('');
                  setImageUploadSuccess('deleted');
                }}
                src="https://res.cloudinary.com/adesanza/image/upload/v1622030906/billboard-images/Vector_2_bih6fj.svg"
                alt="del"
              />
            </div>
          </Form>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Name"
                  className="formfont"
                />
                <Form.Text className="text-danger text-left">
                  {touched.name && errors.name ? errors.name : null}
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} controlId="formBasicLocation">
                <Form.Label className="form-label">Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Location"
                  className="formfont"
                />
                <Form.Text className="text-danger text-left">
                  {touched.location && errors.location ? errors.location : null}
                </Form.Text>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="controlSelectType">
                <Form.Label className="form-label">Type</Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="formf"
                >
                  <option value="">Type</option>
                  <option value="led">LED</option>
                  <option value="lightbox">Lightbox</option>
                  <option value="bridge_panel">Bridge Panel</option>
                  <option value="eye_catcher">Eye Catcher</option>
                  <option value="mega_board">Mega board</option>
                  <option value="gantry">Gantry</option>
                  <option value="portrait">Portrait</option>
                  <option value="rooftop">Rooftop</option>
                  <option value="super48_sheet">Super 48 sheet</option>
                  <option value="ultrawave">Ultra wave</option>
                  <option value="video_wall">Video wall</option>
                  <option value="wall_drape">Wall Drape</option>
                  <option value="unipole">Unipole</option>
                </Form.Control>
                <Form.Text className="text-danger text-left">
                  {touched.type && errors.type ? errors.type : null}
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} controlId="controlSelectStatus">
                <Form.Label className="form-label">Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="formf"
                >
                  <option value="">Status</option>
                  <option value="active" className="active-status">
                    Active
                  </option>
                  <option value="inactive" className="inactive-status">
                    Inactive
                  </option>
                  <option value="vacant" className="vacant-status">
                    Vacant
                  </option>
                </Form.Control>
                <Form.Text className="text-danger text-left">
                  {touched.status && errors.status ? errors.status : null}
                </Form.Text>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formBasicHeightInMetre">
                <Form.Label className="form-label">
                  Height<span> in metre</span>
                </Form.Label>
                <Form.Control
                  name="height_m"
                  value={values.height_m}
                  type="number"
                  min={3}
                  max={300}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Height (m)"
                  className="formfont"
                />
                <Form.Text className="text-danger text-left">
                  {touched.height_m && errors.height_m ? errors.height_m : null}
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} controlId="formBasicWidthInMetre">
                <Form.Label className="form-label">Width in metre</Form.Label>
                <Form.Control
                  name="width_m"
                  value={values.width_m}
                  type="number"
                  min={3}
                  max={300}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Width (m)"
                  className="formfont"
                />
                <Form.Text className="text-danger text-left">
                  {touched.width_m && errors.width_m ? errors.width_m : null}
                </Form.Text>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formBasicHeightInPx">
                <Form.Label className="form-label">Height in px</Form.Label>
                <Form.Control
                  name="height_px"
                  value={values.height_px}
                  type="number"
                  min={3}
                  max={300}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Height (px)"
                  className="formfont"
                />
                <Form.Text className="text-danger text-left">
                  {touched.height_px && errors.height_px
                    ? errors.height_px
                    : null}
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} controlId="formBasicWidthInPx">
                <Form.Label className="form-label">Width in px</Form.Label>
                <Form.Control
                  name="width_px"
                  value={values.width_px}
                  type="number"
                  min={3}
                  max={300}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Width (px)"
                  className="formfont"
                />
                <Form.Text className="text-danger text-left">
                  {touched.width_px && errors.width_px ? errors.width_px : null}
                </Form.Text>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="controlSelectCategory">
                <Form.Label className="form-label">Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="formf"
                >
                  <option value="">Category</option>
                  <option value="billboard">Billboard</option>
                </Form.Control>
                <Form.Text className="text-danger text-left">
                  {touched.category && errors.category ? errors.category : null}
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} controlId="controlSelectClass">
                <Form.Label className="form-label">Class</Form.Label>
                <Form.Control
                  as="select"
                  name="class"
                  value={values.class}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="formf"
                >
                  <option value="">Class</option>
                  <option value="digital">Digital</option>
                  <option value="static">Static</option>
                </Form.Control>
                <Form.Text className="text-danger text-left">
                  {touched.class && errors.class ? errors.class : null}
                </Form.Text>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="controlSelectRegion">
                <Form.Label className="form-label">Region</Form.Label>
                {/* <Form.Label>Example select</Form.Label> */}
                <Form.Control
                  as="select"
                  name="region"
                  value={values.region}
                  onChange={(e) => {
                    dispatch(showStateData(e.target.value));
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  className="formf"
                >
                  <option value="">Select Region</option>
                  <option value="southwest">Southwest</option>
                  <option value="southeast">Southeast</option>
                  <option value="northcentral">Northcentral</option>
                  <option value="northeast">Northeast</option>
                  <option value="northwest">Northwest</option>
                  <option value="southsouth">Southsouth</option>
                </Form.Control>
                <Form.Text className="text-danger text-left">
                  {touched.class && errors.region ? errors.region : null}
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} controlId="controlSelectState">
                <Form.Label className="form-label">State</Form.Label>
                <Form.Control
                  as="select"
                  name="state"
                  value={values.state}
                  onChange={(e) => {
                    dispatch(showLgaData(e.target.value));
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  className="formf"
                >
                  <option value="">Select State</option>
                  {stateData.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Form.Control>
                <Form.Text className="text-danger text-left">
                  {touched.state && errors.state ? errors.state : null}
                </Form.Text>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="controlSelectLga">
                <Form.Label className="form-label">Local Govt</Form.Label>
                <Form.Control
                  as="select"
                  name="lga"
                  value={values.lga}
                  onChange={(e) => {
                    dispatch(showCityData(e.target.value));
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  className="formf"
                >
                  <option value="">Select Lga</option>
                  {lgaData.map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
                </Form.Control>
                <Form.Text className="text-danger text-left">
                  {touched.lga && errors.lga ? errors.lga : null}
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} controlId="controlSelectCity">
                <Form.Label className="form-label">City</Form.Label>
                <Form.Control
                  as="select"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="City"
                  className="formf"
                >
                  <option value="">Select City</option>
                  {cityData.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </Form.Control>
                <Form.Text className="text-danger text-left">
                  {touched.city && errors.city ? errors.city : null}
                </Form.Text>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formBasicCoordinate">
                <Form.Label className="form-label">Co-ordinate</Form.Label>
                <Form.Control
                  type="text"
                  name="coordinate"
                  value={values.coordinate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Coordinate"
                  className="formfont"
                />
                <Form.Text className="text-danger text-left">
                  {touched.coordinate && errors.coordinate
                    ? errors.coordinate
                    : null}
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} controlId="formBasicAmount">
                <Form.Label className="form-label">Amount</Form.Label>
                <Form.Control
                  type="text"
                  name="amount"
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Amount"
                  className="formfont"
                />
                <Form.Text className="text-danger text-left">
                  {touched.amount && errors.amount ? errors.amount : null}
                </Form.Text>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formBasicFaces">
                <Form.Label className="form-label">Faces</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  max={50}
                  name="face"
                  value={values.face}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Faces"
                  className="formfont"
                />
                <Form.Text className="text-danger text-left">
                  {touched.face && errors.face ? errors.face : null}
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} controlId="formBasicSlots">
                <Form.Label className="form-label">Slots</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  max={50}
                  name="slot"
                  value={values.slot}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Slots"
                  className="formfont"
                />
                <Form.Text className="text-danger text-left">
                  {touched.slot && errors.slot ? errors.slot : null}
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} controlId="formBasicUnits">
                <Form.Label className="form-label">Units</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  max={50}
                  name="unit"
                  value={values.unit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Units"
                  className="formfont"
                />
                {/* <Form.Label>Name</Form.Label> */}
                <Form.Text className="text-danger text-left">
                  {touched.unit && errors.unit ? errors.unit : null}
                </Form.Text>
              </Form.Group>
            </Form.Row>
            <Button
              type="submit"
              block
              className="billboard-update-btn"
              disabled={isSubmitting}
            >
              {isEditing ? 'update' : 'create'}
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default BillboardForm;
