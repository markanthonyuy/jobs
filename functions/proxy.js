exports.handler = async function (event, context, callback) {
  try {
    const res = await fetch('https://jobs.github.com/positions.json')
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
