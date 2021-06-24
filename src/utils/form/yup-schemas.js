import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .trim()
    .required('Email field is required'),
  password: Yup.string()
    .required('Password field is required')
    .matches(
      /^[a-zA-Z0-9]{5,30}$/,
      'Password must contain only alphabets or numbers and must be longer than 5 characters'
    ),
});

export const createBillboardSchema = Yup.object().shape({
  image: Yup.string(),
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Billboard name is required'),
  location: Yup.string()
    .max(150, 'Must be 150 characters or less')
    .required('Billboard location is required'),
  type: Yup.string()
    .oneOf(
      [
        'led',
        'lightbox',
        'bridge_panel',
        'eye_catcher',
        'mega_board',
        'mobile_led',
        'portrait',
        'rooftop',
        'super48_sheet',
        'ultrawave',
        'unipole',
        'video_wall',
        'wall_drape',
        'gantry',
        'wall_scrape',
        'wall_drape',
        'building_wrap',
        'street_lamp_post',
        'bus_shelter',
        'bus_rapid_transit',
      ],
      'Invalid type'
    )
    .required('Must select an option'),
  height_m: Yup.number().min(1).max(400).required('Height (m) is required'),
  width_m: Yup.number().min(1).max(400).required('Width (m) is required'),
  height_px: Yup.number().min(0).max(4000).required('Height (px) is required'),
  width_px: Yup.number().min(0).max(4000).required('Width (px) is required'),
  status: Yup.string()
    .oneOf(['active', 'inactive', 'vacant'], 'Invalid status')
    .required('Must select an option'),
  category: Yup.string()
    .oneOf(
      [
        'billboard',
        'constructionAdvert',
        'lampPost',
        'streetFurniture',
        'transitAdvert',
      ],
      'Invalid category'
    )
    .required('Must select an option'),
  class: Yup.string()
    .oneOf(['digital', 'static'], 'Invalid status')
    .required('Must select an option'),
  region: Yup.string()
    .oneOf(
      [
        'southwest',
        'southsouth',
        'northcentral',
        'southeast',
        'northeast',
        'northwest',
      ],
      'Invalid status'
    )
    .required('Must select an option'),
  state: Yup.string().required('Billboard state is required'),
  lga: Yup.string().required('Billboard lga is required'),
  city: Yup.string().required('Billboard city is required'),
  amount: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Billboard price is required'),
  coordinate: Yup.string()
    .min(3)
    .max(25, 'Must be 25 characters or less')
    .required('Billboard coordinate is required'),
  face: Yup.number().min(1).max(50).required('Billboard face is required'),
  slot: Yup.number().min(1).max(50).required('Billboard slot is required'),
  unit: Yup.number().min(1).max(50).required('Billboard unit is required'),
});

export const registerScehma = Yup.object().shape({
  first_name: Yup.string()
    .matches(
      /^[a-zA-Z]{3,30}$/,
      'Firstname must contain only alphabets and must be more than 3 characters'
    )
    .required('First name is a required field'),
  last_name: Yup.string()
    .matches(
      /^[a-zA-Z]{3,30}$/,
      'Lastname must contain only alphabets and must be more than 3 characters'
    )
    .required('Last name is a required field'),
  company_name: Yup.string()
    .matches(
      /^[a-zA-Z0-9 \s]{3,30}$/,
      'Company name must contain only alphabets or numbers and must be longer than 5 characters'
    )
    .required('Company name is a required field'),
  company_phone: Yup.string()
    .matches(
      /^[0-9]{11}$/,
      'Comapany number can only contain numbers and must have 11 digits'
    )
    .required('Company phone number is a required field'),
  email: Yup.string()
    .email('Invalid email address')
    .trim()
    .required('Email is a required field'),
  password: Yup.string()
    .required('Password is a required field')
    .matches(
      /^[a-zA-Z0-9]{5,30}$/,
      'Password must contain only alphabets or numbers and must be longer than 5 characters'
    ),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

export const editProfileSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(
      /^[a-zA-Z]{3,30}$/,
      'Firstname must contain only alphabets and must be more than 3 characters'
    )
    .required('First name is a required field'),
  last_name: Yup.string()
    .matches(
      /^[a-zA-Z]{3,30}$/,
      'Lastname must contain only alphabets and must be more than 3 characters'
    )
    .required('Last name is a required field'),
  email: Yup.string()
    .email('Invalid email address')
    .trim()
    .required('Email is a required field'),
});
