require('dotenv').config()

const UserInformation = (username) => {
    const options = {
        method: 'GET',
        url: 'https://instagram-data1.p.rapidapi.com/user/info',
        params: {
          username: username
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': process.env.RAPID_API_HOST_1
        }
      };

      return options
}

const UserInformation2 = (username) => {
  const options = {
      method: 'GET',
      url: 'https://instagram130.p.rapidapi.com/account-info',
      params: {
        username: username
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.RAPID_API_HOST_2
      }
    };

    return options
}

const UserInformation3 = (username) => {
  const options = {
      method: 'GET',
      url: `https://instagram243.p.rapidapi.com/userinfo/${username}`,
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.RAPID_API_HOST_3
      }
    };

    return options
}


const FeedInformation = (userID, max) => {
  if (max) {
    max += "/"
  } else {
    max = ""
  }
  const options = {
    method: 'GET',
    url: `https://instagram243.p.rapidapi.com/userposts/${userID}/${max}%7Bend_cursor%7D`,
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.RAPID_API_HOST_3
    }
  };

  return options
}

const FeedInformationDetails = (shortcode) => {
   const options = {
    method: 'GET',
    url: `https://instagram243.p.rapidapi.com/postdetail/${shortcode}`,
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.RAPID_API_HOST_3
    }
  };

  return options
}


module.exports = {UserInformation, UserInformation2, UserInformation3, FeedInformation, FeedInformationDetails};