import React, { useEffect, useState } from 'react';
import { queryString } from '../../../../utils/qs';
import axios from 'axios';
const ThirdPartyLogin = (props) => {
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    const accessToken = queryString(props.location.search).code;
    setUserInfo(queryString(props.location.search).code);
    // const config = {
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   access_token: accessToken,
    // };
    // const data = 'access_token=' + queryString(props.location.search).code;

    axios
      .get(
        'https://graph.facebook.com/v9.0/me?fields=email,name,id&access_token=' +
          accessToken
      )
      .then((response) => {
        console.log('response');
        console.log(response);
      });
  }, [props, setUserInfo, axios]);

  return <div className='testing'>Access Token: {userInfo}</div>;
};

export default ThirdPartyLogin;
