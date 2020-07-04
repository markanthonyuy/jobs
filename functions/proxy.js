const fetch = require('node-fetch')

exports.handler = async function (event, context, callback) {
  try {
    const description = event.queryStringParameters.description
      ? `description=${event.queryStringParameters.description}`
      : ''
    const location = event.queryStringParameters.location
      ? `location=${event.queryStringParameters.location}`
      : ''
    const res = await fetch(
      `https://jobs.github.com/positions.json?${description}${location}`
    )
    const data = await res.json()
    console.log(data)

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data),
    })
  } catch (e) {
    console.log(e)
  }
}
