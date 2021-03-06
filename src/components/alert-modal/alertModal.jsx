import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeOverheadModalDisplay } from '../../redux/overhead-modal/overheadModalReducer';
import './alertModal.css';

const AlertModal = () => {
  const dispatch = useDispatch();
  const alertState = useSelector((state) => state.alertContent);

  useEffect(() => {
    let timer = setTimeout(() => dispatch(closeOverheadModalDisplay()), 3000);
    return () => clearTimeout(timer); //eslint-disable-next-line
  }, []);

  return (
    <center className="adesw">
      <img
        src="https://res.cloudinary.com/adesanza/image/upload/v1617875623/zabuni/Group_2107_cdvamr.svg"
        alt=""
      />
      <Modal.Body className="alerter">
        {alertState === 'alert-success-verify-email'
          ? 'You have successfully sign up on Zeeooh Our product team will contact you within 24hrs to schedule a product demo'
          : alertState === 'alert-success-edit-profile'
          ? 'Profile successfully updated'
          : `Input successfully
          ${
            alertState === 'alert-success-delete-billboard'
              ? 'deleted'
              : alertState === 'alert-success-edit-billboard'
              ? 'updated'
              : 'created'
          }`}
      </Modal.Body>
    </center>
  );
};
export default AlertModal;
