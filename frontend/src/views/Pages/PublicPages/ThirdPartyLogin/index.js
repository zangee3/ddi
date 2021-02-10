import React, { useEffect, useState } from 'react';
import { queryString } from '../../../../utils/qs';
import axios from 'axios';
const ThirdPartyLogin = (props) => {
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    const accessToken = queryString(props.location.search).access_token;
    setUserInfo(queryString(props.location.search).access_token);
    // const config = {
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   access_token: accessToken,
    // };
    // const data = 'access_token=' + queryString(props.location.search).code;
    
  }, [props, setUserInfo, axios]);

  return <div className='testing'>Access Token: {userInfo}</div>;
};

export default ThirdPartyLogin;
