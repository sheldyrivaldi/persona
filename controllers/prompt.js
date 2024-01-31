const OpenAI = require("openai").OpenAI;
const {GetUserInfoByUsername, GetFeedsByUserID, GetFeedDetailsByShortCode} = require('../repositories/instagram')
require('dotenv').config()

const openai = new OpenAI();


const GetPersonaByInstagram = async(req, res) => {
    const instagram = req.body.instagram

    const user = await GetUserInfoByUsername(instagram)

    const feedsResponse = await GetFeedsByUserID(user.id, 10)
    const feeds = feedsResponse.edges

    let instagramPostContain = []
    
    for (let i = 0; i < feeds.length; i++) {
        if (feeds[i].node.__typename != "GraphVideo") {
            const feedsDetailResponse = await GetFeedDetailsByShortCode(feeds[i].node.shortcode)
            const temp = {
            "caption": feedsDetailResponse.caption.text,
            "accessibility_caption": feedsDetailResponse.accessibility_caption
            }

        instagramPostContain.push(temp)
        }
    }

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are an HR professional, data analyst, and psychologist capable of analyzing an individual's profile based on given instructions and data."
            },
            {
                role: 'user',
                content: `Please describe by empowering and fun sentences maximum 35 words about a person where information from instagram is:

                - account name: ${user.full_name}
                - instagram bio status: ${user.biography}
                - instagram job: ${user.category_name}
                - instagram number of post: ${user.edge_owner_to_timeline_media.count}
                - instagram number of followers: ${user.edge_followed_by.count}
                - instagram number of following:  ${user.edge_follow.count}
                - instagram post contain of: ${JSON.stringify(instagramPostContain)}
                - instagram tagging: 
                make also:
                - 4 core personalities
                - the best 2-words metaphor that best describe this person
                - color suitable with personality by option: "red", "blue" , "yellow", "green", "pink", "purple"
                - explaination of why the color is suitable for this person
                - a song that matches for the person, Please choose songs made in Indonesia, US, UK, or Korea. with time ranging from the year 2000-2020
                show the result in json format with value
                |description|metaphor|core_1|core_2|core_3|core_4|color|.
                For the note that description should not telling about instagram`
            }
        ],
        model: "gpt-3.5-turbo",
    });

    // const completion = await openai.chat.completions.create({
    //     messages: [
    //         {
    //             role: "system",
    //             content: "You are an HR professional, data analyst, and psychologist capable of analyzing an individual's profile based on given instructions and data."
    //         },
    //         {
    //             role: 'user',
    //             content: `Please describe by empowering and fun sentences maximum 35 words about a person where information from instagram is:

    //             - account name: ${instagram}
    //             - instagram bio status: software developer
    //             - instagram job: software developer
    //             - instagram number of post: 70
    //             - instagram number of followers: 200
    //             - instagram number of following:  250
    //             - instagram post contain of:
    //             - instagram tagging: 
    //             make also:
    //             - 4 core personalities
    //             - the best 2-words metaphor that best describe this person
    //             - color suitable with personality by option: "red", "blue" , "yellow", "green", "pink", "purple"
    //             - explaination of why the color is suitable for this person
    //             - a song that matches for the person, Please choose songs made in Indonesia, US, UK, or Korea. with time ranging from the year 2000-2020
    //             show the result in json format with value
    //             |description|metaphor|core_1|core_2|core_3|core_4|color|.
    //             For the note that description should not telling about instagram`
    //         }
    //     ],
    //     model: "gpt-3.5-turbo",
    // });

    const response = JSON.parse(completion.choices[0].message.content)


    res.status(200).json({
        "code": 200,
        "status": "OK",
        "message": response,
    });
}

const GetFeedsInstagram = async(req, res) => {
    const userID = req.body.user_id
    const feedsResponse = await GetFeedsByUserID(userID, 10)

    const feeds = feedsResponse.edges
    let instagramPostContain = []
    for (let i = 0; i < feeds.length; i++) {
        if (feeds[i].node.__typename != "GraphVideo") {
            // shortcode.push(feeds[i].node.shortcode)
            const feedsDetailResponse = await GetFeedDetailsByShortCode(feeds[i].node.shortcode)
            const temp = {
            "caption": feedsDetailResponse.caption.text,
            "accessibility_caption": feedsDetailResponse.accessibility_caption
            }

        instagramPostContain.push(temp)
        }
    }


    res.status(200).json({
        "code": 200,
        "status": "OK",
        "message": instagramPostContain,
    });

}


module.exports = {GetPersonaByInstagram, GetFeedsInstagram}