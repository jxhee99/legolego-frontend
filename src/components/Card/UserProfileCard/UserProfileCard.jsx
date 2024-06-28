import React from 'react';
import PropTypes from 'prop-types';

const UserProfileCard = ({ user }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>이름</td>
            <td>{user.userName}</td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>{user.userEmail}</td>
          </tr>
          <tr>
            <td>연락처</td>
            <td>{user.userPhone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

UserProfileCard.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    userPhone: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfileCard;
