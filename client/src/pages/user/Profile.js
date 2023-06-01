import React from 'react'
import UserMenu from '../../components/Layouts/UserMenu'
import Layouts from '../../components/Layouts/Layouts'


const Profile = () => {
  return (
    <Layouts title={'Your Profile'}>
            <div className="container m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu/>
                    </div>
                    <div className="col-md-9">Profile</div>
                </div>
            </div>

        </Layouts>
  )
}

export default Profile
