const axios = require('axios');
const {UserInformation3, FeedInformation, FeedInformationDetails} = require('../configs/instagram');


const GetUserInfoByUsername = async(username) => {
    try {
        const response = await axios.request(UserInformation3(username));
         // return response.data untuk API selain RAPID_API_HOST_3
        return response.data.data

    } catch (error) {
        return error
    }
}

const GetFeedsByUserID = async(userID, max) => {
    try {
        const response = await axios.request(FeedInformation(userID, max));
        // return response.data untuk API selain RAPID_API_HOST_3
        return response.data.data

    } catch (error) {
        return error
    }
}

const GetFeedDetailsByShortCode = async(shortcode) => {
    try {
        const response = await axios.request(FeedInformationDetails(shortcode));
         // return response.data untuk API selain RAPID_API_HOST_3
        return response.data.data

    } catch (error) {
        return error
    }
}

module.exports = {GetUserInfoByUsername, GetFeedsByUserID, GetFeedDetailsByShortCode}